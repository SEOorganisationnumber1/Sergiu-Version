import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkShowcase } from './components/WorkShowcase';
import type { Project } from './components/WorkShowcase';
import { ServicesSection } from './components/ServicesSection';
import { PricingPackages } from './components/PricingPackages';
import { ClientsMarquee } from './components/ClientsMarquee';
import { StudioManifesto } from './components/StudioManifesto';
import { InsightsSection } from './components/InsightsSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ScrollReveal } from './components/ScrollReveal';

export const App: React.FC = () => {
  // Theme state with localStorage initialization
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nxt_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [modalInitialPlan, setModalInitialPlan] = useState<string | undefined>(undefined);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('nxt_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('nxt_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Lenis smooth momentum scroll initialization (Locomotive & Cuberto style)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleExploreWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplorePricing = () => {
    const pricingElem = document.getElementById('pricing');
    if (pricingElem) {
      pricingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCommissionWithPlan = (planName: string, price: string) => {
    setModalInitialPlan(`${planName} (${price})`);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f2f5f8] dark:bg-[#080c12] text-[#070b12] dark:text-[#f1f5f9] transition-colors duration-500 font-sans relative selection:bg-[#00cfc8] selection:text-[#070b12]">
      {/* Subtle organic noise overlay for luxury agency editorial feel */}
      <div className="noise-overlay" />

      {/* Interactive custom trailing magnetic cursor (Zero input-lag hardware accelerated) */}
      <CustomCursor />

      {/* Fixed Navigation Bar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        onOpenProjectModal={() => {
          setModalInitialPlan(undefined);
          setIsProjectModalOpen(true);
        }}
      />

      {/* Main Experience Stream with Staggered Scroll Reveals */}
      <main className="relative z-10">
        {/* Hero Section matching the exact design & palette */}
        <Hero
          isDarkMode={isDarkMode}
          onExploreWork={handleExploreWork}
          onExplorePricing={handleExplorePricing}
          onOpenProjectModal={() => {
            setModalInitialPlan(undefined);
            setIsProjectModalOpen(true);
          }}
        />

        {/* Core Competencies & Disciplines (SEO Domination, Web Design, Full-Stack, Lite) */}
        <ScrollReveal delayMs={50}>
          <ServicesSection
            onOpenProjectModal={() => {
              setModalInitialPlan('SEO & Design Architecture');
              setIsProjectModalOpen(true);
            }}
          />
        </ScrollReveal>

        {/* Transparent Pricing Packages & Interactive SEO ROI Calculator */}
        <ScrollReveal delayMs={50}>
          <PricingPackages
            onSelectPlan={handleOpenCommissionWithPlan}
          />
        </ScrollReveal>

        {/* Selected Repertoire / Work Showcase */}
        <ScrollReveal delayMs={50}>
          <WorkShowcase
            onSelectProject={(proj) => setSelectedCaseStudy(proj)}
          />
        </ScrollReveal>

        {/* Global Clients & Awards Recognition */}
        <ScrollReveal delayMs={50}>
          <ClientsMarquee />
        </ScrollReveal>

        {/* The Studio Manifesto & Performance Analytics */}
        <ScrollReveal delayMs={50}>
          <StudioManifesto
            onOpenProjectModal={() => {
              setModalInitialPlan(undefined);
              setIsProjectModalOpen(true);
            }}
          />
        </ScrollReveal>

        {/* Editorial Journal & Dispatches */}
        <ScrollReveal delayMs={50}>
          <InsightsSection />
        </ScrollReveal>
      </main>

      {/* Swiss Architectural Footer with Live Clocks */}
      <Footer
        onOpenProjectModal={() => {
          setModalInitialPlan(undefined);
          setIsProjectModalOpen(true);
        }}
      />

      {/* Start A Project Interactive Commission Drawer */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        initialPlan={modalInitialPlan}
      />

      {/* Detailed Case Study Breakdown Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onOpenCommission={() => {
          setSelectedCaseStudy(null);
          setModalInitialPlan(undefined);
          setIsProjectModalOpen(true);
        }}
      />
    </div>
  );
};

export default App;
