require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const connectDB = require("./database/index.js");
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, Cookie");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Expose-Headers", "Set-Cookie");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//Connect to mongoDB
connectDB();

// Set up sessions
app.use(session({
    name: "fresh-rice-session",
    secret: "fr3sh-r1c3-u17r4-ckret-k3y",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 60 * 24 * 7) // 1 week
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: "sessions",
        dbName: "fresh-rice",
        touchAfter: 24 * 3600 // time period in seconds
    })
}));

//Routes
const productRouter = require("./controllers/ProductController.js")
const userRouter = require("./controllers/UserController.js")
const orderRouter = require("./controllers/OrderController.js")
const adminRouter = require("./controllers/AdminController.js")
const authRouter = require("./controllers/AuthenticationController.js")

app.use('/user', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

const dir = path.join(__dirname, 'public');
app.use(express.static(dir));
mongoose.connection.once('open', function() {
    console.log(`Connected successfully to db ${mongoose.connection.db.databaseName}`);
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Example app listening on port ${process.env.PORT || 3000}`)
    });
});

