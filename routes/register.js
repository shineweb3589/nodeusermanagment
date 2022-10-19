const router = require('express').Router();
const User = require("../model/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const RegisterController = require('../controllers/register');

router.post('/', RegisterController.register);

module.exports = router;