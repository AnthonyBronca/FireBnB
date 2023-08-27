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
const auth_1 = require("../../utils/auth");
const validation_1 = require("../../utils/validation");
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const models_1 = __importDefault(require("../../db/models"));
const { User, UserImage } = models_1.default;
const router = require('express').Router();
const validateSignup = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    validation_1.handleValidationErrors
];
router.post('/', validateSignup, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    let existingUser = yield User.findOne({
        where: {
            [Op.or]: {
                username,
                email
            }
        }
    });
    if (existingUser) {
        if (existingUser)
            existingUser = existingUser.toJSON();
        let errors = {};
        if (existingUser.email === email) {
            errors["email"] = "User with that email already exists";
        }
        if (existingUser.username === username) {
            errors["username"] = "User with that username already exists";
        }
        res.status(500);
        return res.json({ message: "User already exists", errors });
    }
    else {
        try {
            const user = yield User.create({ firstName, lastName, email, username, hashedPassword });
            yield (0, auth_1.setTokenCookie)(res, user);
            return res.json({
                user
            });
        }
        catch (e) {
            return next(e);
        }
    }
}));
router.get('/', auth_1.restoreUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        };
        return res.json({
            user: safeUser
        });
    }
    else
        return res.json({ user: null });
}));
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.findAll({
        include: {
            model: UserImage,
        }
    });
    res.json(users);
}));
module.exports = router;
//# sourceMappingURL=users.js.map