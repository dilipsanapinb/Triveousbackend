const Order = require("../models/order.model");
const UserCart = require("../models/cart.model");
const Product = require("../models/product.model");
// place a order
exports.placeOrder = async (req, res) => {
  try {
    const userId = req.body.userId;
    const userCart = await UserCart.findOne({ orderBy: userId });

    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    let orderTotal = 0;
    for (const item of userCart.products) {
      const product = await Product.findById(item.product);

      if (product) {
        orderTotal += item.count * product.price;
      }

      const order = new Order({
        user: userId,
        items: userCart.products,
        orderTotal,
        status: "Order placed",
      });
      await order.save();

      // clear the cart

      await UserCart.findOneAndUpdate({ orderBy: userId }, { products: [] });

      res.status(201).json({ message: "Order Placed successfully", order });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: "Something went wrong while placing the order" });
  }
};

// order history
exports.getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ user: userId }).sort({ orderDate: -1 });

    res.status(200).json({ message: "Order history", orders });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Something went wrong while fetching order history",
    });
  }
};

// get order by id
exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order details fetch successfully", order });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Something went wrong while fetching order details by id",
    });
  }
};

// update the order status
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status;
        await order.save();
        
        res.status(200).json({ message: "Status updated successfully", order });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "Something went wrong while updating the order status",
        });
    }
};
