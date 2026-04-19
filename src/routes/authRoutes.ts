import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getMe,
  logoutUser,
} from "../controllers/userProfileController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getMe);
router.post("/logout", logoutUser);
router.get("/profile/:userId", getUserProfile);
router.put("/profile/:userId", updateUserProfile);

export default router;

