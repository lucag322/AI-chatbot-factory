import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContextForm from "@/components/ContextForm";

const prisma = new PrismaClient();

// Pour Next.js 15.3.0, params doit être une promesse
export default async function NewContextPage({
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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link
          href={`/chatbots/${id}`}
          className="text-white hover:text-gray-400"
        >
          ← Retour au chatbot
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Ajouter un contexte pour {chatbot.name}
      </h1>

      <div className=" bg-card backdrop-blur-md  shadow-md rounded-lg p-6 border border-gray-300">
        <p className="text-foreground mb-6">
          Les contextes permettent à votre chatbot de comprendre et de répondre
          à des questions spécifiques. Ajoutez des informations pertinentes pour
          améliorer les performances de votre chatbot.
        </p>

        <ContextForm chatbotId={id} />
      </div>
    </div>
  );
}
