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
module.exports = app;
