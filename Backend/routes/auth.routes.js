const express = require('express');
const userController=require('../controllers/user.controllers')
const userRoute = express.Router();


// get all users
userRoute.get('/allusers',userController.getAllUsers)

// register the user
userRoute.post('/register', userController.registerUser);

// login the user
userRoute.post('/login',userController.loginUser)

module.exports = userRoute;