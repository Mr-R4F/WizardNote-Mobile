import { CreateNoteService, RegisterService, UpdateNoteService } from '@/types/type';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { axiosInstanceAPI } from "../config/axios";

// --- Inicialização e Configuração do Gemini (Movido para fora da classe) ---

// Certifique-se de que a variável de ambiente GEMINI_API_KEY está configurada!
console.log('CHAVE SENDO USADA PELO GEMINI:', process.env.GEMINI_API_KEY ? 'Carregada' : 'UNDEFINED');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
];

const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    safetySettings,
});

// --- Funções Auxiliares para Resumo (Movidas para fora da classe) ---

// Divide texto em partes
function splitIntoChunks(text: string, maxSize = 5000): string[] {
    const chunks: string[] = [];
    let pos = 0;

    while (pos < text.length) {
        chunks.push(text.slice(pos, pos + maxSize));
        pos += maxSize;
    }
    return chunks;
}

// Resume 1 chunk de forma robusta
async function summarizeChunk(chunk: string, index: number): Promise<string> {
    const prompt = `
Resuma o texto abaixo de forma concisa, capturando apenas as ideias centrais:

${chunk}
`;

    try {
        console.log(`Submetendo chunk ${index + 1}...`);
        const result = await model.generateContent(prompt);
        const response = result.response;

        if (!response.candidates || response.candidates.length === 0 ||
            (response.candidates[0].finishReason !== 'STOP' && response.candidates[0].finishReason !== 'MAX_TOKENS')) {

            console.warn(`Chunk ${index + 1} bloqueado ou finalizado indevidamente. Razão: ${response.promptFeedback?.blockReason || response.candidates?.[0]?.finishReason}`);
            return ""; // Retorna vazio se bloqueado
        }

        return response.text();
    } catch (error: any) {
        console.error(`Erro ao resumir chunk ${index + 1}:`, error.message);
        return ""; // Retorna vazio em caso de erro
    }
}

// --- Classe NoteService Adaptada ---

class NoteService {

    /**
     * Gera um resumo do texto usando o modelo Gemini, dividindo o texto em chunks se necessário.
     * @param fullText O texto completo a ser resumido.
     * @returns O resumo gerado pelo Gemini ou uma string vazia em caso de falha.
     */
    async summarizeText(fullText: string): Promise<string> {
        if (!fullText || fullText.trim().length === 0) {
            return "";
        }

        const chunks = splitIntoChunks(fullText);
        console.log(`Texto dividido em ${chunks.length} chunks.`);

        // Mapeia chunks e os resume em paralelo
        const partialPromises = chunks.map((chunk, i) =>
            summarizeChunk(chunk, i)
        );

        console.log(`Resumindo todos os ${chunks.length} chunks em paralelo...`);
        const partials = await Promise.all(partialPromises);

        // Filtra resumos que podem ter falhado
        const validPartials = partials.filter(p => p && p.trim().length > 0);

        if (validPartials.length === 0) {
            console.error("Nenhum chunk pôde ser resumido.");
            return ""; // Retorna vazio se não houver resumos válidos
        }

        console.log(`Resumos parciais concluídos. Combinando ${validPartials.length} resumos...`);

        // Se houver apenas 1 chunk, retorna ele diretamente
        if (validPartials.length === 1) {
            return validPartials[0];
        }

        // Combinação final dos resumos parciais
        const finalPrompt = `
Combine os resumos parciais abaixo em um único texto coeso e conciso:

${validPartials.join("\n\n---\n\n")}
`;

        try {
            const result = await model.generateContent(finalPrompt);
            return result.response.text();
        } catch (error: any) {
            console.error("❌ Erro ao combinar resumos finais:", error.message);
            return ""; // Retorna vazio em caso de falha na combinação
        }
    }

    async index() {
        // ... (Implementação de index permanece a mesma)
        try {
            const res = await axiosInstanceAPI.get('nota');
            return res.data;
        } catch (err: any) {
            console.log(err);
            return err;
        }
    }

    // Cria a nota, gerando o resumo IA automaticamente
    async create({ id_categoria, titulo, conteudo, resumo_ia }: CreateNoteService) {
        // Se o resumo_ia não foi fornecido (o que é esperado se for gerado por IA), 
        // chamamos a função de resumo
        let finalResumoIa = resumo_ia;
        if (!finalResumoIa && conteudo) {
            console.log("Iniciando geração de resumo IA para o novo conteúdo...");
            finalResumoIa = await this.summarizeText(conteudo);
        }

        try {
            const res = await axiosInstanceAPI.post('nota', {
                id_categoria,
                titulo,
                conteudo,
                // Usamos o resumo gerado ou o que foi passado (se houver)
                resumo_ia: finalResumoIa
            });
            console.log(res)
            return res;
        } catch (err: any) {
            console.log(err);
            return err;
        }
    }

    // ... (Outros métodos show, update, destroy)

    // Atualiza a nota, gerando o resumo IA automaticamente se o conteúdo mudar ou resumo_ia não for passado
    async update({ titulo, conteudo, resumo_ia, noteId }: UpdateNoteService) {
        // Lógica similar: se o conteúdo estiver presente, gere o novo resumo IA
        let finalResumoIa = resumo_ia;
        if (conteudo) { // Assume que você quer gerar um novo resumo se o 'conteudo' estiver sendo atualizado
            console.log(`Iniciando geração de novo resumo IA para a nota ${noteId}...`);
            finalResumoIa = await this.summarizeText(conteudo);
        }


        try {
            const res = await axiosInstanceAPI.put(`nota/${noteId}`, {
                titulo,
                conteudo,
                // Usamos o resumo gerado ou o que foi passado (se houver)
                resumo_ia: finalResumoIa
            });
            console.log(res)
            return res;
        } catch (err: any) {
            console.log(err);
            return err;
        }
    }

    async show({ nome, email, senha }: RegisterService) {
        try {
            const res = await axiosInstanceAPI.post('usuario', {
                nome,
                email,
                senha
            });
            console.log(res)
            return res;
        } catch (err: any) {
            console.log(err);
            return err;
        }
    }

    async destroy(noteId: number) {
        try {
            const res = await axiosInstanceAPI.delete(`nota/${noteId}`);
            console.log(res)
            return res;
        } catch (err: any) {
            return err;
        }
    }
}

export default new NoteService();