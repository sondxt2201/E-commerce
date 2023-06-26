const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMongoDbId.js");
const asyncHandler = require("express-async-handler");

// Create Coupon
const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

// Update coupon
const updateCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateCoupon);
    } catch (error) {
        throw new Error(error)
    }
});

// Get coupon
const getCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getCoupon = await Coupon.findById(id);
        res.json(getCoupon);
    } catch (error) {
        throw new Error(error)
    }
});

// Get all Coupon
const getallCoupon = asyncHandler(async (req, res) => {
    try {
        const getallCoupon = await Coupon.find();
        res.json(getallCoupon);
    } catch (error) {
        throw new Error(error);
    }
});

// Delete coupon
const deleteCoupon = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json(deleteCoupon);
    } catch (error) {
        throw new Error(error)
    }
});


module.exports = { createCoupon, updateCoupon, getCoupon, getallCoupon, deleteCoupon }