const express = require("express");
const path = require('path')
const cors = require("cors");
const dotenv = require("dotenv");
const authMiddleware = require('./auth');
const jwt = require('jsonwebtoken');
const { Sequelize, DataTypes } = require("sequelize"); 
const db = require("./config/db");
const orderdetailRouter = require('./routers/orderdetailRouter');
const orderRouter = require('./routers/orderRouter');
const paymentRouter = require('./routers/paymentRouter');
const productRouter = require('./routers/productRouter');
const userRouter = require('./routers/userRouter');

dotenv.config();
const app = express();
app.use(express.json());


app.use(cors({
    origin: 'http://localhost:3001'
}))

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));


app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/payment', paymentRouter);
app.use('/order', orderRouter);
app.use('/orderdetail', orderdetailRouter);


// Database ve server
const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
    .then(() => {
        console.log("Connected to the database");
        app.listen(PORT, () => {
            console.log('Server is running on port', PORT);
        });
    })
    .catch(err => {
        console.error("Error:", err);
    });
