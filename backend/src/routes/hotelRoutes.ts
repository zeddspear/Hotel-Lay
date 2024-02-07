import express from "express";
const router = express.Router();
import { postHotel } from "../controller/hotelController";
import protect from "../middleware/protectMiddleware";

router.post("/add-hotel", protect, ...postHotel);

export default router;
