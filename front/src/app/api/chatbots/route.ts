import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      welcomeMessage,
      color,
      windowWidth,
      windowHeight,
      userMessageBgColor,
      userMessageTextColor,
      userMessageBorderColor,
      showUserMessageBorder,
      botMessageBgColor,
      botMessageTextColor,
      botMessageBorderColor,
      showBotMessageBorder,
    } = body;

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
        welcomeMessage,
        color,
        windowWidth,
        windowHeight,
        userMessageBgColor,
        userMessageTextColor,
        userMessageBorderColor,
        showUserMessageBorder,
        botMessageBgColor,
        botMessageTextColor,
        botMessageBorderColor,
        showBotMessageBorder,
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
