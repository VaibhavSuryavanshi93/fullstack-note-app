import express from "express";
import {
  getNotes,
  createNote,
  deleteNote,
} from "../controllers/noteController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();

// Get all notes
router.get("/", protectRoute, getNotes);

// Create note
router.post("/", protectRoute, createNote);

// Delete note
router.delete("/:id", protectRoute, deleteNote);

export default router;
