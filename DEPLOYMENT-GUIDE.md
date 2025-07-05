# Guide de Déploiement - Campagne Meta (Budget 8 USD)

## 🚀 Configuration Netlify Forms

### Comment voir les soumissions de formulaires

1. **Dashboard Netlify** :
   - Connectez-vous à [netlify.com](https://netlify.com)
   - Sélectionnez votre site
   - Allez dans **Site settings** → **Forms**
   - Toutes les soumissions apparaissent ici avec timestamp et données complètes

2. **Notifications automatiques** :
   - Dans **Forms** → **Form notifications**
   - Ajoutez votre email : `launlaferdlance2025@gmail.com`
   - Vous recevrez un email à chaque soumission

3. **Données collectées** :
   - Prénom, Nom, Email, Téléphone
   - Service demandé, Budget, Message
   - Date/heure de soumission
   - Adresse IP (pour géolocalisation)

## 💰 Optimisation Budget 8 USD - Campagne Meta

### Structure des coûts Netlify (GRATUIT pour votre usage)
- ✅ **Netlify Starter** : GRATUIT
- ✅ **100 soumissions/mois** : GRATUIT
- ✅ **100GB de bande passante** : GRATUIT
- ✅ **CDN mondial** : GRATUIT
- ✅ **HTTPS automatique** : GRATUIT

### Optimisations pour campagnes publicitaires

#### 1. Performance Ultra-Rapide
```bash
# Build optimisé pour les campagnes
npm run build:static
```

#### 2. Configuration Meta Pixel Avancée
- ✅ PageView automatique
- ✅ Tracking Lead (formulaire)
- ✅ Contact (WhatsApp/Tel/Email)
- ✅ CompleteRegistration (conversion)
- ✅ ViewContent (sections importantes)

#### 3. Variables d'environnement requises
```env
VITE_META_PIXEL_ID=YOUR_PIXEL_ID
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🎯 Configuration Campagne Meta Optimale

### Budget 8 USD - Répartition suggérée
- **Ciblage** : Cameroun, 25-45 ans, intérêts business/entrepreneuriat
- **Objectif** : Génération de prospects (Lead Generation)
- **Durée** : 4 jours à 2$/jour OU 8 jours à 1$/jour
- **Format** : Carrousel ou image unique + CTA "En savoir plus"

### Landing Page optimisée pour conversion
- ✅ Temps de chargement < 2 secondes
- ✅ Mobile-first design
- ✅ Bouton WhatsApp flottant visible
- ✅ Formulaire de contact optimisé
- ✅ Tarifs transparents affichés

### Tracking des conversions configuré
```javascript
// Événements Meta Pixel intégrés :
- PageView : Visiteur sur la page
- ViewContent : Consultation des services
- Lead : Début de formulaire
- Contact : Clic WhatsApp/Tel
- CompleteRegistration : Formulaire soumis
```

## 🚀 Déploiement en 3 étapes

### Étape 1 : Configuration variables
```bash
# Dans Netlify Dashboard → Environment variables
VITE_META_PIXEL_ID = "votre_pixel_id_meta"
VITE_GA_MEASUREMENT_ID = "G-votre_id_analytics"
```

### Étape 2 : Build et déploiement
```bash
# Build pour production
npm run build:static

# Le fichier netlify.toml configure automatiquement :
- Cache optimisé (31536000 secondes)
- Headers de sécurité
- Redirections SPA
- Compression GZIP
```

### Étape 3 : Test avant campagne
- ✅ Tester le formulaire de contact
- ✅ Vérifier le tracking Meta Pixel (Facebook Pixel Helper)
- ✅ Tester les boutons WhatsApp
- ✅ Vérifier la vitesse (PageSpeed Insights)

## 📊 Métriques à surveiller

### Dans Netlify Dashboard
- **Forms** : Nombre de soumissions/jour
- **Analytics** : Visiteurs uniques, pages vues
- **Deploy** : Statut des déploiements

### Dans Meta Business Manager
- **Pixel Events** : PageView, Lead, CompleteRegistration
- **Conversion Rate** : Visiteurs → Leads
- **CPL (Cost Per Lead)** : Budget ÷ Nombre de leads

### Objectifs réalistes (Budget 8 USD)
- **Clics attendus** : 40-80 clics (CPC 0.10-0.20$)
- **Leads espérés** : 4-12 leads (taux conversion 10-15%)
- **CPL cible** : 0.67-2$ par lead

## 🔧 Résolution de problèmes

### Formulaire ne fonctionne pas
1. Vérifier que le formulaire caché existe dans `index.html`
2. Vérifier l'attribut `netlify` sur le formulaire
3. Vérifier le `name="contact"` cohérent

### Meta Pixel ne track pas
1. Installer Facebook Pixel Helper (extension Chrome)
2. Vérifier que `VITE_META_PIXEL_ID` est défini
3. Tester les événements dans l'outil Meta Events Manager

### Site lent
1. Vérifier la compression dans Network tab
2. S'assurer que le cache fonctionne (headers)
3. Optimiser les images si nécessaire

## 💡 Tips pour maximiser les 8 USD

1. **Ciblage précis** : Cameroun + intérêts spécifiques
2. **Horaires optimaux** : 18h-22h (après le travail)
3. **Message accrocheur** : "Site web pro à partir de 150K FCFA"
4. **CTA fort** : "Devis gratuit en 24h"
5. **Test A/B** : 2 visuels différents sur 2 jours chacun

## ✅ Checklist avant lancement

- [ ] Variables d'environnement configurées
- [ ] Meta Pixel installé et testé
- [ ] Formulaire Netlify fonctionnel
- [ ] WhatsApp button actif
- [ ] Site déployé et accessible
- [ ] PageSpeed > 90/100
- [ ] Test complet du parcours utilisateur
- [ ] Campagne Meta créée et prête

**Votre site est maintenant optimisé pour une campagne Meta efficace avec autoscaling automatique !**