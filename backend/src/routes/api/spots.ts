import { NextFunction, Request, Response } from 'express';
import { CustomeRequest } from "../../typings/express";
import {handleValidationErrors, validateQueryParams, validateSpot} from '../../utils/validation';

const { check } = require('express-validator');


import db from '../../db/models';
import { BookingErrorStack, BookingErrors, ForbiddenError,LoginError,NoResourceError,SpotError,SpotExistsError,UnauthorizedError } from '../../errors/customErrors';
import { GoodSpot, PaginationValues, WhereValues } from '../../typings/data';
import { Op } from 'sequelize';
import { dateConverter } from '../../utils/date-conversion';


const {Spot, SpotImage, Review, ReviewImage, Booking, User} = db;
const router = require('express').Router();


//Get all Spots
// TODO: ADD filter and pagination
router.get('/', validateQueryParams, async(req:Request, res: Response, next: NextFunction) => {
    try{
        let result = [];

        let {page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;

        let paginationPage = 0;
        let paginationSize = 0;

        //if page does not exist or is too big
        if(Number(page) > 10 || !page){
            paginationPage = 1;
        } else{
            paginationPage = Number(page)
        }

        if(Number(size) > 20 || !size){
            paginationSize = 20;
        } else {
            paginationSize = Number(size)
        }

        // console.log(paginationPage)
        // console.log(paginationSize)



        const paginationValues: PaginationValues = {};

        if(paginationPage > 0 && paginationSize > 0){
            paginationValues.limit = paginationSize;
            paginationValues.offset = paginationSize * (paginationPage -1);
        };

        const where: WhereValues = {}
        //query for latitude
        if(minLat && maxLat){
            where.lat = {[Op.between]: [Number(minLat), Number(maxLat)]};
        } else if(minLat){
            where.lat = {[Op.gte]: Number(minLat)};
        } else if(maxLat){
            where.lat = {[Op.lte]: Number(maxLat)};
        }

        //query for longitude
        if(minLng && maxLng){
            where.lng = {[Op.between]: [Number(minLng), Number(maxLng)]};
        } else if(minLng){
            where.lng = {[Op.gte]: Number(minLng)};
        } else if(maxLng){
            where.lng = {[Op.lte]: Number(maxLng)};
        }

        //query for price
         if(minPrice && maxPrice){
            where.price = {[Op.between]: [Number(minPrice), Number(maxPrice)]};
        } else if(minPrice){
            where.price = {[Op.gte]: Number(minPrice)};
        } else if(maxPrice){
            where.price = {[Op.lte]: Number(maxPrice)};
        }

        console.log(paginationValues)

        const spots = await Spot.findAll({
            ...paginationValues,
            include: [{model: SpotImage}, {model: User, as: "Owner"}],
        });

        for(let spot of spots){
            let total = 0;
            let avgRating = 0;
            let previewImage = "";

            let spotjson = spot.toJSON();
            let reviews = await Review.findAll({where: {spotId: spotjson.id}});


            for(let review of reviews){
                let revJson = review.toJSON()
                total += revJson.stars;
            }
            avgRating = Number((total / reviews.length).toFixed(2));

            for(let spotimage of spotjson.SpotImages){
                if(spotimage.preview){
                    previewImage = spotimage.url;
                    break;
                }
            }

            let spotObj = {
                id: spotjson.id,
                ownerId: spotjson.Owner.id,
                address: spotjson.address,
                city: spotjson.city,
                state: spotjson.state,
                country: spotjson.country,
                lat: Number(spotjson.lat),
                lng: Number(spotjson.lng),
                name: spotjson.name,
                description: spotjson.description,
                price: spotjson.price,
                createdAt: spotjson.createdAt,
                updatedAt: spotjson.updatedAt,
                avgRating,
                previewImage
            };
            result.push(spotObj);
        }

        res.json({Spots: result, page, size});

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

            if(userspots.length === 0)throw new NoResourceError("No Spots have been created yet!", 404);

            let result = [];
            for(let userspot of userspots){
                let avgRating = 0;
                let total = 0;
                let previewImage = '';
                let userspotJson = userspot.toJSON();
                console.log(userspotJson)
                let reviews = await Review.findAll({where: {spotId: userspotJson.id}})
                if(reviews.length){
                    for(let review of reviews){
                        let rev = review.toJSON();
                        total += rev.stars;
                    }
                }
                for(let image of userspotJson.SpotImages){
                    if(image.preview){
                        previewImage = image.url;
                        break;
                    }
                }

                let created = new Date(userspotJson.createdAt);
                let updated = new Date(userspotJson.updatedAt);

                let createdStr = `${created.getFullYear()}-${created.getMonth()}-${created.getDate()}`;
                let updatedStr = `${updated.getFullYear()}-${updated.getMonth()}-${updated.getDate()}`;

                if(total > 0 && reviews.length){
                    avgRating = total / reviews.length
                }

                let resObj = {
                    id: userspotJson.id,
                    address: userspotJson.address,
                    city: userspotJson.city,
                    state: userspotJson.state,
                    country: userspotJson.country,
                    description: userspotJson.description,
                    name: userspotJson.name,
                    lat: Number(userspotJson.lat),
                    lng: Number(userspotJson.lng),
                    price: userspotJson.price,
                    ownerId: userspotJson.userId,
                    createdAt: createdStr,
                    updatedAt: updatedStr,
                    avgRating,
                    previewImage
                }
                result.push(resObj)
            }

            return res.json({Spots: result});

        }

    }catch (e){
        return next(e);
    }
})

