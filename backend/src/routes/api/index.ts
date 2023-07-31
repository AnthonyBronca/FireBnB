import express, {Request, Response} from 'express'
const router = express.Router();
const {User} = require('../../db/models')

router.get('/users', async(req: Request, res: Response) => {
    const users = await User.findAll();
    res.json(users)
})

router.post('/test', async(req:Request,res:Response) =>{
    res.json({requestBody: req.body});
})




module.exports = {
    apiRouter: router
}
