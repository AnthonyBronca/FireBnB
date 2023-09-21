import { NextFunction, Request, Response } from 'express';
import { CustomeRequest } from "../../typings/express";
import db from '../../db/models';
import { ForbiddenError, NoResourceError, UnauthorizedError } from '../../errors/customErrors';

const { check } = require('express-validator');

const {Booking} = db

const router = require('express').Router();

//get all bookings for the current user (must be logged in)
router.get('/current', async(req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user){
            throw new UnauthorizedError('You must be signed in to view this', 401);
        };

        let userId = req.user.id;

        let bookings = await Booking.findAll({where: {userId}});
        return res.json({bookings});

    } catch (error) {
        return next(error);
    }

});

//update booking based on booking id (must be logged in)
router.put('/:bookingId', async(req:CustomeRequest, res: Response, next: NextFunction) => {

    try {

        if(!req.user) throw new UnauthorizedError('You must be signed in to edit a booking', 401);

        let userId = req.user.id;
        let bookingId: number | string = req.params.bookingId;

        if(!bookingId) throw new Error('Please pass in a valid booking id');
        bookingId = parseInt(bookingId);

        let booking = await Booking.findByPk(bookingId);

        if(!booking) throw new Error('No booking found with that id');

        let oldBooking = await booking.toJSON();

        let {startDate, endDate} = req.body;

        if(oldBooking.startDate !== startDate){
            booking.startDate = startDate;
        }
        if(oldBooking.endDate !== endDate){
            booking.endDate = endDate;
        }

        booking.save();

        return res.json({booking});

    } catch (error) {
        return next(error);
    }
});

//delete a booking
router.delete('/:bookingId', async(req: CustomeRequest, res: Response, next: NextFunction) => {

    try {
        if(!req.user) throw new UnauthorizedError('You must be signed in to perform this action', 401);
        let userId = req.user.id;
        let bookingId: string | number = req.params.bookingId;
        if(!bookingId) throw new NoResourceError('Please pass in a proper bookingId', 500);
        bookingId = parseInt(bookingId);

        let booking = await Booking.findByPk(bookingId);
        if(!booking) throw new NoResourceError('No booking found with that id', 404);
        let bookingJson = await booking.toJSON();
        if(bookingJson.userId !== userId) throw new ForbiddenError('Forbidden: Not your booking');

        booking.destroy();
        return res.json(booking);

    } catch (error) {
        return next(error);
    }

});

export = router;
