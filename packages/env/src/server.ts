import * as v from "valibot";
import dotenv from "dotenv";
import { join } from "node:path";

dotenv.config({ path: join(import.meta.dir, "../../../.env") });

const serverSchema = v.object({
  DATABASE_URL: v.string("DATABASE_URL manquante"),
  PORT: v.string("PORT manquant"),
  CORS_ORIGIN: v.string("CORS_ORIGIN manquant"),
  UPLOAD_DIR: v.string("UPLOAD_DIR manquante"),
  UPLOAD_PREFIX: v.string("UPLOAD_PREFIX manquant"),
});

export const serverEnv = v.parse(serverSchema, process.env);
