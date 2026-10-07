import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Sparkles, Globe, ShieldCheck } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';
import { sounds } from '../utils/soundEffects';

interface HeroProps {
  isDarkMode: boolean;
  onExploreWork: () => void;
  onExplorePricing: () => void;
  onOpenProjectModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  isDarkMode,
  onExploreWork,
  onExplorePricing,
  onOpenProjectModal,
}) => {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-20 border-b border-neutral-300/60 dark:border-neutral-800/80 overflow-hidden">
      {/* 3-Column Architectural Grid Container */}
      <div className="max-w-[1680px] mx-auto relative min-h-[calc(100vh-80px)] flex flex-col justify-between">
        
        {/* Background Vertical Architectural Grid Hairlines */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-1 md:grid-cols-3 z-0">
          <div className="border-r border-neutral-300/40 dark:border-neutral-800/60 h-full hidden md:block" />
          <div className="border-r border-neutral-300/40 dark:border-neutral-800/60 h-full hidden md:block" />
          <div className="h-full hidden md:block" />
        </div>

        {/* Top Status Bar (Mirroring Screenshot: INDEPENDENT DIGITAL AGENCY | DESIGN / DEV / SEARCH | AVAILABLE WORLDWIDE) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 border-b border-neutral-300/60 dark:border-neutral-800/80 text-[11px] font-mono tracking-widest uppercase text-neutral-500 dark:text-neutral-400 py-4 px-4 sm:px-8 lg:px-12 bg-[#f2f5f8]/50 dark:bg-[#080c12]/50 backdrop-blur-xs">
          <div className="flex items-center gap-2 py-1 md:py-0">
            <span className="w-2 h-2 rounded-full bg-[#00cfc8] animate-ping" />
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">
              INDEPENDENT DIGITAL AGENCY
            </span>
          </div>

          <div className="md:px-6 flex items-center justify-start md:justify-center gap-2 py-1 md:py-0">
            <ShieldCheck size={13} className="text-[#00cfc8]" />
            <span className="font-bold text-[#00cfc8]">SEO SUPREMACY / BESPOKE DESIGN / FULL-STACK</span>
          </div>

          <div className="flex items-center justify-start md:justify-end gap-2.5 py-1 md:py-0">
            <Globe size={13} className="text-[#00cfc8] animate-spin" style={{ animationDuration: '18s' }} />
            <span>AVAILABLE WORLDWIDE</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-neutral-200/80 dark:bg-neutral-800 text-[#070b12] dark:text-[#00cfc8] ml-1">
              {time || '12:30:00'} UTC
            </span>
          </div>
        </div>

        {/* Center Main Stage: Huge Kinetic Headline + 3D WebGL Canvas */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 flex-grow items-center px-4 sm:px-8 lg:px-12 py-10 lg:py-16 gap-8">
          
          {/* Left Column: Bold Editorial Headline (Exact match from screenshot) */}
          <div className="lg:col-span-8 flex flex-col justify-center select-none">
            
            {/* Word: DIGITAL THAT */}
            <h1 className="text-[13vw] sm:text-[10vw] lg:text-[7.2vw] xl:text-[8vw] font-black tracking-[-0.04em] leading-[0.9] text-[#070b12] dark:text-white uppercase font-sans">
              DIGITAL THAT
            </h1>

            {/* Word Highlight Box: BRINGS QUALIFIED (Exact match from screenshot) */}
            <div className="my-2 sm:my-3 lg:my-4 inline-block self-start">
              <button
                type="button"
                onClick={() => {
                  sounds.playLaunch();
                  onOpenProjectModal();
                }}
                className="bg-[#00cfc8] text-white px-4 sm:px-6 md:px-8 py-1 sm:py-2 md:py-2.5 shadow-2xl shadow-[#00cfc8]/30 transition-transform duration-300 hover:scale-[1.02] active:scale-95 text-left cursor-pointer"
                data-cursor="view"
                title="Click to start a project"
              >
                <span className="text-[11vw] sm:text-[8.5vw] lg:text-[6.2vw] xl:text-[6.8vw] font-black tracking-[-0.035em] leading-[0.9] uppercase text-white block">
                  BRINGS QUALIFIED
                </span>
              </button>
            </div>

            {/* Word: GROWTH */}
            <div className="flex items-center gap-4">
              <h1 className="text-[13vw] sm:text-[10vw] lg:text-[7.2vw] xl:text-[8vw] font-black tracking-[-0.04em] leading-[0.9] text-[#00cfc8] dark:text-[#00cfc8] uppercase font-sans relative group cursor-default">
                <span>GROWTH</span>
                <span className="inline-block w-1.5 sm:w-2.5 h-[0.8em] bg-[#00cfc8] ml-2 animate-pulse align-baseline" />
              </h1>

              {/* Award Stamp Badge */}
              <div className="hidden xl:flex items-center gap-3 ml-6 px-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md">
                <Sparkles size={16} className="text-[#00cfc8]" />
                <span className="text-xs font-mono tracking-tight text-neutral-600 dark:text-neutral-300">
                  AWWWARDS SOTD &amp; FWA 2025/2026
                </span>
              </div>
            </div>

            {/* Agency Micro-Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6 sm:mt-8">
              {[
                '#1 Organic SEO Domination',
                'Core Web Vitals 100/100',
                'Bespoke Swiss UI/UX',
                'Full-Stack Web Apps',
                'Lite Sprint Landings',
              ].map((tag, idx) => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-xs font-mono rounded-full border transition-all ${
                    idx === 0
                      ? 'border-[#00cfc8] bg-[#00cfc8]/10 text-[#00cfc8] font-bold'
                      : 'border-neutral-300/80 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 bg-white/40 dark:bg-neutral-900/40'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive WebGL Centerpiece */}
          <div className="lg:col-span-4 h-[340px] sm:h-[420px] lg:h-[520px] relative flex items-center justify-center">
            {/* 3D Background Lighting Aura */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00cfc8]/20 via-transparent to-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
            
            {/* 3D Kinetic Canvas */}
            <ThreeCanvas isDarkMode={isDarkMode} />

            {/* Interactive 3D Orbit hint */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded bg-neutral-900/90 text-white/90 backdrop-blur-md border border-white/10 pointer-events-none flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#00cfc8] animate-ping" />
              <span>SEARCH GROWTH &amp; CORE WEB ENGINE 3D</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Mirroring Screenshot: We build high-performance brands... + EXPLORE THE WORK ↗) */}
        <div className="relative z-10 border-t border-neutral-300/60 dark:border-neutral-800/80 grid grid-cols-1 md:grid-cols-12 items-center px-4 sm:px-8 lg:px-12 py-6 gap-6 bg-[#f2f5f8]/80 dark:bg-[#080c12]/80 backdrop-blur-sm">
          
          {/* Subtext description */}
          <div className="md:col-span-8 lg:col-span-8">
            <p className="text-base sm:text-lg lg:text-xl font-medium tracking-tight text-[#070b12] dark:text-neutral-200 max-w-2xl leading-relaxed">
              We build high-performance brands and digital experiences for ambitious companies that refuse to stand still.
            </p>
          </div>

          {/* Action Buttons: EXPLORE THE WORK ↗ + PRICING & MODULES */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-wrap items-center justify-start md:justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onExplorePricing();
              }}
              onMouseEnter={() => sounds.playHover()}
              className="px-6 py-4 text-xs font-mono font-bold uppercase tracking-wider text-[#070b12] dark:text-white border border-neutral-300 dark:border-neutral-700 hover:border-[#00cfc8] hover:text-[#00cfc8] transition-colors cursor-pointer"
            >
              PRICING &amp; MODULES
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onExploreWork();
              }}
              onMouseEnter={() => sounds.playHover()}
              data-cursor="pointer"
              className="relative group inline-flex items-center gap-3 px-7 py-4 bg-[#070d18] dark:bg-[#070d18] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-2xl hover:shadow-[#00cfc8]/20 transition-all duration-300 border border-neutral-800 dark:border-[#00cfc8]/40 hover:border-[#00cfc8]"
            >
              <span>EXPLORE THE WORK</span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-xs bg-[#00cfc8] text-[#070d18] group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={15} />
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
