const mongoose = require('mongoose');

cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                count: Number,
            },
        ],
        cartTotal: Number,
        totalAfterDiscount: Number,
        orderBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: true,
    }
);

const UserCart = mongoose.model("UserCart", cartSchema);
module.exports=UserCart