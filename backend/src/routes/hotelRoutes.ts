import express from "express";
const router = express.Router();
import {
  postHotel,
  getHotels,
  getSingleHotel,
  updateHotel,
} from "../controller/hotelController";
import protect from "../middleware/protectMiddleware";

router.post("/add-hotel", protect, ...postHotel);

router.get("/", protect, getHotels);

router.get("/:id", protect, getSingleHotel);

router.put("/:id", protect, ...updateHotel);

export default router;
