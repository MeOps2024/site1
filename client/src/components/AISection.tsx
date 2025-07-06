import { trackEvent } from "@/lib/analytics";

export default function AISection() {
  const handleLearnMoreClick = (service: string) => {
    trackEvent('click', 'learn_more', `ai_service_${service}`);
    if (window.fbq) {
      window.fbq('track', 'ViewContent', { service_type: service });
    }
    // Scroll to FAQ section and open the corresponding FAQ
    const faqElement = document.getElementById('ai-faq');
    if (faqElement) {
      faqElement.scrollIntoView({ behavior: 'smooth' });
      // Trigger the FAQ to open after scrolling
      setTimeout(() => {
        const faqButton = document.querySelector(`[data-faq="${service}"]`) as HTMLButtonElement;
        if (faqButton) {
          faqButton.click();
        }
      }, 800);
    }
  };

  const handleContactClick = (service: string) => {
    trackEvent('click', 'contact', `ai_service_${service}`);
    if (window.fbq) {
      window.fbq('track', 'Lead', { service_type: service });
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="ia-solutions" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Solutions <span className="text-blue-600">Intelligence Artificielle</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Automatisez vos processus métier avec des solutions IA sur mesure. 
            Indépendant ou intégré à vos projets existants pour multiplier votre productivité.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Chatbots Intelligents */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <i className="fas fa-robot text-2xl text-blue-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Chatbots Intelligents</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Agents conversationnels avec personnalité sur mesure. Répondent automatiquement 
              à vos clients et qualifient les prospects 24h/7j.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Mémoire conversationnelle avancée
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Personnalité adaptée à votre marque
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Formation sur vos données métier
              </li>
            </ul>
            <div className="space-y-3">
              <button 
                onClick={() => handleLearnMoreClick('chatbot')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                En Savoir Plus
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="/devis"
                  className="bg-blue-100 text-blue-700 py-3 rounded-lg font-semibold hover:bg-blue-200 transition-colors text-center text-sm"
                >
                  Devis
                </a>
                <a 
                  href="https://wa.me/237686577791?text=Bonjour%20!%20Je%20suis%20intéressé(e)%20par%20vos%20Chatbots%20Intelligents.%20Pouvez-vous%20me%20donner%20plus%20d'informations%20?"
                  target="_blank"
                  onClick={() => {
                    if (window.fbq) {
                      window.fbq('track', 'Lead', {
                        content_name: 'Chatbots Intelligents',
                        contact_method: 'whatsapp',
                        service_type: 'Chatbots IA',
                        value: 500000,
                        currency: 'XAF'
                      });
                    }
                  }}
                  className="bg-green-100 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-200 transition-colors text-center text-sm flex items-center justify-center"
                >
                  <i className="fab fa-whatsapp mr-1"></i> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Intégration Multi-Canaux */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-100">
            <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <i className="fas fa-comments text-2xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Intégration Multi-Canaux</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Déployez vos agents IA sur WhatsApp, Telegram, votre site web 
              et tous vos canaux de communication existants.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                WhatsApp Business API
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Telegram et autres plateformes
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Widget site web personnalisé
              </li>
            </ul>
            <div className="space-y-3">
              <button 
                onClick={() => handleLearnMoreClick('integration')}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                En Savoir Plus
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="/devis"
                  className="bg-green-100 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-200 transition-colors text-center text-sm"
                >
                  Devis
                </a>
                <a 
                  href="https://wa.me/237686577791?text=Bonjour%20!%20Je%20suis%20intéressé(e)%20par%20votre%20Intégration%20Multi-Canaux.%20Pouvez-vous%20me%20donner%20plus%20d'informations%20?"
                  target="_blank"
                  onClick={() => {
                    if (window.fbq) {
                      window.fbq('track', 'Lead', {
                        content_name: 'Intégration Multi-Canaux',
                        contact_method: 'whatsapp',
                        service_type: 'Intégration IA',
                        value: 725000,
                        currency: 'XAF'
                      });
                    }
                  }}
                  className="bg-green-100 text-green-700 py-3 rounded-lg font-semibold hover:bg-green-200 transition-colors text-center text-sm flex items-center justify-center"
                >
                  <i className="fab fa-whatsapp mr-1"></i> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Automatisation Métier */}
          <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100">
            <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <i className="fas fa-cogs text-2xl text-purple-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Automatisation Métier</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Qualification automatique de leads, génération de devis en temps réel 
              et processus métier intelligents.
            </p>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Qualification automatique de prospects
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Génération de devis intelligente
              </li>
              <li className="flex items-center">
                <i className="fas fa-check text-green-500 mr-2"></i>
                Workflows personnalisés
              </li>
            </ul>
            <div className="space-y-3">
              <button 
                onClick={() => handleLearnMoreClick('automation')}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                En Savoir Plus
              </button>
              <div className="grid grid-cols-2 gap-2">
                <a 
                  href="/devis"
                  className="bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200 transition-colors text-center text-sm"
                >
                  Devis
                </a>
                <a 
                  href="https://wa.me/237686577791?text=Bonjour%20!%20Je%20suis%20intéressé(e)%20par%20votre%20Automatisation%20Métier.%20Pouvez-vous%20me%20donner%20plus%20d'informations%20?"
                  target="_blank"
                  onClick={() => {
                    if (window.fbq) {
                      window.fbq('track', 'Lead', {
                        content_name: 'Automatisation Métier',
                        contact_method: 'whatsapp',
                        service_type: 'Automatisation IA',
                        value: 975000,
                        currency: 'XAF'
                      });
                    }
                  }}
                  className="bg-purple-100 text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-200 transition-colors text-center text-sm flex items-center justify-center"
                >
                  <i className="fab fa-whatsapp mr-1"></i> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing IA */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Solutions IA Sur Mesure
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Indépendant ou intégré à vos projets d'application ou de site, 
            pour gagner en temps et en productivité
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                400 000 FCFA
              </div>
              <div className="text-blue-100">Chatbot simple</div>
            </div>
            <div className="text-2xl text-yellow-400 font-bold">~</div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">
                3 500 000 FCFA
              </div>
              <div className="text-blue-100">Suite complète</div>
            </div>
          </div>
          <button 
            onClick={() => handleContactClick('pricing')}
            className="mt-8 bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300"
          >
            Demander un Devis Gratuit
          </button>
        </div>
      </div>
    </section>
  );
}