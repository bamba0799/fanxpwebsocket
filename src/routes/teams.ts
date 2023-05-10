import express from "express";
import * as teamsRoutes from "../controllers/teams/fav";

const router = express.Router();

router.get("/fav/:userId", teamsRoutes.findAll);
// TODO: ...

export default router;
