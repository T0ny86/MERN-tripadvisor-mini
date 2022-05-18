import express from "express"

const router = express.Router()

import User from "../models/User.js"

router.post("/register", async (req, res) => {
    try {
        const hashedPassword = ''

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
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
        !foundUser && res.status(400).json({ 'ERR': "Wrong username or password!" })

        const isValidPassword = () => {
           return req.body.password === foundUser.password ? true : false
        }

        !isValidPassword() && res.status(400).json({ 'ERR': "Wrong username or password!" })


        res.status(200).json({ "_id": foundUser._id, "username": foundUser.username })

    } catch (error) {
        res.status(500).json(error)
    }
})




export default router;