import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// Route imports
import AuthRouter from "./routes/Auth/authRoute.js";
import adminProdcutRouter from "./routes/Admin/productsRoute.js";
import shopProductRouter from "./routes/Shop/productsRoutes.js";
import shopCartRouter from "./routes/Shop/cartRoutes.js";
import shopAddressRouter from "./routes/Shop/addressRoutes.js";
import shopOrderRouter from "./routes/Shop/orderRoutes.js";

// React serving imports
import path from "path";
import { fileURLToPath } from "url";

// Environment setup
dotenv.config();
const app = express();

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,  
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

// API routes
app.use("/api/auth", AuthRouter);
app.use("/api/admin/products", adminProdcutRouter);
app.use("/api/shop/products", shopProductRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// Start server
const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
