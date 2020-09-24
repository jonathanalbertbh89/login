const express = require('express');

const routes = express();

const User = require('../controllers/UserController/index');


const Login = new User();

routes.post('/login', Login.loginAutenticate);
routes.post('/register', Login.register);

module.exports = routes;