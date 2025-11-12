import request from "supertest";
import { Request, Response, NextFunction } from "express";
import app from "../src/app";
import * as collectionController from "../src/api/v1/controllers/collectionController";
import { HTTP_STATUS } from "../src/constants/httpConstants";

jest.mock("../src/api/v1/controllers/collectionController", () => ({
    getAllCollections: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    getCollectionById: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    deleteCollection: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    createCollection: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
    updateCollection: jest.fn((_req: Request, res: Response, _next: NextFunction) => res.status(HTTP_STATUS.OK).send()),
}));

// Mock authentication here


// Mock authorizariot here


describe("Collection Routes", ()=>{
    afterEach(()=>{
        jest.clearAllMocks();
    }); 

    describe("GET /api/v1/collections/", () => {
        it("should call the getAllCollections controller", async () => {
            // Act
            await request(app).get("/api/v1/collections/");

            // Assert
            expect(collectionController.getAllCollections).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/collections/:id", () => {
        it("should call the getCollectionById controller", async () => {
            // Act
            await request(app).get("/api/v1/collections/1");

            // Assert
            expect(collectionController.getCollectionById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/collections/:id", () => {
        it("should call the updateCollection controller", async () => {
            // Arrange
            const mockCollection: {
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
                .put("/api/v1/collections/1")
                .send(mockCollection);

            // Assert
            expect(collectionController.updateCollection).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/collections/", () => {
        it("should call the createCollection controller", async () => {
            // Arrange
            const mockCollection: {
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
                .post("/api/v1/collections/")
                .send(mockCollection);

            // Assert
            expect(collectionController.createCollection).toHaveBeenCalled();
        });
    });
});
