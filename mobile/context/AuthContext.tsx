import { createContext, useState } from 'react';


interface AuthContext {
    authorized: boolean;
    toggleAuthorized: (buttonType: boolean) => void;
}

const defaultState: AuthContext = {
    authorized: false,
    toggleAuthorized: (val) => console.log(val)
}

const AuthContext = createContext(defaultState);

export default AuthContext;
