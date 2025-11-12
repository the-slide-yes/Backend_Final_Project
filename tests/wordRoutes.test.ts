import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import * as wordController from "../src/api/v1/controllers/wordController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/controllers/wordController", () => ({
    getAllWords: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    getWordById: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    deleteWord: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    createWord: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    updateWord: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
}));

// Mock authentication here


// Mock authorizariot here


describe("Word Routes", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    }); 

    describe("GET /api/v1/words/", () => {
        it("should call the getAllWords controller", async () => {
            // Act
            await request(app).get("/api/v1/words/");

            // Assert
            expect(wordController.getAllWords).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/words/:id", () => {
        it("should call the getWordById controller", async () => {
            // Act
            await request(app).get("/api/v1/words/1");

            // Assert
            expect(wordController.getWordById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/words/:id", () => {
        it("should call the updateWord controller", async () => {
            // Arrange
            const mockWord: {
                name: string;
                description: string;
                userId: string;
            } = {
                name: "Example Name",
                description: "Very Descriptive Description",
                userId: "Example User ID",
            };

            // Act
            await request(app)
                .put("/api/v1/words/1")
                .send(mockWord);

            // Assert
            expect(wordController.updateWord).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/words/", () => {
        it("should call the createWord controller", async () => {
            // Arrange
            const mockWord: {
                name: string;
                description: string;
                userId: string;
            } = {
                name: "Example Name",
                description: "Example Description",
                userId: "Example User ID",
            };

            // Act
            await request(app)
                .post("/api/v1/words/")
                .send(mockWord);

            // Assert
            expect(wordController.createWord).toHaveBeenCalled();
        });
    });
});
