import { NextFunction, Request, Response } from 'express';
import { CustomeRequest } from "../../typings/express";
import {handleValidationErrors, validateQueryParams, validateSpot} from '../../utils/validation';

const { check } = require('express-validator');

import db from '../../db/models';
import { BookingErrorStack, BookingErrors, ForbiddenError,LoginError,NoResourceError,SpotError,SpotExistsError,UnauthorizedError } from '../../errors/customErrors';
import { GoodSpot, PaginationValues, WhereValues } from '../../typings/data';
import { Op } from 'sequelize';
import { dateConverter } from '../../utils/date-conversion';
const {singleMulterUpload, singlePublicFileUpload} = require('../../awsS3');


const {Spot, SpotImage, Review, ReviewImage, Booking, User, UserImage, Like} = db;
const router = require('express').Router();


//Get all Spots
// TODO: ADD filter and pagination
router.get('/', validateQueryParams, async(req:Request, res: Response, next: NextFunction) => {
    try{
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
            paginationSize = 30;
        } else {
            paginationSize = Number(size)
        }


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


        const spots = await Spot.findAll({
            ...paginationValues,
            include: [
                {model: SpotImage},
                {model: User, as: "Owner"},
                {
                    model: Review,
                    include: [{
                        model: User,
                        include: [
                            {
                                model: UserImage,
                            }
                        ]
                    }]
                },
            ]
        });


        const spotTransform = spots.map((spot:any) => {
            const spotJson = spot.toJSON()
            const {SpotImages, Owner, Reviews, ...res} = spotJson;
            const previewImageUrl = SpotImages.find((image:any) => image.preview === true).url;
            const avgRating = Reviews.reduce((sum:number, review:any) => sum += review.stars ,0) / Reviews.length;
            const fixedRating = isNaN(avgRating) ? "NEW" : avgRating.toFixed(1);

            res.ownerId = Owner.id;
            res.previewImage = previewImageUrl;
            res.avgRating = fixedRating;
            res.reviews = Reviews;
            res.createdAt = dateConverter(res.createdAt);
            res.updatedAt = dateConverter(res.updatedAt);
            return res;
        })

        res.status(200);
        res.json({Spots: spotTransform, page, size});

    } catch (e) {
        return next(e);
    }
})

// Get all the spots owned by the current User:
router.get('/current/:userId', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try{
        const userId = req.params.userId;
        const spots = await Spot.findAll({
            where: {
                userId: userId
            },
            include: [
                {model: SpotImage},
                {model: User, as: "Owner"},
                {
                    model: Review,
                    include: [{
                        model: User,
                        include: [
                            {
                                model: UserImage,
                            }
                        ]
                    }]
                },
            ]
        });

        const spotTransform = spots.map((spot:any) => {
            const spotJson = spot.toJSON()
            const {SpotImages, Owner, Reviews, ...res} = spotJson;
            const previewImageUrl = SpotImages.find((image:any) => image.preview === true).url;
            const avgRating = Reviews.reduce((sum:number, review:any) => sum += review.stars ,0) / Reviews.length;
            const fixedRating = isNaN(avgRating) ? "NEW" : avgRating.toFixed(1);

            res.ownerId = Owner.id;
            res.previewImage = previewImageUrl;
            res.avgRating = fixedRating;
            res.reviews = Reviews;
            res.createdAt = dateConverter(res.createdAt);
            res.updatedAt = dateConverter(res.updatedAt);
            return res;
        })

        res.status(200);
        res.json({Spots: spotTransform});

    } catch (e) {
        res.json({message: e})
    }
})

//get details of a current spot
router.get('/:spotId', async(req:CustomeRequest, res: Response, next: NextFunction) => {
    try {
        if(req.params.spotId){
            let spotId = parseInt(req.params.spotId);
            let spot = await Spot.findByPk(spotId, {
                include: [
                    {
                        model: SpotImage
                    },
                    {
                        model: User, as: "Owner",
                        include: [
                            {
                                model: UserImage,
                                where: {
                                    isProfile: true
                                }
                            }
                        ]
                    },
                    {
                        model: Review,
                        include: [{
                            model: User,
                            include: [{
                                model: UserImage,
                                where: {
                                    isProfile: true
                                }
                            }]
                        }]
                    }
                ]
            });

            if(!spot){
                throw new NoResourceError("Spot couldn't be found", 404);
            } else{
                let spotJson = spot.toJSON();
                const {SpotImages, Owner, Reviews, ...result} = spotJson;
                const avgRating = Reviews.reduce((sum:number, review: any) => sum += review.stars, 0) / Reviews.length;
                const fixedRating = isNaN(avgRating) ? "NEW" : avgRating.toFixed(1);
                result.reviews = Reviews;
                result.createdAt = dateConverter(result.createdAt);
                result.updatedAt = dateConverter(result.updatedAt);
                result.avgRating = fixedRating;
                result.SpotImages = SpotImages;
                result.Owner = Owner;
                result.numReviews = Reviews.length;
                delete spotJson.Owner.bio; //delete this with scope later
                res.status(200)
                return res.json(result);
            }
        }
    } catch (error) {
        return next(error);
    }
})

