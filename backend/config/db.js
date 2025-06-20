import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb Connected")
  } catch (error) {
    console.log("Failed to connect to database");
  }
};

export default connectDB;
