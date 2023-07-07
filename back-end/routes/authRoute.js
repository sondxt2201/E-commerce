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
    applyCoupon,
    createOrder,
    getOrder,
    updateOrderStatus,
    getAllOrder,
    getOrderByUserId,
} = require("../controller/userCtrl");
const router = express.Router();




// POST
router.post("/cart", authMiddleware, userCart);
router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/cash-order", authMiddleware, createOrder);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/admin-login", loginAdmin);
router.post("/forgot-password-token", forgotPasswordToken);
router.get("/order/order-by-user/:id", authMiddleware, isAdmin, getAllOrder);

// GET
router.get("/cart", authMiddleware, getUserCart);
router.get("/order/get-order", authMiddleware, getOrder);
router.get("/order/all-order", authMiddleware, isAdmin, getAllOrder);
router.get("/refresh", handleRefreshToken);
router.get("/all-users", getallUser);
router.get("/logout", logoutUser);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/:id", authMiddleware, isAdmin, getUser);

// PUT
router.put("/edit-user", authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/password", authMiddleware, updatePassword);
router.put("/reset-password/:token", resetPassword);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/reactive-user/:id", authMiddleware, isAdmin, reActiveUser);
router.put("/order/update-order/:id", authMiddleware, isAdmin, updateOrderStatus);


// DELETE
router.delete("/delete-user/:id", authMiddleware, isAdmin, deleteUser);
router.delete("/delete-cart/", authMiddleware, emptyCart);



module.exports = router;