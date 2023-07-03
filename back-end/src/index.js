require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');

const connectDB = require("./database/index.js");
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});


//Connect to mongoDB
connectDB();

//Routes
const productRouter = require("./controllers/ProductController.js")
const userRouter = require("./controllers/UserController.js")
const orderRouter = require("./controllers/OrderController.js")
const adminRouter = require("./controllers/AdminController.js")

app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/admin', adminRouter);


const dir = path.join(__dirname, 'public');
app.use(express.static(dir));
mongoose.connection.once('open', function() {
    console.log("Connected successfully");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Example app listening on port ${process.env.PORT || 3000}`)
    });
});

