"use client";

import { useState } from "react";

interface CopyScriptButtonProps {
  chatbotId: string;
}

export default function CopyScriptButton({ chatbotId }: CopyScriptButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const origin = window.location.origin;
    const scriptText = `<script src="${origin}/api/chatbots/script?id=${chatbotId}"></script>\n<div id="chatbot-container"></div>`;

    try {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(scriptText)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => {
            console.error("Erreur lors de la copie:", err);
          });
      } else {
        // Fallback pour les navigateurs qui ne supportent pas l'API Clipboard
        const textArea = document.createElement("textarea");
        textArea.value = scriptText;
        textArea.style.position = "fixed"; // Évite de faire défiler la page
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }

        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error("Erreur lors de la copie:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm">
          {`<script src="${
            typeof window !== "undefined" ? window.location.origin : ""
          }/api/chatbots/script?id=${chatbotId}"></script>
<div id="chatbot-container"></div>`}
        </pre>
      </div>
      <button
        className="mt-4 bg-white hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={copyToClipboard}
      >
        {copied ? "Copié !" : "Copier le script"}
      </button>
    </>
  );
}
