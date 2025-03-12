import express from "express";
import { createOrder } from "../../controllers/Shop/orderController.js";
const router = express();

router.post("/create", createOrder);

export default router;
