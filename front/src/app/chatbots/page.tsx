import { PrismaClient } from "@prisma/client";
import ChatbotList from "@/components/ChatbotList";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();

export const revalidate = 0;

export default async function ChatbotsPage() {
  const chatbots = await prisma.chatbot.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto overflow-x-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-8">
        {/* En-tête - Titre */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-5 flex items-center px-0.5 md:px-2 lg:px-3">
          <h1 className="text-3xl font-bold">Mes Chatbots</h1>
        </div>

        {/* En-tête - Bouton d'ajout (une colonne tout à droite) */}
        <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex items-center justify-end px-0.5 md:px-2 lg:px-3">
          <Button asChild className="w-full" variant="default">
            <Link href="/chatbots/new">
              <span className="hidden md:inline">Créer un chatbot</span>
              <span className="md:hidden">Créer</span>
              <CirclePlus strokeWidth={1} />
            </Link>
          </Button>
        </div>

        {/* Espace supplémentaire entre le titre et les cartes */}
        <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 h-8"></div>

        {/* Liste des chatbots */}
        <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6">
          <ChatbotList chatbots={chatbots || []} />
        </div>
      </div>
    </div>
  );
}
