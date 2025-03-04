import mongoose from "mongoose";

const AddressShcema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    phone: String,
    pincode: String,
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model("Address", AddressShcema);
