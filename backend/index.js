import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
import pinRoute from "./routers/pins.js"
import userRoute from "./routers/users.js"

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api/pins", pinRoute)
app.use("/api/users", userRoute);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => {
        console.log('MongoDB is connected')
        app.listen(PORT, () => console.log(`Server is running on posrt:${PORT}`))
    })
    .catch((err) => console.log(err))


