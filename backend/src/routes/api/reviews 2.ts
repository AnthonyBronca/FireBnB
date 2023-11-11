import { NextFunction, Request, Response } from 'express';
import { CustomeRequest } from "../../typings/express";

import db from '../../db/models';
import { ForbiddenError, NoResourceError, UnauthorizedError } from '../../errors/customErrors';
import { dateConverter } from '../../utils/date-conversion';
import { ReviewError, validateReview } from '../../utils/validation';


const {Review, ReviewImage, User, Spot, SpotImage} = db
const router = require('express').Router();

//great an Image for a Review
router.post('/:reviewId/images', async(req:CustomeRequest, res:Response, next:NextFunction) => {

    try {
        let reviewIdStr = req.params.reviewId;
        let reviewId = parseInt(reviewIdStr);

        if(!reviewId){
            throw new Error("You did not pass in a valid review id");
        }

        let review = await Review.findByPk(reviewId);
        if(!review){
            throw new NoResourceError("Review couldn't be found", 404);
        }

        let {url} = req.body;
        let reviewImage = await ReviewImage.create({reviewId:reviewId, url:url});

        let resultImage = reviewImage.toJSON();

        let result = {
            id: resultImage.id,
            url: resultImage.url
        }

        res.status(200);
        return res.json(result);

    } catch (error) {
        return next(error);
    }
});

// get reviews of the current user
router.get('/current', async(req:CustomeRequest, res: Response, next: NextFunction)=>{
    try {
        let user = req.user;
        if(!user){
            throw new Error('You must be signed in')
        }

        let reviews = await Review.findAll({
            where: {
                userId: user.id
            },
            include: [{model: ReviewImage}]
        })

        let result = [];

        for(let review of reviews){


            let rev = review.toJSON();

            let owner = await User.findByPk(rev.userId);
            let ownerJson = owner.toJSON();
            let spot = await Spot.findByPk(rev.spotId, {include: [{model: SpotImage}]});
            let spotJson = spot.toJSON();
            let reviewImages = await ReviewImage.findAll({where: {reviewId: rev.id}})


            delete spotJson.createdAt;
            delete spotJson.updatedAt;
            let spotPreviewImage = '';
            let reviewImagesArr = [];


            for(let spotImages of spotJson.SpotImages){
                // let spotImg = spotImages.toJSON();
                if(spotImages.preview){
                    spotPreviewImage = spotImages.url;
                    break;
                }
            };

            for(let revImage of reviewImages){
                let revImageJson = revImage.toJSON();
                delete revImageJson.createdAt;
                delete revImageJson.updatedAt;
                reviewImagesArr.push(revImageJson);
            }


            spotJson.previewImage = spotPreviewImage;
            spotJson.lat = Number(spotJson.lat);
            spotJson.lng = Number(spotJson.lng);

            let userIdPlaceHolder = spotJson.userId;
            delete spotJson.userId;
            delete spotJson.SpotImages
            spotJson.ownerId = userIdPlaceHolder;

            let revObj = {
                id: rev.id,
                userId: rev.userId,
                spotId: rev.spotId,
                review: rev.review,
                stars: rev.stars,
                createdAt: dateConverter(rev.createdAt),
                updatedAt: dateConverter(rev.updatedAt),
                User: ownerJson,
                Spot: spotJson,
                ReviewImages: reviewImagesArr
            }

            result.push(revObj);
        }



        return res.json({Reviews: result});

    } catch (error) {
        return next(error);
    }
});


// edit a review
router.put('/:reviewId', validateReview, async(req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.params.reviewId){
            throw new Error('Must pass in a review id')
        }

        let reviewId = parseInt(req.params.reviewId);
        let oldReview = await Review.findByPk(reviewId);
        let user = req.user;

        if(!oldReview){
            throw new NoResourceError("Review couldn't be found", 404);
        }


        let old = oldReview.toJSON();

        if( user && (old.userId !== user.id)){
            throw new ForbiddenError('Permission denied', 409);
        }

        let {review, stars} = req.body;
        if(review !== old.review){
            oldReview.review = review;
        }
        if(stars !== old.stars){
            oldReview.stars = stars;
        }
        oldReview.save();

        let reviewJson = oldReview.toJSON();

        let reviewObj = {
            id: reviewJson.id,
            stars: reviewJson.stars,
            review: reviewJson.review,
            userId: reviewJson.userId,
            spotId: reviewJson.spotId,
            createdAt: dateConverter(reviewJson.createdAt),
            updatedAt: dateConverter(reviewJson.updatedAt)
        }


        return res.json(reviewObj);

    } catch (error) {
        return next(error);
    };
});

//Delete a review

router.delete('/:reviewId', async(req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) throw new UnauthorizedError('You must be signed in to perform this action');

        let userId = req.user.id;
        let reviewId: string | number = req.params.reviewId;
        if(!reviewId) throw new Error('Please pass in a valid review Id');
        reviewId = parseInt(reviewId);

        let review = await Review.findByPk(reviewId);
        if(!review) throw new NoResourceError("Review couldn't be found", 404);
        let reviewJson = await review.toJSON();
        if(reviewJson.userId !== userId) throw new ForbiddenError('Forbidden: This is not your review');
        review.destroy();
        return res.json({message: "Successfully deleted"});

    } catch (error) {
        return next(error);
    }




});

export = router;
