const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    cartTotal:Number,
});

const userCartItemsSchema = new mongoose.Schema({
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: mongoose.Schema.ObjectId,
        required: true,
    },
    items: [cartItemSchema],
}, {
    timestamps:true
});

UserCart = mongoose.model('UserCart', userCartItemsSchema);

module.exports = UserCart;