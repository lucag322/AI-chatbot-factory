"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface StyleCustomizationModalProps {
  initialSettings: {
    name: string;
    description: string;
    welcomeMessage: string;
    mainColor: string;
    windowWidth: number;
    windowHeight: number;
    userMessageBgColor: string;
    userMessageTextColor: string;
    userMessageBorderColor?: string;
    showUserMessageBorder?: boolean;
    botMessageBgColor: string;
    botMessageTextColor: string;
    botMessageBorderColor: string;
    showBotMessageBorder: boolean;
  };
  onSave: (settings: {
    name: string;
    description: string;
    welcomeMessage: string;
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
  }) => void;
}

export default function StyleCustomizationModal({
  initialSettings,
  onSave,
}: StyleCustomizationModalProps) {
  const [name, setName] = useState(initialSettings.name || "");
  const [description, setDescription] = useState(
    initialSettings.description || ""
  );
  const [welcomeMessage, setWelcomeMessage] = useState(
    initialSettings.welcomeMessage ||
      "Bonjour ! Comment puis-je vous aider aujourd'hui ?"
  );
  const [mainColor, setMainColor] = useState(initialSettings.mainColor);
  const [windowWidth, setWindowWidth] = useState(initialSettings.windowWidth);
  const [windowHeight, setWindowHeight] = useState(
    initialSettings.windowHeight
  );
  const [userMessageBgColor, setUserMessageBgColor] = useState(
    initialSettings.userMessageBgColor
  );
  const [userMessageTextColor, setUserMessageTextColor] = useState(
    initialSettings.userMessageTextColor
  );
  const [userMessageBorderColor, setUserMessageBorderColor] = useState(
    initialSettings.userMessageBorderColor || "#a5a5a5"
  );
  const [showUserMessageBorder, setShowUserMessageBorder] = useState(
    initialSettings.showUserMessageBorder === true
  );
  const [botMessageBgColor, setBotMessageBgColor] = useState(
    initialSettings.botMessageBgColor
  );
  const [botMessageTextColor, setBotMessageTextColor] = useState(
    initialSettings.botMessageTextColor
  );
  const [botMessageBorderColor, setBotMessageBorderColor] = useState(
    initialSettings.botMessageBorderColor
  );
  const [showBotMessageBorder, setShowBotMessageBorder] = useState(
    initialSettings.showBotMessageBorder
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onSave({
      name,
      description,
      welcomeMessage,
      mainColor,
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
    });
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center gap-2 cursor-pointer">
          <Settings size={16} />
          Personnaliser le chatbot
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            Personnalisation du chatbot
          </AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            Personnalisez les informations et l&apos;apparence de votre chatbot
            pour l&apos;adapter à votre site web.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4 space-y-6">
          {/* Information de base */}
          <div>
            <h3 className="font-medium mb-3 text-black">
              Informations de base
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black"
                >
                  Nom du chatbot
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-black"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
                />
              </div>

              <div>
                <label
                  htmlFor="welcomeMessage"
                  className="block text-sm font-medium text-black"
                >
                  Message de bienvenue
                </label>
                <textarea
                  id="welcomeMessage"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
                />
              </div>
            </div>
          </div>

          {/* Couleur principale du chatbot */}
          <div>
            <h3 className="font-medium mb-3 text-black">Couleur principale</h3>
            <div>
              <label
                htmlFor="mainColor"
                className="block text-sm font-medium text-black"
              >
                Couleur du chatbot (bouton, en-tête)
              </label>
              <div className="flex items-center gap-4 mt-1">
                <input
                  type="color"
                  id="mainColor"
                  value={mainColor}
                  onChange={(e) => setMainColor(e.target.value)}
                  className="h-10 w-10 border border-gray-300 rounded"
                />
                <span className="text-sm text-black">{mainColor}</span>
              </div>
            </div>
          </div>

          {/* Dimensions du chatbot */}
          <div>
            <h3 className="font-medium mb-3 text-black">Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="windowWidth"
                  className="block text-sm font-medium text-black"
                >
                  Largeur (px)
                </label>
                <input
                  type="number"
                  id="windowWidth"
                  value={windowWidth}
                  onChange={(e) => setWindowWidth(parseInt(e.target.value))}
                  min="300"
                  max="600"
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
                />
              </div>

              <div>
                <label
                  htmlFor="windowHeight"
                  className="block text-sm font-medium text-black"
                >
                  Hauteur (px)
                </label>
                <input
                  type="number"
                  id="windowHeight"
                  value={windowHeight}
                  onChange={(e) => setWindowHeight(parseInt(e.target.value))}
                  min="400"
                  max="800"
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 text-black"
                />
              </div>
            </div>
          </div>

          {/* Messages de l'utilisateur */}
          <div>
            <h3 className="font-medium mb-3 text-black">
              Messages de l&apos;utilisateur
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="userMessageBgColor"
                  className="block text-sm font-medium text-black"
                >
                  Couleur de fond
                </label>
                <div className="flex items-center gap-4 mt-1">
                  <input
                    type="color"
                    id="userMessageBgColor"
                    value={userMessageBgColor}
                    onChange={(e) => setUserMessageBgColor(e.target.value)}
                    className="h-10 w-10 border border-gray-300 rounded"
                  />
                  <span className="text-sm text-black">
                    {userMessageBgColor}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="userMessageTextColor"
                  className="block text-sm font-medium text-black"
                >
                  Couleur du texte
                </label>
                <div className="flex items-center gap-4 mt-1">
                  <input
                    type="color"
                    id="userMessageTextColor"
                    value={userMessageTextColor}
                    onChange={(e) => setUserMessageTextColor(e.target.value)}
                    className="h-10 w-10 border border-gray-300 rounded"
                  />
                  <span className="text-sm text-black">
                    {userMessageTextColor}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="showUserMessageBorder"
                    checked={showUserMessageBorder}
                    onChange={(e) => setShowUserMessageBorder(e.target.checked)}
                    className="mr-2 h-4 w-4"
                  />
                  <label
                    htmlFor="showUserMessageBorder"
                    className="text-sm font-medium text-black"
                  >
                    Afficher une bordure
                  </label>
                </div>

                {showUserMessageBorder && (
                  <>
                    <label
                      htmlFor="userMessageBorderColor"
                      className="block text-sm font-medium text-black"
                    >
                      Couleur de bordure
                    </label>
                    <div className="flex items-center gap-4 mt-1">
                      <input
                        type="color"
                        id="userMessageBorderColor"
                        value={userMessageBorderColor}
                        onChange={(e) =>
                          setUserMessageBorderColor(e.target.value)
                        }
                        className="h-10 w-10 border border-gray-300 rounded"
                      />
                      <span className="text-sm text-black">
                        {userMessageBorderColor}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Messages du bot */}
          <div>
            <h3 className="font-medium mb-3 text-black">Messages du chatbot</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="botMessageBgColor"
                  className="block text-sm font-medium text-black"
                >
                  Couleur de fond
                </label>
                <div className="flex items-center gap-4 mt-1">
                  <input
                    type="color"
                    id="botMessageBgColor"
                    value={botMessageBgColor}
                    onChange={(e) => setBotMessageBgColor(e.target.value)}
                    className="h-10 w-10 border border-gray-300 rounded"
                  />
                  <span className="text-sm text-black">
                    {botMessageBgColor}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="botMessageTextColor"
                  className="block text-sm font-medium text-black"
                >
                  Couleur du texte
                </label>
                <div className="flex items-center gap-4 mt-1">
                  <input
                    type="color"
                    id="botMessageTextColor"
                    value={botMessageTextColor}
                    onChange={(e) => setBotMessageTextColor(e.target.value)}
                    className="h-10 w-10 border border-gray-300 rounded"
                  />
                  <span className="text-sm text-black">
                    {botMessageTextColor}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="showBotMessageBorder"
                    checked={showBotMessageBorder}
                    onChange={(e) => setShowBotMessageBorder(e.target.checked)}
                    className="mr-2 h-4 w-4"
                  />
                  <label
                    htmlFor="showBotMessageBorder"
                    className="text-sm font-medium text-black"
                  >
                    Afficher une bordure
                  </label>
                </div>

                {showBotMessageBorder && (
                  <>
                    <label
                      htmlFor="botMessageBorderColor"
                      className="block text-sm font-medium text-black"
                    >
                      Couleur de bordure
                    </label>
                    <div className="flex items-center gap-4 mt-1">
                      <input
                        type="color"
                        id="botMessageBorderColor"
                        value={botMessageBorderColor}
                        onChange={(e) =>
                          setBotMessageBorderColor(e.target.value)
                        }
                        className="h-10 w-10 border border-gray-300 rounded"
                      />
                      <span className="text-sm text-black">
                        {botMessageBorderColor}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3 text-black">Prévisualisation</h3>
            <div className="p-4 border rounded-md bg-gray-50">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-black mb-2">
                  Message de bienvenue
                </h4>
                <div
                  className="p-3 rounded-md max-w-[80%] text-sm"
                  style={{
                    backgroundColor: botMessageBgColor,
                    color: botMessageTextColor,
                    border: showBotMessageBorder
                      ? `1px solid ${botMessageBorderColor}`
                      : "none",
                  }}
                >
                  {welcomeMessage}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-black mb-2">
                  Simulation d&apos;une conversation
                </h4>
                <div className="space-y-2">
                  <div
                    className="p-3 rounded-md max-w-[80%] text-sm ml-auto"
                    style={{
                      backgroundColor: userMessageBgColor,
                      color: userMessageTextColor,
                      border: showUserMessageBorder
                        ? `1px solid ${userMessageBorderColor}`
                        : "none",
                    }}
                  >
                    Bonjour, pouvez-vous m&apos;aider ?
                  </div>

                  <div
                    className="p-3 rounded-md max-w-[80%] text-sm"
                    style={{
                      backgroundColor: botMessageBgColor,
                      color: botMessageTextColor,
                      border: showBotMessageBorder
                        ? `1px solid ${botMessageBorderColor}`
                        : "none",
                    }}
                  >
                    Bien sûr, je suis là pour vous aider. Que puis-je faire pour
                    vous ?
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-black mb-2">
                  Apparence du widget
                </h4>
                <div className="flex space-x-4 items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: mainColor }}
                  >
                    💬
                  </div>
                  <div
                    className="h-10 flex items-center px-4 text-white rounded-md"
                    style={{ backgroundColor: mainColor }}
                  >
                    {name || "Chatbot"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Annuler</AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary text-white"
            onClick={handleSave}
          >
            Enregistrer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
