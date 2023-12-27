export interface ModalContext {
    open: boolean;
    toggleOpen: (buttonType:string) => void;
}

export interface IEditFormModalContext {
    open: boolean;
    toggleFormOpen: (buttonType:boolean) => void;
}

export interface SignInContext {
    open: boolean;
    toggleSignIn: (buttonType:string) => void;
}
