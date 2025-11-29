import { HTTP_STATUS } from "../../../constants/httpConstants";
import express, { Request, Response, Router } from "express";
import { HealthCheckResponse } from "../models/healthCheckResponse";
import { successResponse } from "../models/responseModel";

const router: Router = express.Router();

router.get("/", (_req: Request, res: Response): void => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.status(HTTP_STATUS.OK).json(
        successResponse(healthData)
    );
});

export default router;