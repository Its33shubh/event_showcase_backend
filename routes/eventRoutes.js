import express from "express";
import { authAdmin } from "../middleware/authMiddleware.js";
import uploadEventImage from "../middleware/uploadEventImage.js"


import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../controllers/eventController.js";



const router = express.Router();

// Admin protected
router.post("/create",authAdmin, uploadEventImage.single("image"), createEvent);
router.put("/update/:id", authAdmin,uploadEventImage.single("image"), updateEvent);
router.delete("/delete/:id", authAdmin, deleteEvent);

// Public
router.get("/get", getEvents);
router.get("/get/:id", getEventById);

export default router;