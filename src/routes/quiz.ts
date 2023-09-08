import express from "express";
import { getAll, saveResponse } from "../controllers/quiz/index";

const router = express.Router();

router.get("/", getAll);
router.post("/receive/response", saveResponse);

export default router;
