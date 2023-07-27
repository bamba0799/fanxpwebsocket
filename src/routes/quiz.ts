import express from "express";
import {getAll} from "../controllers/quiz/index"

const router = express.Router()

router.get("/", getAll)

export default router
