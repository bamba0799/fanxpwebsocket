import express from "express";
import { getPicture, getUser } from "../controllers/user";
import { checkAuth } from "../middlewares/auth";

const router = express.Router();

router.get("/", checkAuth, getUser);
router.get("/profile", checkAuth, getPicture);

export default router;
