import { Request, Response } from "express";
import { AuthReq } from "../../typings/sequelize";

const express = require('express');
// const { User, TestUser, TestColor } = require('../../db/models');
import TestColor from "../../db/models/testcolor";
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/', async(req:Request, res:Response) => {
    // console.log(TestColor)
    const colors = await TestColor.findAll();
    res.json(colors);
})

router.post('/', async(req:Request, res:Response) => {
    // res.json('hello')
    const {name, userId} = req.body
    let isColor = await TestColor.findOne({
        where: {
            name
        }
    })
    if(isColor){
        return res.json("this color already exists")
    } else{
        try {
            const newColor = await TestColor.create({name, userId});
            return res.json(newColor)

        } catch (error) {
            res.json(error)
        }
    }
})


module.exports = router;
