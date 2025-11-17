import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Collection:
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
 *           description: Unique identifier for the collection
 *           example: "531HFDGS5237976"
 *         name:
 *           type: string
 *           description: The name of the collection
 *           example: "Xander's Favorite Games"
 *         description:
 *           type: string
 *           description: A description of the collection
 *           example: "My favorite games"
 *         wordIds:
 *           type: array
 *           items:
 *             type: string
 *           description: The IDs of the words for this collection
 *           example: ["WORD1415", "WORD7423", "WORD7542"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When this collection was created
 *           example: "2024-01-20T14:45:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When this collection was last updated
 *           example: "2024-01-20T14:45:00Z"
 *         userId:
 *           type: string
 *           description: The ID of the user which created this collection
 *           example: "USER531736"
 *         visibility:
 *           type: string
 *           enum: [private, public, pending_publication, pending_deletion]
 *           description: Describes who is allowed to view this collection
 *           example: "private"
 */
export const collectionSchemas = {
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            description: Joi.string().optional().messages({
                "string.empty": "Description cannot be empty",
            }),
            wordIds: Joi.array<string>().optional().messages({
                "array.empty": "Word IDs cannot be an empty array",
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
            wordIds: Joi.array<string>().optional().messages({
                "array.empty": "Word IDs cannot be an empty array",
            }),
        }).required().messages({
            "any.required": "Request Body is required",
        }),
    },
};
