import React, { useState } from 'react';
import { X, Check, Sparkles, Send, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
}

const SERVICES_OPTIONS = [
  'Organic SEO Domination (Google #1)',
  'Bespoke Web Design & Figma UI/UX',
  'Full-Stack Web App (Front + Back + DB)',
  'Lite Sprint Landing Page',
  '3D WebGL & Interactive Experience',
  'High-Scale E-Commerce Systems',
];

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, initialPlan }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    if (initialPlan) return [initialPlan];
    return ['Organic SEO Domination (Google #1)'];
  });
  const [budget, setBudget] = useState<number>(35);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brief, setBrief] = useState(initialPlan ? `Inquiring regarding configured plan: ${initialPlan}` : '');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (srv: string) => {
    sounds.playClick();
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const estimatedWeeks = Math.max(4, Math.min(16, selectedServices.length * 2.5 + Math.round(budget / 25)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00cfc8', '#ffffff', '#070b12', '#38ef7d'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleResetAndClose = () => {
    sounds.playClick();
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#f2f5f8] dark:bg-[#090e16] border border-neutral-300 dark:border-neutral-800 max-w-3xl w-full p-6 sm:p-10 relative max-h-[92vh] overflow-y-auto shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-[#00cfc8] hover:text-[#00cfc8] text-neutral-600 dark:text-neutral-400 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#00cfc8]/20 text-[#00cfc8] flex items-center justify-center mb-6 border border-[#00cfc8]/40">
              <Sparkles size={32} />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8] font-bold mb-2">
              TRANSMISSION RECEIVED // COMMISSION QUEUED
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase text-[#070b12] dark:text-white tracking-tight mb-4">
              THANK YOU, {name || 'PARTNER'}.
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300 max-w-lg mb-8 leading-relaxed">
              Our partners will evaluate your architectural objectives within 12 business hours. A dedicated briefing link has been queued for <span className="font-semibold text-[#00cfc8]">{email}</span>.
            </p>
            <button
              onClick={handleResetAndClose}
              className="px-8 py-3.5 bg-[#00cfc8] text-[#070b12] font-black text-xs uppercase tracking-wider"
            >
              RETURN TO EXPERIENCE
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00cfc8]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#00cfc8]">
                  NEW PROJECT COMMISSION
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#070b12] dark:text-white">
                LET'S CONSTRUCT SOMETHING EXTRAORDINARY.
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Select your required disciplines to generate real-time estimates.
              </p>
            </div>

            {/* Scope Discipline Selector */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-500 block mb-3 font-bold">
                1. SELECT DISCIPLINES (CLICK TO TOGGLE):
              </label>
              <div className="flex flex-wrap gap-2.5">
                {SERVICES_OPTIONS.map((srv) => {
                  const active = selectedServices.includes(srv);
                  return (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => toggleService(srv)}
                      className={`px-4 py-2 text-xs font-mono border transition-all duration-200 flex items-center gap-2 ${
                        active
                          ? 'bg-[#00cfc8] text-[#070b12] font-bold border-[#00cfc8] shadow-md shadow-[#00cfc8]/25'
                          : 'bg-white/60 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:border-[#00cfc8]'
                      }`}
                    >
                      {active && <Check size={14} />}
                      <span>{srv}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Budget Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2">
                <span className="font-bold">2. ESTIMATED CAPITAL ALLOCATION:</span>
                <span className="text-[#00cfc8] font-bold text-sm">
                  ${budget >= 150 ? '150,000+' : `${budget},000`} USD
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-neutral-300 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#00cfc8]"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-400 mt-1">
                <span>$20k (Agile Sprint)</span>
                <span>$75k (Full Transformation)</span>
                <span>$150k+ (Enterprise Ecosystem)</span>
              </div>
            </div>

            {/* Dynamic Real-Time Estimation Strip */}
            <div className="p-4 bg-neutral-200/60 dark:bg-neutral-900/60 border border-neutral-300 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300">
                <ShieldCheck size={16} className="text-[#00cfc8]" />
                <span>DYNAMIC SPRINT ESTIMATION:</span>
              </div>
              <span className="text-[#00cfc8] font-bold">
                ~ {estimatedWeeks} WEEKS DEDICATED DEV CYCLE
              </span>
            </div>

            {/* Contact Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase text-neutral-500 block mb-1 font-semibold">
                  YOUR NAME:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexander Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#0c121e] border border-neutral-300 dark:border-neutral-700 text-sm text-[#070b12] dark:text-white focus:outline-none focus:border-[#00cfc8]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-neutral-500 block mb-1 font-semibold">
                  CORPORATE EMAIL:
                </label>
                <input
                  type="email"
                  required
                  placeholder="alexander@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#0c121e] border border-neutral-300 dark:border-neutral-700 text-sm text-[#070b12] dark:text-white focus:outline-none focus:border-[#00cfc8]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-neutral-500 block mb-1 font-semibold">
                PROJECT CONTEXT &amp; GOALS:
              </label>
              <textarea
                rows={3}
                placeholder="Briefly describe the vision, current challenges, and milestones..."
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-[#0c121e] border border-neutral-300 dark:border-neutral-700 text-sm text-[#070b12] dark:text-white focus:outline-none focus:border-[#00cfc8]"
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-300 dark:border-neutral-800">
              <span className="text-xs font-mono text-neutral-500">
                NDA GUARANTEED UPON TRANSMISSION
              </span>

              <button
                type="submit"
                onMouseEnter={() => sounds.playHover()}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00cfc8] text-[#070b12] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#00cfc8]/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>TRANSMIT BRIEF</span>
                <Send size={14} />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
