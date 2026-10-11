import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { AVAILABLE_MODULES, PRICING_PLANS, type BillingCycle, type PricingPlanSelection } from './pricingCatalog';

interface PricingPackagesProps {
  onSelectPlan: (selection: PricingPlanSelection) => void;
}

const money = (amount: number) => `$${amount.toLocaleString('en-US')}`;

export const PricingPackages: React.FC<PricingPackagesProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('project');

  const choosePlan = (planId: string) => {
    sounds.playLaunch();
    onSelectPlan({ planId, billingCycle });
  };

  return (
    <section id="pricing" className="relative overflow-hidden border-b border-neutral-300/60 py-20 dark:border-neutral-800/80 sm:py-28">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col gap-6 border-b border-neutral-300/60 pb-8 dark:border-neutral-800/80 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00cfc8]" />
              <span className="text-xs font-bold font-mono uppercase tracking-widest text-[#00736e] dark:text-[#00cfc8]">CLEAR SCOPE. CLEAR PRICING.</span>
            </div>
            <h1 className="section-display-title text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#070b12] dark:text-white sm:text-5xl">
              CHOOSE YOUR STARTING POINT.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600 dark:text-neutral-400 sm:text-base">
              Select a plan to tailor its scope and send us your contact email.
            </p>
          </div>

          <div className="billing-switch relative isolate grid w-[196px] shrink-0 grid-cols-2 overflow-hidden rounded-full border border-neutral-300 bg-neutral-100/80 p-1 dark:border-neutral-800 dark:bg-neutral-900/80" role="group" aria-label="Billing frequency">
            <span aria-hidden="true" className={`billing-switch-thumb absolute inset-y-1 left-1 z-0 w-[calc(50%-0.25rem)] rounded-full bg-[#00cfc8] ${billingCycle === 'retainer' ? 'is-monthly' : ''}`} />
            {(['project', 'retainer'] as const).map((cycle) => (
              <button
                key={cycle}
                type="button"
                onClick={() => { sounds.playClick(); setBillingCycle(cycle); }}
                aria-pressed={billingCycle === cycle}
                className={`relative z-10 min-h-10 w-full rounded-full px-2 py-2.5 text-[10px] font-bold font-mono uppercase tracking-wide transition-colors sm:text-xs ${billingCycle === cycle ? 'text-[#07111a]' : 'text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white'}`}
              >
                {cycle === 'project' ? 'One-time' : 'Monthly'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {PRICING_PLANS.map((plan) => {
            const includedModules = plan.includedModuleIds
              .map((id) => AVAILABLE_MODULES.find((module) => module.id === id))
              .filter((module): module is NonNullable<typeof module> => Boolean(module));
            const price = billingCycle === 'project' ? plan.basePrice : plan.monthlyPrice;

            return (
              <article
                key={plan.id}
                className={`premium-surface pricing-card flex min-h-[380px] flex-col rounded-[24px] border bg-white/70 p-6 transition-[transform,border-color,box-shadow,background-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(7,17,26,.10)] dark:bg-[#0b1019]/75 dark:hover:shadow-[0_24px_70px_rgba(0,0,0,.28)] sm:p-7 ${plan.highlight ? 'border-[#00cfc8]/75 shadow-[0_16px_50px_rgba(0,207,200,.08)]' : 'border-neutral-300/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700'}`}
              >
                <div className="mb-6 flex items-center justify-between gap-3">
                  <span className={`rounded-full border px-3 py-1.5 text-[9px] font-black font-mono uppercase tracking-wider ${plan.highlight ? 'border-[#00cfc8]/50 bg-[#00cfc8]/10 text-[#00736e]' : 'border-neutral-300 text-neutral-600 dark:border-neutral-700 dark:text-neutral-300'}`}>
                    {plan.badge}
                  </span>
                  <span className="shrink-0 text-[10px] font-mono text-neutral-500">{plan.delivery}</span>
                </div>

                <h3 className="text-xl font-black leading-tight tracking-tight text-[#070b12] dark:text-white">{plan.name}</h3>
                <p className="mt-2 min-h-10 text-xs leading-5 text-neutral-600 dark:text-neutral-400">{plan.tagline}</p>

                <div className="my-5 border-y border-neutral-200 py-4 dark:border-neutral-800">
                  <span key={`${billingCycle}-${price}`} className="billing-price text-3xl font-black tracking-tight text-[#070b12] dark:text-white">{money(price)}</span>
                  <span className="ml-2 text-[10px] font-mono text-neutral-500">{billingCycle === 'project' ? 'per project' : 'per month'}</span>
                </div>

                <ul className="mb-7 flex-1 space-y-2.5">
                  {includedModules.slice(0, 3).map((module) => (
                    <li key={module.id} className="flex items-start gap-2 text-xs leading-5 text-neutral-700 dark:text-neutral-300">
                      <Check size={14} className="mt-0.5 shrink-0 text-[#00bdb6]" />
                      <span>{module.name}</span>
                    </li>
                  ))}
                  {includedModules.length > 3 && (
                    <li className="pl-[22px] text-[10px] font-mono text-neutral-500">+{includedModules.length - 3} more included</li>
                  )}
                </ul>

                <button
                  type="button"
                  onClick={() => choosePlan(plan.id)}
                  onMouseEnter={() => sounds.playHover()}
                  className={`inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full px-4 text-xs font-black font-mono uppercase tracking-wide transition-all hover:-translate-y-0.5 ${plan.highlight ? 'bg-[#00cfc8] text-[#07111a] shadow-lg shadow-[#00cfc8]/15 hover:bg-[#00bdb6]' : 'border border-neutral-300 bg-neutral-100 text-neutral-900 hover:border-[#00cfc8] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800'}`}
                >
                  Configure plan <ArrowUpRight size={15} />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
