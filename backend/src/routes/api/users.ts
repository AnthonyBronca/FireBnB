import { NextFunction, Request, Response } from 'express';
import { AuthReq } from "../../typings/express";
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import {handleValidationErrors} from '../../utils/validation';
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

const {Op} = require('sequelize')


import db from '../../db/models'
import { errors } from '../../typings/errors';

const {User, UserImage} = db


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
        handleValidationErrors
    ];

    // // Sign up
    router.post('/',validateSignup, async (req:Request, res:Response, next: NextFunction) => {
        const { firstName, lastName, email, password, username } = req.body;
        const hashedPassword = bcrypt.hashSync(password);


        let existingUser = await User.findOne({
            where: {
                [Op.or]: {
                    username,
                    email
                }
            }
        })

        if(existingUser){
            if(existingUser) existingUser = existingUser.toJSON()
            let errors: errors = {}

        if(existingUser.email === email){
            errors["email"] = "User with that email already exists";
        }
        if(existingUser.username === username){
            errors["username"] = "User with that username already exists";
        }
        res.status(500)
        return res.json({message: "User already exists", errors})
    } else {
        try{
            const user = await User.create({ firstName, lastName, email, username, hashedPassword });

            await setTokenCookie(res, user);

            return res.json({
                user
            });
        } catch(e){
            return next(e)
        }
    }
    }
);
// Restore session user
router.get('/', restoreUser, async (req:AuthReq, res:Response) => {
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
    } else return res.json({ user: null });
});

//get all users
router.get('/all', async (req:Request, res:Response) => {

    const users = await User.findAll({
        include: {
                model: UserImage,
            }
        });
        res.json(users)
})




export = router;
