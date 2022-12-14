import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import PinRoute from './routes/pins'
import UserRoute from './routes/users'
const app = express()

dotenv.config()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


// routes
app.use('/api/pins', PinRoute)
app.use('/api/user', UserRoute)

// connect to server
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Backend server is on: ${PORT}`)
})

// connect to DB
const mongodb_url: string = process.env.MONGODB_URI ? process.env.MONGODB_URI : ""

mongoose.connect(mongodb_url).then(() => {
    console.log(`DB is connected`)
}).catch(err => console.log(err))


