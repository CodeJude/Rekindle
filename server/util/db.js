import "dotenv/config";

import mongoose from "mongoose";
import config from "../config/index.js";

const DATABASE = process.env.NODE_ENV === "production" ? process.env.MONGODB_URI : config.database;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to db: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to db: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
