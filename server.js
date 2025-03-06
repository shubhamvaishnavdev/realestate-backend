import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./src/config/db.js";
import routes from "./src/routes/index.js";
import cors from "cors";
import logger from "morgan";

const app = express();

// Security middleware
app.use(cors()); // Enable CORS for all requests

// Body parsing middleware
app.use(express.json({ limit: "10mb" })); // Parse JSON with a large limit
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Support form data

// Other middleware
app.use(logger("dev")); // Log HTTP requests

// Test Route
app.get("/test", (req, res) => {
  res.status(200).json({ message: "Server is working!" });
});

// Main Route
app.use("/api", routes);

// Connect to Database & Start Server
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

export default app;
