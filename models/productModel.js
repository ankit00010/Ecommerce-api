const mongoose = require('mongoose');//Importing mongoose for scehma creation

// Product Schema
const productSchema = new mongoose.Schema({
    // A reference to the 'Catalog' model for the catalog to which the product belongs
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog', // Reference to the 'Catalog' model
        required: true,
    },

    // products name
    name: {
        type: String,
        required: true,
    },
    // price as required and typeof number
    price: {
        type: Number,
        required: true,
    },
});

//Product Model
const Product = mongoose.model('Product', productSchema);

// Exporting Model
module.exports = Product;
