import { ValidationError, ValidationErrorItem} from "sequelize";

export class NoResourceError extends Error {
    status?: number;
    title?: string;
    errors?: [{message?:string, path?:string}];
    path?:string;
    constructor(message:string|undefined, status?:number, title?:string, errors?:[{message?:string, path?:string}]){
        super(message)
        this.status = status
        this.title = title;
        this.errors = errors;
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
    constructor(message?:string, status?:number){
        super(message);
        this.status = status;
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


export interface SpotErr {
    address?: string,
    city?: string,
    state?: string,
    country?: string,
    lat?: string,
    lng?: string,
    name?: string,
    description?: string,
    price?: string
}

export class InvalidSpotError extends Error {
    message: string;
    errors: SpotErr;
    status: number;
    constructor(message:string, errors: SpotErr, status:number) {
        super(message);
        this.message = message;
        this.errors = errors;
        this.status = status;

    }
}

export class SpotExistsError extends Error {
    message: string;
    status: number;
    constructor(message?: string, status: number = 409){
        super(message);
        this.message = message || "Spot exists";
        this.status = status;
    }
}
