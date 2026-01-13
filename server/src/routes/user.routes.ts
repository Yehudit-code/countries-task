import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { updateMyProfile } from "../controllers/user.controller";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.put(
  "/me",
  authenticate,
  upload.single("profileImage"), 
  updateMyProfile
);
export default router;
