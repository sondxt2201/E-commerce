const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const Cart = require("../models/cartModel.js");
const Coupon = require("../models/couponModel.js");
const Order = require("../models/orderModel.js");
const uniqid = require("uniqid");
const jwt = require("jsonwebtoken");
const Utility = require("../utils/Utility.js")
const asyncHandler = require("express-async-handler");
const sendEmail = require("./emailCtrl");
const crypto = require("crypto");
const generateToken = require("../config/jwtToken");
const validateMongoDbId = require("../utils/validateMongoDbId");
const generateRefreshToken = require("../config/refreshToken");


// user login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        await User.findByIdAndUpdate(
            findUser?.id,
            {
                refreshToken: refreshToken,
            },
            {
                new: true
            });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

// admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role.toLowerCase() !== 'admin') {
        throw new Error("Not Authorized");
    }
    if (findAdmin && await findAdmin.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        await User.findByIdAndUpdate(
            findAdmin?.id,
            {
                refreshToken: refreshToken,
            },
            {
                new: true
            });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

// logout functionality
const logoutUser = asyncHandler(async (req, res) => {
    try {
        const cookie = req.cookies;
        if (!cookie?.refreshToken) {
            throw new Error("No refresh Token in cookies");
        }
        const refreshToken = cookie.refreshToken;
        const user = await User.findOne({ refreshToken });
        // if (!user) {
        //     res.clearCookie("refreshToken", {
        //         httpOnly: true,
        //         secure: true,
        //     });
        //     return res.sendStatus(204); //forbidden
        // }
        await User.findOneAndUpdate({ refreshToken }, {
            refreshToken: "",
        })
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); //forbidden
    } catch (error) {
        throw new Error(error);
    }
});

// create user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //Create a new user
        const newUser = await User.create(req.body);
        res.json({ newUser });
    } else {
        // User already exist
        throw new Error("User already exist")
    }
});

// update user
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            }
        )
        res.json({ updateUser })
    }
    catch (error) {
        throw new Error(error);
    }
});

// delete user
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteUser = await User.findByIdAndUpdate(
            id,
            {
                isDeleted: true
            },
            {
                new: true,
            }
        )
        res.json({ deleteUser })
    }
    catch (error) {
        throw new Error(error);
    }
});

// re-active user
const reActiveUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const reActiveUser = await User.findByIdAndUpdate(
            id,
            {
                isDeleted: false,
            },
            {
                new: true,
            }
        )
        res.json({ reActiveUser })
    }
    catch (error) {
        throw new Error(error);
    }
});

// get all users
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getallUser = await User.find();
        res.json(getallUser);
    }
    catch (error) {
        throw new Error(error);
    }
});

// get user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getUser = await User.findById(id);
        res.json(getUser)
    }
    catch (error) {
        throw new Error(error);
    }
});

// block user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const blockUser = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.json({ blockUser });
    } catch (error) {
        throw new Error(error);
    }
})

// unblock user
const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblockUser = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.json({ unblockUser })
    } catch (error) {
        throw new Error(error);
    }
})

// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    try {
        if (!cookie?.refreshToken) {
            throw new Error("No refresh token in cookie");
        }
        const refreshToken = cookie.refreshToken;
        const user = await User.findOne({ refreshToken });
        if (!user) {
            throw new Error("No refresh token present in db or not matched")
        }
        jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err || user.id !== decoded.id) {
                throw new Error("There is something wrong with refresh token")
            }
            const accessToken = generateToken(user._id)
            res.json({ accessToken });
        });
    } catch (error) {
        throw new Error(error);
    }
});

// update password
const updatePassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        const user = await User.findById(_id);
        if (password) {
            user.password = password;
            const updatedPassword = await user.save();
            res.json(updatedPassword)
        } else {
            res.json(user);
        }
    } catch (error) {
        throw new Error(error);
    }
})

