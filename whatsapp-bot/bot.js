const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = 3001;
const app = express();

// Données de qualification
const services = {
    '1': {
        name: 'Site web professionnel',
        budgets: ['150K - 250K FCFA', '250K - 500K FCFA', '500K - 600K FCFA'],
        types: ['Site vitrine', 'Site e-commerce', 'Application web']
    },
    '2': {
        name: 'Solutions IA et automatisation',
        budgets: ['400K - 600K FCFA', '600K - 1.2M FCFA', '1.2M - 3.5M FCFA'],
        types: ['Chatbot simple', 'Automatisation métier', 'IA conversationnelle']
    },
    '3': {
        name: 'Marketing digital',
        budgets: ['150K - 300K FCFA', '300K - 600K FCFA', '600K+ FCFA'],
        types: ['Meta Ads', 'SEO', 'Stratégie complète']
    }
};

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

// Génération du QR code
client.on('qr', (qr) => {
    console.log('📱 Scannez ce QR code avec WhatsApp sur votre téléphone :');
    qrcode.generate(qr, { small: true });
});

// Connexion établie
client.on('ready', () => {
    console.log('✅ Bot WhatsApp SmartScale WebTech démarré !');
    console.log('🌐 Dashboard disponible sur : http://localhost:' + PORT);
});

// Gestion des messages
client.on('message', async (message) => {
    if (message.from.includes('@g.us')) return; // Ignorer les groupes
    
    const phoneNumber = message.from;
    const messageText = message.body.trim();
    
    // Initialiser la conversation si nécessaire
    if (!conversations[phoneNumber]) {
        conversations[phoneNumber] = {
            step: 'accueil',
            data: {},
            timestamp: new Date()
        };
    }
    
    await handleConversation(phoneNumber, messageText, message);
});

// Logique de conversation
async function handleConversation(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    
    try {
        switch (conv.step) {
            case 'accueil':
                await handleAccueil(phoneNumber, messageText, message);
                break;
            case 'service_details':
                await handleServiceDetails(phoneNumber, messageText, message);
                break;
            case 'budget':
                await handleBudget(phoneNumber, messageText, message);
                break;
            case 'autorite':
                await handleAutorite(phoneNumber, messageText, message);
                break;
            case 'timeline':
                await handleTimeline(phoneNumber, messageText, message);
                break;
            case 'finalisation':
                await handleFinalisation(phoneNumber, messageText, message);
                break;
            default:
                await sendWelcomeMessage(phoneNumber);
        }
    } catch (error) {
        console.error('Erreur dans la conversation:', error);
        await client.sendMessage(phoneNumber, "Désolé, une erreur s'est produite. Tapez 'recommencer' pour redémarrer.");
    }
}

// Accueil
async function handleAccueil(phoneNumber, messageText, message) {
    if (messageText.toLowerCase().includes('recommencer') || !conversations[phoneNumber].data.service) {
        await sendWelcomeMessage(phoneNumber);
        return;
    }
    
    const serviceChoice = messageText.trim();
    
    if (services[serviceChoice]) {
        conversations[phoneNumber].data.service = serviceChoice;
        conversations[phoneNumber].step = 'service_details';
        
        const service = services[serviceChoice];
        const options = service.types.map((type, index) => `${index + 1}️⃣ ${type}`).join('\n');
        
        await client.sendMessage(phoneNumber, 
            `Excellent ! Vous vous intéressez à : *${service.name}*\n\n` +
            `Quel type de projet vous intéresse le plus ?\n\n${options}\n\n` +
            `Répondez simplement par le numéro de votre choix.`
        );
    } else {
        await client.sendMessage(phoneNumber, 
            `Merci pour votre réponse. Pourriez-vous choisir un numéro entre 1 et 3 ?\n\n` +
            `1️⃣ Site web professionnel\n` +
            `2️⃣ Solutions IA et automatisation\n` +
            `3️⃣ Marketing digital`
        );
    }
}

// Détails du service
async function handleServiceDetails(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    const serviceChoice = conv.data.service;
    const typeChoice = parseInt(messageText.trim());
    
    if (typeChoice >= 1 && typeChoice <= 3) {
        conv.data.serviceType = services[serviceChoice].types[typeChoice - 1];
        conv.step = 'budget';
        
        const budgetOptions = services[serviceChoice].budgets.map((budget, index) => 
            `${index + 1}️⃣ ${budget}`
        ).join('\n');
        
        await client.sendMessage(phoneNumber, 
            `Parfait ! Vous souhaitez : *${conv.data.serviceType}*\n\n` +
            `Quel est votre budget envisagé pour ce projet ?\n\n${budgetOptions}\n\n` +
            `Répondez par le numéro correspondant.`
        );
    } else {
        await client.sendMessage(phoneNumber, 
            `Merci de choisir un numéro entre 1 et 3 pour préciser votre besoin.`
        );
    }
}

// Budget
async function handleBudget(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    const serviceChoice = conv.data.service;
    const budgetChoice = parseInt(messageText.trim());
    
    if (budgetChoice >= 1 && budgetChoice <= 3) {
        conv.data.budget = services[serviceChoice].budgets[budgetChoice - 1];
        conv.step = 'autorite';
        
        await client.sendMessage(phoneNumber, 
            `Très bien ! Budget retenu : *${conv.data.budget}*\n\n` +
            `Êtes-vous la personne qui prend les décisions pour ce type de projet dans votre entreprise ?\n\n` +
            `1️⃣ Oui, je suis le décideur principal\n` +
            `2️⃣ Je participe à la décision\n` +
            `3️⃣ Je collecte des informations pour mon équipe`
        );
    } else {
        await client.sendMessage(phoneNumber, 
            `Merci de choisir un numéro entre 1 et 3 pour votre fourchette budgétaire.`
        );
    }
}

