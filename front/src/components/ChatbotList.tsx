import Link from "next/link";
import { Chatbot } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChatbotListProps {
  chatbots: Chatbot[];
}

export default function ChatbotList({ chatbots }: ChatbotListProps) {
  if (chatbots.length === 0) {
    return (
      <Card className="text-center p-6 rounded-md">
        <CardContent className="pt-6">
          <p className="text-xl mb-4">
            Vous n&apos;avez pas encore créé de chatbot.
          </p>
          <Link
            href="/chatbots/new"
            className="bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md transition-colors"
          >
            Créer votre premier chatbot
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chatbots.map((chatbot) => (
        <Link
          href={`/chatbots/${chatbot.id}`}
          key={chatbot.id}
          className="block"
        >
          <Card className="overflow-hidden rounded-md hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>{chatbot.name}</CardTitle>
              <CardDescription className="text-card-foreground">
                {chatbot.description || "Aucune description"}
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end items-center pt-4">
              <span className="text-sm text-card-foreground">
                Créé le {new Date(chatbot.createdAt).toLocaleDateString()}
              </span>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
