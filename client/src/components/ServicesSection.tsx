import { trackEvent } from "@/lib/analytics";
import { useMetaPixel, useSectionTracking } from "@/hooks/use-meta-pixel";

export default function ServicesSection() {
  const { trackServiceInterest } = useMetaPixel();
  useSectionTracking('Services');

  const handleServiceClick = (serviceName: string, price: number) => {
    trackEvent('click', 'service', serviceName);
    trackServiceInterest(serviceName, `${price} FCFA`);
    
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
            Solutions Web <span className="text-blue-600">Optimisées pour la Productivité</span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Présence digitale automatisée qui convertit 24h/7j, boutiques intelligentes avec assistance IA, 
            et outils métier qui automatisent vos processus pour maximiser votre efficacité.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pack Vitrine Code+ */}
          <div className="service-card">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-laptop-code text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Présence Digitale Automatisée</h3>
              <p className="text-neutral-600">Vitrine qui convertit vos visiteurs 24h/7j</p>
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
            <a 
              href="https://wa.me/237686577791?text=Bonjour%20!%20Je%20suis%20intéressé(e)%20par%20votre%20Pack%20Présence%20Digitale%20Automatisée%20(150-250K%20FCFA).%20Pouvez-vous%20me%20donner%20plus%20d'informations%20?"
              target="_blank"
              onClick={() => {
                if (window.fbq) {
                  window.fbq('track', 'Lead', {
                    content_name: 'Pack Présence Digitale',
                    contact_method: 'whatsapp',
                    service_type: 'Site Web Vitrine',
                    value: 200000,
                    currency: 'XAF'
                  });
                }
              }}
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Choisir ce pack
            </a>
          </div>
          
          {/* Pack Visibilité Pro Code+ */}
          <div className="service-card">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center mb-4">
                <i className="fas fa-globe text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Boutique Intelligente</h3>
              <p className="text-neutral-600">E-commerce avec assistance IA intégrée</p>
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
            <a 
              href="https://wa.me/237686577791?text=Bonjour%20!%20Je%20suis%20intéressé(e)%20par%20votre%20Pack%20Boutique%20Intelligente%20(250-350K%20FCFA).%20Pouvez-vous%20me%20donner%20plus%20d'informations%20?"
              target="_blank"
              onClick={() => {
                if (window.fbq) {
                  window.fbq('track', 'Lead', {
                    content_name: 'Pack Boutique Intelligente',
                    contact_method: 'whatsapp',
                    service_type: 'Site E-commerce',
                    value: 300000,
                    currency: 'XAF'
                  });
                }
              }}
              className="block w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
            >
              Choisir ce pack
            </a>
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
              <h3 className="text-xl font-bold text-neutral-800 mb-2">Outils Métier Automatisés</h3>
              <p className="text-neutral-600">Applications qui automatisent vos processus</p>
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
            <a 
              href="https://wa.me/237686577791?text=Bonjour%20!%20Je%20suis%20intéressé(e)%20par%20votre%20Pack%20Conquête%20Digitale%20Code+%20(400-600K%20FCFA).%20Pouvez-vous%20me%20donner%20plus%20d'informations%20?"
              target="_blank"
              onClick={() => {
                if (window.fbq) {
                  window.fbq('track', 'Lead', {
                    content_name: 'Pack Conquête Digitale',
                    contact_method: 'whatsapp',
                    service_type: 'Marketing Digital',
                    value: 500000,
                    currency: 'XAF'
                  });
                }
              }}
              className="block w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors text-center"
            >
              Choisir ce pack
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
