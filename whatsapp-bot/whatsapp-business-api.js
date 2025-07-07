// Alternative pour WhatsApp Business API
// Nécessite un token d'accès Meta Business

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3001;

// Configuration (à remplir avec vos données Meta)
const WHATSAPP_TOKEN = 'YOUR_WHATSAPP_TOKEN';
const VERIFY_TOKEN = 'YOUR_VERIFY_TOKEN';
const PHONE_NUMBER_ID = 'YOUR_PHONE_NUMBER_ID';

app.use(express.json());

// Vérification webhook Meta
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Réception des messages
app.post('/webhook', (req, res) => {
    const body = req.body;
    
    if (body.object === 'whatsapp_business_account') {
        body.entry.forEach(entry => {
            const changes = entry.changes;
            
            changes.forEach(change => {
                if (change.field === 'messages') {
                    const messages = change.value.messages;
                    
                    if (messages) {
                        messages.forEach(message => {
                            handleMessage(message);
                        });
                    }
                }
            });
        });
        
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// Gestion des messages
async function handleMessage(message) {
    const from = message.from;
    const text = message.text ? message.text.body : '';
    
    console.log(`Message reçu de ${from}: ${text}`);
    
    // Ici vous pouvez ajouter la même logique de qualification
    // que dans le bot.js principal
    
    // Réponse automatique
    await sendMessage(from, "Bonjour ! Je traite votre message...");
}

// Envoi de message
async function sendMessage(to, text) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: 'whatsapp',
                to: to,
                text: { body: text }
            },
            {
                headers: {
                    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('Message envoyé:', response.data);
    } catch (error) {
        console.error('Erreur envoi message:', error.response?.data || error.message);
    }
}

app.listen(PORT, () => {
    console.log(`Webhook WhatsApp Business API sur le port ${PORT}`);
});

// INSTRUCTIONS POUR CONFIGURATION:
// 1. Créer une app Facebook Developer
// 2. Configurer WhatsApp Business API
// 3. Obtenir les tokens d'accès
// 4. Configurer un webhook public (ngrok recommandé)
// 5. Remplacer les variables YOUR_* par vos vraies valeurs