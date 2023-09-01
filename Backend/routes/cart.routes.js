const express = require('express');
const cartController = require('../controllers/cart.controller');
const protected = require("../middlewares/authentication");
const authorize = require("../middlewares/authorise");

const cartRoute = express.Router();

// get cartby userId;
cartRoute.get('/:id/all', protected, cartController.getAllItemsFromCart);

// create cart
cartRoute.post('/add', protected, cartController.addToCart);

// delete the cart by id
cartRoute.delete('/delete/:productId',protected,cartController.deleteItemfromCart)

// increase the quantity
cartRoute.patch(
    "/increase/:productId",
    protected,
    cartController.increaseProductQuantity
);
module.exports = cartRoute;