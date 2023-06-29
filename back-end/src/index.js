require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = require("./database/index.js");
const express = require('express');
const app = express();
app.use(express.json());


//Connect to mongoDB
connectDB();

//require("./controllers/UserController.js")(app);
//require("./controllers/AdminController.js")(app);
const productRouter = require("./controllers/ProductController.js")
app.use('/products', productRouter);
// require("./controllers/AuthController.js")(app);
// require("./controllers/SecretariaController.js")(app);
// require("./controllers/DenunciaController.js")(app);
mongoose.connection.once('open', function() {
    console.log("Connected successfully");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Example app listening on port ${process.env.PORT || 3000}`)
    });
});

