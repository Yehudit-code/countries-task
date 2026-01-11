import { User } from "../models/user.model";

/**
 * Ensures that only one admin user exists in the system
 */
export const ensureSingleAdmin = async () => {
  const adminExists = await User.exists({ role: "admin" });

  if (adminExists) {
    throw new Error("Admin user already exists");
  }
};
