import { NextFunction, Request, Response } from 'express';
import { CustomeRequest } from "../../typings/express";

import db from '../../db/models';


const {Review, ReviewImage} = db
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
            throw new Error("That Review did not exist!");
        }

        let {url} = req.body;
        let reviewImage = await ReviewImage.create({reviewId:reviewId, url:url});

        return res.json({reviewImage});

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

        return res.json({reviews});

    } catch (error) {
        return next(error);
    }
});

// edit a review
router.put('/:reviewId', async(req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.params.reviewId){
            throw new Error('Must pass in a review id')
        }

        let reviewId = parseInt(req.params.reviewId);
        let oldReview = await Review.findByPk(reviewId);
        let user = req.user;

        if(!oldReview){
            throw new Error('Review not found');
        }


        let old = oldReview.toJSON();

        if( user && (old.userId !== user.id)){
            throw new Error('Permission denied');
        }

        let {review, stars} = req.body;
        if(review !== old.review){
            oldReview.review = review;
        }
        if(stars !== old.stars){
            oldReview.stars = stars;
        }
        oldReview.save();

        return res.json({oldReview});

    } catch (error) {
        return next(error);
    };
});

//Delete a review

router.delete('/:reviewId', async(req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) throw new Error('You must be signed in to perform this action');

        let userId = req.user.id;
        let reviewId: string | number = req.params.reviewId;
        if(!reviewId) throw new Error('Please pass in a valid review Id');
        reviewId = parseInt(reviewId);

        let review = await Review.findByPk(reviewId);
        if(!review) throw new Error('No review found with that id');
        let reviewJson = await review.toJSON();
        if(reviewJson.userId !== userId) throw new Error('Forbidden: This is not your review');
        review.destroy();
        return res.json({review});

    } catch (error) {
        return next(error);
    }




});

export = router;
