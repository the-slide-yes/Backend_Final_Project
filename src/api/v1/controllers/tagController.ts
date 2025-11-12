
import {Request, Response, NextFunction} from "express";
import {HTTP_STATUS} from "../../../constants/httpConstants";
import * as tagService from "../services/tagService";
import {Tag} from "../models/tagModel";
import {successResponse} from "../models/responseModel";

/**
 * Manages requests and responses to retrieve all Tags
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllTags: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    _req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // Retrieve Tags
        const tags: Tag[] = await tagService.getAllTags();

        // Respond with a success response containing the Tags
        res.status(HTTP_STATUS.OK).json(
            successResponse(tags, "Tags retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to retrieve a Tag by its ID
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getTagById: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // Get the id from the request parameters
        const id: string = req.params.id;

        // Retrieve Tag
        const tag: Tag = await tagService.getTagById(id);

        // Respond with a success response containing the Tags
        res.status(HTTP_STATUS.OK).json(
            successResponse(tag, "Tag retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to create a new Tag
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createTag: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // Extract the fields used in creating a Tag
        const { 
            name,
            description,
            userId
        }: {
            name: string,
            description?: string,
            userId: string,
        } = req.body;
        const today: Date = new Date();

        // Create new Tag
        const newTag: Tag = await tagService.createTag({
            historicalId: undefined,
            name: name,
            description: description,
            userId: userId,
            updatedAt: today,
            createdAt: today,
            visibility: "private"
        } as Omit<Tag, "id">);

        // Respond with a success response containing the new Tag
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newTag, "Tag created successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}


/**
 * Manages requests and responses to delete a Tag
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteTag: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // get the intended Tag id
        const id: string = req.params.id;

        // Delete the Tag
        const deletionResponse: string = await tagService.deleteTag(id);

        // Respond with a success response containing the deletion message. 
        res.status(HTTP_STATUS.OK).json(
            successResponse(deletionResponse, "Tag deleted successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to update a Tag
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const updateTag: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // get the intended Tag id
        const id: string = req.params.id;

        // Extract the fields used in updating a Tag
        const { 
            name,
            description,
        }: {
            name?: string,
            description?: string,
        } = req.body;

        // Update the Tag
        const updatedTag: Tag = await tagService.updateTag(id, {
            name: name,
            description: description,
        });

        // Respond with a success response containing the new Tag
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedTag, "Tag updated successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}
