import express from "express";
import { createBirthday } from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/birthday", protect, adminOnly, createBirthday);

export default router;
