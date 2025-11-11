import express, { Router } from "express";
import * as wordController from "../controllers/wordController";

const router: Router = express.Router();

// Each are prefixed by "/api/v1/words" 

router.get("/", wordController.getAllWords);
router.get("/:id", wordController.getWordById);
router.post("/", wordController.createWord);
router.put("/:id", wordController.updateWord);
router.delete("/:id", wordController.deleteWord);

export default router;
