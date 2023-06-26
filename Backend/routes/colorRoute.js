const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createColor, updateColor, getallColor, getColor, deleteColor } = require("../controller/colorCtrl.js");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createColor);

// PUT 
router.put("/update-color/:id", authMiddleware, isAdmin, updateColor);

// GET
router.get("/all-color", getallColor);
router.get("/:id", getColor);

// DELETE
router.delete("/delete-color/:id", authMiddleware, isAdmin, deleteColor);


module.exports = router;