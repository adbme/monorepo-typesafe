import * as v from "valibot";
import dotenv from "dotenv";
import { join } from "node:path";

dotenv.config({ path: join(import.meta.dir, "../../../.env") });

const serverSchema = v.object({
  DATABASE_URL: v.string(),
  PORT: v.optional(v.string()),
  CORS_ORIGIN: v.optional(v.string(), "http://localhost:5173"),
});

export const serverEnv = v.parse(serverSchema, process.env);