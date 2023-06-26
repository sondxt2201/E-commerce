const express = require("express");
const { createProduct, getProduct, getallProduct, updateProduct, deleteProduct, add2wishlist, rating, uploadImages, deleteImages } = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");

const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createProduct);
router.post("/upload-image/", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);

// PUT
router.put("/update-product/:id", authMiddleware, isAdmin, updateProduct);
router.put("/wishlist", authMiddleware, add2wishlist);
router.put("/rating", authMiddleware, rating)

// GET
router.get("/all-product", getallProduct);
router.get("/:id", getProduct);

// DELETE
router.delete("/delete-product/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;