import { useState } from "react";
import { useMetaPixel } from "@/hooks/use-meta-pixel";

interface QuoteData {
  baseService: string;
  basePrice: number;
  factors: {
    pages: number;
    features: number;
    seo: number;
    maintenance: number;
    complexity: number;
    channels: number;
    dataVolume: number;
    integrations: number;
    support: number;
    urgency: number;
    companySize: number;
  };
  totalCoefficient: number;
  finalPrice: number;
}

const basePrices = {
  "Présence Digitale Automatisée": 200000,
  "Boutique Intelligente": 300000,
  "Outils Métier Automatisés": 500000,
  "Chatbot Intelligent Simple": 500000,
  "Intégration Multi-Canaux": 725000,
  "Automatisation Métier Basique": 975000,
  "Chatbot IA Conversationnel": 1500000,
  "Suite Automatisation Complète": 2750000
};

export default function QuoteCalculator() {
  const { trackEvent } = useMetaPixel();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteData, setQuoteData] = useState<QuoteData>({
    baseService: "",
    basePrice: 0,
    factors: {
      pages: 0,
      features: 0,
      seo: 0,
      maintenance: 0,
      complexity: 0,
      channels: 0,
      dataVolume: 0,
      integrations: 0,
      support: 0,
      urgency: 0,
      companySize: 0
    },
    totalCoefficient: 0,
    finalPrice: 0
  });

  const calculateQuote = () => {
    const { factors } = quoteData;
    const totalCoeff = Object.values(factors).reduce((sum, coeff) => sum + coeff, 0);
    const finalPrice = Math.round(quoteData.basePrice * (1 + totalCoeff));
    
    setQuoteData(prev => ({
      ...prev,
      totalCoefficient: totalCoeff,
      finalPrice: finalPrice
    }));

    // Track quote calculation
    trackEvent({
      eventName: 'InitiateCheckout',
      parameters: {
        content_name: quoteData.baseService,
        value: finalPrice,
        currency: 'XAF',
        content_type: 'service_quote'
      }
    });
  };

  const updateFactor = (factor: keyof QuoteData['factors'], value: number) => {
    setQuoteData(prev => ({
      ...prev,
      factors: {
        ...prev.factors,
        [factor]: value
      }
    }));
  };

  const selectBaseService = (service: string) => {
    setQuoteData(prev => ({
      ...prev,
      baseService: service,
      basePrice: basePrices[service as keyof typeof basePrices]
    }));
    setCurrentStep(2);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const generateWhatsAppMessage = () => {
    const factors = [];
    if (quoteData.factors.pages > 0) factors.push(`Pages supplémentaires: +${Math.round(quoteData.factors.pages * 100)}%`);
    if (quoteData.factors.features > 0) factors.push(`Fonctionnalités: +${Math.round(quoteData.factors.features * 100)}%`);
    if (quoteData.factors.seo > 0) factors.push(`SEO & SSL: +${Math.round(quoteData.factors.seo * 100)}%`);
    if (quoteData.factors.maintenance > 0) factors.push(`Maintenance: +${Math.round(quoteData.factors.maintenance * 100)}%`);
    if (quoteData.factors.complexity > 0) factors.push(`Complexité IA: +${Math.round(quoteData.factors.complexity * 100)}%`);
    if (quoteData.factors.channels > 0) factors.push(`Canaux: +${Math.round(quoteData.factors.channels * 100)}%`);
    if (quoteData.factors.urgency > 0) factors.push(`Urgence: +${Math.round(quoteData.factors.urgency * 100)}%`);

    const message = `🤖 *DEVIS AUTOMATIQUE - SmartScale WebTech*

📋 *Service sélectionné:* ${quoteData.baseService}
💰 *Prix de base:* ${formatPrice(quoteData.basePrice)}

📊 *Options sélectionnées:*
${factors.join('\n')}

💵 *PRIX FINAL ESTIMÉ: ${formatPrice(quoteData.finalPrice)}*

Je souhaite discuter de ce devis et avoir plus d'informations sur votre service.

Merci !`;

    return encodeURIComponent(message);
  };

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/237686577791?text=${message}`, '_blank');
    
    // Track WhatsApp contact
    trackEvent({
      eventName: 'Contact',
      parameters: {
        content_name: 'WhatsApp Quote Discussion',
        contact_method: 'whatsapp',
        service_type: quoteData.baseService,
        value: quoteData.finalPrice,
        currency: 'XAF'
      }
    });
  };

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🧮 Assistant Devis Intelligent
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Obtenez un devis personnalisé et précis en quelques clics avec notre calculateur intelligent
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Étape 1/3 : Choisissez votre service
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Services Web */}
              <div className="col-span-full">
                <h3 className="text-lg font-semibold text-blue-600 mb-4">🌐 Services Web Traditionnels</h3>
              </div>
              
              {Object.entries(basePrices).slice(0, 3).map(([service, price]) => (
                <div key={service} className="bg-gray-50 rounded-2xl p-6 hover:bg-blue-50 transition-colors cursor-pointer border-2 border-transparent hover:border-blue-200" onClick={() => selectBaseService(service)}>
                  <h4 className="font-bold text-gray-900 mb-2">{service}</h4>
                  <div className="text-blue-600 font-semibold mb-4">À partir de {formatPrice(price)}</div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Sélectionner
                  </button>
                </div>
              ))}

              {/* Services IA */}
              <div className="col-span-full mt-8">
                <h3 className="text-lg font-semibold text-purple-600 mb-4">🤖 Solutions Intelligence Artificielle</h3>
              </div>
              
              {Object.entries(basePrices).slice(3).map(([service, price]) => (
                <div key={service} className="bg-gray-50 rounded-2xl p-6 hover:bg-purple-50 transition-colors cursor-pointer border-2 border-transparent hover:border-purple-200" onClick={() => selectBaseService(service)}>
                  <h4 className="font-bold text-gray-900 mb-2">{service}</h4>
                  <div className="text-purple-600 font-semibold mb-4">À partir de {formatPrice(price)}</div>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Sélectionner
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    const isWebService = quoteData.baseService.includes('Digitale') || quoteData.baseService.includes('Boutique') || quoteData.baseService.includes('Outils Métier');
    const isAIService = !isWebService;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Étape 2/3 : Personnalisez votre {quoteData.baseService}
              </h2>
              <div className="text-lg text-blue-600 font-semibold">
                Prix de base : {formatPrice(quoteData.basePrice)}
              </div>
            </div>

            <div className="space-y-8">
              {/* Options communes */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Options communes</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgence du projet
                    </label>
                    <select 
                      value={quoteData.factors.urgency}
                      onChange={(e) => updateFactor('urgency', parseFloat(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>Standard (4-6 semaines)</option>
                      <option value={0.2}>Urgent (moins de 2 semaines) +20%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Taille de votre entreprise
                    </label>
                    <select 
                      value={quoteData.factors.companySize}
                      onChange={(e) => updateFactor('companySize', parseFloat(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={-0.05}>Startup -5%</option>
                      <option value={0}>PME</option>
                      <option value={0.1}>Grande entreprise +10%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Support et formation
                    </label>
                    <select 
                      value={quoteData.factors.support}
                      onChange={(e) => updateFactor('support', parseFloat(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0}>Formation de base incluse</option>
                      <option value={0.15}>Pack formation 5 sessions +15%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Maintenance
                    </label>
                    <select 
                      value={quoteData.factors.maintenance}
                      onChange={(e) => updateFactor('maintenance', parseFloat(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={0.05}>3 mois +5%</option>
                      <option value={0.1}>6 mois +10%</option>
                      <option value={0.15}>12 mois +15%</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Options spécifiques Web */}
              {isWebService && (
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Options spécifiques Web</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de pages
                      </label>
                      <select 
                        value={quoteData.factors.pages}
                        onChange={(e) => updateFactor('pages', parseFloat(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={0}>3-5 pages (inclus)</option>
                        <option value={0.15}>7-10 pages +15%</option>
                        <option value={0.3}>Pages illimitées +30%</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fonctionnalités e-commerce
                      </label>
                      <select 
                        value={quoteData.factors.features}
                        onChange={(e) => updateFactor('features', parseFloat(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={0}>Formulaire de contact</option>
                        <option value={0.1}>+ Panier d'achat +10%</option>
                        <option value={0.2}>+ Analytics avancés +20%</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SEO & SSL
                      </label>
                      <select 
                        value={quoteData.factors.seo}
                        onChange={(e) => updateFactor('seo', parseFloat(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={0}>Standard</option>
                        <option value={0.1}>Optimisation SEO avancée +10%</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Options spécifiques IA */}
              {isAIService && (
                <div className="bg-purple-50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-4">Options spécifiques IA</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Complexité de l'IA
                      </label>
                      <select 
                        value={quoteData.factors.complexity}
                        onChange={(e) => updateFactor('complexity', parseFloat(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value={0}>Règles simples</option>
                        <option value={0.2}>IA intermédiaire +20%</option>
                        <option value={0.4}>IA conversationnelle +40%</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de canaux
                      </label>
                      <select 
                        value={quoteData.factors.channels}
                        onChange={(e) => updateFactor('channels', parseFloat(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value={0}>1 canal (WhatsApp)</option>
                        <option value={0.1}>2 canaux +10%</option>
                        <option value={0.2}>3+ canaux +20%</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Volume de données
                      </label>
                      <select 
                        value={quoteData.factors.dataVolume}
                        onChange={(e) => updateFactor('dataVolume', parseFloat(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value={0}>Moins de 100 entrées</option>
                        <option value={0.1}>100-1000 entrées +10%</option>
                        <option value={0.15}>Plus de 1000 entrées +15%</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intégrations tierces
                      </label>
                      <select 
                        value={quoteData.factors.integrations}
                        onChange={(e) => updateFactor('integrations', parseFloat(e.target.value))}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value={0}>Aucune</option>
                        <option value={0.1}>CRM simple +10%</option>
                        <option value={0.2}>ERP/API complexe +20%</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Retour
                </button>
                <button 
                  onClick={() => {
                    calculateQuote();
                    setCurrentStep(3);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Calculer mon devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎉 Votre Devis Personnalisé
            </h2>
            <p className="text-gray-600">Estimation basée sur vos besoins spécifiques</p>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{quoteData.baseService}</h3>
              <div className="text-3xl font-bold mb-4">{formatPrice(quoteData.finalPrice)}</div>
              <div className="text-blue-100">
                Prix de base: {formatPrice(quoteData.basePrice)} + {Math.round(quoteData.totalCoefficient * 100)}% d'options
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Détail des options :</h4>
              <div className="space-y-2 text-sm">
                {Object.entries(quoteData.factors).map(([factor, value]) => {
                  if (value === 0) return null;
                  const labels = {
                    pages: 'Pages supplémentaires',
                    features: 'Fonctionnalités e-commerce',
                    seo: 'SEO & SSL',
                    maintenance: 'Maintenance',
                    complexity: 'Complexité IA',
                    channels: 'Canaux multiples',
                    dataVolume: 'Volume de données',
                    integrations: 'Intégrations',
                    support: 'Formation avancée',
                    urgency: 'Urgence',
                    companySize: 'Taille entreprise'
                  };
                  return (
                    <div key={factor} className="flex justify-between">
                      <span>{labels[factor as keyof typeof labels]}</span>
                      <span className="font-medium">{value > 0 ? '+' : ''}{Math.round(value * 100)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <h4 className="font-semibold text-green-900 mb-4">Ce qui est inclus :</h4>
              <ul className="space-y-2 text-sm text-green-800">
                <li>✅ Conception et développement complet</li>
                <li>✅ Tests et optimisation</li>
                <li>✅ Formation de base incluse</li>
                <li>✅ Support technique initial</li>
                <li>✅ Documentation complète</li>
                <li>✅ Garantie 30 jours</li>
              </ul>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-600 mb-6">
              Ce devis est une estimation basée sur vos sélections. Le prix final peut varier selon les spécifications exactes de votre projet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openWhatsApp}
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>Discuter sur WhatsApp</span>
              </button>
              
              <a 
                href="#contact"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-colors"
              >
                Formulaire de contact
              </a>
              
              <button 
                onClick={() => {
                  setCurrentStep(1);
                  setQuoteData({
                    baseService: "",
                    basePrice: 0,
                    factors: {
                      pages: 0, features: 0, seo: 0, maintenance: 0,
                      complexity: 0, channels: 0, dataVolume: 0,
                      integrations: 0, support: 0, urgency: 0, companySize: 0
                    },
                    totalCoefficient: 0,
                    finalPrice: 0
                  });
                }}
                className="border border-gray-300 text-gray-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Nouveau devis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}