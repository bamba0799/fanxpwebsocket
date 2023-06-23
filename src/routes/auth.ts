import express from "express";
import * as authControllers from "../controllers/auth";

const router = express.Router();

router.post("/", authControllers.getAuth);
router.post("/verify-otp", authControllers.verifyOTP);
router.post("/refresh-token", authControllers.refreshToken);

export default router;
