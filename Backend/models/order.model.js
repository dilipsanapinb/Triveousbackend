const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        requied: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  items: [orderItemSchema],
  status: {
    type: String,
    enum: ["Pending", "Order placed", "Preparing", "Dispached","Canceled", "Delivered"],
    default: "Pending",
    },
    orderDate: {
        type: Date,
        default:Date.now,
    },
    OrderTotal: {
        type: Number,
        required:true
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;