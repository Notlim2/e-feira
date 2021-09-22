const express = require('express');
const database = require('../models');
const jwt = require('jsonwebtoken');

const userCartRouter = express.Router();

userCartRouter.get('/', async (req, res) => {
  const token = req.headers.authorization;
  const { id: userId } = jwt.verify(token?.replace('Bearer ', ''), 'segredo');

  const user = await database.User.findOne({ where: { id: userId } });

  if (!user?.id) {
    res.status(400).json({ message: 'Usuário não encontrado' });
  } else {
    const userCart = await database.UserCart.findAll({ where: { userId } });

    res.json(userCart);
  }
});

userCartRouter.post('/', async (req, res) => {
  const { productId, quantity } = req.body;
  const token = req.headers.authorization;

  const { id: userId } = jwt.verify(token?.replace('Bearer ', ''), 'segredo');

  const user = await database.User.findOne({ where: { id: userId } });

  if (!user?.id) {
    res.status(400).json({ message: 'Usuário não encontrado' });
  } else {
    const createdUserCartProduct = database.UserCart.create({
      userId,
      productId,
      quantity,
    });

    res.json(createdUserCartProduct);
  }
});

userCartRouter.patch('/:userCartId', async (req, res) => {
  const { quantity } = req.body;
  const { userCartId } = req.params;

  const userCartProduct = await database.UserCart.findOne({
    where: { id: userCartId },
  });

  if (!userCartProduct) {
    res.status(404).send({ message: 'Produto do carrinho não encontrado' });
  } else {
    userCartProduct.quantity = quantity;

    await userCartProduct.save();

    res.send({ message: 'Produto do carrinho atualizado' });
  }
});

userCartRouter.delete('/:userCartId', async (req, res) => {
  const { userCartId } = req.params;

  const userCartProduct = await database.UserCart.findAll({
    where: { id: userCartId },
  });

  if (!userCartProduct) {
    res.status(400).json({ message: 'Produto não encontrado.' });
  } else {
    await database.UserCart.destroy({ where: { id: userCartId } });

    res.status(200).json({ message: 'Produto removido do carrinho.' });
  }
});

module.exports = userCartRouter;
