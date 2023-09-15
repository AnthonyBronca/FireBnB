"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const models_1 = __importDefault(require("../../db/models"));
const { User, UserImage, Spot, SpotImage, Review, ReviewImage } = models_1.default;
const router = require('express').Router();
router.post('/:reviewId/images', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let reviewIdStr = req.params.reviewId;
        let reviewId = parseInt(reviewIdStr);
        if (!reviewId) {
            throw new Error("You did not pass in a valid review id");
        }
        let review = yield Review.findByPk(reviewId);
        if (!review) {
            throw new Error("That Review did not exist!");
        }
        let { url } = req.body;
        let reviewImage = yield ReviewImage.create({ reviewId: reviewId, url: url });
        return res.json({ reviewImage });
    }
    catch (error) {
        return next(error);
    }
}));
router.get('/current', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.user;
        if (!user) {
            throw new Error('You must be signed in');
        }
        let reviews = yield Review.findAll({
            where: {
                userId: user.id
            },
            include: [{ model: ReviewImage }]
        });
        return res.json({ reviews });
    }
    catch (error) {
        return next(error);
    }
}));
router.put('/:reviewId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.reviewId) {
            throw new Error('Must pass in a review id');
        }
        let reviewId = parseInt(req.params.reviewId);
        let oldReview = yield Review.findByPk(reviewId);
        let user = req.user;
        if (!oldReview) {
            throw new Error('Review not found');
        }
        let old = oldReview.toJSON();
        if (user && (old.userId !== user.id)) {
            throw new Error('Permission denied');
        }
        let { review, stars } = req.body;
        if (review !== old.review) {
            oldReview.review = review;
        }
        if (stars !== old.stars) {
            oldReview.stars = stars;
        }
        oldReview.save();
        return res.json({ oldReview });
    }
    catch (error) {
        return next(error);
    }
    ;
}));
router.delete('/:reviewId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new Error('You must be signed in to perform this action');
        let userId = req.user.id;
        let reviewId = req.params.reviewId;
        if (!reviewId)
            throw new Error('Please pass in a valid review Id');
        reviewId = parseInt(reviewId);
        let review = yield Review.findByPk(reviewId);
        if (!review)
            throw new Error('No review found with that id');
        let reviewJson = yield review.toJSON();
        if (reviewJson.userId !== userId)
            throw new Error('Forbidden: This is not your review');
        review.destroy();
        return res.json({ review });
    }
    catch (error) {
        return next(error);
    }
}));
module.exports = router;
//# sourceMappingURL=reviews.js.map