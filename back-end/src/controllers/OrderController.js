const router = require("express").Router();
const Order = require("../models/order.js");
const User = require("../models/usuario.js");
const Product = require("../models/product.js");
const mongoose = require('mongoose')


router.get("/", async (req, res) => {
    // return all orders from a user
    const user = User.findOne({ _id: req.query.id });
    if(user == null){
        return res.status(400).send({ error: "User not found" });
    }
    const orders = await Order.find({ user: req.query.id });
    return res.json(orders);
});

router.post("/", async (req, res) => {
    // create a new order
    const { products, total } = req.body;
    try{
        if(products.length === 0){
            return res.status(400).send({ error: "No products in order" });
        } 
        /*const errors = [];
        products.forEach(async (product) => {
            const productResult = await Product.findOne({ _id: product.id });
            if(productResult == null){
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
        }*/
        const user = User.findOne({ _id: req.query.id });
        if(user == null){
            return res.status(400).send({ error: "User not found" });
        }

        const order = await Order.create({ user: req.query.id, products, total });
        return res.status(201).json(
            {
                message:"Order created successfully", 
                order: order
            });
    }catch(erro){
        console.log(erro);
        return res.status(400).send({error: 'Error creating new order', msg: erro});
    }
    
});

module.exports = router;