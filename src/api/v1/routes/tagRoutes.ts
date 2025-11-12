import express, { Router } from "express";
import * as tagController from "../controllers/tagController";
import { validateRequest } from "../middleware/validate";
import { tagSchemas } from "../validation/tagSchemas";

const router: Router = express.Router();

// Each are prefixed by "/api/v1/tags" 

router.get(
    "/", 
    tagController.getAllTags
);

router.get(
    "/:id",
    validateRequest(tagSchemas.getById),
    tagController.getTagById
);

router.post(
    "/", 
    validateRequest(tagSchemas.create),
    tagController.createTag
);

router.put(
    "/:id", 
    validateRequest(tagSchemas.update),
    tagController.updateTag
);

router.delete(
    "/:id", 
    validateRequest(tagSchemas.delete),
    tagController.deleteTag
);

export default router;
