import { NextFunction, Request, Response } from "express";
import { CredError, InvalidCredentialError, LoginError, NoResourceError } from "../../errors/customErrors";

const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');


import db from '../../db/models';
import { LoginUser } from "../../typings/data";
const {User} = db


const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
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
                let user = await User.unscoped().findOne({
                    where: {
                        [Op.or]: {
                            username: credential,
                            email: credential,
                        },
                    }
                });

                if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
                    const err = new LoginError('Invalid credentials', 401);
                    err.status = 401;
                    throw err
                }

                await setTokenCookie(res, user);

                let loginUser = user.getSafeUser()
                console.log(loginUser)

                return res.json({
                    user: loginUser
                });

            } catch (e){
                return next(e);
            }
        } else {
            try {
                const errors:CredError = {}

                if(!credential && !password){

                    errors.credential = "Email or username is required";
                    errors.password = "Password is required";
                    throw new InvalidCredentialError("Please pass in a valid username/email and password", errors)

                } else if (!credential && password){

                    errors.credential = "Email or username is required";
                    throw new InvalidCredentialError("Please pass in a valid username/email", errors)

                } else if(credential && !password){
                    errors.password = "Password is required";
                    throw new InvalidCredentialError("Please pass in a valid password", errors)
                } else {
                    errors.credential = "Server Error processing your credential";
                    errors.password = "Server Error processing your password";
                    throw new InvalidCredentialError("There was an error submitting your form. Please Try Again", errors, 500)
                }
            } catch (err){
                return next(err)
            }
        }
    }
);

//get the current user
router.get('/', restoreUser, async(req:any, res:Response) => {
    if(req.user){
        const user = await req.user.getSafeUser();
        res.json({user})
    } else {
        res.json({"user": null})
    }
})


// Log out
router.delete('/', (_req:Request, res:Response) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});


export = router;
