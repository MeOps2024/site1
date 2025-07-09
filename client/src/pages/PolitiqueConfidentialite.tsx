import { useEffect } from "react";
import { useMetaPixel } from "@/hooks/use-meta-pixel";

export default function PolitiqueConfidentialite() {
  const { trackEvent } = useMetaPixel();

  useEffect(() => {
    // Track page view for privacy policy
    trackEvent({
      eventName: 'ViewContent',
      parameters: {
        content_name: 'Politique de Confidentialité',
        content_category: 'legal_page',
        content_type: 'policy'
      }
    });
  }, [trackEvent]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Politique de Confidentialité
            </h1>
            <p className="text-gray-600">
              SmartScale WebTech - Dernière mise à jour : 8 janvier 2025
            </p>
          </div>

          <div className="prose max-w-none text-gray-700 space-y-8">
            
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                SmartScale WebTech ("nous", "notre", "nos") s'engage à protéger et respecter votre vie privée. 
                Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles 
                lorsque vous utilisez notre site web et nos services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Informations que nous collectons</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Informations que vous nous fournissez</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Nom et informations de contact (email, téléphone)</li>
                <li>Nom de votre entreprise</li>
                <li>Détails de votre projet ou demande de devis</li>
                <li>Communications via WhatsApp ou formulaires de contact</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Informations collectées automatiquement</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Adresse IP et données de navigation</li>
                <li>Type de navigateur et système d'exploitation</li>
                <li>Pages visitées et temps passé sur le site</li>
                <li>Données Google Analytics (anonymisées)</li>
                <li>Données Meta Pixel pour optimisation publicitaire</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Utilisation de vos données</h2>
              <p className="mb-3">Nous utilisons vos informations pour :</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Répondre à vos demandes de devis et questions</li>
                <li>Fournir nos services de développement web et IA</li>
                <li>Améliorer notre site web et nos services</li>
                <li>Envoyer des communications marketing (avec votre consentement)</li>
                <li>Optimiser nos campagnes publicitaires sur Meta/Facebook</li>
                <li>Analyser le trafic et l'utilisation de notre site</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies et technologies de suivi</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Google Analytics</h3>
              <p className="mb-3">
                Nous utilisons Google Analytics pour comprendre comment vous utilisez notre site. 
                Ces données sont anonymisées et utilisées pour améliorer l'expérience utilisateur.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Meta Pixel (Facebook)</h3>
              <p className="mb-3">
                Le Meta Pixel nous aide à mesurer l'efficacité de nos publicités et à créer des audiences 
                pour des campagnes futures. Vous pouvez désactiver cette fonctionnalité dans les paramètres 
                de votre navigateur.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Gestion des cookies</h3>
              <p>
                Vous pouvez contrôler et supprimer les cookies via les paramètres de votre navigateur. 
                Notez que désactiver certains cookies peut affecter la fonctionnalité du site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Partage des données</h2>
              <p className="mb-3">Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations avec :</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Fournisseurs de services :</strong> Google Analytics, Meta/Facebook, WhatsApp</li>
                <li><strong>Hébergement :</strong> Netlify pour l'hébergement de notre site web</li>
                <li><strong>Base de données :</strong> Neon (PostgreSQL) pour stocker les données utilisateur</li>
                <li><strong>Obligations légales :</strong> Si requis par la loi camerounaise</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sécurité des données</h2>
              <p>
                Nous mettons en place des mesures de sécurité appropriées pour protéger vos informations 
                contre l'accès non autorisé, la modification, la divulgation ou la destruction. 
                Cela inclut le chiffrement HTTPS et la sécurisation de notre base de données.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Vos droits</h2>
              <p className="mb-3">Vous avez le droit de :</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Accéder à vos données personnelles</li>
                <li>Corriger des informations inexactes</li>
                <li>Demander la suppression de vos données</li>
                <li>Vous opposer au traitement de vos données</li>
                <li>Retirer votre consentement à tout moment</li>
                <li>Recevoir une copie de vos données (portabilité)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Conservation des données</h2>
              <p>
                Nous conservons vos données personnelles uniquement le temps nécessaire aux fins 
                pour lesquelles elles ont été collectées, ou selon les exigences légales applicables 
                au Cameroun. Les données de contact sont généralement conservées 3 ans après le dernier contact.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Transferts internationaux</h2>
              <p>
                Certains de nos fournisseurs de services (Google, Meta, Netlify) peuvent traiter 
                vos données en dehors du Cameroun. Nous nous assurons que ces transferts respectent 
                les standards de protection appropriés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modifications de cette politique</h2>
              <p>
                Nous pouvons mettre à jour cette politique de confidentialité occasionnellement. 
                Nous vous informerons de tout changement important en publiant la nouvelle politique 
                sur cette page avec une date de mise à jour.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact</h2>
              <p className="mb-3">
                Pour toute question concernant cette politique de confidentialité ou vos données personnelles, 
                contactez-nous :
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>SmartScale WebTech</strong></p>
                <p>Email : contact@smartscalewebtech.com</p>
                <p>Téléphone : +237 681 719 132</p>
                <p>WhatsApp : +237 681 719 132</p>
                <p>Adresse : Douala, Cameroun</p>
              </div>
            </section>

          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <a
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}