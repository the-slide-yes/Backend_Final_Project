import express, { Router } from "express";
import * as wordController from "../controllers/wordController";
import { validateRequest } from "../middleware/validate";
import { wordSchemas } from "../validation/wordSchemas";

const router: Router = express.Router();

// Each are prefixed by "/api/v1/words" 

/**
* @openapi
* /words:
*   get:
*     summary: Retrieves a list of words
*     tags: [Words]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of Words
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Word'
*/
router.get(
    "/", 
    wordController.getAllWords
);

/**
* @openapi
* /words/{id}:
*   get:
*     summary: Creates a new word
*     tags: [Words]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the desired word
*     responses:
*       200:
*         description: A Word
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Word'
*        404:
*         description: Word not found
*/
router.get(
    "/:id",
    validateRequest(wordSchemas.getById),
    wordController.getWordById
);

/**
* @openapi
* /words:
*   post:
*     summary: Retrieves one word with the apecified ID
*     tags: [Words]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - userId
*             properties:
*               name:
*                 type: string
*                 minLength: 1
*                 example: "Video Game"
*               description:
*                 type: string
*                 minLength: 1
*                 example: "A game played on a computer, console, or mobile device."
*               tagIds:
*                 type: array
*                 items:
*                   type: string
*                 example: ["31215FSAG235G", "64HRGD53725325", "HFEF533638GDHNY"]
*               userId:
*                 type: string
*                 minLength: 1
*                 example: "21215GDF25G5"
*     responses:
*       201:
*         description: Word created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Word'
*       400:
*         description: Invalid input data
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error
*/
router.post(
    "/", 
    validateRequest(wordSchemas.create),
    wordController.createWord
);

/**
* @openapi
* /words/{id}:
*   put:
*     summary: Updates one word with the apecified ID
*     tags: [Words]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the desired word
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 minLength: 1
*                 example: "Video Game"
*               description:
*                 type: string
*                 minLength: 1
*                 example: "A game played on a computer, console, or mobile device."
*               tagIds:
*                 type: array
*                 items:
*                   type: string
*                 example: ["31215FSAG235G", "64HRGD53725325", "HFEF533638GDHNY"]
*     responses:
*       200:
*         description: Word updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Word'
*       400:
*         description: Invalid input data
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*       404:
*         description: Word not found
*/
router.put(
    "/:id", 
    validateRequest(wordSchemas.update),
    wordController.updateWord
);

/**
* @openapi
* /words/{id}:
*   delete:
*     summary: Deletes one word with the apecified ID
*     tags: [Words]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the desired word
*     responses:
*       200:
*         description: Word deleted successfully
*       404:
*         description: Word not found
*/
router.delete(
    "/:id", 
    validateRequest(wordSchemas.delete),
    wordController.deleteWord
);

export default router;
