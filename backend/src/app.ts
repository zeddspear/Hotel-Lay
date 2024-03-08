import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { connectToDB } from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";
import path = require("path");
import { v2 as cloudinary } from "cloudinary";

dotenv;

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((err) => console.log(err));

// Importing routers
import userRouter from "./routes/userRoutes";
import hotelRouter from "./routes/hotelRoutes";
import searchHotelRoutes from "./routes/searchHotelsRoutes";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../../frontend/dist/")));

app.use("/api/users", userRouter);
app.use("/api/my-hotels", hotelRouter);
app.use("/api", searchHotelRoutes);
app.get("*", async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

app.use(notFound);
app.use(errorHandler);
