# 🤖 SmartScale WebTech - Bot WhatsApp de Qualification

Bot de qualification automatique des prospects selon la méthode BANT pour SmartScale WebTech.

## 📋 Prérequis

- Ubuntu 24.04
- Node.js 18+ installé
- WhatsApp installé sur votre téléphone

## 🚀 Installation

1. **Cloner le projet** :
```bash
git clone <votre-repo> ou copier le dossier whatsapp-bot
cd whatsapp-bot
```

2. **Installer les dépendances** :
```bash
npm install
```

3. **Démarrer le bot** :
```bash
npm start
```

## 🔧 Configuration

### Première connexion :
1. Lancer `npm start`
2. Scanner le QR code avec WhatsApp sur votre téléphone
3. Le bot est connecté et prêt !

### Dashboard :
- Accessible sur : `http://localhost:3001`
- Statistiques en temps réel
- Liste des prospects qualifiés

## 📊 Fonctionnalités

### Qualification BANT :
- **B**udget : 3 fourchettes selon le service
- **A**utorité : Décideur/Participant/Collecteur
- **N**eed : Services web/IA/Marketing
- **T**imeline : 3 mois/6 mois/Plus tard

### Scoring automatique :
- **75-100** : Prospect CHAUD → RDV immédiat
- **50-74** : Prospect TIÈDE → Ressources
- **0-49** : Prospect FROID → Suivi futur

### Services configurés :
1. **Site web professionnel** (150K-600K FCFA)
2. **Solutions IA** (400K-3.5M FCFA)  
3. **Marketing digital** (150K-600K+ FCFA)

## 📱 Utilisation

### Conversation type :
```
Bot: Bonjour ! Quel est votre principal besoin ?
1️⃣ Site web professionnel
2️⃣ Solutions IA et automatisation
3️⃣ Marketing digital

User: 2

Bot: Quel type de projet vous intéresse ?
1️⃣ Chatbot simple
2️⃣ Automatisation métier
3️⃣ IA conversationnelle

[... suite de la qualification ...]
```

### Commandes spéciales :
- `recommencer` : Redémarre la conversation

## 📁 Structure des fichiers

```
whatsapp-bot/
├── bot.js              # Logique principale
├── package.json        # Dépendances
├── prospects.json      # Sauvegarde des prospects
└── README.md          # Documentation
```

## 🛠️ Maintenance

### Logs :
- Tous les prospects sont loggés dans la console
- Sauvegarde automatique dans `prospects.json`

### Redémarrage :
```bash
npm start
```

### Mise à jour :
- Modifier les services dans `bot.js` ligne 13-27
- Ajuster le scoring ligne 200-230

## 🔒 Sécurité

- Pas de données sensibles stockées
- Authentification WhatsApp locale
- Dashboard accessible uniquement en local

## 📞 Support

- **WhatsApp** : +237 686 577 791
- **Email** : launlaferdlance2025@gmail.com

---

**Note** : Ce bot fonctionne 24/7 tant que votre PC Ubuntu est allumé et connecté à internet.