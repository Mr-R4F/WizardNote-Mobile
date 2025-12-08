/* import { LoginService, RegisterService } from "../types/type"; */
import { CreateNoteService, RegisterService, UpdateNoteService } from '@/types/type';
import { axiosInstanceAPI } from "../config/axios";

class NoteService {
    async index() {
        try {
            const res = await axiosInstanceAPI.get('nota');

            return res.data;
        } catch (err: any) {
            console.log(err);
            return err;
        }
    }

    async create({ id_categoria, titulo, conteudo, resumo_ia }: CreateNoteService) {
        try {
            const res = await axiosInstanceAPI.post('nota', {
                id_categoria,
                titulo,
                conteudo,
                resumo_ia
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

    async update({ titulo, conteudo, resumo_ia, noteId }: UpdateNoteService) {
        try {
            const res = await axiosInstanceAPI.put(`nota/${noteId}`, {
                titulo,
                conteudo,
                resumo_ia
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