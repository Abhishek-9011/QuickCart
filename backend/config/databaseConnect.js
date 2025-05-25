import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const connectDatabase = async () => {
  try {
    if (!process.env.MONGO_DB_URL) {
      throw new Error("MongoDB connection URL is missing in .env file");
    }

    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDatabase;