import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import AISection from "@/components/AISection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

function StaticApp() {
  useEffect(() => {
    // Track page view with Meta Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
    
    // Track page view with Google Analytics
    if (window.gtag && import.meta.env.VITE_GA_MEASUREMENT_ID) {
      window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_path: window.location.pathname
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ApplicationsSection />
      <AISection />
      <WhyChooseUsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
      
      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://wa.me/237686577791?text=Bonjour, je souhaite obtenir des informations sur vos services web." 
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
          onClick={() => {
            if (window.fbq) window.fbq('track', 'Contact', {contact_method: 'whatsapp'});
            if (window.gtag) window.gtag('event', 'click', { event_category: 'contact', event_label: 'whatsapp' });
          }}
        >
          <i className="fab fa-whatsapp text-2xl"></i>
        </a>
      </div>

      {/* Back to Top Button */}
      <button 
        id="backToTop"
        className="fixed bottom-6 left-6 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 pointer-events-none z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}

export default StaticApp;