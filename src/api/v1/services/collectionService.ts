import { Collection } from "../models/collectionModel";

/**
 * Gets all collections.
 * @returns An array containing all collections.
 */
export const getAllCollections = async (): Promise<Collection[]> => {
    const placeholderCollection: Collection = {
        name: "test",
        visibility: "private",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return [
        placeholderCollection
    ];
};

/**
 * Gets the collection with the specified ID.
 * @param id - The ID of the intended collection.
 * @returns The collection with the matching ID.
 * @throws Error if a collection with the given ID is not found.
 */
export const getCollectionById = async (id: string): Promise<Collection> => {
    const placeholderCollection: Collection = {
        name: "test",
        visibility: "private",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return placeholderCollection;
};

/**
 * Creates a new collection.
 * @param collectionData - Only the fields needed to create a collection.
 * @returns The created collection.
 */
export const createCollection = async (collectionData: {
    name: string,
    description?: string,
    wordIds?: string[],
    userId: string
}): Promise<Collection> => {
    const placeholderCollection: Collection = {
        id: "2",
        visibility: "private",
        name: collectionData.name,
        wordIds: collectionData.wordIds,
        userId: collectionData.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    return placeholderCollection;
};

/**
 * Updates an existing collection.
 * @param id The ID of the collection intended to be updated.
 * @param collectionData - Only fields that can be updated.
 * @returns The updated collection.
 * @throws Error if a collection with the given ID is not found.
 */
export const updateCollection = async (id: string, collectionData: {
    name?: string;
    description?: string;
    wordIds?: string[];
}): Promise<Collection> => {
    const placeholderCollection: Collection = {
        name: collectionData.name || "terry",
        description: collectionData.description || "not jerry",
        visibility: "private",
        id: "2",
        wordIds: collectionData.wordIds,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return placeholderCollection;
};

/**
 * Removes a collection.
 * @param id The ID of the collection intended to be removed.
 * @returns A message confirming the collection was successfully deleted.
 * @throws Error if a collection with the given ID is not found.
 */
export const deleteCollection = async (id: string): Promise<string> => {
    return "It has been done."
};
