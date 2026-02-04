import * as v from "valibot";

const webSchema = v.object({
  VITE_API_URL: v.pipe(v.string(), v.url()),
});

export const webEnv = v.parse(webSchema, {
  VITE_API_URL: import.meta.env.VITE_API_URL,
});
