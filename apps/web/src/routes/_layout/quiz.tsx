import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { updateNoteAPI, useNotes, type Note } from "@/hooks/useNotes";
import { calculateSM2 } from "@/lib/sm2";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { saveNote } from "@/hooks/useNotes";

export const Route = createFileRoute("/_layout/quiz")({
  component: QuizComponent,
});

function QuizComponent() {
  const { notes, updateNote, addNote } = useNotes();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [recapInput, setRecapInput] = useState("");

  const sessionNotes = useMemo(() => {
    const due = notes.filter(
      (note) =>
        (note.type === "flashcard" || !note.type) &&
        note.nextReview <= Date.now(),
    );

    const alreadyDoneToday = notes.some(
      (n) =>
        n.type === "recap" &&
        new Date(n.createdAt).toDateString() === new Date().toDateString(),
    );

    const mixed = [...due];

    if (!alreadyDoneToday) {
      const dailyRecap: Note = {
        id: "virtual-recap",
        type: "recap",
        title: "Récapitulatif de la journée",
        content: "",
        createdAt: Date.now(),
        interval: 0,
        repetition: 0,
        easeFactor: 2.5,
        nextReview: 0,
      };
      const randomIndex = Math.floor(Math.random() * (due.length + 1));
      mixed.splice(randomIndex, 0, dailyRecap);
    }

    return mixed;
  }, [notes]);

  const currentNote = sessionNotes[currentIndex] || null;

  const handleFinishRecap = async () => {
    const formData = new FormData();
    formData.append("type", "recap");
    formData.append(
      "title",
      "Récapitulatif du " + new Date().toLocaleDateString(),
    );
    formData.append("content", recapInput);

    try {
      const newNote = await saveNote(formData);

      addNote(newNote);

      setCurrentIndex((prev) => prev + 1);
      setRecapInput("");
    } catch (err) {
      alert("Erreur lors de la sauvegarde du récap");
    }
  };

const handleRate = async (quality: number) => {
  const result = calculateSM2(
    quality,
    currentNote.repetition,
    currentNote.interval,
    currentNote.easeFactor,
  );

  await updateNoteAPI(currentNote.id, result);
  
  // Met à jour l'ui
  updateNote(currentNote.id, result);
  
  setShowAnswer(false);
  setCurrentIndex((prev) => prev + 1);
};

  if (sessionNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center p-6">
        <div className="bg-primary/10 p-6 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-3xl font-bold">Cerveau à jour !</h1>
        <p className="text-muted-foreground mt-2">
          Revenez plus tard pour de nouvelles révisions.
        </p>
      </div>
    );
  }

  if (!currentNote) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center p-6">
        <h1 className="text-3xl font-bold">Session terminée ! 🚀</h1>
        <p className="mt-2 text-muted-foreground">
          Bravo, vous avez tout fini.
        </p>
        <Button onClick={() => (window.location.href = "/")} className="mt-6">
          Retour au dashboard
        </Button>
      </div>
    );
  }

  // }

  return (
    <div className="max-w-2xl mx-auto mt-[140px] px-4">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-medium text-muted-foreground">
          Carte {currentIndex + 1} sur {sessionNotes.length}
        </span>
        <div className="h-2 w-48 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${(currentIndex / sessionNotes.length) * 100}%` }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={(currentNote?.id || "end") + showAnswer}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <Card className="min-h-[300px] flex flex-col justify-center items-center p-8 text-center shadow-xl">
            {currentNote.type === "recap" ? (
              <div className="w-full space-y-4">
                <h2 className="text-2xl font-bold">{currentNote.title}</h2>
                <textarea
                  className="w-full p-4 bg-secondary rounded-lg border-none focus:ring-2 ring-primary min-h-[150px] text-white"
                  placeholder="Aujourd'hui, j'ai..."
                  value={recapInput}
                  onChange={(e) => setRecapInput(e.target.value)}
                />
                <Button
                  onClick={handleFinishRecap}
                  disabled={recapInput.length < 10}
                  className="w-full"
                >
                  Valider le récap
                </Button>
              </div>
            ) : !showAnswer ? (
              <>
                <h2 className="text-3xl font-bold mb-6">{currentNote.title}</h2>
                <Button
                  onClick={() => setShowAnswer(true)}
                  size="lg"
                  className="rounded-full px-8"
                >
                  Voir la réponse
                </Button>
              </>
            ) : (
              <div className="w-full">
                <p className="text-xl text-gray-300 mb-8">
                  {currentNote.content}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant="destructive" onClick={() => handleRate(1)}>
                    Oublié (0)
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-500 text-orange-500"
                    onClick={() => handleRate(2)}
                  >
                    Dur (2)
                  </Button>
                  <Button variant="secondary" onClick={() => handleRate(3)}>
                    Ok (3)
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleRate(5)}
                  >
                    Facile (5)
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
