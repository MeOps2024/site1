export default function WhyChooseUsSection() {
  return (
    <section id="methode" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
            Pourquoi Nous Choisir ?
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Notre expertise locale combinée aux dernières technologies pour votre succès digital au Cameroun.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-key text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-4">Offre 100% clé en main</h3>
            <p className="text-neutral-600">Conception + automatisation + acquisition + suivi complet de votre projet digital.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-globe-africa text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-4">Expertise locale & technologique</h3>
            <p className="text-neutral-600">Connaissance approfondie du marché camerounais et maîtrise des meilleures technologies.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-file-contract text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-4">Contrats clairs et transparents</h3>
            <p className="text-neutral-600">Livrables définis, délais respectés, paiements sécurisés. Aucune surprise.</p>
          </div>
          
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-chart-line text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold text-neutral-800 mb-4">Objectif résultat</h3>
            <p className="text-neutral-600">Ce n'est pas juste un site. C'est une machine de conversion optimisée pour vos objectifs.</p>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Projets réalisés</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Clients satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15j</div>
              <div className="text-blue-100">Délai moyen</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support technique</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
