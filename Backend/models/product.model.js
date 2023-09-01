const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required:true,
    },
    color: {
        type: String,
        required:true,
    },
    ratings: [{
        star: Number,
        ratedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
    }],
    availability: {
        type: Boolean,
        default: true,
    },
    brand: {
        type: String,
      required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
}, {
    timestamps:true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;