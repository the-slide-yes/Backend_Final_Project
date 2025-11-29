import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { generateSwaggerSpec } from "./swaggerOptions";

/**
 * Sets up the API endpoint which provides the API documentation.
 * @param {Express} app - The express app to setup the endpoint on.
 */
const setupSwagger: (app: Express) => void = (app: Express): void => {
    const specs: object = generateSwaggerSpec();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;
