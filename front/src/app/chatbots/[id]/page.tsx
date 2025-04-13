/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChatbotForm from "@/components/ChatbotForm";
import ContextList from "@/components/ContextList";
import CopyButton from "@/components/CopyButton";
import DeleteChatbotButton from "@/components/DeleteChatbotButton";
import { Button } from "@/components/ui/button";

const prisma = new PrismaClient();
const prismaAny = prisma as any;

export default async function ChatbotPage({
  params,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Résoudre la promesse des paramètres
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const chatbot = await prisma.chatbot.findUnique({
    where: { id },
  });

  if (!chatbot) {
    notFound();
  }

  // Récupérer les contextes séparément
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <div className=" bg-card backdrop-blur-md  shadow-md rounded-lg p-6 mb-6 border border-gray-300">
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

          <div className=" bg-card backdrop-blur-md  shadow-md rounded-lg p-6 border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Modifier le chatbot
            </h2>
            <ChatbotForm
              initialData={{
                id: chatbot.id,
                name: chatbot.name,
                description: chatbot.description || "",
              }}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className=" bg-card backdrop-blur-md  shadow-md rounded-lg p-6 border border-gray-300 ">
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

          <div className=" bg-card backdrop-blur-md  shadow-md rounded-lg p-6 mt-6 border border-gray-300">
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
                }/api/chatbots/script?id=${chatbot.id}"></script>
<div id="chatbot-container"></div>`}
              </pre>
            </div>
            <CopyButton
              scriptContent={`<script src="${
                process.env.NEXT_PUBLIC_API_URL || ""
              }/api/chatbots/script?id=${
                chatbot.id
              }"></script>\n<div id="chatbot-container"></div>`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
