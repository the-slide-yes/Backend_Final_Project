import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

// setup environment variables
dotenv.config();

// initialize the app
const app: Express = express();

// IMPORTANT
app.use(express.json());

// Funny endpoint
app.get("/", (_req: Request, res: Response): void => {
    res.send("[Placeholder, will put something funny later]");
});

// Routers here

// Error handler here

// Export app
export default app;