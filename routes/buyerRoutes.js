


const express = require('express');

const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler'); // Validation token middleware imported
const { getListOfSellers, getSellerCatalog, createOrder } = require("../controller/buyerController");


// Apply validateToken middleware to all routes in this router
router.use(validateToken);
// Route: GET /api/buyer/list-of-sellers
router.get('/list-of-sellers', getListOfSellers);

// Route: GET /api/buyer/seller-catalog/:seller_id
router.get('/seller-catalog/:seller_id', getSellerCatalog);

// Route: POST /api/buyer/create-order/:seller_id
router.post('/create-order/:seller_id', createOrder);

// Exporting the router 
module.exports = router;
