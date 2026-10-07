import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Footer: React.FC<{ onOpenProjectModal: () => void }> = ({ onOpenProjectModal }) => {
  const [clocks, setClocks] = useState<{ [city: string]: string }>({});

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const cities = [
        { name: 'AMSTERDAM', timeZone: 'Europe/Amsterdam' },
        { name: 'LONDON', timeZone: 'Europe/London' },
        { name: 'NEW YORK', timeZone: 'America/New_York' },
        { name: 'TOKYO', timeZone: 'Asia/Tokyo' },
        { name: 'BUCHAREST', timeZone: 'Europe/Bucharest' },
      ];

      const newClocks: { [city: string]: string } = {};
      cities.forEach((c) => {
        newClocks[c.name] = now.toLocaleTimeString('en-US', {
          timeZone: c.timeZone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
      });
      setClocks(newClocks);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="pt-24 pb-12 border-t border-neutral-300/60 dark:border-neutral-800/80 bg-[#f2f5f8] dark:bg-[#070b12] relative overflow-hidden">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Massive Call To Action Banner */}
        <div className="pb-20 border-b border-neutral-300/60 dark:border-neutral-800/80 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8] font-bold block mb-4">
              COMMISSIONS CALENDAR OPEN FOR 2026
            </span>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#070b12] dark:text-white leading-[0.92]">
              HAVE A VISION? <br />
              <span className="text-[#00cfc8]">LET'S TALK.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end">
            <button
              onClick={() => {
                sounds.playLaunch();
                onOpenProjectModal();
              }}
              onMouseEnter={() => sounds.playHover()}
              className="px-10 py-5 bg-[#070d18] dark:bg-[#00cfc8] text-white dark:text-[#070b12] font-black text-sm uppercase tracking-wider flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight size={18} />
            </button>
            <span className="text-xs font-mono text-neutral-500 mt-3">
              Direct line: partner@nxtstudio.agency
            </span>
          </div>
        </div>

        {/* Global Studio Clocks Matrix */}
        <div className="py-12 border-b border-neutral-300/60 dark:border-neutral-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {Object.entries(clocks).map(([city, timeStr]) => (
            <div key={city} className="flex flex-col">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">
                {city}
              </span>
              <span className="text-lg font-mono font-bold text-[#070b12] dark:text-white mt-1">
                {timeStr}
              </span>
              <span className="text-[10px] font-mono text-[#00cfc8]">
                ACTIVE NODE
              </span>
            </div>
          ))}
        </div>

        {/* Links and Nav Colophon */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
          <div>
            <h4 className="text-neutral-400 uppercase tracking-widest mb-4 font-bold">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <li><a href="#work" className="hover:text-[#00cfc8] transition-colors">Selected Work</a></li>
              <li><a href="#services" className="hover:text-[#00cfc8] transition-colors">Core Disciplines</a></li>
              <li><a href="#clients" className="hover:text-[#00cfc8] transition-colors">Client Roster</a></li>
              <li><a href="#studio" className="hover:text-[#00cfc8] transition-colors">Studio Manifesto</a></li>
              <li><a href="#insights" className="hover:text-[#00cfc8] transition-colors">Journal &amp; Dispatches</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-400 uppercase tracking-widest mb-4 font-bold">
              LOCATIONS
            </h4>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <li>Amsterdam • Keizersgracht</li>
              <li>London • Shoreditch High St</li>
              <li>New York • SoHo Broadway</li>
              <li>Tokyo • Shibuya Crossing</li>
              <li>Bucharest • Aviatorilor</li>
            </ul>
          </div>

          <div>
            <h4 className="text-neutral-400 uppercase tracking-widest mb-4 font-bold">
              FOLLOW &amp; HONORS
            </h4>
            <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
              <li><a href="https://awwwards.com" target="_blank" rel="noreferrer" className="hover:text-[#00cfc8] flex items-center gap-1">Awwwards ↗</a></li>
              <li><a href="https://thefwa.com" target="_blank" rel="noreferrer" className="hover:text-[#00cfc8] flex items-center gap-1">FWA Awards ↗</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#00cfc8] flex items-center gap-1">Instagram ↗</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#00cfc8] flex items-center gap-1">X (Twitter) ↗</a></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#00cfc8] flex items-center gap-1">GitHub OSS ↗</a></li>
            </ul>
          </div>

          <div className="flex flex-col justify-between items-start md:items-end">
            <div>
              <h4 className="text-neutral-400 uppercase tracking-widest mb-2 font-bold">
                PERFORMANCE SPEC
              </h4>
              <p className="text-neutral-500">
                Crafted in React 19, Three.js WebGL &amp; Lenis Momentum Scroll.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 border border-neutral-300 dark:border-neutral-700 hover:border-[#00cfc8] hover:text-[#00cfc8] transition-colors"
            >
              <span>TOP OF PAGE</span>
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom Giant Brand Logo Typography */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 border-t border-neutral-300/60 dark:border-neutral-800/80 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 NXT/STUDIO AG. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#00cfc8] font-bold">SWISS EDITORIAL ARCHITECTURE</span>
            <span>COOKIE-FREE BY DESIGN</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