// forgot password token
const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found with this email");
    }
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, please follow this link to reset your password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click Here</a>`
        const data = {
            to: email,
            text: "Reset password",
            subject: "Reset password link",
            htm: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

// reset password
const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() },
        });
        if (!user) {
            throw new Error("Token Expired, Please try again later");
        }
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        res.json(user);
    } catch (error) {
        throw new Error(error);
    }
});

// get wish list
const getWishlist = asyncHandler(async (req, res) => {
    const { cart } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const findUser = await User.findById(_id).populate('wishlist');
        res.json(findUser.wishlist);
    } catch (error) {
        throw new Error(error);
    }
});

// save user's address
const saveAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                address: req?.body?.address,
            },
            {
                new: true,
            }
        )
        res.json({ updateUser })
    }
    catch (error) {
        throw new Error(error);
    }
});


// add product to cart
const userCart = asyncHandler(async (req, res) => {
    const { productId, color, quantity, price } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
        let newCart = await new Cart({
            userId: _id,
            productId,
            color,
            price,
            quantity,
        }).save();
        res.json(newCart);
    } catch (error) {
        throw new Error(error);
    }
});

// get user cart
const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const cart = await Cart.find({ userId: _id }).populate("productId").populate("color");
        res.json(cart)
    } catch (error) {
        throw new Error(error);
    }
});

// empty the cart
const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const user = await User.findOne({ _id });
        const cart = await Cart.findOneAndRemove({ orderBy: User._id });
        res.json("cart was deleted")
    } catch (error) {
        throw new Error(error);
    }
});

// remove 1 product from cart
const removeProductFromCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id } = req.params;
    validateMongoDbId(_id);

    try {
        const deleteProductFromCart = await Cart.deleteOne({
            userId: _id,
            _id: id
        });
        res.json(deleteProductFromCart)
    } catch (error) {
        throw new Error(error);
    }
})

// upadte product quantity from cart
const updateProductQuantity = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { id, quantity } = req.params;
    validateMongoDbId(_id);

    console.log(id, quantity);
    try {
        const cartItem = await Cart.findOne({
            userId: _id,
            _id: id,
        });
        cartItem.quantity = quantity;
        cartItem.save();
        res.json(cartItem)
    } catch (error) {
        throw new Error(error);
    }
})


// apply coupon
// const applyCoupon = asyncHandler(async (req, res) => {
//     const { coupon } = req.body;
//     const { _id } = req.user;
//     validateMongoDbId(_id);
//     try {
//         const validCoupon = await Coupon.findOne({ name: coupon });
//         if (validCoupon === null) {
//             throw new Error("Invalid coupon");
//         }
//         const user = await User.findOne({ _id });
//         let { products, cartTotal } = await Cart.findOne({ orderBy: user._id }).populate("products.product");
//         let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
//         await Cart.findOneAndUpdate({ orderBy: user._id }, { totalAfterDiscount }, { new: true });
//         res.json(totalAfterDiscount);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

// get order
// const getOrder = asyncHandler(async (req, res) => {
//     const { _id } = req.user;
//     validateMongoDbId(_id);

//     try {
//         const userOrder = await Order.findOne({ orderBy: _id })
//             .populate("products.product")
//             .populate("orderBy")
//             .exec();
//         res.json(userOrder);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

//get all orders
// const getAllOrder = asyncHandler(async (req, res) => {
//     try {
//         const alluserorders = await Order.find()
//             .populate("products.product")
//             .populate("orderBy")
//             .exec();
//         res.json(alluserorders);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

//get order by user id
// const getOrderByUserId = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     validateMongoDbId(id);
//     try {
//         const userorders = await Order.findOne({ orderBy: id })
//             .populate("products.product")
//             .populate("orderBy")
//             .exec();
//         res.json(userorders);
//     } catch (error) {
//         throw new Error(error);
//     }
// });

// update order status
// const updateOrderStatus = asyncHandler(async (req, res) => {
//     const { status } = req.body;
//     const { id } = req.params;
//     validateMongoDbId(id);
//     try {
//         const updateOrder = await Order.findByIdAndUpdate(
//             id,
//             {
//                 orderStatus: status,
//                 paymentIntent: {
//                     status: status,
//                 },
//             },
//             {
//                 new: true,
//             }
//         );
//         res.json(updateOrder)
//     } catch (error) {
//         throw new Error(error);
//     }
// });

//get order by order id
const getOrderByOrderId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.findById(id)
            .populate("products.product")
            .exec();
        res.json(order);
    } catch (error) {
        throw new Error(error);
    }
});


const getMyOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
        const orders = await Order.find({ user: _id }).populate("user").populate("orderItems.product").populate("orderItems.color")
        res.json({ orders })

    } catch (error) {
        throw new Error(error)
    }
})


// create Order
const createOrder = asyncHandler(async (req, res) => {
    const { shippingInfo, orderItems, totalPrice, totalPriceAfterDiscount, paymentInfo } = req.body;
    const { _id } = req.user;
    try {
        const order = await Order.create({
            shippingInfo,
            orderItems,
            totalPrice,
            totalPriceAfterDiscount,
            paymentInfo,
            user: _id,
        })
        res.json({
            order,
            success: true
        })
    } catch (error) {
        throw new Error(error)
    }
})



module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getallUser,
    getUser,
    deleteUser,
    reActiveUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    updatePassword,
    forgotPasswordToken,
    resetPassword,
    loginAdmin,
    getWishlist,
    saveAddress,
    userCart,
    getUserCart,
    emptyCart,
    createOrder,
    getOrderByOrderId,
    removeProductFromCart,
    updateProductQuantity,
    getMyOrders
    // applyCoupon,
    // getOrder,
    // getAllOrder,
    // getOrderByUserId,
    // updateOrderStatus,
};

