import { create } from "zustand";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";

export const useWebNavStore = create((set) => ({
    navBarData: {
        applicationName: "",
        logoImage: "",
        logoText: "",
        topNavItems: [],
        bottomNavItems: [],
    },
    isLoadingComponent:false,
    isLoading: false,

    setIsLoadingComponent: (data)=>{
        set({isLoadingComponent:data});
    },

    getNavBarData: async () => {
        set({ isLoading: true });
        try {
            const { data } = await axiosInstance.get("/web/navbar");
            set({ navBarData: data });
        } catch (error) {
            toast.error("Failed to fetch navbar data", error);
        } finally {
            set({ isLoading: false });
        }
    },

    updateLogo: async (data) => {
        try {
            const res = await axiosInstance.put("/web/navbar/logo", data);
            set((state) => ({
                navBarData: { ...state.navBarData, ...res.data },
            }));
            toast.success("Logo updated");
        } catch (error) {
            toast.error("Failed to update logo", error);
        }
    },

    updateTopNavItems: async (items) => {
        try {
            const res = await axiosInstance.put("/web/navbar/top", { topNavItems: items });
            set((state) => ({
                navBarData: { ...state.navBarData, topNavItems: res.data.topNavItems },
            }));
            toast.success("Top nav updated");
        } catch (error) {
            toast.error("Failed to update top nav", error);
        }
    },

    updateBottomNavItems: async (items) => {
        try {
            const res = await axiosInstance.put("/web/navbar/bottom", { bottomNavItems: items });
            set((state) => ({
                navBarData: { ...state.navBarData, bottomNavItems: res.data.bottomNavItems },
            }));
            toast.success("Bottom nav updated");
        } catch (error) {
            toast.error("Failed to update bottom nav", error);
        }
    },
}));
