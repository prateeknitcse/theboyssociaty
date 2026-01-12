import express from "express";
import {
  getContributions,
  payContribution,
} from "../controllers/contribution.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:birthdayId", protect, getContributions);
router.post("/pay", protect, payContribution);

export default router;
