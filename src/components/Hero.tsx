import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Globe, ShieldCheck, Sparkles, Search, TrendingUp } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';
import { sounds } from '../utils/soundEffects';

interface HeroProps {
  isDarkMode: boolean;
  onExploreWork: () => void;
  onExplorePricing: () => void;
}

const messages = [
  'WE MAKE SEARCH WORK HARDER.',
  'WE BUILD WHAT’S NEXT.',
  'WE OWN GENERATIVE PRESENCE.',
  'WE TURN CLICKS INTO CUSTOMERS.',
];

const SCRAMBLE_GLYPHS = '01X8F#$@<>%*+=/';

const DataScramble: React.FC<{ phrase: string }> = ({ phrase }) => {
  const [elapsed, setElapsed] = useState(0);
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const letters = phrase.split('');
  const active = letters.map((char) => !/\s|[.,’&]/u.test(char));
  const activeCount = active.filter(Boolean).length;
  const duration = Math.max(1500, activeCount * 58);

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    let lastDraw = 0;
    const started = performance.now();
    const draw = (now: number) => {
      if (now - lastDraw < 48 && now - started < duration) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;
      const time = Math.min(duration, now - started);
      setElapsed(time);
      if (time < duration) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [duration, phrase, reduceMotion]);

  const locked = reduceMotion ? activeCount + 1 : Math.floor((elapsed / duration) * (activeCount + 1));
  const tick = Math.floor(elapsed / 88);
  let activeIndex = 0;
  const output = phrase.split('').map((char, index) => {
    if (/\s|[.,’&]/u.test(char)) return char;
    const position = activeIndex++;
    if (position < locked) return char;
    const glyphIndex = (position * 7 + tick * 11 + phrase.length) % SCRAMBLE_GLYPHS.length;
    return <span key={`${index}-${phrase}`} className="hero-scramble-glyph">{SCRAMBLE_GLYPHS[glyphIndex]}</span>;
  });

  return <><span aria-hidden="true" className="hero-scramble-output">{output}</span><span className="sr-only">{phrase}</span></>;
};

