import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ImagePlus, Save } from "lucide-react";
import { webEnv } from "@/web";

export const Route = createFileRoute("/_layout/_layout/notes/create")({
  component: CreateNote,
});

function CreateNote() {
  const navigate = useNavigate();
  // On stocke le File pour l'envoi et une string preview pour l'affichage
  const [form, setForm] = useState({ title: "", content: "", slug: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // On garde le fichier pour l'API
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Pour l'affichage <img />
      };
      reader.readAsDataURL(file);
    }
  };

const save = async () => {
  if (!form.title.trim() || !form.content.trim()) {
    return alert("Titre et contenu requis !");
  }

  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("content", form.content);
  formData.append("type", "flashcard"); // On ajoute le type requis par ton backend
  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const response = await fetch(`${webEnv.VITE_API_URL}/notes`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      navigate({ to: "/" });
    } else {
      const err = await response.json();
      alert(err.error || "Erreur sauvegarde");
    }
  } catch (error) {
    console.error("Erreur réseau:", error);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-[140px] p-8 max-w-md mx-auto space-y-6"
    >
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Nouvelle Note</h1>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Titre"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <Textarea
          placeholder="Contenu"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
            id="img-up"
          />
          <label htmlFor="img-up" className="border-2 border-dashed rounded-xl p-6 cursor-pointer block">
            {preview ? (
              <img src={preview} alt="Preview" className="w-20 h-20 object-cover mx-auto rounded-lg" />
            ) : (
              <div className="flex flex-col items-center">
                <ImagePlus className="w-8 h-8 mb-2" />
                <p>Ajouter une image</p>
              </div>
            )}
          </label>
        </div>
      </div>

      <Button onClick={save} className="w-full">
        <Save className="mr-2" /> Sauvegarder
      </Button>
    </motion.div>
  );
}