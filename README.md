# AI Chatbot Factory

Un système complet de création et de gestion de chatbots IA basés sur OpenAI, avec une interface d'administration et une API d'intégration pour sites web.

## Fonctionnalités

- 🤖 **Création de chatbots personnalisés** - Générez des assistants IA adaptés à vos besoins
- 📚 **Gestion des contextes** - Alimentez vos chatbots avec des connaissances spécifiques
- 🔌 **Intégration facile** - Un simple script à copier pour ajouter votre chatbot à n'importe quel site web
- 🔒 **Sécurité** - Gestion des clés API et authentification intégrée
- 📱 **Interface responsive** - Administration depuis n'importe quel appareil

## Technologies utilisées

- **Frontend**: Next.js 15, React 19, TailwindCSS, Shadcn UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Base de données**: SQLite (développement), adaptable pour PostgreSQL/MySQL
- **IA**: API OpenAI (GPT-3.5 Turbo)
- **Déploiement**: Docker, Docker Compose

## Prérequis

- Node.js 18+ et npm
- Docker et Docker Compose
- Compte OpenAI avec une clé API valide

## Installation

### Docker (recommandé pour production)

1. Clonez le dépôt

   ```bash
   git clone https://github.com/lucag322/AI-chatbot-factory.git
   cd AI-chatbot-factory
   ```

2. Configurez les variables d'environnement

   ```bash
   cp .env.example .env
   ```

   Éditez le fichier `.env` et ajoutez votre clé API OpenAI et autres configurations nécessaires

3. Lancez l'application avec Docker Compose
   ```bash
   docker-compose up -d
   ```
   L'application sera disponible à l'adresse http://localhost:5555

## Guide d'utilisation

### Créer un nouveau chatbot

1. Accédez à la page d'accueil et cliquez sur "Nouveau chatbot"
2. Donnez un nom et une description à votre chatbot
3. Enregistrez pour générer un chatbot vide

### Ajouter du contexte

1. Ouvrez la page de détails de votre chatbot
2. Cliquez sur "Ajouter du contexte"
3. Remplissez le titre et le contenu du contexte (informations, règles, données) que votre chatbot doit connaître
4. Ajoutez autant de contextes que nécessaire

### Intégrer le chatbot sur votre site

1. Sur la page de détails du chatbot, copiez le script d'intégration
2. Collez ce script dans le code HTML de votre site web
3. Le chatbot apparaîtra automatiquement sur votre site

## Déploiement en production

Pour un déploiement en production:

1. Assurez-vous que vos variables d'environnement sont configurées correctement
2. Modifiez `compose.yml` pour adapter les paramètres de production
3. Utilisez un serveur reverse proxy comme Nginx pour gérer HTTPS
4. Considérez l'utilisation d'un service de gestion de secrets pour la clé API OpenAI
5. Lancez avec `docker-compose up -d`
