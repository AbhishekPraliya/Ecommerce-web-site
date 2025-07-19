// routes/product.routes.js
import express from "express";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    getProductsBySearch,
    getProductsByBrandId,
    getProductsByIdList,
    getMultipleProducts,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getProduct);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/category/:categoryId", getAllProducts);
router.get("/search", getProductsBySearch);
router.get("/brand/:id", getProductsByBrandId);
router.post("/list", getProductsByIdList);

router.post("/multiple", getMultipleProducts); // POST is better for sending array in body


export default router;

