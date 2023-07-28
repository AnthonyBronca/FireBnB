"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const csurf_1 = __importDefault(require("csurf"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
require('express-async-errors');
const { environment } = require('./config');
const isProduction = environment === 'production';
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
if (!isProduction) {
    app.use((0, cors_1.default)());
}
app.use(helmet_1.default.crossOriginResourcePolicy({
    policy: 'cross-origin'
}));
app.use((0, csurf_1.default)({
    cookie: {
        secure: isProduction,
        sameSite: false && "Lax",
        httpOnly: true
    }
}));
module.exports = app;
