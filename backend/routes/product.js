const express = require('express');
const database = require('../models');

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await database.Product.findAll();

  for (let product of products) {
    product.thumbnail = `http://localhost:3333/${product.thumbnail}`;
  }

  res.json(products);
});

productRouter.get('/:productId', async (req, res) => {
  const { productId } = req.params;

  const product = await database.Product.findOne({ where: { id: productId } });

  if (product) {
    product.thumbnail = `http://localhost:3333/${product.thumbnail}`;
  }

  res.json(product);
});

module.exports = productRouter;
