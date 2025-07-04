import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize Meta Pixel - static version
if (typeof window !== 'undefined') {
  // Check if Meta Pixel ID is available
  const metaPixelId = import.meta.env.VITE_META_PIXEL_ID;
  
  if (metaPixelId && metaPixelId !== 'YOUR_PIXEL_ID') {
    // Initialize fbq function
    window.fbq = window.fbq || function() {
      (window.fbq.q = window.fbq.q || []).push(arguments);
    };
    window.fbq.loaded = true;
    
    // Load the Facebook Pixel script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
    
    // Initialize with the actual Pixel ID
    script.onload = () => {
      window.fbq('init', metaPixelId);
      window.fbq('track', 'PageView');
    };
  }
}

// Add scroll effects and interactions for static site
document.addEventListener('DOMContentLoaded', () => {
  // Back to top button functionality
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.pointerEvents = 'auto';
      } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.pointerEvents = 'none';
      }
    });
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      const target = href ? document.querySelector(href) : null;
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
      }
    });
  }, observerOptions);
  
  // Observe elements with animation classes
  document.querySelectorAll('.service-card, .hover-lift').forEach(el => {
    observer.observe(el);
  });
});

createRoot(document.getElementById("root")!).render(<App />);