// create a spot:
router.post('/', singleMulterUpload("image"), async(req:CustomeRequest, res:Response, next: NextFunction) => {
    console.log(req.body)
    try{
        if(!req.body) throw new Error("An Error occured processing your request body. Please Try Again.");
        if(!req.body.userId) throw new UnauthorizedError('You must be signed in to perform this action.');
        if(!req.body.name) throw new Error("You must enter a name for the listing.");
        if(!req.body.address) throw new Error("You must enter an address.");
        if(!req.body.city) throw new Error("You must enter a city.");
        if(!req.body.state) throw new Error("You must enter a state.");
        if(!req.body.country) throw new Error("You must enter a country.");
        if(!req.body.zipcode) throw new Error("You must enter a zipcode.");
        if(!req.body.description) throw new Error("You must enter a description.");
        if(!req.body.price) throw new Error("You must enter a price per night for this listing.");
        // if(!req.file) throw new Error("You must provide at least 1 image for a listing.");

        const {
            name,
            city,
            country,
            description,
            price,
            state,
            address,
            userId,
            lat,
            lng,
        } = req.body;

        //check if the spot already exists with that name or address
        let spot = await Spot.findOne({where: {[Op.or]: [{address}, {name}]}});
        if(spot){
            throw new Error("Spot already exists with that address/name")
        }


        // //check if an image was provided
        let imgUrl: string | undefined = '';
        if(req.file){
            imgUrl = await singlePublicFileUpload(req.file);
        }


        //creates a spot
        const newSpot = await Spot.create({
          address,
          city,
          state,
          country,
          name,
          description,
          price,
          userId,
          lat,
          lng
        });

        if(!newSpot) throw Error("Unable to create a listing. Please try again.");

        const newSpotImg = await SpotImage.create({
            spotId: newSpot.id,
            url: imgUrl,
            preview:true,
        })

        if(!newSpotImg) throw new Error("Unable to process that listing image. Please try again.");

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
                result.spotImage = newSpotImg;

                res.status(201);
                return res.json(result);
    }catch(e){
        return next(e);
    }
});

//create an image for an existing spot

router.post('/:spotId/images', singleMulterUpload('image'), async(req:CustomeRequest, res: Response, next: NextFunction) => {
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
            let spotId = req.params.spotId;

            if(!req.body) throw new NoResourceError('You must pass in a body to update a Spot', 500);

            let {newName, newPrice, userId} = req.body;
            if(newPrice && (typeof newPrice === 'string')){
                newPrice = Number(newPrice);
            }



            const oldSpot = await Spot.findByPk(spotId);
            if(!oldSpot) throw new NoResourceError("Spot couldn't be found", 404);
            let {...response} = oldSpot.toJSON();
            if(response.userId !== userId){
                throw new UnauthorizedError("You are not Authorized to edit this spot", 401);
            } else{
                if(newName && response.name !== newName){
                    oldSpot.name = newName;
                    response.name = newName;
                }
                if(newPrice && response.price !== newPrice){
                    oldSpot.price = newPrice;
                    response.price = newPrice;
                }
                await oldSpot.save();
                res.status(200);
                res.json(response)
            }

        } else{
            throw new NoResourceError("Spot couldn't be found", 404);
        }
    } catch (error) {
        return res.json({message: error});
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

router.post('/:spotId/likes', async(req:Request, res: Response, next: NextFunction) => {
    try{
        let {userId} = req.body;
        let spotId = req.params.spotId;
        let user = await User.findByPk(userId);
        if(!user) throw new NoResourceError("No User found with that Id", 404);
        let spot = await Spot.findByPk(spotId);
        if(!spot) throw new NoResourceError("No Spot found with that id", 404);

        let like = await Like.create({userId, spotId});
        res.status(202);

        res.json({like, Spot:spot})

    } catch (e){
        next(e);
    }
})


router.delete('/:spotId/likes', async(req:Request, res: Response, next: NextFunction) => {
    try{

        let {userId} = req.body;
        let {spotId} = req.params;
        let user = await User.findByPk(userId);
        if(!user) throw new NoResourceError("No User found with that Id", 404);
        let spot = await Spot.findByPk(spotId);
        if(!spot) throw new NoResourceError("No Spot found with that id", 404);
        let like = await Like.findOne({
            where: {
                userId,
                spotId
            }
        });
        if(!like) throw new NoResourceError("No Like found with that id", 404);
        like.destroy();
        res.status(202);
        res.json(like)
    } catch (e){
        next(e);
    }
});

router.get('/likes/:userId', async(req:Request, res: Response, next: NextFunction) => {
    try {
        let {userId} = req.params;
        let user = await User.findByPk(userId);
        if(!user) throw new NoResourceError("No User found with that Id", 500);
        let likes = await Like.findAll({where: {userId: userId}, include: Spot});
        res.status(200);
        res.json({likes});
    } catch (error) {
        next(error);
    }
})

export = router;
