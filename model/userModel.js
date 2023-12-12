const mongoose = require("mongoose");





const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
    },


    email: {
        type: String,
        required: true,
    },


    password: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        enum: ["buyer", "seller"],
        required: true,
    },




})


const User = mongoose.model("User", userSchema, "ecommerceDB");


module.exports = User;
