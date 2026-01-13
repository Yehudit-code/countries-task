import { Request, Response } from "express";
import { User } from "../models/user.model";

/**
 * Update logged-in user's profile
 */
export const updateMyProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const userId = req.user!.userId;

  const { firstName, lastName, phone, profileImage } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      firstName,
      lastName,
      phone,
      profileImage,
    },
    { new: true }
  ).select("-password");

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(updatedUser);
};
