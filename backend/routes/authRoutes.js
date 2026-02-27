import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/v1/auth/register - Register a new user
router.post("/register", registerUser);

// POST /api/v1/auth/login - Login user and return JWT
router.post("/login", loginUser);

// GET /api/v1/auth/me - Get current authenticated user
router.get("/me", authMiddleware, getMe);

export default router;

