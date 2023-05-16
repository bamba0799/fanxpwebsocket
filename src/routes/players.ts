import express from "express";
import * as playersRoutes from "../controllers/players";
import { getAll, post } from "../controllers/players/index";

const router = express.Router();

router.get("/", playersRoutes.getAll);
router.get("/:PlayerId", playersRoutes.getOne);
router.post("/", playersRoutes.post);
router.delete("/:PlayerId", playersRoutes.deletePlayer);
router.put("/:PlayerId", playersRoutes.updatePlayer);
//router.get("/:groupId", playersRoutes.findOne);

export default router;
