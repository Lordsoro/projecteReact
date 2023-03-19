const express = require('express');

const pedidoController = require('../controllers/pedido');
const api = express.Router();

api.post('/pedido', pedidoController.register);

module.exports = api;
