import express from "express";
import {
  handleImageUpload,
  fetchAllProduct,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../controllers/Admin/productController.js";
import { upload } from "../../helpers/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.delete("/delete/:id", deleteProduct);
router.put("/edit/:id", editProduct);
router.post("/add", addProduct);
router.get("/get", fetchAllProduct);
export default router;
