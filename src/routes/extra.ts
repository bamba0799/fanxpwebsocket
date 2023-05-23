import express from "express";
import * as poiControllers from "../controllers/extra/poi";
import * as goodDealsControllers from "../controllers/extra/goodDeals";
import * as ucControllers from "../controllers/extra/uc";

const router = express.Router();

// poi == point of interest
router.post("/poi/categories", poiControllers.postCategory);
router.get("/poi/categories", poiControllers.getAllCategories);
router.put("/poi/categories/:id", poiControllers.updateCategory);
router.delete("/poi/categories/:id", poiControllers.deleteCategory);
router.post("/poi", poiControllers.postPOI);
router.get("/poi", poiControllers.getAllPOI);
router.get("/poi/:id", poiControllers.getOnePOI);
router.get("/poi/byCategory/:categoryId", poiControllers.getByCategory);
router.put("/poi/:id", poiControllers.updatePOI);
router.delete("/poi/:id", poiControllers.deletePOI);

// good deals
router.post("/good-deals", goodDealsControllers.post);
router.get("/good-deals", goodDealsControllers.getAll);
router.put("/good-deals/:id", goodDealsControllers.update);
router.delete("/good-deals/:id", goodDealsControllers.remove);

// useful contacts
router.put("/uc/owners/:id", ucControllers.updateOwner);
router.delete("/uc/owners/:id", ucControllers.removeOwner);
router.post("/uc", ucControllers.postContact);
router.put("/uc/:id", ucControllers.updateContact);
router.delete("/uc/:id", ucControllers.removeContact);
router.get("/uc", ucControllers.getAll);

export default router;
