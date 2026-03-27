import express from "express";
import { explainHandler } from "../controllers/aiController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected route for code explanation
router.post("/explain", authMiddleware, explainHandler);

export default router;