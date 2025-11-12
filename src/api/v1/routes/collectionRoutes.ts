import express, { Router } from "express";
import * as collectionController from "../controllers/collectionController";

const router: Router = express.Router();

// Each are prefixed by "/api/v1/collections" 

router.get("/", collectionController.getAllCollections);
router.get("/:id", collectionController.getCollectionById);
router.post("/", collectionController.createCollection);
router.put("/:id", collectionController.updateCollection);
router.delete("/:id", collectionController.deleteCollection);

export default router;
