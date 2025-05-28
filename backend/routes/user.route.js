import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth.controller.js";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
// Use default import (no curly braces)
import userMiddleware from "../middlewares/authMiddleware.js";

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", userMiddleware, getProfile);
router.put("/profile", userMiddleware, updateProfile);

export default router;