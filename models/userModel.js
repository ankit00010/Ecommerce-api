const mongoose = require('mongoose');//Importing mongoose for scehma creation


// User Schema
const userSchema = new mongoose.Schema({
    // Define the username as a required and unique string
    username: {
        type: String,
        required: true,
        unique: true,
    },
    // Define the email as a required and unique string
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Define the password as a required string
    password: {
        type: String,
        required: true,
    },
    //Usertype as "seller" and "buyer"
    userType: {
        type: String,
        enum: ['buyer', 'seller'], // Enforce allowed values
        required: true,
    },
});

// User MOdel
const User = mongoose.model('User', userSchema);

// Exporting Model
module.exports = User;
