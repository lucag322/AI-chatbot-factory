#!/bin/bash

# Exporter la clé API depuis le secret Docker
export OPENAI_API_KEY=$(cat /run/secrets/openai_api_key)

# Afficher un message de confirmation (optionnel)
echo "Variables d'environnement configurées, démarrage de l'application..."

# Démarrer votre application Next.js
exec npm start