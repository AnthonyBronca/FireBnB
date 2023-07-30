"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
require('express-async-errors');
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const csurf = require('csurf');
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const { environment } = require('./config');
const isProduction = environment === 'production';
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
if (!isProduction) {
    app.use((0, cors_1.default)());
}
app.use(helmet_1.default.crossOriginResourcePolicy({
    policy: 'cross-origin'
}));
app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}));
app.use(routes_1.default);
app.use((_req, _res, next) => {
    const err = new Error("The requested resource could not be found.");
    err.title = "Resource Not Found";
    err.errors = [{ message: "The requested resource couldn't be found." }];
    err.status = 404;
    next(err);
});
app.use((err, _req, _res, next) => {
    let errors = {};
    for (let error of err.errors) {
        errors.message = error.message;
        console.log(error);
    }
    err.title = 'Validation Error';
    err.errors = errors;
    next(err);
});
app.use((err, _req, _res, _next) => {
    _res.status(err.status || 500);
    console.log('i am here');
    console.error(err);
    _res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});
module.exports = app;
