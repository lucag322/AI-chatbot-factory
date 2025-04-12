import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/chatbots - Récupérer tous les chatbots
export async function GET() {
  try {
    const chatbots = await prisma.chatbot.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(chatbots);
  } catch (error) {
    console.error("Erreur lors de la récupération des chatbots:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des chatbots" },
      { status: 500 }
    );
  }
}

// POST /api/chatbots - Créer un nouveau chatbot
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Le nom du chatbot est requis" },
        { status: 400 }
      );
    }

    const newChatbot = await prisma.chatbot.create({
      data: {
        name,
        description,
      },
    });

    return NextResponse.json(newChatbot, { status: 201 });
  } catch (error) {
    console.error("Erreur lors de la création du chatbot:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du chatbot" },
      { status: 500 }
    );
  }
}
