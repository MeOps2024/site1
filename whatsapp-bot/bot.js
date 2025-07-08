const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = 3001;
const app = express();

// Configuration WhatsApp Business (votre numéro principal)
const BUSINESS_WHATSAPP = "+237686577791"; // Votre numéro WhatsApp Business

// Données de qualification avec descriptions détaillées
const services = {
    '1': {
        name: 'Site web professionnel',
        description: '🌐 Votre vitrine digitale pour attirer et convertir vos clients en ligne',
        budgets: ['150K - 250K FCFA', '250K - 450K FCFA', '450K - 600K FCFA'],
        types: [
            {
                name: 'Site vitrine',
                desc: 'Présentation élégante de votre entreprise pour gagner en crédibilité 🏆'
            },
            {
                name: 'Site e-commerce', 
                desc: 'Vendez vos produits 24h/24 et automatisez vos ventes en ligne 💰'
            },
            {
                name: 'Application web',
                desc: 'Solution sur-mesure pour optimiser vos processus métier 🚀'
            }
        ]
    },
    '2': {
        name: 'Solutions IA et automatisation',
        description: '🤖 Révolutionnez votre productivité et réduisez vos coûts avec l\'IA',
        budgets: ['400K - 800K FCFA', '800K - 1.8M FCFA', '1.8M - 3.5M FCFA'],
        types: [
            {
                name: 'Chatbot simple',
                desc: 'Assistant virtuel pour répondre à vos clients 24h/24 et filtrer les prospects 💬'
            },
            {
                name: 'Automatisation métier',
                desc: 'Éliminez les tâches répétitives et gagnez 5-10h/semaine ⚡'
            },
            {
                name: 'IA conversationnelle complète',
                desc: 'Assistant IA avancé qui comprend et traite vos demandes complexes 🧠'
            }
        ]
    },
    '3': {
        name: 'Marketing digital',
        description: '📈 Développez votre visibilité et générez plus de leads qualifiés',
        budgets: ['150K - 300K FCFA', '300K - 600K FCFA', '600K+ FCFA'],
        types: [
            {
                name: 'Meta Ads',
                desc: 'Campagnes publicitaires ciblées pour attirer vos clients idéaux 🎯'
            },
            {
                name: 'SEO et référencement',
                desc: 'Apparaissez en premier sur Google quand on cherche vos services 🔍'
            },
            {
                name: 'Stratégie digitale complète',
                desc: 'Plan marketing global pour dominer votre marché en ligne 📊'
            }
        ]
    }
};

// Fonction de détection intelligente des réponses
function parseUserChoice(text) {
    const normalized = text.toLowerCase().trim();
    
    // Mappings pour tous les formats possibles (jusqu'à 5 options)
    const choiceMap = {
        // Chiffres
        '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
        // Lettres françaises
        'un': '1', 'une': '1', 'premier': '1', 'première': '1', 'a': '1',
        'deux': '2', 'deuxième': '2', 'second': '2', 'seconde': '2', 'b': '2',
        'trois': '3', 'troisième': '3', 'c': '3',
        'quatre': '4', 'quatrième': '4', 'd': '4',
        'cinq': '5', 'cinquième': '5', 'e': '5',
        // Lettres anglaises
        'one': '1', 'first': '1',
        'two': '2', 'second': '2',
        'three': '3', 'third': '3',
        'four': '4', 'fourth': '4',
        'five': '5', 'fifth': '5',
        // Chiffres romains
        'i': '1', 'ii': '2', 'iii': '3', 'iv': '4', 'v': '5',
        // Autres variations
        '1er': '1', '1ère': '1', '2ème': '2', '3ème': '3', '4ème': '4', '5ème': '5'
    };
    
    // Recherche directe
    if (choiceMap[normalized]) {
        return choiceMap[normalized];
    }
    
    // Recherche par mots-clés dans le texte
    for (const [key, value] of Object.entries(choiceMap)) {
        if (normalized.includes(key)) {
            return value;
        }
    }
    
    return null;
}

