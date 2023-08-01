import { Response } from "express";
import { ValidationError,BaseError, ValidationErrorItem} from "sequelize";

export as namespace customError;

export interface NoResourceErrorsInterface extends Error {
    title?: string;
    errors?: [{message?: string, path?:string}];
    status?: number;
    path?: string;
}

export interface SequelizeErrorsInterface extends Error{
    error?: ValidationError;
    path? : string | null;
    title? :string;
    errors : any;
}

export interface RestoreResponseInterface extends Request{
    user: null | any;
    cookies: {token: string}
}

export interface JwtPayload {
    data: {id:number |string};
}


export interface AuthReq {
    user: any
}

// export interface SequelizeCustomErrorInterface {
//     path?:
// }
