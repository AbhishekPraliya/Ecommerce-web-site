// routes/seller.routes.js
import express from "express";
import {
    createSeller,
    deleteSeller,
    updateSellerDetails,
    updateMobileNumber,
    getOrdersDetails,
    getBusiness,
    createBusiness,
    updatePaymentGatewayDetails,
    getAllSellers,
    getSeller,
    insertFakeProducts,
    getSellerProducts,
    createOneProduct,
    createMultipleProduct,
} from "../controllers/seller.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router();

router.post("/create", createSeller);
router.delete("/delete/:sellerId", deleteSeller);
router.put("/update/:sellerId", updateSellerDetails);
router.get("/:userId", getSeller);
router.get("/all", getAllSellers);
router.put("/phone/:sellerId", updateMobileNumber);
router.get("/orders/:sellerId", getOrdersDetails);
router.get("/business/:sellerId", getBusiness);
router.post("/business/create",protectRoute ,createBusiness);
router.put("/gateway/:sellerId", updatePaymentGatewayDetails);
router.put("/insert/fake/product", insertFakeProducts);
// insertFakeProducts();

// get seller products
router.get("/get/products",protectRoute, getSellerProducts);

// create products
router.post("/create/one-product", protectRoute, createOneProduct);
router.post("/create/multiple-product", protectRoute, createMultipleProduct);




export default router;
