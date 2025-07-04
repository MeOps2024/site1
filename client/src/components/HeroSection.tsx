import { trackEvent } from "@/lib/analytics";

export default function HeroSection() {
  const handleCTAClick = () => {
    trackEvent('click', 'cta', 'hero_discover_services');
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePhoneClick = () => {
    trackEvent('click', 'contact', 'hero_phone');
    if (window.fbq) {
      window.fbq('track', 'Contact', { contact_method: 'phone' });
    }
  };

  return (
    <section id="accueil" className="min-h-screen flex items-center gradient-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Votre <span className="text-yellow-400">Présence Digitale</span><br/>
              Professionnelle au Cameroun
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Développement de sites web, applications sur mesure et solutions d'automatisation IA. 
              Code 100% exportable et administrable pour votre indépendance technologique.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={handleCTAClick}
                className="bg-yellow-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition-all duration-300 text-center inline-flex items-center justify-center space-x-2"
              >
                <span>Découvrir nos Services</span>
                <i className="fas fa-arrow-right"></i>
              </button>
              <a 
                href="tel:+237686577791" 
                onClick={handlePhoneClick}
                className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 text-center inline-flex items-center justify-center space-x-2"
              >
                <i className="fas fa-phone"></i>
                <span>+237 686 577 791</span>
              </a>
            </div>
            
            <div className="flex items-center space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <i className="fas fa-check-circle text-yellow-400"></i>
                <span>Code Exportable</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-shield-alt text-yellow-400"></i>
                <span>100% Sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-mobile-alt text-yellow-400"></i>
                <span>Responsive</span>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-in-right">
            <img 
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Développement web professionnel et solutions digitales" 
              className="rounded-2xl shadow-2xl w-full h-auto"
              loading="lazy" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
