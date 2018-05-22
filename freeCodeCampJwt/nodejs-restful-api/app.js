var express = require('express');
var app = express();
var db = require('./db');

var UserController = require('./user/UserController');
app.use('/users', UserController);

// auth
var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;