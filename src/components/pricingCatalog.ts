export type BillingCycle = 'project' | 'retainer';

export interface PricingModule {
  id: string;
  name: string;
  category: 'SEO' | 'Design' | 'Full-Stack' | '3D & Motion' | 'Infrastructure';
  price: number;
  description: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  basePrice: number;
  monthlyPrice: number;
  delivery: string;
  includedModuleIds: string[];
  highlight?: boolean;
  isFlagship?: boolean;
}

export interface PricingPlanSelection {
  planId: string;
  billingCycle: BillingCycle;
}

export const AVAILABLE_MODULES: PricingModule[] = [
  { id: 'mod-tech-seo', name: 'Technical SEO & Schema.org', category: 'SEO', price: 850, description: 'Technical foundations, structured data, and crawl optimization.' },
  { id: 'mod-prog-seo', name: 'Programmatic SEO Engine', category: 'SEO', price: 1400, description: 'Scalable landing pages for high-intent search demand.' },
  { id: 'mod-figma-ux', name: 'Bespoke UI/UX Design System', category: 'Design', price: 1800, description: 'A custom visual system, interface design, and responsive layouts.' },
  { id: 'mod-lenis-front', name: 'Frontend Engineering & Motion', category: 'Design', price: 1600, description: 'A polished React experience with refined interactions.' },
  { id: 'mod-backend-db', name: 'Backend API & Database', category: 'Full-Stack', price: 2400, description: 'Secure APIs, application logic, and PostgreSQL data modeling.' },
  { id: 'mod-3d-webgl', name: 'Custom WebGL Experience', category: '3D & Motion', price: 1400, description: 'A custom interactive Three.js scene tuned for the browser.' },
  { id: 'mod-headless-cms', name: 'Headless CMS', category: 'Infrastructure', price: 850, description: 'A flexible content workflow for your team.' },
  { id: 'mod-stripe-pay', name: 'Payments & Checkout', category: 'Full-Stack', price: 750, description: 'Stripe checkout, webhooks, and multi-currency support.' },
  { id: 'mod-vitals-sla', name: 'Core Web Vitals Optimization', category: 'SEO', price: 600, description: 'Performance improvements focused on fast, stable page loads.' },
  { id: 'mod-i18n', name: 'Multilingual SEO Setup', category: 'Infrastructure', price: 700, description: 'Localized routes and technical SEO foundations for multiple markets.' },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'lite', name: 'LITE SPRINT', tagline: 'A fast launch for an MVP or focused campaign.', badge: 'RAPID LAUNCH',
    basePrice: 1950, monthlyPrice: 650, delivery: '7–10 days', includedModuleIds: ['mod-tech-seo'],
  },
  {
    id: 'seo-engine', name: 'SEARCH DOMINANCE', tagline: 'A stronger organic search system built to compound.', badge: 'MOST POPULAR',
    basePrice: 3400, monthlyPrice: 1250, delivery: '3–4 weeks', includedModuleIds: ['mod-tech-seo', 'mod-prog-seo', 'mod-vitals-sla'], highlight: true,
  },
  {
    id: 'bespoke-web', name: 'BESPOKE WEB & BRAND', tagline: 'A distinctive brand and high-performing digital experience.', badge: 'DIGITAL CRAFT',
    basePrice: 6800, monthlyPrice: 2400, delivery: '4–6 weeks', includedModuleIds: ['mod-tech-seo', 'mod-figma-ux', 'mod-lenis-front', 'mod-headless-cms'],
  },
  {
    id: 'full-matrix', name: 'ALL-IN-ONE MATRIX', tagline: 'Design, search, engineering, and commerce in one system.', badge: 'FULL ECOSYSTEM',
    basePrice: 12900, monthlyPrice: 4200, delivery: '8–10 weeks', includedModuleIds: ['mod-tech-seo', 'mod-prog-seo', 'mod-figma-ux', 'mod-lenis-front', 'mod-backend-db', 'mod-3d-webgl', 'mod-headless-cms', 'mod-stripe-pay', 'mod-vitals-sla'], isFlagship: true,
  },
];
