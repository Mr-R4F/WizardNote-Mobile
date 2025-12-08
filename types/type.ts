import { JSX } from "react";

type ModalContentProps = {
    visible: boolean,
    onDismiss?: () => void | undefined
    content: JSX.Element,
}

type CardContentProps = { content: JSX.Element }

type CardActionsProps = {
    reqType: string,
    onClose: () => void | undefined,
    onReq?: (data: any) => Promise<void>
}

interface RegisterService {
    nome: string;
    email: string;
    senha: string;
}

interface LoginService {
    email: string;
    senha: string;
}

interface CreateNoteService {
    id_categoria: number;
    titulo: string;
    conteudo: string;
    resumo_ia?: string;
    palavras_chave?: string;
}
interface UpdateNoteService {
    titulo: string;
    conteudo: string;
    resumo_ia?: string;
    noteId: number;
}

export type {
    CardActionsProps,
    CardContentProps, 
    CreateNoteService, 
    LoginService,
    ModalContentProps,
    RegisterService,
    UpdateNoteService
};

