
const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler"); // Validation token middleware imported
const { getOrders, createCatalog } = require("../controller/sellerController");

// Apply validateToken middleware to all routes in this router
router.use(validateToken);

// Route: POST /api/seller/create-catalog
router.post('/create-catalog', createCatalog);

// Route: GET /api/seller/orders
router.get('/orders', getOrders);

// Export the router 
module.exports = router;
