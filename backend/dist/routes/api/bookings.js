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
const reviews_1 = __importDefault(require("../../db/models/reviews"));
router.get('/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req;
    if (!user) {
        let err = {
            name: 'Unauthorized Bookings Access',
            message: 'You are not authorized to view this page. Please sign in.',
            title: "Unauthorized Action",
            status: 403
        };
        res.status(403);
        return next(err);
    }
    let userId = user.id;
    const userBookings = yield reviews_1.default.findAll({
        where: {
            userId
        }
    });
    return res.json(userBookings);
}));
module.exports = router;
//# sourceMappingURL=bookings.js.map