import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import * as tagController from "../src/api/v1/controllers/tagController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/controllers/tagController", () => ({
    getAllTags: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    getTagById: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    deleteTag: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    createTag: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    updateTag: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
}));

// Mock authentication here


// Mock authorizariot here


describe("Tag Routes", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    }); 

    describe("GET /api/v1/tags/", () => {
        it("should call the getAllTags controller", async () => {
            // Act
            await request(app).get("/api/v1/tags/");

            // Assert
            expect(tagController.getAllTags).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/tags/:id", () => {
        it("should call the getTagById controller", async () => {
            // Act
            await request(app).get("/api/v1/tags/1");

            // Assert
            expect(tagController.getTagById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/tags/:id", () => {
        it("should call the updateTag controller", async () => {
            // Arrange
            const mockTag: {
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
                .put("/api/v1/tags/1")
                .send(mockTag);

            // Assert
            expect(tagController.updateTag).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/tags/", () => {
        it("should call the createTag controller", async () => {
            // Arrange
            const mockTag: {
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
                .post("/api/v1/tags/")
                .send(mockTag);

            // Assert
            expect(tagController.createTag).toHaveBeenCalled();
        });
    });
});
