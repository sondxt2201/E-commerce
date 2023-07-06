const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createblogCategory, updateblogCategory, getallblogCategory, getblogCategory, deleteblogCategory } = require("../controller/blogcatCtrl");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createblogCategory);

// PUT 
router.put("/update-category/:id", authMiddleware, isAdmin, updateblogCategory);

// GET
router.get("/all-category", getallblogCategory);
router.get("/:id", getblogCategory);

// DELETE
router.delete("/delete-category/:id", authMiddleware, isAdmin, deleteblogCategory);



module.exports = router;