import { trackEvent } from "@/lib/analytics";

export default function ApplicationsSection() {
  const handleApplicationClick = (appName: string, price: number) => {
    trackEvent('click', 'application', appName);
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_name: appName,
        value: price,
        currency: 'XAF'
      });
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Applications Web sur Mesure
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Développement rapide ou avancé d'applications web (frontend ou full-stack), 
            avec accès complet au code et personnalisation totale.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pack Innovateur Express */}
          <div className="bg-gradient-to-br from-neutral-50 to-blue-50 rounded-2xl p-8 shadow-lg hover-lift border border-neutral-200">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-lightbulb text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Pack Innovateur Express</h3>
              <p className="text-neutral-600">Créer un prototype ou MVP fonctionnel</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">App web de base (formulaire, BDD)</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Espace client/admin</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Hébergement temporaire</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Code source (ZIP ou Git)</span>
              </li>
            </ul>
            
            <div className="text-2xl font-bold text-blue-600 mb-4">À partir de 250 000 FCFA</div>
            <button 
              onClick={() => handleApplicationClick('Pack Innovateur Express', 250000)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Demander un devis
            </button>
          </div>
          
          {/* Pack Solutions Pro */}
          <div className="bg-gradient-to-br from-neutral-50 to-green-50 rounded-2xl p-8 shadow-lg hover-lift border border-neutral-200">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-cogs text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Pack Solutions Pro</h3>
              <p className="text-neutral-600">Solutions complexes, sécurisées et évolutives</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">App full-stack (Node.js, Express, MongoDB)</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Intégration APIs, paiements</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Domaine personnalisé + SSL</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Déploiement professionnel</span>
              </li>
            </ul>
            
            <div className="text-2xl font-bold text-blue-600 mb-4">Sur devis</div>
            <button 
              onClick={() => handleApplicationClick('Pack Solutions Pro', 500000)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Demander un devis
            </button>
          </div>
          
          {/* Pack Accélérateur IA */}
          <div className="bg-gradient-to-br from-neutral-50 to-purple-50 rounded-2xl p-8 shadow-lg hover-lift border-2 border-purple-300 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              PREMIUM
            </div>
            
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-robot text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Pack Accélérateur IA</h3>
              <p className="text-neutral-600">Maximiser votre performance digitale</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Application Web personnalisée</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Optimisation UX/UI avancée</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Campagne Meta Ads premium</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Tracking avancé + IA</span>
              </li>
            </ul>
            
            <div className="text-2xl font-bold text-blue-600 mb-4">1 000 000+ FCFA</div>
            <button 
              onClick={() => handleApplicationClick('Pack Accélérateur IA', 1000000)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
