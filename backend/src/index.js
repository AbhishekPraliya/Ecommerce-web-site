import express from "express"
console.log("a");
import authRoutes from "./routes/auth.route.js"
console.log("b");
import userRoutes from "./routes/user.route.js"
console.log("c");
import sellerRoutes from "./routes/seller.route.js"
console.log("d");
import ownerRoutes from "./routes/owner.route.js"
console.log("e");
import emailRoleRoutes from './routes/emailRole.route.js'
console.log("f");
import productRoutes from "./routes/product.route.js"
console.log("g");
import webRoutes from "./routes/web.route.js"
console.log("h");
import contactUsRoutes from './routes/contactUs.route.js';
console.log("i");
import categoryRoutes from './routes/category.route.js'
console.log("j");

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
app.use(express.json({limit:"100mb"}));
app.use(express.urlencoded({limit:"100mb", extended:true}));

app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))

try {
app.use("/api/auth", authRoutes )
console.log(1);
app.use("/api/owner", ownerRoutes )
console.log(2);
app.use("/api/user", userRoutes )
console.log(3);
app.use("/api/seller", sellerRoutes )
console.log(4);

app.use("/api/product", productRoutes )
console.log(5);
app.use("/api/web", webRoutes )
console.log(6);
app.use("/api/email-roles", emailRoleRoutes )
console.log(7);
app.use('/api/contact-us', contactUsRoutes);
console.log(8);
app.use('/api/category', categoryRoutes);
console.log(9);
} catch (err) {
  console.error("❌ Failed to load /api/product:", err);
}

if(process.env?.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));


    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
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
