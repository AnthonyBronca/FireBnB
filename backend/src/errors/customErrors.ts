import { ValidationError, ValidationErrorItem} from "sequelize";

export class NoResourceError extends Error {
    title?: string;
    errors?: [{message?:string, path?:string}];
    status?: number;
    path?:string;
    constructor(message:string|undefined, title?:string, errors?:[{message?:string, path?:string}], status?:number){
        super(message)
        this.title = title;
        this.errors = errors;
        this.status = status
    }
}

export class LoginError extends Error {
    title?: string;
    errors?: {message: string};
    status:number;
    constructor(message:string, status: number){
        super(message);
        this.status = status;
    }
}

export class SpotError extends Error {
    title?: string;
    errors? : {spot: string};
    status?: number;
    constructor(message?:string){
        super(message)
    }
}


export class SequelizeError extends ValidationError{
    options?:string
    constructor(message:string, errors:ValidationErrorItem[],options?:string){
        super(message, errors)
        this.options = options
    }
}


export class AuthError extends Error {
    title?: string;
    errors?: {message?:string, path?:string};
    status?: number;
    constructor(message?:string){
        super(message)
    }
}


//Error for when a user needs to be signed in
export class UnauthorizedError extends Error{
    status:number;
    constructor(message:string, status: number = 401){
        super(message);
        this.status = status;
    }
}

// Error for when a user does not have proper access to this action
export class ForbiddenError extends Error{
    status: number;
    constructor(message:string, status:number = 403){
        super(message);
        this.status = status;
    }
}

export interface CredError {
    credential?: string,
    password?: string
}

export class InvalidCredentialError extends Error {
    message: string;
    errors: CredError;
    status: number;
    constructor(message:string, errors: CredError, status:number = 400 ){
        super(message);
        this.message = message;
        this.errors = errors;
        this.status = status;
    }
}
