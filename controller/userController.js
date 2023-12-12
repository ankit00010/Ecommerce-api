const asyncHandler = require('express-async-handler');
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password, type } = req.body; // Destructuring

    // Validation: Check if any required field is missing
    if (!username || !email || !password || !type) {
        res.status(400);
        throw new Error("All fields are mandatory"); // Return a 400 response and throw an error
    }

    // Check if the user with the given email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        // Check if the username is the same as an existing user's username
        if (userExists.email === email) {
            res.status(400);
            throw new Error("Email already exists"); // Return a 400 response and throw an error
        }
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
        username,
        email,
        type,
        password: hashedPassword,
    });

    // Check if the user was created successfully
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



//@desc Login a user
//@route POST /api/users/login
//@access PUBLIC
const userLogin = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    console.log(username + " and " + email + " and " + password);

    if ((!username && !email) || !password) {
        res.status(400);
        throw new Error("Either username or email is required, and password is mandatory");
    }

    let user;

    if (username) {
        user = await User.findOne({ username });
    } else {
        user = await User.findOne({ email });
    }

    // comparing the password and hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Username, email, or password is not valid");
    }
});



module.exports = { userLogin, userRegister };