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
const { User, UserImage, Spot, SpotImage, Review, ReviewImage, Booking } = models_1.default;
const router = require('express').Router();
router.get('/current', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw new Error('You must be signed in to view this');
        }
        ;
        let userId = req.user.id;
        let bookings = yield Booking.findAll({ where: { userId } });
        return res.json({ bookings });
    }
    catch (error) {
        return next(error);
    }
}));
router.put('/:bookingId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new Error('You must be signed in to edit a booking');
        let userId = req.user.id;
        let bookingId = req.params.bookingId;
        if (!bookingId)
            throw new Error('Please pass in a valid booking id');
        bookingId = parseInt(bookingId);
        let booking = yield Booking.findByPk(bookingId);
        if (!booking)
            throw new Error('No booking found with that id');
        let oldBooking = yield booking.toJSON();
        let { startDate, endDate } = req.body;
        if (oldBooking.startDate !== startDate) {
            booking.startDate = startDate;
        }
        if (oldBooking.endDate !== endDate) {
            booking.endDate = endDate;
        }
        booking.save();
        return res.json({ booking });
    }
    catch (error) {
        return next(error);
    }
}));
router.delete('/:bookingId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            throw new Error('You must be signed in to perform this action');
        let userId = req.user.id;
        let bookingId = req.params.bookingId;
        if (!bookingId)
            throw new Error('Please pass in a proper bookingId');
        bookingId = parseInt(bookingId);
        let booking = yield Booking.findByPk(bookingId);
        if (!booking)
            throw new Error('No booking found with that id');
        let bookingJson = yield booking.toJSON();
        if (bookingJson.userId !== userId)
            throw new Error('Forbidden: Not your booking');
        booking.destroy();
        return res.json({ booking });
    }
    catch (error) {
        return next(error);
    }
}));
module.exports = router;
//# sourceMappingURL=bookings.js.map