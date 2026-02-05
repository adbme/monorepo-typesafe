import { useState, useEffect } from "react";
export type NoteType = "flashcard" | "recap";
import { treaty } from "@elysiajs/eden";
import type { App } from "../../../server/src/index";

import { webEnv } from "@/web";

export type Note = {
  id: number;
  type: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReview: string;
};

const API_URL = webEnv.VITE_API_URL;

console.log("apiurl", API_URL);

const client = treaty<App>(API_URL);

export const getNotesElysia = async (query?: string, type?: string) => {
  const { data, error } = await client.notes.get();

  if (error) {
    console.error("Erreur Elysia:", error);
    throw error;
  }

  const allNotes = data || [];


  return allNotes.filter((n) => {
    const matchQuery = query
      ? n.title.toLowerCase().includes(query.toLowerCase())
      : true;

    const isAll = !type || type.toLowerCase() === "tout";
    
    const normalizedTargetType = type?.toLowerCase().replace(/s$/, ""); 
    const noteType = (n.type || "flashcard").toLowerCase();

    const matchType = isAll ? true : noteType === normalizedTargetType;

    return matchQuery && matchType;
  });

};

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("brain-cache-notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);
  const addNote = (noteData: Note) => {
    const updated = [noteData, ...notes];
    saveAndSet(updated);
  };

  const updateNote = (id: number, sm2Data: Partial<Note>) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, ...sm2Data } : n));
    saveAndSet(updated);
  };

  const saveAndSet = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem("brain-cache-notes", JSON.stringify(newNotes));
  };

  return { notes, addNote, updateNote, setNotes };
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
export const getNote = async (id: number) => {
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
export const saveNote = async (formData: FormData) => {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
    return await response.json();
  } catch (e) {
    console.error("erreur save note", e);
    throw e;
  }
};

/* { UPDATE NOTE API } */
export const updateNoteAPI = async (id: number, data: any) => {
  const response = await fetch(`${API_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
};
