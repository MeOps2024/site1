import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-white/90 backdrop-blur-md'
    } border-b border-neutral-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-code text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold text-neutral-800">SmartScale WebTech</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('accueil')} 
              className="text-neutral-600 hover:text-blue-600 transition-colors duration-200"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('ia-solutions')} 
              className="text-neutral-600 hover:text-blue-600 transition-colors duration-200"
            >
              Solutions IA
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="text-neutral-600 hover:text-blue-600 transition-colors duration-200"
            >
              Services Web
            </button>
            <button 
              onClick={() => scrollToSection('methode')} 
              className="text-neutral-600 hover:text-blue-600 transition-colors duration-200"
            >
              Méthode
            </button>
            <button 
              onClick={() => scrollToSection('tarifs')} 
              className="text-neutral-600 hover:text-blue-600 transition-colors duration-200"
            >
              Tarifs
            </button>
            <a 
              href="/devis"
              className="text-neutral-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Devis Gratuit
            </a>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
            >
              Contact
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-neutral-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200">
          <div className="px-4 py-6 space-y-4">
            <button 
              onClick={() => scrollToSection('accueil')} 
              className="block w-full text-left text-neutral-600 hover:text-blue-600 transition-colors"
            >
              Accueil
            </button>
            <button 
              onClick={() => scrollToSection('ia-solutions')} 
              className="block w-full text-left text-neutral-600 hover:text-blue-600 transition-colors"
            >
              Solutions IA
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="block w-full text-left text-neutral-600 hover:text-blue-600 transition-colors"
            >
              Services Web
            </button>
            <button 
              onClick={() => scrollToSection('methode')} 
              className="block w-full text-left text-neutral-600 hover:text-blue-600 transition-colors"
            >
              Méthode
            </button>
            <button 
              onClick={() => scrollToSection('tarifs')} 
              className="block w-full text-left text-neutral-600 hover:text-blue-600 transition-colors"
            >
              Tarifs
            </button>
            <a 
              href="/devis"
              className="block w-full text-left text-neutral-600 hover:text-blue-600 transition-colors font-medium"
            >
              Devis Gratuit
            </a>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="block w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-full text-center"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