// Stockage des conversations
let conversations = {};
let prospects = [];

// Initialisation du client WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Variable pour stocker le code de jumelage
let pairingCode = null;

// Génération du QR code ET code de jumelage
client.on('qr', (qr) => {
    console.log('\n🔗 DEUX MÉTHODES DE CONNEXION DISPONIBLES :');
    console.log('\n📱 MÉTHODE 1 - QR CODE :');
    console.log('Scannez ce QR code avec WhatsApp sur votre téléphone :');
    qrcode.generate(qr, { small: true });
    
    console.log('\n🔢 MÉTHODE 2 - CODE DE JUMELAGE :');
    console.log('Si le QR code ne fonctionne pas, utilisez le code de jumelage ci-dessous');
    console.log('👆 Tapez "code" dans le terminal pour obtenir le code à 8 chiffres');
});

// Support du code de jumelage
client.on('code', (code) => {
    pairingCode = code;
    console.log('\n🔢 CODE DE JUMELAGE À 8 CHIFFRES :');
    console.log(`📱 ${code}`);
    console.log('\nÉtapes sur votre téléphone :');
    console.log('1. Ouvrez WhatsApp');
    console.log('2. Allez dans Paramètres > Appareils liés');
    console.log('3. Appuyez sur "Lier un appareil"');
    console.log('4. Sélectionnez "Lier avec un numéro"');
    console.log(`5. Entrez ce code : ${code}`);
    console.log('\n⏱️ Ce code expire dans 2 minutes !');
});

// Connexion établie
client.on('ready', () => {
    console.log('\n✅ Bot WhatsApp SmartScale WebTech démarré !');
    console.log('🌐 Dashboard disponible sur : http://localhost:' + PORT);
    console.log('📱 WhatsApp connecté et prêt à recevoir des messages !');
});

// Gestion des messages
client.on('message', async (message) => {
    if (message.from.includes('@g.us')) return; // Ignorer les groupes
    if (message.fromMe) return; // Ignorer nos propres messages
    
    const phoneNumber = message.from;
    const messageText = message.body.trim();
    
    console.log(`📨 Message reçu de ${phoneNumber}: "${messageText}"`);
    
    // Initialiser la conversation si nécessaire SANS envoyer de message automatique
    if (!conversations[phoneNumber]) {
        conversations[phoneNumber] = {
            step: 'accueil',
            data: {},
            timestamp: new Date()
        };
        console.log(`🆕 Nouvelle conversation initiée pour ${phoneNumber}`);
    }
    
    // TRAITER LE MESSAGE REÇU
    await handleConversation(phoneNumber, messageText, message);
});

// Logique de conversation
async function handleConversation(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    
    console.log(`🔄 Étape actuelle: ${conv.step} | Service: ${conv.data.service || 'Non défini'} | WelcomeSent: ${conv.data.welcomeSent || false}`);
    
    try {
        switch (conv.step) {
            case 'accueil':
                console.log(`📞 Traitement accueil pour: "${messageText}"`);
                await handleAccueil(phoneNumber, messageText, message);
                break;
            case 'service_details':
                console.log(`📋 Traitement détails service pour: "${messageText}"`);
                await handleServiceDetails(phoneNumber, messageText, message);
                break;
            case 'budget':
                console.log(`💰 Traitement budget pour: "${messageText}"`);
                await handleBudget(phoneNumber, messageText, message);
                break;
            case 'autorite':
                console.log(`👤 Traitement autorité pour: "${messageText}"`);
                await handleAutorite(phoneNumber, messageText, message);
                break;
            case 'timeline':
                console.log(`⏱️ Traitement délai pour: "${messageText}"`);
                await handleTimeline(phoneNumber, messageText, message);
                break;
            case 'finalisation':
                console.log(`✅ Finalisation pour: "${messageText}"`);
                await handleFinalisation(phoneNumber, messageText, message);
                break;
            default:
                console.log(`❓ Étape inconnue: ${conv.step}, envoi du message d'accueil`);
                await sendWelcomeMessage(phoneNumber);
        }
    } catch (error) {
        console.error('❌ Erreur dans la conversation:', error);
        await client.sendMessage(phoneNumber, "Désolé, une erreur s'est produite. Tapez 'recommencer' pour redémarrer.");
    }
}

