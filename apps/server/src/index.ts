import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { serverEnv } from "@monorepo-typesafe/env/server";
import { db, notes } from "@monorepo-typesafe/db";
import { uploadFile } from "../utils/files";
import { eq } from "drizzle-orm";
import { mkdir } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import slugify from "slugify";

await mkdir(serverEnv.UPLOAD_DIR, { recursive: true }).catch(() => {});

const app = new Elysia()
  .use(cors({ origin: serverEnv.CORS_ORIGIN }))
  .use(
    staticPlugin({
      assets: serverEnv.UPLOAD_DIR,
      prefix: serverEnv.UPLOAD_PREFIX,
    }),
  )

  .get("/", () => ({ status: "online", message: "API Notes Ready" }))

  // GET NOTES
  .get("/notes", async ({ query }) => {
    if (query.type && query.type !== "Tout") {
      return await db.select().from(notes).where(eq(notes.type, query.type));
    }
    return await db.select().from(notes);
  })

  // READ ONE
  .get("/notes/:id", async ({ params: { id }, set }) => {
    const [note] = await db
      .select()
      .from(notes)
      .where(eq(notes.id, Number(id)));
    if (!note) {
      set.status = 404;
      return { error: "Note not found" };
    }
    return note;
  })

  // CREATE ONE
  .post(
    "/notes",
    async ({ body }) => {
      const imageUrl = body.image ? await uploadFile(body.image) : null;

      const generatedSlug = slugify(body.title, {
        lower: true,
        strict: true,
        trim: true,
      });

      const [newNote] = await db
        .insert(notes)
        .values({
          type: body.type,
          title: body.title,
          slug: body.slug ?? generatedSlug,
          content: body.content,
          image: imageUrl,
          nextReview: new Date(),
        })
        .returning();

      return newNote;
    },
    {
      body: t.Object({
        type: t.String(),
        title: t.String(),
        slug: t.Optional(t.String()),
        content: t.String(),
        image: t.Optional(t.File()),
      }),
    },
  )

  // UPDATE SM2 (PUT)
  .put(
    "/notes/:id",
    async ({ params: { id }, body, set }) => {
      const [updatedNote] = await db
        .update(notes)
        .set({
          interval: body.interval,
          repetition: body.repetition,
          easeFactor: body.easeFactor,
          nextReview: new Date(body.nextReview),
        })
        .where(eq(notes.id, Number(id)))
        .returning();

      if (!updatedNote) {
        set.status = 404;
        return { error: "Note not found" };
      }

      return updatedNote;
    },
    {
      body: t.Object({
        interval: t.Number(),
        repetition: t.Number(),
        easeFactor: t.Number(),
        nextReview: t.Any(),
      }),
    },
  )

  // DELETE
  .delete("/notes/:id", async ({ params: { id }, set }) => {
    const [deleted] = await db
      .delete(notes)
      .where(eq(notes.id, Number(id)))
      .returning();

    if (!deleted) {
      set.status = 404;
      return { error: "Note not found" };
    }
    return { message: "Note deleted", deleted };
  })
  .listen(serverEnv.PORT || 3000);

export type App = typeof app;

console.log(`🚀 Serveur Notes lancé sur http://localhost:${app.server?.port}`);