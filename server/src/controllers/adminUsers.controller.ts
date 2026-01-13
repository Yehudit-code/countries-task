import { Request, Response } from "express";
import { User } from "../models/user.model";

/**
 * Get all users (admin)
 */
export const getAllUsersController = async (
  _req: Request,
  res: Response
) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

/**
 * Get user by id (admin)
 */
export const getUserByIdController = async (
  req: Request,
  res: Response
) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

/**
 * Update user profile (admin – no permissions here)
 */
export const updateUserController = async (
  req: Request,
  res: Response
) => {
  const { firstName, lastName, phone, profileImage } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      firstName,
      lastName,
      phone,
      profileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(updatedUser);
};
