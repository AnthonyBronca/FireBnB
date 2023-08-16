"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = exports.restoreUser = exports.setTokenCookie = void 0;
const customErrors_1 = require("../errors/customErrors");
const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const user_1 = __importDefault(require("../db/models/user"));
const { secret, expiresIn } = jwtConfig;
const setTokenCookie = (res, safeUser) => {
    const token = jwt.sign({ data: safeUser }, secret, { expiresIn: parseInt(expiresIn) });
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie('token', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "lax"
    });
    return token;
};
exports.setTokenCookie = setTokenCookie;
const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    req.user = null;
    return jwt.verify(token, secret, null, (err, jwtPayload) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return next();
        }
        try {
            const { id } = jwtPayload.data;
            req.user = yield user_1.default.findByPk(id, {
                attributes: {
                    include: ['email', 'createdAt', 'updatedAt']
                }
            });
        }
        catch (e) {
            res.clearCookie('token');
            return next();
        }
        if (!req.user)
            res.clearCookie('token');
        return next();
    }));
};
exports.restoreUser = restoreUser;
const requireAuth = function (req, _res, next) {
    if (req.user)
        return next();
    const err = new customErrors_1.AuthError('Authentication required');
    err.title = 'Authentication required';
    err.errors = { message: 'Authentication required' };
    err.status = 401;
    return next(err);
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map