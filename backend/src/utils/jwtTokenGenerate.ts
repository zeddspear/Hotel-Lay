import jwt from "jsonwebtoken";
import { Response } from "express";

function generateToken(res: Response, userID: string) {
  const token = jwt.sign({ userID }, process.env.SECRET_JWT as string, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV_MODE === "production" ? true : false,
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
}

export default generateToken;
