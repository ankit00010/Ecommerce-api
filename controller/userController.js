

const asyncHandler = require('express-async-handler');     // Middleware for simplifying error handling in asynchronous route handlers.
const User = require("../models/userModel");    //User Model
const bcrypt = require("bcrypt");       // For password hashing 
const jwt = require("jsonwebtoken");     // JWT for authorization


// Endpoint: POST /api/auth/register
// Two types: buyers and sellers
// A user can sign up as a buyer or as a seller
// REGISTER USER
const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password, userType } = req.body; // Destructuring it.

    // Validation: Checking that  if any required field is missing if it is then send the error of  400
    if (!username || !email || !password || !userType) {
        res.status(400);
        throw new Error("All fields are mandatory"); // Returns a 400 response and throw an error
    }

    // Check if the user with the given email already exists or not
    const userExists = await User.findOne({ email });
    if (userExists) {
        // comparing the email from the body and the database
        if (userExists.email === email) {
            res.status(400);
            throw new Error("Email already exists"); // Return a 400 response and throw an error
        }
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database user
    const newUser = await User.create({
        username,
        email,
        userType,
        password: hashedPassword,
    });

    // Checking if the user registerd successfully or not
    if (newUser) {
        res.status(201).json({
            message: "User registered Successfully",
            success: true,
            user: newUser,
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
});


// ___________________________________________________________________________________________________________//



// Endpoint: POST /api/auth/login
// LOGIN USER
const userLogin = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;  //Destructuring the user

    if ((!username && !email) || !password) {   // Missing field check and to get the username or email  for login and password being mandatory
        res.status(400);
        throw new Error("Either username or email is required, and password is mandatory");
    }

    let user;       //declaration of user to store  the email or the password based on req.body

    if (username) {
        user = await User.findOne({ username });
    } else {
        user = await User.findOne({ email });
    }

    // comparing the password and hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {                             //payload
                username: user.username,
                email: user.email,
                id: user.id,
            }
        },
            process.env.ACCESS_TOKEN_SECRET,       //secret token
            { expiresIn: "15m" }            // session timeout for 15minutes
        );
        res.status(200).json({ accessToken });      //getting access token as response
    } else {
        res.status(401);
        throw new Error("Username, email, or password is not valid");   // Validation error
    }
});



module.exports = { userLogin, userRegister }; //exported