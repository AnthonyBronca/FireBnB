import express, { NextFunction, Request, Response } from 'express';
import { AuthReq } from "../../typings/express";
import { setTokenCookie, requireAuth } from "../../utils/auth";
import {handleValidationErrors} from '../../utils/validation';
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

import db from '../../db/models'

const User = db.User;


const router = require('express').Router();

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

// // Sign up
router.post(
    '/',
    validateSignup,
    async (req:Request, res:Response, next: NextFunction) => {
        const { firstName, lastName, bio, email, password, username } = req.body;
        const hashedPassword = bcrypt.hashSync(password);

        try{

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
        } catch(e){
            return next(e)
        }
    }
);

// // Restore session user
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
        // include: {
            //     model: UserImage,
            //     as: 'UserImage'
            // }
        });
        res.json(users)
})


export = router;
