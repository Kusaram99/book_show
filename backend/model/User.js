import mongoose from 'mongoose';

// Define a User Schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String
    }
});

// Create a User Model
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
