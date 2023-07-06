const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createBlog, updateBlog, getBlog, getallBlog, deleteBlog, likeBlog, disLikeBlog, uploadImages, deleteImages } = require("../controller/blogCtrl");
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

// POST
router.post("/", authMiddleware, isAdmin, createBlog);
router.post("/upload-image/", authMiddleware, isAdmin, uploadPhoto.array('images', 2), blogImgResize, uploadImages);

// PUT 
router.put("/update-blog/:id", authMiddleware, isAdmin, updateBlog);
router.put("/like", authMiddleware, likeBlog);
router.put("/dislike", authMiddleware, disLikeBlog);

// GET
router.get("/all-blog", getallBlog);
router.get("/:id", getBlog);

// DELETE
router.delete("/delete-blog/:id", authMiddleware, isAdmin, deleteBlog);
router.delete("/delete-blog-image/:id", authMiddleware, isAdmin, deleteImages);


module.exports = router;