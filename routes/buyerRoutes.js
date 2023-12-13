// buyerRoutes.js
const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { getListOfSellers, getSellerCatalog, createOrder } = require("../controller/buyerController")

// GET /api/buyer/list-of-sellers
router.get('/list-of-sellers', validateToken, getListOfSellers);

// GET /api/buyer/seller-catalog/:seller_id
router.get('/seller-catalog/:seller_id', validateToken, getSellerCatalog);

// POST /api/buyer/create-order/:seller_id
router.post('/create-order/:seller_id', validateToken, createOrder);

module.exports = router;
