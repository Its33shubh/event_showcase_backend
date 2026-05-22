import express from "express";
import {
  adminRegister,
  adminLogin,
  getAdminProfile
} from "../controllers/adminController.js";
import { authAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.get("/profile", authAdmin, getAdminProfile);

export default router;