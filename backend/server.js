import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/Auth/authRoute.js";
import adminProdcutRouter from "./routes/Admin/productsRoute.js";
import shopProductRouter from "./routes/Shop/productsRoutes.js";
import shopCartRouter from "./routes/Shop/cartRoutes.js";
import shopAddressRouter from "./routes/Shop/addressRoutes.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", AuthRouter);
app.use("/api/admin/products", adminProdcutRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {}
};
startServer();
