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
const express = require('express');
const bcrypt = require('bcryptjs');
const auth_1 = require("../../utils/auth");
const validation_1 = require("../../utils/validation");
const user_1 = __importDefault(require("../../db/models/user"));
const user_images_1 = __importDefault(require("../../db/models/user-images"));
const { check } = require('express-validator');
const router = express.Router();
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    validation_1.handleValidationErrors
];
router.post('/', validateSignup, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, bio, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = yield user_1.default.create({ firstName, lastName, bio, email, username, hashedPassword });
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };
    yield (0, auth_1.setTokenCookie)(res, safeUser);
    return res.json({
        user: safeUser
    });
}));
router.get('/me', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            profileImage: user.profileImage
        };
        return res.json({
            user: safeUser
        });
    }
    else
        return res.json({ user: null });
}));
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({
        include: {
            model: user_images_1.default,
            as: 'UserImage'
        }
    });
    res.json(users);
}));
module.exports = router;
//# sourceMappingURL=users.js.map