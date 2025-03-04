import express from "express";
import {
  editAddress,
  addAddress,
  fetchAllAddress,
  deleteAddress,
} from "../../controllers/Shop/addressController.js";
const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);
router.put("/update/:userId/:addressId", editAddress);

export default router;
