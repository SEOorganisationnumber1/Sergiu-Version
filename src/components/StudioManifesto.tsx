import React from 'react';
import { ArrowUpRight, CheckCircle2, Zap, Terminal, Shield } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const StudioManifesto: React.FC<{ onOpenProjectModal: () => void }> = ({ onOpenProjectModal }) => {
  const stats = [
    { label: 'AVERAGE LIGHTHOUSE SCORE', value: '99.4%', detail: 'Sub-second first contentful paint' },
    { label: 'AWARDS & DISTINCTIONS', value: '28+', detail: 'Awwwards, FWA, Red Dot, Webby' },
    { label: 'CLIENT CAPITAL MOBILIZED', value: '$480M', detail: 'Measured post-launch enterprise valuation' },
    { label: 'CONVERSION UPLIFT', value: '+142%', detail: 'Average across redesign engagements' },
  ];

  const pillars = [
    {
      title: 'Architectural Typographic Rigor',
      description: 'We adhere to the uncompromising principles of the International Typographic Style: mathematical grids, clear visual hierarchies, and deliberate negative space.',
      icon: <Terminal className="text-[#00736e] dark:text-[#00cfc8] transition-colors duration-300 group-hover:text-[#005d58] dark:group-hover:text-[#70fff8]" size={18} />,
    },
    {
      title: 'Real-Time WebGL & Shader Craft',
      description: 'We develop custom 3D shaders and fluid physics natively for the browser, running consistently at 60–120 FPS on every modern consumer device.',
      icon: <Zap className="text-[#00736e] dark:text-[#00cfc8] transition-colors duration-300 group-hover:text-[#005d58] dark:group-hover:text-[#70fff8]" size={18} />,
    },
    {
      title: 'Zero Technical Debt Architecture',
      description: 'No brittle templates. Every line of TypeScript and React is authored for high test coverage, strict type safety, and longevity.',
      icon: <Shield className="text-[#00736e] dark:text-[#00cfc8] transition-colors duration-300 group-hover:text-[#005d58] dark:group-hover:text-[#70fff8]" size={18} />,
    },
  ];

  return (
    <section id="studio" className="pt-14 pb-12 sm:pt-16 sm:pb-14 border-b border-neutral-300/60 dark:border-neutral-800/80 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-300/60 dark:border-neutral-800/80">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00cfc8]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00736e] dark:text-[#00cfc8]">
                STUDIO MANIFESTO // 03
              </span>
            </div>
            <h2 className="section-display-title text-4xl sm:text-6xl font-black tracking-tight text-[#070b12] dark:text-white uppercase leading-[1.05]">
              WE REJECT THE ORDINARY.
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="text-xl sm:text-2xl text-neutral-800 dark:text-neutral-200 font-normal leading-relaxed">
              In a digital landscape drowned in homogenized templates and uninspired corporate noise, 
              we build <span className="text-[#00736e] dark:text-[#00cfc8] font-bold">digital artifacts</span> that command respect, provoke emotion, and drive undeniable commercial velocity.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button
                onClick={() => {
                  sounds.playLaunch();
                  onOpenProjectModal();
                }}
                onMouseEnter={() => sounds.playHover()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#070d18] dark:bg-[#00cfc8] text-white dark:text-black font-extrabold text-xs uppercase tracking-wider group"
              >
                <span>INITIATE PARTNERSHIP</span>
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
                <CheckCircle2 size={14} className="text-[#00cfc8]" />
                <span>Accepting 2 new commissions for Q4 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quantifiable Studio Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-y border-neutral-300/60 dark:border-neutral-800/80 py-8 sm:py-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`relative flex min-w-0 flex-col justify-between px-3 py-5 sm:px-6 sm:py-6 lg:px-7 lg:py-3 ${idx % 2 === 1 ? 'border-l border-neutral-300/70 dark:border-neutral-800/80' : ''} ${idx > 0 ? 'lg:border-l lg:border-neutral-300/70 dark:lg:border-neutral-800/80' : ''} ${idx >= 2 ? 'border-t border-neutral-300/70 dark:border-neutral-800/80 lg:border-t-0' : ''} ${idx === 0 ? 'lg:pl-0' : ''}`}
            >
              <span className="text-[10px] sm:text-xs font-mono text-neutral-500 uppercase tracking-[.12em] block mb-3 sm:mb-4">
                {stat.label}
              </span>
              <div className="text-3xl sm:text-5xl font-black text-[#070b12] dark:text-white tracking-tight mb-2 tabular-nums">
                {stat.value}
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-600 dark:text-neutral-400 font-mono leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Three Core Disciplines Pillars */}
        <div className="pt-10 sm:pt-12">
          <div className="mb-2 flex items-center justify-between gap-4">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[.16em] text-neutral-500">HOW WE BUILD</span>
            <span className="hidden sm:block text-[10px] font-mono uppercase tracking-widest text-neutral-500">Three studio principles</span>
          </div>
          <div className="border-t border-neutral-300/70 dark:border-neutral-800/80">
          {pillars.map((pillar, idx) => (
            <article
              key={idx}
              className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-x-3 gap-y-3 border-b border-neutral-300/70 px-1 py-6 transition-colors duration-300 hover:bg-[#00cfc8]/[.035] sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-x-5 sm:py-7 lg:grid-cols-[4rem_minmax(14rem,.9fr)_minmax(20rem,1.1fr)_auto] lg:items-center lg:gap-8 lg:py-8"
            >
              <span className="pt-1 font-mono text-base sm:text-lg text-neutral-400 dark:text-neutral-600 transition-colors duration-300 group-hover:text-[#00736e] dark:group-hover:text-[#00cfc8]">0{idx + 1}</span>
              <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-300/80 bg-white/50 dark:border-neutral-700 dark:bg-white/[.035] transition-colors duration-300 group-hover:border-[#00cfc8]/60 group-hover:bg-[#00cfc8]/10">
                  {pillar.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#070b12] dark:text-white uppercase leading-snug tracking-tight transition-colors duration-300 group-hover:text-[#00736e] dark:group-hover:text-[#00cfc8]">
                  {pillar.title}
                </h3>
              </div>
              <p className="col-start-2 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed lg:col-start-auto">
                {pillar.description}
              </p>
              <span className="col-start-2 font-mono text-[10px] uppercase tracking-wider text-[#00736e] dark:text-[#00cfc8] lg:col-start-auto">Studio standard</span>
            </article>
          ))}
          </div>
        </div>

      </div>
    </section>
  );
};
