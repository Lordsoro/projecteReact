const express = require('express');

const userController = require('../controllers/user');

const api = express.Router();

api.get('/profile/:userId', userController.profile);
api.delete('/profile/:userId', userController.deleteAccount);
api.post('/register', userController.register);
api.put('/editUser', userController.editUser);
api.post('/login', userController.login);

module.exports = api;
