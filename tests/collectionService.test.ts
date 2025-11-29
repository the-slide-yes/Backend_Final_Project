import * as collectionService from "../src/api/v1/services/collectionService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Collection } from "../src/api/v1/models/collectionModel";
import { DocumentData } from "firebase-admin/firestore";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Collection Service", () => {
    const today: Date = new Date();
    const mockCollectionData: {
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


    describe("getAllCollections", () => {
        it("should return all collections successfully", async () => {
            // Arrange
            const mockCollection: Collection = {
                id: "1",
                ...mockCollectionData
            } as Collection;
            const expectedCollections: Collection[] = [mockCollection];

            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(
                {
                    docs: [{
                        id: mockCollection.id,
                        data: (): DocumentData => ({
                            ...mockCollectionData,
                            createdAt: mockCollectionData.createdAt.toISOString(),
                            updatedAt: mockCollectionData.updatedAt.toISOString(),
                        }),
                    }]
                }
            );

            // Act
            const result: Collection[] = await collectionService.getAllCollections();

            // Assert
            expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(
                "collections",
            );
            expect(result).toMatchObject(expectedCollections);
        });
    });

    describe("getCollectionById", () => {
        it("should return a collection successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-collection-id";
            const mockCollection: Collection = {
                id: mockDocumentId,
                ...mockCollectionData,
            } as Collection;

            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(
                {
                    id: mockDocumentId,
                    data: () => ({
                        ...mockCollectionData,
                        createdAt: mockCollectionData.createdAt.toISOString(),
                        updatedAt: mockCollectionData.updatedAt.toISOString(),
                    }),
                }
            );

            // Act
            const collection: Collection = await collectionService.getCollectionById(mockDocumentId);

            // Assert
            expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
                "collections",
                mockDocumentId
            );
            expect(collection).toMatchObject(mockCollection);
        });
    });

    describe("createCollection", () => {
        it("should create a collection successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-collection-id";

            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
                mockDocumentId
            );

            // Act
            const result: Collection = await collectionService.createCollection(mockCollectionData as {
                name: string,
                description?: string,
                tagIds?: string[],
                userId: string,
            });

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
                "collections",
                expect.objectContaining({
                    name: mockCollectionData.name,
                    description: mockCollectionData.description,
                    userId: mockCollectionData.userId,
                })
            );
            expect(result.id).toBe(mockDocumentId);
            expect(result.name).toBe(mockCollectionData.name);
        });
    });

    describe("updateCollection", () => {
        it("should update a collection successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-collection-id";
            const mockCollection: Collection = {
                id: mockDocumentId,
                ...mockCollectionData,
            } as Collection;
            const mockUpdateData: Partial<Collection> = {
                name: "Chad Jeremy McNotsad",
            };
            const mockUpdatedCollection: Collection = {
                ...mockCollection,
                ...mockUpdateData,
            };

            jest.spyOn(collectionService, "getCollectionById").mockResolvedValue(mockCollection);

            (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            const updatedCollection: Collection = await collectionService.updateCollection(mockDocumentId, mockUpdateData);

            // Assert
            expect(collectionService.getCollectionById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
                "collections",
                mockDocumentId,
                {
                    ...mockUpdatedCollection,
                    updatedAt: expect.any(Date),
                },
            );
            expect(updatedCollection.name).toBe(mockUpdatedCollection.name); 
            expect(updatedCollection.description).toBe(mockUpdatedCollection.description); 
            expect(updatedCollection.createdAt).toMatchObject(mockUpdatedCollection.createdAt); 
            expect(updatedCollection.id).toBe(mockUpdatedCollection.id); 
            expect(updatedCollection.userId).toBe(mockUpdatedCollection.userId); 
            // There has to be a better way :(
            expect(typeof(updatedCollection.updatedAt)).toBe(typeof(new Date())); 
        });
    });

    describe("deleteCollection", () => {
        it("should delete a collection successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-collection-id";
            const mockCollection: Collection = {
                id: mockDocumentId,
                ...mockCollectionData,
            } as Collection;

            jest.spyOn(collectionService, "getCollectionById").mockResolvedValue(mockCollection);

            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            await collectionService.deleteCollection(mockDocumentId);

            // Assert
            expect(collectionService.getCollectionById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
                "collections",
                mockDocumentId
            );
        });
    });
});
