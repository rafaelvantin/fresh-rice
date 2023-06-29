const router = require("express").Router();
const Order = require("../models/order.js");
const Product = require("../models/product.js");
const mongoose = require('mongoose')


router.get("/:id", async (req, res) => {
    // return all orders from a user
    const orders = await Order.find({ user: req.params.id }).populate("products.product");
    return res.json(orders);
});

router.post("/", async (req, res) => {
    // create a new order
    const { products, total } = req.body;
    try{
        if(products.length === 0){
            return res.status(400).send({ error: "No products in order" });
        } 
        const errors = [];
 
        products.forEach(async (product) => {
            const productResult = await Product.findOne({ _id: product.id });
            if(productResult == null){
                console.log("Product not found");
                errors.push("Product not found");
                return;
            }
            if(productResult.stock < product.quantity){
                errors.push("Product out of stock");
                return;
            }
        });
        console.log(errors);
        if(errors.length > 0){
            return res.status(400).send({ error: errors });
        }
        const order = await Order.create({ user: req.query.id, products, total });
        return res.json(order);
    }catch(erro){
        console.log(erro);
        return res.status(400).send({error: 'Error creating new order', msg: erro});
    }
    
});

module.exports = router;