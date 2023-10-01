

export interface CSRFHttpOptions {
    method: string;
    headers: any;
    body?: string;
};

export interface SessionInitialState {
    user: null | any[]
}

export interface SignUpUser {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string
}
