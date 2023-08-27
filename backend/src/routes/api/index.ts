import express, { Request, Response } from "express";
import { RestoreResponseInterface } from "../../typings/express";
// const { restoreUser, setTokenCookie, requireAuth } = require('../../utils/auth.js');
import { restoreUser, setTokenCookie, requireAuth } from "../../utils/auth";
const { User } = require('../../db/models');

//imports from router files
import userRouter from '../api/users'
import sessionRouter from '../api/session';



const router = require('express').Router();


//route usage
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', userRouter)

// router.use('/spots', spotsRouter);
// router.use('/bookings', bookingsRouter);



// // GET /api/set-token-cookie
// router.get('/set-token-cookie', async (_req:Request, res:Response) => {
//     const user = await User.findOne({
//         where: {
//             username: 'Demo-lition'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user: user });
// });




router.get(
    '/restore-user',
    (req:any, res:Response) => {
        return res.json(req.user);
    }
);


// GET /api/require-auth
// router.get(
//     '/require-auth',
//     requireAuth,
//     (req:any, res:Response) => {
//         return res.json(req.user);
//     }
// );



export = router;
