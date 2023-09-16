import { NextFunction, Request, Response } from 'express';
import { CustomeRequest } from "../../typings/express";
import {handleValidationErrors} from '../../utils/validation';

const { check } = require('express-validator');


import db from '../../db/models';


const {Spot, SpotImage, Review, ReviewImage, Booking} = db;
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
            });

            if(userspots.length === 0){
                return res.json({Error: "You do not have any Spots created yet!"});
            } else {
                return res.json({spots: userspots});
            }
        }

    }catch (e){
        return next(e);
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
                return res.json({error: "You must fill out all mandatory fields in the form"});
               } else{

                let {
                    address,
                    city,
                    state,
                    country,
                    name,
                    description,
                    price,
                    lat,
                    long
                } = req.body;

                const newSpot = await Spot.create({
                    address,
                    city,
                    state,
                    country,
                    name,
                    description,
                    price,
                    lat,
                    long,
                    userId: req.user.id
                });

                return res.json({spot: newSpot});

               }
        }
    }catch(e){
        return next(e);
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

                    return res.json({spotImage: newSpotImage});
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
                    newPrice = parseInt(newSpot.price);
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
                    oldSpot.long = newSpot.long;
                }
                if((newSpot.name !== oldSpot.name) && newSpot.name){
                    oldSpot.name = newSpot.name;
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
            throw new Error("Spot was not found");
        }
    } catch (error) {
        return next(error);
    }
});


//validation for Review:
const validateReview = [
    check('review')
        .isLength({min: 2, max: 70})
        .withMessage('Please provide a valid address.'),
    handleValidationErrors
];


//Create a Review for a Spot
router.post('/:spotId/reviews', validateReview, async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(req.params.spotId === null){
            throw new Error('You must pass in a valid spotId');
        }
        if(!req.body.review){
            throw new Error('You must pass in a review');
        }
        if(!req.body.stars){
            throw new Error('You must pass in a stars rating from 0 - 5');
        }

        if(!req.body){
            throw new Error('You must pass in a review and stars rating');
        }
        let currUser = req.user;
        if(!currUser){
            throw new Error('You must be signed in to leave a review');
        }

        let {review, stars} = req.body;
        let spotId = parseInt(req.params.spotId);

        let spot = await Spot.findByPk(spotId);
        if(!spot){
            throw new Error('Spot was not found')
        }
        spot = await spot.toJSON();

        if(spot.userId === currUser.id){
            throw new Error('You can not leave a review for your own Spot');
        };

        let testReview = await Review.findOne({where: {userId: currUser.id}});

        if(testReview){
           throw new Error('You already have a review for this spot')
        }
        let newReview = await Review.create({userId:currUser.id, spotId, review, stars});

        return res.json({review: newReview});

    } catch (error) {
        return next(error);
    }
});


// get reviews for a spot based on id

router.get('/:spotId/reviews', async(req:CustomeRequest, res:Response, next: NextFunction) => {

    let spotId = req.params.spotId;

    try {
        if(!spotId){
            throw new Error('Invalid Spot Id');
        }

        let spot = await Spot.findByPk(spotId);
        if(!spot){
            throw new Error('Spot did not exist');
        }

        let reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            include: {
                model: ReviewImage
            }
        });

        return res.json({reviews});


    } catch (error) {
        return next(error);
    }
});


//Create a booking for a spot

router.post('/:spotId/bookings', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {

        if(!req.params.spotId){
            throw new Error('You must pass in a valid spot id');
        };

        let spotId = parseInt(req.params.spotId);
        let spot = await Spot.findByPk(spotId);

        let user = req.user;
        if(!user){
            throw new Error('You must be signed in to make a booking');
        };

        if(!spot){
            throw new Error('Spot did not exist');
        };

        if(spot.userId === user.id){
            throw new Error('You can not book your own spot');
        };

        let { startDate, endDate } = req.body;
        if(!startDate || !endDate){
            throw new Error('You must pass in a valid startDate and valid endDate');
        };

        let checkBooking = await Booking.findAll({where: {userId: user.id}});

        for(let booking of checkBooking){
            if(booking.startDate === startDate){
                throw new Error('You already have another booking on this start date!')
            };
        }

        let booking = await Booking.create({
            userId: user.id,
            spotId,
            startDate,
            endDate
        });

        if(!booking){
            throw new Error('Booking could not be created');
        };

        return res.json({booking});

    } catch (error) {
        return next(error);
    }
});

router.get('/:spotId/bookings', async(req:CustomeRequest, res: Response, next: NextFunction)=> {

    try {

        if(!req.user) throw new Error('You must be signed in to view this');

        let userId = req.user.id;
        let spotId = parseInt(req.params.spotId);
        let spot = await Spot.findByPk(spotId);

        if(!spot) throw new Error('No spot found with that id');

        if(spot.userId === userId){
            let bookings = await Booking.findAll({where: {spotId}});
            if(!bookings.length) throw new Error('No bookings found for that spot');
                return res.json({bookings});

        } else {
            let bookings = await Booking.findAll({where: [{spotId}, {userId}]});
            if(!bookings.length) throw new Error('No bookings found for you for that spot');

            return res.json({bookings});
        }

    } catch (error) {
        return next(error);
    }

});


//delete a spot

router.delete('/:spotId', async(req:CustomeRequest, res: Response, next: NextFunction)=>{

    try {
        if(!req.user) throw new Error('You must be signed in to perform this action');
        let userId = req.user.id;
        let spotId: string | number = req.params.spotId;
        if(!spotId) throw new Error('Please pass in a valid spot id');

        spotId = parseInt(spotId);
        let spot = await Spot.findByPk(spotId);
        if(!spot) throw new Error('No spot found with that id');
        let spotJSON = await spot.toJSON();
        if(spotJSON.userId !== userId) throw new Error('Forbidden: This is not your spot');
        spot.destroy();
        return res.json({spot});
    } catch (error) {
        return next(error);
    }
});



export = router;
