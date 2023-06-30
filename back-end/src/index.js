require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");

const connectDB = require("./database/index.js");
app.use(express.json());


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

mongoose.connection.once('open', function() {
    console.log("Connected successfully");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Example app listening on port ${process.env.PORT || 3000}`)
    });
});

