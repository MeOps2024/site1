# SmartScale WebTech - Replit Configuration

## Overview

SmartScale WebTech is a modern full-stack web application built for a Cameroon-based web development agency. The application serves as a professional business website with a primary focus on AI-powered productivity solutions. The site showcases intelligent automation services, chatbots, and AI-driven business tools alongside traditional web development services. The project demonstrates a complete business solution with marketing integration, contact forms, and comprehensive service presentations centered around productivity enhancement and ROI generation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Connect-pg-simple for PostgreSQL-backed sessions
- **Development**: TSX for TypeScript execution in development

### Database Architecture
- **Database**: PostgreSQL (configured via Drizzle)
- **ORM**: Drizzle ORM with type-safe queries
- **Schema**: Centralized schema definition in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations

## Key Components

### Frontend Components
- **Landing Page**: Single-page application with multiple sections
- **Service Sections**: Modular components for different service offerings
- **Contact Forms**: Integrated contact forms with validation
- **Analytics Integration**: Google Analytics and Meta Pixel tracking
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Backend Services
- **Storage Interface**: Abstract storage layer with PostgreSQL database implementation
- **Route Registration**: Modular route system for API endpoints
- **Error Handling**: Centralized error handling middleware
- **Development Tools**: Vite integration for hot reloading

### Business Logic
- **Service Packages**: Three tiers of web development services
- **Pricing Structure**: Transparent pricing from 150K to 600K FCFA
- **Contact Management**: Lead capture and conversion tracking
- **Marketing Integration**: Facebook/Meta Ads pixel integration

## Data Flow

1. **User Interaction**: Users navigate through service offerings on the landing page
2. **Analytics Tracking**: User interactions are tracked via Google Analytics and Meta Pixel
3. **Lead Generation**: Contact forms capture leads with form validation
4. **Data Persistence**: Form submissions are processed and stored
5. **Conversion Tracking**: Marketing pixels track conversion events

## External Dependencies

### Development Dependencies
- **Vite Plugins**: React, runtime error overlay, cartographer for Replit
- **TypeScript**: Full TypeScript configuration with path aliases
- **ESLint/Prettier**: Code quality and formatting (configured via components.json)

### Production Dependencies
- **Database**: Neon serverless PostgreSQL
- **UI Libraries**: Extensive Radix UI component collection
- **Analytics**: Google Analytics 4 and Meta Pixel
- **Communication**: WhatsApp integration for direct contact
- **Deployment**: Netlify-ready with static asset optimization

### Third-Party Integrations
- **Google Analytics**: Page view and event tracking
- **Meta Pixel**: Conversion tracking for Facebook Ads
- **WhatsApp Business**: Direct communication channel
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter font family for typography

## Deployment Strategy

### Build Process
- **Client Build**: Vite builds React application to `/dist/public`
- **Server Build**: ESBuild bundles Express server to `/dist`
- **Static Assets**: Optimized for CDN delivery
- **Environment Variables**: Separate development and production configs

### Production Configuration
- **Server Start**: `NODE_ENV=production node dist/index.js`
- **Database**: PostgreSQL connection via DATABASE_URL
- **Analytics**: Environment-based Google Analytics and Meta Pixel IDs
- **Static Serving**: Express serves built client files in production

### Development Workflow
- **Hot Reloading**: Vite provides instant feedback during development
- **TypeScript**: Incremental compilation with path resolution
- **Database**: Drizzle Kit for schema management and migrations
- **Error Handling**: Runtime error overlay for debugging

## Changelog

```
Changelog:
- July 04, 2025. Initial setup
- July 04, 2025. Converted to static site with Netlify Forms integration
  - Added Google Analytics and Meta Pixel tracking
  - Created static build configuration
  - Implemented Netlify Forms for contact functionality
  - Optimized for static deployment (no backend dependencies)
  - Added comprehensive SEO optimization
  - Configured performance optimizations and security headers
- July 05, 2025. Added PostgreSQL database with Neon
  - Created PostgreSQL database using Neon serverless
  - Replaced MemStorage with DatabaseStorage implementation
  - Migrated user storage to use Drizzle ORM with PostgreSQL
  - Configured database connection with proper environment variables
  - Created users table with proper schema migrations
- July 05, 2025. Major redesign: AI-focused business positioning
  - Transformed hero section to emphasize AI and productivity
  - Created new AISection component showcasing chatbots, automation, and integration services
  - Added pricing for AI solutions (400,000 - 3,500,000 FCFA)
  - Repositioned existing services with productivity-focused messaging
  - Redesigned WhyChooseUsSection to highlight ROI, time savings, and competitive advantages
  - Updated navigation to prioritize AI solutions
  - Enhanced favicon and PWA manifest for professional branding
  - Restructured page layout to lead with AI offerings
- July 05, 2025. Updated AI pricing structure with realistic market rates
  - Chatbot simple: 400,000 - 600,000 FCFA
  - Intégration multi-canaux: 600,000 - 850,000 FCFA
  - Automatisation métier basique: 750,000 - 1,200,000 FCFA
  - Chatbot IA conversationnel: 1,200,000 - 1,800,000 FCFA
  - Suite automatisation complète: 2,000,000 - 3,500,000 FCFA
  - Added service pre-selection functionality to contact form
  - Updated FAQ section with detailed pricing information
  - Enhanced WhatsApp configuration with new pricing tiers
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```