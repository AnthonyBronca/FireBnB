import { NextFunction, Request, Response } from 'express';
import { AuthReq } from "../../typings/express";
import { setTokenCookie, requireAuth, restoreUser } from "../../utils/auth";
import {handleValidationErrors} from '../../utils/validation';
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');

const {Op} = require('sequelize')


import db from '../../db/models'
import { errors } from '../../typings/errors';
import { NoResourceError } from '../../errors/customErrors';

const {User, UserImage} = db


const router = require('express').Router();

const validateSignup = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('isHost')
        .optional()
        .isBoolean(),
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
        const { firstName, lastName, email, password, username, isHost } = req.body;
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
            const user = await User.create({ firstName, lastName, email, username, hashedPassword, isHost: isHost || false });

            const safeUser = user.getSafeUser();

            await setTokenCookie(res, safeUser);

            return res.json({
                user: safeUser,

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
        const safeUser = user.getSafeUser();
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

router.put('/:id', async (req:Request, res: Response, next: NextFunction) => {
    try{
        const userId = req.params.id;
        if(userId !== String(3)){
            const {firstName, lastName, email} = req.body;
            const user = await User.findByPk(userId);
            if(!user) throw new NoResourceError("No User found with those credentials", 404);
            if(firstName){
                user.firstName = firstName;
            }
            if(lastName){
                user.lastName = lastName;
            }
            if(email){
                user.email = email;
            }
            user.save();
            res.status(202)
            res.json({user})
        } else{
            throw new Error("You can not edit the Demo User account.")
        }
    } catch (e) {
        next(e);
    }
});

router.put('/:id/password', async(req:Request, res:Response, next: NextFunction)=> {
    try {
        const userId = req.params.id;
        if(userId !== String(3)){
            const {password} = req.body;
            const user = await User.findByPk(userId);
            if(!user) throw new NoResourceError("No user found with those credentials", 404);
            if(password){
                user.password = bcrypt.hashSync(password);
            }
            user.save();
            res.status(202);
            res.json({"Message": "Succesfully updated password"});
        } else {
            throw new Error("You can not edit the Demo User account.")
        }
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', async (req:Request, res:Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        if(userId !== String(userId)){

            const user = await User.findByPk(userId);
            if(!user) throw new NoResourceError("No user found with those credentials", 404);
            user.destroy();
            res.status(202);
            res.json({user: null});
        } else{
            throw new Error("You can not delete the Demo User account.")
        }
    } catch (error) {
        next(error);
    }
})




export = router;
