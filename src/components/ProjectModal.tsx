import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Check, Plus, Send, ShieldCheck, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { AVAILABLE_MODULES, PRICING_PLANS, type PricingPlanSelection } from './pricingCatalog';
import { OverlayScrollArea } from './OverlayScrollArea';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: PricingPlanSelection;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, initialPlan }) => {
  const plan = initialPlan ? PRICING_PLANS.find((item) => item.id === initialPlan.planId) : undefined;
  const cycle = initialPlan?.billingCycle ?? 'project';
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(() => plan?.includedModuleIds ?? []);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const requestClose = () => {
    if (isClosing) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onClose();
      return;
    }
    setIsClosing(true);
    closeTimer.current = window.setTimeout(() => {
      closeTimer.current = null;
      onClose();
    }, 230);
  };

  useEffect(() => () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsClosing(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') requestClose(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, isClosing]);

  const activeModules = useMemo(
    () => AVAILABLE_MODULES.filter((module) => selectedModuleIds.includes(module.id)),
    [selectedModuleIds],
  );

  if (!isOpen) return null;

  const basePrice = plan ? (cycle === 'project' ? plan.basePrice : plan.monthlyPrice) : 0;
  const selectedPrice = plan
    ? basePrice
      + activeModules.reduce((total, module) => total + (plan.includedModuleIds.includes(module.id) ? 0 : (cycle === 'project' ? module.price : Math.round(module.price * 0.35))), 0)
      - plan.includedModuleIds
        .filter((moduleId) => !selectedModuleIds.includes(moduleId))
        .reduce((total, moduleId) => {
          const module = AVAILABLE_MODULES.find((item) => item.id === moduleId);
          const adjustment = module ? (cycle === 'project' ? module.price : Math.round(module.price * 0.35)) : 0;
          return total + adjustment;
        }, 0)
    : 0;
  const displayPrice = plan
    ? `$${Math.max(0, selectedPrice).toLocaleString('en-US')}${cycle === 'retainer' ? ' / mo' : ''}`
    : undefined;

  const toggleModule = (moduleId: string) => {
    sounds.playClick();
    setSelectedModuleIds((current) => current.includes(moduleId)
      ? current.filter((id) => id !== moduleId)
      : [...current, moduleId]);
  };

  const subject = encodeURIComponent(plan ? `Project inquiry — ${plan.name}` : 'New project inquiry');
  const body = encodeURIComponent([
    `Email: ${email}`,
    plan ? `Plan: ${plan.name}` : 'Project: New inquiry',
    ...(displayPrice ? [`Configured estimate: ${displayPrice}`] : []),
    ...(plan ? [`Selected scope: ${activeModules.map((module) => module.name).join(', ') || 'No modules selected'}`] : []),
  ].join('\n'));
  const emailDraftHref = `mailto:partner@nxtstudio.agency?subject=${subject}&body=${body}`;

  return (
    <div className={`modal-backdrop fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-3 sm:p-6 ${isClosing ? 'is-closing' : ''}`} onPointerDown={(event) => { if (event.isPrimary && event.target === event.currentTarget) requestClose(); }}>
      <OverlayScrollArea role="dialog" aria-modal="true" aria-labelledby="project-modal-title" className={`modal-panel relative max-h-[92dvh] w-full max-w-2xl rounded-[28px] border border-slate-300/80 bg-[#e9eef2] shadow-2xl dark:border-neutral-800 dark:bg-[#090e16] ${isClosing ? 'is-closing' : ''}`} contentClassName="max-h-[calc(92dvh-2px)] overflow-y-auto overscroll-contain p-5 sm:p-8" overlay={
        <button type="button" onClick={requestClose} aria-label="Close" className="absolute right-4 top-4 z-40 grid h-10 w-10 place-items-center rounded-full border border-neutral-300 bg-[#e9eef2]/90 text-neutral-600 shadow-sm transition-colors hover:border-[#00cfc8] hover:text-[#00aaa4] dark:border-neutral-700 dark:bg-[#090e16]/90 dark:text-neutral-300 sm:right-6 sm:top-6">
          <X size={18} />
        </button>
      }>

        {submitted ? (
          <div className="modal-content-flow py-10 pr-8 text-center sm:py-14 sm:pr-0">
            <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-[#00cfc8]/15 text-[#00736e] dark:text-[#00cfc8]"><Check size={27} /></span>
            <p className="text-[10px] font-bold font-mono uppercase tracking-[.18em] text-[#00736e] dark:text-[#00cfc8]">REQUEST PREPARED</p>
            <h2 id="project-modal-title" className="mt-2 text-2xl font-black uppercase tracking-tight text-[#07111a] dark:text-white sm:text-3xl">One last step.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-600 dark:text-neutral-300">Open the email draft and send it to complete your request. This site does not send or store your email automatically.</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={emailDraftHref} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00cfc8] px-6 text-xs font-black font-mono uppercase tracking-wide text-[#07111a]">Open email draft <ArrowUpRight size={15} /></a>
              <button type="button" onClick={requestClose} className="min-h-12 rounded-full border border-neutral-300 px-6 text-xs font-bold font-mono uppercase tracking-wide text-neutral-700 dark:border-neutral-700 dark:text-neutral-200">Close</button>
            </div>
          </div>
        ) : (
          <form className="modal-content-flow" noValidate onSubmit={(event) => {
            event.preventDefault();
            const emailField = event.currentTarget.elements.namedItem('project-email') as HTMLInputElement | null;
            if (!emailField?.validity.valid) {
              setEmailError('Please enter a valid email address.');
              emailField?.focus();
              return;
            }
            setEmailError('');
            sounds.playSuccess();
            setSubmitted(true);
          }}>
            <div className="mb-7 pr-9 sm:mb-8 sm:pr-12">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold font-mono uppercase tracking-[.16em] text-[#00736e] dark:text-[#00cfc8]">
                <span className="h-2 w-2 rounded-full bg-[#00cfc8]" /> {plan ? 'CUSTOMIZE YOUR PLAN' : 'START A PROJECT'}
              </div>
              <h2 id="project-modal-title" className="text-2xl font-black uppercase leading-tight tracking-tight text-[#07111a] dark:text-white sm:text-4xl">
                {plan ? plan.name : 'LET’S TALK ABOUT YOUR PROJECT.'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600 dark:text-neutral-400">
                {plan ? `${plan.tagline} Choose what stays in scope, then add anything else you need.` : 'Leave your email and we’ll follow up about the right next step.'}
              </p>
            </div>

            {plan && (
              <div className="mb-7 space-y-5">
                <section aria-labelledby="included-scope-heading">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 id="included-scope-heading" className="text-[10px] font-bold font-mono uppercase tracking-[.14em] text-neutral-500">Included in this plan</h3>
                    <span className="text-[10px] font-mono text-neutral-500">Tap to remove</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {plan.includedModuleIds.map((moduleId) => {
                      const module = AVAILABLE_MODULES.find((item) => item.id === moduleId);
                      if (!module) return null;
                      const active = selectedModuleIds.includes(moduleId);
                      const adjustment = cycle === 'project' ? module.price : Math.round(module.price * 0.35);
                      return (
                        <button key={module.id} type="button" aria-pressed={active} onClick={() => toggleModule(module.id)} className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-colors ${active ? 'border-[#00cfc8]/45 bg-[#00cfc8]/[.07] text-neutral-800 dark:text-neutral-100' : 'border-neutral-300 text-neutral-500 dark:border-neutral-700 dark:text-neutral-400'}`}>
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${active ? 'bg-[#00cfc8] text-[#07111a]' : 'bg-neutral-200 dark:bg-neutral-800'}`}>{active ? <Check size={12} /> : <Plus size={12} />}</span>
                          <span className="min-w-0 flex-1">{module.name}</span>
                          {!active && <span className="shrink-0 font-mono text-[10px]">−${adjustment}</span>}
                        </button>
                      );
                    })}
                  </div>
                </section>

                <details className="group rounded-2xl border border-neutral-300 dark:border-neutral-800">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 text-xs font-bold text-neutral-700 marker:hidden dark:text-neutral-200 [&::-webkit-details-marker]:hidden">
                    <span>Add optional modules <span className="font-normal text-neutral-500">({AVAILABLE_MODULES.length - plan.includedModuleIds.length})</span></span>
                    <Plus size={15} className="transition-transform group-open:rotate-45" />
                  </summary>
                  <div className="grid gap-2 border-t border-neutral-200 p-3 dark:border-neutral-800 sm:grid-cols-2">
                    {AVAILABLE_MODULES.filter((module) => !plan.includedModuleIds.includes(module.id)).map((module) => {
                      const active = selectedModuleIds.includes(module.id);
                      const amount = cycle === 'project' ? module.price : Math.round(module.price * 0.35);
                      return (
                        <button key={module.id} type="button" aria-pressed={active} onClick={() => toggleModule(module.id)} className={`flex min-h-12 items-center gap-2 rounded-xl border px-3 py-2 text-left text-xs transition-colors ${active ? 'border-[#00cfc8]/50 bg-[#00cfc8]/[.07] text-neutral-800 dark:text-neutral-100' : 'border-neutral-200 text-neutral-600 hover:border-[#00cfc8]/50 dark:border-neutral-800 dark:text-neutral-300'}`}>
                          <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${active ? 'bg-[#00cfc8] text-[#07111a]' : 'bg-neutral-200 dark:bg-neutral-800'}`}>{active ? <Check size={12} /> : <Plus size={12} />}</span>
                          <span className="min-w-0 flex-1"><span className="block">{module.name}</span><span className="mt-0.5 block text-[10px] text-neutral-500">{module.category}</span></span>
                          <span className="shrink-0 font-mono text-[10px]">+${amount}</span>
                        </button>
                      );
                    })}
                  </div>
                </details>

                <div className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white/70 px-4 py-3 dark:border-neutral-800 dark:bg-white/[.03]">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-500">Configured estimate</span>
                  <span className="text-lg font-black text-[#00736e] dark:text-[#00cfc8]">{displayPrice}</span>
                </div>
              </div>
            )}

            <div className="border-t border-neutral-200 pt-5 dark:border-neutral-800">
              <label htmlFor="project-email" className="mb-2 block text-[10px] font-bold font-mono uppercase tracking-[.14em] text-neutral-500">Your email <span className="text-[#00736e] dark:text-[#00cfc8]">*</span></label>
              <input
                type="email"
                id="project-email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="you@company.com"
                value={email}
                aria-invalid={Boolean(emailError)}
                aria-describedby={emailError ? 'project-email-error' : 'project-email-help'}
                onChange={(event) => { setEmail(event.target.value); if (emailError) setEmailError(''); }}
                className={`min-h-12 w-full rounded-xl border bg-white px-4 text-sm text-[#07111a] outline-none transition-colors placeholder:text-neutral-400 focus:border-[#00cfc8] dark:bg-[#0c121e] dark:text-white ${emailError ? 'border-rose-500 dark:border-rose-400' : 'border-neutral-300 dark:border-neutral-700'}`}
              />
              {emailError && <p id="project-email-error" role="alert" className="mt-2 text-xs text-rose-600 dark:text-rose-400">{emailError}</p>}
              <p id="project-email-help" className="mt-2 flex items-center gap-1.5 text-[10px] text-neutral-500"><ShieldCheck size={13} className="text-[#00736e] dark:text-[#00cfc8]" /> Used only to prepare your project inquiry.</p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-5 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">
              <button type="button" onClick={requestClose} className="min-h-11 rounded-full px-4 text-xs font-bold text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-white">Cancel</button>
              <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00cfc8] px-6 text-xs font-black font-mono uppercase tracking-wide text-[#07111a] shadow-lg shadow-[#00cfc8]/15 transition-transform hover:-translate-y-0.5">
                Prepare request <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </OverlayScrollArea>
    </div>
  );
};
