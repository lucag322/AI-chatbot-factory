/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Créez une version typée comme "any" pour accéder aux propriétés qui ne sont pas reconnues par TypeScript

const prismaAny = prisma as any;

// GET /api/chatbots/[id]/contexts/[contextId] - Récupérer un contexte spécifique
export async function GET(
  request: NextRequest,
  { params }: any // Utilisez simplement any ici
) {
  try {
    const { id, contextId } = params;

    const context = await prismaAny.context.findUnique({
      where: {
        id: contextId,
        chatbotId: id,
      },
    });

    if (!context) {
      return NextResponse.json(
        { error: "Contexte non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(context);
  } catch (error) {
    console.error("Erreur lors de la récupération du contexte:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération du contexte" },
      { status: 500 }
    );
  }
}

// PUT /api/chatbots/[id]/contexts/[contextId] - Mettre à jour un contexte
export async function PUT(request: NextRequest, { params }: any) {
  try {
    const { id, contextId } = params;
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Le titre et le contenu sont requis" },
        { status: 400 }
      );
    }

    const context = await prismaAny.context.findUnique({
      where: {
        id: contextId,
        chatbotId: id,
      },
    });

    if (!context) {
      return NextResponse.json(
        { error: "Contexte non trouvé" },
        { status: 404 }
      );
    }

    const updatedContext = await prismaAny.context.update({
      where: { id: contextId },
      data: {
        title,
        content,
      },
    });

    return NextResponse.json(updatedContext);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du contexte:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du contexte" },
      { status: 500 }
    );
  }
}

// DELETE /api/chatbots/[id]/contexts/[contextId] - Supprimer un contexte
export async function DELETE(request: NextRequest, { params }: any) {
  try {
    const { id, contextId } = params;

    const context = await prismaAny.context.findUnique({
      where: {
        id: contextId,
        chatbotId: id,
      },
    });

    if (!context) {
      return NextResponse.json(
        { error: "Contexte non trouvé" },
        { status: 404 }
      );
    }

    await prismaAny.context.delete({
      where: { id: contextId },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Erreur lors de la suppression du contexte:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression du contexte" },
      { status: 500 }
    );
  }
}
