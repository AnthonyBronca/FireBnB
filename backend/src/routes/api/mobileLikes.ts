import express, { Router, NextFunction, Request, Response } from "express";
import {  NoResourceError } from "../../errors/customErrors";
import db from '../../db/models';
const { User, UserImage, Like, Spot } = db


const router = Router();
// api url: api/mobile/likes/


//make a like
router.post('/:spotId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { userId } = req.body;
        let spotId = req.params.spotId;
        let user = await User.findByPk(userId);
        if (!user) throw new NoResourceError("No User found with that Id", 404);
        let spot = await Spot.findByPk(spotId);
        if (!spot) throw new NoResourceError("No Spot found with that id", 404);

        let like = await Like.create({ userId, spotId });
        res.status(202);

        res.json({ like, Spot: spot })

    } catch (e) {
        next(e);
    }
})

//delete a like
router.delete('/:spotId', async (req: Request, res: Response, next: NextFunction) => {
    try {

        let { userId } = req.body;
        let { spotId } = req.params;
        let user = await User.findByPk(userId);
        if (!user) throw new NoResourceError("No User found with that Id", 404);
        let spot = await Spot.findByPk(spotId);
        if (!spot) throw new NoResourceError("No Spot found with that id", 404);
        let like = await Like.findOne({
            where: {
                userId,
                spotId
            }
        });
        if (!like) throw new NoResourceError("No Like found with that id", 404);
        like.destroy();
        res.status(202);
        res.json(like)
    } catch (e) {
        next(e);
    }
});

//get all likes for a user
router.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { userId } = req.params;
        let user = await User.findByPk(userId);
        if (!user) throw new NoResourceError("No User found with that Id", 500);
        let likes = await Like.findAll({ where: { userId: userId }, include: Spot });
        res.status(200);
        res.json({ likes });
    } catch (error) {
        next(error);
    }
});


export = router;
