import { 
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Tag } from "../models/tagModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "tags";

/**
 * Gets all tags.
 * @returns An array containing all tags.
 */
export const getAllTags = async (): Promise<Tag[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const tags: Tag[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt),
            } as Tag;
        });

        return tags;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Gets the tag with the specified ID.
 * @param id - The ID of the intended tag.
 * @returns The tag with the matching ID.
 * @throws Error if a tag with the given ID is not found.
 */
export const getTagById = async (id: string): Promise<Tag> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if(!doc) {
        throw new Error(`Tag with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const tag: Tag = {
        id: doc.id,
        ...data,
        createdAt: new Date(data?.createdAt),
        updatedAt: new Date(data?.updatedAt),
    } as Tag;

    return structuredClone(tag);
};

/**
 * Creates a new tag.
 * @param tagData - Only the fields needed to create a tag.
 * @returns The created tag.
 */
export const createTag = async (tagData: {
    name: string,
    description?: string,
    userId: string
}): Promise<Tag> => {
    const today: Date = new Date();

    const newTag: Partial<Tag> = {
        ...tagData,
        createdAt: today,
        updatedAt: today,
    };

    const tagId: string = await createDocument<Tag>(COLLECTION, newTag);

    return structuredClone({
        id: tagId,
        ...newTag,
    } as Tag);
};

/**
 * Updates an existing tag.
 * @param id The ID of the tag intended to be updated.
 * @param tagData - Only fields that can be updated.
 * @returns The updated tag.
 * @throws Error if a tag with the given ID is not found.
 */
export const updateTag = async (id: string, tagData: {
    name?: string;
    description?: string;
}): Promise<Tag> => {
    const tag: Tag = await getTagById(id);

    const updateTag: Tag = {
        ...tag,
        ...tagData,
        updatedAt: new Date(),
    };

    await updateDocument<Tag>(COLLECTION, id, updateTag);

    return structuredClone(updateTag);
};

/**
 * Removes a tag.
 * @param id The ID of the tag intended to be removed.
 * @throws Error if a tag with the given ID is not found.
 */
export const deleteTag = async (id: string): Promise<void> => {
    await getTagById(id);

    await deleteDocument(COLLECTION, id);
};
