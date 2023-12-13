// sellerController.js
const asyncHandler = require('express-async-handler');
const Catalog = require('../models/catalogModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// POST /api/seller/create-catalog
const createCatalog = asyncHandler(async (req, res) => {
    const { items } = req.body;
    const seller_id = req.user.id;

    // Validate if items are provided
    if (!items || items.length === 0) {
        res.status(400).json({ message: 'Items are required to create a catalog' });
        return;
    }

    // Find or create the seller's catalog
    let catalog = await Catalog.findOne({ seller: seller_id });
    /*This condition will check whether that id has the catalog or not .If not it will create the catalog and if yes it will skip
    and go and add the products based on the sellers id */
    if (!catalog) {
        catalog = await Catalog.create({ seller: seller_id, products: [] });
    }

    // Create and add products to the catalog
    for (const item of items) {
        const product = await Product.create({ catalog: catalog._id, name: item.name, price: item.price });

        catalog.products.push(product._id);
    }

    await catalog.save();

    res.status(201).json({ message: 'Catalog created successfully', catalog });
});

// GET /api/seller/orders
const getOrders = asyncHandler(async (req, res) => {
    const seller_id = req.user.id;

    // Find the seller's catalog
    const catalog = await Catalog.findOne({ seller: seller_id });

    if (!catalog) {
        res.status(404).json({ message: 'Seller catalog not found' });
        return;
    }

    // Find all orders that contain products from the seller's catalog  
    const orders = await Order.find({ 'items': { $in: catalog.products } });

    res.status(200).json({ orders });
});


module.exports = { createCatalog, getOrders };
