const blogCategory = require("../models/blogcatModel.js")
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId.js");

// Create blog category
const createblogCategory = asyncHandler(async (req, res) => {
    try {
        const newblogCategory = await blogCategory.create(req.body);
        res.json(newblogCategory);
    } catch (error) {
        throw new Error(error);
    }
});

// Update blog category
const updateblogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateblogCategory = await blogCategory.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateblogCategory);
    } catch (error) {
        throw new Error(error)
    }
});

// Get blog category
const getblogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getblogCategory = await blogCategory.findById(id);

        res.json(getblogCategory);
    } catch (error) {
        throw new Error(error)
    }
});

// Get all blog category
const getallblogCategory = asyncHandler(async (req, res) => {
    try {
        const getallblogCategory = await blogCategory.find();

        res.json(getallblogCategory);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Delete blog category
const deleteblogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteblogCategory = await blogCategory.findByIdAndDelete(id);
        res.json(deleteblogCategory);
    } catch (error) {
        throw new Error(error)
    }
});


module.exports = {
    createblogCategory,
    updateblogCategory,
    getblogCategory,
    getallblogCategory,
    deleteblogCategory
}