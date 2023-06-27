const mongoose = require("../database/index.js");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: 'Product',
        },
        quantity: Number,
        price: Number,
    }],
    total: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        select: false,
    },
            
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;