import swaggerJsdoc, { Options } from "swagger-jsdoc";

const serverUrl: string =
    process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Word Collection API Documentation",
            version: "1.0.0",
            description: "This is the API documentation for the Word Collection application.",
        },
        servers: [
            {
                url: serverUrl,
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validation/*.ts"],
};

export const generateSwaggerSpec: () => Options = (): Options => {
    return swaggerJsdoc(swaggerOptions);
};
