import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { OverlayScrollArea } from './OverlayScrollArea';
import { ArrowUpRight, BookOpen, Clock, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

const ARTICLES: Article[] = [
  {
    id: 'a1',
    title: 'The Anatomy of 60 FPS WebGL on Consumer Mobile Devices',
    category: 'TECHNICAL CRAFT',
    date: 'MARCH 2026',
    readTime: '6 MIN READ',
    excerpt: 'How we balance geometric polygon counts, instanced rendering, and deferred fragment shaders to deliver console-grade graphics inside mobile browsers.',
    content: 'Delivering uncompromised 3D graphics in the browser demands rigorous memory budget management. In this deep dive, we break down our approach to WebGL 2.0 and WebGPU pipeline management, dynamic LOD (Level of Detail) scaling based on GPU vendor benchmarks, and post-processing bloom optimization without sacrificing battery life.'
  },
  {
    id: 'a2',
    title: 'Why Swiss Architectural Grids Dominate Luxury E-Commerce',
    category: 'DESIGN THEORY',
    date: 'FEBRUARY 2026',
    readTime: '4 MIN READ',
    excerpt: 'Examining why strict mathematical ratios, asymmetric typography, and generous negative space produce higher average order values than generic layouts.',
    content: 'When premium consumers evaluate luxury goods online, cognitive perception of value is anchored in visual restraint. By applying Josef Müller-Brockmann’s grid systems to high-velocity e-commerce, we establish an implicit sense of authority and timeless longevity that traditional digital stores fail to achieve.'
  },
  {
    id: 'a3',
    title: 'Micro-Interactions & The Psychology of High-Intent Conversion',
    category: 'ENGINEERING & CRO',
    date: 'JANUARY 2026',
    readTime: '5 MIN READ',
    excerpt: 'The invisible mechanics of tactile feedback: why subtle synthesized Web Audio clicks and magnetic cursor physics elevate perceived trust.',
    content: 'Feedback loops define the boundary between static documents and reactive digital software. Tactile micro-interactions—from sub-pixel button spring dynamics to synthetic Web Audio haptics—subconsciously reassure the visitor that every interaction has purpose, directly reducing checkout abandonment by up to 28%.'
  },
];

export const InsightsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isArticleClosing, setIsArticleClosing] = useState(false);
  const articleCloseTimer = useRef<number | null>(null);

  const closeArticle = () => {
    if (!selectedArticle || isArticleClosing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSelectedArticle(null);
      return;
    }
    setIsArticleClosing(true);
    articleCloseTimer.current = window.setTimeout(() => {
      setSelectedArticle(null);
      setIsArticleClosing(false);
      articleCloseTimer.current = null;
    }, 240);
  };

  useEffect(() => () => {
    if (articleCloseTimer.current !== null) window.clearTimeout(articleCloseTimer.current);
  }, []);

  useEffect(() => {
    if (!selectedArticle) return;
    if (articleCloseTimer.current !== null) {
      window.clearTimeout(articleCloseTimer.current);
      articleCloseTimer.current = null;
    }
    setIsArticleClosing(false);
  }, [selectedArticle]);

  useEffect(() => {
    if (!selectedArticle) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') closeArticle(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle, isArticleClosing]);

  return (
    <section id="insights" className="pt-12 pb-16 sm:pt-14 sm:pb-20 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-300/60 dark:border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00cfc8]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00736e] dark:text-[#00cfc8]">
                EDITORIAL JOURNAL &amp; DISPATCHES
              </span>
            </div>
            <h2 className="section-display-title text-4xl sm:text-6xl font-black tracking-tight text-[#070b12] dark:text-white uppercase">
              INSIGHTS &amp; PERSPECTIVES.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <BookOpen size={16} className="text-[#00cfc8]" />
            <span>RESEARCH PAPERS ON DESIGN &amp; TECHNOLOGY</span>
          </div>
        </div>

        {/* Editorial feature plus a compact dispatch list gives the journal a clear reading order. */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-2 lg:gap-6">
          {ARTICLES.map((article, idx) => {
            const isFeatured = idx === 0;
            return (
              <article
                key={article.id}
                onClick={() => {
                  sounds.playLaunch();
                  setIsArticleClosing(false);
                  setSelectedArticle(article);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    sounds.playLaunch();
                    setIsArticleClosing(false);
                    setSelectedArticle(article);
                  }
                }}
                onMouseEnter={() => sounds.playHover()}
                role="button"
                tabIndex={0}
                aria-label={`Read article: ${article.title}`}
                data-cursor="view"
                className={`insight-entry group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden border border-neutral-300/80 transition-[transform,border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-[#00cfc8]/70 hover:shadow-[0_22px_55px_rgba(0,145,140,.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00cfc8] dark:border-neutral-800 dark:hover:shadow-[0_22px_55px_rgba(0,207,200,.08)] ${isFeatured ? 'insight-feature min-h-[360px] rounded-[28px] bg-gradient-to-br from-white/85 via-white/55 to-[#00cfc8]/[.06] p-6 sm:col-span-2 sm:min-h-[390px] sm:p-9 lg:col-span-7 lg:row-span-2 lg:min-h-[450px] lg:p-10 dark:from-[#121d29] dark:via-[#0c121d] dark:to-[#00cfc8]/[.08]' : 'min-h-[220px] rounded-[24px] bg-white/45 p-6 sm:p-7 lg:col-span-5 dark:bg-[#0c121d]/45'}`}
              >
                <span aria-hidden="true" className={`insight-index ${isFeatured ? 'insight-index-feature' : 'insight-index-compact'}`}>0{idx + 1}</span>
                {isFeatured && <span aria-hidden="true" className="pointer-events-none absolute left-8 top-0 h-px w-28 bg-gradient-to-r from-transparent via-[#00cfc8] to-transparent sm:left-10" />}
                <div className="relative z-10">
                  <div className={`mb-5 flex items-center justify-between gap-3 text-[10px] font-mono text-neutral-500 sm:text-xs ${isFeatured ? 'sm:mb-10' : ''}`}>
                    <span className="font-bold uppercase tracking-wider text-[#00736e] dark:text-[#00cfc8]">
                      0{idx + 1} <span className="text-neutral-400">//</span> {article.category}
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5">
                      <Clock size={12} /> {article.readTime}
                    </span>
                  </div>

                  <h3 className={`max-w-[20ch] font-black uppercase tracking-tight text-[#070b12] transition-colors duration-300 group-hover:text-[#00736e] dark:text-white dark:group-hover:text-[#00cfc8] ${isFeatured ? 'text-2xl leading-[1.08] sm:text-4xl lg:text-5xl' : 'text-lg leading-tight sm:text-xl'}`}>
                    {article.title}
                  </h3>

                  <p className={`mt-3 max-w-[58ch] text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 ${isFeatured ? 'sm:mt-5 sm:text-base' : 'line-clamp-3'}`}>
                    {article.excerpt}
                  </p>
                </div>

                <div className={`relative z-10 mt-6 flex items-center justify-between gap-3 border-t border-neutral-300/70 pt-4 text-[10px] font-mono text-neutral-500 transition-colors group-hover:text-[#00736e] sm:text-xs dark:border-neutral-700/80 dark:group-hover:text-[#00cfc8] ${isFeatured ? 'sm:mt-8 sm:pt-5' : ''}`}>
                  <span>{article.date}</span>
                  <span className="inline-flex items-center gap-1 font-bold">
                    READ DISPATCH <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && createPortal(
        <div className={`modal-backdrop fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 ${isArticleClosing ? 'is-closing' : ''}`} onPointerDown={(event) => { if (event.isPrimary && event.target === event.currentTarget) closeArticle(); }}>
          <OverlayScrollArea role="dialog" aria-modal="true" aria-labelledby="article-modal-title" className={`modal-panel relative max-h-[92dvh] w-full max-w-2xl rounded-[28px] border border-slate-300/80 bg-[#e9eef2] shadow-2xl dark:border-neutral-700 dark:bg-[#0c121e] ${isArticleClosing ? 'is-closing' : ''}`} contentClassName="modal-content-flow max-h-[calc(92dvh-2px)] overflow-y-auto overscroll-contain p-5 sm:p-10" overlay={
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                closeArticle();
              }}
              className="absolute right-4 top-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-neutral-300 bg-[#e9eef2]/90 text-neutral-600 shadow-sm transition-colors hover:border-[#00cfc8] hover:text-[#00aaa4] dark:border-neutral-700 dark:bg-[#0c121e]/90 dark:text-neutral-300 sm:right-6 sm:top-6"
              aria-label="Close article"
            >
              <X size={18} />
            </button>
          }>
            <span className="text-xs font-mono text-[#00cfc8] font-bold uppercase tracking-widest block mb-2">
              {selectedArticle.category} • {selectedArticle.date}
            </span>
            <h2 id="article-modal-title" className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#070b12] dark:text-white mb-6">
              {selectedArticle.title}
            </h2>

            <div className="space-y-4 text-neutral-700 dark:text-neutral-300 leading-relaxed text-base sm:text-lg">
              <p className="font-semibold text-[#070b12] dark:text-white">
                {selectedArticle.excerpt}
              </p>
              <p>
                {selectedArticle.content}
              </p>
              <p>
                At NXT/STUDIO, this philosophy informs every architectural decision we make for our global partners. By eliminating friction and elevating sensory feedback, we ensure digital investments generate enduring compound returns.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-300 dark:border-neutral-800 flex justify-end">
              <button
                onClick={closeArticle}
                className="px-6 py-2.5 bg-[#00cfc8] text-[#070b12] font-bold text-xs uppercase tracking-wider"
              >
                Close Article
              </button>
            </div>
          </OverlayScrollArea>
        </div>, document.body
      )}
    </section>
  );
};
