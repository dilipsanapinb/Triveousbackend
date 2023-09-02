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
        const id = req.params.id;
        const product = await Product.findById(id);
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
exports.editProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            payload,
            { new: true }
        );

        res.status(200).json({ message: "Product updated successfully", updatedProduct });

    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong at edit the product details" });
    }
};

// delete the product

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }
        await Product.findByIdAndDelete(id);

        res.status(200).json({ message: "Product deleted successfully" })
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({
                message: "Something went wrong at delete the product",
            });
    }
};

    