

export interface CSRFHttpOptions {
    method: string;
    headers: any;
    body?: string;
};

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string
    username: string,
}

export interface SessionInitialState {
    user: null | User
}

export interface SignUpUser {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
}
