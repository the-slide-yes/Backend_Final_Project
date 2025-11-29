import * as tagService from "../src/api/v1/services/tagService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Tag } from "../src/api/v1/models/tagModel";
import { DocumentData } from "firebase-admin/firestore";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Tag Service", () => {
    const today: Date = new Date();
    const mockTagData: {
        name: string,
        description?: string,
        tagIds?: string[],
        userId: string,
        createdAt: Date,
        updatedAt: Date,
    } = {
        name: "The (the)",
        description: "The the the.",
        userId: "2",
        createdAt: today,
        updatedAt: today,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });


    describe("getAllTags", () => {
        it("should return all tags successfully", async () => {
            // Arrange
            const mockTag: Tag = {
                id: "1",
                ...mockTagData
            } as Tag;
            const expectedTags: Tag[] = [mockTag];

            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(
                {
                    docs: [{
                        id: mockTag.id,
                        data: (): DocumentData => ({
                            ...mockTagData,
                            createdAt: mockTagData.createdAt.toISOString(),
                            updatedAt: mockTagData.updatedAt.toISOString(),
                        }),
                    }]
                }
            );

            // Act
            const result: Tag[] = await tagService.getAllTags();

            // Assert
            expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(
                "tags",
            );
            expect(result).toMatchObject(expectedTags);
        });
    });

    describe("getTagById", () => {
        it("should return a tag successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-tag-id";
            const mockTag: Tag = {
                id: mockDocumentId,
                ...mockTagData,
            } as Tag;

            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(
                {
                    id: mockDocumentId,
                    data: () => ({
                        ...mockTagData,
                        createdAt: mockTagData.createdAt.toISOString(),
                        updatedAt: mockTagData.updatedAt.toISOString(),
                    }),
                }
            );

            // Act
            const tag: Tag = await tagService.getTagById(mockDocumentId);

            // Assert
            expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
                "tags",
                mockDocumentId
            );
            expect(tag).toMatchObject(mockTag);
        });
    });

    describe("createTag", () => {
        it("should create a tag successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-tag-id";

            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
                mockDocumentId
            );

            // Act
            const result: Tag = await tagService.createTag(mockTagData as {
                name: string,
                description?: string,
                tagIds?: string[],
                userId: string,
            });

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
                "tags",
                expect.objectContaining({
                    name: mockTagData.name,
                    description: mockTagData.description,
                    userId: mockTagData.userId,
                })
            );
            expect(result.id).toBe(mockDocumentId);
            expect(result.name).toBe(mockTagData.name);
        });
    });

    describe("updateTag", () => {
        it("should update a tag successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-tag-id";
            const mockTag: Tag = {
                id: mockDocumentId,
                ...mockTagData,
            } as Tag;
            const mockUpdateData: Partial<Tag> = {
                name: "Chad Jeremy McNotsad",
            };
            const mockUpdatedTag: Tag = {
                ...mockTag,
                ...mockUpdateData,
            };

            jest.spyOn(tagService, "getTagById").mockResolvedValue(mockTag);

            (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            const updatedTag: Tag = await tagService.updateTag(mockDocumentId, mockUpdateData);

            // Assert
            expect(tagService.getTagById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
                "tags",
                mockDocumentId,
                {
                    ...mockUpdatedTag,
                    updatedAt: expect.any(Date),
                },
            );
            expect(updatedTag.name).toBe(mockUpdatedTag.name); 
            expect(updatedTag.description).toBe(mockUpdatedTag.description); 
            expect(updatedTag.createdAt).toMatchObject(mockUpdatedTag.createdAt); 
            expect(updatedTag.id).toBe(mockUpdatedTag.id); 
            expect(updatedTag.userId).toBe(mockUpdatedTag.userId); 
            // There has to be a better way :(
            expect(typeof(updatedTag.updatedAt)).toBe(typeof(new Date())); 
        });
    });

    describe("deleteTag", () => {
        it("should delete a tag successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-tag-id";
            const mockTag: Tag = {
                id: mockDocumentId,
                ...mockTagData,
            } as Tag;

            jest.spyOn(tagService, "getTagById").mockResolvedValue(mockTag);

            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            await tagService.deleteTag(mockDocumentId);

            // Assert
            expect(tagService.getTagById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
                "tags",
                mockDocumentId
            );
        });
    });
});
