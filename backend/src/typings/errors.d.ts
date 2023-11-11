import { ValidationError,BaseError} from "sequelize";


export as namespace customError;


export interface NoResourceError extends Error {
    title?: string;
    errors?: [{message?: string}];
    status?: number;
}

export interface SequelizeErrors extends Error{
    error?: ValidationError;
    path? : string | null;
    title? :string;
    errors : any;

}


export interface errors {
    email?: string,
    username?: string,
    password?: string,
}