//get details of a current spot
router.get('/:spotId', async(req:CustomeRequest, res: Response, next: NextFunction) => {

    try {
        if(req.params.spotId){
            let spotId = parseInt(req.params.spotId);
            let spot = await Spot.findByPk(spotId, {include: [{model: SpotImage}, {model: User, as: "Owner"}]});
            if(!spot){
                throw new NoResourceError("Spot couldn't be found", 404);
            } else{
                let spotJson = spot.toJSON();
                let avgStarRating = 0;
                let total = 0;
                let reviews = await Review.findAll({where: {spotId: spotJson.id}});
                if(reviews.length){
                    for(let review of reviews){
                        let rev = review.toJSON();
                        total += rev.stars;
                    }
                }
                if(total > 0 && reviews.length){
                    avgStarRating = total / reviews.length;
                }
                delete spotJson.Owner.bio;
                let result = {
                    id: spotJson.id,
                    ownerId:spotJson.userId,
                    address: spotJson.address,
                    city: spotJson.city,
                    state: spotJson.state,
                    country: spotJson.country,
                    lat: Number(spotJson.lat),
                    lng: Number(spotJson.lng),
                    price: spotJson.price,
                    name: spotJson.name,
                    description: spotJson.description,
                    numReviews: reviews.length,
                    createdAt: dateConverter(spotJson.createdAt),
                    updatedAt: dateConverter(spotJson.updatedAt),
                    avgStarRating,
                    SpotImages: spotJson.SpotImages,
                    Owner: spotJson.Owner

                }
                return res.json(result);
            }
        }
    } catch (error) {
        return next(error);
    }
})

