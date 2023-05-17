import express from "express";
import * as favTeamsControllers from "../controllers/teams/fav";
import * as teamsControllers from "../controllers/teams";

const router = express.Router();

// fav
router.post("/fav", favTeamsControllers.post);
router.get("/fav/:userId", favTeamsControllers.getAll);
router.delete("/fav", favTeamsControllers.remove);

// teams
router.post("/", teamsControllers.post);
router.get("/", teamsControllers.getAll);
router.get("/:teamId", teamsControllers.getOne);
router.put("/:teamId", teamsControllers.updateTeam);
router.delete("/:teamId", teamsControllers.deleteTeam);

export default router;
