import { Router } from "express";
import { signup, login, getMe } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";

const router = Router();

router.post(
    "/signup",
    upload.single("image"),
    signup
);
router.post("/login", login);
router.get("/me", authenticate, getMe);

export default router;
