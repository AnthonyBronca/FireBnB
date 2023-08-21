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
const customErrors_1 = require("../../errors/customErrors");
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const models_1 = __importDefault(require("../../db/models"));
const { User } = models_1.default;
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or Username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];
router.post('/', validateLogin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { credential, password } = req.body;
    if (credential && password) {
        try {
            const user = yield User.unscoped().findOne({
                where: {
                    [Op.or]: {
                        username: credential,
                        email: credential,
                    },
                }
            });
            if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
                const err = new customErrors_1.LoginError('Login failed');
                err.status = 401;
                err.title = 'Login failed';
                err.errors = { credential: 'The provided credentials were invalid.' };
                return next(err);
            }
            const safeUser = {
                id: user.id,
                email: user.email,
                username: user.username,
            };
            yield setTokenCookie(res, safeUser);
            return res.json({
                user: safeUser
            });
        }
        catch (e) {
            return next(e);
        }
    }
    else {
        if (!credential && !password) {
            res.json({ message: 'Please pass in a valid username/email and password' });
        }
        else if (!credential && password) {
            res.json({ message: "Please pass in a valid username/email" });
        }
        else if (credential && !password) {
            res.json({ message: "Please pass in a valid password" });
        }
        else {
            res.json({ message: "Oops! Looks like there seems to be a server error" });
        }
    }
}));
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});
module.exports = router;
//# sourceMappingURL=session.js.map