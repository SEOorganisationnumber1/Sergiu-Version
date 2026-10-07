import React, { useState } from 'react';
import { Check, Plus, ArrowUpRight, Search, Calculator, Sparkles, Sliders } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface PricingPackagesProps {
  onSelectPlan: (planTitle: string, price: string) => void;
}

interface AddonModule {
  id: string;
  name: string;
  category: 'SEO' | 'Design' | 'Full-Stack' | '3D & Motion' | 'Infrastructure';
  price: number;
  description: string;
  includedIn: string[];
}

const AVAILABLE_MODULES: AddonModule[] = [
  {
    id: 'mod-tech-seo',
    name: 'Technical On-Page SEO & Schema.org Architecture',
    category: 'SEO',
    price: 850,
    description: 'Zero crawl errors, JSON-LD structured data, and Google Search Console optimization.',
    includedIn: ['lite', 'seo-engine', 'bespoke-web', 'full-matrix'],
  },
  {
    id: 'mod-prog-seo',
    name: 'Programmatic SEO Engine (10,000+ Dynamic Pages)',
    category: 'SEO',
    price: 1400,
    description: 'Dynamic database-driven landing pages capturing long-tail high-intent keyword searches.',
    includedIn: ['seo-engine', 'full-matrix'],
  },
  {
    id: 'mod-figma-ux',
    name: 'Bespoke Figma UI/UX Design System & Custom Type',
    category: 'Design',
    price: 1800,
    description: 'Handcrafted Swiss editorial layouts, custom typography scales, and token systems.',
    includedIn: ['bespoke-web', 'full-matrix'],
  },
  {
    id: 'mod-lenis-front',
    name: 'Next.js / React 19 Frontend + Lenis Inertia Scroll',
    category: 'Design',
    price: 1600,
    description: 'Micro-interactions, magnetic cursor physics, and 60-120 FPS inertial scrolling.',
    includedIn: ['bespoke-web', 'full-matrix'],
  },
  {
    id: 'mod-backend-db',
    name: 'Full-Stack Node/Bun API & PostgreSQL Database',
    category: 'Full-Stack',
    price: 2400,
    description: 'Authenticated customer portals, secure REST/GraphQL endpoints, and relational schema.',
    includedIn: ['full-matrix'],
  },
  {
    id: 'mod-3d-webgl',
    name: 'Interactive 3D WebGL Centerpiece (Three.js & GLSL)',
    category: '3D & Motion',
    price: 1400,
    description: 'Custom 3D kinetic geometry with cursor physics and light/dark shader adaptation.',
    includedIn: ['full-matrix'],
  },
  {
    id: 'mod-headless-cms',
    name: 'Headless CMS Architecture (Sanity / Strapi)',
    category: 'Infrastructure',
    price: 850,
    description: 'Instant zero-code content publishing pipeline for marketing and editorial teams.',
    includedIn: ['bespoke-web', 'full-matrix'],
  },
  {
    id: 'mod-stripe-pay',
    name: 'Global Stripe Checkout & Multi-Currency Webhooks',
    category: 'Full-Stack',
    price: 750,
    description: 'Frictionless worldwide checkout with localized payment methods (SEPA, Apple Pay).',
    includedIn: ['full-matrix'],
  },
  {
    id: 'mod-vitals-sla',
    name: 'Core Web Vitals 100/100 Contractual Performance SLA',
    category: 'SEO',
    price: 600,
    description: 'Guaranteed sub-second LCP and zero Cumulative Layout Shift worldwide.',
    includedIn: ['seo-engine', 'full-matrix'],
  },
  {
    id: 'mod-i18n',
    name: 'Global Multilingual i18n Localization Engine',
    category: 'Infrastructure',
    price: 700,
    description: 'Dynamic language routing with automated hreflang tag generation for multi-country SEO.',
    includedIn: [],
  },
];

