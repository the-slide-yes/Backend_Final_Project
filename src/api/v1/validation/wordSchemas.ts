import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Word:
 *       type: object
 *       required
 *         - id
 *         - name
 *         - userId
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the word
 *           example: "531HFDGS5237976"
 *         name:
 *           type: string
 *           description: The name of the word
 *           example: "Rain World"
 *         description:
 *           type: string
 *           description: A description of the word
 *           example: "A difficult 2D platformer game."
 *         tagIds:
 *           type: array
 *           items:
 *             type: string
 *           description: The IDs of the tags for this word
 *           example: ["TAG1415", "TAG7423", "TAG7542"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When this word was created
 *           example: "2024-01-20T14:45:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When this word was last updated
 *           example: "2024-01-20T14:45:00Z"
 *         userId:
 *           type: string
 *           description: The ID of the user which created this word
 *           example: "USER531736"
 *         historicalId:
 *           type: string
 *           description: The ID of the previous version of this word (in the case this word is pending changes or publication)
 *           example: "WORD622624"
 *         visibility:
 *           type: string
 *           enum: [private, public, pending_publication, pending_deletion]
 *           description: Describes who is allowed to view this word
 *           example: "private"
 */
export const wordSchemas = {
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            description: Joi.string().optional().messages({
                "string.empty": "Description cannot be empty",
            }),
            tagIds: Joi.array<string>().optional().messages({
                "array.empty": "Tag IDs cannot be an empty array",
            }),
            // to be removed once authentication is implemented
            userId: Joi.string().required().messages({
                "any.required": "User ID is required",
                "string.empty": "User ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Request Body is required",
        }),
    },
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            })
        }).required().messages({
            "any.required": "Request Parameters are required",
        }),
    },
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            })
        }).required().messages({
            "any.required": "Request Parameters are required",
        }),
    },
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            })
        }).required().messages({
            "any.required": "Request Parameters are required",
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot be empty",
            }),
            description: Joi.string().optional().messages({
                "string.empty": "Description cannot be empty",
            }),
            tagIds: Joi.array<string>().optional().messages({
                "array.empty": "Tag IDs cannot be an empty array",
            }),
        }).required().messages({
            "any.required": "Request Body is required",
        }),
    },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "The name field is required"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "name"
 *               issue:
 *                 type: string
 *                 example: "must exist"
 */
