import { Response, Request } from "express";


export interface SafeUser {
    id: number,
    email: string,
    username: string,
    firstName: string,
    lastName: string
}

export interface CustomeRequest extends Request {
    user: null | SafeUser;
    cookies: {token: string};
    file?: any
}

export interface RestoreResponseInterface extends Request{
    user: null | any;
    cookies: {token: string}
}

export interface JwtPayload {
    data: {id:number |string};
}


export interface AuthReq extends Request {
    user: any
}
