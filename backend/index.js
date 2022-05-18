import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log('MongoDB is connected')
        app.listen(PORT, () => console.log(`Server is running on posrt:${PORT}`))
    })
    .catch((err) => console.log(err))


