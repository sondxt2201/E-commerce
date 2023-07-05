const Brand = require("../models/brandModel.js");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId.js");

// Create brand
const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});

// Update brand
const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBrand);
    } catch (error) {
        throw new Error(error)
    }
});

// Get brand
const getBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getBrand = await Brand.findById(id);

        res.json(getBrand);
    } catch (error) {
        throw new Error(error)
    }
});

// Get all brand
const getallBrand = asyncHandler(async (req, res) => {
    try {
        const getallBrand = await Brand.find();

        res.json(getallBrand);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Delete brand
const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json(deleteBrand);
    } catch (error) {
        throw new Error(error)
    }
});


module.exports = {
    createBrand,
    updateBrand,
    getBrand,
    getallBrand,
    deleteBrand

}