import React, { useState } from 'react';
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

  return (
    <section id="insights" className="py-24 sm:py-32 border-b border-neutral-300/60 dark:border-neutral-800/80 relative">
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-300/60 dark:border-neutral-800/80">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00cfc8]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8]">
                EDITORIAL JOURNAL &amp; DISPATCHES
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#070b12] dark:text-white uppercase">
              INSIGHTS &amp; PERSPECTIVES.
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <BookOpen size={16} className="text-[#00cfc8]" />
            <span>RESEARCH PAPERS ON DESIGN &amp; TECHNOLOGY</span>
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {ARTICLES.map((article, idx) => (
            <article
              key={article.id}
              onClick={() => {
                sounds.playLaunch();
                setSelectedArticle(article);
              }}
              onMouseEnter={() => sounds.playHover()}
              data-cursor="view"
              className="p-8 border border-neutral-300/80 dark:border-neutral-800 bg-white/50 dark:bg-[#0c121d]/50 hover:border-[#00cfc8] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-6">
                  <span className="text-[#00cfc8] font-bold">
                    0{idx + 1} // {article.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-[#070b12] dark:text-white uppercase tracking-tight group-hover:text-[#00cfc8] transition-colors duration-200">
                  {article.title}
                </h3>

                <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-500 group-hover:text-[#00cfc8] transition-colors">
                <span>{article.date}</span>
                <span className="inline-flex items-center gap-1 font-bold">
                  READ DISPATCH <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#f2f5f8] dark:bg-[#0c121e] border border-neutral-300 dark:border-neutral-700 max-w-2xl w-full p-8 sm:p-10 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => {
                sounds.playClick();
                setSelectedArticle(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-[#00cfc8] hover:text-[#00cfc8]"
            >
              <X size={18} />
            </button>

            <span className="text-xs font-mono text-[#00cfc8] font-bold uppercase tracking-widest block mb-2">
              {selectedArticle.category} • {selectedArticle.date}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#070b12] dark:text-white mb-6">
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
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 bg-[#00cfc8] text-[#070b12] font-bold text-xs uppercase tracking-wider"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