export const PricingPackages: React.FC<PricingPackagesProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'project' | 'retainer'>('project');
  const [selectedBasePlan, setSelectedBasePlan] = useState<string>('seo-engine');

  // Customizer: Set of active module IDs
  const [activeModuleIds, setActiveModuleIds] = useState<string[]>([
    'mod-tech-seo',
    'mod-prog-seo',
    'mod-vitals-sla',
  ]);

  // SEO ROI Calculator States
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(5000);
  const [avgTicket, setAvgTicket] = useState<number>(200);
  const [currentConversion, setCurrentConversion] = useState<number>(1.5);

  // SEO Simulator States
  const [simUrl, setSimUrl] = useState<string>('yourbrand.com');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanCompleted, setScanCompleted] = useState<boolean>(false);

  // ROI Calculations
  const estimatedNewVisitors = Math.round(monthlyVisitors * 3.4);
  const estimatedNewConversion = currentConversion + 1.2;
  const currentMonthlyRevenue = Math.round(monthlyVisitors * (currentConversion / 100) * avgTicket);
  const projectedMonthlyRevenue = Math.round(estimatedNewVisitors * (estimatedNewConversion / 100) * avgTicket);
  const additionalMonthlyLift = Math.max(0, projectedMonthlyRevenue - currentMonthlyRevenue);

  const PLANS = [
    {
      id: 'lite',
      name: 'LITE SPRINT',
      tagline: 'Rapid 7-10 day sprint for MVPs, product debuts, and focused campaigns',
      badge: 'RAPID LAUNCH',
      badgeColor: 'border-neutral-400 text-neutral-600 dark:text-neutral-300',
      basePrice: 1950,
      monthlyPrice: 650,
      delivery: '7 — 10 Days Delivery',
      includedModuleIds: ['mod-tech-seo'],
      highlight: false,
    },
    {
      id: 'seo-engine',
      name: 'SEARCH DOMINANCE',
      tagline: 'Top Google SERP rankings, high-intent keyword capture, and zero ad spend reliance',
      badge: 'MOST POPULAR FOR GROWTH',
      badgeColor: 'border-[#00cfc8] text-[#00cfc8] bg-[#00cfc8]/10',
      basePrice: 3400,
      monthlyPrice: 1250,
      delivery: '3 — 4 Weeks + Telemetry',
      includedModuleIds: ['mod-tech-seo', 'mod-prog-seo', 'mod-vitals-sla'],
      highlight: true,
    },
    {
      id: 'bespoke-web',
      name: 'BESPOKE WEB & BRAND',
      tagline: 'Uncompromising Swiss UI/UX in Figma + Next.js with Lenis fluid momentum',
      badge: 'LUXURY DIGITAL CRAFT',
      badgeColor: 'border-sky-400 text-sky-400 bg-sky-400/10',
      basePrice: 6800,
      monthlyPrice: 2400,
      delivery: '4 — 6 Weeks Sprint',
      includedModuleIds: ['mod-tech-seo', 'mod-figma-ux', 'mod-lenis-front', 'mod-headless-cms'],
      highlight: false,
    },
    {
      id: 'full-matrix',
      name: 'ALL-IN-ONE MATRIX',
      tagline: 'The complete artifact: SEO Supremacy + Web Design + Full-Stack App + 3D WebGL',
      badge: 'FLAGSHIP ECOSYSTEM',
      badgeColor: 'border-emerald-400 text-emerald-400 bg-emerald-400/10',
      basePrice: 12900,
      monthlyPrice: 4200,
      delivery: '8 — 10 Weeks Sprint',
      includedModuleIds: [
        'mod-tech-seo',
        'mod-prog-seo',
        'mod-figma-ux',
        'mod-lenis-front',
        'mod-backend-db',
        'mod-3d-webgl',
        'mod-headless-cms',
        'mod-stripe-pay',
        'mod-vitals-sla',
      ],
      highlight: false,
      isFlagship: true,
    },
  ];

  // Base plan selection synchronizes active modules
  const handleSelectBasePlan = (planId: string) => {
    sounds.playClick();
    setSelectedBasePlan(planId);
    const plan = PLANS.find((p) => p.id === planId);
    if (plan) {
      setActiveModuleIds(plan.includedModuleIds);
    }
  };

  // Toggle specific modular capabilities on or off
  const handleToggleModule = (moduleId: string) => {
    sounds.playClick();
    if (activeModuleIds.includes(moduleId)) {
      setActiveModuleIds(activeModuleIds.filter((id) => id !== moduleId));
    } else {
      setActiveModuleIds([...activeModuleIds, moduleId]);
    }
  };

  // Calculate dynamic custom total based on active modules
  const currentPlan = PLANS.find((p) => p.id === selectedBasePlan) || PLANS[1];
  
  // Base cost calculation
  const customConfiguredTotal = activeModuleIds.reduce((total, modId) => {
    const mod = AVAILABLE_MODULES.find((m) => m.id === modId);
    return total + (mod ? mod.price : 0);
  }, 1200); // 1200 base foundation setup

  const displayPrice = billingCycle === 'project'
    ? `$${customConfiguredTotal.toLocaleString()}`
    : `$${Math.round(customConfiguredTotal * 0.35).toLocaleString()} / mo`;

  const handleRunScan = () => {
    sounds.playLaunch();
    setIsScanning(true);
    setScanCompleted(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanCompleted(true);
      sounds.playSuccess();
    }, 1200);
  };

  return (
    <section id="pricing" className="py-24 sm:py-32 border-b border-neutral-300/60 dark:border-neutral-800/80 relative overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-neutral-300/60 dark:border-neutral-800/80">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00cfc8]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8] font-bold">
                TRANSPARENT CLIENT TIERS &amp; MODULAR STACK
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#070b12] dark:text-white uppercase leading-[1.05]">
              INVESTMENT ARCHITECTURE. NO HIDDEN SURPRISES.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Choose a calibrated base package or customize every single capability. Every tier is built on an uncompromising foundation of <strong className="text-[#070b12] dark:text-white">organic Google search dominance</strong>, sub-second speed, and precision design.
            </p>
          </div>

          {/* Billing Cycle Switcher (Gemini Style) */}
          <div className="flex items-center p-1.5 bg-neutral-200/80 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 self-start lg:self-end">
            <button
              onClick={() => {
                sounds.playClick();
                setBillingCycle('project');
              }}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                billingCycle === 'project'
                  ? 'bg-[#00cfc8] text-[#070b12] shadow-md shadow-[#00cfc8]/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              ONE-TIME PROJECT DELIVERY
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setBillingCycle('retainer');
              }}
              className={`px-5 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                billingCycle === 'retainer'
                  ? 'bg-[#00cfc8] text-[#070b12] shadow-md shadow-[#00cfc8]/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
              }`}
            >
              MONTHLY GROWTH PARTNER (-18%)
            </button>
          </div>
        </div>

        {/* 4 Gemini-Grade Base Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mt-14">
          {PLANS.map((plan) => {
            const isSelected = selectedBasePlan === plan.id;
            const price = billingCycle === 'project'
              ? `$${plan.basePrice.toLocaleString()}`
              : `$${plan.monthlyPrice.toLocaleString()} / mo`;

            return (
              <div
                key={plan.id}
                onClick={() => handleSelectBasePlan(plan.id)}
                className={`relative flex flex-col justify-between p-8 border cursor-pointer transition-all duration-300 group ${
                  isSelected
                    ? 'border-[#00cfc8] bg-white dark:bg-[#0c1422] shadow-2xl shadow-[#00cfc8]/15 scale-[1.01]'
                    : plan.highlight
                    ? 'border-neutral-400 dark:border-neutral-700 bg-white/70 dark:bg-[#0b1019]/70 hover:border-[#00cfc8]'
                    : 'border-neutral-300/80 dark:border-neutral-800 bg-white/50 dark:bg-[#090e17]/50 hover:border-neutral-400 dark:hover:border-neutral-700'
                }`}
              >
                {/* Top Badge */}
                {plan.highlight && (
                  <div className="absolute -top-3 left-8 px-3 py-0.5 bg-[#00cfc8] text-[#070b12] font-mono text-[10px] font-black uppercase tracking-widest shadow-md">
                    ★ MOST POPULAR FOR SEARCH GROWTH
                  </div>
                )}
                {plan.isFlagship && (
                  <div className="absolute -top-3 left-8 px-3 py-0.5 bg-emerald-500 text-black font-mono text-[10px] font-black uppercase tracking-widest shadow-md">
                    ⚡ ALL-IN-ONE ECOSYSTEM
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 border ${plan.badgeColor}`}>
                      {plan.badge}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {plan.delivery}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#070b12] dark:text-white uppercase tracking-tight mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 min-h-[38px] leading-relaxed mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="py-4 border-y border-neutral-200 dark:border-neutral-800 mb-6">
                    <span className="text-3xl sm:text-4xl font-black text-[#070b12] dark:text-white tracking-tight">
                      {price}
                    </span>
                    <span className="text-xs font-mono text-neutral-500 block mt-1">
                      {billingCycle === 'project' ? 'Fixed milestone contract' : 'Continuous agile sprint retainer'}
                    </span>
                  </div>

                  {/* Included capabilities */}
                  <div className="space-y-2.5 mb-8">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">
                      INCLUDED MODULES:
                    </span>
                    {AVAILABLE_MODULES.filter((m) => plan.includedModuleIds.includes(m.id)).map((mod) => (
                      <div key={mod.id} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 leading-snug">
                        <Check size={13} className="text-[#00cfc8] shrink-0 mt-0.5" />
                        <span>{mod.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      sounds.playLaunch();
                      onSelectPlan(plan.name, price);
                    }}
                    onMouseEnter={() => sounds.playHover()}
                    className={`w-full py-3.5 text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-[#00cfc8] text-[#070b12] shadow-lg shadow-[#00cfc8]/25 hover:bg-[#00baa7]'
                        : 'bg-[#070d18] dark:bg-neutral-800 text-white hover:bg-[#00cfc8] hover:text-[#070b12] dark:hover:bg-[#00cfc8] dark:hover:text-[#070b12]'
                    }`}
                  >
                    <span>SELECT {plan.name}</span>
                    <ArrowUpRight size={14} />
                  </button>

                  <div className="text-center">
                    <span className="text-[10px] font-mono text-neutral-400">
                      {isSelected ? '✓ Base plan active in customizer below' : 'Click card to customize modules'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ─── MODULAR PLAN CONFIGURATOR (ADD OR REMOVE MODULES) ─── */}
        <div className="mt-20 border border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-[#090f19] p-8 sm:p-12 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sliders size={18} className="text-[#00cfc8]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8] font-bold">
                  INTERACTIVE STACK BUILDER // ADD OR REMOVE ANY MODULE
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#070b12] dark:text-white">
                FINE-TUNE YOUR CUSTOM ARCHITECTURE.
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-2xl">
                Click any module below to toggle it on or off. Add features or remove components to tailor the scope precisely to your exact roadmap and budget.
              </p>
            </div>

            {/* Live Calculated Price Badge */}
            <div className="p-6 bg-neutral-100 dark:bg-[#060a12] border border-neutral-300 dark:border-neutral-700/80 flex flex-col items-start md:items-end justify-center shrink-0">
              <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider block">
                CUSTOM CONFIGURED TOTAL:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#00cfc8] tracking-tight">
                {displayPrice}
              </div>
              <span className="text-[10px] font-mono text-neutral-400 mt-0.5">
                {activeModuleIds.length} Modules Active • ~{Math.max(2, Math.round(activeModuleIds.length * 0.9))} Weeks Sprint
              </span>
            </div>
          </div>

          {/* Module Selector Chips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
            {AVAILABLE_MODULES.map((mod) => {
              const isActive = activeModuleIds.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => handleToggleModule(mod.id)}
                  className={`p-4 border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                    isActive
                      ? 'border-[#00cfc8] bg-[#00cfc8]/5 dark:bg-[#00cfc8]/10 shadow-sm'
                      : 'border-neutral-200 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 opacity-70 hover:opacity-100 hover:border-neutral-400'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#00cfc8] font-bold">
                        {mod.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#070b12] dark:text-white">
                        +${mod.price.toLocaleString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#070b12] dark:text-white leading-snug mb-1">
                      {mod.name}
                    </h4>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
                    <span className={isActive ? 'text-[#00cfc8] font-bold' : 'text-neutral-400'}>
                      {isActive ? '✓ INCLUDED IN STACK' : 'CLICK TO ADD MODULE'}
                    </span>
                    <button
                      type="button"
                      className={`w-6 h-6 flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-[#00cfc8] text-[#070b12]'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      {isActive ? <Check size={14} /> : <Plus size={14} />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Configurator Confirmation Footer */}
          <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-neutral-500">
              Selected Configuration: <strong className="text-[#070b12] dark:text-white">{currentPlan.name}</strong> + {activeModuleIds.length} Tailored Modules
            </div>

            <button
              type="button"
              onClick={() => {
                sounds.playLaunch();
                onSelectPlan(`Custom Configured Stack (${activeModuleIds.length} Modules)`, displayPrice);
              }}
              onMouseEnter={() => sounds.playHover()}
              className="w-full sm:w-auto px-8 py-4 bg-[#00cfc8] text-[#070b12] font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#00cfc8]/20 hover:bg-[#00baa7] transition-all"
            >
              <span>LOCK IN THIS CUSTOM PLAN ({displayPrice})</span>
              <ArrowUpRight size={15} />
            </button>
          </div>
        </div>

        {/* ─── INTERACTIVE SEO TRAFFIC & ROI CALCULATOR ─── */}
        <div className="mt-20 p-8 sm:p-12 border border-neutral-300/80 dark:border-neutral-800 bg-white/50 dark:bg-[#0a0f18]/80 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2">
                <Calculator size={18} className="text-[#00cfc8]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8] font-bold">
                  INTERACTIVE SEARCH ROI CALCULATOR
                </span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#070b12] dark:text-white">
                ESTIMATE YOUR ORGANIC REVENUE MULTIPLIER.
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Adjust your traffic metrics below to forecast additional monthly cash flow generated by category-dominating organic Google rankings coupled with high-conversion Swiss UX:
              </p>

              {/* Sliders */}
              <div className="space-y-5 pt-2">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-neutral-500">CURRENT MONTHLY UNIQUE VISITORS:</span>
                    <span className="font-bold text-[#070b12] dark:text-white">{monthlyVisitors.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-300 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00cfc8]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-neutral-500">AVERAGE ORDER VALUE / CLIENT CONTRACT (AOV):</span>
                    <span className="font-bold text-[#070b12] dark:text-white">${avgTicket}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="25"
                    value={avgTicket}
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-300 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00cfc8]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-neutral-500">CURRENT SITE CONVERSION RATE:</span>
                    <span className="font-bold text-[#070b12] dark:text-white">{currentConversion.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="5.0"
                    step="0.1"
                    value={currentConversion}
                    onChange={(e) => setCurrentConversion(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-300 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00cfc8]"
                  />
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="lg:col-span-6 bg-neutral-100 dark:bg-[#070c14] border border-neutral-300/80 dark:border-neutral-800 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                  PROJECTED MONTHLY REVENUE EXPANSION
                </span>
                
                <div className="text-4xl sm:text-5xl font-black text-[#00cfc8] tracking-tight mb-2">
                  +${additionalMonthlyLift.toLocaleString()} / mo
                </div>
                <span className="text-xs font-mono text-emerald-500 block font-bold mb-6">
                  ▲ ESTIMATED ADDITIONAL RUN-RATE FROM ORGANIC SEO &amp; HIGH-CONVERSION UX
                </span>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-200 dark:border-neutral-800 text-xs font-mono">
                  <div>
                    <span className="text-neutral-500 block">Projected Organic Traffic:</span>
                    <span className="text-sm font-bold text-[#070b12] dark:text-white">
                      ~{estimatedNewVisitors.toLocaleString()} Visitors
                    </span>
                    <span className="text-[10px] text-[#00cfc8]">(+240% Google Search Expansion)</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">Optimized Conversion:</span>
                    <span className="text-sm font-bold text-[#070b12] dark:text-white">
                      {estimatedNewConversion.toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-emerald-500">(+1.2% via Swiss Layout Restraint)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-mono text-neutral-500">
                  Calculated based on average outcomes across 28 client deployments.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playLaunch();
                    onSelectPlan('SEO & Conversion Growth Engine', '$3,400');
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#00cfc8] text-[#070b12] font-mono font-black text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  CAPTURE THIS GROWTH ↗
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ─── LIVE SEO & SPEED SIMULATOR BAR ─── */}
        <div className="mt-12 p-6 border border-neutral-300 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Search size={20} className="text-[#00cfc8]" />
            <div>
              <span className="text-xs font-mono font-bold text-[#070b12] dark:text-white uppercase block">
                RAPID AUDIT SIMULATOR // CORE WEB VITALS &amp; CRAWL EFFICIENCY
              </span>
              <span className="text-xs text-neutral-500">
                Test why your competitors are outranking you on high-intent commercial terms.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              value={simUrl}
              onChange={(e) => setSimUrl(e.target.value)}
              placeholder="yourcompany.com"
              className="px-4 py-2 text-xs font-mono bg-white dark:bg-[#070b12] border border-neutral-300 dark:border-neutral-700 text-[#070b12] dark:text-white focus:outline-none focus:border-[#00cfc8] w-full md:w-60"
            />
            <button
              type="button"
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-5 py-2 text-xs font-mono font-black uppercase bg-[#070d18] dark:bg-[#00cfc8] text-white dark:text-black hover:bg-[#00cfc8] hover:text-black transition-colors shrink-0"
            >
              {isScanning ? 'Analyzing...' : 'Run Scan Demo'}
            </button>
          </div>
        </div>

        {/* Simulated Results Banner */}
        {scanCompleted && (
          <div className="mt-4 p-6 border border-[#00cfc8]/40 bg-[#00cfc8]/5 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-[#00cfc8]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8] font-bold">
                SIMULATED PRODUCTION AUDIT FOR {simUrl.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-white dark:bg-[#0c121d] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 block mb-1">CRAWL EFFICIENCY:</span>
                <span className="text-amber-500 font-bold">42% (Index Bottlenecks)</span>
              </div>
              <div className="p-3 bg-white dark:bg-[#0c121d] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 block mb-1">CORE WEB VITALS:</span>
                <span className="text-red-400 font-bold">58/100 (SERP Penalty)</span>
              </div>
              <div className="p-3 bg-white dark:bg-[#0c121d] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 block mb-1">SCHEMA GRAPH:</span>
                <span className="text-amber-500 font-bold">Missing Rich Snippets</span>
              </div>
              <div className="p-3 bg-white dark:bg-[#0c121d] border border-neutral-200 dark:border-neutral-800">
                <span className="text-neutral-500 block mb-1">POST NXT/STUDIO:</span>
                <span className="text-[#00cfc8] font-bold">100/100 Core Vitals</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
