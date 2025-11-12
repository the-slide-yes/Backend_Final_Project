import express, { Router } from "express";
import * as tagController from "../controllers/tagController";

const router: Router = express.Router();

// Each are prefixed by "/api/v1/tags" 

router.get("/", tagController.getAllTags);
router.get("/:id", tagController.getTagById);
router.post("/", tagController.createTag);
router.put("/:id", tagController.updateTag);
router.delete("/:id", tagController.deleteTag);

export default router;
