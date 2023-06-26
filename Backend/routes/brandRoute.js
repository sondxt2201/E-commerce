const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createBrand, updateBrand, getallBrand, getBrand, deleteBrand } = require("../controller/brandCtrl.js");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createBrand);

// PUT 
router.put("/update-brand/:id", authMiddleware, isAdmin, updateBrand);

// GET
router.get("/all-brand", getallBrand);
router.get("/:id", getBrand);

// DELETE
router.delete("/delete-brand/:id", authMiddleware, isAdmin, deleteBrand);



module.exports = router;