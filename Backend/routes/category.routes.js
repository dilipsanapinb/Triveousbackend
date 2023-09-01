const express = require('express');
const categoryController = require('../controllers/category.controller');
const protected = require("../middlewares/authentication");
const authorize = require("../middlewares/authorise");
const categoryRoute = express.Router();

// get all categories
categoryRoute.get(
    '/allcategories',
    categoryController.getAllCategories
);

// get category by id;
categoryRoute.get(
    '/:id',
    categoryController.getCategoryById
);

// create a category
categoryRoute.post(
    '/create',
    protected,
    authorize(['admin']),
    categoryController.createCategory
);

// edit the category
categoryRoute.patch(
    "/edit/:id",
    protected,
    authorize(["admin"]),
    categoryController.editCategory
);

// delet the category
categoryRoute.delete(
    "/delete/:id",
    protected,
    authorize(["admin"]),
    categoryController.deleteCategory
);

module.exports = categoryRoute;