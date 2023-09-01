const Product = require('../models/product.model');

// get all products
exports.getAllProducts = async(req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: "All Products Data", products });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:"Something went wrong at fetch all products"})
    }
}

// get a product by id
exports.getProductById = async (req, res) => {
    try {
        const { productId } = req.params.id;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({ message: "Prdoduct found", product })
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong at fetch product by id" });
    }
};

// create the product

exports.createPoduct = async (req, res) => {
    try {
        const { title, description, price, image, color, ratings, availability, brand, category } = req.body;
        const product = new Product({
            title,
            description,
            price,
            image,
            color,
            ratings,
            availability,
            brand,
            category,
        });
        await product.save();
        res.status(200).json({ message: "Product created successfully", product });
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong at create the user" });
    }
};

// edit the product

// delete the product