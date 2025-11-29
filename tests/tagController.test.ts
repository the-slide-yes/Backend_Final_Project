import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as tagController from "../src/api/v1/controllers/tagController";
import * as tagService from "../src/api/v1/services/tagService";
import { Tag } from "../src/api/v1/models/tagModel";

jest.mock("../src/api/v1/services/tagService");

describe("Tag Controller", ()=>{
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
    
    describe("getAllTags", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockTags: Tag[] = [
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

            (tagService.getAllTags as jest.Mock).mockReturnValue(mockTags);

            // Act
            await tagController.getAllTags(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Tags retrieved successfully.",
                status: "success",
                data: mockTags,
            });
        });
    });

    describe("getTagById", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockTag: Tag = {
                id: "Example ID",
                name: "Example Name",
                description: "Example Description",
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: "Example User ID",
                visibility: "private",
            };

            mockReq.params = { id: mockTag.id };

            (tagService.getTagById as jest.Mock).mockReturnValue(mockTag);

            // Act
            await tagController.getTagById(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Tag retrieved successfully.",
                status: "success",
                data: mockTag,
            });
        });
    });

    describe("deleteTag", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockId: string = "Mock ID";

            mockReq.params = { id: mockId };

            // Act
            await tagController.deleteTag(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Tag deleted successfully.",
                status: "success",
                data: null,
            });
        });
    });

    describe("createTag", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockTagData: {
                name: string;
                description: string;
                userId: string;
            } = {
                name: "Example Name",
                description: "Example Description",
                userId: "Example User ID",
            };

            const today: Date = new Date();

            const mockTag: Tag = {
                ...mockTagData,
                id: "Example ID",
                createdAt: today,
                updatedAt: today,
                visibility: "private",
            };

            mockReq.body = mockTagData;

            (tagService.createTag as jest.Mock).mockReturnValue(mockTag);

            // Act
            await tagController.createTag(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Tag created successfully.",
                status: "success",
                data: mockTag,
            });
        });
    });

    describe("updateTag", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockTagData: {
                name: string;
                description: string;
                userId: string;
            } = {
                name: "Example Name",
                description: "Example Description",
                userId: "Example User ID",
            };

            const today: Date = new Date();

            const mockTag: Tag = {
                ...mockTagData,
                id: "Example ID",
                updatedAt: today,
                createdAt: today,
                visibility: "private",
            };

            mockReq.body = mockTagData;

            (tagService.updateTag as jest.Mock).mockReturnValue(mockTag);

            // Act
            await tagController.updateTag(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Tag updated successfully.",
                status: "success",
                data: mockTag,
            });
        });
    });
});
