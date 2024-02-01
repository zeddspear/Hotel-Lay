import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController";
import verifyToken from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", ...registerUser);

router.post("/auth", ...loginUser);

router.post("/logout", verifyToken, logoutUser);

export default router;
