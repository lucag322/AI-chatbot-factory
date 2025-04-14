"use client";

import { useEffect, useRef } from "react";

interface ChatbotPreviewProps {
  chatbotId: string;
}

export default function ChatbotPreview({ chatbotId }: ChatbotPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Éviter le chargement multiple du script
    if (scriptLoaded.current) return;

    // Détermine l'URL du serveur
    const serverUrl = process.env.NEXT_PUBLIC_API_URL || window.location.origin;

    // Crée un élément script avec un paramètre nocache pour éviter la mise en cache
    const script = document.createElement("script");
    script.src = `${serverUrl}/api/chatbots/script?id=${chatbotId}&nocache=${Date.now()}`;
    script.async = true;

    // Ajoute le script à la page
    document.body.appendChild(script);

    scriptLoaded.current = true;

    // Nettoyer le script quand le composant est démonté
    return () => {
      // Trouver et supprimer l'élément hôte du Shadow DOM
      const hostElement = document.getElementById("chatbot-host");
      if (hostElement) {
        document.body.removeChild(hostElement);
      }

      // Supprimer le script
      document.body.removeChild(script);
      scriptLoaded.current = false;
    };
  }, [chatbotId]);

  return <div ref={containerRef}></div>;
}
