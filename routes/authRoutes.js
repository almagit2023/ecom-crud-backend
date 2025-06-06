const { signup, login } = require('../controllers/authControllers')
const {signupValidation, loginValidation} = require('../middlewares/authValidation')
const express = require('express');
const authRouter = express.Router();


authRouter.post('/signup', signupValidation, signup);
authRouter.post('/login', loginValidation, login);

module.exports = authRouter;

