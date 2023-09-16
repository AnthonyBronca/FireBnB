// import { Response, Request } from "express";
import { ValidationError} from "sequelize";

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
