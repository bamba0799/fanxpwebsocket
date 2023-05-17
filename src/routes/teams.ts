import express from "express";
import * as favteamsRoutes from "../controllers/teams/fav";
import * as teamsRoutes from "../controllers/teams/index";
const router = express.Router();

router.get("/fav/:userId", favteamsRoutes.findAll);
// Teams
router.get("/", teamsRoutes.getAll);
router.get("/:teamId", teamsRoutes.getOne);
router.post("/", teamsRoutes.post);
router.delete("/:teamId", teamsRoutes.deleteTeam);
router.put("/:teamId", teamsRoutes.updateTeam);

export default router;
