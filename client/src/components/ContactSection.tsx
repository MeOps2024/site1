import { useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import { useMetaPixel, useSectionTracking } from "@/hooks/use-meta-pixel";

export default function ContactSection() {
  const { trackFormStart, trackContactAttempt, trackConversion, trackLead } = useMetaPixel();
  useSectionTracking('Contact');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
    consent: false
  });

  // Pre-select service based on URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedService = urlParams.get('service');
    if (selectedService) {
      setFormData(prev => ({
        ...prev,
        service: selectedService
      }));
    }
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Track form start on first input
    if (name === 'firstName' && value.length === 1) {
      trackFormStart('contact_form');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation côté client
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.consent) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      console.error('Champs requis manquants');
      return;
    }

    try {
      console.log('Form data being submitted:', formData);
      
      // Track form submission attempt
      trackEvent('form_submit', 'contact', 'contact_form');
      trackLead({
        service: formData.service,
        budget: formData.budget,
        method: 'contact_form'
      });

      // Submit to Netlify Forms
      const formBody = new URLSearchParams();
      formBody.append('form-name', 'contact');
      Object.entries(formData).forEach(([key, value]) => {
        formBody.append(key, value.toString());
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          budget: '',
          message: '',
          consent: false
        });
        
        // Track successful submission with enhanced data
        trackConversion('Contact Form Submission', {
          service: formData.service,
          budget: formData.budget,
          email: formData.email
        });
      } else {
        console.error('Response status:', response.status);
        console.error('Response text:', await response.text());
        throw new Error(`Form submission failed: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactClick = (method: string) => {
    trackEvent('click', 'contact', method);
    trackContactAttempt(method, 'contact_section');
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Prêt à Démarrer Votre Projet ?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Contactez-nous dès aujourd'hui pour une consultation gratuite et un devis personnalisé.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Parlons de votre projet</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Téléphone</div>
                    <a 
                      href="tel:+237686577791" 
                      className="text-blue-100 hover:text-white transition-colors"
                      onClick={() => handleContactClick('phone')}
                    >
                      +237 686 577 791
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <a 
                      href="mailto:launlaferdlance2025@gmail.com" 
                      className="text-blue-100 hover:text-white transition-colors"
                      onClick={() => handleContactClick('email')}
                    >
                      launlaferdlance2025@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div>
                    <div className="font-semibold">Localisation</div>
                    <div className="text-blue-100">Cameroun</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <div className="text-sm text-blue-100 mb-4">Suivez-nous sur les réseaux sociaux</div>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                    <i className="fab fa-facebook-f text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                    <i className="fab fa-linkedin-in text-white"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                    <i className="fab fa-twitter text-white"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="space-y-4">
              <h4 className="font-bold text-neutral-800">Actions rapides</h4>
              <div className="flex flex-col space-y-3">
                <a 
                  href="tel:+237686577791" 
                  className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                  onClick={() => handleContactClick('phone_direct')}
                >
                  <i className="fas fa-phone text-green-600"></i>
                  <span className="text-green-700 font-medium">Appeler maintenant</span>
                </a>
                <a 
                  href="mailto:launlaferdlance2025@gmail.com?subject=Demande de devis - Site web professionnel" 
                  className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => handleContactClick('email_direct')}
                >
                  <i className="fas fa-envelope text-blue-600"></i>
                  <span className="text-blue-700 font-medium">Envoyer un email</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="bg-neutral-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neutral-800 mb-6">Demander un devis gratuit</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                Merci ! Votre message a été envoyé avec succès. Nous vous répondrons sous 24h.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                Une erreur s'est produite. Veuillez réessayer ou nous contacter directement.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="form-name" value="contact" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">
                    Prénom *
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    required 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">
                    Nom *
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    required 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email *
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Téléphone
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+237 XXX XXX XXX"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">
                  Service souhaité *
                </label>
                <select 
                  id="service" 
                  name="service" 
                  required 
                  value={formData.service}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Sélectionner un service</option>
                  <optgroup label="🤖 Solutions Intelligence Artificielle">
                    <option value="Chatbots Intelligents">Chatbots Intelligents (500K - 750K FCFA)</option>
                    <option value="Intégration Multi-Canaux">Intégration Multi-Canaux (600K - 900K FCFA)</option>
                    <option value="Automatisation Métier">Automatisation Métier (750K - 1M+ FCFA)</option>
                    <option value="Solution IA Complète">Solution IA Complète (1M+ FCFA)</option>
                  </optgroup>
                  <optgroup label="🌐 Développement Web Traditionnel">
                    <option value="Présence Digitale Automatisée">Présence Digitale Automatisée (150K - 250K FCFA)</option>
                    <option value="Boutique Intelligente">Boutique Intelligente (250K - 350K FCFA)</option>
                    <option value="Outils Métier Automatisés">Outils Métier Automatisés (400K - 600K FCFA)</option>
                  </optgroup>
                  <optgroup label="📱 Projets Personnalisés">
                    <option value="Application Mobile">Application Mobile (Sur devis)</option>
                    <option value="Système de Gestion">Système de Gestion (Sur devis)</option>
                    <option value="Autre">Autre projet personnalisé</option>
                  </optgroup>
                </select>
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-neutral-700 mb-2">
                  Budget approximatif
                </label>
                <select 
                  id="budget" 
                  name="budget" 
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Sélectionner une fourchette</option>
                  <option value="150K - 250K FCFA">150K - 250K FCFA</option>
                  <option value="250K - 500K FCFA">250K - 500K FCFA</option>
                  <option value="500K - 1M FCFA">500K - 1M FCFA</option>
                  <option value="1M+ FCFA">1M+ FCFA</option>
                  <option value="À définir">À définir ensemble</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                  Décrivez votre projet *
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows={5} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Parlez-nous de votre projet, vos objectifs, délais souhaités..."
                />
              </div>
              
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="consent" 
                  name="consent" 
                  required 
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-300 rounded"
                />
                <label htmlFor="consent" className="text-sm text-neutral-600">
                  J'accepte d'être contacté concernant ma demande et je consens au traitement de mes données personnelles selon notre politique de confidentialité. *
                </label>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner animate-spin"></i>
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <span>Envoyer ma demande</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </button>
              
              <div className="text-center">
                <p className="text-sm text-neutral-500">
                  Réponse garantie sous 24h • Consultation gratuite • Devis sans engagement
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
