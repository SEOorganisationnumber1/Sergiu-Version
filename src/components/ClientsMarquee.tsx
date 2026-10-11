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
        <span className="text-xs font-mono uppercase tracking-wider text-[#00736e] dark:text-[#00cfc8]">
          RECOGNIZED ACROSS DESIGN &amp; TECHNOLOGY
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
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 mt-10 grid grid-cols-2 border-y border-neutral-300/70 dark:border-neutral-800/80 md:grid-cols-4">
        {HONORS.map((item, idx) => (
          <div
            key={idx}
            className={`honor-entry group flex min-h-[82px] min-w-0 items-center gap-3 px-3 py-4 transition-colors duration-300 sm:gap-4 sm:px-5 sm:py-5 ${idx % 2 === 1 ? 'border-l border-neutral-300/70 dark:border-neutral-800/80' : ''} ${idx >= 2 ? 'border-t border-neutral-300/70 dark:border-neutral-800/80 md:border-t-0' : ''} ${idx > 0 ? 'md:border-l md:border-neutral-300/70 md:dark:border-neutral-800/80' : ''} ${idx === 0 ? 'md:pl-0' : ''}`}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-300/80 bg-white/60 dark:border-neutral-700 dark:bg-white/[.035] transition-colors duration-300 group-hover:border-[#00cfc8]/60 group-hover:bg-[#00cfc8]/10">
              {item.icon}
            </span>
            <div className="min-w-0">
              <span className="block text-[10px] font-mono font-bold tracking-wider text-neutral-600 dark:text-neutral-300 sm:text-xs">
                {item.title}
              </span>
              <span className="mt-1 block text-xs font-black tracking-tight text-[#070b12] dark:text-white sm:text-sm">
                {item.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
