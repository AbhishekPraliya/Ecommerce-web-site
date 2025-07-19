import express from "express";
const router = express.Router();
import {
    getNavBar,
    updateLogo,
    updateTopNav,
    updateBottomNav,
    getHomeData,
    insertHomeData,
    updateHeader,
    updateImageSlider,
    updateProductSlider,
    updateTrendingCategories,
    updateAdvertisementPanel,
} from '../controllers/web.controller.js'

// Nav Routes
router.get("/navbar", getNavBar);
router.put("/navbar/logo", updateLogo);
router.put("/navbar/top", updateTopNav);
router.put("/navbar/bottom", updateBottomNav);

// Home Routes
router.get("/get/home-data", getHomeData);
router.post("/insert/home-data", insertHomeData);

// router.put("/home/header", updateHeader);
// router.put("/home/slider", updateImageSlider);
// router.put("/home/products", updateProductSlider);
// router.put("/home/trending", updateTrendingCategories);
// router.put("/home/ads", updateAdvertisementPanel);

export default router;
