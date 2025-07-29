import express from "express"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import sellerRoutes from "./routes/seller.route.js"
import ownerRoutes from "./routes/owner.route.js"
import emailRoleRoutes from './routes/emailRole.route.js'
import productRoutes from "./routes/product.route.js"
import webRoutes from "./routes/web.route.js"
import contactUsRoutes from './routes/contactUs.route.js';
import categoryRoutes from './routes/category.route.js'

import {connectDB} from "./lib/db.js"
// console.log("k");

import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";
import path from 'path';
import { fileURLToPath } from "url";

// ✅ Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app=express();

dotenv.config();
const PORT = Number(process.env.PORT) || 5001;


app.use(express.json());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb", extended:true}));

app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))




// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     baseURL: 'http://localhost:3000',
//     clientID: 'a84Rr6D9Pmx8CYVP5yYESaS0vDK7pKzR',
//     issuerBaseURL: 'https://dev-v1b5qi2oaj7rxnb7.us.auth0.com',
//     secret: 'LONG_RANDOM_STRING'
// };
// // The `auth` router attaches /login, /logout
// // and /callback routes to the baseURL
// app.use(auth(config));



try {
    app.use("/api/auth", authRoutes )
    app.use("/api/owner", ownerRoutes )
    app.use("/api/user", userRoutes )
    app.use("/api/seller", sellerRoutes )

    app.use("/api/product", productRoutes )
    app.use("/api/web", webRoutes )
    app.use("/api/email-roles", emailRoleRoutes )
    app.use('/api/contact-us', contactUsRoutes);
    app.use('/api/category', categoryRoutes);
} catch (err) {
    console.error("❌ Failed to load /api/product:", err);
}


console.log("✅ PORT - ", PORT);
console.log("NODE_ENV - ", process.env.NODE_ENV);
if(process.env?.NODE_ENV!=="production"){
    console.log("✅ 1");
    app.use(express.static(path.join(__dirname,"../../frontend/dist")));
    console.log(path.resolve(__dirname, "../../frontend", "dist", "index.html"));
    
    
    console.log("✅ 3");
    app.get("/*",(req,res)=>{
        console.log("✅ 4");
        res.sendFile(path.resolve(__dirname, "../../frontend", "dist", "index.html"));
    })
}



app.listen(PORT,()=>{
    console.log("Hello Abhishek, Server is running on port - ",PORT);
    connectDB();
})

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("✅ Server started on port " + PORT);
//   });
// }).catch((err) => {
//   console.error("❌ DB connection failed", err);
// });
