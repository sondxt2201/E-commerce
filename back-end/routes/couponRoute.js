const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createCoupon, getallCoupon, updateCoupon, getCoupon, deleteCoupon } = require("../controller/couponCtrl");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createCoupon);

// PUT 
router.put("/update-coupon/:id", authMiddleware, isAdmin, updateCoupon);

// GET
router.get("/all-coupon", authMiddleware, isAdmin, getallCoupon);
router.get("/:id", getCoupon);

// DELETE
router.delete("/delete-coupon/:id", authMiddleware, isAdmin, deleteCoupon);



module.exports = router;