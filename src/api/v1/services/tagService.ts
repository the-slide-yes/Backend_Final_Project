import { Tag } from "../models/tagModel";

/**
 * Gets all tags.
 * @returns An array containing all tags.
 */
export const getAllTags = async (): Promise<Tag[]> => {
    const placeholderTag: Tag = {
        name: "test",
        visibility: "private",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return [
        placeholderTag
    ];
};

/**
 * Gets the tag with the specified ID.
 * @param id - The ID of the intended tag.
 * @returns The tag with the matching ID.
 * @throws Error if a tag with the given ID is not found.
 */
export const getTagById = async (id: string): Promise<Tag> => {
    const placeholderTag: Tag = {
        name: "test",
        visibility: "private",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return placeholderTag;
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
    const placeholderTag: Tag = {
        id: "2",
        visibility: "private",
        name: tagData.name,
        userId: tagData.userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    return placeholderTag;
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
    const placeholderTag: Tag = {
        name: tagData.name || "terry",
        description: tagData.description || "not jerry",
        visibility: "private",
        id: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: "fred",
    };

    return placeholderTag;
};

/**
 * Removes a tag.
 * @param id The ID of the tag intended to be removed.
 * @returns A message confirming the tag was successfully deleted.
 * @throws Error if a tag with the given ID is not found.
 */
export const deleteTag = async (id: string): Promise<string> => {
    return "It has been done."
};
