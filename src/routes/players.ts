import express from "express";
import * as playersController from "../controllers/players";

const router = express.Router();

router.get("/", playersController.getAll);
router.get("/:PlayerId", playersController.getOne);
router.post("/", playersController.post);
router.delete("/:PlayerId", playersController.deletePlayer);
router.put("/:PlayerId", playersController.updatePlayer);

export default router;
