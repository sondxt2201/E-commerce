const Product = require("../models/productModel.js");
const User = require("../models/userModel.js");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoDbId.js");

// Create product
const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body);
        res.json({ newProduct });
    } catch (error) {
        throw new Error(error);
    }

});

// Get product
const getProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const findProduct = await Product.findById(id);
        res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

// Get all product
const getallProduct = asyncHandler(async (req, res) => {
    try {
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((val) => delete queryObj[val]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

        let query = Product.find(JSON.parse(queryStr));

        // sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // limit the fields
        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const productCount = await Product.countDocuments();
            if (skip >= productCount) {
                throw new Error("This page does not exist");
            }
        }

        const getallProduct = await query;
        res.json(getallProduct);
    } catch (error) {
        throw new Error(error);
    }
})

// update product
const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        };
        const updateProduct = await Product.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true
            }
        );
        res.json({ updateProduct });
    } catch (error) {
        throw new Error(error);
    }
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        };
        const deleteProduct = await Product.findByIdAndDelete(id);
        res.json({ deleteProduct });
    } catch (error) {
        throw new Error(error);
    }
});

// add product to wish list
const add2wishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { prodId } = req.body;
    validateMongoDbId(prodId);
    try {
        const user = await User.findById(_id);
        const alreadyadded = await user.wishlist.find((val) => (val.toString() === prodId));
        if (alreadyadded) {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $pull: { wishlist: prodId }
                },
                {
                    new: true,
                }
            );
            res.json(user);
        } else {
            let user = await User.findByIdAndUpdate(
                _id,
                {
                    $push: { wishlist: prodId }
                },
                {
                    new: true,
                }
            );
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
});

// rate the product
const rating = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { star, comment, prodId } = req.body;
    validateMongoDbId(prodId);
    try {
        const product = await Product.findById(prodId);
        console.log(product)
        let alreadyRated = product.ratings.find((userId) => userId.postedBy.toString() === _id.toString());
        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: { $elemMatch: alreadyRated },
                },
                {
                    $set: { "ratings.$.star": star, "ratings.$.comment": comment },
                },
                {
                    new: true,
                }
            );
        } else {
            const rateProduct = await Product.findByIdAndUpdate(
                prodId,
                {
                    $push: {
                        ratings: {
                            star: star,
                            comment: comment,
                            postedBy: _id,
                        },
                    },
                },
                {
                    new: true,
                }
            );
        }
        const getallRating = await Product.findById(prodId);
        let totalRating = getallRating.ratings.length;
        let ratingsum = getallRating.ratings
            .map((item) => item.star)
            .reduce((prev, cur) => prev + cur, 0);

        let actualRating = Math.round(ratingsum / totalRating);
        let finalProduct = await Product.findByIdAndUpdate(
            prodId,
            {
                totalrating: actualRating,
            },
            {
                new: true,
            }
        );
        res.json(finalProduct);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    createProduct,
    getProduct,
    getallProduct,
    updateProduct,
    deleteProduct,
    add2wishlist,
    rating,
}