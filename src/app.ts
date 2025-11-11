import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// setup environment variables
dotenv.config();

// internal imports
import healthCheckRoutes from "./api/v1/routes/healthCheckRoutes";
import wordRoutes from "./api/v1/routes/wordRoutes";

// initialize the app
const app: Express = express();

// IMPORTANT
app.use(express.json());

// Funny endpoint
app.get("/", (_req: Request, res: Response): void => {
    res.send("[Placeholder, will put something funny later]");
});

// Routers here
app.use("/api/v1/health", healthCheckRoutes);
app.use("/api/v1/words", wordRoutes);

// Error handler here

// Export app
export default app;
