const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            count: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: [
            "Pending",
            "Order placed",
            "Preparing",
            "Dispatched",
            "Canceled",
            "Delivered",
        ],
        default: "Pending",
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    orderTotal: {
        type: Number,
        required: true,
    },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
