// controllers/seller.controller.js
import Seller from "../models/seller.model.js";
// import Order from "../models/order.model.js";
import Business from "../models/business.model.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

export const createSeller = async (req, res) => {
    const { email, name, picture, loginProvider, phoneNumber, gender, dateOfBirth, address } = req.body;
    try {
        const existingSeller = await Seller.findOne({ email });
        if (existingSeller) return res.status(200).json({ success: true, seller: existingSeller });

        const newSeller = await Seller.create({
            email,
            name,
            picture,
            loginProvider,
            phoneNumber,
            gender,
            dateOfBirth,
            address,
        });
        res.status(201).json({ success: true, seller: newSeller });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteSeller = async (req, res) => {
    try {
        await Seller.findByIdAndDelete(req.params.sellerId);
        res.status(200).json({ success: true, message: "Seller deleted successfully." });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getSeller = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.sellerId);
        res.status(200).json({ success: true, seller });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getAllSellers = async (req, res) => {
    try {
        const sellers = await Seller.find();
        res.status(200).json({ success: true, sellers });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const updateSellerDetails = async (req, res) => {
    try {
        const updated = await Seller.findByIdAndUpdate(
            req.params.sellerId,
            req.body,
            { new: true }
        );
        res.status(200).json({ success: true, seller: updated });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const updateMobileNumber = async (req, res) => {
    try {
        const seller = await Seller.findByIdAndUpdate(
            req.params.sellerId,
            { phoneNumber: req.body.phoneNumber },
            { new: true }
        );
        res.status(200).json({ success: true, phoneNumber: seller.phoneNumber });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const getOrdersDetails = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.sellerId).populate({
            path: "orders.order",
            populate: { path: "products.product" }
        });
        if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });
        res.status(200).json({ success: true, orders: seller.orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};



// Get Business for a Seller
export const getBusiness = async (req, res) => {
    try {
        const seller = await Seller.findById(req.params.sellerId).populate("business");
        if (!seller) return res.status(404).json({ success: false, message: "Seller not found" });

        res.status(200).json({ success: true, business: seller.business });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Create Business
export const createBusiness = async (req, res) => {
    const {
        businessName,
        businessLogo,
        businessBanner,
        description,
        email,
        name,
        socialLinks,
        status,
        sellerId,
    } = req.body;

    try {

        let newBusiness = await Business.findOneAndUpdate(
            { sellerId }, // Find by sellerId
            {
                sellerId,
                email,
                name,
                businessName,
                businessLogo,
                businessBanner,
                description,
                socialLinks,
                status,
            },
            {
                new: true,      // return the updated document
                upsert: true,   // create if not exists
                setDefaultsOnInsert: true, // use schema defaults if inserting
            }
        );
        console.log("newBusiness.find", newBusiness);

        if (!newBusiness) {
            const newBusiness = new Business({
                sellerId,
                email,
                name,
                businessName,
                businessLogo,
                businessBanner,
                description,
                socialLinks,
                status
            });
            await newBusiness.save();
            console.log("newBusiness.save", newBusiness)

            // Link business to seller (assuming 1:1 mapping)
            let seller = await Seller.findByIdAndUpdate(newBusiness.sellerId, { business: newBusiness._id });

            // console.log("seller",seller);

        }

        res.status(201).json({ success: true, business: newBusiness });
    } catch (err) {
        console.log("error", err);
        res.status(500).json({ success: false, message: err.message });
    }
};


export const updatePaymentGatewayDetails = async (req, res) => {
    try {
        const updatedSeller = await Seller.findByIdAndUpdate(
            req.params.sellerId,
            { paymentGatewayDetails: req.body },
            { new: true }
        );
        res.status(200).json({ success: true, paymentGatewayDetails: updatedSeller.paymentGatewayDetails });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};








////// Fake Data /////
export const insertFakeProducts = async (req, res) => {
    console.log("insertFakeStart\n1\n1\n1\n1\n");
    try {
        const sellerId = "686c0bbdcea1beeabddbae02";
        const businessId = "686c317e96c0feed845bc85a";

        const categoryMap = {
            men: await Category.findOne({ categoryName: "T-Shirt" }),
            women: await Category.findOne({ categoryName: "Top" }),
            unisex: await Category.findOne({ categoryName: "Hoodie" }),
            summer: {
                tankTop: await Category.findOneAndUpdate({ categoryName: "Tank Top" }, { isActive: true }),
                linenShirt: await Category.findOneAndUpdate({ categoryName: "Linen Shirt" }, { isActive: true }),
                cropTop: await Category.findOneAndUpdate({ categoryName: "Crop Top" }, { isActive: true }),
                sunHat: await Category.findOneAndUpdate({ categoryName: "Sun Hat" }, { isActive: true })
            },
            winter: {
                sweater: await Category.findOneAndUpdate({ categoryName: "Sweater" }, { isActive: true }),
                overcoat: await Category.findOneAndUpdate({ categoryName: "Overcoat" }, { isActive: true }),
                woolenCap: await Category.findOneAndUpdate({ categoryName: "Woolen Cap" }, { isActive: true }),
                gloves: await Category.findOneAndUpdate({ categoryName: "Gloves" }, { isActive: true }),
                boots: await Category.findOneAndUpdate({ categoryName: "Boots" }, { isActive: true })
            }
        };

        const sharedImages = {
            main: "https://images.bewakoof.com/t1080/men-s-brown-beast-within-graphic-printed-oversized-t-shirt-620155-1741259239-1.jpg",
            others: [
                "https://images.bewakoof.com/t1080/men-s-brown-beast-within-graphic-printed-oversized-t-shirt-620155-1741259243-2.jpg",
                "https://images.bewakoof.com/t1080/men-s-brown-beast-within-graphic-printed-oversized-t-shirt-620155-1741259251-4.jpg",
                "https://images.bewakoof.com/t1080/men-s-brown-beast-within-graphic-printed-oversized-t-shirt-620155-1741259255-5.jpg"
            ]
        };

        const summerCats = Object.entries(categoryMap.summer);
        const winterCats = Object.entries(categoryMap.winter);
        const combinedCats = [...summerCats, ...winterCats];

        const products = Array.from({ length: 30 }, (_, i) => {
            const [key, categoryObj] = combinedCats[i % combinedCats.length];
            const name = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            const genderOptions = ["male", "female", "unisex"];
            const gender = genderOptions[i % 3];

            return {
                brand: businessId,
                name: `${name} Product ${i + 1}`,
                price: 599 + (i % 5) * 40,
                originalPrice: 1199 + (i % 3) * 100,
                discount: 40 + (i % 10),
                image: sharedImages.main,
                moreImages: sharedImages.others,
                gender,
                category: categoryObj?._id,
                colors: ["Maroon", "Grey", "Black"][i % 3],
                selectedColor: ["Maroon", "Grey", "Black"][i % 3],
                sizes: ["S", "M", "L", "XL"],
                outOfStockSize: ["L", "XL", "M"][i % 3],
                lowStockSize: ["S", "M", "L"][i % 3],
                offer: ["Summer Sale", "Winter Deal", "Flat 60% Off"][i % 3],
                keyHighlights: [
                    { title: "Fit", value: ["Slim", "Regular", "Loose"][i % 3] },
                    { title: "Season", value: i % 2 === 0 ? "Summer" : "Winter" }
                ],
                productDescription: `${name} - perfect for ${i % 2 === 0 ? "warm" : "cold"} weather with great comfort.`
            };
        });

        const inserted = await Product.insertMany(products);
        console.log("insertFakeEnd\n1\n1\n1\n1\n");
        res.status(201).json({ message: "30 seasonal products inserted", data: inserted });
    } catch (error) {
        res.status(500).json({ message: "Product insertion failed", error: error.message });
    }
};



// 📁 controllers/sellerProductController.js

export const getSellerProducts = async (req, res) => {
    try {
        const businessId = req.user.business;

        const products = await Product.find({ business: businessId })
            .select("image offer rating name price originalPrice discount likeNumbers business")
            .populate("business", "businessName") // Fetches business name only
            .sort({ createdAt: -1 })
            .lean();


        res.status(200).json(products);
    } catch (error) {
        console.error("Error in getSellerProducts:", error);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};


/////Create Products/////
export const createOneProduct = async (req, res) => {
    try {
        const businessId = req.user.business;
        console.log("create-many");
        const product = new Product({ ...req.body, business: businessId });
        const saved = await product.save();
        console.log("create-one=", saved);
        res.status(201).json(saved);
    } catch (err) {
        console.log("err", err);
        res.status(500).json({ message: "Error creating product", error: err.message });
    }
};

export const createMultipleProduct = async (req, res) => {
    try {
        const businessId = req.user.business;
        // console.log("create-many");
        const productsWithBusiness = req.body.map((prod) => ({
            ...prod,
            business: businessId,
        }));
        const created = await Product.insertMany(productsWithBusiness);
        // console.log("create-many=");
        res.status(201).json(created);
    } catch (err) {
        res.status(500).json({ message: "Error uploading products", error: err.message });
    }
};





