import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(" MONGODB_URI is missing in .env file");
    }

    await mongoose.connect(mongoUri);
    console.log(" MongoDB Connected Successfully");
  } catch (error) {
    console.error(" MongoDB Connection Error:", error);
    process.exit(1);
  }
};
