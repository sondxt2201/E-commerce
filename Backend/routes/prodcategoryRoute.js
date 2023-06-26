const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createCategory, updateCategory, getallCategory, getCategory, deleteCategory } = require("../controller/prodcategoryCtrl");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createCategory);

// PUT 
router.put("/update-category/:id", authMiddleware, isAdmin, updateCategory);

// GET
router.get("/all-category", getallCategory);
router.get("/:id", getCategory);

// DELETE
router.delete("/delete-category/:id", authMiddleware, isAdmin, deleteCategory);



module.exports = router;