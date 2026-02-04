import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { serverEnv } from "@monorepo-typesafe/env/server";
import { db, posts } from "@monorepo-typesafe/db";
import { uploadFile } from "../utils/files";

const app = new Elysia()
  .use(cors({ origin: serverEnv.CORS_ORIGIN }))
  .use(
    staticPlugin({
      assets: "uploads",
      prefix: "/uploads",
    }),
  )
  .get("/", () => "api monorepo-typesafe fonctionne")

  .get("/posts", async () => {
    return await db.select().from(posts);
  })

  .post(
    "/posts",
    async ({ body }) => {
      const imageUrl = await uploadFile(body.image);

      const [newPost] = await db
        .insert(posts)
        .values({
          title: body.title,
          content: body.content,
          slug: body.slug,
          image: imageUrl,
        })
        .returning();

      return newPost;
    },
    {
      body: t.Object({
        title: t.String(),
        content: t.String(),
        slug: t.String(),
        image: t.File(),
      }),
    },
  )
  .listen(serverEnv.PORT || 3000);

console.log(`🚀 Serveur lancé sur http://localhost:${app.server?.port}`);

export type App = typeof app;