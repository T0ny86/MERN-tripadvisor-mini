import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required,
        unique: true
    },
    password: {
        type: String,
        required,
        min: 6
    }
    // timestamps: true => create automatically 'createdAt' , 'updatedAt'
}, { timestamps: true });


const User = mongoose.model('User', UserSchema);

export default User;