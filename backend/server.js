const express = require('express');
require('express-async-errors');
var bodyParser = require('body-parser');
const router = require('./routes');
const path = require('path');
var cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(router);
app.use('/images', express.static(path.resolve(__dirname, 'images')));

app.get('/', (req, res) => {
  res.send('Api On!');
});

app.listen(3333);
