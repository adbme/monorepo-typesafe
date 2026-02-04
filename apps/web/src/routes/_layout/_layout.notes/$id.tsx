import { createFileRoute, Link } from "@tanstack/react-router";
import { getNote } from "@/hooks/useNotes";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { getReviewStatus } from "@/lib/utils";
import { Timer } from "lucide-react";
import { webEnv } from "@/web";
import notFound from "../../../not-found.svg";

export const Route = createFileRoute("/_layout/_layout/notes/$id")({
  component: NoteDetail,
  loader: async ({ params: { id } }) => {
    return await getNote(id);
  }
});

function NoteDetail() {
  const note = Route.useLoaderData();

console.log("Valeur du contenu :", note);

  if (!note) {
    return (
      <div className="p-8 text-center">
        <p>Note introuvable...</p>
        <Link to="/">
          <Button>Retour</Button>
        </Link>
      </div>
    );
  }

  const status = getReviewStatus(note.nextReview);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-3xl mx-auto p-8 mt-[140px]"
    >
      <Link
        to="/"
        className="flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
      </Link>

      {note.image && (
        <img
           src={
              note.image
                ? `${webEnv.VITE_API_URL}${note.image}`
                : notFound
            }
          alt={note.title}
          className="w-full h-64 object-cover rounded-3xl mb-8 shadow-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = notFound;
          }}
        />
      )}

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">{note.title}</h1>

        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="mr-2 h-4 w-4" />
          {new Date(note.createdAt).toLocaleDateString()}
        </div>

        <div className="flex flex-wrap gap-4 mt-4">
          <div
            className={`flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${status.bg} ${status.color}`}
          >
            <Timer className="mr-2 h-4 w-4" />
            Prochaine révision : {status.label}
          </div>

          <div className="flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary">
            Niveau de maîtrise :{" "}
            {note.repetition > 0 ? `Phase ${note.repetition}` : "Nouveau"}
          </div>
        </div>

        <div className="prose prose-invert max-w-none mt-8">
          <p className="text-xl leading-relaxed text-gray-300">
            {note.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
