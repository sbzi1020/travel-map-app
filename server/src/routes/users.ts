import express from "express";
import * as bcrypt from 'bcrypt'
import { UserModel } from '../models/User.model'
const UserRoute = express.Router()


// get user
UserRoute.get('/is_valid_user', async (req, res) => {

    try {
        const userParam = req.query
        console.log(`${JSON.stringify(userParam, null, 4)}`)
        // const user = await UserModel.findOne({ username: req.body.usename })
        // console.log(`backend===== user: ${JSON.stringify(user, null, 4)}`)
        res.json(userParam)
        // if (user){

        // // res.status(200).json(user)
        // } else {
        //     // res.json({Error: `Can't find user`})
        // }
    } catch (err) {
        res.status(404).json(err)
    }
})
// create a user
UserRoute.post('/register', async (req, res) => {
    try {
        // generate new password 
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // find the user if in DB 
        // verify is it user already register
        const user = await UserModel.findOne({ username: req.body.username })

        if (!user) {
            // create new user
            const newUser = new UserModel({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            })

            // console.log(`backend register: ${JSON.stringify(newUser, null, 4)}`)
            // save user and send response
            // write to DB
            await newUser.save()
            res.status(201).json(newUser._id)
        } else {
            res.json({ Error: `User already exist` })
        }

    } catch (err) {
        res.status(404).json(err)
    }
})

// UserRoute.post('/login', async (req, res) => {
//     try {
//         // find user
//         const user = await UserModel.findOne({ username: req.body.username })
//         // validate password
//         if (user) {
//             const validPassword = await bcrypt.compare(req.body.password, user.password)
//             !validPassword && res.status(400).json("Wrong username or password!")

//             // send response
//             res.status(200).json({ _id: user._id, username: user.username })
//         } else {
//             res.status(400).json("Wrong username or password!")
//         }
//     } catch (err) {
//         res.status(404).json(err)
//     }
// })

export default UserRoute
