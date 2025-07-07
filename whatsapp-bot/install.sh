#!/bin/bash

# Script d'installation pour Ubuntu 24.04
# SmartScale WebTech - Bot WhatsApp

echo "🤖 Installation du Bot WhatsApp SmartScale WebTech"
echo "=================================================="

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    echo "📦 Installation de Node.js 18..."
    
    # Installer Node.js 18
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    echo "✅ Node.js installé : $(node -v)"
else
    echo "✅ Node.js détecté : $(node -v)"
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    sudo apt-get install -y npm
else
    echo "✅ npm détecté : $(npm -v)"
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Créer le service systemd (optionnel)
echo "🔧 Configuration du service systemd..."
sudo tee /etc/systemd/system/smartscale-bot.service > /dev/null <<EOF
[Unit]
Description=SmartScale WebTech WhatsApp Bot
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$(pwd)
ExecStart=/usr/bin/node bot.js
Restart=always
RestartSec=10
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
EOF

# Activer le service
sudo systemctl daemon-reload
sudo systemctl enable smartscale-bot.service

echo ""
echo "🎉 Installation terminée !"
echo "=================================================="
echo "Pour démarrer le bot :"
echo "  npm start"
echo ""
echo "Pour démarrer comme service (optionnel) :"
echo "  sudo systemctl start smartscale-bot"
echo "  sudo systemctl status smartscale-bot"
echo ""
echo "Dashboard disponible sur : http://localhost:3001"
echo "=================================================="