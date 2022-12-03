import express from "express";
import { PinModel } from '../models/Pin.model'
const PinRoute = express.Router()


// create a pin
PinRoute.post('/', async (req, res) => {
    try {
        const newPin = new PinModel(req.body)
        await newPin.save()
        res.status(200).json(newPin)
    } catch (err) {
        res.status(500).json(err)
    }
    // // req.body is your created post content
    // const post = req.body
    // try {
    //     const newPost = new postMessage(post)
    //     // write to DB
    //     await newPost.save()
    //     // send back response
    //     res.status(201).json(newPost)
})

// get all pins
PinRoute.get('/', async (req, res) => {

    try {
        const allPins = await PinModel.find()
        console.log(JSON.stringify(allPins, null, 4))
        res.status(200).json(allPins)
    } catch (err) {
        res.status(404).json(err)
    }
})

export default PinRoute
