import {Request, Response, NextFunction} from "express";
import {HTTP_STATUS} from "../../../constants/httpConstants";
import * as collectionService from "../services/collectionService";
import {Collection} from "../models/collectionModel";
import {successResponse} from "../models/responseModel";

/**
 * Manages requests and responses to retrieve all Collections
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllCollections: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    _req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // Retrieve Collections
        const collections: Collection[] = await collectionService.getAllCollections();

        // Respond with a success response containing the Collections
        res.status(HTTP_STATUS.OK).json(
            successResponse(collections, "Collections retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to retrieve a Collection by its ID
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getCollectionById: (
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

        // Retrieve Collection
        const collection: Collection = await collectionService.getCollectionById(id);

        // Respond with a success response containing the Collections
        res.status(HTTP_STATUS.OK).json(
            successResponse(collection, "Collection retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to create a new Collection
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createCollection: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // Extract the fields used in creating a Collection
        const { 
            name,
            description,
            wordIds,
            userId
        }: {
            name: string,
            description?: string,
            wordIds: string[],
            userId: string,
        } = req.body;
        const today: Date = new Date();

        // Create new Collection
        const newCollection: Collection = await collectionService.createCollection({
            historicalId: undefined,
            name: name,
            description: description,
            userId: userId,
            wordIds: wordIds,
            updatedAt: today,
            createdAt: today,
            visibility: "private"
        } as Omit<Collection, "id">);

        // Respond with a success response containing the new Collection
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newCollection, "Collection created successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}


/**
 * Manages requests and responses to delete a Collection
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteCollection: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // get the intended Collection id
        const id: string = req.params.id;

        // Delete the Collection
        await collectionService.deleteCollection(id);

        // Respond with a success response
        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Collection deleted successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to update a Collection
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const updateCollection: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // get the intended Collection id
        const id: string = req.params.id;

        // Extract the fields used in updating a Collection
        const { 
            name,
            description,
            wordIds,
        }: {
            name?: string,
            description?: string,
            wordIds?: string[],
        } = req.body;

        // Update the Collection
        const updatedCollection: Collection = await collectionService.updateCollection(id, {
            name: name,
            description: description,
            wordIds: wordIds,
        });

        // Respond with a success response containing the new Collection
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedCollection, "Collection updated successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}
