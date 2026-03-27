import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getHistory, deleteHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", authMiddleware, getHistory);
router.delete("/:id", authMiddleware, deleteHistory);

export default router;