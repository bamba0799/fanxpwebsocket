import express from "express";
import { getAll, post, remove } from "../controllers/matchs";

const router = express.Router();

router.post("/", post);
router.get("/", getAll);
router.delete("/:id", remove);

export default router;
