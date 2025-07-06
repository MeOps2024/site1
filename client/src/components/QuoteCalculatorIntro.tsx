export default function QuoteCalculatorIntro() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-6">
            Besoin d'un Devis Plus Précis ?
          </h2>
          
          <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
            Découvrez notre <strong>Assistant Devis Intelligent</strong> qui calcule automatiquement 
            le prix de votre projet en fonction de vos besoins spécifiques. 
            En quelques clics, obtenez une estimation personnalisée et détaillée.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mouse-pointer text-blue-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">3 Étapes Simples</h3>
              <p className="text-sm text-neutral-600">Sélectionnez votre service, personnalisez les options, obtenez votre devis</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-calculator text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Calcul Automatique</h3>
              <p className="text-sm text-neutral-600">Prix calculé selon nos règles de pricing et votre configuration</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fab fa-whatsapp text-green-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-neutral-800 mb-2">Contact Direct</h3>
              <p className="text-sm text-neutral-600">Envoyez directement votre devis sur WhatsApp pour finaliser</p>
            </div>
          </div>
          
          <a 
            href="/devis"
            onClick={() => {
              if (window.fbq) {
                window.fbq('track', 'InitiateCheckout', {
                  content_name: 'Calculateur de Devis',
                  content_category: 'Quote Calculator',
                  value: 0,
                  currency: 'XAF'
                });
              }
            }}
            className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <i className="fas fa-calculator mr-2"></i>
            Calculer Mon Devis Maintenant
          </a>
        </div>
      </div>
    </section>
  );
}