import { trackEvent } from "@/lib/analytics";

export default function PricingSection() {
  const handlePricingClick = (category: string) => {
    trackEvent('click', 'pricing', category);
    if (window.fbq) {
      window.fbq('track', 'Lead', { content_category: category });
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="tarifs" className="section-padding bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Tarifs Transparents et Compétitifs
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Des solutions adaptées à tous les budgets, du startup à l'entreprise établie.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sites Web Professionnels */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-laptop text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">Sites Web Professionnels</h3>
              <p className="text-neutral-600">HTML/CSS/JS ou WordPress</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-neutral-600">Pack Vitrine Code+</span>
                <span className="font-semibold text-blue-600">150K - 250K FCFA</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-neutral-600">Pack Visibilité Pro</span>
                <span className="font-semibold text-blue-600">250K - 350K FCFA</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-600">Pack Conquête Digitale</span>
                <span className="font-semibold text-blue-600">400K - 600K FCFA</span>
              </div>
            </div>
            
            <button 
              onClick={() => handlePricingClick('Sites Web')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Demander un devis
            </button>
          </div>
          
          {/* Applications Web */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-code text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">Applications Web</h3>
              <p className="text-neutral-600">Frontend ou Full-stack</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-neutral-600">Pack Innovateur Express</span>
                <span className="font-semibold text-green-600">À partir de 250K</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-neutral-600">Pack Solutions Pro</span>
                <span className="font-semibold text-green-600">Sur devis</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-600">Pack Accélérateur IA</span>
                <span className="font-semibold text-green-600">1M+ FCFA</span>
              </div>
            </div>
            
            <button 
              onClick={() => handlePricingClick('Applications Web')}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Demander un devis
            </button>
          </div>
          
          {/* Solutions IA */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-purple-300">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-robot text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-2">Solutions IA</h3>
              <p className="text-neutral-600">Automatisation intelligente</p>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-neutral-600">Pack IA Stratégique</span>
                <span className="font-semibold text-purple-600">À partir de 850K</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                <span className="text-neutral-600">Automatisation 70%</span>
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">INCLUS</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-neutral-600">Support premium</span>
                <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">INCLUS</span>
              </div>
            </div>
            
            <button 
              onClick={() => handlePricingClick('Solutions IA')}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Consultation gratuite
            </button>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-neutral-600 mb-4">
            Tous nos tarifs incluent la propriété totale du code et l'hébergement initial.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <i className="fas fa-check text-xs mr-1"></i>
              Code exportable
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              <i className="fas fa-shield-alt text-xs mr-1"></i>
              Paiement sécurisé
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              <i className="fas fa-headset text-xs mr-1"></i>
              Support inclus
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
