const UserCart = require('../models/cart.model');
const Product = require('../models/product.model');

// create cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const { productId, count } = req.body;
        let cart = await UserCart.findOne({ orderBy: userId });

        if (!cart) {
            cart = new UserCart({ orderBy: userId, products: [] });
        };

        const product = await Product.findById(productId);

        const ProductIndex = cart.products.findIndex(item => item.product.equals(productId));
        if (ProductIndex !== -1) {
            cart.products[ProductIndex].count += count;
        } else {
            cart.products.push({ product: productId, count });

        }
        // cart Total
        cart.cartTotal = await calculateCartTotl(cart.products);
        await cart.save();

        res.status(200).json({ message: "Product added to cart", cart });

    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong while adding to the cart" });
    }
};

async function calculateCartTotl(products) {
    let total = 0;
    for (const item of products) {
        const product = await Product.findById(item.product);
        if (product) {
            total+=item.count*product.price
        }
    }
    return total;
}



// get all items in cart
exports.getAllItemsFromCart= async (req, res) => {
    try {
        const userId = req.body.userId;
        const cart = await UserCart.findOne({ orderBy: userId });
        if (!cart) {
          return res.status(404).json({ message: "Cart not found" });
        }
        const items = cart.products;
        res.status(200).json({ message: "All items from cart", items });
    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong while fetching the cart" });
    }
};

exports.deleteItemfromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const productId  = req.params.id;
        const cart = await UserCart.findOne({ orderBy: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex === -1) {
            console.log("Product not found in the cart:", productId);
            return res.status(404).json({ message: "Product not found in the cart" });
        }

        // Log the product being removed
        console.log("Removing product from cart:", cart.products[productIndex]);

        cart.products.splice(productIndex, 1);

        cart.cartTotal = await calculateCartTotl(cart.products);

        await cart.save();

        res.status(200).json({ message: "Item deleted from cart", cart });
    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong while deleting the cart" });
    }
};

