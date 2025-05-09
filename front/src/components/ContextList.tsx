"use client";

import Link from "next/link";
import DateDisplay from "./DateDisplay";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface Context {
  id: string;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  chatbotId: string;
}

interface ContextListProps {
  contexts?: Context[]; // Rendre cette prop optionnelle
  chatbotId: string;
}

export default function ContextList({
  contexts = [],
  chatbotId,
}: ContextListProps) {
  const handleDelete = async (contextId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contexte ?")) {
      await fetch(`/api/chatbots/${chatbotId}/contexts/${contextId}`, {
        method: "DELETE",
      });
      window.location.reload();
    }
  };

  // Vérifier si contexts est vide
  if (!contexts || contexts.length === 0) {
    return (
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
        <p className="text-center text-gray-500">
          Aucun contexte ajouté pour ce chatbot.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contexts.map((context) => (
        <div
          key={context.id}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <h3 className="text-lg text-foreground font-medium mb-2">
              {context.title}
            </h3>
            <p className="text-foreground mb-3 truncate">
              {typeof context.content === "string"
                ? context.content.substring(0, 100) + "..."
                : ""}
            </p>
            <div className="flex justify-between items-center">
              <div className="space-x-2 flex items-center">
                <Button asChild variant="default" size="sm">
                  <Link
                    href={`/chatbots/${chatbotId}/contexts/${context.id}/edit`}
                  >
                    Modifier
                  </Link>
                </Button>
                <Button
                  onClick={() => handleDelete(context.id)}
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Supprimer
                </Button>
              </div>
              <span className="text-sm text-foreground">
                <DateDisplay date={context.createdAt} />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
