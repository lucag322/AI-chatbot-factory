/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/chatbots/delete - Endpoint de suppression
export async function POST(request: NextRequest) {
  try {
    // Extraire l'ID du corps de la requête
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID du chatbot requis" },
        { status: 400 }
      );
    }

    const prismaAny = prisma as any;

    const chatbot = await prisma.chatbot.findUnique({
      where: { id },
    });

    if (!chatbot) {
      return NextResponse.json(
        { error: "Chatbot non trouvé" },
        { status: 404 }
      );
    }

    console.log("Suppression du chatbot:", id);

    // Supprimer d'abord les contextes associés au chatbot
    await prismaAny.context.deleteMany({
      where: { chatbotId: id },
    });

    // Puis supprimer le chatbot
    await prisma.chatbot.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true, message: "Chatbot supprimé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la suppression du chatbot:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du chatbot" },
      { status: 500 }
    );
  }
}
