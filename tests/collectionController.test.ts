import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as collectionController from "../src/api/v1/controllers/collectionController";
import * as collectionService from "../src/api/v1/services/collectionService";
import { Collection } from "../src/api/v1/models/collectionModel";

jest.mock("../src/api/v1/services/collectionService");

describe("Collection Controller", ()=>{
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(()=>{
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });
    
    describe("getAllCollections", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockCollections: Collection[] = [
                {
                    id: "Example ID",
                    name: "Example Name",
                    description: "Example Description",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: "Example User ID",
                    visibility: "private",
                }
            ];

            (collectionService.getAllCollections as jest.Mock).mockReturnValue(mockCollections);

            // Act
            await collectionController.getAllCollections(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Collections retrieved successfully.",
                status: "success",
                data: mockCollections,
            });
        });
    });

    describe("getCollectionById", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockCollection: Collection = {
                id: "Example ID",
                name: "Example Name",
                description: "Example Description",
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: "Example User ID",
                visibility: "private",
            };

            mockReq.params = { id: mockCollection.id };

            (collectionService.getCollectionById as jest.Mock).mockReturnValue(mockCollection);

            // Act
            await collectionController.getCollectionById(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Collection retrieved successfully.",
                status: "success",
                data: mockCollection,
            });
        });
    });

    describe("deleteCollection", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockId: string = "Mock ID";
            const mockDeletionMessage: string = "Mock Deletion Message";

            mockReq.params = { id: mockId };

            (collectionService.deleteCollection as jest.Mock).mockReturnValue(mockDeletionMessage);

            // Act
            await collectionController.deleteCollection(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Collection deleted successfully.",
                status: "success",
                data: mockDeletionMessage,
            });
        });
    });

    describe("createCollection", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockCollectionData: {
                name: string;
                description: string;
                userId: string;
            } = {
                name: "Example Name",
                description: "Example Description",
                userId: "Example User ID",
            };

            const today: Date = new Date();

            const mockCollection: Collection = {
                ...mockCollectionData,
                id: "Example ID",
                createdAt: today,
                updatedAt: today,
                visibility: "private",
            };

            mockReq.body = mockCollectionData;

            (collectionService.createCollection as jest.Mock).mockReturnValue(mockCollection);

            // Act
            await collectionController.createCollection(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Collection created successfully.",
                status: "success",
                data: mockCollection,
            });
        });
    });

    describe("updateCollection", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockCollectionData: {
                name: string;
                description: string;
                userId: string;
            } = {
                name: "Example Name",
                description: "Example Description",
                userId: "Example User ID",
            };

            const today: Date = new Date();

            const mockCollection: Collection = {
                ...mockCollectionData,
                id: "Example ID",
                updatedAt: today,
                createdAt: today,
                visibility: "private",
            };

            mockReq.body = mockCollectionData;

            (collectionService.updateCollection as jest.Mock).mockReturnValue(mockCollection);

            // Act
            await collectionController.updateCollection(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Collection updated successfully.",
                status: "success",
                data: mockCollection,
            });
        });
    });
});
