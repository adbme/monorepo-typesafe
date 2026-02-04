import * as v from "valibot";

export const insertPostSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(5, "Le titre doit faire au moins 5 caractères"),
    v.maxLength(100),
  ),
  content: v.pipe(v.string(), v.minLength(10, "Le contenu est trop court")),
  slug: v.pipe(
    v.string(),
    v.regex(
      /^[a-z0-9-]+$/,
      "Le slug doit être au format url-safe (minuscules, chiffres, tirets)",
    ),
  ),
});
