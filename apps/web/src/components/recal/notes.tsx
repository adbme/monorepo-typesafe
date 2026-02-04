import { use } from "react";
import { motion } from "framer-motion";
import { type Note as NoteType } from "@/hooks/useNotes";
import Note from "./note";

const Notes = ({ promise }: { promise: Promise<NoteType[]> }) => {
  const notes = use(promise);
  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {notes.length === 0 && (  
      <div className="flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-semibold mb-4">Aucune note trouvée</h2>
        <p className="text-muted-foreground">
          Vous n'avez pas encore créé de notes. Commencez par en ajouter une !
        </p>
      </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {notes.map((note) => {
          return <Note note={note} />;
        })}
      </motion.div>
    </div>
  );
};

export default Notes;
