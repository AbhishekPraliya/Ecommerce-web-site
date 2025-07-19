import { create } from "zustand";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";

export const useWebHomeStore = create((set) => ({
    isLoading: false,
    homePageData: [],
    
    getHomeData: async () => {
        try {
            const res = await axiosInstance.get("/web/get/home-data");
            set({ homePageData: res.data?.homeData || [] });
            return res.data;
        } catch (err) {
            console.error("Error fetching home data:", err);
        }
    },

    insertHomeData: async (homeData) => {
        try {
            const res = await axiosInstance.post("/web/insert/home-data", { homeData });
            set({ homePageData: res.data?.homeData || [] });
            toast.success("Header updated");
            return res.data;
        } catch (err) {
            console.error("Error inserting home data:", err);
        }
    },


    updateHeader: async (data) => {
        try {
            const res = await axiosInstance.put("/web/home/header", data);
            set((state) => ({
                homePageData: { ...state.homePageData, ...res.data },
            }));
            toast.success("Header updated");
        } catch (error) {
            toast.error("Failed to update header",error);
        }
    },

    updateImageSlider: async (sliderData) => {
        try {
            const res = await axiosInstance.put("/web/home/slider", { imageSlider: sliderData });
            set((state) => ({
                homePageData: { ...state.homePageData, imageSlider: res.data.imageSlider },
            }));
            toast.success("Image slider updated");
        } catch (error) {
            toast.error("Failed to update image slider",error);
        }
    },

    updateProductSlider: async (data) => {
        try {
            const res = await axiosInstance.put("/web/home/products", { productSlider: data });
            set((state) => ({
                homePageData: { ...state.homePageData, productSlider: res.data.productSlider },
            }));
            toast.success("Product slider updated");
        } catch (error) {
            toast.error("Failed to update product slider",error);
        }
    },

    updateTrendingCategories: async (data) => {
        try {
            const res = await axiosInstance.put("/web/home/trending", { trendingCategories: data });
            set((state) => ({
                homePageData: { ...state.homePageData, trendingCategories: res.data.trendingCategories },
            }));
            toast.success("Trending categories updated");
        } catch (error) {
            toast.error("Failed to update trending categories",error);
        }
    },

    updateAdvertisementPanel: async (data) => {
        try {
            const res = await axiosInstance.put("/web/home/ads", { advertisementPanel: data });
            set((state) => ({
                homePageData: { ...state.homePageData, advertisementPanel: res.data.advertisementPanel },
            }));
            toast.success("Advertisement panel updated");
        } catch (error) {
            toast.error("Failed to update advertisement panel",error);
        }
    },
}));
