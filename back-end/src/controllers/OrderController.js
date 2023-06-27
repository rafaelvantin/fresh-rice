const router = require("express").Router();
const Order = require("../models/order.js");
const Product = require("../models/product.js");


router.get("/:id", async (req, res) => {
    // return all orders from a user
    const orders = await Order.find({ user: req.params.id }).populate("products.product");
    return res.json(orders);
});

router.post("/:id", async (req, res) => {
    // create a new order
    const { products, total } = req.body;
    if(products.length === 0){
        return res.status(400).send({ error: "No products in order" });
    }   
    products.forEach(product => {
        Product.findById(product.product, (err, product) => {
            if (err) {
                return res.status(400).send({ error: "Product not found" });
            }
            if (product.stock < product.quantity) {
                return res.status(400).send({ error: "Product out of stock" });
            }
        });
    });

    const order = await Order.create({ user: req.params.id, products, total });
    return res.json(order);
});
