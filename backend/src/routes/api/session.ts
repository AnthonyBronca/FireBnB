import { NextFunction, Request, Response } from "express";
import { LoginError, NoResourceError } from "../../errors/customErrors";

const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
// import User from "../../db/models/user";
// import UserImage from "../../db/models/user-images";

import db from '../../db/models';
const {User} = db


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
// Log in
router.post(
    '/',
    validateLogin,
    async (req:Request, res:Response, next:NextFunction) => {
        const { credential, password } = req.body;


        if(credential && password){
            try{
                const user = await User.unscoped().findOne({
                    where: {
                        [Op.or]: {
                            username: credential,
                            email: credential,
                        },
                    }
                });

                if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
                    const err = new LoginError('Login failed');
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

                await setTokenCookie(res, safeUser);

                return res.json({
                    user: safeUser
                });

            } catch (e){
                return next(e);
            }
        } else {
            if(!credential && !password){
                res.json({message: 'Please pass in a valid username/email and password'})
            } else if (!credential && password){
                res.json({message: "Please pass in a valid username/email"})
            } else if(credential && !password){
                res.json({message: "Please pass in a valid password"})
            } else {
                res.json({message: "Oops! Looks like there seems to be a server error"})
            }
        }
    }
);
    // Log out
    router.delete(
    '/',
    (_req:Request, res:Response) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);


export = router;
