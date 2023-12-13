const express = require('express');
const { userLogin, userRegister } = require("../controller/userController");

// Express route instance
const router = express.Router();

// Route: POST /api/auth/register
router.post('/register', userRegister); // Endpoint to register users

// Route: POST /api/auth/login
router.post('/login', userLogin); // Endpoint to login users

// Export the router for use in the application
module.exports = router;
