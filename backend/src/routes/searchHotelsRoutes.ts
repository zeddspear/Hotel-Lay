import express from "express";
import {
  getHotel,
  getHotels,
  paymentIntent,
  makeBooking,
} from "../controller/searchHotelsController";
import protect from "../middleware/protectMiddleware";

const router = express.Router();

router.get("/search", getHotels);

router.get("/:id", ...getHotel);

router.post("/:id/booking", protect, makeBooking);

router.post("/:id/booking/payment-intent", protect, paymentIntent);

export default router;
