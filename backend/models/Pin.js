import mongoose from "mongoose"

const PinSchema = new mongoose.Schema({
    username: {
        type: String,
        required,
    },
    title: {
        type: String,
        required,
        unique: true,
        min: 3
    },
    description: {
        type: String,
        required,
    },
    rating: {
        type: Number,
        required,
        min: 0,
        max: 5
    },
    lat: {
        type: Number,
        required
    },
    lon: {
        type: Number,
        required
    }
    // timestamps: true => create automatically 'createdAt' , 'updatedAt'
}, { timestamps: true });


const Pin = mongoose.model('Pin', PinSchema);

export default Pin;