import Category from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        const grouped = {};

        categories.forEach((cat) => {
            if (!grouped[cat.categoryType]) grouped[cat.categoryType] = [];
            grouped[cat.categoryType].push(cat);
        });

        res.status(200).json(grouped); // preferred structure: {categoryType1: [...], categoryType2: [...]}
    } catch (err) {
        res.status(500).json({ message: "Error fetching categories", error: err.message });
    }
};

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: "Category creation failed", error: err.message });
    }
};
