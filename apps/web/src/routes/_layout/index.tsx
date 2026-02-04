import { createFileRoute, defer } from "@tanstack/react-router";
import HeroSection from "@/components/recal/hero-section";
import Notes from "@/components/recal/notes";
import { NotesSkeleton } from "@/components/recal/notes-skeleton"; // Import ici
import { getNotes } from "@/hooks/useNotes";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";

type NoteFilters = {
  query?: string;
  type?: string;
};

export const Route = createFileRoute("/_layout/")({
  component: App,
  validateSearch: (search: Record<string, unknown>): NoteFilters => {
    return {
      query: (search.query as string) || undefined,
      type: (search.type as string) || undefined,
    };
  },

  loaderDeps: ({ search: { query, type } }) => ({ query, type }),

  loader: ({ deps: { query, type } }) => {
    const notesPromise = getNotes(query, type);
    return {
      notesPromise: defer(notesPromise),
    };
  },
});

function App() {
  const { notesPromise } = Route.useLoaderData();
  const { query, type } = Route.useSearch();

  const navigate = Route.useNavigate();
  const handleTypeChange = (newType: string | undefined) => {
    navigate({
      search: (prev) => ({
        ...prev,
        type: newType,
      }),
    });
  };

  return (
    <div className="h-screen flex max-w-[1400px] flex-col mx-auto pt-[140px]">
      <HeroSection />
      <div className="px-8 my-4 flex items-center justify-between gap-4">
        <input
          className="border p-2 rounded w-full bg-card"
          placeholder="Filtrer les notes..."
          value={query || ""}
          onChange={(e) => {
            navigate({
              search: (prev) => ({
                ...prev,
                query: e.target.value || undefined,
              }),
            });
          }}
        />
        <div className="flex gap-2">
          <Button
            variant={!type ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange(undefined)}
          >
            Tout
          </Button>
          <Button
            variant={type === "flashcard" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("flashcard")}
            className="flex gap-2 items-center"
          >
            Flashcards
          </Button>
          <Button
            variant={type === "recap" ? "default" : "outline"}
            size="sm"
            onClick={() => handleTypeChange("recap")}
            className="flex gap-2 items-center"
          >
            Récaps
          </Button>
        </div>
      </div>

      <Suspense fallback={<NotesSkeleton />}>
        <Notes promise={notesPromise} />
      </Suspense>
    </div>
  );
}
