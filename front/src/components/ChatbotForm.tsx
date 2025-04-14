"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ChatbotFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    color?: string;
    windowWidth?: number;
    windowHeight?: number;
  };
}

export default function ChatbotForm({ initialData }: ChatbotFormProps = {}) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [color, setColor] = useState(initialData?.color || "#3b82f6");
  const [windowWidth, setWindowWidth] = useState(
    initialData?.windowWidth || 380
  );
  const [windowHeight, setWindowHeight] = useState(
    initialData?.windowHeight || 600
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!initialData?.id;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const url = isEditing
        ? `/api/chatbots/${initialData.id}`
        : "/api/chatbots";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          color,
          windowWidth,
          windowHeight,
        }),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la sauvegarde");
      }

      const data = await response.json();
      router.push(`/chatbots/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground"
        >
          Nom du chatbot
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-foreground"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-foreground"
        />
      </div>

      <div>
        <label
          htmlFor="color"
          className="block text-sm font-medium text-foreground"
        >
          Couleur du chatbot
        </label>
        <div className="flex items-center gap-4 mt-1">
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 w-10 border border-gray-300 rounded"
          />
          <span className="text-sm">{color}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="windowWidth"
            className="block text-sm font-medium text-foreground"
          >
            Largeur (px)
          </label>
          <input
            type="number"
            id="windowWidth"
            value={windowWidth}
            onChange={(e) => setWindowWidth(parseInt(e.target.value))}
            min="300"
            max="600"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-foreground"
          />
        </div>

        <div>
          <label
            htmlFor="windowHeight"
            className="block text-sm font-medium text-foreground"
          >
            Hauteur (px)
          </label>
          <input
            type="number"
            id="windowHeight"
            value={windowHeight}
            onChange={(e) => setWindowHeight(parseInt(e.target.value))}
            min="400"
            max="800"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-foreground"
          />
        </div>
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} variant="default">
          {isSubmitting
            ? "Sauvegarde en cours..."
            : isEditing
            ? "Mettre à jour"
            : "Créer"}
        </Button>
      </div>
    </form>
  );
}
