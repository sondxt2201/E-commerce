const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");

const router = express.Router();

// POST
router.post("/upload-image/", authMiddleware, isAdmin, uploadPhoto.array("images", 10), productImgResize, uploadImages);

// DELETE
router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;