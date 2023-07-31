import { ValidationError,BaseError} from "sequelize";


export as namespace customError;

export interface NoResourceError extends Error {
    title?: string;
    errors?: [{message?: string}];
    status?: number;
}

export interface SequelizeErrors extends Error{
    error?: any;
    path? : any;
    title? :any;
    errors : any;

}
