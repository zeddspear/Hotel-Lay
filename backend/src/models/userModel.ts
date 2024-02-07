import { NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

type userType = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  checkPassword: (password: string) => Promise<boolean>;
};

const userSchema = new Schema<userType>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } else {
    next();
  }
});

userSchema.methods.checkPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<userType>("user", userSchema);

export default User;
