import express from "express";
import { getTodaysBirthday } from "../controllers/birthday.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/today", protect, getTodaysBirthday);

export default router;
