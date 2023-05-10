import express from "express";
import * as groupsRoutes from "../controllers/groups";

const router = express.Router();

router.get("/", groupsRoutes.findAll);
router.get("/:groupId", groupsRoutes.findOne);

export default router;
