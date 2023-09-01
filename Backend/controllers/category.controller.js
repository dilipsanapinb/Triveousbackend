const Category = require('../models/category.model');

// get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const AllCategories = await Category.find();
        res.status(200).json({ message: "All Categories data", AllCategories })
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong at fetch all categories" });
    }
};

// get category by id
exports.getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
        if (!category) {
            res.status(404).json({ message: "Category not found" })
        }
        res.status(200).json({ message: 'Category found', category });
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong at fetch a category by id" });
    }
};

// create a category
exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res
                .status(400)
                .json({ message: "Category name is required" });
        }
        const category = new Category({ name });
        await category.save(); res.status(201).json({ message: "Successfully created a category", category })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Something went wrong at creating the category" })
    }
    
};

// edit the category

exports.editCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        if (name) {
            category.name = name;
        }
        await category.save();

        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Something went wrong while updating the category" });
    }
};

// delete a category;
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        await Category.findByIdAndDelete(categoryId)
        
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res
            .status(500)
            .json({
                message: "Something went wrong while deleting the category",
            });
    }
};