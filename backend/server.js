import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON request bodies
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  return res.status(200).json({ status: "ok", message: "Auth API is running" });
});

// Mount authentication routes under /api/v1/auth
app.use("/api/v1/auth", authRoutes);

// Global error handler (fallback)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  return res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 5000;

// Start server after establishing DB connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

