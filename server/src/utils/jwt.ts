import jwt from "jsonwebtoken";
import type { UserDocument } from "../models/user.model";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (user: UserDocument) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
      permissions: user.permissions
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
