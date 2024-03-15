import { NextFunction, Response } from "express";
import { CustomeRequest } from "../../typings/express";
import { restoreUser} from "../../utils/auth";

import db from '../../db/models';

//imports from router files
import userRouter from './users';
import sessionRouter from './session';
import spotsRouter from './spots';
import reviewRouter from './reviews';
import bookingsRouter from './bookings';
import mobileRouter from './mobile';
import { ForbiddenError, NoResourceError, UnauthorizedError } from "../../errors/customErrors";
import csurf from "csurf";

const{User, SpotImage, ReviewImage, Review, Spot} = db;
const router = require('express').Router();
const { environment } = require('../../config');
const isProduction = environment === 'production';

//route usage
router.use(restoreUser);
router.use('/mobile/session', mobileRouter);
router.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "lax",
            httpOnly: true
        }
    })
);
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
        if(!spotImage) throw new NoResourceError("Spot Image couldn't be found", 404);

        let spot_image = await spotImage.toJSON();
        if(spot_image.Spot.userId !== userId) throw new ForbiddenError('Forbidden: Not your image');

        spotImage.destroy();

        return res.json({message: "Successfully deleted"});

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
        if(!reviewImage) throw new NoResourceError("Review Image couldn't be found", 404);

        let review_image = await reviewImage.toJSON();

        if(review_image.Review.userId !== userId) throw new ForbiddenError('Forbidden: Not your image');

        reviewImage.destroy();

        return res.json({message: "Successfully deleted"});

    } catch (error) {
        return next(error);
    }
});

export = router;
