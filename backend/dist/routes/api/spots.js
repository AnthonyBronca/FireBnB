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
const validation_1 = require("../../utils/validation");
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const models_1 = __importDefault(require("../../db/models"));
const { User, UserImage, Spot, SpotImage } = models_1.default;
const router = require('express').Router();
const validateSpot = [
    check('address')
        .isLength({ min: 4 })
        .withMessage('Please provide a valid address.'),
    check('city')
        .isLength({ min: 2 })
        .withMessage('Please provide a city name with at least 2 characters.'),
    check('name')
        .isLength({ min: 4 })
        .withMessage('Name must be 4 characters or more.'),
    validation_1.handleValidationErrors
];
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spots = yield Spot.findAll({ include: [{ model: SpotImage }] });
        res.json({ spots });
    }
    catch (e) {
        return next(e);
    }
}));
router.get('/current', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user) {
            let userId = req.user.id;
            let userspots = yield Spot.findAll({
                where: {
                    userId
                },
                include: [{ model: SpotImage }]
            });
            if (userspots.length === 0) {
                return res.json({ Error: "You do not have any Spots created yet!" });
            }
            else {
                return res.json({ spots: userspots });
            }
        }
    }
    catch (e) {
        return next(e);
    }
}));
router.post('/', validateSpot, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body && req.user) {
            if (!req.body.address ||
                !req.body.city ||
                !req.body.state ||
                !req.body.country ||
                !req.body.name ||
                !req.body.description ||
                !req.body.price ||
                !req.body.long ||
                !req.body.lat) {
                return res.json({ error: "You must fill out all mandatory fields in the form" });
            }
            else {
                let { address, city, state, country, name, description, price, lat, long } = req.body;
                const newSpot = yield Spot.create({
                    address,
                    city,
                    state,
                    country,
                    name,
                    description,
                    price,
                    lat: Number(lat),
                    long: Number(long),
                    userId: req.user.id
                });
                return res.json({ spot: newSpot });
            }
        }
    }
    catch (e) {
        return next(e);
    }
}));
router.post('/:spotId/images', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body) {
            if (!req.body.url) {
                return res.json({ error: "You did not pass in a url" });
            }
            else {
                let { url, preview } = req.body;
                if (!req.body.preview) {
                    preview = false;
                }
                let spot = yield Spot.findByPk(req.params.spotId);
                spot = spot.toJSON();
                if (!spot || !spot.id) {
                    throw new Error('Spot does not exist');
                }
                else {
                    const newSpotImage = yield SpotImage.create({
                        spotId: spot.id,
                        url,
                        isPreview: preview
                    });
                    return res.json({ spotImage: newSpotImage });
                }
            }
        }
    }
    catch (e) {
        return next(e);
    }
}));
router.get('/:spotId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.spotId) {
            let spotId = parseInt(req.params.spotId);
            let spot = yield Spot.findByPk(spotId, { include: [SpotImage] });
            if (!spot) {
                throw new Error("Spot was not found");
            }
            else {
                return res.json({ spot });
            }
        }
    }
    catch (error) {
        return next(error);
    }
}));
router.put('/:spotId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.spotId) {
            if (req.body) {
                let id = parseInt(req.params.spotId);
                let newSpot = req.body;
                let newPrice;
                if (newSpot.price) {
                    newPrice = parseInt(newSpot.price);
                }
                let oldSpot = yield Spot.findByPk(id);
                oldSpot = oldSpot.toJSON();
                if ((newSpot.adress !== oldSpot.address) && newSpot.address) {
                    oldSpot.address = newSpot.address;
                }
                if ((newSpot.city !== oldSpot.city) && newSpot.city) {
                    oldSpot.city = newSpot.city;
                }
                if ((newSpot.state !== oldSpot.state) && newSpot.state) {
                    oldSpot.state = newSpot.state;
                }
                if ((newSpot.country !== oldSpot.state) && newSpot.country) {
                    oldSpot.country = newSpot.country;
                }
                if ((newSpot.lat !== oldSpot.lat) && newSpot.lat) {
                    oldSpot.lat = newSpot.lat;
                }
                if ((newSpot.long !== oldSpot.long) && newSpot.long) {
                    oldSpot.long = newSpot.long;
                }
                if ((newSpot.name !== oldSpot.name) && newSpot.name) {
                    oldSpot.name = newSpot.name;
                }
                if ((newSpot.description !== oldSpot.description) && newSpot.description) {
                    oldSpot.description = newSpot.description;
                }
                if (newPrice && (newPrice !== oldSpot.price)) {
                    oldSpot.price = newPrice;
                }
                yield oldSpot.save();
                return res.json({ spot: oldSpot });
            }
        }
        else {
            throw new Error("Spot was not found");
        }
    }
    catch (error) {
        return next(error);
    }
}));
module.exports = router;
//# sourceMappingURL=spots.js.map