import mongoose from "mongoose";

const productShcema = new mongoose.Schema(
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

const user = mongoose.model("Product", productShcema);
export default user;
