import { useEffect } from 'react';

// Types pour les événements Meta Pixel
interface MetaPixelEvent {
  eventName: string;
  parameters?: {
    content_name?: string;
    content_category?: string;
    content_type?: string;
    value?: number;
    currency?: string;
    contact_method?: string;
    service_type?: string;
    budget_range?: string;
    custom_data?: Record<string, any>;
    [key: string]: any;
  };
}

export const useMetaPixel = () => {
  // Fonction pour tracker les événements
  const trackEvent = (event: MetaPixelEvent) => {
    const pixelId = import.meta.env.VITE_META_PIXEL_ID || '541744309020974';
    if (window.fbq && pixelId) {
      window.fbq('track', event.eventName, event.parameters || {});
    }
  };

  // Événements prédéfinis pour les actions communes
  const trackPageView = (pageName?: string) => {
    trackEvent({
      eventName: 'PageView',
      parameters: {
        content_name: pageName || document.title,
        content_type: 'website'
      }
    });
  };

  const trackServiceInterest = (serviceName: string, price?: string) => {
    trackEvent({
      eventName: 'ViewContent',
      parameters: {
        content_name: serviceName,
        content_category: 'Service',
        content_type: 'product',
        value: 0,
        currency: 'XAF',
        custom_data: {
          service_type: serviceName,
          price_range: price
        }
      }
    });
  };

  const trackPricingView = (packageName: string, price: string) => {
    trackEvent({
      eventName: 'ViewContent',
      parameters: {
        content_name: `Pricing - ${packageName}`,
        content_category: 'Pricing',
        content_type: 'pricing',
        value: 0,
        currency: 'XAF',
        custom_data: {
          package_name: packageName,
          price: price
        }
      }
    });
  };

  const trackFormStart = (formType: string) => {
    trackEvent({
      eventName: 'InitiateCheckout',
      parameters: {
        content_name: `Form Started - ${formType}`,
        content_category: 'Lead Generation',
        value: 0,
        currency: 'XAF'
      }
    });
  };

  const trackContactAttempt = (method: string, source?: string) => {
    trackEvent({
      eventName: 'Contact',
      parameters: {
        content_name: `Contact via ${method}`,
        contact_method: method,
        content_category: 'Contact',
        value: 0,
        currency: 'XAF',
        custom_data: {
          source: source || 'website'
        }
      }
    });
  };

  const trackLead = (data: { service?: string; budget?: string; method?: string }) => {
    trackEvent({
      eventName: 'Lead',
      parameters: {
        content_name: 'Lead Generated',
        content_category: 'Lead Generation',
        value: 0,
        currency: 'XAF',
        custom_data: data
      }
    });
  };

  const trackConversion = (conversionType: string, data?: Record<string, any>) => {
    trackEvent({
      eventName: 'CompleteRegistration',
      parameters: {
        content_name: `Conversion - ${conversionType}`,
        content_category: 'Conversion',
        status: true,
        value: 0,
        currency: 'XAF',
        custom_data: data
      }
    });
  };

  const trackButtonClick = (buttonName: string, section: string, service?: string) => {
    trackEvent({
      eventName: 'CompleteRegistration',
      parameters: {
        content_name: buttonName,
        content_category: section,
        service_type: service,
        custom_data: {
          button_clicked: buttonName,
          page_section: section
        }
      }
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackServiceInterest,
    trackPricingView,
    trackFormStart,
    trackContactAttempt,
    trackLead,
    trackConversion,
    trackButtonClick
  };
};

// Hook pour tracker automatiquement les vues de sections
export const useSectionTracking = (sectionName: string) => {
  const { trackEvent } = useMetaPixel();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent({
              eventName: 'ViewContent',
              parameters: {
                content_name: `Section View - ${sectionName}`,
                content_category: 'Section',
                content_type: 'section'
              }
            });
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const element = document.getElementById(sectionName.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [sectionName, trackEvent]);
};