import jwt, { JwtPayload } from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import User from "../models/userModel";

type userType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
};

declare global {
  namespace Express {
    interface Request {
      user: userType;
    }
  }
}

const verifyToken = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies["jwt"];
    if (!token) {
      res.status(401).json({ message: "Unauthorized access denied!" });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT as string);
      req.user = await User.findById((decoded as JwtPayload).userID).select(
        "-password"
      );
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized access denied!" });
    }
  }
);

export default verifyToken;
