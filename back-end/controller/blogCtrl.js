const Blog = require("../models/blogModel.js");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId");
const {cloudinaryUploadImg, cloudinaryDeleteImg} = require("../utils/cloudinary");
const fs = require("fs");


// Create blog
const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    } catch (error) {
        throw new Error(error)
    }
});

// Update blog
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error)
    }
});

// Get blog
const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getBlog = await Blog.findById(id)
            .populate("likes")
            .populate("dislikes");
        await Blog.findByIdAndUpdate(
            id,
            {
                $inc: { numViews: 1 }
            },
            {
                new: true
            });
        res.json(getBlog);
    } catch (error) {
        throw new Error(error)
    }
});

// Get all blog
const getallBlog = asyncHandler(async (req, res) => {
    try {
        const getallBlog = await Blog.find();
        res.json(getallBlog);
    }
    catch (error) {
        throw new Error(error);
    }
});

// Delete blog
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog);
    } catch (error) {
        throw new Error(error)
    }
});

// Like blog
const likeBlog = asyncHandler(async (req, res) => {
    const { id } = req.body;
    validateMongoDbId(id);

    // Find the blog which you want to liked
    const blog = await Blog.findById(id);
    // Find the login user
    const loginUserId = req?.user?._id;
    // Find if the user has liked the post
    const isLiked = blog?.isLiked;
    // Find if the user has disliked the post
    const alreadyDisliked = blog?.dislikes?.find((val) => val?.toString() === loginUserId?.toString());
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $pull: { dislikes: loginUserId },
                isDisliked: false,
            },
            {
                new: true,
            }
        );
        res.json({ blog });
    };
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            {
                new: true,
            }
        );
        res.json({ blog });
    } else {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $push: { likes: loginUserId },
                isLiked: true,
            },
            {
                new: true,
            }
        );
        res.json({ blog });
    }
});

// Dislike blog
const disLikeBlog = asyncHandler(async (req, res) => {
    const { id } = req.body;
    validateMongoDbId(id);

    // Find the blog which you want to liked
    const blog = await Blog.findById(id);
    // Find the login user
    const loginUserId = req?.user?._id;
    // Find if the user has disliked the post
    const isDisliked = blog?.isDisliked;
    // Find if the user has disliked the post
    const alreadyLiked = blog?.likes?.find((val) => val?.toString() === loginUserId?.toString());
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $pull: { likes: loginUserId },
                isLiked: false,
            },
            {
                new: true,
            }
        );
        res.json({ blog });
    };
    if (isDisliked) {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $pull: { dislikes: loginUserId },
                isDisliked: false,
            },
            {
                new: true,
            }
        );
        res.json({ blog });
    } else {
        const blog = await Blog.findByIdAndUpdate(
            id,
            {
                $push: { dislikes: loginUserId },
                isDisliked: true,
            },
            {
                new: true,
            }
        );
        res.json({ blog });
    }
});

// upload image to blog
const uploadImages = asyncHandler(async (req, res) => {    
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        };
        const images = urls.map(file => { return file; });
        res.json(images);
    } catch (error) {
        throw new Error(error);
    }
});

// delete image from blog
const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    
    try {
        const deleted = cloudinaryDeleteImg(id, "images");
        res.json({ message: "Deleted" });

    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createBlog,
    updateBlog,
    getBlog,
    getallBlog,
    deleteBlog,
    likeBlog,
    disLikeBlog,
    uploadImages,
    deleteImages
}