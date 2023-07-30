import express, {Request, Response} from 'express'
const router = express.Router();




router.post('/test', async(req:Request,res:Response) =>{
    res.json({requestBody: req.body});
})




module.exports = {
    apiRouter: router
}
