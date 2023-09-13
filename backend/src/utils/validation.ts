import { NextFunction, Request, Response } from "express";
import { AuthError } from "../errors/customErrors";
import { NoResourceErrorsInterface } from "../typings/sequelize";

const { validationResult } = require('express-validator');

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


module.exports = {
    handleValidationErrors
};
