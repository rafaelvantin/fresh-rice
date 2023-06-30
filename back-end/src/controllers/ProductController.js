const router = require("express").Router();
const Product = require("../models/product.js");


router.get('/', async (request, response) => {
    const { name, minPrice, maxPrice, frameMaterial } = request.query;
    
    try{
        const products = await Product.find({
            price: (minPrice && maxPrice) ? { $gte: minPrice, $lte: maxPrice } : { $gte: 0 },
            name: name ? { $regex: name, $options: 'i' } : { $regex: '', $options: 'i' },
            frameMaterial: frameMaterial ? { $regex: frameMaterial, $options: 'i' } : { $regex: '', $options: 'i' },
        });
        return response.json(products);
    }

    catch(erro){
        return response.status(400).send({error: 'Error loading products', msg: erro});
    }
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;

    try{
        const product = await Product.find({ _id: id});
        return response.json(product);
    }

    catch(erro){
        return response.status(400).send({error: 'Error loading product', msg: erro});
    }

});

router.post('/', async (request, response) => {
    const { name, price, description, pathImage, stock, color, frameMaterial } = request.body;
    
    try{
        const product = await Product.create({ 
            "name":name, 
            "price": price,
            description, color, stock, pathImage, frameMaterial}
        );

        return response.status(201).json(product)
    }
    
    catch(erro){
        return response.status(400).send({error: 'Error creating new product', msg: erro});
    }
});

router.put('/:id', async (request, response)=> {
    const { name, price, description, pathImage, stock, color, frameMaterial } = request.body;
    
    try{
        const { id } = request.params;
        const product = await Product.find({ _id: id});
        
        if(product){
            product[0].name = name ? name : product[0].name;
            product[0].price = price ? price : product[0].price;
            product[0].description = description ? description : product[0].description;
            product[0].pathImage = pathImage ? pathImage : product[0].pathImage;
            product[0].stock = stock ? stock : product[0].stock;
            product[0].color = color ? color : product[0].color;
            product[0].frameMaterial = frameMaterial ? frameMaterial : product[0].frameMaterial;
            
            console.log(product[0]);

            await product[0].save();
            
            return response.json(product);
        }else{
            return response.status(400).send({error: 'Product not found'});
        }
    }

    catch(erro){
        return response.status(400).send({error: 'Error updating product', msg: erro});
    }
});

router.delete('/:id', async (request, response)=> {
    const { id } = request.params;

    try {
        const product = await Product.find({ _id: id});

        console.log(product);

        if(product[0]){
            await Product.deleteOne({ _id: id});

            return response.json({message: 'Product deleted'});
        }else{
            return response.status(400).send({error: 'Product not found'});
        }
    }
    
    catch(erro){
        return response.status(400).send({error: 'Error deleting product', msg: erro});
    }
})

module.exports = router;