import express from "express";
import * as teamsRoutes from "../controllers/teams/fav";

const router = express.Router();

router.get("/fav/:userId", teamsRoutes.getAll);
router.post("/fav", teamsRoutes.post);
router.delete("/fav", teamsRoutes.remove);

export default router;
