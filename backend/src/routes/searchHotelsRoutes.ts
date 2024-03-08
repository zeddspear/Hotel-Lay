import express from "express";
import { getHotels } from "../controller/searchHotelsController";

const router = express.Router();

router.get("/search", getHotels);

export default router;
