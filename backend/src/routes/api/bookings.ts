import { NextFunction, Request, Response } from "express";

const express = require('express');
const router = express.Router();

import Spot from '../../db/models/spots'
import SpotImage from "../../db/models/spot-images";
import Review from "../../db/models/reviews";
import { ValidationError } from "sequelize";
import Booking from "../../db/models/bookings";
import User from "../../db/models/user";
import { AuthError, SpotError } from "../../errors/customErrors";
import { AuthReq } from "../../typings/sequelize";

//get all bookings
router.get('/:id/all', async(req:Request, res: Response, next:NextFunction) => {
    // const {user} = req;
    const {id} = req.params;

    console.log(req);

    // if(!user){
    //     let err:AuthError = {
    //         name: 'Unauthorized Bookings Access',
    //         message: 'You are not authorized to view this page. Please sign in.',
    //         title: "Unauthorized Action",
    //         status: 403
    //     };
    //     res.status(403);
    //     return next(err)
    // }

    // let userId = user.id;
    const userBookings = await Review.findAll({
        where: {
            userId:id
        }
    })

    return res.json(userBookings)
})

module.exports = router;
