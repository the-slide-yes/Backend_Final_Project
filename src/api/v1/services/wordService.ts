import { 
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Word } from "../models/wordModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "words";

/**
 * Gets all words.
 * @returns An array containing all words.
 */
export const getAllWords = async (): Promise<Word[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
        const words: Word[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate(),
            } as Word;
        });

        return words;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Gets the word with the specified ID.
 * @param id - The ID of the intended word.
 * @returns The word with the matching ID.
 * @throws Error if a word with the given ID is not found.
 */
export const getWordById = async (id: string): Promise<Word> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if(!doc) {
        throw new Error(`Word with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const word: Word = {
        id: doc.id,
        ...data,
        createdAt: data?.createdAt.toDate(),
        updatedAt: data?.updatedAt.toDate(),
    } as Word;

    return structuredClone(word);
};

/**
 * Creates a new word.
 * @param wordData - Only the fields needed to create a word.
 * @returns The created word.
 */
export const createWord = async (wordData: {
    name: string,
    description?: string,
    tagId?: string[],
    userId: string
}): Promise<Word> => {
    const today: Date = new Date();

    const newWord: Partial<Word> = {
        ...wordData,
        createdAt: today,
        updatedAt: today,
    };

    const wordId: string = await createDocument<Word>(COLLECTION, newWord);

    return structuredClone({
        id: wordId,
        ...newWord,
    } as Word);
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
    description?: string;
    tagIds?: string[];
}): Promise<Word> => {
    const word: Word = await getWordById(id);

    const updateWord: Word = {
        ...word,
        ...wordData,
        updatedAt: new Date(),
    };

    await updateDocument<Word>(COLLECTION, id, updateWord);

    return structuredClone(updateWord);
};

/**
 * Removes a word.
 * @param id The ID of the word intended to be removed.
 * @throws Error if a word with the given ID is not found.
 */
export const deleteWord = async (id: string): Promise<void> => {
    await getWordById(id);

    await deleteDocument(COLLECTION, id);
};
