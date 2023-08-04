import { NextFunction, Request, Response } from "express";

const express = require('express');
const router = express.Router();

import Spot from '../../db/models/spots'
import SpotImage from "../../db/models/spot-images";
import Review from "../../db/models/reviews";
import { ValidationError } from "sequelize";
import { SpotError } from "../../errors/customErrors";


//get all spots
router.get('/', async(req:Request, res:Response) => {
    // console.log(TestColor)
    const spots = await Spot.findAll({
        include: {
            model: SpotImage,
            as: "SpotImage",
        },
    });
    res.json(spots);
});

//get one spot
router.get('/:id', async(req:Request, res:Response, next: NextFunction) => {
    const {id} = req.params;

    let spotId = parseInt(id);
        let spot = await Spot.findByPk(spotId, {
            include: {
                model: Review,
                as: "Review"
            }
        });

        if(spot){
            return res.json(spot);
        } else {
            res.json('Could not find a Spot based on that id');
            let err = new SpotError('Unable to find that Spot!');
            err.status = 404;
            err.title = "Spot Not Found";
            return next(err);
        }
})




module.exports = router;
