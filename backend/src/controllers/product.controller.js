// controllers/product.controller.js
import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("business", "businessName");
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, product: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductsByIdList = async (req, res) => {
    try {
        const { productIds } = req.body; // Expecting an array of IDs
        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid or empty productIds array" });
        }
        const products = await Product.find(
            { _id: { $in: productIds } }
        ).select("image offer rating name price originalPrice discount likeNumbers business")
            .populate("business", "businessName") // Fetches business name only
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const products = await Product.find({ category: categoryId }).populate("brand");
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductsBySearch = async (req, res) => {
    try {
        const { searchQuery } = req.body;
        const regex = new RegExp(searchQuery, "i");
        const products = await Product.find({ name: { $regex: regex } }).populate("brand");
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getProductsByBrandId = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Product.find({ brand: id }).populate("business");
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// controllers/productController.js
export const getMultipleProducts = async (req, res) => {
    try {
        const { productIds } = req.body;

        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ message: "Product IDs must be a non-empty array." });
        }

        const products = await Product.find(
            { _id: { $in: productIds } }
        ).select("image offer rating name price originalPrice discount likeNumbers business sizes outOfStockSize lowStockSize colors")
        .populate("business", "businessName") // Fetches business name only
        .sort({ createdAt: -1 })
        .lean();

        res.status(200).json(products);
    } catch (err) {
        console.error("Error fetching multiple products:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};






// export const addBusinessIdToAllProducts = async (req, res) => {
//     try {
//         const businessId = new mongoose.Types.ObjectId("686c317e96c0feed845bc85a");

//         const result = await Product.updateMany(
//             {},
//             { $set: { business: businessId } }
//         );

//         res.status(200).json({
//             message: "Business ID added to all products",
//             modifiedCount: result.modifiedCount,
//         });
//     } catch (error) {
//         console.error("Failed to update products:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };
