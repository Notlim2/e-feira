const express = require('express');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
const database = require('../models');

userRouter.get('/', async (req, res) => {
  const token = req.headers.authorization;
  const { id: userId } = jwt.verify(token?.replace('Bearer ', ''), 'segredo');

  const user = await database.User.findOne({ where: { id: userId } });

  if (!user) {
    res.status(404).send({ message: 'Usuário não encontrado' });
  } else {
    user.password = undefined;
    res.status(200).send(user);
  }
});

userRouter.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  const user = await database.User.findOne({ where: { email, password } });
  if (!user) {
    res.status(400).send({ message: 'Usuário ou senha incorretos' });
  } else {
    const token = jwt.sign({ id: user.id }, 'segredo');

    user.password = undefined;
    res.status(200).send({ user, token });
  }
});

module.exports = userRouter;
