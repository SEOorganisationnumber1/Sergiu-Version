import React from 'react';
import { Award, Trophy, Star, ShieldCheck } from 'lucide-react';

const CLIENTS = [
  'POLESTAR',
  'RIMOWA',
  'SONY MUSIC',
  'MONCLER',
  'LEDGER',
  'KLARNA',
  'OPENAI',
  'NIKE LAB',
  'BANG & OLUFSEN',
  'ARC\'TERYX',
  'VITRA',
  'BALENCIAGA',
];

const HONORS = [
  { icon: <Trophy size={16} className="text-[#00cfc8]" />, title: 'AWWWARDS', count: '14x SOTD / 2x SOTM' },
  { icon: <Award size={16} className="text-[#00cfc8]" />, title: 'FWA', count: '8x FWA OF THE DAY' },
  { icon: <Star size={16} className="text-[#00cfc8]" />, title: 'WEBBY AWARDS', count: '4x CATEGORY WINNER' },
  { icon: <ShieldCheck size={16} className="text-[#00cfc8]" />, title: 'RED DOT', count: 'BEST OF THE BEST 2025' },
];

export const ClientsMarquee: React.FC = () => {
  return (
    <section id="clients" className="py-20 border-b border-neutral-300/60 dark:border-neutral-800/80 overflow-hidden bg-neutral-100/50 dark:bg-[#070b12]/50">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00cfc8]" />
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            TRUSTED BY CATEGORY CREATORS &amp; ENTERPRISE TITANS
          </span>
        </div>
        <span className="text-xs font-mono text-[#00cfc8]">
          OVER $480M+ ENTERPRISE VALUE GENERATED
        </span>
      </div>

      {/* Kinetic Infinite Marquee Row 1 */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap py-4 border-y border-neutral-300/60 dark:border-neutral-800/80 select-none">
        <div className="inline-flex animate-marquee gap-12 sm:gap-20 items-center">
          {CLIENTS.concat(CLIENTS).map((client, idx) => (
            <div
              key={idx}
              className="flex items-center gap-8 group cursor-default"
            >
              <span className="text-2xl sm:text-4xl font-black tracking-tighter text-neutral-400 dark:text-neutral-600 group-hover:text-[#00cfc8] transition-colors duration-300">
                {client}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00cfc8]/40" />
            </div>
          ))}
        </div>
      </div>

      {/* Honors & Recognitions Strip */}
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {HONORS.map((item, idx) => (
          <div
            key={idx}
            className="p-5 border border-neutral-300/80 dark:border-neutral-800 bg-white/60 dark:bg-[#0c121d]/60 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-neutral-700 dark:text-neutral-300">
                {item.title}
              </span>
              {item.icon}
            </div>
            <div className="text-sm sm:text-base font-black tracking-tight text-[#070b12] dark:text-white">
              {item.count}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
