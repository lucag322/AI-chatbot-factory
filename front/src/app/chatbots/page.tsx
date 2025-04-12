import { PrismaClient } from "@prisma/client";
import ChatbotList from "@/components/ChatbotList";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

const prisma = new PrismaClient();

export const revalidate = 0;

export default async function ChatbotsPage() {
  const chatbots = await prisma.chatbot.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mes Chatbots</h1>
        <Link
          href="/chatbots/new"
          className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded transition-colors flex items-center gap-2"
        >
          Créer un chatbot
          <CirclePlus strokeWidth={1} />
        </Link>
      </div>
      <ChatbotList chatbots={chatbots} />
    </div>
  );
}