// Accueil
async function handleAccueil(phoneNumber, messageText, message) {
    const choice = parseUserChoice(messageText);

    if (messageText.toLowerCase().includes('recommencer') || messageText.toLowerCase().includes('restart')) {
        await sendWelcomeMessage(phoneNumber);
        return;
    }

    if (choice && services[choice]) {
        conversations[phoneNumber].data.service = choice;
        conversations[phoneNumber].step = 'service_details';

        const service = services[choice];
        console.log(`✅ Service sélectionné: ${service.name} pour ${phoneNumber}`);

        await client.sendMessage(phoneNumber,
            `Excellent choix ! 🎯\n\n` +
            `*${service.name}*\n` +
            `${service.description}\n\n` +
            `Quel type de solution vous intéresse ? 🤔\n\n` +
            service.types.map((type, index) => 
                `${index + 1}️⃣ *${type.name}*\n   ${type.desc}`
            ).join('\n\n') +
            `\n\n💡 *Plus d'infos :* https://smartscalewebtech.netlify.app/\n\n` +
            `Répondez par le numéro de votre choix ! 😊`
        );
    } else {
        await client.sendMessage(phoneNumber,
            `Bienvenue chez *SmartScale WebTech* ! 👋\n\n` +
            `Nous transformons votre business avec des solutions digitales de pointe. Quel est votre principal besoin ? 🚀\n\n` +
            `1️⃣ *Site web professionnel* 🌐\n   Votre vitrine digitale pour attirer plus de clients\n\n` +
            `2️⃣ *Solutions IA et automatisation* 🤖\n   Révolutionnez votre productivité\n\n` +
            `3️⃣ *Marketing digital* 📈\n   Développez votre visibilité en ligne\n\n` +
            `💡 *Plus de détails :* https://smartscalewebtech.netlify.app/\n\n` +
            `Répondez par un chiffre ou mot-clé (ex: "1", "web", "IA", etc.) 😊`
        );
    }
}

// Détails du service
async function handleServiceDetails(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    const serviceChoice = conv.data.service;
    const typeChoice = parseUserChoice(messageText);
    
    if (typeChoice && typeChoice >= '1' && typeChoice <= '3') {
        const typeIndex = parseInt(typeChoice) - 1;
        conv.data.serviceType = services[serviceChoice].types[typeIndex].name;
        conv.step = 'budget';
        
        const budgetOptions = services[serviceChoice].budgets.map((budget, index) => 
            `${index + 1}️⃣ ${budget}`
        ).join('\n');
        
        console.log(`✅ Type de service sélectionné: ${conv.data.serviceType} pour ${phoneNumber}`);
        
        await client.sendMessage(phoneNumber, 
            `Parfait ! 🎯 Vous souhaitez : *${conv.data.serviceType}*\n\n` +
            `Quel est votre budget envisagé pour ce projet ? 💰\n\n${budgetOptions}\n\n` +
            `💡 *Turbo* : +15-20% pour livraison en 2 semaines\n\n` +
            `💡 *Plus d'infos :* https://smartscalewebtech.netlify.app/\n\n` +
            `Répondez par le numéro correspondant ! 😊`
        );
    } else {
        console.log(`❌ Type non reconnu: "${messageText}" de ${phoneNumber}`);
        await client.sendMessage(phoneNumber, 
            `Je n'ai pas compris votre choix 🤔 Merci de sélectionner un numéro :\n\n` +
            services[serviceChoice].types.map((type, index) => 
                `${index + 1}️⃣ *${type.name}*\n   ${type.desc}`
            ).join('\n\n') +
            `\n\n💡 *Plus d'infos :* https://smartscalewebtech.netlify.app/\n\n` +
            `Vous pouvez répondre par "1", "deux", "third", etc. 😊`
        );
    }
}

