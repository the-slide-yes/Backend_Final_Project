import fs from "fs";
import dotenv from "dotenv";
import { Options } from "swagger-jsdoc";

dotenv.config();

import { generateSwaggerSpec } from "../config/swaggerOptions";

const specs: Options = generateSwaggerSpec();

fs.writeFileSync("./openapi.json", JSON.stringify(specs, null, 2));

console.log("OpenAPI specification generated successfully.");
