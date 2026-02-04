import { Link } from "@tanstack/react-router";
import { type Note as NoteType } from "@/hooks/useNotes";
import { getReviewStatus } from "@/lib/utils";

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
            src={note.image}
            alt=""
            className="mb-4 rounded h-32 w-full object-cover"
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
