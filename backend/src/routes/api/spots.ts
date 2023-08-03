import { Request, Response } from "express";
import { AuthReq } from "../../typings/sequelize";

const express = require('express');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

import Spot from '../../db/models/spots'

router.get('/', async(req:Request, res:Response) => {
    // console.log(TestColor)
    const spots = await Spot.findAll();
    res.json(spots);
})




module.exports = router;
