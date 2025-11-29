import { Visibility } from "./visibility";

/**
 * Represents a tag which can be given to a Word
 */
export interface Tag {
    id: string;
    name: string;
    description?: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    visibility: Visibility;
}
