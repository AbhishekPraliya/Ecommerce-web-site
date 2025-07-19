// user.routes.js
import express from "express";
import {
    getUser,
    getAllUsers,
    addProductIntoCart,
    deleteProductFromCart,
    addProductIntoWishlist,
    getUserWishlist,
    deleteProductFromWishlist,
    addProductIntoOrder,
    deleteProductsFromOrder,
    getWalletData,
    getPaymentData,
    getCartData,
    updateCartProductSize,
    updateCartProductQuantity,
} from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();


router.get("/:userId", getUser);
router.get("/all", getAllUsers);

router.post("/cart/:productId",protectRoute, addProductIntoCart);
router.get("/cart/:userId", getCartData);
router.delete("/cart/:productId",protectRoute, deleteProductFromCart);

router.post("/wishlist/:productId",protectRoute, addProductIntoWishlist);
router.get("/wishlist/:userId", getUserWishlist);
router.delete("/wishlist/:productId",protectRoute, deleteProductFromWishlist);

router.post("/order",protectRoute, addProductIntoOrder);
router.delete("/order/:orderId",protectRoute, deleteProductsFromOrder);

router.get("/wallet/:userId",protectRoute, getWalletData);
router.get("/payment/:userId",protectRoute, getPaymentData);

router.put("/cart/size/:productId", protectRoute, updateCartProductSize);
router.put("/cart/quantity/:productId", protectRoute, updateCartProductQuantity);


export default router;

