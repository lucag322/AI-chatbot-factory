/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChatbotForm from "@/components/ChatbotForm";
import ContextList from "@/components/ContextList";
import CopyButton from "@/components/CopyButton";
import DeleteChatbotButton from "@/components/DeleteChatbotButton";
import { Button } from "@/components/ui/button";
import ChatbotPreview from "@/components/ChatbotPreview";

const prisma = new PrismaClient();
const prismaAny = prisma as any;

interface ChatbotWithCustomization {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  apiKey: string;
  color?: string;
  windowWidth?: number;
  windowHeight?: number;
  userMessageBgColor?: string;
  userMessageTextColor?: string;
  userMessageBorderColor?: string;
  showUserMessageBorder?: boolean;
  botMessageBgColor?: string;
  botMessageTextColor?: string;
  botMessageBorderColor?: string;
  showBotMessageBorder?: boolean;
}

export default async function ChatbotPage({
  params,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const chatbot = (await prisma.chatbot.findUnique({
    where: { id },
  })) as ChatbotWithCustomization;

  if (!chatbot) {
    notFound();
  }

  const contexts = await prismaAny.context.findMany({
    where: { chatbotId: id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/chatbots" className="text-white hover:text-gray-400">
          ← Retour aux chatbots
        </Link>
        <DeleteChatbotButton id={chatbot.id} />
      </div>

      <div className="lg:grid lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-6">
          <div className="bg-card backdrop-blur-md shadow-md rounded-lg p-6 border border-gray-300 h-full">
            <h1 className="text-3xl font-bold mb-4 text-foreground">
              {chatbot.name}
            </h1>
            <p className="text-foreground mb-6">{chatbot.description}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span className="text-foreground">
                Créé le {new Date(chatbot.createdAt).toLocaleDateString()}
              </span>
              <span className="text-foreground">
                Mis à jour le {new Date(chatbot.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="bg-card backdrop-blur-md shadow-md rounded-lg p-6 border border-gray-300 h-full">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Modifier le chatbot
            </h2>
            <ChatbotForm
              initialData={{
                id: chatbot.id, // Obligatoire pour le mode édition
                name: chatbot.name, // Obligatoire
                description: chatbot.description || "",
                color: chatbot.color,
                windowWidth: chatbot.windowWidth,
                windowHeight: chatbot.windowHeight,
                userMessageBgColor: chatbot.userMessageBgColor,
                userMessageTextColor: chatbot.userMessageTextColor,
                userMessageBorderColor: chatbot.userMessageBorderColor,
                showUserMessageBorder: chatbot.showUserMessageBorder,
                botMessageBgColor: chatbot.botMessageBgColor,
                botMessageTextColor: chatbot.botMessageTextColor,
                botMessageBorderColor: chatbot.botMessageBorderColor,
                showBotMessageBorder: chatbot.showBotMessageBorder,
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-card backdrop-blur-md shadow-md rounded-lg p-6 border border-gray-300 h-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-foreground">Contextes</h2>
              <Button asChild variant="default">
                <Link href={`/chatbots/${chatbot.id}/contexts/new`}>
                  Ajouter du contexte
                </Link>
              </Button>
            </div>
            <div className="mb-4">
              <p className="text-foreground">
                Ajoutez du contenu pour entraîner votre chatbot. Plus vous
                ajoutez de contexte, plus votre chatbot sera intelligent.
              </p>
            </div>

            <ContextList contexts={contexts} chatbotId={chatbot.id} />
          </div>

          <div className="bg-card backdrop-blur-md shadow-md rounded-lg p-6 border border-gray-300 h-full">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Script d&apos;intégration
            </h2>
            <p className="text-foreground mb-4">
              Utilisez ce script pour intégrer votre chatbot sur votre site web.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm text-black">
                {`<script src="${
                  process.env.NEXT_PUBLIC_API_URL || ""
                }/api/chatbots/script?id=${chatbot.id}"></script>`}
              </pre>
            </div>
            <CopyButton
              scriptContent={`<script src="${
                process.env.NEXT_PUBLIC_API_URL || ""
              }/api/chatbots/script?id=${chatbot.id}"></script>`}
            />
          </div>
          <div className="bg-card backdrop-blur-md shadow-md rounded-lg p-6 border border-gray-300 h-full">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Tester le chatbot
            </h2>
            <p className="text-foreground">
              Vous pouvez tester votre chatbot directement ici avant de
              l&apos;intégrer sur votre site.
            </p>
            <ChatbotPreview chatbotId={chatbot.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
