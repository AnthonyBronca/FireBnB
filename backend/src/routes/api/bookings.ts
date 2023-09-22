import { NextFunction, Request, Response } from 'express';
import { CustomeRequest } from "../../typings/express";
import db from '../../db/models';
import { ForbiddenError, NoResourceError, UnauthorizedError } from '../../errors/customErrors';
import { dateConverter } from '../../utils/date-conversion';

const { check } = require('express-validator');

const {Booking, Spot, SpotImage} = db

const router = require('express').Router();

//get all bookings for the current user (must be logged in)
router.get('/current', async(req: CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user){
            throw new UnauthorizedError('You must be signed in to view this', 401);
        };

        let userId = req.user.id;

        let bookings = await Booking.findAll({where: {userId}});

        let resultBookings = [];
        if(bookings.length > 0){
            for(let booking of bookings){
                let bookingJson = booking.toJSON();
                let bookingSpotJson;
                let bookingSpot = await Spot.findByPk(bookingJson.spotId, {include: [{model: SpotImage, where: {preview: true}}]});
                if (bookingSpot){
                    bookingSpotJson = bookingSpot.toJSON();

                let bookingObj = {
                    id: bookingJson.id,
                    spotId: bookingJson.spotId,
                    Spot: {
                        id: bookingSpotJson.id,
                        ownerId: bookingSpotJson.userId,
                        address: bookingSpotJson.address,
                        city: bookingSpotJson.city,
                        state: bookingSpotJson.state,
                        country: bookingSpotJson.country,
                        lat: Number(bookingSpotJson.lat),
                        lng: Number(bookingSpotJson.lng),
                        name: bookingSpotJson.name,
                        price: bookingSpotJson.price,
                        previewImage: bookingSpotJson.SpotImages[0].url
                    },
                    userId: bookingJson.userId,
                    startDate: bookingJson.startDate,
                    endDate: bookingJson.endDate,
                    createdAt: dateConverter(bookingJson.createdAt),
                    updatedAt: dateConverter(bookingJson.updatedAt)
                }
                resultBookings.push(bookingObj)
            }
            }
            return res.json({Bookings: resultBookings});
        } else {
            throw new NoResourceError("No Bookings found", 404);
        }

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

        if(!bookingId) throw new NoResourceError('Please pass in a valid booking id', 500);
        bookingId = parseInt(bookingId);

        let booking = await Booking.findByPk(bookingId);

        if(!booking) throw new NoResourceError("Booking couldn't be found", 404);

        let oldBooking = await booking.toJSON();

        let {startDate, endDate} = req.body;

        if(oldBooking.startDate !== startDate){
            booking.startDate = startDate;
        }
        if(oldBooking.endDate !== endDate){
            booking.endDate = endDate;
        }

        booking.save();

        return res.json(booking);

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
        if(!booking) throw new NoResourceError("Booking couldn't be found", 404);
        let bookingJson = await booking.toJSON();
        if(bookingJson.userId !== userId) throw new ForbiddenError('Forbidden: Not your booking');

        booking.destroy();
        return res.json({message: "Successfully deleted"});

    } catch (error) {
        return next(error);
    }

});

export = router;
