import { trackEvent } from "@/lib/analytics";

export default function ServicesSection() {
  const handleServiceClick = (serviceName: string, price: number) => {
    trackEvent('click', 'service', serviceName);
    if (window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_name: serviceName,
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
    <section id="services" className="section-padding bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Nos Solutions Web Professionnelles
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            De la vitrine simple aux applications complexes avec IA, nous créons vos outils digitaux 
            avec un code 100% exportable et une propriété totale.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pack Vitrine Code+ */}
          <div className="service-card">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-laptop-code text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Pack Vitrine Code+</h3>
              <p className="text-neutral-600">Présence professionnelle rapide et efficace</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">3 à 5 pages (HTML/CSS/JS ou WordPress)</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Design responsive et moderne</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Hébergement web 1 an + accès FTP</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Formulaire de contact intégré</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Code source accessible</span>
              </li>
            </ul>
            
            <div className="text-2xl font-bold text-blue-600 mb-4">150 000 - 250 000 FCFA</div>
            <button 
              onClick={() => handleServiceClick('Pack Vitrine Code+', 200000)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Choisir ce pack
            </button>
          </div>
          
          {/* Pack Visibilité Pro Code+ */}
          <div className="service-card">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-globe text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Pack Visibilité Pro Code+</h3>
              <p className="text-neutral-600">Améliorer votre image de marque</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Tout le Pack Vitrine + 7-10 pages</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Nom de domaine personnalisé + SSL</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Optimisation SEO & performance</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Analytics intégrés</span>
              </li>
            </ul>
            
            <div className="text-2xl font-bold text-blue-600 mb-4">250 000 - 350 000 FCFA</div>
            <button 
              onClick={() => handleServiceClick('Pack Visibilité Pro Code+', 300000)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Choisir ce pack
            </button>
          </div>
          
          {/* Pack Conquête Digitale Code+ */}
          <div className="service-card-featured">
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              POPULAIRE
            </div>
            
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-rocket text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Pack Conquête Digitale Code+</h3>
              <p className="text-neutral-600">Présence + Acquisition client dès le lancement</p>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Tout le Pack Visibilité Pro</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Campagne Meta Ads (1 mois) ciblée</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Création de visuels/posts</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-check text-green-600 text-sm"></i>
                <span className="text-sm text-neutral-600">Suivi campagne (A/B testing, CPC)</span>
              </li>
            </ul>
            
            <div className="text-2xl font-bold text-blue-600 mb-4">400 000 - 600 000 FCFA</div>
            <button 
              onClick={() => handleServiceClick('Pack Conquête Digitale Code+', 500000)}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
            >
              Choisir ce pack
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
