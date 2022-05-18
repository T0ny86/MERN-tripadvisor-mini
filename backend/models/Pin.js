import mongoose from "mongoose"

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        min: 3
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true,
    }
    // timestamps: true => create automatically 'createdAt' , 'updatedAt'
}, { timestamps: true });


const Pin = mongoose.model('Pin', PinSchema);

export default Pin;