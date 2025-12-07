import { JSX } from "react"

type ModalContentProps = {
    visible: boolean,
    onDismiss?: () => void | undefined,
    content: JSX.Element 
}

type CardContentProps = { content: JSX.Element }

type CardActionsProps = { 
    reqType: string,
    onClose: () => void | undefined,
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

export type {
    ModalContentProps,
    CardActionsProps,
    CardContentProps,
    LoginService,
    RegisterService
}