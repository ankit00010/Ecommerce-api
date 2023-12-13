const mongoose = require('mongoose');// Importing mongoose to create Schema

//Schema for Order Model
const orderSchema = new mongoose.Schema({
    // A reference to the 'User' model for the buyer
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the 'User' model
        required: true,
    },
    //  An array of references to the 'Product' model for the items in the order
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the 'Product' model
    }],
});

//Order model
const Order = mongoose.model('Order', orderSchema);

//Exporting model
module.exports = Order;