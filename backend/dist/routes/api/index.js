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
const auth_1 = require("../../utils/auth");
const models_1 = __importDefault(require("../../db/models"));
const { User, SpotImage, ReviewImage, Review, Spot } = models_1.default;
const users_1 = __importDefault(require("../api/users"));
const session_1 = __importDefault(require("../api/session"));
const spots_1 = __importDefault(require("../api/spots"));
const reviews_1 = __importDefault(require("../api/reviews"));
const bookings_1 = __importDefault(require("../api/bookings"));
const router = require('express').Router();
router.use(auth_1.restoreUser);
router.use('/session', session_1.default);
router.use('/users', users_1.default);
router.use('/spots', spots_1.default);
router.use('/reviews', reviews_1.default);
router.use('/bookings', bookings_1.default);
router.get('/restore-user', (req, res) => {
    return res.json(req.user);
});
router.delete('/spot-images/:spotImageId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new Error('You must be signed in to perform this action');
        let userId = req.user.id;
        let spotImageId = req.params.spotImageId;
        if (!spotImageId)
            throw new Error('Please pass in a valid spotImageId');
        let spotImage = yield SpotImage.findByPk(spotImageId, { include: [{ model: Spot }] });
        if (!spotImage)
            throw new Error('No SpotImage Found with that ID');
        let spot_image = yield spotImage.toJSON();
        if (spot_image.Spot.userId !== userId)
            throw new Error('Forbidden: Not your image');
        spotImage.destroy();
        return res.json({ spotImage });
    }
    catch (error) {
        return next(error);
    }
}));
router.delete('/review-images/:reviewImageId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new Error('You must be signed in to perform this action');
        let userId = req.user.id;
        let reviewImageId = req.params.reviewImageId;
        if (!reviewImageId)
            throw new Error('Please pass in a valid reviewImageId');
        let reviewImage = yield ReviewImage.findByPk(reviewImageId, { include: [{ model: Review }] });
        if (!reviewImage)
            throw new Error('No reviewImage Found with that ID');
        let review_image = yield reviewImage.toJSON();
        if (review_image.Review.userId !== userId)
            throw new Error('Forbidden: Not your image');
        reviewImage.destroy();
        return res.json({ reviewImage });
    }
    catch (error) {
        return next(error);
    }
}));
module.exports = router;
//# sourceMappingURL=index.js.map