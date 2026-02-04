import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  doublePrecision,
  serial,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import * as v from "valibot";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 50 }).notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  interval: integer("interval").default(0).notNull(),
  repetition: integer("repetition").default(0).notNull(),
  easeFactor: doublePrecision("ease_factor").default(2.5).notNull(),
  nextReview: timestamp("next_review").notNull(),
});

// Schémas de validation
export const noteSelectSchema = createSelectSchema(notes);
export const noteInsertSchema = createInsertSchema(notes, {
  id: v.optional(v.string()),
  content: (schema) => v.pipe(schema, v.minLength(1), v.maxLength(10000)),
  // Note: On valide l'image comme une String ici car en DB c'est le CHEMIN (path)
  // La validation du FICHIER (binary) se fait côté serveur
  image: v.optional(v.string()),
});

export type NoteSelect = v.InferOutput<typeof noteSelectSchema>;
export type NoteInsert = v.InferInput<typeof noteInsertSchema>;
