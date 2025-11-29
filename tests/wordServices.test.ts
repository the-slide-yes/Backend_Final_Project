import * as wordService from "../src/api/v1/services/wordService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Word } from "../src/api/v1/models/wordModel";
import { DocumentData } from "firebase-admin/firestore";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Word Service", () => {
    const today: Date = new Date();
    const mockWordData: {
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


    describe("getAllWords", () => {
        it("should return all words successfully", async () => {
            // Arrange
            const mockWord: Word = {
                id: "1",
                ...mockWordData
            } as Word;
            const expectedWords: Word[] = [mockWord];

            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(
                {
                    docs: [{
                        id: mockWord.id,
                        data: (): DocumentData => ({
                            ...mockWordData,
                            createdAt: mockWordData.createdAt.toISOString(),
                            updatedAt: mockWordData.updatedAt.toISOString(),
                        }),
                    }]
                }
            );

            // Act
            const result: Word[] = await wordService.getAllWords();

            // Assert
            expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(
                "words",
            );
            expect(result).toMatchObject(expectedWords);
        });
    });

    describe("getWordById", () => {
        it("should return a word successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-word-id";
            const mockWord: Word = {
                id: mockDocumentId,
                ...mockWordData,
            } as Word;

            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(
                {
                    id: mockDocumentId,
                    data: () => ({
                        ...mockWordData,
                        createdAt: mockWordData.createdAt.toISOString(),
                        updatedAt: mockWordData.updatedAt.toISOString(),
                    }),
                }
            );

            // Act
            const word: Word = await wordService.getWordById(mockDocumentId);

            // Assert
            expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
                "words",
                mockDocumentId
            );
            expect(word).toMatchObject(mockWord);
        });
    });

    describe("createWord", () => {
        it("should create a word successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-word-id";

            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
                mockDocumentId
            );

            // Act
            const result: Word = await wordService.createWord(mockWordData as {
                name: string,
                description?: string,
                tagIds?: string[],
                userId: string,
            });

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
                "words",
                expect.objectContaining({
                    name: mockWordData.name,
                    description: mockWordData.description,
                    userId: mockWordData.userId,
                })
            );
            expect(result.id).toBe(mockDocumentId);
            expect(result.name).toBe(mockWordData.name);
        });
    });

    describe("updateWord", () => {
        it("should update a word successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-word-id";
            const mockWord: Word = {
                id: mockDocumentId,
                ...mockWordData,
            } as Word;
            const mockUpdateData: Partial<Word> = {
                name: "Chad Jeremy McNotsad",
            };
            const mockUpdatedWord: Word = {
                ...mockWord,
                ...mockUpdateData,
            };

            jest.spyOn(wordService, "getWordById").mockResolvedValue(mockWord);

            (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            const updatedWord: Word = await wordService.updateWord(mockDocumentId, mockUpdateData);

            // Assert
            expect(wordService.getWordById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
                "words",
                mockDocumentId,
                {
                    ...mockUpdatedWord,
                    updatedAt: expect.any(Date),
                },
            );
            expect(updatedWord.name).toBe(mockUpdatedWord.name); 
            expect(updatedWord.description).toBe(mockUpdatedWord.description); 
            expect(updatedWord.createdAt).toMatchObject(mockUpdatedWord.createdAt); 
            expect(updatedWord.id).toBe(mockUpdatedWord.id); 
            expect(updatedWord.userId).toBe(mockUpdatedWord.userId); 
            expect(updatedWord.tagIds).toBe(mockUpdatedWord.tagIds);
            // There has to be a better way :(
            expect(typeof(updatedWord.updatedAt)).toBe(typeof(new Date())); 
        });
    });

    describe("deleteWord", () => {
        it("should delete a word successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-word-id";
            const mockWord: Word = {
                id: mockDocumentId,
                ...mockWordData,
            } as Word;

            jest.spyOn(wordService, "getWordById").mockResolvedValue(mockWord);

            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            await wordService.deleteWord(mockDocumentId);

            // Assert
            expect(wordService.getWordById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
                "words",
                mockDocumentId
            );
        });
    });
});
