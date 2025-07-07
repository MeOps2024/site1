#!/bin/bash

# Script de mise à jour du bot avec redirection automatique
echo "🔄 Mise à jour du Bot WhatsApp avec redirection automatique..."

# Sauvegarder les prospects existants
if [ -f "prospects.json" ]; then
    cp prospects.json prospects_backup.json
    echo "✅ Sauvegarde des prospects effectuée"
fi

# Redémarrer le bot
echo "🔄 Redémarrage du bot..."
pkill -f "node bot.js" 2>/dev/null
sleep 2

npm start &
echo "✅ Bot redémarré avec redirection automatique"
echo ""
echo "🎯 Nouvelles fonctionnalités :"
echo "   • Redirection automatique des prospects chauds (score ≥75)"
echo "   • Lien direct vers votre WhatsApp Business"
echo "   • Code de référence unique pour chaque prospect"
echo "   • Message pré-rempli avec le profil du prospect"
echo ""
echo "📊 Dashboard : http://localhost:3001"
echo "📱 WhatsApp Business : +237686577791"