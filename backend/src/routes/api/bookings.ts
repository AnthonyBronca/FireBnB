import { NextFunction, Request, Response } from 'express';
import { CustomeRequest } from "../../typings/express";
import db from '../../db/models';

const { check } = require('express-validator');

const {Booking} = db

const router = require('express').Router();

//get all bookings for the current user
router.get('/current', async(req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user){
            throw new Error('You must be signed in to view this');
        };

        let userId = req.user.id;

        let bookings = await Booking.findAll({where: {userId}});
        return res.json({bookings});

    } catch (error) {
        return next(error);
    }

});

//update booking based on booking id

router.put('/:bookingId', async(req:CustomeRequest, res: Response, next: NextFunction) => {

    try {

        if(!req.user) throw new Error('You must be signed in to edit a booking');

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
        if(!req.user) throw new Error('You must be signed in to perform this action');
        let userId = req.user.id;
        let bookingId: string | number = req.params.bookingId;
        if(!bookingId) throw new Error('Please pass in a proper bookingId');
        bookingId = parseInt(bookingId);

        let booking = await Booking.findByPk(bookingId);
        if(!booking) throw new Error('No booking found with that id');
        let bookingJson = await booking.toJSON();
        if(bookingJson.userId !== userId) throw new Error('Forbidden: Not your booking');

        booking.destroy();
        return res.json({booking});

    } catch (error) {
        return next(error);
    }

});

export = router;
