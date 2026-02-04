import { useState, useEffect } from "react";
export type NoteType = "flashcard" | "recap";

import { webEnv } from "@/web";

export type Note = {
  id: string;
  type: NoteType;
  title: string;
  content: string;
  image?: string;
  createdAt: number;
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReview: number;
};

const API_URL = webEnv.VITE_API_URL;

console.log("apiurl", API_URL);

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("brain-cache-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  const addNote = (noteData: Partial<Note>) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      type: "flashcard",
      title: "",
      content: "",
      createdAt: Date.now(),
      interval: 0,
      repetition: 0,
      easeFactor: 2.5,
      nextReview: Date.now(),
      ...noteData,
    };

    const updated = [newNote, ...notes];
    saveAndSet(updated);
  };

  const updateNote = (id: string, sm2Data: Partial<Note>) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, ...sm2Data } : n));
    saveAndSet(updated);
  };

  const saveAndSet = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem("brain-cache-notes", JSON.stringify(newNotes));
  };

  return { notes, addNote, updateNote };
}

/* {GET ALL NOTES} */
export const getNotes = async (query?: string, type?: string) => {
  try {
    const response = await fetch(`${API_URL}/notes`);

    const data = await response.json();
    console.log("Données recues: ", data);

    return data.filter((n: any) => {
      const matchQuery = query
        ? n.title.toLowerCase().includes(query.toLowerCase())
        : true;
      const currentNoteType = n.type || "flashcard";
      const matchType = type ? currentNoteType === type : true;
      return matchQuery && matchType;
    });
  } catch (e) {
    console.error("erreur fetch", e);
    throw e;
  }
};

/* {GET NOTE BY ID} */
export const getNote = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`);

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("erreur fetch note", e);
    throw e;
  }
};

/* { SAVE NOTE } */
export const saveNote = async (note: Partial<Note>) => {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error("erreur save note", e);
    throw e;
  }
};
