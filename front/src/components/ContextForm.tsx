"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ContextFormProps {
  chatbotId: string;
  initialData?: {
    id?: string;
    title: string;
    content: string;
  };
}

export default function ContextForm({
  chatbotId,
  initialData,
}: ContextFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!initialData?.id;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const url = isEditing
        ? `/api/chatbots/${chatbotId}/contexts/${initialData.id}`
        : `/api/chatbots/${chatbotId}/contexts`;

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la sauvegarde");
      }

      router.push(`/chatbots/${chatbotId}`);
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
          htmlFor="title"
          className="block text-sm font-medium text-foreground"
        >
          Titre du contexte
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-foreground"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-foreground"
        >
          Contenu
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-foreground"
          placeholder="Ajoutez ici le contenu qui servira de contexte à votre chatbot..."
        />
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} variant="default">
          {isSubmitting
            ? "Sauvegarde en cours..."
            : isEditing
            ? "Mettre à jour"
            : "Ajouter"}
        </Button>
      </div>
    </form>
  );
}
