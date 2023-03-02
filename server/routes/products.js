const express = require('express');

const productController = require('../controllers/product');
const api = express.Router();

api.get('/list', productController.getProducts);

module.exports = api;
