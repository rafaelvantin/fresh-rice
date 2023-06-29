const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, ref: 'products',
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