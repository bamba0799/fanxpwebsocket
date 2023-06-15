import express from "express";
import { getAll, getOne, post, remove } from "../controllers/matchs";

const router = express.Router();

router.post("/", post);
router.get("/", getAll);
router.get("/:matchId", getOne);
router.delete("/:id", remove);

export default router;
