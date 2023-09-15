"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = void 0;
const customErrors_1 = require("../errors/customErrors");
const { validationResult } = require('express-validator');
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach((error) => errors[error.path] = error.msg);
        const err = new customErrors_1.AuthError("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
module.exports = {
    handleValidationErrors: exports.handleValidationErrors
};
//# sourceMappingURL=validation.js.map