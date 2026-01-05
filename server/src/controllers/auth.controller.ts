import { Request, Response } from "express";
import { User } from "../models/User";
import { generateToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      password
    } = req.body;

    // basic validation
    if (!firstName || !lastName || !username || !email || !phone || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // check duplicates
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with email or username already exists" });
    }

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      phone,
      password
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};
