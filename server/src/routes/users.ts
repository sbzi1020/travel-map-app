import express from "express";
import * as bcrypt from 'bcrypt'
import { UserModel } from '../models/User.model'
const UserRoute = express.Router()


// create a user
UserRoute.post('/register', async (req, res) => {
    try {
        // generate new password 
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create new user
        const newUser = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        // save user and send response
        // write to DB
        await newUser.save()
        res.status(201).json(newUser._id)
    } catch (err) {
        res.status(404).json(err)
    }
})

UserRoute.post('/login', async (req, res) => {
    try {
        // find user
        const user = await UserModel.findOne({ username: req.body.username })
        // validate password
        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json("Wrong username or password!")

            // send response
            res.status(200).json({ _id: user._id, username: user.username })
        } else {
            res.status(400).json("Wrong username or password!")
        }
    } catch (err) {
        res.status(404).json(err)
    }
})

export default UserRoute
