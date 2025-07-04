import { trackEvent } from "@/lib/analytics";

export default function AISection() {
  const handleAIConsultationClick = () => {
    trackEvent('click', 'ai_consultation', 'Pack IA Stratégique');
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_name: 'Pack IA Stratégique',
        value: 850000,
        currency: 'XAF'
      });
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-neutral-900 to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-green-600 rounded-full blur-2xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Solutions d'Automatisation IA Intelligente
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Exploitez la puissance de l'Intelligence Artificielle pour automatiser votre prospection, 
            votre acquisition client et votre analyse marketing.
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-yellow-400">
                Pack IA Stratégique – Automatisation 70% & Acquisition optimisée
              </h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-ad text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Campagnes publicitaires 100% assistées par IA</h4>
                    <p className="text-blue-100">Génération automatique de visuels, titres, descriptions avec tests A/B optimisés en temps réel.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-robot text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Modules IA intégrés</h4>
                    <p className="text-blue-100">Chatbots intelligents, formulaires dynamiques avec scoring automatique et préqualification client.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <i className="fas fa-chart-line text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Tracking & Analyse Automatisée</h4>
                    <p className="text-blue-100">Intégration complète Meta Pixel + Conversion API avec recommandations stratégiques IA.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="text-3xl font-bold text-yellow-400">À partir de 850 000 FCFA</div>
                <button 
                  onClick={handleAIConsultationClick}
                  className="bg-yellow-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-colors text-center"
                >
                  Demander une consultation
                </button>
              </div>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Intelligence artificielle et automatisation marketing" 
                className="rounded-2xl shadow-2xl w-full h-auto"
                loading="lazy" 
              />
              
              <div className="mt-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <h4 className="text-xl font-bold mb-4 text-yellow-400">Résultat garanti</h4>
                <p className="text-blue-100">
                  <strong>Moins d'effort, plus d'efficacité.</strong><br/>
                  Rentabilité mesurable dès la 1ère campagne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
