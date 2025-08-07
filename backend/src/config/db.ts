import mongoose from "mongoose";
import config from ".";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      dbName: "Google",
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
