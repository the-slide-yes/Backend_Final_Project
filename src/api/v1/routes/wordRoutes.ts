import express, { Router } from "express";
import * as wordController from "../controllers/wordController";
import { validateRequest } from "../middleware/validate";
import { wordSchemas } from "../validation/wordSchemas";

const router: Router = express.Router();

// Each are prefixed by "/api/v1/words" 

router.get(
    "/", 
    wordController.getAllWords
);

router.get(
    "/:id",
    validateRequest(wordSchemas.getById),
    wordController.getWordById
);

router.post(
    "/", 
    validateRequest(wordSchemas.create),
    wordController.createWord
);

router.put(
    "/:id", 
    validateRequest(wordSchemas.update),
    wordController.updateWord
);

router.delete(
    "/:id", 
    validateRequest(wordSchemas.delete),
    wordController.deleteWord
);

export default router;
