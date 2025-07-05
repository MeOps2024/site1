export default function WhyChooseUsSection() {
  return (
    <section id="methode" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Pourquoi l'<span className="text-blue-600">Intelligence Artificielle</span> ?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            L'IA révolutionne la productivité des entreprises. Économisez temps et argent avec des solutions 
            intelligentes qui travaillent 24h/7j pour votre croissance.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-clock text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-4">Gain de Temps Massif</h3>
            <p className="text-neutral-600">Automatisez 80% de vos tâches répétitives. Plus de temps pour vous concentrer sur la croissance.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-coins text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-4">ROI Immédiat</h3>
            <p className="text-neutral-600">Réduction des coûts de personnel, augmentation des conversions. Investissement qui se rentabilise rapidement.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-rocket text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-4">Compétitivité Accrue</h3>
            <p className="text-neutral-600">Offrez un service client 24h/7j sans embaucher. Dépassez vos concurrents avec l'innovation.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-chart-line text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-4">Évolutivité Automatique</h3>
            <p className="text-neutral-600">Gérez plus de clients sans stress ni coûts supplémentaires. L'IA grandit avec votre business.</p>
          </div>
        </div>
        
        {/* ROI Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">80%</div>
              <div className="text-blue-100">Réduction du temps de travail</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">300%</div>
              <div className="text-blue-100">Augmentation des conversions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6 mois</div>
              <div className="text-blue-100">ROI garanti</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Service client automatisé</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
