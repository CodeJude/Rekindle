import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import connectDB from "./util/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// routes
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.json("Hello, Welcome to Rekindle API");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port: ${PORT}`);
});