// Budget
async function handleBudget(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    const serviceChoice = conv.data.service;
    const budgetChoice = parseUserChoice(messageText);
    
    if (budgetChoice && budgetChoice >= '1' && budgetChoice <= '3') {
        const budgetIndex = parseInt(budgetChoice) - 1;
        conv.data.budget = services[serviceChoice].budgets[budgetIndex];
        conv.step = 'autorite';
        
        console.log(`✅ Budget sélectionné: ${conv.data.budget} pour ${phoneNumber}`);
        
        await client.sendMessage(phoneNumber, 
            `Parfait ! 💰 Budget retenu : *${conv.data.budget}*\n\n` +
            `Dernière question pour bien vous orienter : Êtes-vous la personne qui prend les décisions pour ce type de projet ? 🤔\n\n` +
            `1️⃣ Oui, je suis le décideur principal 👨‍💼\n` +
            `2️⃣ Je participe à la décision 🤝\n` +
            `3️⃣ Je collecte des informations pour mon équipe 📋\n\n` +
            `💡 *Plus d'infos :* https://smartscalewebtech.netlify.app/\n\n` +
            `Répondez par le numéro correspondant ! 😊`
        );
    } else {
        console.log(`❌ Budget non reconnu: "${messageText}" de ${phoneNumber}`);
        await client.sendMessage(phoneNumber, 
            `Je n'ai pas compris votre choix de budget 🤔\n\n` +
            `Merci de sélectionner une fourchette :\n\n` +
            `${services[serviceChoice].budgets.map((budget, index) => `${index + 1}️⃣ ${budget}`).join('\n')}\n\n` +
            `💡 *Plus d'infos :* https://smartscalewebtech.netlify.app/\n\n` +
            `Vous pouvez répondre par "1", "deux", "third", etc. 😊`
        );
    }
}

// Autorité
async function handleAutorite(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    const autoriteChoice = parseUserChoice(messageText);
    
    if (autoriteChoice && autoriteChoice >= '1' && autoriteChoice <= '3') {
        const autoriteLabels = ['Décideur principal', 'Participant décision', 'Collecteur information'];
        const autoriteIndex = parseInt(autoriteChoice) - 1;
        conv.data.autorite = autoriteLabels[autoriteIndex];
        conv.step = 'timeline';
        
        console.log(`✅ Autorité sélectionnée: ${conv.data.autorite} pour ${phoneNumber}`);
        
        await client.sendMessage(phoneNumber, 
            `Noté ! 👍 Profil : *${conv.data.autorite}*\n\n` +
            `Dans quel délai souhaiteriez-vous voir ce projet se concrétiser ? ⏱️\n\n` +
            `1️⃣ 1 mois (Turbo +20%) 🚀\n` +
            `2️⃣ 2-3 mois (Standard) ⭐\n` +
            `3️⃣ 4-6 mois 📅\n` +
            `4️⃣ Plus tard dans l'année 🗓️\n` +
            `5️⃣ Pas de délai précis 🤷‍♂️\n\n` +
            `💡 *Plus d'infos :* https://smartscalewebtech.netlify.app/\n\n` +
            `Répondez par le numéro correspondant ! 😊`
        );
    } else {
        console.log(`❌ Autorité non reconnue: "${messageText}" de ${phoneNumber}`);
        await client.sendMessage(phoneNumber, 
            `Je n'ai pas compris votre rôle. Merci de sélectionner :\n\n` +
            `1️⃣ Oui, je suis le décideur principal\n` +
            `2️⃣ Je participe à la décision\n` +
            `3️⃣ Je collecte des informations pour mon équipe\n\n` +
            `Vous pouvez répondre par "1", "oui", "first", etc.`
        );
    }
}

