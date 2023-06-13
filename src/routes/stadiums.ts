import express from "express";
import * as stadiumsControllers from "../controllers/stadiums";

const router = express.Router();

router.post("/", stadiumsControllers.post);
router.get("/", stadiumsControllers.getAll);
router.get("/:stadiumId", stadiumsControllers.getOne);
router.put("/", stadiumsControllers.update);
router.delete("/:stadiumId", stadiumsControllers.remove);

export default router;
