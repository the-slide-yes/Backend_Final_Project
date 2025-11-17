import express, { Router } from "express";
import * as tagController from "../controllers/tagController";
import { validateRequest } from "../middleware/validate";
import { tagSchemas } from "../validation/tagSchemas";

const router: Router = express.Router();

// Each are prefixed by "/api/v1/tags" 

/**
* @openapi
* /tags:
*   get:
*     summary: Retrieves a list of tags
*     tags: [Tags]
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: A list of Tags
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Tag'
*/
router.get(
    "/",
    tagController.getAllTags
);

/**
* @openapi
* /tags/{id}:
*   get:
*     summary: Creates a new tag
*     tags: [Tags]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the desired tag
*     responses:
*       200:
*         description: A Tag
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tag'
*       404:
*         description: Tag not found
*/
router.get(
    "/:id",
    validateRequest(tagSchemas.getById),
    tagController.getTagById
);

/**
* @openapi
* /tags:
*   post:
*     summary: Retrieves one tag with the apecified ID
*     tags: [Tags]
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
*               userId:
*                 type: string
*                 minLength: 1
*                 example: "21215GDF25G5"
*     responses:
*       201:
*         description: Tag created successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tag'
*       400:
*         description: Invalid input data
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*/
router.post(
    "/",
    validateRequest(tagSchemas.create),
    tagController.createTag
);

/**
* @openapi
* /tags/{id}:
*   put:
*     summary: Updates one tag with the apecified ID
*     tags: [Tags]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the desired tag
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
*     responses:
*       200:
*         description: Tag updated successfully
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Tag'
*       400:
*         description: Invalid input data
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Error'
*       404:
*         description: Tag not found
*/
router.put(
    "/:id",
    validateRequest(tagSchemas.update),
    tagController.updateTag
);

/**
* @openapi
* /tags/{id}:
*   delete:
*     summary: Deletes one tag with the apecified ID
*     tags: [Tags]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: string
*         description: The ID of the desired tag
*     responses:
*       200:
*         description: Tag deleted successfully
*       404:
*         description: Tag not found
*/
router.delete(
    "/:id",
    validateRequest(tagSchemas.delete),
    tagController.deleteTag
);

export default router;
