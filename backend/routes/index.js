const express = require('express');
const userRouter = require('./user');
const productRouter = require('./product');
const userCartRouter = require('./user_cart');

const router = express.Router();

router.use('/user', userRouter);

router.use('/product', productRouter);

router.use('/user_cart', userCartRouter);

module.exports = router;
