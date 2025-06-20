import express from "express";
import { createOrder, capturePayment } from "../../controllers/Shop/orderController.js";
const router = express();

router.post("/create", createOrder);
router.post("/capture", capturePayment);

export default router;
