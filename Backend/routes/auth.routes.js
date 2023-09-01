const express = require("express");
const userController = require("../controllers/user.controllers");
const protected=require('../middlewares/authentication')
const authorize = require("../middlewares/authorise");
const userRoute = express.Router();

// get all users
userRoute.get("/allusers",protected, authorize(['admin']),userController.getAllUsers);

// register the user
userRoute.post("/register", userController.registerUser);

// login the user
userRoute.post("/login", userController.loginUser);

// generate token using the refresh token
userRoute.get("/refreshtoken", userController.refreshToken);

module.exports = userRoute;
