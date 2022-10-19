require("dotenv").config();
require("./config/database").connect();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const express = require("express");
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const userRoute = require('./routes/user');


const app = express();

app.use(express.json());

// Login 
app.use('/api/login', loginRoute);

// Register
app.use('/api/register', registerRoute);

// Users Routes
app.use('/api/users', userRoute);

module.exports = app;