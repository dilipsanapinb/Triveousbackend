const express = require('express');
const protected = require("../middlewares/authentication");
const authorize = require("../middlewares/authorise");
const orderController=require('../controllers/order.controller')

const orderRoute = express.Router();

// place a order
orderRoute.post('/place-order', protected, orderController.placeOrder);

// order history
orderRoute.get('/order-history',protected,orderController.getOrderHistory)

// fetch order by id
orderRoute.get('/:orderId', protected, orderController.getOrderDetails);

// cahnge the order status
orderRoute.patch('/change-status/:orderId', protected, authorize(['admin', 'retailer']), orderController.updateOrderStatus);




module.exports = orderRoute;
