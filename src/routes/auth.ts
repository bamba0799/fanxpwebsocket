import express from "express";
import * as authControllers from "../controllers/auth";

const router = express.Router();

router.post("/login-or-register", authControllers.signInOrSignUp);
router.post("/verify-otp", authControllers.verifyOTP);

export default router;
