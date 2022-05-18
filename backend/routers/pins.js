import express from "express"

const router = express.Router()

import Pin from "../models/Pin.js"

router.post("/", async (req, res) => {
    const newPin = new Pin(req.body)
    try {
        const savedPin = await newPin.save()
        res.status(200).json(savedPin)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/", async (req, res) => {
    const newPin = new Pin(req.body)
    try {
        const allPins = await Pin.find()
        res.status(200).json(allPins)
    } catch (error) {
        res.status(500).json(error)
    }
})




export default router;