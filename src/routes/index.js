const express = require('express');

const routes = express();


const login = require('../controllers/Login/index')
const register = require('../controllers/Register/index')



const Login = new login();
const Register = new register();

routes.post('/login', Login.loginAutenticate);
routes.post('/register', Register.register);



module.exports = routes;