import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize Meta Pixel
declare global {
  interface Window {
    fbq: any;
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Meta Pixel initialization - simplified version
if (typeof window !== 'undefined') {
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
}

// Initialize with environment variable or placeholder
const metaPixelId = import.meta.env.VITE_META_PIXEL_ID || 'YOUR_PIXEL_ID';
window.fbq('init', metaPixelId);
window.fbq('track', 'PageView');

createRoot(document.getElementById("root")!).render(<App />);
