import Joi from "joi";

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
