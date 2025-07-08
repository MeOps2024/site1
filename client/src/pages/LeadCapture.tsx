import { useState } from "react";
import { useMetaPixel } from "@/hooks/use-meta-pixel";

export default function LeadCapture() {
  const { trackEvent } = useMetaPixel();
  const [step, setStep] = useState(1);
  const [leadData, setLeadData] = useState({
    service: "",
    budget: "",
    timeline: "",
    contact: ""
  });

  const services = [
    { id: "web", name: "Site Web Professionnel", icon: "🌐", price: "150K-600K" },
    { id: "ai", name: "Solutions IA & Automatisation", icon: "🤖", price: "400K-3.5M" },
    { id: "marketing", name: "Marketing Digital", icon: "📈", price: "150K-600K" }
  ];

  const budgets = [
    { id: "small", name: "150K - 500K FCFA", icon: "💼" },
    { id: "medium", name: "500K - 1.5M FCFA", icon: "🏢" },
    { id: "large", name: "1.5M+ FCFA", icon: "🏛️" }
  ];

  const timelines = [
    { id: "urgent", name: "1 mois (Turbo +20%)", icon: "🚀" },
    { id: "standard", name: "2-3 mois", icon: "⭐" },
    { id: "flexible", name: "4+ mois", icon: "📅" }
  ];

  const selectService = (service: any) => {
    setLeadData(prev => ({ ...prev, service: service.id }));
    setStep(2);
    
    // Track service selection
    trackEvent({
      eventName: 'ViewContent',
      parameters: {
        content_name: service.name,
        content_category: 'service_selection',
        value: parseInt(service.price.split('-')[0].replace('K', '000')),
        currency: 'XAF'
      }
    });
  };

  const selectBudget = (budget: any) => {
    setLeadData(prev => ({ ...prev, budget: budget.id }));
    setStep(3);
    
    // Track budget selection - MICRO-CONVERSION
    trackEvent({
      eventName: 'AddToCart',
      parameters: {
        content_name: 'Budget Selected',
        content_category: 'budget_qualification',
        value: budget.id === 'large' ? 1500000 : budget.id === 'medium' ? 500000 : 150000,
        currency: 'XAF'
      }
    });
  };

  const selectTimeline = (timeline: any) => {
    setLeadData(prev => ({ ...prev, timeline: timeline.id }));
    setStep(4);
    
    // Track timeline - LEAD QUALIFICATION
    trackEvent({
      eventName: 'Lead',
      parameters: {
        content_name: 'Timeline Selected',
        content_category: 'lead_qualification',
        custom_data: {
          urgency: timeline.id,
          qualification_step: 'timeline'
        }
      }
    });
  };

  const submitLead = () => {
    const phoneNumber = "+237686577791";
    const message = `🎯 LEAD QUALIFIÉ - SmartScale WebTech

🔹 Service: ${services.find(s => s.id === leadData.service)?.name}
🔹 Budget: ${budgets.find(b => b.id === leadData.budget)?.name}  
🔹 Délai: ${timelines.find(t => t.id === leadData.timeline)?.name}
🔹 Contact: ${leadData.contact}

Je souhaite discuter de mon projet et obtenir un devis personnalisé.`;

    window.open(`https://wa.me/237686577791?text=${encodeURIComponent(message)}`, '_blank');
    
    // Track final conversion - PURCHASE EVENT
    trackEvent({
      eventName: 'Purchase',
      parameters: {
        content_name: 'Qualified Lead',
        value: leadData.budget === 'large' ? 150000 : leadData.budget === 'medium' ? 50000 : 15000,
        currency: 'XAF',
        content_type: 'lead',
        custom_data: {
          service_type: leadData.service,
          budget_tier: leadData.budget,
          urgency: leadData.timeline,
          conversion_stage: 'qualified_lead'
        }
      }
    });
    
    setStep(5);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🚀 Transformez votre Business avec l'IA
            </h1>
            <p className="text-xl text-gray-600">
              Obtenez un devis gratuit en 2 minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <div 
                key={service.id}
                onClick={() => selectService(service)}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <div className="text-blue-600 font-semibold">{service.price} FCFA</div>
                <div className="mt-4 text-sm text-gray-600">
                  Cliquez pour continuer →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              💰 Quel est votre budget ?
            </h2>
            <p className="text-gray-600">
              Service sélectionné : {services.find(s => s.id === leadData.service)?.name}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {budgets.map((budget) => (
              <div 
                key={budget.id}
                onClick={() => selectBudget(budget)}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-green-500"
              >
                <div className="text-4xl mb-4">{budget.icon}</div>
                <h3 className="text-xl font-bold mb-2">{budget.name}</h3>
                <div className="mt-4 text-sm text-gray-600">
                  Sélectionner →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ⏰ Dans quel délai ?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {timelines.map((timeline) => (
              <div 
                key={timeline.id}
                onClick={() => selectTimeline(timeline)}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-500"
              >
                <div className="text-4xl mb-4">{timeline.icon}</div>
                <h3 className="text-xl font-bold mb-2">{timeline.name}</h3>
                <div className="mt-4 text-sm text-gray-600">
                  Continuer →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              📞 Dernière étape !
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Service</div>
                <div className="font-semibold">{services.find(s => s.id === leadData.service)?.name}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Budget</div>
                <div className="font-semibold">{budgets.find(b => b.id === leadData.budget)?.name}</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Délai</div>
                <div className="font-semibold">{timelines.find(t => t.id === leadData.timeline)?.name}</div>
              </div>
            </div>

            <input
              type="text"
              placeholder="Votre nom + entreprise"
              value={leadData.contact}
              onChange={(e) => setLeadData(prev => ({ ...prev, contact: e.target.value }))}
              className="w-full p-4 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500"
            />
            
            <button
              onClick={submitLead}
              disabled={!leadData.contact.trim()}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              💬 Discuter sur WhatsApp
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Merci ! Notre expert vous contactera dans les 2h
          </h2>
          <p className="text-gray-600 mb-6">
            Votre demande a été transmise avec succès
          </p>
          <a
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}