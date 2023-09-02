const express = require("express");
const productController = require("../controllers/product.controller");
const protected = require("../middlewares/authentication");
const authorize = require("../middlewares/authorise");
const productRoute = express.Router();

// get all products
productRoute.get("/allproducts", productController.getAllProducts);

// get a product by id
productRoute.get("/:id", productController.getProductById);

// create product
productRoute.post(
  "/create",
  protected,
  authorize(["admin", "retailer"]),
  productController.createPoduct
);

// edit the product details
productRoute.patch(
  "/edit/:id",
  protected,
  authorize(["admin", "retailer"]),
  productController.editProduct
);

// delete the product
productRoute.delete(
  "/delete/:id",
  protected,
  authorize(["admin", "retailer"]),
  productController.deleteProduct
);

module.exports = productRoute;
