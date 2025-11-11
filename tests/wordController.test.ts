import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as wordController from "../src/api/v1/controllers/wordController";
import * as wordService from "../src/api/v1/services/wordService";
import { Word } from "../src/api/v1/models/wordModel";

jest.mock("../src/api/v1/services/wordService");

describe("Word Controller", ()=>{
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
    
    describe("getAllWords", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockWords: Word[] = [
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
            (wordService.getAllWords as jest.Mock).mockReturnValue(mockWords);

            // Act
            await wordController.getAllWords(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Words retrieved successfully",
                status: "success",
                data: mockWords,
            });
        });
    });

    describe("getWordById", () => {
        it("should handle successful operation", async () => {
            // Arrange
            const mockWord: Word = {
                    id: "Example ID",
                    name: "Example Name",
                    description: "Example Description",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    userId: "Example User ID",
                    visibility: "private",
                };
            (wordService.getWordById as jest.Mock).mockReturnValue(mockWord);

            // Act
            await wordController.getWordById(
                mockReq as Request,
                mockRes as Response,
                mockNext,
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Words retrieved successfully",
                status: "success",
                data: mockWord,
            });
        });
    });
});
