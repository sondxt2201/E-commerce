const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const {
    createUser,
    loginUser,
    getallUser,
    getUser,
    deleteUser,
    updateUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logoutUser,
    reActiveUser,
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
    applyCoupon,
    getOrder,
    updateOrderStatus,
    getAllOrder,
    getOrderByUserId,
    getOrderByOrderId,
    removeProductFromCart,
    updateProductQuantity,
    getMyOrders
} = require("../controller/userCtrl");
const { checkout, paymentVerification, createURL, IPN, returnURL } = require("../controller/paymentCtrl");
const router = express.Router();




// POST
router.post("/cart", authMiddleware, userCart);
router.post("/cart/create-order", authMiddleware, createOrder);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);


// GET
router.get("/cart", authMiddleware, getUserCart);
router.get("/refresh", handleRefreshToken);
router.get("/all-users", getallUser);
router.get("/logout", logoutUser);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, isAdmin, getUser);
router.get("/order/order-by-id/:id", authMiddleware, isAdmin, getOrderByOrderId);
router.get("/order/get-order", authMiddleware, getMyOrders);

// router.get("/order/order-by-user/:id", authMiddleware, isAdmin, getOrderByUserId);
// router.get("/order/get-order", authMiddleware, getOrder);
// router.get("/order/all-order", authMiddleware, isAdmin, getAllOrder);


// PUT
router.put("/edit-user", authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/password", authMiddleware, updatePassword);
router.put("/reset-password/:token", resetPassword);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/reactive-user/:id", authMiddleware, isAdmin, reActiveUser);
// router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);


// DELETE
router.delete("/delete-cart", authMiddleware, emptyCart);
router.delete("/remove-product/:id", authMiddleware, removeProductFromCart);
router.delete("/delete-user/:id", authMiddleware, isAdmin, deleteUser);
router.delete("/update-product/:id/:quantity", authMiddleware, updateProductQuantity);


// VNPay
router.post('/create_payment_url', createURL);
router.get('/vnpay_ipn', IPN);
router.get('/vnpay_return', returnURL);

module.exports = router;