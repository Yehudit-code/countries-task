import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { updateMyProfile } from "../controllers/user.controller";

const router = Router();

router.put("/me", authenticate, updateMyProfile);

export default router;
