import express from "express";
import * as playersControllers from "../controllers/players";

const router = express.Router();

router.post("/", playersControllers.post);
router.get("/", playersControllers.getAll);
router.get("/:playerId", playersControllers.getOne);
router.delete("/:playerId", playersControllers.remove);
router.put("/:playerId", playersControllers.update);

export default router;
