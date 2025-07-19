import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const footerData = {
    customerService: ["Contact Us", "Track Order", "Return Order", "Cancel Order"],
    company: ["About Us", "Terms & Conditions", "Privacy Policy", "We are Hiring"],
    socialMedia: [
        { name: "Facebook", link: "https://facebook.com" },
        { name: "Instagram", link: "https://instagram.com" },
        { name: "Twitter", link: "https://twitter.com" },
        { name: "Pinterest", link: "https://pinterest.com" },
        { name: "Snapchat", link: "https://snapchat.com" },
        { name: "Apple", link: "https://apple.com" },
    ],
    productCategories: {
        "Men's Clothing": [
            "Top Wear", "Men's New Arrivals", "Men's T-Shirts", "Men's Hoodies & Sweatshirts",
            "Oversized T-Shirts for Men", "Men's Long Sleeve T-shirts", "Men's White T-shirts",
            "Men's Crew Neck T-shirts", "Men's Half Sleeve T-shirts", "Men's Printed T-shirts"
        ],
        "Women's Clothing": [
            "Women's Top Wear", "Women's New Arrivals", "Women's T-Shirts", "Women's Fashion Tops",
            "Women's Loose T-shirts", "Women's Tank Tops", "Women's Hoodies & Sweatshirts",
            "Women's Dresses", "Women's 3/4 Sleeve T-Shirts", "Women's Kurtis"
        ],
        "Mobile Covers": [
            "Apple", "iPhone 14 Cases & Covers", "iPhone 13 Back Covers",
            "iPhone 12 Back Covers Cases", "iPhone 13 Pro Back Covers", "Realme",
            "Samsung", "Xiaomi", "Oneplus", "Vivo"
        ]
    }
};

const Footer = () => {
    return (
        <footer className="footer-container">
            {/* Upper Part */}
            <div className="footer-top">
                <div className="footer-block">
                    <h4>Customer Service</h4>
                    {footerData.customerService.map((item, index) => (
                        <Link key={index} to="#">{item}</Link>
                    ))}
                    <p>📦 15 Days Return Policy*</p>
                    <p>💰 Cash On Delivery*</p>
                </div>
                <div className="footer-block">
                    <h4>Company</h4>
                    {footerData.company.map((item, index) => (
                        <Link key={index} to="#">{item}</Link>
                    ))}
                    <h4>Download the App</h4>
                    <div className="app-buttons">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
                        <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
                    </div>
                </div>
                <div className="footer-block">
                    <h4>Connect With Us</h4>
                    {footerData.socialMedia.map((social, index) => (
                        <a key={index} href={social.link} target="_blank" rel="noreferrer">
                            {social.name}
                        </a>
                    ))}
                </div>
                <div className="footer-block">
                    <h4>Keep Up To Date</h4>
                    <div className="subscribe-box">
                        <input type="text" placeholder="Enter Email Id:" />
                        <button>SUBSCRIBE</button>
                    </div>
                    
                    <h4>100% Secure Payment</h4>
                    <div className="payment-icons">
                        <img src="https://img.icons8.com/color/48/000000/google-pay-india.png" alt="GPay" />
                        <img src="https://img.icons8.com/color/48/000000/paytm.png" alt="Paytm" />
                        <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
                        <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="MasterCard" />
                    </div>
                </div>
            </div>

            <hr />

            {/* Lower Part */}
            <div className="footer-bottom">
                {Object.entries(footerData.productCategories).map(([title, links]) => (
                    <div key={title} className="footer-section">
                        <h4>{title}</h4>
                        {links.map((link, idx) => (
                            <Link key={idx} to="#">{link}</Link>
                        ))}
                    </div>
                ))}
                <div className="footer-section external-links">
                    <Link to="#">FANBOOK</Link>
                    <Link to="#">OFFERS</Link>
                    <Link to="#">SITEMAP</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
