import express, { Router } from "express";
import * as collectionController from "../controllers/collectionController";
import { validateRequest } from "../middleware/validate";
import { collectionSchemas } from "../validation/collectionSchemas";

const router: Router = express.Router();

// Each are prefixed by "/api/v1/collections" 

router.get(
    "/", 
    collectionController.getAllCollections
);

router.get(
    "/:id",
    validateRequest(collectionSchemas.getById),
    collectionController.getCollectionById
);

router.post(
    "/", 
    validateRequest(collectionSchemas.create),
    collectionController.createCollection
);

router.put(
    "/:id", 
    validateRequest(collectionSchemas.update),
    collectionController.updateCollection
);

router.delete(
    "/:id", 
    validateRequest(collectionSchemas.delete),
    collectionController.deleteCollection
);

export default router;
