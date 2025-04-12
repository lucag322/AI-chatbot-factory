/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Correction importante : exporter la fonction GET correctement
// en utilisant 'export async function GET' (et non pas une constante)
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  // Utiliser la variable d'environnement pour l'URL de production ou l'origine de la requête
  const serverUrl = process.env.NEXT_PUBLIC_API_URL || url.origin;

  if (!id) {
    return new NextResponse("Erreur: ID du chatbot manquant", { status: 400 });
  }

  try {
    const chatbot = await prisma.chatbot.findUnique({
      where: { id },
    });

    if (!chatbot) {
      return new NextResponse("Erreur: Chatbot non trouvé", { status: 404 });
    }

    // Script d'intégration du chatbot - optimisé pour la production
    const script = `
(function() {
  console.log("Initialisation du chatbot: ${chatbot.name}");
  
  // Variables globales pour l'état du chatbot
  let isExpanded = false;
  const chatbotId = "${id}";
  const serverUrl = "${serverUrl}";
  
  // Fonction pour créer l'interface utilisateur du chatbot
  function createChatbotUI() {
    // Ajouter une règle CSS pour définir la police d'écriture et l'animation des points
    const style = document.createElement('style');
    style.textContent = \`
      #chatbot-container, #chatbot-container * {
        font-family: Arial, sans-serif;
      }
      
      @keyframes bounce {
        0%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-5px); }
      }
      
      .loading-dot {
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #333;
        margin: 0 2px;
      }
      
      .loading-dot:nth-child(1) {
        animation: bounce 1.4s ease-in-out 0s infinite both;
      }
      
      .loading-dot:nth-child(2) {
        animation: bounce 1.4s ease-in-out 0.2s infinite both;
      }
      
      .loading-dot:nth-child(3) {
        animation: bounce 1.4s ease-in-out 0.4s infinite both;
      }
    \`;
    document.head.appendChild(style);

    // Créer le bouton flottant (chatbot réduit)
    const chatbotWidget = document.createElement('div');
    chatbotWidget.id = 'chatbot-widget';
    chatbotWidget.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background-color: #4f46e5; border-radius: 50%; display: flex; justify-content: center; align-items: center; cursor: pointer; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); z-index: 1000;';
    chatbotWidget.innerHTML = '<div id="chatbot-widget-icon" style="color: white; font-size: 24px;">💬</div>';
    document.body.appendChild(chatbotWidget);

    // Créer le conteneur principal du chatbot
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    // Utiliser du CSS inline pour garantir que les styles sont appliqués
    chatbotContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 350px; height: 500px; background-color: white; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); display: none; flex-direction: column; overflow: hidden; z-index: 1000; font-family: Arial, sans-serif;';
    
    // Structure du chatbot avec des styles inline
    chatbotContainer.innerHTML = '<div id="chatbot-header" style="background-color: #4f46e5; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center;"><h3 id="chatbot-title" style="margin: 0; font-size: 16px; font-weight: bold; font-family: Arial, sans-serif;">${chatbot.name}</h3><button id="chatbot-toggle" style="cursor: pointer; background: none; border: none; color: white; font-size: 20px;">✕</button></div><div id="chatbot-messages" style="flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; font-family: Arial, sans-serif;"></div><div id="chatbot-input-container" style="padding: 15px; border-top: 1px solid #e9ecef; display: flex;"><input type="text" id="chatbot-input" style="flex: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-family: Arial, sans-serif;" placeholder="Tapez votre message..."><button id="chatbot-send" style="background-color: #4f46e5; color: white; border: none; border-radius: 20px; padding: 10px 15px; margin-left: 10px; cursor: pointer; font-family: Arial, sans-serif;">Envoyer</button></div>';
    
    document.body.appendChild(chatbotContainer);

    // Ajouter message de bienvenue
    const messagesContainer = document.getElementById('chatbot-messages');
    const welcomeMessage = document.createElement('div');
    welcomeMessage.style.cssText = 'max-width: 80%; padding: 10px; border-radius: 10px; margin-bottom: 5px; align-self: flex-start; background-color: #f1f0fe; font-family: Arial, sans-serif;';
    welcomeMessage.textContent = "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    messagesContainer.appendChild(welcomeMessage);

    // Attacher les événements
    document.getElementById('chatbot-widget').onclick = function() {
      chatbotContainer.style.display = 'flex';
      chatbotWidget.style.display = 'none';
      isExpanded = true;
    };

    document.getElementById('chatbot-toggle').onclick = function() {
      chatbotContainer.style.display = 'none';
      chatbotWidget.style.display = 'flex';
      isExpanded = false;
    };

    document.getElementById('chatbot-send').onclick = sendMessage;
    
    document.getElementById('chatbot-input').onkeypress = function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    };
    
    console.log("Interface du chatbot créée avec succès et événements attachés");
  }

  // Fonction pour ajouter un message à l'interface
  function addMessage(text, isUser) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    
    messageElement.style.cssText = isUser 
      ? 'max-width: 80%; padding: 10px; border-radius: 10px; margin-bottom: 5px; align-self: flex-end; background-color: #e9ecef; font-family: Arial, sans-serif;'
      : 'max-width: 80%; padding: 10px; border-radius: 10px; margin-bottom: 5px; align-self: flex-start; background-color: #f1f0fe; font-family: Arial, sans-serif;';
    
    messageElement.textContent = text;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Fonction pour créer une animation de chargement avec des points qui rebondissent
  function createLoadingAnimation() {
    const loadingContainer = document.createElement('div');
    loadingContainer.style.cssText = 'max-width: 80%; padding: 10px; border-radius: 10px; margin-bottom: 5px; align-self: flex-start; background-color: #f1f0fe; font-family: Arial, sans-serif; display: flex; align-items: center;';
    
    loadingContainer.innerHTML = '<div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div>';
    
    return loadingContainer;
  }

  // Fonction pour envoyer un message au serveur
  async function sendMessage() {
    const inputElement = document.getElementById('chatbot-input');
    const message = inputElement.value.trim();
    
    if (message) {
      // Afficher le message de l'utilisateur
      addMessage(message, true);
      inputElement.value = '';
      
      // Afficher l'animation de chargement
      const loadingMessage = createLoadingAnimation();
      document.getElementById('chatbot-messages').appendChild(loadingMessage);
      
      try {
        console.log("Envoi du message au serveur:", message);
        
        // Tenter d'envoyer la requête avec les en-têtes CORS
        const response = await fetch(serverUrl + '/api/chat/' + chatbotId, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });
        
        // Vérification de la réponse
        console.log("Statut de la réponse:", response.status);
        
        // Si le statut est OK
        if (response.ok) {
          const data = await response.json();
          console.log("Réponse reçue:", data);
          
          // Supprimer le message de chargement
          document.getElementById('chatbot-messages').removeChild(loadingMessage);
          
          // Afficher la réponse du chatbot
          addMessage(data.response || "Désolé, je n'ai pas pu traiter votre demande.", false);
        } else {
          throw new Error('Erreur serveur: ' + response.status);
        }
        
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
        
        // Supprimer le message de chargement
        document.getElementById('chatbot-messages').removeChild(loadingMessage);
        
        // Afficher un message d'erreur
        addMessage("Désolé, une erreur s'est produite lors de la communication avec le serveur. Veuillez vérifier que vous intégrez ce chatbot sur le même domaine que le serveur ou contactez l'administrateur pour activer CORS.", false);
      }
    }
  }

  // Initialiser le chatbot
  createChatbotUI();
  console.log("Chatbot initialisé avec succès");
})();
`;

    return new NextResponse(script, {
      headers: {
        "Content-Type": "application/javascript",
        // En-têtes CORS pour permettre l'intégration sur d'autres domaines
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
        // Cache-Control pour optimiser les performances
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du script:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}

// Ajouter également la méthode OPTIONS pour gérer les requêtes préflight CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
    },
  });
}
