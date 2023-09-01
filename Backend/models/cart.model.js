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
});

const userCartItemsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: mongoose.Schema.ObjectId,
        required: true,
    },
    items: [cartItemSchema],
});

UserCart = mongoose.model('UserCart', userCartItemsSchema);

module.exports = UserCart;