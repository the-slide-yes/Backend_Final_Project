import {Request, Response, NextFunction} from "express";
import {HTTP_STATUS} from "../../../constants/httpConstants";
import * as wordService from "../services/wordService";
import {Word} from "../models/wordModel";
import {successResponse} from "../models/responseModel";

/**
 * Manages requests and responses to retrieve all Words
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllWords: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    _req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // Retrieve Words
        const words: Word[] = await wordService.getAllWords();

        // Respond with a success response containing the Words
        res.status(HTTP_STATUS.OK).json(
            successResponse(words, "Words retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to retrieve a Word by its ID
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getWordById: (
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

        // Retrieve Word
        const word: Word = await wordService.getWordById(id);

        // Respond with a success response containing the Words
        res.status(HTTP_STATUS.OK).json(
            successResponse(word, "Word retrieved successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to create a new Word
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createWord: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // Extract the fields used in creating a Word
        const { 
            name,
            description,
            tagIds,
            userId
        }: {
            name: string,
            description?: string,
            tagIds: string[],
            userId: string,
        } = req.body;
        const today: Date = new Date();

        // Create new Word
        const newWord: Word = await wordService.createWord({
            historicalId: undefined,
            name: name,
            description: description,
            userId: userId,
            tagIds: tagIds,
            updatedAt: today,
            createdAt: today,
            visibility: "private"
        } as Omit<Word, "id">);

        // Respond with a success response containing the new Word
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newWord, "Word created successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}


/**
 * Manages requests and responses to delete a Word
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteWord: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // get the intended Word id
        const id: string = req.params.id;

        // Delete the Word
        const deletionResponse: string = await wordService.deleteWord(id);

        // Respond with a success response containing the deletion message. 
        res.status(HTTP_STATUS.OK).json(
            successResponse(deletionResponse, "Word deleted successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}

/**
 * Manages requests and responses to update a Word
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const updateWord: (
    req: Request, 
    res: Response, 
    next: NextFunction
) => void = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        // get the intended Word id
        const id: string = req.params.id;

        // Extract the fields used in updating a Word
        const { 
            name,
            description,
            tagIds,
        }: {
            name?: string,
            description?: string,
            tagIds?: string[],
        } = req.body;

        // Update the Word
        const updatedWord: Word = await wordService.updateWord(id, {
            name: name,
            description: description,
            tagIds: tagIds,
        });

        // Respond with a success response containing the new Word
        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedWord, "Word updated successfully.")
        );
    } catch (error: unknown) {
        next(error);
    }
}
