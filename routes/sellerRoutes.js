const express = require('express');
const router = express.Router();
const validationAccessToken = require("../middleware/validateTokenHandler");
const { getOrders, createCatalog } = require("../controller/sellerController");
router.use(validationAccessToken);
router.post('/create-catalog', createCatalog);
router.get('/orders', getOrders);



module.exports = router;