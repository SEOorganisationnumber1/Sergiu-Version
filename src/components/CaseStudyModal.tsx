import React from 'react';
import { X, ArrowUpRight, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import type { Project } from './WorkShowcase';
import { sounds } from '../utils/soundEffects';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenCommission: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onOpenCommission,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#f2f5f8] dark:bg-[#090e16] border border-neutral-300 dark:border-neutral-800 max-w-4xl w-full p-6 sm:p-10 relative max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-[#00cfc8] hover:text-[#00cfc8] text-neutral-600 dark:text-neutral-400 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Top Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono font-bold text-[#00cfc8] uppercase tracking-widest">
              CASE STUDY ARCHIVE // {project.category}
            </span>
            <span className="text-neutral-400 text-xs">•</span>
            <span className="text-xs font-mono text-neutral-500">{project.year}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#070b12] dark:text-white">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1">
            Client: {project.client}
          </p>
        </div>

        {/* Visual Showcase Banner */}
        <div className={`h-64 sm:h-80 w-full bg-gradient-to-br ${project.gradient} border border-neutral-300 dark:border-neutral-800 p-8 flex flex-col justify-between relative overflow-hidden mb-8`}>
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-mono text-[#00cfc8] border border-white/10">
              <Sparkles size={13} />
              <span>{project.award}</span>
            </div>
            <div className="text-xs font-mono text-white/60">
              60 FPS RENDER BENCHMARK
            </div>
          </div>

          <div className="z-10">
            <div className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {project.metrics}
            </div>
            <div className="text-xs font-mono text-white/80 mt-1">
              Verified third-party production telemetry
            </div>
          </div>
        </div>

        {/* Breakdown Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6 border-y border-neutral-300 dark:border-neutral-800">
          <div className="md:col-span-8 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00cfc8] font-bold">
              THE ARCHITECTURAL CHALLENGE &amp; SOLUTION
            </h3>
            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {project.description}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Our engineering team established custom WebGL pipelines with sub-millisecond draw call execution. 
              By stripping away bloated third-party dependencies and leveraging strictly typed functional components, 
              we achieved a 100/100 Core Web Vitals rating across all European and North American edge distribution points.
            </p>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                TECHNOLOGY STACK:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs font-mono rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
                KEY OUTCOMES:
              </h4>
              <ul className="space-y-1.5 text-xs font-mono text-neutral-700 dark:text-neutral-300">
                <li className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-[#00cfc8]" />
                  <span>Sub-400ms TTFB worldwide</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-[#00cfc8]" />
                  <span>Zero runtime crash incidents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={13} className="text-[#00cfc8]" />
                  <span>Industry design accolade winner</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
            <ShieldCheck size={16} className="text-[#00cfc8]" />
            <span>NXT/STUDIO Production Archive Verified</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-none px-6 py-3 border border-neutral-300 dark:border-neutral-700 text-xs font-mono font-bold uppercase"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => {
                sounds.playLaunch();
                onClose();
                onOpenCommission();
              }}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#00cfc8] text-[#070b12] text-xs font-mono font-black uppercase flex items-center justify-center gap-1.5"
            >
              <span>Build Something Similar</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
