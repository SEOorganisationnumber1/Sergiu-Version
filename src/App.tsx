import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import Lenis from 'lenis';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkShowcase } from './components/WorkShowcase';
import type { Project } from './components/WorkShowcase';
import { ServicesSection } from './components/ServicesSection';
import { PricingPackages } from './components/PricingPackages';
import type { PricingPlanSelection } from './components/pricingCatalog';
import { ClientsMarquee } from './components/ClientsMarquee';
import { StudioManifesto } from './components/StudioManifesto';
import { InsightsSection } from './components/InsightsSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { ScrollReveal } from './components/ScrollReveal';
import { sounds } from './utils/soundEffects';

const isPricingPath = (pathname: string) => pathname.replace(/\/$/, '') === '/pricing';

export const App: React.FC = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isPricingPage, setIsPricingPage] = useState(() =>
    typeof window !== 'undefined' && isPricingPath(window.location.pathname)
  );
  // Follow the device theme until the visitor deliberately chooses a theme.
  const [themeOverride, setThemeOverride] = useState<'light' | 'dark' | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem('nxt_theme_override');
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch {
      return null;
    }
  });
  const [systemPrefersDark, setSystemPrefersDark] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const isDarkMode = themeOverride ? themeOverride === 'dark' : systemPrefersDark;
  const [themeWave, setThemeWave] = useState<{ key: number; x: number; y: number; scale: number; rgb: string } | null>(null);
  const themeTransitionTimer = useRef<number | null>(null);

  // Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [modalInitialPlan, setModalInitialPlan] = useState<PricingPlanSelection | undefined>(undefined);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  const scrollImmediatelyToTop = () => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // Sync theme with HTML class
  useEffect(() => {
    const root = document.documentElement;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDarkMode ? '#080c12' : '#e9eef2');
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    const updateSystemTheme = () => {
      const next = preference.matches;
      if (themeOverride !== null) {
        setSystemPrefersDark(next);
        return;
      }
      const root = document.documentElement;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setSystemPrefersDark(next);
      } else {
        root.classList.add('theme-transitioning');
        void root.offsetWidth;
        flushSync(() => setSystemPrefersDark(next));
        if (themeTransitionTimer.current !== null) window.clearTimeout(themeTransitionTimer.current);
        themeTransitionTimer.current = window.setTimeout(() => {
          root.classList.remove('theme-transitioning');
          themeTransitionTimer.current = null;
        }, 260);
      }
    };
    if (preference.addEventListener) preference.addEventListener('change', updateSystemTheme);
    else preference.addListener(updateSystemTheme);
    return () => {
      if (preference.removeEventListener) preference.removeEventListener('change', updateSystemTheme);
      else preference.removeListener(updateSystemTheme);
    };
  }, [themeOverride]);

  useEffect(() => {
    const syncManualTheme = (event: StorageEvent) => {
      if (event.key !== 'nxt_theme_override' && event.key !== null) return;
      setThemeOverride(event.newValue === 'light' || event.newValue === 'dark' ? event.newValue : null);
    };
    window.addEventListener('storage', syncManualTheme);
    return () => window.removeEventListener('storage', syncManualTheme);
  }, []);

  useEffect(() => {
    const title = isPricingPage
      ? 'Pricing & Plans — NXT/STUDIO'
      : 'NXT/STUDIO — Technical SEO, Digital Design & Full-Stack Engineering';
    const description = isPricingPage
      ? 'Explore NXT/STUDIO project packages, transparent pricing, delivery timelines and monthly retainers.'
      : 'NXT/STUDIO builds high-performance digital experiences through technical SEO, AEO, GEO, bespoke design and scalable full-stack architecture.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://nxtstudio.agency${isPricingPage ? '/pricing' : '/'}`);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://nxtstudio.agency${isPricingPage ? '/pricing' : '/'}`);
  }, [isPricingPage]);

  useEffect(() => {
    const unlockAudio = (event: PointerEvent | TouchEvent) => {
      if (event.isTrusted) sounds.unlock();
    };
    document.addEventListener('pointerdown', unlockAudio, { capture: true, passive: true });
    document.addEventListener('touchstart', unlockAudio, { capture: true, passive: true });
    return () => {
      document.removeEventListener('pointerdown', unlockAudio, true);
      document.removeEventListener('touchstart', unlockAudio, true);
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    let targetId = hash.slice(1);
    try { targetId = decodeURIComponent(targetId); } catch { /* Use the literal fragment when it contains invalid escapes. */ }
    const serviceMatch = targetId.match(/^service-(s[1-5])$/);
    if (serviceMatch) {
      const serviceFrame = window.requestAnimationFrame(() => {
        window.dispatchEvent(new CustomEvent('nxt:open-service', { detail: { id: serviceMatch[1] } }));
      });
      return () => window.cancelAnimationFrame(serviceFrame);
    }
    let frameId = 0;
    const timeoutId = window.setTimeout(() => {
      frameId = window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }, 120);
    return () => {
      window.clearTimeout(timeoutId);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, [isPricingPage]);

  const navigateToPath = (path: string) => {
    const target = new URL(path, window.location.origin);
    const targetIsPricing = isPricingPath(target.pathname);
    const targetPath = `${target.pathname}${target.search}${target.hash}`;
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (targetPath !== currentPath) window.history.pushState(null, '', targetPath);
    if (targetIsPricing === isPricingPage) {
      if (target.hash) {
        let id = target.hash.slice(1);
        try { id = decodeURIComponent(id); } catch { /* Keep the literal fragment. */ }
        window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      } else if (!targetIsPricing) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) root.classList.add('route-transitioning');
    flushSync(() => setIsPricingPage(targetIsPricing));
    scrollImmediatelyToTop();
    if (!reduceMotion) window.setTimeout(() => root.classList.remove('route-transitioning'), 520);
  };

  useEffect(() => {
    const syncRoute = () => {
      const next = isPricingPath(window.location.pathname);
      if (next === isPricingPage) return;
      const root = document.documentElement;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduceMotion) root.classList.add('route-transitioning');
      flushSync(() => setIsPricingPage(next));
      scrollImmediatelyToTop();
      if (!reduceMotion) window.setTimeout(() => root.classList.remove('route-transitioning'), 520);
    };
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, [isPricingPage]);

  const toggleDarkMode = (origin?: { x: number; y: number }) => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nextTheme = isDarkMode ? 'light' : 'dark';
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 42;
    const farthestCorner = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y),
    );
    const circleDiameter = Math.min(Math.max(window.innerWidth, window.innerHeight), 1400);
    const update = (animate: boolean) => {
      root.classList.toggle('dark', nextTheme === 'dark');
      setThemeOverride(nextTheme);
      if (animate && !reduceMotion) setThemeWave({ key: performance.now(), x, y, scale: farthestCorner * 2 / circleDiameter + .04, rgb: nextTheme === 'dark' ? '240 247 250' : '5 12 20' });
      try { localStorage.setItem('nxt_theme_override', nextTheme); } catch { /* Theme still works for this session. */ }
    };
    if (reduceMotion) {
      flushSync(() => update(false));
      setThemeWave(null);
      return;
    }
    root.classList.add('theme-transitioning');
    void root.offsetWidth;
    flushSync(() => update(true));
    if (themeTransitionTimer.current !== null) window.clearTimeout(themeTransitionTimer.current);
    themeTransitionTimer.current = window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
      setThemeWave(null);
      themeTransitionTimer.current = null;
    }, 1_080);
  };

  // Lenis smooth momentum scroll initialization (Locomotive & Cuberto style)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId: number | null = null;
    function raf(time: number) {
      rafId = null;
      if (document.hidden) return;
      lenis.raf(time);
      if (lenis.isScrolling && rafId === null) rafId = requestAnimationFrame(raf);
    }
    const wake = () => {
      if (document.hidden || rafId !== null) return;
      // Reset the idle clock so the first frame after a pause doesn't jump ahead.
      lenis.time = performance.now();
      rafId = requestAnimationFrame(raf);
    };
    const stopWhenHidden = () => {
      if (document.hidden && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!document.hidden && lenis.isScrolling) {
        wake();
      }
    };
    const removeVirtualScrollListener = lenis.on('virtual-scroll', wake);
    const removeScrollListener = lenis.on('scroll', () => {
      if (lenis.isScrolling) wake();
    });
    document.addEventListener('visibilitychange', stopWhenHidden);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      removeVirtualScrollListener();
      removeScrollListener();
      document.removeEventListener('visibilitychange', stopWhenHidden);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleExploreWork = () => {
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
      const heading = workElem.querySelector<HTMLElement>('h1, h2, h3');
      if (heading && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.setTimeout(() => {
          heading.classList.remove('section-nav-arrival');
          void heading.offsetWidth;
          heading.classList.add('section-nav-arrival');
          window.setTimeout(() => heading.classList.remove('section-nav-arrival'), 560);
        }, 240);
      }
    }
  };

  const handleExplorePricing = () => {
    navigateToPath('/pricing');
  };

  const handleOpenCommissionWithPlan = (selection: PricingPlanSelection) => {
    setModalInitialPlan(selection);
    setIsProjectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#e9eef2] dark:bg-[#080c12] text-[#101820] dark:text-[#f1f5f9] font-sans relative selection:bg-[#00cfc8] selection:text-[#070b12]">
      {themeWave && (
        <span
          key={themeWave.key}
          aria-hidden="true"
          className="theme-circle-wave"
          style={{
            '--theme-wave-x': `${themeWave.x}px`,
            '--theme-wave-y': `${themeWave.y}px`,
            '--theme-wave-scale': String(themeWave.scale),
            '--theme-wave-rgb': themeWave.rgb,
          } as React.CSSProperties}
        />
      )}
      {/* Subtle organic noise overlay for luxury agency editorial feel */}
      <div className="noise-overlay" />

      {/* Interactive custom trailing magnetic cursor (Zero input-lag hardware accelerated) */}
      <CustomCursor />

      {/* Fixed Navigation Bar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        isPricingPage={isPricingPage}
        onNavigatePath={navigateToPath}
        onOpenProjectModal={() => {
          setModalInitialPlan(undefined);
          setIsProjectModalOpen(true);
        }}
      />

      {/* Main Experience Stream with Staggered Scroll Reveals */}
      {isPricingPage ? (
        <main className="relative z-10 min-h-[70vh] pt-20">
          <PricingPackages onSelectPlan={handleOpenCommissionWithPlan} />
        </main>
      ) : <main className="relative z-10">
        {/* Hero Section matching the exact design & palette */}
        <Hero
          isDarkMode={isDarkMode}
          onExploreWork={handleExploreWork}
          onExplorePricing={handleExplorePricing}
        />

        {/* Core Competencies & Disciplines (SEO Domination, Web Design, Full-Stack, Lite) */}
        <ScrollReveal delayMs={50}>
          <ServicesSection
            onOpenProjectModal={() => {
              setModalInitialPlan(undefined);
              setIsProjectModalOpen(true);
            }}
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
      </main>}

      {/* Swiss Architectural Footer with Live Clocks */}
      <Footer
        isPricingPage={isPricingPage}
        onNavigatePath={navigateToPath}
        onOpenProjectModal={() => {
          setModalInitialPlan(undefined);
          setIsProjectModalOpen(true);
        }}
      />

      {/* Start A Project Interactive Commission Drawer */}
      {isProjectModalOpen && (
        <ProjectModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          initialPlan={modalInitialPlan}
        />
      )}

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
