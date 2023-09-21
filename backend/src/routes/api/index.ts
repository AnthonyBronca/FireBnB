import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { restoreUser} from "../../utils/auth";

import db from '../../db/models';

const{User, SpotImage, ReviewImage, Review, Spot} = db;

//imports from router files
import userRouter from '../api/users';
import sessionRouter from '../api/session';
import spotsRouter from '../api/spots';
import reviewRouter from '../api/reviews';
import bookingsRouter from '../api/bookings';
import { ForbiddenError, UnauthorizedError } from "../../errors/customErrors";

const router = require('express').Router();

//route usage
router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingsRouter);



router.get(
    '/restore-user',
    (req:any, res:Response) => {
        return res.json(req.user);
    }
);


//delete a spotImage
router.delete('/spot-images/:spotImageId', async(req: CustomeRequest, res: Response, next: NextFunction)=> {
    try {
        if(!req.user) throw new UnauthorizedError('You must be signed in to perform this action');
        let userId = req.user.id;
        let spotImageId = req.params.spotImageId;
        if(!spotImageId) throw new Error('Please pass in a valid spotImageId');

        let spotImage = await SpotImage.findByPk(spotImageId, {include: [{model: Spot}]});
        if(!spotImage) throw new Error('No SpotImage Found with that ID');

        let spot_image = await spotImage.toJSON();
        if(spot_image.Spot.userId !== userId) throw new ForbiddenError('Forbidden: Not your image');

        spotImage.destroy();

        return res.json({spotImage});

    } catch (error) {
        return next(error);
    }
});


//delete a reviewImage
router.delete('/review-images/:reviewImageId', async(req: CustomeRequest, res: Response, next: NextFunction)=> {
    try {
        if(!req.user) throw new UnauthorizedError('You must be signed in to perform this action');
        let userId = req.user.id;
        let reviewImageId = req.params.reviewImageId;
        if(!reviewImageId) throw new Error('Please pass in a valid reviewImageId');

        let reviewImage = await ReviewImage.findByPk(reviewImageId, {include: [{model: Review}]});
        if(!reviewImage) throw new Error('No reviewImage Found with that ID');

        let review_image = await reviewImage.toJSON();

        if(review_image.Review.userId !== userId) throw new ForbiddenError('Forbidden: Not your image');

        reviewImage.destroy();

        return res.json({reviewImage});

    } catch (error) {
        return next(error);
    }
});

export = router;
