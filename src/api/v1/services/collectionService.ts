import { 
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Collection } from "../models/collectionModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "collections";

/**
 * Gets all collections.
 * @returns An array containing all collections.
 */
export const getAllCollections = async (): Promise<Collection[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const collections: Collection[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate(),
            } as Collection;
        });

        return collections;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Gets the collection with the specified ID.
 * @param id - The ID of the intended collection.
 * @returns The collection with the matching ID.
 * @throws Error if a collection with the given ID is not found.
 */
export const getCollectionById = async (id: string): Promise<Collection> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if(!doc) {
        throw new Error(`Collection with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const collection: Collection = {
        id: doc.id,
        ...data,
        createdAt: data?.createdAt.toDate(),
        updatedAt: data?.updatedAt.toDate(),
    } as Collection;

    return structuredClone(collection);
};

/**
 * Creates a new collection.
 * @param collectionData - Only the fields needed to create a collection.
 * @returns The created collection.
 */
export const createCollection = async (collectionData: {
    name: string,
    description?: string,
    wordId?: string[],
    userId: string
}): Promise<Collection> => {
    const today: Date = new Date();

    const newCollection: Partial<Collection> = {
        ...collectionData,
        createdAt: today,
        updatedAt: today,
    };

    const collectionId: string = await createDocument<Collection>(COLLECTION, newCollection);

    return structuredClone({
        id: collectionId,
        ...newCollection,
    } as Collection);
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
    const collection: Collection = await getCollectionById(id);

    const updateCollection: Collection = {
        ...collection,
        ...collectionData,
        updatedAt: new Date(),
    };

    await updateDocument<Collection>(COLLECTION, id, updateCollection);

    return structuredClone(updateCollection);
};

/**
 * Removes a collection.
 * @param id The ID of the collection intended to be removed.
 * @throws Error if a collection with the given ID is not found.
 */
export const deleteCollection = async (id: string): Promise<void> => {
    await getCollectionById(id);

    await deleteDocument(COLLECTION, id);
};