// create a spot:
router.post('/', validateSpot, async(req:CustomeRequest, res:Response, next: NextFunction) => {
    try{
        if(!req.user) throw new UnauthorizedError('You must be signed in to perform this action');
        if(req.body && req.user){
            if(!req.body.address ||
               !req.body.city ||
               !req.body.state ||
               !req.body.country ||
               !req.body.name ||
               !req.body.description ||
               !req.body.price ||
               !req.body.lng ||
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
                    lng
                } = req.body;

                try {
                    let spot = await Spot.findOne({where: {[Op.or]: [{address}, {name}]}});
                    if(spot) throw new SpotExistsError()
                } catch (error) {
                    return next(error)
                }

                const newSpot = await Spot.create({
                    address,
                    city,
                    state,
                    country,
                    name,
                    description,
                    price,
                    lat,
                    lng,
                    userId: req.user.id
                });

                let result: GoodSpot = {
                      id: 0,
                      address: "",
                      city: "",
                      state: "",
                      country: "",
                      name: "",
                      description: "",
                      price: 0,
                      lat: 0,
                      lng: 0,
                      userId: 0,
                      createdAt: "",
                      updatedAt: "",

                };
                let newSpotJson = newSpot.toJSON();
                result.address = newSpotJson.address;
                result.city = newSpotJson.city;
                result.state = newSpotJson.state;
                result.name = newSpotJson.name;
                result.country = newSpotJson.country;
                result.description = newSpotJson.description;
                result.price = newSpotJson.price;
                result.lat = Number(newSpotJson.lat);
                result.lng = Number(newSpotJson.lng);
                result.userId = newSpotJson.userId;
                result.id = newSpotJson.id;


                let createdAt = new Date(newSpotJson.createdAt);
                let updatedAt = new Date(newSpotJson.updatedAt);

                let resCreatedDate = `${createdAt.getFullYear()}-${createdAt.getMonth()}-${createdAt.getDate()}`;
                let resUpdatedDate = `${updatedAt.getFullYear()}-${updatedAt.getMonth()}-${updatedAt.getDate()}`;

                result.createdAt = resCreatedDate
                result.updatedAt = resUpdatedDate;

                res.status(201);
                return res.json(result);

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

                if(!spot) throw new NoResourceError("Spot couldn't be found", 404);

                spot = spot.toJSON();
                if(!spot || !spot.id){
                    throw new Error('Spot does not exist');
                } else{
                    try {
                        const newSpotImage = await SpotImage.create({
                            spotId: spot.id,
                            url,
                            preview
                        });
                        if(!newSpotImage) throw new NoResourceError("Error uploading Image", 500)

                        let resultSpotImage = newSpotImage.toJSON();
                        delete resultSpotImage.createdAt;
                        delete resultSpotImage.updatedAt;

                        return res.json(resultSpotImage);

                    } catch (error) {

                    }
                }
            }
        }
    } catch (e: any) {
        return next(e);
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
                if(!oldSpot) throw new NoResourceError("Spot couldn't be found", 404);
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
                if((newSpot.lng !== oldSpot.lng) && newSpot.lng){
                    oldSpot.lng = newSpot.lng;
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

                let oldSpotJson = oldSpot.toJSON();
                let result = {
                   id: oldSpotJson.id,
                   address: oldSpotJson.address,
                   city: oldSpotJson.city,
                   state: oldSpotJson.state,
                   country: oldSpotJson.country,
                   description: oldSpotJson.description,
                   name: oldSpotJson.name,
                   lat: Number(oldSpotJson.lat),
                   lng: Number(oldSpotJson.lng),
                   price: oldSpotJson.price,
                   ownerId: oldSpot.userId,
                   createdAt: dateConverter(oldSpotJson.createdAt),
                   updatedAt: dateConverter(oldSpotJson.updatedAt)
                }

                return res.json(result);
            }
        } else {
            throw new NoResourceError("Spot couldn't be found", 404);
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
            throw new UnauthorizedError('You must be signed in to leave a review');
        }

        let {review, stars} = req.body;
        let spotId = parseInt(req.params.spotId);

        let spot = await Spot.findByPk(spotId);
        if(!spot){
            throw new NoResourceError("Spot couldn't be found", 404)
        }
        spot = await spot.toJSON();

        if(spot.userId === currUser.id){
            throw new Error('You can not leave a review for your own Spot');
        };

        let testReview = await Review.findOne({where: {userId: currUser.id}});

        if(testReview){
           throw new SpotError('User already has a review for this spot', 500);
        }
        let newReview = await Review.create({userId:currUser.id, spotId, review, stars});
        res.status(201);
        return res.json(newReview);

    } catch (error) {
        return next(error);
    }
});


// get reviews for a spot based on id

router.get('/:spotId/reviews', async(req:CustomeRequest, res:Response, next: NextFunction) => {

    let spotId = req.params.spotId;

    try {
        if(!spotId){
            throw new NoResourceError('Invalid Spot Id', 500);
        }

        let spot = await Spot.findByPk(spotId);
        if(!spot){
            throw new NoResourceError("Spot couldn't be found", 404);
        }

        let reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            include: {
                model: ReviewImage
            }
        });

        let resultReviews = [];

        for(let review of reviews){
            let revJson = review.toJSON();
            let user = await User.findByPk(revJson.userId);
            let reviewImages = await ReviewImage.findAll({where: {reviewId: revJson.id}});

            let reviewImagesArr = [];

            for(let reviewImage of reviewImages){
                let revImageJson = reviewImage.toJSON();
                delete revImageJson.createdAt;
                delete revImageJson.updatedAt;
                reviewImagesArr.push(revImageJson);
            }

            let userJson = user.toJSON();


            let resObj = {
                 id: revJson.id,
                 stars: revJson.stars,
                 review: revJson.review,
                 userId: revJson.userId,
                 spotId: revJson.spotId,
                 createdAt: dateConverter(revJson.createdAt),
                 updatedAt: dateConverter(revJson.updatedAt),
                 User: userJson,
                 ReviewImages: reviewImagesArr
            }
            resultReviews.push(resObj)
        }

        return res.json({Reviews: resultReviews});


    } catch (error) {
        return next(error);
    }
});


