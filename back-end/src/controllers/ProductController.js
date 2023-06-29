const router = require("express").Router();
const Product = require("../models/product.js");


router.get('/', async (request, response)=> {
    const products = await Product.find({});
    return response.json(products)
})

router.post('/', async (request, response)=> {
    const { name, price, description, pathImage, stock, color, frameMaterial} = request.body;
    try{
        const product = await Product.create({ 
            "name":name, 
            "price": price,
            description, color, stock, pathImage, frameMaterial});

        return response.status(201).json(product)
    }catch(erro){
        return response.status(400).send({error: 'Error creating new product', msg: erro});
    }
})
router.put('/:id', async (request, response)=> {
    const { name, price, description, pathImage, stock, color, frameMaterial} = request.body;
    if(price < 0 || stock < 0){
        return response.status(400).send({error: 'Price or stock cannot be negative'});
    }
    const {id} = request.params;
    const product = await Product.find({ _id: id});
    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.pathImage = pathImage;
        product.stock = stock;
        product.color = color;
        product.frameMaterial = frameMaterial;
        await product.save();
        return response.json(product);
    }else{
        return response.status(400).send({error: 'Product not found'});
    }
})

router.delete('/:id', async (request, response)=> {
    const {id} = request.params;
    const product = await Product.find({ _id: id});
    if(product){
        await product.delete();
        return response.json({message: 'Product deleted'});
    }else{
        return response.status(400).send({error: 'Product not found'});
    }
})

module.exports = router;