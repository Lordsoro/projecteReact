const express = require('express');

const userController = require('../controllers/user');

const api = express.Router();

api.get('/profile/:userId', userController.profile);
api.delete('/profile/:userId', userController.deleteAccount);
api.put('/profile/:userId', userController.editUser);
api.post('/register', userController.register);
api.post('/login', userController.login);
api.get('/orders/:userId', userController.order);

module.exports = api;