//Create a booking for a spot

router.post('/:spotId/bookings', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {

        if(!req.params.spotId){
            throw new NoResourceError('You must pass in a valid spot id', 500);
        };

        let spotId = parseInt(req.params.spotId);
        let spot = await Spot.findByPk(spotId);

        let user = req.user;
        if(!user){
            throw new UnauthorizedError('You must be signed in to make a booking');
        };

        if(!spot){
            throw new NoResourceError("Spot couldn't be found", 404);
        };

        if(spot.userId === user.id){
            throw new UnauthorizedError('You can not book your own spot', 401);
        };

        let { startDate, endDate } = req.body;
        if(!startDate || !endDate){
            throw new NoResourceError('You must pass in a valid startDate and valid endDate', 500);
        };

        let checkBooking = await Booking.findAll({where: {userId: user.id}});

        for(let booking of checkBooking){
            if(booking.startDate === startDate){
                let err: BookingErrorStack = {
                    startDate: "Start date conflicts with an existing booking",
                    endDate: "End date conflicts with an existing booking"
                }
                throw new BookingErrors('Sorry, this spot is already booked for the specified dates', 403, err);
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

        return res.json(booking);

    } catch (error) {
        return next(error);
    }
});

//get bookings based on a spotId
router.get('/:spotId/bookings', async(req:CustomeRequest, res: Response, next: NextFunction)=> {

    try {

        if(!req.user) throw new UnauthorizedError('You must be signed in to view this');

        let userId = req.user.id;
        let spotId = parseInt(req.params.spotId);
        let spot = await Spot.findByPk(spotId);

        if(!spot) throw new NoResourceError("Spot couldn't be found", 404);

        if(spot.userId === userId){
            let bookings = await Booking.findAll({where: {spotId}, include: [{model: User}]});
            if(!bookings.length) throw new NoResourceError('No bookings found for that spot', 404);

            let resultsArr = [];

            for(let booking of bookings){
                let bookingJson = booking.toJSON();
                let resultObj = {
                    id: bookingJson.id,
                    userId: bookingJson.userId,
                    spotId: bookingJson.spotId,
                    startDate: bookingJson.startDate,
                    endDate: bookingJson.endDate,
                    User: {
                        id: bookingJson.User.id,
                        firstName: bookingJson.User.firstName,
                        lastName: bookingJson.User.lastName
                    }
                };
                resultsArr.push(resultObj);

            }
                return res.json({Bookings: bookings});

        } else {
            //Return bookings for a Spot you do not own
            let bookings = await Booking.findAll({where: [{spotId}, {userId}]});
            if(!bookings.length) throw new NoResourceError('No bookings found for you for that spot', 404);

            let resultArr = [];

            for(let booking of bookings){
                let bookingJson = booking.toJSON();
                let resultObj = {
                    id: bookingJson.id,
                    userId: bookingJson.userId,
                    spotId: bookingJson.spotId,
                    startDate: bookingJson.startDate,
                    endDate: bookingJson.endDate,
                };

                resultArr.push(resultObj);
            }


            return res.json({Bookings:resultArr});
        }

    } catch (error) {
        return next(error);
    }

});


//delete a spot
router.delete('/:spotId', async(req:CustomeRequest, res: Response, next: NextFunction)=>{

    try {
        if(!req.user) throw new UnauthorizedError('You must be signed in to perform this action');
        let userId = req.user.id;
        let spotId: string | number = req.params.spotId;
        if(!spotId) throw new Error('Please pass in a valid spot id');

        spotId = parseInt(spotId);
        let spot = await Spot.findByPk(spotId);
        if(!spot) throw new NoResourceError("Spot couldn't be found", 404);
        let spotJSON = await spot.toJSON();
        if(spotJSON.userId !== userId) throw new ForbiddenError('Forbidden: This is not your spot');
        spot.destroy();
        return res.json({message: "Successfully deleted"});
    } catch (error) {
        return next(error);
    }
});



export = router;
