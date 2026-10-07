import React, { useState } from 'react';
import { Zap, Cpu, Compass, Rocket, Search, Plus, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  deliverables: string[];
  techStack: string[];
  description: string;
  kpi: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    num: '01',
    title: 'ORGANIC SEO DOMINATION & SEARCH ARCHITECTURE',
    subtitle: '#1 Priority: Massive Google Search capture, high-intent keywords, and authority',
    icon: <Search className="text-[#00cfc8]" size={28} />,
    description: 'Websites without search traffic are invisible liabilities. We engineer programmatic SEO infrastructures from day one, eliminate crawl bottlenecks, and guarantee sub-millisecond Core Web Vitals to capture high-intent buyers directly from Google search rankings.',
    deliverables: [
      'Technical SEO architecture & crawl budget optimization',
      'Programmatic SEO engine (scalable dynamic indexable pages)',
      'Semantic keyword clustering & high-intent buyer mapping',
      'Schema.org Rich Snippets & guaranteed 100/100 Core Web Vitals',
    ],
    techStack: ['Google Search Console', 'Schema Markup', 'Lighthouse 100', 'BigQuery', 'Ahrefs API'],
    kpi: 'Avg. +340% Organic Traffic',
  },
  {
    id: 's2',
    num: '02',
    title: 'BESPOKE WEB DESIGN & BRAND ARCHITECTURE',
    subtitle: 'Unique Swiss aesthetics and conversion-engineered design languages',
    icon: <Compass className="text-[#00cfc8]" size={28} />,
    description: 'A distinctive brand voice is the highest form of defensibility. We engineer complete design systems in Figma, uncompromising typography scales, and interactive prototypes mathematically calibrated for higher conversion velocity.',
    deliverables: [
      'Bespoke Figma UI/UX design (zero templates or shortcuts)',
      'Scalable design systems & multi-tier Figma tokens',
      'Flawless responsive behavior across mobile, tablet, and 4K displays',
      'Art direction, editorial guidelines, and dynamic logomarks',
    ],
    techStack: ['Figma Tokens', 'Custom Typography', 'Motion Choreography', 'Brand Guidelines'],
    kpi: '+48% Conversion Rate Lift',
  },
  {
    id: 's3',
    num: '03',
    title: 'FULL-STACK WEB APPS & BACKEND ENGINEERING',
    subtitle: 'Scalable web platforms: React/Next.js frontend + robust backend + secure databases',
    icon: <Rocket className="text-[#00cfc8]" size={28} />,
    description: 'We architect enterprise-grade web applications engineered for heavy concurrency. From client dashboards and authenticated portal workflows to high-throughput REST/GraphQL APIs, Stripe billing, and hardened PostgreSQL databases.',
    deliverables: [
      'Modern React 19 / Next.js frontend with modular architecture',
      'High-throughput backend APIs (Node / Bun / Express / NestJS)',
      'Structured & encrypted relational databases (PostgreSQL / Redis)',
      'Stripe payments, automated webhooks, and secure client admin suites',
    ],
    techStack: ['React 19', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe API', 'Docker'],
    kpi: '99.99% Guaranteed Uptime',
  },
  {
    id: 's4',
    num: '04',
    title: 'LITE SPRINT LANDING PAGES (HIGH-CONVERSION)',
    subtitle: 'Rapid 7-10 day deployment for MVPs, product launches, and targeted campaigns',
    icon: <Zap className="text-[#00cfc8]" size={28} />,
    description: 'For newly launched products, venture sprints, or focused sales campaigns, we craft ultra-fast, clutter-free landing pages optimized obsessively for customer acquisition and qualified lead generation.',
    deliverables: [
      '1x High-impact sales landing page engineered for maximum conversion',
      'Native On-Page technical SEO foundation included',
      'Sub-second first contentful paint on all mobile networks',
      'Lead capture form integration with instant CRM / email hooks',
    ],
    techStack: ['Vite', 'Tailwind CSS', 'React', 'Cloudflare Pages', 'Lead Gen Hooks'],
    kpi: '7 — 10 Days Delivery',
  },
  {
    id: 's5',
    num: '05',
    title: 'IMMERSIVE 3D WEBGL & REAL-TIME INTERACTION',
    subtitle: 'Striking Three.js shader experiences running at consistent 60–120 FPS',
    icon: <Cpu className="text-[#00cfc8]" size={28} />,
    description: 'Photorealistic WebGL visual centerpieces that provoke emotion and command category authority. We engineer lightweight GLSL shaders, magnetic cursor physics, and 3D configurators with zero browser stutter.',
    deliverables: [
      'Interactive Three.js scenes & custom GLSL fragment shaders',
      'Mobile GPU optimization locked at 60+ FPS without thermal throttling',
      'Magnetic cursor physics and fluid Lenis momentum choreography',
      'Interactive in-browser 3D product configurators',
    ],
    techStack: ['Three.js', 'GLSL Shaders', 'WebGPU', 'Blender', 'Lenis Momentum'],
    kpi: '3.8x Avg. Time on Page',
  },
];

