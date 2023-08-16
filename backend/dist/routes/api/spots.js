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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const spots_1 = __importDefault(require("../../db/models/spots"));
const spot_images_1 = __importDefault(require("../../db/models/spot-images"));
const reviews_1 = __importDefault(require("../../db/models/reviews"));
const customErrors_1 = require("../../errors/customErrors");
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const spots = yield spots_1.default.findAll({
        include: {
            model: spot_images_1.default,
            as: "SpotImage",
        },
    });
    res.json(spots);
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let spotId = parseInt(id);
    let spot = yield spots_1.default.findByPk(spotId, {
        include: {
            model: reviews_1.default,
            as: "Review"
        }
    });
    if (spot) {
        return res.json(spot);
    }
    else {
        res.json('Could not find a Spot based on that id');
        let err = new customErrors_1.SpotError('Unable to find that Spot!');
        err.status = 404;
        err.title = "Spot Not Found";
        return next(err);
    }
}));
module.exports = router;
//# sourceMappingURL=spots.js.map