const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();

// Establish a connection to the database
connectDB(); // Database connection

// Create an instance of the Express application
const app = express();

// Set the port to 5000 or use the environment variable PORT
const port = 5000 || process.env.PORT;

// Enable JSON parsing for incoming requests
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

// Define routes for different parts of the application
app.use('/api/buyer', require('./routes/buyerRoutes')); // Buyers logic
app.use('/api/sellers', require('./routes/sellerRoutes')); // Sellers logic
app.use('/api/auth', require('./routes/userRoutes')); // Users logic

// Apply the error handler middleware to catch and handle errors
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
