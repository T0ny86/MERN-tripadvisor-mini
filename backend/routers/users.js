import express from "express"

const router = express.Router()

import User from "../models/User.js"
import { passwordHashing, isValidPassword } from "../utils/hashing.js"

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = await passwordHashing(req.body.password)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        const savedUser = await newUser.save();

        res.status(200).json({ 'status: ': 'success', 'returned id: ': savedUser._id })

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {

        const foundUser = await User.findOne({ username: req.body.username })
        if (!foundUser) {
            res.status(400).json({ 'ERR': "Wrong username or password!" })
            return
            /*
            you need to avoid execute "res.xx" more than one time, to prevent this error:
            [  code: 'ERR_HTTP_HEADERS_SENT' ]
            where is occurred, when the compiler reaches the next line after the first "response.xx" sent to the client
            so in my case, i just add "return" to quit from the function
            */
        }

        const isValidPass = await isValidPassword(req.body.password, foundUser.password)

        if (isValidPass) {
            res.status(200).json({ "_id": foundUser._id, "username": foundUser.username })
        } else {
            res.status(400).json({ 'ERR': "Wrong username or password!" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
})




export default router;