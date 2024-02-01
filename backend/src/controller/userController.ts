import User from "../models/userModel";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import generateToken from "../utils/jwtTokenGenerate";
import { check, validationResult } from "express-validator";

// @DESC register a user and save it in DB
// POST /api/user/register
export const registerUser = [
  [
    check("firstname", "First name is required").isString(),
    check("lastname", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password must be of atleast 6 characters.").isLength({
      min: 6,
    }),
  ],
  expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    if (user) {
      res.status(400).json({ message: "User already exists with this email" });
      throw new Error("User already exists with this email!");
    } else {
      try {
        const newUser = await User.create({ ...req.body });
        generateToken(res, newUser._id);
        res.status(201).json({
          id: newUser._id,
          fullname: `${newUser.firstname} ${newUser.lastname}`,
          email: newUser.email,
        });
      } catch (error) {
        res.status(500);
        throw new Error("Internal Server Error while registering user");
      }
    }
  }),
];

// @DESC login a user and compares its password to the entered password and Authentication
// POST /api/users/auth
export const loginUser = [
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password must be of 6 characters atleast.").isLength({
      min: 6,
    }),
  ],
  expressAsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    if (user && (await user.checkPassword(password))) {
      generateToken(res, user._id);
      res.status(200).json({
        id: user._id,
        fullname: `${user.firstname} ${user.lastname}`,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Password or Email");
    }
  }),
];

// @DESC logout a user and it sets cookie to empty
// POST /api/users/logout
export const logoutUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(0),
    });

    res.status(200).json({ message: "User Logged Out" });
  }
);
