import { NextFunction, Request, Response } from "express";
import { AuthError, SpotError } from "../errors/customErrors";

const { validationResult, check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
export const handleValidationErrors = (req:Request , _res:Response, next:NextFunction) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors:any = {};
        validationErrors
            .array()
            .forEach((error:any) => errors[error.path] = error.msg);

        const err = new AuthError("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
};


export const validateSpot = [
    check('address')
        .isLength({min: 4})
        .withMessage('Street Address is required'),
    check('city')
        .isLength({ min: 2 })
        .withMessage('City is required'),
    check('name')
        .isLength({ min: 4 })
        .withMessage('Name must be 4 - 50 characters long'),
    check('state')
    .custom(async (val:string)=> {
        if(!val){
            throw new SpotError("State is required")
        }
    }),
    check("country")
     .custom(async (val:string)=> {
        if(!val){
            throw new SpotError("Country is required")
        }
    }),
    check("lat")
     .custom(async (val:string)=> {
        if(!val){
            throw new SpotError("Latitude is not valid")
        }
    }),
    check("lng")
     .custom(async (val:string)=> {
        if(!val){
            throw new SpotError("Longitude is not valid")
        }
    }),
    check("description")
     .custom(async (val:string)=> {
        if(!val){
            throw new SpotError("Description is required")
        }
        if(val.length < 5) throw new Error("Description must be longer than 5 characters")
    }),
    check("price")
     .custom(async (val:number | undefined)=> {
        if(!val){
            throw new SpotError("Price per day is required")
        }
        if(val < 0){
            throw new SpotError("Price must be greater than 0")
        }
        if(val % 1 !== 0){
            throw new SpotError("Price must be a whole number greater than 0")
        }
    }),
    handleValidationErrors
];

export class ReviewError extends Error {
    status?: number;

    constructor(message?: string, status?: number){
        super(message);
        this.status = status;
    }
}


export const validateReview = [
    check("review")
    .custom(async (val: string | undefined) => {
        if(!val){
            throw new ReviewError("Review text is required", 400);
        }
        if(val.length > 200){
            throw new ReviewError("Review text must be 200 characters or lesss", 400);
        }
        if(val.startsWith(" ")){
            throw new ReviewError("Review can not start with empty spaces", 400);
        }
    }),
    check("stars")
    .custom(async (val: number| undefined) => {
        if(!val){
            throw new ReviewError("Stars must be an integer from 1 to 5", 400);
        }
        if( val > 5 || val < 1){
            throw new ReviewError("Stars must be an integer from 1 to 5", 400);
        }
    }),
    handleValidationErrors
];



module.exports = {
    handleValidationErrors,
    validateSpot,
    validateReview
};
