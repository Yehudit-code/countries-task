import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model";
import { ensureSingleAdmin } from "../services/user.service";

dotenv.config();

const createAdmin = async () => {
  try {
    // connect to DB
    await mongoose.connect(process.env.MONGO_URI as string);

    // ensure only one admin exists
    await ensureSingleAdmin();

    // create admin user
    await User.create({
      firstName: "System",
      lastName: "Admin",
      username: "admin",
      email: "yehudit59501@gmail.com",
      phone: "0500000000",
      password: "123456", 
      role: "admin",
      permissions: {
        create: true,
        update: true,
        delete: true
      }
    });

    console.log("✅ Admin user created successfully");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Failed to create admin:", error.message);
    process.exit(1);
  }
};

createAdmin();
