"use client";

import Link from "next/link";
import DateDisplay from "./DateDisplay";

// Définir manuellement le type Context pour éviter les erreurs
interface Context {
  id: string;
  title: string;
  content: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  chatbotId: string;
}

interface ContextListProps {
  contexts: Context[];
  chatbotId: string;
}

export default function ContextList({ contexts, chatbotId }: ContextListProps) {
  // Le reste du code reste identique...

  // Cette fonction peut maintenant être utilisée comme gestionnaire d'événement
  const handleDelete = async (contextId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contexte ?")) {
      await fetch(`/api/chatbots/${chatbotId}/contexts/${contextId}`, {
        method: "DELETE",
      });
      window.location.reload();
    }
  };

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
              <div className="space-x-2">
                <Link
                  href={`/chatbots/${chatbotId}/contexts/${context.id}/edit`}
                  className="text-white hover:text-gray-400"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(context.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Supprimer
                </button>
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
