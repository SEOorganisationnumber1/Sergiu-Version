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
      icon: <Terminal className="text-[#00cfc8]" size={20} />,
    },
    {
      title: 'Real-Time WebGL & Shader Craft',
      description: 'We develop custom 3D shaders and fluid physics natively for the browser, running consistently at 60–120 FPS on every modern consumer device.',
      icon: <Zap className="text-[#00cfc8]" size={20} />,
    },
    {
      title: 'Zero Technical Debt Architecture',
      description: 'No brittle templates. Every line of TypeScript and React is authored for high test coverage, strict type safety, and longevity.',
      icon: <Shield className="text-[#00cfc8]" size={20} />,
    },
  ];

  return (
    <section id="studio" className="py-24 sm:py-32 border-b border-neutral-300/60 dark:border-neutral-800/80 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-300/60 dark:border-neutral-800/80">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00cfc8]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8]">
                STUDIO MANIFESTO // 03
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#070b12] dark:text-white uppercase leading-[1.05]">
              WE REJECT THE ORDINARY.
            </h2>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <p className="text-xl sm:text-2xl text-neutral-800 dark:text-neutral-200 font-normal leading-relaxed">
              In a digital landscape drowned in homogenized templates and uninspired corporate noise, 
              we build <span className="text-[#00cfc8] font-bold">digital artifacts</span> that command respect, provoke emotion, and drive undeniable commercial velocity.
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
                <span>Accepting 2 new commissions for Q1 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quantifiable Studio Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-b border-neutral-300/60 dark:border-neutral-800/80">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 border border-neutral-300/80 dark:border-neutral-800 bg-white/40 dark:bg-[#0b1019]/40 flex flex-col justify-between hover:border-[#00cfc8] transition-colors duration-300"
            >
              <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-4">
                {stat.label}
              </span>
              <div className="text-4xl sm:text-5xl font-black text-[#070b12] dark:text-white tracking-tight mb-2">
                {stat.value}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Three Core Disciplines Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 border border-neutral-300/80 dark:border-neutral-800 bg-white/40 dark:bg-[#0c121d]/40 flex flex-col justify-between group hover:border-[#00cfc8] transition-all duration-300"
            >
              <div>
                <div className="w-10 h-10 mb-6 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center group-hover:bg-[#00cfc8] group-hover:text-black transition-colors duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-[#070b12] dark:text-white uppercase mb-3">
                  {pillar.title}
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800/80 font-mono text-[11px] text-[#00cfc8]">
                DISCIPLINE 0{idx + 1} // STANDARD
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
