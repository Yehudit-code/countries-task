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

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !phone ||
      !password
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists" });
    }

    const profileImage = req.file
      ? `/uploads/${req.file.filename}`
      : undefined;

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      phone,
      password,
      profileImage
    });

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        permissions: user.permissions,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        permissions: user.permissions
      }
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = await User.findById(req.user.userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    id: user._id,
    username: user.username,
    role: user.role,
    permissions: user.permissions
  });
};
