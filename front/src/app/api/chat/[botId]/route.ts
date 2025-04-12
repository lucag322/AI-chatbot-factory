/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";

const prisma = new PrismaClient();
const prismaAny = prisma as any;

// Initialiser le client OpenAI uniquement si la clé est disponible
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

// En-têtes CORS à ajouter à toutes les réponses
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With",
};

// Gestionnaire pour les requêtes OPTIONS
export async function OPTIONS() {
  console.log("OPTIONS request received");
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

// Gestionnaire pour les requêtes POST
export async function POST(request: NextRequest, { params }: any) {
  console.log("POST request received for botId:", params.botId);

  // Vérifier si c'est une requête préflight (OPTIONS)
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { botId } = params;
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Le message est requis" },
        { status: 400, headers: corsHeaders }
      );
    }

    const chatbot = await prisma.chatbot.findUnique({
      where: { id: botId },
    });

    if (!chatbot) {
      return NextResponse.json(
        { error: "Chatbot non trouvé" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Récupérer les contextes du chatbot
    const contexts = await prismaAny.context.findMany({
      where: { chatbotId: botId },
    });

    // Préparer le contexte pour OpenAI
    const contextText = contexts
      .map((c: { content: any }) => c.content)
      .join("\n\n");

    let response;

    // Utiliser OpenAI si disponible
    if (openai) {
      try {
        console.log("Appel à OpenAI avec le message:", message);

        // Utiliser l'API OpenAI pour générer une réponse
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `Tu es ${chatbot.name}, un assistant IA. Utilise le contexte suivant pour répondre aux questions des utilisateurs:\n\n${contextText}`,
            },
            { role: "user", content: message },
          ],
          max_tokens: 500,
        });

        response =
          completion.choices[0]?.message?.content ||
          "Je n'ai pas pu générer une réponse.";
        console.log("Réponse d'OpenAI reçue:", response);
      } catch (openaiError) {
        console.error("Erreur lors de l'appel à OpenAI:", openaiError);

        // Fallback en cas d'erreur avec OpenAI
        response = `Je suis ${chatbot.name}. D'après mes informations, je peux vous dire que votre message était: "${message}". Je dispose de ${contexts.length} contextes pour vous aider. (Erreur OpenAI)`;
      }
    } else {
      // Mode de secours si OpenAI n'est pas configuré
      console.log("OpenAI n'est pas configuré, utilisation du mode de secours");
      response = `Je suis ${chatbot.name}. D'après mes informations, je peux vous dire que votre message était: "${message}". Je dispose de ${contexts.length} contextes pour vous aider. (OpenAI non configuré)`;
    }

    return NextResponse.json({ response }, { headers: corsHeaders });
  } catch (error) {
    console.error("Erreur lors du traitement du message:", error);
    return NextResponse.json(
      { error: "Erreur lors du traitement du message" },
      { status: 500, headers: corsHeaders }
    );
  }
}
