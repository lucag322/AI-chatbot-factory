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
          Personnaliser l&apos;apparence
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">
            Personnalisation de l&apos;apparence
          </AlertDialogTitle>
          <AlertDialogDescription className="text-black">
            Personnalisez les couleurs et dimensions de votre chatbot pour
            l&apos;adapter à votre site web.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4 space-y-6">
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

          {/* Prévisualisation */}
          <div>
            <h3 className="font-medium mb-3 text-black">Prévisualisation</h3>
            <div className="p-4 border rounded-md bg-gray-50">
              <div className="flex flex-col space-y-3">
                <div
                  className="max-w-[70%] p-3 rounded-lg self-end"
                  style={{
                    backgroundColor: userMessageBgColor,
                    color: userMessageTextColor,
                    border: showUserMessageBorder
                      ? `1px solid ${userMessageBorderColor}`
                      : "none",
                  }}
                >
                  Bonjour, comment puis-je vous aider ?
                </div>

                <div
                  className="max-w-[70%] p-3 rounded-lg self-start"
                  style={{
                    backgroundColor: botMessageBgColor,
                    color: botMessageTextColor,
                    border: showBotMessageBorder
                      ? `1px solid ${botMessageBorderColor}`
                      : "none",
                  }}
                >
                  Je suis votre assistant virtuel. Comment puis-je vous aider
                  aujourd&apos;hui ?
                </div>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave} className="text-black">
            Appliquer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
