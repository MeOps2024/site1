import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

interface FAQItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export default function AIFAQSection() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const handleContactClick = () => {
    trackEvent('click', 'contact', 'faq_contact');
    if (window.fbq) {
      window.fbq('track', 'Lead', { source: 'faq' });
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const faqData: FAQItem[] = [
    {
      id: 'chatbot',
      question: 'Comment fonctionnent vos Chatbots Intelligents ?',
      answer: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            <strong>Ce que c'est :</strong> Un agent conversationnel avec personnalité sur mesure qui représente votre marque 24h/7j.
          </p>
          
          <div>
            <p className="font-semibold text-gray-800 mb-2">Comment ça marche :</p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Formation sur vos données métier (services, prix, FAQ)</li>
              <li>• Personnalité adaptée à votre ton de communication</li>
              <li>• Mémoire des conversations précédentes avec chaque client</li>
              <li>• Réponses intelligentes basées sur le contexte</li>
              <li>• Escalade vers un humain quand nécessaire</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold text-blue-800 mb-2">Exemple concret :</p>
            <div className="text-blue-700 space-y-1 text-sm">
              <p><strong>Client :</strong> "Bonjour, je cherche un site e-commerce"</p>
              <p><strong>Bot :</strong> "Parfait ! Combien de produits souhaitez-vous vendre ?"</p>
              <p><strong>Client :</strong> "Environ 50 produits"</p>
              <p><strong>Bot :</strong> "Excellent. Pour 50 produits, notre solution commence à 350 000 FCFA. Souhaitez-vous que je vous mette en contact avec notre équipe pour un devis personnalisé ?"</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">Résultats garantis :</p>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• 80% de réduction du temps de réponse client</li>
              <li>• Qualification automatique des prospects</li>
              <li>• Disponibilité 24h/7j sans coût supplémentaire</li>
              <li>• Amélioration de l'expérience client</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'integration',
      question: 'Que comprend l\'Intégration Multi-Canaux ?',
      answer: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            <strong>Ce que c'est :</strong> Déploiement de votre agent IA sur tous vos canaux de communication existants.
          </p>
          
          <div>
            <p className="font-semibold text-gray-800 mb-2">Plateformes supportées :</p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• <strong>WhatsApp Business API :</strong> Chat direct avec vos clients</li>
              <li>• <strong>Telegram :</strong> Canaux et groupes d'entreprise</li>
              <li>• <strong>Widget site web :</strong> Chat intégré à votre site</li>
              <li>• <strong>Facebook Messenger :</strong> Pages entreprise</li>
              <li>• <strong>Instagram Direct :</strong> Messages privés</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="font-semibold text-green-800 mb-2">Exemple d'usage :</p>
            <div className="text-green-700 space-y-2 text-sm">
              <p>Un client vous contacte sur WhatsApp à 22h :</p>
              <p><strong>Client :</strong> "Combien coûte un site vitrine ?"</p>
              <p><strong>Bot :</strong> "Bonsoir ! Un site vitrine coûte entre 150 000 et 250 000 FCFA selon vos besoins. Voulez-vous que je calcule un devis personnalisé ?"</p>
              <p className="italic">→ Conversion immédiate même hors heures de bureau</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">Configuration technique :</p>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• API officielles sécurisées</li>
              <li>• Synchronisation des conversations entre plateformes</li>
              <li>• Tableau de bord unifié pour le suivi</li>
              <li>• Backup automatique des échanges</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">Bénéfices mesurables :</p>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• 300% d'augmentation des conversions hors heures</li>
              <li>• Temps de réponse : moins de 5 secondes</li>
              <li>• Réduction de 70% des appels téléphoniques</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'automation',
      question: 'Comment fonctionne l\'Automatisation Métier ?',
      answer: (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            <strong>Ce que c'est :</strong> Automatisation intelligente de vos processus métier pour maximiser votre efficacité.
          </p>
          
          <div>
            <p className="font-semibold text-gray-800 mb-2">1. Qualification Automatique de Prospects :</p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• Questions ciblées : budget, délais, besoins spécifiques</li>
              <li>• Scoring automatique des prospects (A, B, C)</li>
              <li>• Transmission immédiate des prospects qualifiés</li>
              <li>• Nurturing automatique des prospects non-prêts</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="font-semibold text-purple-800 mb-2">Exemple - Génération de Devis Automatique :</p>
            <div className="text-purple-700 space-y-2 text-sm">
              <p><strong>Bot :</strong> "Quel type de site souhaitez-vous ?"</p>
              <p><strong>Client :</strong> "E-commerce avec 30 produits"</p>
              <p><strong>Bot :</strong> "Souhaitez-vous un système de paiement intégré ?"</p>
              <p><strong>Client :</strong> "Oui, Mobile Money et cartes"</p>
              <p><strong>Système :</strong> Calcule automatiquement → 420 000 FCFA</p>
              <p><strong>Bot :</strong> "Voici votre devis personnalisé (PDF envoyé par email)"</p>
              <p className="italic">→ Devis généré en 2 minutes au lieu de 2 jours</p>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">2. Workflows Personnalisés :</p>
            <ul className="text-gray-600 space-y-2 ml-4">
              <li>• <strong>Suivi de projets :</strong> Notifications automatiques d'avancement</li>
              <li>• <strong>Relances intelligentes :</strong> Emails/SMS selon le comportement client</li>
              <li>• <strong>Gestion des rendez-vous :</strong> Calendrier synchronisé automatiquement</li>
              <li>• <strong>Facturation automatique :</strong> Génération et envoi à la livraison</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-gray-800 mb-2">ROI concret :</p>
            <ul className="text-gray-600 space-y-1 ml-4">
              <li>• Économie de 15-20h/semaine de travail administratif</li>
              <li>• 80% de prospects mieux qualifiés</li>
              <li>• Délai de devis réduit de 2 jours à 2 minutes</li>
              <li>• Taux de conversion augmenté de 40%</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="ai-faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Questions Fréquentes sur nos <span className="text-blue-600">Solutions IA</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez concrètement comment l'Intelligence Artificielle peut transformer votre business
          </p>
        </div>

        <div className="space-y-6">
          {faqData.map((faq) => (
            <div key={faq.id} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <button
                data-faq={faq.id}
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-xl font-bold text-gray-900 pr-4">{faq.question}</h3>
                <div className={`transform transition-transform duration-200 ${openFAQ === faq.id ? 'rotate-180' : ''}`}>
                  <i className="fas fa-chevron-down text-blue-600 text-lg"></i>
                </div>
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-8 pb-8 animate-fade-in-up">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Prêt à Automatiser Votre Business ?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Discutons de votre projet et voyons comment l'IA peut multiplier votre productivité
            </p>
            <button 
              onClick={handleContactClick}
              className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300"
            >
              Consultation Gratuite
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}