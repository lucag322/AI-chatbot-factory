"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import StyleCustomizationModal from "./StyleCustomizationModal";

interface ChatbotFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    color?: string;
    windowWidth?: number;
    windowHeight?: number;
    userMessageBgColor?: string;
    userMessageTextColor?: string;
    userMessageBorderColor?: string;
    showUserMessageBorder?: boolean;
    botMessageBgColor?: string;
    botMessageTextColor?: string;
    botMessageBorderColor?: string;
    showBotMessageBorder?: boolean;
  };
}

export default function ChatbotForm({ initialData }: ChatbotFormProps = {}) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  // États pour les couleurs et dimensions
  const [color, setColor] = useState(initialData?.color || "#3b82f6");
  const [windowWidth, setWindowWidth] = useState(
    initialData?.windowWidth || 380
  );
  const [windowHeight, setWindowHeight] = useState(
    initialData?.windowHeight || 600
  );
  const [userMessageBgColor, setUserMessageBgColor] = useState(
    initialData?.userMessageBgColor || "#a5a5a5"
  );
  const [userMessageTextColor, setUserMessageTextColor] = useState(
    initialData?.userMessageTextColor || "#ffffff"
  );
  const [userMessageBorderColor, setUserMessageBorderColor] = useState(
    initialData?.userMessageBorderColor || "#a5a5a5"
  );
  const [showUserMessageBorder, setShowUserMessageBorder] = useState(
    initialData?.showUserMessageBorder === true
  );
  const [botMessageBgColor, setBotMessageBgColor] = useState(
    initialData?.botMessageBgColor || "#ffffff"
  );
  const [botMessageTextColor, setBotMessageTextColor] = useState(
    initialData?.botMessageTextColor || "#5d5d5d"
  );
  const [botMessageBorderColor, setBotMessageBorderColor] = useState(
    initialData?.botMessageBorderColor || "#5d5d5d"
  );
  const [showBotMessageBorder, setShowBotMessageBorder] = useState(
    initialData?.showBotMessageBorder !== false
  );

  useEffect(() => {
    console.log("initialData :", initialData);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!initialData?.id;

  const handleStyleSave = (settings: {
    mainColor: string;
    windowWidth: number;
    windowHeight: number;
    userMessageBgColor: string;
    userMessageTextColor: string;
    userMessageBorderColor: string;
    showUserMessageBorder: boolean;
    botMessageBgColor: string;
    botMessageTextColor: string;
    botMessageBorderColor: string;
    showBotMessageBorder: boolean;
  }) => {
    setColor(settings.mainColor);
    setWindowWidth(settings.windowWidth);
    setWindowHeight(settings.windowHeight);
    setUserMessageBgColor(settings.userMessageBgColor);
    setUserMessageTextColor(settings.userMessageTextColor);
    setUserMessageBorderColor(settings.userMessageBorderColor);
    setShowUserMessageBorder(settings.showUserMessageBorder);
    setBotMessageBgColor(settings.botMessageBgColor);
    setBotMessageTextColor(settings.botMessageTextColor);
    setBotMessageBorderColor(settings.botMessageBorderColor);
    setShowBotMessageBorder(settings.showBotMessageBorder);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = {
      name,
      description,
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
    };

    console.log("Données envoyées :", formData);

    setIsSubmitting(true);
    setError("");

    try {
      const url = isEditing
        ? `/api/chatbots/${initialData.id}`
        : "/api/chatbots";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la sauvegarde");
      }

      const data = await response.json();
      router.push(`/chatbots/${data.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground"
        >
          Nom du chatbot
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-foreground"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-foreground"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-foreground"
        />
      </div>

      {/* Section d'apparence */}
      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Apparence du chatbot</h3>

          <StyleCustomizationModal
            initialSettings={{
              mainColor: color,
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
            }}
            onSave={handleStyleSave}
          />
        </div>

        {/* Aperçu des paramètres */}
        <div className="mt-4 p-3 border rounded-md grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Couleurs</h4>
            <div className="flex space-x-2 items-center">
              <div
                className="h-8 w-8 rounded-md"
                style={{ backgroundColor: color }}
                title="Couleur principale"
              ></div>
              <div
                className="h-8 w-8 rounded-md"
                style={{
                  backgroundColor: userMessageBgColor,
                  color: userMessageTextColor,
                  border: showUserMessageBorder
                    ? `1px solid ${userMessageBorderColor}`
                    : "none",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "10px",
                  lineHeight: "28px",
                }}
                title="Message utilisateur"
              >
                U
              </div>
              <div
                className="h-8 w-8 rounded-md flex items-center justify-center"
                style={{
                  backgroundColor: botMessageBgColor,
                  color: botMessageTextColor,
                  border: showBotMessageBorder
                    ? `1px solid ${botMessageBorderColor}`
                    : "none",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "10px",
                }}
                title="Message bot"
              >
                B
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Dimensions</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm">
                <span className="font-medium">Largeur:</span> {windowWidth}px
              </div>
              <div className="text-sm">
                <span className="font-medium">Hauteur:</span> {windowHeight}px
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting} variant="default">
          {isSubmitting
            ? "Sauvegarde en cours..."
            : isEditing
            ? "Mettre à jour"
            : "Créer"}
        </Button>
      </div>
    </form>
  );
}
