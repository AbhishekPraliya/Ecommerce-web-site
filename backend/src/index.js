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
console.log("k");

import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";
import path from 'path';

const app=express();

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()


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


app.use(express.json());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit:"50mb", extended:true}));

app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))

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

if(process.env?.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"./frontend/dist")));


    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
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
