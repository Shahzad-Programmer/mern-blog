import express from "express";
import { signupUser,loginUser, logoutUser, refetchUser } from "../controller/authController.js";
const router = express.Router();
router.post("/register",signupUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get("/refetch",refetchUser)
export default router