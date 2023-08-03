import { Request, Response } from "express";
import { RestoreResponseInterface } from "../../typings/sequelize";
const router = require('express').Router();

const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
//imports from router files
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js')
const sessionRouter = require('./session.js');


//route usage
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter)


router.post('/test', (req:Request, res:Response) => {
    res.json({ requestBody: req.body });
});

// // GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req:Request, res:Response) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        }
    });
    setTokenCookie(res, user);
    return res.json({ user: user });
});




router.get(
    '/restore-user',
    (req:RestoreResponseInterface, res:Response) => {
        return res.json(req.user);
    }
);



// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
    '/require-auth',
    requireAuth,
    (req:RestoreResponseInterface, res:Response) => {
        return res.json(req.user);
    }
);



module.exports = router;
