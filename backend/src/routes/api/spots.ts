import express, { NextFunction, Request, Response } from 'express';
import { AuthReq, CustomeRequest } from "../../typings/express";
import {handleValidationErrors} from '../../utils/validation';

const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const {Op} = require('sequelize')


import db from '../../db/models'
import { errors } from '../../typings/errors';

const {User, UserImage, Spot, SpotImage} = db
const router = require('express').Router();

const validateSpot = [
    check('address')
        .isLength({min: 4})
        .withMessage('Please provide a valid address.'),
    check('city')
        .isLength({ min: 2 })
        .withMessage('Please provide a city name with at least 2 characters.'),
    check('name')
        .isLength({ min: 4 })
        .withMessage('Name must be 4 characters or more.'),
    handleValidationErrors
];

//Get all Spots

router.get('/', async(req:Request, res: Response, next: NextFunction) => {
    try{
        const spots = await Spot.findAll({include: [{model: SpotImage}]});
        res.json({spots});
    } catch (e) {
        return next(e);
    }
})

// Get all the spots owned by the current User:

router.get('/current', async(req:CustomeRequest, res: Response, next: NextFunction) => {

    try{
        if(req.user){
            let userId = req.user.id;
            let userspots = await Spot.findAll({
                where: {
                    userId
                },
                include: [ {model:SpotImage} ]
            })
            if(userspots.length === 0){
                return res.json({Error: "You do not have any Spots created yet!"})
            } else {
                return res.json({spots: userspots})
            }
        }

    }catch (e){
        return next(e)
    }
})

// create a spot:
router.post('/', validateSpot, async(req:CustomeRequest, res:Response, next: NextFunction) => {
    try{
        if(req.body && req.user){
            if(!req.body.address ||
               !req.body.city ||
               !req.body.state ||
               !req.body.country ||
               !req.body.name ||
               !req.body.description ||
               !req.body.price ||
               !req.body.long ||
               !req.body.lat
               ){
                return res.json({error: "You must fill out all mandatory fields in the form"})
               } else{
                let {address, city, state, country, name, description , price, lat, long} = req.body;
                const newSpot = await Spot.create({
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
                return res.json({spot: newSpot})
               }
        }
    }catch(e){
        return next(e)
    }
});

//create an image for an existing spot

router.post('/:spotId/images', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(req.body){
            if(!req.body.url){
                return res.json({error: "You did not pass in a url"})
            } else{
                let {url, preview} = req.body;
                if(!req.body.preview){
                    preview = false;
                }

                let spot = await Spot.findByPk(req.params.spotId);
                spot = spot.toJSON();
                if(!spot || !spot.id){
                    throw new Error('Spot does not exist');
                } else{
                    const newSpotImage = await SpotImage.create({
                        spotId: spot.id,
                        url,
                        isPreview:preview
                    });
                    return res.json({spotImage: newSpotImage})
                }
            }
        }
    } catch (e: any) {
        return next(e);
    }

})

//get details of a current spot

router.get('/:spotId', async(req:CustomeRequest, res: Response, next: NextFunction) => {

    try {
        if(req.params.spotId){
            let spotId = parseInt(req.params.spotId);
            let spot = await Spot.findByPk(spotId, {include: [SpotImage]});
            if(!spot){
                throw new Error("Spot was not found");
            } else{
                return res.json({spot});
            }
        }
    } catch (error) {
        return next(error);
    }
})


//update a spot
router.put('/:spotId', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(req.params.spotId){
            if(req.body){
                let id = parseInt(req.params.spotId);
                let newSpot = req.body;
                let newPrice;
                if(newSpot.price){
                    newPrice = parseInt(newSpot.price)
                }
                let oldSpot = await Spot.findByPk(id);
                //  oldSpot = oldSpot.toJSON();

                if((newSpot.adress !== oldSpot.address) && newSpot.address){
                    oldSpot.address = newSpot.address;
                }
                if((newSpot.city !== oldSpot.city) && newSpot.city){
                    oldSpot.city = newSpot.city;
                }
                if((newSpot.state !== oldSpot.state) && newSpot.state){
                    oldSpot.state = newSpot.state;
                }

                if((newSpot.country !== oldSpot.state) && newSpot.country){
                    oldSpot.country = newSpot.country;
                }

                if((newSpot.lat !== oldSpot.lat) && newSpot.lat){
                    oldSpot.lat = newSpot.lat;
                }
                if((newSpot.long !== oldSpot.long) && newSpot.long){
                    oldSpot.long = newSpot.long
                }
                if((newSpot.name !== oldSpot.name) && newSpot.name){
                    oldSpot.name = newSpot.name
                }
                if((newSpot.description !== oldSpot.description) && newSpot.description){
                    oldSpot.description = newSpot.description;
                }

                if(newPrice && (newPrice !== oldSpot.price)){
                    oldSpot.price = newPrice;
                }
                await oldSpot.save();

                return res.json({spot:oldSpot});
            }
        } else {
            throw new Error("Spot was not found")
        }
    } catch (error) {
        return next(error)
    }
});


export = router;
