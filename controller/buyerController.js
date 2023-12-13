

const asyncHandler = require('express-async-handler');//Error Handling Middleware
//Required Models for Buyers controllers logic
const Catalog = require('../models/catalogModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

//Endpoint: GET /api/buyer/list-of-sellers
//An order consists of a list of products
//GET LIST OF SELLERS
const getListOfSellers = asyncHandler(async (req, res) => {
    //Retrieving the decoded id through access token
    const sellers = await User.find({ userType: 'seller' });

    // Responding  with the list of sellers 
    res.status(200).json({ sellers });
});




//Endpoint: GET /api/buyer/seller-catalog/:seller_id
//Buyers can GET a specific seller's catalog (list of items)
//GET CATALOG OF SELLER
const getSellerCatalog = asyncHandler(async (req, res) => {
    // Extract the seller_id from the request parameters
    const { seller_id } = req.params;

    // Find a catalog associated with the specified seller and populate its products
    const catalog = await Catalog.findOne({ seller: seller_id }).populate('products');

    // If no catalog is found, respond with a 404 status and an error message
    if (!catalog) {
        res.status(404);
        throw new Error("Catalog not found");
    }

    // Respond with the found catalog 
    res.status(200).json({ catalog });
});



//Endpoint: POST /api/buyer/create-order/:seller_id
//Buyers can create an Order that contains a list of items from the seller's catalog
//POST CREATE ORDER 
const createOrder = asyncHandler(async (req, res) => {
    // Extract parameters from the request
    const { seller_id } = req.params;
    const { items } = req.body;
    const buyer_id = req.user.id;

    // Validate if items are not provided in the request
    if (!items || items.length === 0) {

        res.status(400);
        throw new Error("Items are required to create an order");
    }

    // Find the seller's catalog based on the provided seller_id
    const catalog = await Catalog.findOne({ seller: seller_id });

    // If no catalog is found, respond with a 404 status and an error message
    if (!catalog) {
        res.status(404);
        throw new Error("Seller catalog not found");
    }

    // Find or create the buyer's order
    let order = await Order.findOne({ buyer: buyer_id });
    if (!order) {
        order = await Order.create({ buyer: buyer_id, items: [] });
    }

    // Add selected items from the catalog to the order
    for (const item of items) {
        const product = await Product.findOne({ catalog: catalog._id, name: item.name });

        // If a product is found add its ID to the order items
        if (product) {
            order.items.push(product._id);
        }
    }

    // Save the order with the added items
    await order.save();

    // Respond with a 201 status and a success message along with the created order
    res.status(201).json({ message: 'Order created successfully', order });
});


module.exports = { getListOfSellers, getSellerCatalog, createOrder };//exporting