// Autorité
async function handleAutorite(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    const autoriteChoice = parseInt(messageText.trim());
    
    if (autoriteChoice >= 1 && autoriteChoice <= 3) {
        const autoriteLabels = ['Décideur principal', 'Participant décision', 'Collecteur information'];
        conv.data.autorite = autoriteLabels[autoriteChoice - 1];
        conv.step = 'timeline';
        
        await client.sendMessage(phoneNumber, 
            `Noté ! Profil : *${conv.data.autorite}*\n\n` +
            `Dans quel délai souhaiteriez-vous voir ce projet se concrétiser ?\n\n` +
            `1️⃣ Dans les 3 prochains mois\n` +
            `2️⃣ Dans les 6 prochains mois\n` +
            `3️⃣ Plus tard dans l'année\n` +
            `4️⃣ Pas de délai précis`
        );
    } else {
        await client.sendMessage(phoneNumber, 
            `Merci de choisir un numéro entre 1 et 3 pour préciser votre rôle.`
        );
    }
}

// Timeline
async function handleTimeline(phoneNumber, messageText, message) {
    const conv = conversations[phoneNumber];
    const timelineChoice = parseInt(messageText.trim());
    
    if (timelineChoice >= 1 && timelineChoice <= 4) {
        const timelineLabels = ['3 mois', '6 mois', 'Plus tard', 'Pas de délai'];
        conv.data.timeline = timelineLabels[timelineChoice - 1];
        conv.step = 'finalisation';
        
        // Calculer le score
        const score = calculateScore(conv.data);
        conv.data.score = score;
        
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
        await client.sendMessage(phoneNumber, 
            `Merci de choisir un numéro entre 1 et 4 pour le délai.`
        );
    }
}

// Message de bienvenue
async function sendWelcomeMessage(phoneNumber) {
    conversations[phoneNumber] = {
        step: 'accueil',
        data: {},
        timestamp: new Date()
    };
    
    await client.sendMessage(phoneNumber, 
        `Bonjour ! Je suis l'assistant virtuel de *SmartScale WebTech*.\n\n` +
        `Je vais vous poser quelques questions pour mieux comprendre votre projet et vous orienter vers la meilleure solution.\n\n` +
        `Quel est votre principal besoin ?\n\n` +
        `1️⃣ Site web professionnel\n` +
        `2️⃣ Solutions IA et automatisation\n` +
        `3️⃣ Marketing digital\n\n` +
        `Répondez simplement par le numéro de votre choix.`
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
    
    // Score basé sur la timeline (Timeline)
    if (data.timeline === '3 mois') score += 20;
    else if (data.timeline === '6 mois') score += 15;
    else if (data.timeline === 'Plus tard') score += 10;
    else score += 5;
    
    return score;
}

// Réponse finale basée sur le score
async function sendFinalResponse(phoneNumber, score, data) {
    const serviceName = services[data.service].name;
    
    if (score >= 75) {
        // Prospect CHAUD
        await client.sendMessage(phoneNumber, 
            `🎯 *Excellent !* Votre projet de *${serviceName}* correspond parfaitement à notre expertise.\n\n` +
            `*Votre profil :*\n` +
            `• Service : ${data.serviceType}\n` +
            `• Budget : ${data.budget}\n` +
            `• Délai : ${data.timeline}\n\n` +
            `Je vous propose un rendez-vous avec notre équipe technique pour étudier votre projet en détail.\n\n` +
            `📞 Appelez-nous au : +237 686 577 791\n` +
            `📧 Email : launlaferdlance2025@gmail.com\n\n` +
            `*Mentionnez le code : QUAL-${Date.now().toString().slice(-4)} pour un suivi prioritaire.*`
        );
    } else if (score >= 50) {
        // Prospect TIÈDE
        await client.sendMessage(phoneNumber, 
            `👍 *Intéressant !* Votre projet de *${serviceName}* est réalisable.\n\n` +
            `*Votre profil :*\n` +
            `• Service : ${data.serviceType}\n` +
            `• Budget : ${data.budget}\n` +
            `• Délai : ${data.timeline}\n\n` +
            `Je vous invite à consulter nos réalisations sur notre site web pour mieux évaluer notre expertise.\n\n` +
            `🌐 Site web : https://smartscalewebtech.netlify.app\n` +
            `📞 Contact : +237 686 577 791\n\n` +
            `*N'hésitez pas à nous recontacter quand votre projet sera plus précis !*`
        );
    } else {
        // Prospect FROID
        await client.sendMessage(phoneNumber, 
            `📚 *Merci* pour votre intérêt pour *${serviceName}* !\n\n` +
            `Votre projet est encore en phase de réflexion, ce qui est parfaitement normal.\n\n` +
            `Je vous invite à consulter nos ressources gratuites :\n\n` +
            `🌐 Site web : https://smartscalewebtech.netlify.app\n` +
            `📱 WhatsApp : +237 686 577 791\n\n` +
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

// Chargement des prospects existants
if (fs.existsSync('./prospects.json')) {
    prospects = JSON.parse(fs.readFileSync('./prospects.json', 'utf8'));
}

// Démarrage
app.listen(PORT, () => {
    console.log(`📊 Dashboard démarré sur http://localhost:${PORT}`);
});

client.initialize();