export const Hero: React.FC<HeroProps> = ({ isDarkMode, onExploreWork, onExplorePricing }) => {
  const [time, setTime] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [snapSignal, setSnapSignal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('SEO agency for SaaS growth');
  const [activeQuery, setActiveQuery] = useState('SEO agency for SaaS growth');
  const [reportRange, setReportRange] = useState<'7D' | '30D' | '90D'>('30D');
  const [resultExpanded, setResultExpanded] = useState(false);
  const [chartFocus, setChartFocus] = useState<number | null>(null);
  const rangeData = {
    '7D': { growth: '+34%', reach: '1.3×', clicks: '+18%', path: 'M0 62 C34 58 37 47 67 52 S112 48 135 43 S167 47 190 33 S223 37 241 23 S275 25 320 8' },
    '30D': { growth: '+240%', reach: '2.4×', clicks: '+86%', path: 'M0 62 C34 59 37 51 67 54 S112 48 135 43 S167 47 190 33 S223 37 241 23 S275 25 320 8' },
    '90D': { growth: '+318%', reach: '3.1×', clicks: '+124%', path: 'M0 63 C34 60 37 57 67 51 S112 54 135 42 S167 46 190 34 S223 34 241 20 S275 23 320 5' },
  }[reportRange];
  const resultTitle = /design|brand|web|experience/i.test(activeQuery)
    ? 'NXT/STUDIO — Digital experience systems'
    : 'NXT/STUDIO — Organic growth systems';
  const resultSnippet = /design|brand|web|experience/i.test(activeQuery)
    ? 'Distinctive digital experiences, engineered for clarity, speed and measurable growth.'
    : 'Technical SEO, search experiences and engineering built to turn high intent into measurable growth.';

  const tiltConsole = (event: React.PointerEvent<HTMLElement>) => {
    const panel = event.currentTarget;
    const bounds = panel.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    panel.style.setProperty('--dashboard-tilt-x', `${(-y * 9).toFixed(2)}deg`);
    panel.style.setProperty('--dashboard-tilt-y', `${(x * 11).toFixed(2)}deg`);
    panel.style.setProperty('--dashboard-shift-x', `${(x * 9).toFixed(1)}px`);
    panel.style.setProperty('--dashboard-shift-y', `${(y * -7).toFixed(1)}px`);
    panel.style.setProperty('--dashboard-mouse-x', `${(x * bounds.width / 2).toFixed(1)}px`);
    panel.style.setProperty('--dashboard-mouse-y', `${(y * bounds.height / 2).toFixed(1)}px`);
    panel.style.setProperty('--dashboard-light-opacity', '1');
  };

  const resetConsoleTilt = (event: React.PointerEvent<HTMLElement>) => {
    const panel = event.currentTarget;
    panel.style.setProperty('--dashboard-tilt-x', '0deg');
    panel.style.setProperty('--dashboard-tilt-y', '0deg');
    panel.style.setProperty('--dashboard-shift-x', '0px');
    panel.style.setProperty('--dashboard-shift-y', '0px');
    panel.style.setProperty('--dashboard-mouse-x', '0px');
    panel.style.setProperty('--dashboard-mouse-y', '0px');
    panel.style.setProperty('--dashboard-light-opacity', '0');
  };

  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()));
    updateTime();
    const interval = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
      setSnapSignal((current) => current + 1);
    }, 6800);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="hero-stage relative min-h-[100svh] overflow-hidden border-b border-neutral-300/60 dark:border-neutral-800/80">
      <div className="hero-grid" aria-hidden="true" />
      <ThreeCanvas isDarkMode={isDarkMode} snapSignal={snapSignal} />
      <div className="hero-vignette" aria-hidden="true" />
      <aside className="hero-search-console" aria-label="Interactive organic search performance demo" data-cursor="drag" onPointerMove={tiltConsole} onPointerLeave={resetConsoleTilt}>
        <div className="search-console-topline"><span className="search-live-dot" /> ORGANIC SEARCH / LIVE SIGNAL <button type="button" className="search-console-range ml-auto" aria-label={`Change report range, currently ${reportRange}`} onClick={() => setReportRange((current) => current === '7D' ? '30D' : current === '30D' ? '90D' : '7D')}>SEO / {reportRange}</button></div>
        <form className="search-console-query" onSubmit={(event) => { event.preventDefault(); setActiveQuery(searchQuery.trim() || 'SEO agency for SaaS growth'); setResultExpanded(false); }}>
          <Search size={16} aria-hidden="true" />
          <input aria-label="Search a sample query" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
          <button type="submit" className="search-console-enter" aria-label="Run sample search">↵</button>
        </form>
        <button type="button" className="search-console-result" aria-expanded={resultExpanded} onClick={() => setResultExpanded((expanded) => !expanded)}>
          <span className="flex items-center gap-2"><span className="search-result-rank">01</span><span className="min-w-0"><span className="search-result-url">nxtstudio.agency / search</span><strong>{resultTitle}</strong></span><ArrowUpRight size={17} className="ml-auto shrink-0 text-[#00cfc8]" /></span>
          <span className="search-result-snippet">{resultSnippet}</span>
          {resultExpanded && <span className="search-result-expanded">TOP RESULT · TECHNICAL SEO · DIGITAL DESIGN · ENGINEERING</span>}
        </button>
        <div className="search-console-chart-wrap">
          <div className="flex items-center justify-between"><span className="search-console-label">SEARCH VISIBILITY</span><span className="search-console-growth"><TrendingUp size={13} /> {rangeData.growth}</span></div>
          <div className="search-console-chart-interaction" role="slider" tabIndex={0} aria-label="Inspect search visibility chart" aria-valuemin={0} aria-valuemax={100} aria-valuenow={chartFocus ?? 100} onPointerMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); const progress = Math.max(0, Math.min(100, Math.round(((event.clientX - bounds.left) / bounds.width) * 10) * 10)); setChartFocus(progress); }} onPointerLeave={() => setChartFocus(null)} onKeyDown={(event) => { if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return; event.preventDefault(); setChartFocus((current) => Math.max(0, Math.min(100, (current ?? 100) + (event.key === 'ArrowRight' ? 10 : -10)))); }}>
            <svg className="search-console-chart" viewBox="0 0 320 72" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="search-area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#00d6ce" stopOpacity=".28"/><stop offset="1" stopColor="#00d6ce" stopOpacity="0"/></linearGradient></defs><path className="search-chart-area" d={`${rangeData.path} V72 H0Z`}/><path className="search-chart-line" d={rangeData.path}/><circle cx={chartFocus === null ? 320 : chartFocus * 3.2} cy={chartFocus === null ? 8 : 62 - chartFocus * .54} r="4" className="search-chart-end"/></svg>
            {chartFocus !== null && <span className="search-chart-tooltip" style={{ left: `${chartFocus}%` }}>{reportRange} · {Math.round(1 + chartFocus * .024)}× visibility</span>}
          </div>
          <div className="search-console-stats"><span><strong>{rangeData.reach}</strong> qualified reach</span><span><strong>{rangeData.clicks}</strong> high intent clicks</span></div>
        </div>
        <div className="search-console-foot"><span>INDEXING SYNCHRONIZED</span><span className="search-console-wave">⌁⌁⌁</span><span>LIVE</span></div>
      </aside>
      <div className="hero-inner relative z-10 mx-auto flex min-h-[100svh] max-w-[1680px] flex-col justify-between px-5 pb-7 pt-28 sm:px-10 lg:px-16">
        <div className="hero-status flex flex-wrap items-center justify-between gap-4 border-b border-neutral-300/60 py-4 text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-500 dark:border-white/10 dark:text-neutral-400 sm:text-[11px]">
          <div className="hero-status-agency flex items-center gap-2"><span className="status-dot" /> INDEPENDENT DIGITAL AGENCY</div>
          <div className="hero-status-disciplines flex items-center gap-1.5 text-[9px] text-[#00736e] dark:text-[#00e2d8] sm:gap-2 sm:text-[11px]"><ShieldCheck size={12} /> SEO / DESIGN / FULL-STACK</div>
          <div className="hero-status-global flex items-center gap-2"><Globe size={13} className="text-[#00bdb6]" /><span>AVAILABLE WORLDWIDE</span><span className="text-[#00736e] dark:text-[#00cfc8]">{time || '00:00:00'} UTC</span></div>
        </div>

        <div className="hero-copy my-auto py-12 sm:py-12 lg:py-6">
          <div className="mb-7 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400 sm:text-xs"><span className="h-px w-9 bg-[#00cfc8]" /> DIGITAL PARTNER FOR THE NEXT ERA</div>
          <h1 className="hero-title max-w-[1200px] text-[clamp(3.6rem,11.8vw,11.8rem)] font-extrabold leading-[0.82] tracking-[-0.085em] text-[#07111a] dark:text-white">DIGITAL<br className="sm:hidden" /> THAT<span className="text-[#00bdb6]">.</span></h1>
          <div className="hero-claim mt-7 min-h-[2.4em] max-w-5xl text-[clamp(1.25rem,3.15vw,3.3rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-neutral-600 dark:text-neutral-200 sm:mt-10 sm:min-h-[1.3em]">
            <span className="hero-claim-phrase"><span className="hero-claim-prefix text-[#00736e] dark:text-[#00cfc8]">WE</span><DataScramble key={messages[messageIndex]} phrase={messages[messageIndex].slice(3)} /></span>
          </div>
          <p className="mt-7 max-w-xl text-sm leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">We build high-performance digital experiences for ambitious companies ready to grow.</p>
          <div className="hero-actions mt-8 flex flex-wrap gap-3">
            <button onClick={() => { sounds.playClick(); onExplorePricing(); }} className="hero-cta inline-flex items-center gap-2 rounded-full bg-[#00cfc8] px-4 py-3.5 text-sm font-bold text-[#07111a] transition-transform hover:-translate-y-1 sm:gap-8 sm:px-6 sm:py-4" data-cursor="view">Start a project <ArrowUpRight size={17} /></button>
            <button onClick={() => { sounds.playClick(); onExploreWork(); }} className="inline-flex items-center gap-2 rounded-full border border-neutral-400/70 px-4 py-3.5 text-sm font-semibold text-neutral-800 transition-colors hover:border-[#00cfc8] hover:text-[#00b5ad] dark:border-white/20 dark:text-white dark:hover:text-[#00e2d8] sm:gap-3 sm:px-6 sm:py-4">Explore our work <ArrowDownRight size={17} /></button>
          </div>
          <div className="hero-proof-grid mt-10 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap">
            {['#1 Organic SEO Domination', 'Core Web Vitals 100/100', 'Bespoke Swiss UI/UX', 'Full-Stack Web Apps'].map((tag, i) => <span key={tag} className={`proof-badge proof-badge-${i} inline-flex min-h-10 items-center rounded-full border px-2.5 py-2 text-[9px] font-mono tracking-wide sm:px-3.5 sm:text-[11px] ${i === 0 ? 'border-[#00cfc8]/50 bg-[#00cfc8]/10 text-[#00736e] dark:text-[#4ce6df]' : 'border-neutral-400/40 bg-white/50 text-neutral-600 dark:border-white/15 dark:bg-black/20 dark:text-neutral-300'}`} data-cursor={tag.startsWith('Core') || tag.startsWith('Full') ? 'code' : undefined}>{i === 0 && <Sparkles size={11} className="mr-1 inline shrink-0" />}{tag}</span>)}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-5 border-t border-neutral-300/60 pt-5 text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500 dark:border-white/10 dark:text-neutral-400">
          <span>Independent by design. International by default.</span>
          <button type="button" onClick={onExplorePricing} className="transition-colors hover:text-[#00bdb6]">Explore services &amp; plans ↗</button>
        </div>
      </div>
    </section>
  );
};
