import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    category: String,
    description: String,
    price: Number,
    salePrice: Number,
    brand: String,
    totalStock: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
