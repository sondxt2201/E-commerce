const express = require("express");
const { createProduct, getProduct, getallProduct, updateProduct, deleteProduct, add2wishlist, rating, getAllProds} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createProduct);

// PUT
router.put("/update-product/:id", authMiddleware, isAdmin, updateProduct);
router.put("/wishlist", authMiddleware, add2wishlist);
router.put("/rating", authMiddleware, rating)

// GET
router.get("/all-product", getallProduct);
router.get("/admin/all-prod", getAllProds);
router.get("/:id", getProduct);

// DELETE
router.delete("/delete-product/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;