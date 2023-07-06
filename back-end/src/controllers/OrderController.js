const router = require("express").Router();
const Order = require("../models/order.js");
const User = require("../models/usuario.js");
const Product = require("../models/product.js");
const mongoose = require('mongoose')


router.get("/", async (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({message: "User not logged in"});
    }

    // return all orders from a user
    const user = User.findById(req.session.user.id);
    if(user == null){
        return res.status(400).send({ error: "User not found" });
    }
    const orders = await Order.find({ user: user._id });
    return res.json(orders);
});

router.post("/", async (req, res) => {
    if(!req.session.user) {
        return res.status(401).json({message: "User not logged in"});
    }

    // create a new order
    const { products, total, payment, address} = req.body;

    console.log(products, total, payment, address);
    try{
        const user = User.findById(req.session.user.id);

        if(user == null){
            return res.status(400).send({ error: "User not found" });
        }
        if(products.length === 0){
            return res.status(400).send({ error: "No products in order" });
        } 
        for(let i = 0; i < products.length; i++){
            const product = await Product.findOne({ _id: products[i]._id });
            if(product == null){
                return res.status(400).send({ error: "Product not found" });
            }
            if(product.stock < products[i].quantity){
                return res.status(400).send({ error: "Product out of stock" });
            }
            product.stock -= products[i].quantity;
            await product.save();
        }
        console.log("Cadastrando");
        console.log(products, total, payment, address);
        const order = await Order.create({ user: user._id, products, total, payment, address});
        return res.status(201).json(
            {
                message:"Order created successfully", 
                order: order
            });
    }catch(erro){
        return res.status(400).send({error: 'Error creating new order', msg: erro});
    }
    
});

module.exports = router;