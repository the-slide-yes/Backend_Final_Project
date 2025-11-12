import { Visibility } from "./visibility";

/**
 * Represents a collection of words
 */
export interface Word {
    id: string;
    name: string;
    description?: string;
    userId: string;
    wordIds?: string[];
    createdAt: Date;
    updatedAt: Date;
    visibility: Visibility;
}
