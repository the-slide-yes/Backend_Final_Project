import express, { Router } from "express";
import * as collectionController from "../controllers/collectionController";
import { validateRequest } from "../middleware/validate";
import { collectionSchemas } from "../validation/collectionSchemas";

const router: Router = express.Router();

// Each are prefixed by "/api/v1/collections" 

/**
* @openapi
* /collections:
*   get:
*     summary: Retrieves a list of collections
*     tags: [Collections]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of Collections
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Collection'
*/
router.get(
    "/",
    collectionController.getAllCollections
);

/**
* @openapi
* /collections/{id}:
*   get:
*     summary: Creates a new collection
*     tags: [Collections]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the desired collection
*     responses:
*       200:
*         description: A Collection
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Collection'
*       404:
*         description: Collection not found
*/
router.get(
    "/:id",
    validateRequest(collectionSchemas.getById),
    collectionController.getCollectionById
);

/**
* @openapi
* /collections:
*   post:
*     summary: Retrieves one collection with the apecified ID
*     tags: [Collections]
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
*               wordIds:
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
*         description: Collection created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Collection'
*       400:
*         description: Invalid input data
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*/
router.post(
    "/",
    validateRequest(collectionSchemas.create),
    collectionController.createCollection
);

/**
* @openapi
* /collections/{id}:
*   put:
*     summary: Updates one collection with the apecified ID
*     tags: [Collections]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the desired collection
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
*               wordIds:
*                 type: array
*                 items:
*                   type: string
*                 example: ["31215FSAG235G", "64HRGD53725325", "HFEF533638GDHNY"]
*     responses:
*       200:
*         description: Collection updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Collection'
*       400:
*         description: Invalid input data
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*       404:
*         description: Collection not found
*/
router.put(
    "/:id",
    validateRequest(collectionSchemas.update),
    collectionController.updateCollection
);

/**
* @openapi
* /collections/{id}:
*   delete:
*     summary: Deletes one collection with the apecified ID
*     tags: [Collections]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the desired collection
*     responses:
*       200:
*         description: Collection deleted successfully
*       404:
*         description: Collection not found
*/
router.delete(
    "/:id",
    validateRequest(collectionSchemas.delete),
    collectionController.deleteCollection
);

export default router;
