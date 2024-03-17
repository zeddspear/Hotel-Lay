import express from "express";
import { getHotel, getHotels } from "../controller/searchHotelsController";

const router = express.Router();

router.get("/search", getHotels);

router.get("/:id", ...getHotel);

export default router;