// Timeline
async function handleTimeline(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    const timelineChoice = parseUserChoice(messageText);
    
    if (timelineChoice && timelineChoice >= '1' && timelineChoice <= '5') {
        const timelineLabels = ['1 mois', '2-3 mois', '4-6 mois', 'Plus tard', 'Pas de délai précis'];
        const timelineIndex = parseInt(timelineChoice) - 1;
        conv.data.timeline = timelineLabels[timelineIndex];
        conv.step = 'finalisation';
        
        // Calculer le score
        const score = calculateScore(conv.data);
        conv.data.score = score;
        
        console.log(`✅ Qualification terminée pour ${phoneNumber} - Score: ${score}/100`);
        
        // Sauvegarder le prospect
        saveProspect(phoneNumber, conv.data);
        
        // Envoyer la réponse appropriée
        await sendFinalResponse(phoneNumber, score, conv.data);
        
        // Réinitialiser la conversation
        conversations[phoneNumber] = {
            step: 'accueil',
            data: {},
            timestamp: new Date()
        };
        
    } else {
        console.log(`❌ Délai non reconnu: "${messageText}" de ${phoneNumber}`);
        await client.sendMessage(phoneNumber, 
            `Je n'ai pas compris votre délai. Merci de choisir un numéro :\n\n` +
            `1️⃣ 1 mois (Turbo +20%)\n` +
            `2️⃣ 2-3 mois (Standard)\n` +
            `3️⃣ 4-6 mois\n` +
            `4️⃣ Plus tard dans l'année\n` +
            `5️⃣ Pas de délai précis\n\n` +
            `Vous pouvez répondre par "1", "un", "premier", etc.`
        );
    }
}

// Message de bienvenue
async function sendWelcomeMessage(phoneNumber) {
    // NE PAS recréer la conversation si elle existe déjà
    if (!conversations[phoneNumber]) {
        conversations[phoneNumber] = {
            step: 'accueil',
            data: {},
            timestamp: new Date()
        };
    }
    
    // Réinitialiser seulement le flag d'accueil
    conversations[phoneNumber].data.welcomeSent = true;
    
    console.log(`🤖 Envoi du message d'accueil à ${phoneNumber}`);
    
    await client.sendMessage(phoneNumber, 
        `Bonjour ! 👋 Je suis l'assistant *SmartScale WebTech*.\n\n` +
        `Je vais vous qualifier rapidement pour vous connecter avec notre expert commercial. Les prix et durées que vous verrez sont des *estimations* - nous pourrons approfondir vos besoins lors de votre échange avec lui.\n\n` +
        `Quel est votre principal besoin ? 🚀\n\n` +
        `1️⃣ Site web professionnel 🌐\n` +
        `2️⃣ Solutions IA et automatisation 🤖\n` +
        `3️⃣ Marketing digital 📈\n\n` +
        `💡 *Plus de détails :* https://smartscalewebtech.netlify.app/\n\n` +
        `Répondez par le numéro de votre choix (ex: "1", "deux", "IA", etc.) 😊`
    );
}

// Calcul du score de qualification
function calculateScore(data) {
    let score = 0;
    
    // Score basé sur le service (Need)
    if (data.service === '2') score += 30; // IA = priorité
    else if (data.service === '1') score += 25; // Web
    else score += 20; // Marketing
    
    // Score basé sur le budget (Budget)
    if (data.budget && data.budget.includes('600K+') || data.budget.includes('1.2M') || data.budget.includes('3.5M')) {
        score += 25;
    } else if (data.budget && (data.budget.includes('500K') || data.budget.includes('600K'))) {
        score += 20;
    } else if (data.budget && (data.budget.includes('250K') || data.budget.includes('300K'))) {
        score += 15;
    } else {
        score += 10;
    }
    
    // Score basé sur l'autorité (Authority)
    if (data.autorite === 'Décideur principal') score += 25;
    else if (data.autorite === 'Participant décision') score += 15;
    else score += 5;
    
    // Score basé sur la timeline (Timeline) - DÉLAIS CORRECTS
    if (data.timeline === '1 mois') score += 25; // Turbo = meilleur score
    else if (data.timeline === '2-3 mois') score += 20; // Standard
    else if (data.timeline === '4-6 mois') score += 15;
    else if (data.timeline === 'Plus tard') score += 10;
    else score += 5;
    
    return score;
}

