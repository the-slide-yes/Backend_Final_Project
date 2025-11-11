import { Word } from "../models/wordModel";

/**
 * Gets all words.
 * @returns An array containing all words.
 */
export const getAllWords = async (): Promise<Word[]> => {
    const placeholderWord: Word = {
        name: "test",
        visibility: "private",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return [
        placeholderWord
    ];
};

/**
 * Gets the word with the specified ID.
 * @param id - The ID of the intended word.
 * @returns The word with the matching ID.
 * @throws Error if a word with the given ID is not found.
 */
export const getWordById = async (id: string): Promise<Word> => {
    const placeholderWord: Word = {
        name: "test",
        visibility: "private",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return placeholderWord;
};

/**
 * Creates a new word.
 * @param wordData - Only the fields needed to create a word.
 * @returns The created word.
 */
export const createWord = async (wordData: Omit<Word, "id">): Promise<Word> => {
    const placeholderWord: Word = {
        name: "test",
        visibility: "private",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return placeholderWord;
};

/**
 * Updates an existing word.
 * @param id The ID of the word intended to be updated.
 * @param wordData - Only fields that can be updated.
 * @returns The updated word.
 * @throws Error if a word with the given ID is not found.
 */
export const updateWord = async (id: string, wordData: {
    name?: string;
    address?: string;
    phone?: string;
}): Promise<Word> => {
    const placeholderWord: Word = {
        name: "test",
        visibility: "private",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return placeholderWord;
};

/**
 * Removes a word.
 * @param id The ID of the word intended to be removed.
 * @returns A message confirming the word was successfully deleted.
 * @throws Error if a word with the given ID is not found.
 */
export const deleteWord = async (id: string): Promise<string> => {
    return "It has been done."
};
