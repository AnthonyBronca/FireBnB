export interface ModalContext {
    open: boolean;
    toggleOpen: (buttonType:string) => void;
}

export interface SignInContext {
    open: boolean;
    toggleSignIn: (buttonType:string) => void;
}
