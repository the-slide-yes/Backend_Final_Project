import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - userId
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the tag
 *           example: "531HFDGS5237976"
 *         name:
 *           type: string
 *           description: The name of the tag
 *           example: "Video Game"
 *         description:
 *           type: string
 *           description: A description of the tag
 *           example: "A game playable on a computer, console, mobile device, or other digital system."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When this tag was created
 *           example: "2024-01-20T14:45:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When this tag was last updated
 *           example: "2024-01-20T14:45:00Z"
 *         userId:
 *           type: string
 *           description: The ID of the user which created this tag
 *           example: "USER531736"
 *         visibility:
 *           type: string
 *           enum: [private, public, pending_publication, pending_deletion]
 *           description: Describes who is allowed to view this tag
 *           example: "private"
 */
export const tagSchemas = {
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            description: Joi.string().optional().messages({
                "string.empty": "Description cannot be empty",
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
        }).required().messages({
            "any.required": "Request Body is required",
        }),
    },
};