export const ServicesSection: React.FC<{ onOpenProjectModal: () => void }> = ({ onOpenProjectModal }) => {
  const [expandedId, setExpandedId] = useState<string>('s1');

  const toggleService = (id: string) => {
    sounds.playClick();
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="services" className="py-24 sm:py-32 border-b border-neutral-300/60 dark:border-neutral-800/80 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00cfc8]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8] font-bold">
              CORE COMPETENCIES &amp; DISCIPLINES
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#070b12] dark:text-white uppercase">
            WE CRAFT DIGITAL WEAPONS FOR DISRUPTORS.
          </h2>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
            Every deliverable is engineered with precision: ruthless aesthetic rigor coupled with scalable, defect-free codebase architecture.
          </p>
        </div>

        {/* Accordion / Matrix Container */}
        <div className="border-t border-neutral-300/80 dark:border-neutral-800">
          {SERVICES.map((s) => {
            const isExpanded = expandedId === s.id;
            return (
              <div
                key={s.id}
                className={`border-b border-neutral-300/80 dark:border-neutral-800 transition-colors duration-300 ${
                  isExpanded ? 'bg-white/60 dark:bg-[#0b1019]/60' : 'hover:bg-neutral-200/30 dark:hover:bg-neutral-900/30'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleService(s.id)}
                  onMouseEnter={() => sounds.playHover()}
                  className="py-8 px-4 sm:px-6 flex items-center justify-between cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="font-mono text-lg sm:text-xl font-bold text-[#00cfc8]">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-3xl font-black text-[#070b12] dark:text-white uppercase tracking-tight group-hover:text-[#00cfc8] transition-colors duration-200">
                        {s.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1">
                        {s.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="hidden md:inline-block px-3 py-1 text-xs font-mono rounded bg-neutral-200 dark:bg-neutral-800 text-[#070b12] dark:text-[#00cfc8] font-bold">
                      {s.kpi}
                    </span>
                    
                    {/* Animated Smooth Plus/Minus Toggle Button */}
                    <div
                      className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${
                        isExpanded
                          ? 'bg-[#00cfc8] text-[#070b12] border-[#00cfc8] rotate-45 shadow-md shadow-[#00cfc8]/30'
                          : 'border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rotate-0 group-hover:border-[#00cfc8]'
                      }`}
                    >
                      <Plus size={18} className="transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Smooth CSS Grid Height Transition Container */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-dashed border-neutral-200 dark:border-neutral-800/80">
                      
                      <div className="lg:col-span-6 flex flex-col justify-between">
                        <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {s.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {s.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-mono rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-6 bg-neutral-100 dark:bg-neutral-900/50 p-6 border border-neutral-300/60 dark:border-neutral-800">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#00cfc8] font-bold mb-4">
                          DELIVERABLES &amp; SYSTEM OUTPUTS:
                        </h4>
                        <ul className="space-y-3">
                          {s.deliverables.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-sm font-medium text-neutral-800 dark:text-neutral-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#00cfc8]" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-6 pt-4 border-t border-neutral-300/60 dark:border-neutral-800 flex items-center justify-between">
                          <span className="text-xs font-mono text-neutral-500">
                            Average Deployment: 3 — 6 Weeks
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              sounds.playLaunch();
                              onOpenProjectModal();
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-[#00cfc8] hover:underline"
                          >
                            <span>REQUEST SCOPE SPEC</span>
                            <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
