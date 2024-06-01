import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/userController";
import protect from "../middleware/protectMiddleware";
import { getBookedHotelsOfUser } from "../controller/searchHotelsController";

const router = express.Router();

router.post("/register", ...registerUser);

router.post("/auth", ...loginUser);

router.post("/logout", protect, logoutUser);

router.get("/booked-hotels", protect, getBookedHotelsOfUser);

export default router;
