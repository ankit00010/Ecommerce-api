// buyerController.js
const asyncHandler = require('express-async-handler');
const Catalog = require('../models/catalogModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
// GET /api/buyer/list-of-sellers
const getListOfSellers = asyncHandler(async (req, res) => {
    const sellers = await User.find({ userType: 'seller' });

    res.status(200).json({ sellers });
});

// GET /api/buyer/seller-catalog/:seller_id
const getSellerCatalog = asyncHandler(async (req, res) => {
    const { seller_id } = req.params;

    const catalog = await Catalog.findOne({ seller: seller_id }).populate('products');

    if (!catalog) {
        res.status(404).json({ message: 'Catalog not found' });
        return;
    }

    res.status(200).json({ catalog });
});

// POST /api/buyer/create-order/:seller_id
const createOrder = asyncHandler(async (req, res) => {
    const { seller_id } = req.params;
    const { items } = req.body;
    const buyer_id = req.user.id;

    // Validate if items are provided
    if (!items || items.length === 0) {
        res.status(400).json({ message: 'Items are required to create an order' });
        return;
    }

    // Find the seller's catalog
    const catalog = await Catalog.findOne({ seller: seller_id });

    if (!catalog) {
        res.status(404).json({ message: 'Seller catalog not found' });
        return;
    }

    // Find or create the buyer's order
    let order = await Order.findOne({ buyer: buyer_id });
    if (!order) {
        order = await Order.create({ buyer: buyer_id, items: [] });
    }

    // Add selected items to the order
    for (const item of items) {
        const product = await Product.findOne({ catalog: catalog._id, name: item.name });

        if (product) {
            order.items.push(product._id);
        }
    }

    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
});

module.exports = { getListOfSellers, getSellerCatalog, createOrder };
