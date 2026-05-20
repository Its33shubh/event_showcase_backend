import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";


import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";



const router = express.Router();

// Admin protected
router.post("/create", authMiddleware, createEvent);
router.put("/update/:id", authMiddleware, updateEvent);
router.delete("/delete/:id", authMiddleware, deleteEvent);

// Public
router.get("/get", getEvents);
router.get("/get/:id", getEventById);

export default router;