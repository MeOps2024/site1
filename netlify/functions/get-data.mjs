
export const handler = async (event, context) => {
  try {
    // Configuration CORS
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Content-Type': 'application/json'
    };

    // Gérer les requêtes OPTIONS (preflight)
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      };
    }

    // Données des packs de services
    const servicePacks = {
      web: {
        vitrine: {
          name: "Pack Vitrine Code+",
          price: "150 000 – 250 000 FCFA",
          features: [
            "3 à 5 pages (HTML/CSS/JS Vite/TypeScript Node.js ou WordPress)",
            "Design responsive et moderne",
            "Hébergement web 1 an + accès FTP",
            "Contenu intégré + formulaire de contact",
            "Fiche technique + accès au code source",
            "Mini-formation de 15~45 min à la gestion du site"
          ]
        },
        visibilite: {
          name: "Pack Visibilité Pro Code+",
          price: "250 000 ~ 350 000 FCFA",
          features: [
            "Tout le contenu du Pack Vitrine (7 à 10 pages)",
            "Nom de domaine personnalisé (1 an) + SSL",
            "Optimisation légère SEO & performance"
          ]
        },
        conquete: {
          name: "Pack Conquête Digitale Code+",
          price: "400 000 ~ 600 000 FCFA (Inclus budget pub)",
          features: [
            "Tout le contenu du Pack Visibilité Pro",
            "Campagne Meta Ads (1 mois) ciblée",
            "Création de visuels/post",
            "Suivi simple de la campagne (A/B testing, pixel, CPC, leads)"
          ]
        }
      },
      applications: {
        express: {
          name: "Pack Innovateur Express",
          price: "À partir de 250 000 FCFA",
          features: [
            "App web de base (formulaire, base de données, espace client)",
            "Hébergement temporaire + accès code (ZIP ou Git)",
            "Déploiement facile sur la plateforme de votre choix"
          ]
        },
        pro: {
          name: "Pack Solutions Pro",
          price: "Tarif selon complexité",
          features: [
            "App web full-stack (Node.js, Express, MongoDB, etc.)",
            "Intégration de services tiers (APIs, paiements, tableaux de bord, sécurité)",
            "Domaine personnalisé + SSL",
            "Accès complet au code et déploiement pro"
          ]
        },
        accelerateur: {
          name: "Pack Accélérateur & Optimisation via IA",
          price: "1 000 000+ FCFA",
          features: [
            "Application Web personnalisée",
            "Optimisation des performances UX/UI, référencement et structure",
            "Campagne Meta Ads premium avec tracking avancé (Meta Pixel, API Conversion, événements personnalisés)"
          ]
        }
      },
      ia: {
        strategique: {
          name: "Pack IA Stratégique – Automatisation 70% & Acquisition optimisée",
          price: "À partir de 850 000 FCFA",
          features: [
            "Campagnes publicitaires 100% assistées par IA",
            "Génération automatique de visuels, titres, descriptions",
            "Tests A/B optimisés en temps réel",
            "Budgets intelligents : l'IA réaffecte les dépenses selon les performances",
            "Création de pages web ou apps intégrant des modules IA",
            "Chatbots intelligents entraînés sur vos offres",
            "Formulaires dynamiques (scoring automatique, préqualification)",
            "Systèmes de rappel, relance client ou conversion pilotée",
            "Tracking & Analyse Automatisée",
            "Intégration complète Meta Pixel + Conversion API",
            "Tableau de bord de suivi en temps réel",
            "Recommandations stratégiques IA pour améliorer vos KPIs"
          ]
        }
      }
    };

    // Gérer différents types de requêtes
    const { queryStringParameters } = event;
    const category = queryStringParameters?.category;
    const pack = queryStringParameters?.pack;

    let responseData;

    if (category && pack) {
      // Récupérer un pack spécifique
      responseData = servicePacks[category]?.[pack] || null;
    } else if (category) {
      // Récupérer tous les packs d'une catégorie
      responseData = servicePacks[category] || null;
    } else {
      // Récupérer tous les packs
      responseData = servicePacks;
    }

    if (!responseData) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Data not found' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        data: responseData,
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Error in get-data function:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
