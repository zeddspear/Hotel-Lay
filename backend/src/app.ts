import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { connectToDB } from "./config/db";
import { notFound, errorHandler } from "./middleware/errorMiddleware";
import cookieParser from "cookie-parser";
import path = require("path");

dotenv;

const app = express();

const PORT = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
  })
  .catch((err) => console.log(err));

import userRouter from "./routes/userRoutes";

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

app.use(notFound);
app.use(errorHandler);