// Réponse finale basée sur le score
async function sendFinalResponse(phoneNumber, score, data) {
    const serviceName = services[data.service].name;
    
    if (score >= 70) {
        // Prospect TRÈS qualifié - transfert immédiat
        await client.sendMessage(phoneNumber, 
            `🎉 Fantastique ! Votre profil correspond parfaitement à nos services premium.\n\n` +
            `✅ *Récapitulatif de votre projet :*\n` +
            `🔹 Service : ${serviceName}\n` +
            `🔹 Solution : ${data.serviceType}\n` +
            `🔹 Budget : ${data.budget}\n` +
            `🔹 Délai : ${data.timeline}\n` +
            `🔹 Score de qualification : ${score}/100\n\n` +
            `🤝 *EXCELLENTE NOUVELLE !* Je vous transfère immédiatement vers notre expert commercial qui répondra à toutes vos questions et préoccupations :\n\n` +
            `👨‍💼 *Contact direct :* ${BUSINESS_WHATSAPP}\n\n` +
            `Il élaborera avec vous une solution personnalisée qui transformera votre business ! 🚀\n\n` +
            `💡 *Portfolio complet :* https://smartscalewebtech.netlify.app/`
        );
    } else if (score >= 50) {
        // Prospect MOYEN - encourager le contact
        await client.sendMessage(phoneNumber, 
            `Merci pour ces informations précieuses ! 👍\n\n` +
            `✅ *Votre projet nous intéresse :*\n` +
            `🔹 Service : ${serviceName}\n` +
            `🔹 Solution : ${data.serviceType}\n` +
            `🔹 Budget : ${data.budget}\n` +
            `🔹 Délai : ${data.timeline}\n\n` +
            `💡 Notre expert commercial est à votre disposition pour affiner votre projet et répondre à vos interrogations :\n\n` +
            `📱 *WhatsApp Business :* ${BUSINESS_WHATSAPP}\n\n` +
            `Il vous proposera une solution adaptée à vos besoins spécifiques ! 🎯\n\n` +
            `💡 *Plus d'exemples :* https://smartscalewebtech.netlify.app/`
        );
    } else {
        // Prospect FAIBLE - informer et laisser la porte ouverte
        await client.sendMessage(phoneNumber, 
            `Merci pour votre intérêt ! 🙏\n\n` +
            `Votre projet (${data.serviceType}, budget ${data.budget}) présente des opportunités intéressantes.\n\n` +
            `💡 Notre expert commercial reste disponible pour explorer ensemble les meilleures options et répondre à vos questions :\n\n` +
            `📱 *WhatsApp Business :* ${BUSINESS_WHATSAPP}\n\n` +
            `N'hésitez pas à le contacter quand vous serez prêt ! Nous sommes là pour vous accompagner. 😊\n\n` +
            `💡 *Découvrez nos réalisations :* https://smartscalewebtech.netlify.app/`
        );
    }
            `📱 WhatsApp : ${BUSINESS_WHATSAPP}\n\n` +
            `*Recontactez-nous quand vous aurez défini vos besoins plus précisément !*`
        );
    }
}

// Sauvegarde des prospects
function saveProspect(phoneNumber, data) {
    const prospect = {
        phoneNumber,
        timestamp: new Date().toISOString(),
        service: services[data.service].name,
        serviceType: data.serviceType,
        budget: data.budget,
        autorite: data.autorite,
        timeline: data.timeline,
        score: data.score
    };
    
    prospects.push(prospect);
    
    // Sauvegarde dans fichier
    fs.writeFileSync('./prospects.json', JSON.stringify(prospects, null, 2));
    
    console.log(`📊 Nouveau prospect qualifié (Score: ${data.score}/100):`, prospect);
}

