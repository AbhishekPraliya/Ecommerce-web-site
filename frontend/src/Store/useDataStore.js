/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:5001":"/";

export const useDataStore = create((set, get) => ({

    productData: null,
    loading: false,

    getProductById: async (productId) => {
        try {
            set({ loading: true });

            const res = await axiosInstance.get(`/product/${productId}`);
            set({ productData: res.data, loading: false });
        } catch (err) {
            console.error("Error fetching product:", err);
            set({ loading: false });
        }
    },
    getMultipleProducts: async (productIds) => {
        try {
            const res = await axiosInstance.post("/product/multiple", { productIds });
            // console.log("Fetched multiple products:", res.data);
            return res.data;
        } catch (err) {
            console.error("Failed to fetch multiple products", err);
        }
    },


    products: [
        {
            image: './product-image2.png',
            label: 'OVERSIZED FIT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Be Yourself Graphic...",
            price: '₹699',
            original: '₹2,249',
            discount: '68% off',
            like: true,
        },
        {
            image: './product-image2.png',
            label: '',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue To The Moon Graphic...",
            price: '₹399',
            original: '₹1,499',
            discount: '73% off',
        },
        {
            image: './product-image2.png',
            label: 'BUY 3 FOR 999',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Hope Graphic Print...",
            price: '₹449',
            original: '₹1,349',
            discount: '66% off',
            like: true,
        },
        {
            image: './product-image2.png',
            label: 'FEW LEFT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Escape Graphic Print...",
            price: '₹499',
            original: '₹1,299',
            discount: '61% off',
        },
        {
            image: './product-image2.png',
            label: 'OVERSIZED FIT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Be Yourself Graphic...",
            price: '₹699',
            original: '₹2,249',
            discount: '68% off',
            like: true,
        },
        {
            image: './product-image2.png',
            label: '',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue To The Moon Graphic...",
            price: '₹399',
            original: '₹1,499',
            discount: '73% off',
        },
        {
            image: './product-image2.png',
            label: 'BUY 3 FOR 999',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Hope Graphic Print...",
            price: '₹449',
            original: '₹1,349',
            discount: '66% off',
        },
        {
            image: './product-image2.png',
            label: 'FEW LEFT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Escape Graphic Print...",
            price: '₹499',
            original: '₹1,299',
            discount: '61% off',
        },

        {
            image: './product-image2.png',
            label: 'OVERSIZED FIT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Be Yourself Graphic...",
            price: '₹699',
            original: '₹2,249',
            discount: '68% off',
        },
        {
            image: './product-image2.png',
            label: '',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue To The Moon Graphic...",
            price: '₹399',
            original: '₹1,499',
            discount: '73% off',
        },
        {
            image: './product-image2.png',
            label: 'BUY 3 FOR 999',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Hope Graphic Print...",
            price: '₹449',
            original: '₹1,349',
            discount: '66% off',
        },
        {
            image: './product-image2.png',
            label: 'FEW LEFT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Escape Graphic Print...",
            price: '₹499',
            original: '₹1,299',
            discount: '61% off',
        },
        {
            image: './product-image2.png',
            label: 'OVERSIZED FIT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Be Yourself Graphic...",
            price: '₹699',
            original: '₹2,249',
            discount: '68% off',
        },
        {
            image: './product-image2.png',
            label: '',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue To The Moon Graphic...",
            price: '₹399',
            original: '₹1,499',
            discount: '73% off',
        },
        {
            image: './product-image2.png',
            label: 'BUY 3 FOR 999',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Hope Graphic Print...",
            price: '₹449',
            original: '₹1,349',
            discount: '66% off',
        },
        {
            image: './product-image2.png',
            label: 'FEW LEFT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Escape Graphic Print...",
            price: '₹499',
            original: '₹1,299',
            discount: '61% off',
        },

        {
            image: './product-image2.png',
            label: 'OVERSIZED FIT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Be Yourself Graphic...",
            price: '₹699',
            original: '₹2,249',
            discount: '68% off',
        },
        {
            image: './product-image2.png',
            label: '',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue To The Moon Graphic...",
            price: '₹399',
            original: '₹1,499',
            discount: '73% off',
        },
        {
            image: './product-image2.png',
            label: 'BUY 3 FOR 999',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Hope Graphic Print...",
            price: '₹449',
            original: '₹1,349',
            discount: '66% off',
        },
        {
            image: './product-image2.png',
            label: 'FEW LEFT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Escape Graphic Print...",
            price: '₹499',
            original: '₹1,299',
            discount: '61% off',
        },
        {
            image: './product-image2.png',
            label: 'OVERSIZED FIT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Be Yourself Graphic...",
            price: '₹699',
            original: '₹2,249',
            discount: '68% off',
        },
        {
            image: './product-image2.png',
            label: '',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue To The Moon Graphic...",
            price: '₹399',
            original: '₹1,499',
            discount: '73% off',
        },
        {
            image: './product-image2.png',
            label: 'BUY 3 FOR 999',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Hope Graphic Print...",
            price: '₹449',
            original: '₹1,349',
            discount: '66% off',
        },
        {
            image: './product-image2.png',
            label: 'FEW LEFT',
            rating: '4.5',
            brand: 'Bewakoof®',
            name: "Men's Blue Escape Graphic Print...",
            price: '₹499',
            original: '₹1,299',
            discount: '61% off',
        },
    ],
}));