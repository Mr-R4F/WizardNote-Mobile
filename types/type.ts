import { JSX } from "react";
import { Animated, GestureResponderEvent } from "react-native";

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

type SnackBarActionsProps = {
    content: string,
    visible: boolean,
    label?: string,
    icon?: string,
    elevation?: 0 | 1 | 2 | 3 | 4 | 5 | Animated.Value | undefined,
    onDismissSnackBar: () => void,
    onPress?: (e: GestureResponderEvent) => void,
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
    CardContentProps, CreateNoteService,
    LoginService,
    ModalContentProps,
    RegisterService, SnackBarActionsProps, UpdateNoteService
};

