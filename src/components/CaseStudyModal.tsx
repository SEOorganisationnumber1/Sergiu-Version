import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight, CheckCircle, Sparkles, ShieldCheck } from 'lucide-react';
import type { Project } from './WorkShowcase';
import { sounds } from '../utils/soundEffects';
import { OverlayScrollArea } from './OverlayScrollArea';

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
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const requestClose = (afterClose?: () => void) => {
    if (isClosing) return;
    const finishClose = () => {
      closeTimer.current = null;
      onClose();
      afterClose?.();
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishClose();
      return;
    }
    setIsClosing(true);
    closeTimer.current = window.setTimeout(finishClose, 230);
  };

  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') requestClose(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose, isClosing]);

  useEffect(() => {
    if (!project) return;
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsClosing(false);
  }, [project]);

  if (!project) return null;

  return (
    <div className={`modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-6 ${isClosing ? 'is-closing' : ''}`} onPointerDown={(event) => { if (event.isPrimary && event.target === event.currentTarget) requestClose(); }}>
      <OverlayScrollArea role="dialog" aria-modal="true" aria-labelledby="case-study-title" className={`modal-panel relative max-h-[92dvh] w-full max-w-4xl rounded-[28px] border border-slate-300/80 bg-[#e9eef2] shadow-2xl dark:border-neutral-800 dark:bg-[#090e16] ${isClosing ? 'is-closing' : ''}`} contentClassName="modal-content-flow max-h-[calc(92dvh-2px)] overflow-y-auto overscroll-contain p-5 sm:p-10" overlay={
        <button
          type="button"
          onClick={() => {
            sounds.playClick();
            requestClose();
          }}
          className="absolute right-4 top-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-neutral-300 bg-[#e9eef2]/90 text-neutral-600 shadow-sm transition-colors hover:border-[#00cfc8] hover:text-[#00aaa4] dark:border-neutral-700 dark:bg-[#090e16]/90 dark:text-neutral-300 sm:right-6 sm:top-6"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      }>

        {/* Top Header */}
        <div className="mb-8 pr-10">
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 pr-2 sm:pr-0">
            <span className="text-xs font-mono font-bold text-[#00cfc8] uppercase tracking-widest">
              CASE STUDY ARCHIVE // {project.category}
            </span>
            <span className="text-neutral-400 text-xs">•</span>
            <span className="text-xs font-mono text-neutral-500">{project.year}</span>
          </div>

          <h2 id="case-study-title" className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#070b12] dark:text-white">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-neutral-500 dark:text-neutral-400 mt-1">
            Client: {project.client}
          </p>
        </div>

        {/* Visual Showcase Banner */}
        <div className={`h-64 sm:h-80 w-full bg-gradient-to-br ${project.gradient} border border-neutral-300 dark:border-neutral-800 p-8 flex flex-col justify-between relative overflow-hidden mb-8`}>
          <div className="z-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
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
                    className="rounded-full bg-neutral-200 px-3 py-1.5 text-xs font-mono text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
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
                requestClose();
              }}
              className="min-h-12 flex-1 rounded-full border border-neutral-300 px-6 py-3 text-xs font-mono font-bold uppercase transition-colors hover:border-[#00cfc8] sm:flex-none dark:border-neutral-700"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => {
                sounds.playLaunch();
                requestClose(onOpenCommission);
              }}
              className="flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#00cfc8] px-6 py-3 text-xs font-mono font-black uppercase text-[#070b12] transition-transform hover:-translate-y-0.5 sm:flex-none"
            >
              <span>Build Something Similar</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>

      </OverlayScrollArea>
    </div>
  );
};
