import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContextForm from "@/components/ContextForm";

const prisma = new PrismaClient();

// Pour Next.js 15.3.0, params et searchParams doivent être des promesses
interface PageProps {
  params: Promise<{
    id: string;
    contextId: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function EditContextPage({
  params,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  searchParams,
}: PageProps) {
  // Résoudre la promesse des paramètres
  const resolvedParams = await params;
  const { id, contextId } = resolvedParams;

  // Définir prismaClient comme any pour éviter les erreurs TypeScript
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prismaClient = prisma as any;

  try {
    const [chatbot, context] = await Promise.all([
      prisma.chatbot.findUnique({
        where: { id },
      }),
      prismaClient.context.findUnique({
        where: {
          id: contextId,
          chatbotId: id,
        },
      }),
    ]);

    if (!chatbot || !context) {
      notFound();
    }

    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Link
            href={`/chatbots/${id}`}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Retour au chatbot
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6">Modifier le contexte</h1>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
          <ContextForm
            chatbotId={id}
            initialData={{
              id: context.id,
              title: context.title,
              content: context.content,
            }}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Erreur lors du chargement du contexte:", error);
    notFound();
  }
}
