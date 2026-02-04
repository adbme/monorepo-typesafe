import { Link } from "@tanstack/react-router";
import { type Note as NoteType } from "@/hooks/useNotes";
import { getReviewStatus } from "@/lib/utils";
import { webEnv } from "@/web";
  import notFound from "../../not-found.svg";


const Note = ({ note }: { note: NoteType }) => {
  const status = getReviewStatus(note.nextReview);
  return (
    <Link
      to="/notes/$id"
      params={{ id: note.id }}
      className="block transition-transform hover:scale-[1.02]"
    >
      <div className="border rounded p-4 shadow-sm bg-card h-full relative">
        <div
          className={`absolute top-[-10px] right-[-10px] z-50 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${status.bg} ${status.color}`}
        >
          {status.label}
        </div>
        {note.image && (
          <img
            src={
              note.image
                ? `${webEnv.VITE_API_URL}${note.image}`
                : notFound
            }
            alt={note.title}
            className="mb-4 rounded h-32 w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src =
                notFound;
            }}
          />
        )}
        <h2 className="text-lg font-bold truncate pr-16">{note.title}</h2>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {note.content}
        </p>
      </div>
    </Link>
  );
};

export default Note;
