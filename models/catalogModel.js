
const mongoose = require('mongoose');// Importing mongoose to create Schema

// Schema for catalog model
const catalogSchema = new mongoose.Schema({
    //A reference to the 'User' model for the seller
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' model
        required: true,
    },
    // An array of references to the 'Product' model for the products in the catalog
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the 'Product' model
        },
    ],
});

//Catalog model
const Catalog = mongoose.model('Catalog', catalogSchema);

//Exporting
module.exports = Catalog;
