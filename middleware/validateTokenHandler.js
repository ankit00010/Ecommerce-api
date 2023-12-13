// Importing necessary modules
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middleware to validate JWT tokens
const validateToken = asyncHandler(async (req, res, next) => {
    // Initialize token variable
    let token;

    // Extract Authorization header from the request
    let authHeader = req.headers.Authorization || req.headers.authorization;

    // Check if the Authorization header is present and starts with "Bearer"
    if (authHeader && authHeader.startsWith("Bearer")) {
        // Split the Authorization header to extract the token
        const tokenArray = authHeader.split(" ");
        token = tokenArray.length >= 2 ? tokenArray[1] : null;

        // If no token is found, respond with a 401 status and an error message
        if (!token) {
            res.status(401);
            throw new Error("Not authorized");
        } else {
            // Verify the token using the ACCESS_TOKEN_SECRET
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                // If verification fails, respond with a 401 status and call the error handling middleware
                if (err) {
                    res.status(401);
                    return next(new Error("User is not authorized"));
                }
                // Log the decoded user information and attach it to the request object
                console.log("Decoded user:", decoded.user);
                req.user = decoded.user;
                // Move to the next middleware in the request-response cycle
                next();
            });
        }
    } else {
        // If Authorization header is not present or doesn't start with "Bearer", respond with a 401 status and an error message
        res.status(401);
        throw new Error("Not authorized");
    }
});

// Export the validateToken middleware for use in the application
module.exports = validateToken;
