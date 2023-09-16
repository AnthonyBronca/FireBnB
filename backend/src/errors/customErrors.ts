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
    errors?: {credential: string};
    status?:number;
    constructor(message?:string){
        super(message)
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
