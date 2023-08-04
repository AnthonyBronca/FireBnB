import { Response, Request } from "express";


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
