/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/chatbots/[id] - Récupérer un chatbot spécifique
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

    return NextResponse.json(chatbot);
  } catch (error) {
    console.error("Erreur lors de la récupération du chatbot:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du chatbot" },
      { status: 500 }
    );
  }
}

// PUT /api/chatbots/[id] - Mettre à jour un chatbot
export async function PUT(request: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, color, windowWidth, windowHeight } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Le nom du chatbot est requis" },
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

    const updatedChatbot = await prisma.chatbot.update({
      where: { id },
      data: {
        name,
        description,
        color,
        windowWidth,
        windowHeight,
      },
    });

    return NextResponse.json(updatedChatbot);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du chatbot:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du chatbot" },
      { status: 500 }
    );
  }
}

// DELETE /api/chatbots/[id] - Supprimer un chatbot
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const { id } = params;
    const prismaAny = prisma as any; // Conversion vers any pour éviter l'erreur TypeScript

    // Ajouter les en-têtes CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
    };

    // Vérifier si la requête est OPTIONS (preflight)
    if (request.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    const chatbot = await prisma.chatbot.findUnique({
      where: { id },
    });

    if (!chatbot) {
      return NextResponse.json(
        { error: "Chatbot non trouvé" },
        { status: 404, headers: corsHeaders }
      );
    }

    // Supprimer d'abord les contextes associés au chatbot
    await prismaAny.context.deleteMany({
      where: { chatbotId: id },
    });

    // Puis supprimer le chatbot
    await prisma.chatbot.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204, headers: corsHeaders });
  } catch (error) {
    console.error("Erreur lors de la suppression du chatbot:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du chatbot" },
      { status: 500 }
    );
  }
}

// Ajoutez cette fonction OPTIONS pour gérer les requêtes preflight CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
    },
  });
}
