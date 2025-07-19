import express from "express";
import {
    getAllCategories,
    createCategory,
} from "../controllers/category.controller.js";
const router = express.Router();

router.get("/", getAllCategories);          // GET all categories grouped by type
router.post("/", createCategory);           // CREATE a new category

export default router;
