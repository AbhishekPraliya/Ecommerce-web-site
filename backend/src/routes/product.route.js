// routes/product.routes.js
import express from "express";
import {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    // getAllProducts,
    getProductsBySearch,
    getProductsByBrandId,
    getProductsByIdList,
    getMultipleProducts,
    getProductsByCategoryId,
    getProductsByCategoryArray,
    getProductsByAllCategories,
    getProductsByOffer,
    getProductsByCategory,
    getProductsBySearchKeyword,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:id", getProduct);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/search", getProductsBySearch);
router.get("/brand/:id", getProductsByBrandId);
router.post("/list", getProductsByIdList);

router.post("/multiple", getMultipleProducts); // POST is better for sending array in body
router.post("/category/:categoryId", getProductsByCategoryId);


router.post('/filter/search', getProductsBySearchKeyword);
router.post('/filter/category', getProductsByCategory);
router.post('/filter/offer', getProductsByOffer);
router.post('/filter/all-categories', getProductsByAllCategories);
router.post('/filter/category-array', getProductsByCategoryArray);



// insertCategoriesInProducts();

export default router;

