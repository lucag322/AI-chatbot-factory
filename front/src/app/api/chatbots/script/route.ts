/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Interface pour le typage des chatbots avec personnalisation
interface ChatbotWithCustomization {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  apiKey: string;
  color?: string;
  windowWidth?: number;
  windowHeight?: number;
  userMessageBgColor?: string;
  userMessageTextColor?: string;
  botMessageBgColor?: string;
  botMessageTextColor?: string;
  botMessageBorderColor?: string;
  showBotMessageBorder?: boolean;
  userMessageBorderColor?: string;
  showUserMessageBorder?: boolean;
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const serverUrl = process.env.NEXT_PUBLIC_API_URL || url.origin;

  if (!id) {
    return new NextResponse("Erreur: ID du chatbot manquant", { status: 400 });
  }

  try {
    // Utilisation du casting pour le typage
    const chatbot = (await prisma.chatbot.findUnique({
      where: { id },
    })) as ChatbotWithCustomization;

    if (!chatbot) {
      return new NextResponse("Erreur: Chatbot non trouvé", { status: 404 });
    }

    // Utilisation des valeurs personnalisées ou des valeurs par défaut
    const chatbotColor = chatbot.color || "#4f46e5";
    const chatbotWidth = chatbot.windowWidth || 350;
    const chatbotHeight = chatbot.windowHeight || 500;

    // Nouvelles propriétés pour la personnalisation des couleurs des messages
    const userMessageBgColor = chatbot.userMessageBgColor || "#a5a5a5";
    const userMessageTextColor = chatbot.userMessageTextColor || "#ffffff";
    const userMessageBorderColor = chatbot.userMessageBorderColor || "#a5a5a5";
    const showUserMessageBorder = chatbot.showUserMessageBorder === true;

    const botMessageBgColor = chatbot.botMessageBgColor || "#ffffff";
    const botMessageTextColor = chatbot.botMessageTextColor || "#5d5d5d";
    const botMessageBorderColor = chatbot.botMessageBorderColor || "#5d5d5d";
    const showBotMessageBorder = chatbot.showBotMessageBorder !== false;

    const script = `
(function() {
  console.log("Initialisation du chatbot: ${chatbot.name}");
  
  let isExpanded = false;
  const chatbotId = "${id}";
  const serverUrl = "${serverUrl}";
  
  function createChatbotUI() {
    // Créer un élément hôte pour le Shadow DOM
    const hostElement = document.createElement('div');
    hostElement.id = 'chatbot-host';
    document.body.appendChild(hostElement);
    
    // Créer le Shadow DOM
    const shadow = hostElement.attachShadow({mode: 'closed'});
    
    // Ajouter les styles dans le Shadow DOM
    const style = document.createElement('style');
    style.textContent = \`
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
      
      #chatbot-widget {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background-color: ${chatbotColor};
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-family: Arial, sans-serif;
      }
      
      #chatbot-widget-icon {
        color: white;
        font-size: 24px;
      }
      
      #chatbot-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: ${chatbotWidth}px;
        height: ${chatbotHeight}px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        display: none;
        flex-direction: column;
        overflow: hidden;
        z-index: 1000;
        font-family: Arial, sans-serif;
      }
      
      #chatbot-header {
        background-color: ${chatbotColor};
        color: white;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      #chatbot-title {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        font-family: Arial, sans-serif;
      }
      
      #chatbot-toggle {
        cursor: pointer;
        background: none;
        border: none;
        color: white;
        font-size: 20px;
      }
      
      #chatbot-messages {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-family: Arial, sans-serif;
      }
      
      #chatbot-input-container {
        padding: 15px;
        border-top: 1px solid #e9ecef;
        display: flex;
      }
      
      #chatbot-input {
        flex: 1;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 20px;
        outline: none;
        font-family: Arial, sans-serif;
      }
      
      #chatbot-send {
        background-color: ${chatbotColor};
        color: white;
        border: none;
        border-radius: 20px;
        padding: 10px 15px;
        margin-left: 10px;
        cursor: pointer;
        font-family: Arial, sans-serif;
      }
      
      .user-message {
        max-width: 80%;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 5px;
        align-self: flex-end;
        background-color: ${userMessageBgColor};
        border: ${
          showUserMessageBorder ? `1px solid ${userMessageBorderColor}` : "none"
        };
        color: ${userMessageTextColor};
        word-break: break-word;
        font-family: Arial, sans-serif;
      }
      
      .bot-message {
        max-width: 80%;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 5px;
        align-self: flex-start;
        background-color: ${botMessageBgColor};
        border: ${
          showBotMessageBorder ? `1px solid ${botMessageBorderColor}` : "none"
        };
        color: ${botMessageTextColor};
        word-break: break-word;
        font-family: Arial, sans-serif;
      }
      
      .loading-container {
        max-width: 80%;
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 5px;
        align-self: flex-start;
        background-color: #f1f0fe;
        display: flex;
        align-items: center;
        font-family: Arial, sans-serif;
      }
      
      @media (max-width: 480px) {
        #chatbot-container {
          width: 90% !important;
          max-width: 350px !important;
          right: 5% !important;
          left: 5% !important;
          margin: 0 auto !important;
        }
        
        #chatbot-input-container {
          flex-direction: column !important;
        }
        
        #chatbot-input {
          width: 100% !important;
          margin-bottom: 8px !important;
        }
        
        #chatbot-send {
          width: 100% !important;
          margin-left: 0 !important;
        }
        
        #chatbot-widget {
          right: 10px !important;
        }
      }
    \`;
    shadow.appendChild(style);

    // Créer le bouton widget
    const chatbotWidget = document.createElement('div');
    chatbotWidget.id = 'chatbot-widget';
    chatbotWidget.innerHTML = '<div id="chatbot-widget-icon">💬</div>';
    shadow.appendChild(chatbotWidget);

    // Créer le conteneur du chatbot
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    
    // En-tête du chatbot
    const chatbotHeader = document.createElement('div');
    chatbotHeader.id = 'chatbot-header';
    
    const chatbotTitle = document.createElement('h3');
    chatbotTitle.id = 'chatbot-title';
    chatbotTitle.textContent = '${chatbot.name}';
    
    const chatbotToggle = document.createElement('button');
    chatbotToggle.id = 'chatbot-toggle';
    chatbotToggle.textContent = '✕';
    
    chatbotHeader.appendChild(chatbotTitle);
    chatbotHeader.appendChild(chatbotToggle);
    
    // Zone des messages
    const chatbotMessages = document.createElement('div');
    chatbotMessages.id = 'chatbot-messages';
    
    // Zone de saisie et bouton d'envoi
    const inputContainer = document.createElement('div');
    inputContainer.id = 'chatbot-input-container';
    
    const chatbotInput = document.createElement('input');
    chatbotInput.id = 'chatbot-input';
    chatbotInput.type = 'text';
    chatbotInput.placeholder = 'Tapez votre message...';
    
    const chatbotSend = document.createElement('button');
    chatbotSend.id = 'chatbot-send';
    chatbotSend.textContent = 'Envoyer';
    
    inputContainer.appendChild(chatbotInput);
    inputContainer.appendChild(chatbotSend);
    
    // Assembler le conteneur
    chatbotContainer.appendChild(chatbotHeader);
    chatbotContainer.appendChild(chatbotMessages);
    chatbotContainer.appendChild(inputContainer);
    
    shadow.appendChild(chatbotContainer);

    // Ajouter le message de bienvenue
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'bot-message';
    welcomeMessage.textContent = "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
    chatbotMessages.appendChild(welcomeMessage);

    // Gestionnaires d'événements
    chatbotWidget.addEventListener('click', function() {
      chatbotContainer.style.display = 'flex';
      chatbotWidget.style.display = 'none';
      isExpanded = true;
    });

    chatbotToggle.addEventListener('click', function() {
      chatbotContainer.style.display = 'none';
      chatbotWidget.style.display = 'flex';
      isExpanded = false;
    });

    chatbotSend.addEventListener('click', function() {
      sendMessage(shadow);
    });
    
    chatbotInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage(shadow);
      }
    });
  }

  function addMessage(shadow, text, isUser) {
    const messagesContainer = shadow.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    
    messageElement.className = isUser ? 'user-message' : 'bot-message';
    messageElement.textContent = text;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function createLoadingAnimation(shadow) {
    const loadingContainer = document.createElement('div');
    loadingContainer.className = 'loading-container';
    
    loadingContainer.innerHTML = '<div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div>';
    
    return loadingContainer;
  }

  async function sendMessage(shadow) {
    const inputElement = shadow.getElementById('chatbot-input');
    const message = inputElement.value.trim();
    
    if (message) {
      addMessage(shadow, message, true);
      inputElement.value = '';
      
      const messagesContainer = shadow.getElementById('chatbot-messages');
      const loadingMessage = createLoadingAnimation(shadow);
      messagesContainer.appendChild(loadingMessage);
      
      try {
        const response = await fetch(serverUrl + '/api/chat/' + chatbotId, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message }),
        });
        
        if (response.ok) {
          const data = await response.json();
          
          messagesContainer.removeChild(loadingMessage);
          
          addMessage(shadow, data.response || "Désolé, je n'ai pas pu traiter votre demande.", false);
        } else {
          throw new Error('Erreur serveur: ' + response.status);
        }
        
      } catch (error) {
        const messagesContainer = shadow.getElementById('chatbot-messages');
        messagesContainer.removeChild(loadingMessage);
        
        addMessage(shadow, "Désolé, une erreur s'est produite lors de la communication avec le serveur. Veuillez vérifier que vous intégrez ce chatbot sur le même domaine que le serveur ou contactez l'administrateur pour activer CORS.", false);
      }
    }
  }

  createChatbotUI();
})();
`;

    return new NextResponse(script, {
      headers: {
        "Content-Type": "application/javascript",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Erreur lors de la génération du script:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}

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
