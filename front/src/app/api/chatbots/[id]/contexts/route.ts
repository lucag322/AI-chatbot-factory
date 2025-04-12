/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Assurez-vous d'initialiser le client Prisma correctement
const prisma = new PrismaClient();
// Créez une version typée comme "any" pour accéder aux propriétés qui ne sont pas reconnues par TypeScript

const prismaAny = prisma as any;

// GET /api/chatbots/[id]/contexts - Récupérer tous les contextes d'un chatbot
export async function GET(request: NextRequest, { params }: any) {
  try {
    const { id } = params;

    const chatbot = await prisma.chatbot.findUnique({
      where: { id },
    });

    if (!chatbot) {
      return NextResponse.json(
        { error: "Chatbot non trouvé" },
        { status: 404 }
      );
    }

    // Utilisez prismaAny.context au lieu de prisma.context
    const contexts = await prismaAny.context.findMany({
      where: { chatbotId: id },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contexts);
  } catch (error) {
    console.error("Erreur lors de la récupération des contextes:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des contextes" },
      { status: 500 }
    );
  }
}

// POST /api/chatbots/[id]/contexts - Créer un nouveau contexte
export async function POST(request: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Le titre et le contenu sont requis" },
        { status: 400 }
      );
    }

    const chatbot = await prisma.chatbot.findUnique({
      where: { id },
    });

    if (!chatbot) {
      return NextResponse.json(
        { error: "Chatbot non trouvé" },
        { status: 404 }
      );
    }

    // Utilisez prismaAny.context au lieu de prisma.context
    const newContext = await prismaAny.context.create({
      data: {
        title,
        content,
        chatbotId: id,
      },
    });

    return NextResponse.json(newContext, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du contexte:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du contexte" },
      { status: 500 }
    );
  }
}
