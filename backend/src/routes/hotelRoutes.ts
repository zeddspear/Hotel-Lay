import express from "express";
const router = express.Router();
import { postHotel, getHotels } from "../controller/hotelController";
import protect from "../middleware/protectMiddleware";

router.post("/add-hotel", protect, ...postHotel);

router.get("/", protect, getHotels);

export default router;
