const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        require: true,
    },
    stock:{
        type: Number,
        require: true,
    },
    pathImage:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
    },
    color: {
        type: String,
        required: true,
    },
    frameMaterial: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
        select: false,
    }
}
);

console.log("mongoose", mongoose.connection.readyState)

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;