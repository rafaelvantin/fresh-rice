const mongoose = require("mongoose");

const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v)

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: [50, 'Name can not be more then 50 characters.'],
    },
    price: {
        type: Number,
        require: true,
        min: [0, 'Price can not be less then 0.']
    },
    stock:{
        type: Number,
        require: true,
        min: [0, 'Stock can not be less then 0.']
    },
    pathImage:{
        type: String,
        require: true,
    },
    description:{
        type: String,
        require: true,
        maxLength: [200, 'Description can not be more then 200 characters.'],
    },
    color: {
        type: String,
        required: true,
        validate: [colorValidator, 'Invalid color'],
    },
    frameMaterial: {
        type: String,
        required: true,
        enum: ['Metal', 'Acetato', 'Plástico', 'Titânio'],
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