// Dashboard web simple
app.get('/', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Dashboard - SmartScale WebTech Bot</title>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { background: #2563EB; color: white; padding: 20px; margin-bottom: 20px; }
            .stats { display: flex; gap: 20px; margin-bottom: 20px; }
            .stat { background: #f0f0f0; padding: 15px; border-radius: 5px; }
            .prospect { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; }
            .score-high { border-left: 5px solid #22c55e; }
            .score-medium { border-left: 5px solid #f59e0b; }
            .score-low { border-left: 5px solid #ef4444; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🤖 Dashboard SmartScale WebTech Bot</h1>
            <p>Prospects qualifiés en temps réel</p>
        </div>
        
        <div class="stats">
            <div class="stat">
                <h3>Total Prospects</h3>
                <p>${prospects.length}</p>
            </div>
            <div class="stat">
                <h3>Prospects Chauds</h3>
                <p>${prospects.filter(p => p.score >= 75).length}</p>
            </div>
            <div class="stat">
                <h3>Prospects Tièdes</h3>
                <p>${prospects.filter(p => p.score >= 50 && p.score < 75).length}</p>
            </div>
        </div>
        
        <h2>Derniers Prospects</h2>
        ${prospects.slice(-10).reverse().map(p => `
            <div class="prospect ${p.score >= 75 ? 'score-high' : p.score >= 50 ? 'score-medium' : 'score-low'}">
                <strong>Score: ${p.score}/100</strong> - ${p.phoneNumber}<br>
                <strong>Service:</strong> ${p.service} (${p.serviceType})<br>
                <strong>Budget:</strong> ${p.budget}<br>
                <strong>Autorité:</strong> ${p.autorite}<br>
                <strong>Délai:</strong> ${p.timeline}<br>
                <small>Date: ${new Date(p.timestamp).toLocaleString()}</small>
            </div>
        `).join('')}
    </body>
    </html>
    `;
    
    res.send(html);
});

app.get('/prospects.json', (req, res) => {
    res.json(prospects);
});

// Commande pour générer le code de jumelage
process.stdin.setEncoding('utf8');
process.stdin.on('data', (input) => {
    const command = input.toString().trim().toLowerCase();
    
    if (command === 'code' || command === 'pairing') {
        if (pairingCode) {
            console.log(`\n🔢 CODE DE JUMELAGE ACTUEL : ${pairingCode}`);
            console.log('⏱️ Ce code expire dans 2 minutes !');
        } else {
            console.log('\n❌ Aucun code de jumelage disponible.');
            console.log('Le code apparaît automatiquement au démarrage du bot.');
        }
    } else if (command === 'help' || command === 'aide') {
        console.log('\n📋 COMMANDES DISPONIBLES :');
        console.log('• code      - Afficher le code de jumelage');
        console.log('• help      - Afficher cette aide');
        console.log('• status    - Statut de la connexion');
        console.log('• prospects - Nombre de prospects');
    } else if (command === 'status') {
        console.log(`\n📊 STATUT DU BOT :`);
        console.log(`• Dashboard : http://localhost:${PORT}`);
        console.log(`• Prospects traités : ${prospects.length}`);
        console.log(`• WhatsApp Business : ${BUSINESS_WHATSAPP}`);
    } else if (command === 'prospects') {
        console.log(`\n👥 PROSPECTS : ${prospects.length} traités`);
        const chauds = prospects.filter(p => p.score >= 75).length;
        const tiedes = prospects.filter(p => p.score >= 50 && p.score < 75).length;
        console.log(`🔥 Chauds : ${chauds}`);
        console.log(`🟡 Tièdes : ${tiedes}`);
        console.log(`❄️ Froids : ${prospects.length - chauds - tiedes}`);
    }
});

// Chargement des prospects existants
if (fs.existsSync('./prospects.json')) {
    prospects = JSON.parse(fs.readFileSync('./prospects.json', 'utf8'));
}

// Démarrage
app.listen(PORT, () => {
    console.log(`📊 Dashboard démarré sur http://localhost:${PORT}`);
    console.log('\n💡 AIDE :');
    console.log('• Tapez "code" pour obtenir le code de jumelage');
    console.log('• Tapez "help" pour voir toutes les commandes');
});

client.initialize();