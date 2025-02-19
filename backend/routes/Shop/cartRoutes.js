import express from "express";
import {
  deleteCartItems,
  addToCart,
  updateCartItemQuantity,
  fetchCartItems,
} from "../../controllers/Shop/cartController.js";
const router = express();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/update-cart", updateCartItemQuantity);
router.delete("/:userId/:productId", deleteCartItems);

export default router;
