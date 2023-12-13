const asyncHandler = require('express-async-handler'); //Middelware to handle the error

// Required models for the Sellers logic
const Catalog = require('../models/catalogModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// Endpoint: POST /api/seller/create-catalog
// Sellers can build a catalog of items, with each item having a name and price
// A catalog belongs to a seller
//One seller can have one catalog
//A catalog consists of Products
//A product has a name and a price
//CREATE A CATALOG
const createCatalog = asyncHandler(async (req, res) => {

    const { items } = req.body; // Extracting items from the request body

    const seller_id = req.user.id; // Extracting the seller's ID from the authenticated user.


    if (!items || items.length === 0) { // Validating if items are provided or not
        res.status(400);
        throw new Error("Items are required to create a catalog");
    }


    let catalog = await Catalog.findOne({ seller: seller_id });  // Find or create the seller catalog.

    // If the catalog doesnt exist for the seller  create a new one.
    if (!catalog) {
        catalog = await Catalog.create({ seller: seller_id, products: [] });
    }

    // Create and add products to the catalog.
    for (const item of items) {
        // Creating a new product associated with the catalog.
        const product = await Product.create({ catalog: catalog._id, name: item.name, price: item.price });

        // Adding the product ID to the catalog's products array.
        catalog.products.push(product._id);
    }

    // Save the catalog with the added products.
    await catalog.save();

    // Respond with success message and the created catalog.
    res.status(201).json({ message: 'Catalog created successfully', catalog });
});



// ___________________________________________________________________________________________________________//



// Endpoint: GET /api/seller/orders
// Sellers can GET a list of all orders they've received
//LIST ORDERS

const getOrders = asyncHandler(async (req, res) => {
    // Extracting the seller's ID from the authenticated user.
    const seller_id = req.user.id;

    // Find the seller's catalog.
    const catalog = await Catalog.findOne({ seller: seller_id });

    // If the catalog doesnt exist returning  an error.
    if (!catalog) {
        res.status(404);
        throw new Error("Seller catalog not found");
    }

    // Find all orders that contain products from the seller's catalog.
    const orders = await Order.find({ 'items': { $in: catalog.products } });

    // response after the order is created.
    res.status(200).json({ orders });
});


module.exports = { createCatalog, getOrders }; //exporting
