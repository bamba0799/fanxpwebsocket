import express from "express";
import * as groupsControllers from "../controllers/groups";

const router = express.Router();

router.get("/", groupsControllers.getAll);
router.get("/:groupId", groupsControllers.getOne);
router.post("/", groupsControllers.post);

export default router;
