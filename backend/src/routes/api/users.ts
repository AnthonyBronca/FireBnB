import { Request, Response } from "express";
import { AuthReq } from "../../typings/express";

const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

import User from '../../db/models/user'
import UserImage from "../../db/models/user-images";

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
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
    handleValidationErrors
];


// Sign up
router.post(
    '/',
    validateSignup,
    async (req:Request, res:Response) => {
        const { firstName, lastName, bio, email, password, username } = req.body;
        const hashedPassword = bcrypt.hashSync(password);
        const user = await User.create({ firstName, lastName, bio, email, username, hashedPassword });

        const safeUser = {
            id: user.id,
            email: user.email,
            username: user.username,
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    }
);

// Restore session user
router.get('/me', async (req:AuthReq, res:Response) => {
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
    } else return res.json({ user: null });
});

//get all users
router.get('/all', async (req:Request, res:Response) => {
    const users = await User.findAll({
        include: {
            model: UserImage,
            as: 'UserImage'
        }
    });
    res.json(users)
})

module.exports = router;
