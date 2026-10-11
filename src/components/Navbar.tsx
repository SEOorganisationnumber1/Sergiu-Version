import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Volume2, VolumeX, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { OverlayScrollArea } from './OverlayScrollArea';

interface NavbarProps {
  isDarkMode: boolean;
  hasManualThemeOverride: boolean;
  toggleDarkMode: (origin?: { x: number; y: number }) => void;
  useSystemTheme: () => void;
  onOpenProjectModal: () => void;
  onNavigatePath: (path: string) => void;
  isPricingPage?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  hasManualThemeOverride,
  toggleDarkMode,
  useSystemTheme,
  onOpenProjectModal,
  onNavigatePath,
  isPricingPage = false,
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isPricingPage]);

  useEffect(() => {
    if (isPricingPage) {
      setActiveLink('Pricing & Plans');
      return;
    }
    const labels: Record<string, string> = {
      services: 'Services', work: 'Work',
      clients: 'Clients', studio: 'Studio', insights: 'Insights',
    };
    const sectionIds = Object.keys(labels);
    let frame = 0;
    const updateActiveLink = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const activationLine = Math.min(220, Math.max(120, window.innerHeight * 0.3));
        let current = '';
        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= activationLine) current = id;
        }
        setActiveLink(labels[current] ?? '');
      });
    };
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink, { passive: true });
    window.addEventListener('resize', updateActiveLink);
    return () => {
      window.removeEventListener('scroll', updateActiveLink);
      window.removeEventListener('resize', updateActiveLink);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isPricingPage]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [servicesOpen]);

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const navigateToSection = (href: string) => {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    if (reduceMotion) return;
    const heading = target.querySelector<HTMLElement>('h1, h2, h3');
    const arrivalTarget = heading ?? target;
    const startArrival = () => {
      arrivalTarget.classList.remove('section-nav-arrival');
      void arrivalTarget.offsetWidth;
      arrivalTarget.classList.add('section-nav-arrival');
      window.setTimeout(() => arrivalTarget.classList.remove('section-nav-arrival'), 560);
    };
    window.setTimeout(startArrival, heading ? 240 : 180);
  };

  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, name: string, href: string) => {
    event.preventDefault();
    sounds.playClick();
    if (href.startsWith('/')) {
      setServicesOpen(false);
      setMobileMenuOpen(false);
      setMobileServicesOpen(false);
      onNavigatePath(href);
      return;
    }
    if (name === 'Services' && window.matchMedia('(min-width: 1280px)').matches) { setServicesOpen((open) => !open); return; }
    setActiveLink(name);
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    window.setTimeout(() => navigateToSection(href), 140);
  };

  const navigateToService = (event: React.MouseEvent<HTMLAnchorElement>, serviceId: string) => {
    event.preventDefault();
    sounds.playClick();
    if (isPricingPage) {
      onNavigatePath(`/#${serviceId}`);
      return;
    }
    setActiveLink('Services');
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    window.setTimeout(() => window.dispatchEvent(new CustomEvent('nxt:open-service', { detail: { id: serviceId } })), 80);
  };

  const sectionHref = (id: string) => `${isPricingPage ? '/' : ''}#${id}`;
  const navLinks = [
    { name: 'Services', href: sectionHref('services') },
    { name: 'Work', href: sectionHref('work') },
    { name: 'Clients', href: sectionHref('clients') },
    { name: 'Studio', href: sectionHref('studio') },
    { name: 'Insights', href: sectionHref('insights') },
  ];

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full px-3 pt-3 sm:px-6"
    >
      <div
        onPointerMove={(event) => {
          if (event.pointerType === 'touch') return;
          const bounds = event.currentTarget.getBoundingClientRect();
          const pointerX = event.clientX - bounds.left;
          const pointerY = event.clientY - bounds.top;
          event.currentTarget.style.setProperty('--nav-pointer-x', `${pointerX}px`);
          event.currentTarget.style.setProperty('--nav-pointer-y', `${pointerY}px`);
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty('--nav-pointer-x', '50%');
          event.currentTarget.style.setProperty('--nav-pointer-y', '50%');
        }}
        className={`nav-capsule relative z-[60] mx-auto flex h-[62px] max-w-[1160px] items-center justify-between rounded-full border px-3 shadow-lg shadow-black/[0.04] transition-[background-color,border-color,box-shadow,height] duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-6 ${scrolled ? 'nav-capsule-scrolled' : ''}`}
      >
        {/* Brand Logo - NXT/STUDIO */}
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            sounds.playClick();
            onNavigatePath('/');
          }}
          className="nav-brand group flex shrink-0 items-center gap-1 whitespace-nowrap text-xl font-black tracking-[-0.04em] text-[#070b12] dark:text-white select-none sm:text-2xl"
        >
          <span>NXT</span>
          <span className="text-[#00cfc8] group-hover:rotate-12 transition-transform duration-300 inline-block font-black">
            /
          </span>
          <span>STUDIO</span>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden items-center gap-5 xl:flex xl:gap-7">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(event) => navigate(event, item.name, item.href)}
              aria-current={activeLink === item.name ? 'location' : undefined}
              aria-expanded={item.name === 'Services' ? servicesOpen : undefined}
              aria-controls={item.name === 'Services' ? 'services-mega' : undefined}
              onMouseMove={(event) => { const rect = event.currentTarget.getBoundingClientRect(); const dx = event.clientX - (rect.left + rect.width / 2); const dy = event.clientY - (rect.top + rect.height / 2); if (Math.hypot(dx, dy) < 42) event.currentTarget.style.transform = `translate(${dx * 0.13}px, ${dy * 0.13}px)`; }}
              onMouseLeave={(event) => { event.currentTarget.style.transform = ''; }}
              onMouseEnter={() => sounds.playHover()}
              className={`relative text-sm tracking-wide transition-colors duration-200 font-semibold ${
                activeLink === item.name
                  ? 'text-[#070b12] dark:text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-[#070b12] dark:hover:text-white'
              }`}
            >
              {item.name}
              {activeLink === item.name && (
                <span className="nav-active-indicator absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-[#00cfc8]" />
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls & CTA */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Audio Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => sounds.playHover()}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-300 p-0 text-neutral-600 transition-[color,border-color,background-color,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-[#00cfc8] hover:text-[#00cfc8] active:scale-95 dark:border-neutral-700/80 dark:text-neutral-300 sm:h-auto sm:w-auto sm:p-2.5"
            aria-label="Sound Toggle"
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} className="text-[#00cfc8]" />}
          </button>

          {/* Dark / Light Mode Switcher */}
          <button
            onClick={(event) => {
              sounds.playClick();
              const rect = event.currentTarget.getBoundingClientRect();
              toggleDarkMode(rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : undefined);
            }}
            onMouseEnter={() => sounds.playHover()}
            title={hasManualThemeOverride ? (isDarkMode ? 'Manual dark theme — switch to light' : 'Manual light theme — switch to dark') : `Following device theme (${isDarkMode ? 'dark' : 'light'}) — click to override`}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-300 p-0 text-neutral-600 transition-[color,border-color,background-color,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-[#00cfc8] hover:text-[#00cfc8] active:scale-95 dark:border-neutral-700/80 dark:text-neutral-300 sm:h-auto sm:w-auto sm:p-2.5"
            aria-label="Theme Toggle"
          >
            <span className="theme-toggle-icon block" key={isDarkMode ? 'sun' : 'moon'}>
              {isDarkMode ? <Sun size={17} className="text-amber-300" /> : <Moon size={17} />}
            </span>
          </button>
          {hasManualThemeOverride && (
            <button
              type="button"
              onClick={() => { sounds.playClick(); useSystemTheme(); }}
              onMouseEnter={() => sounds.playHover()}
              title="Return to device theme"
              aria-label="Return to device theme"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-neutral-300 p-0 text-neutral-600 transition-[color,border-color,background-color,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 hover:border-[#00cfc8] hover:text-[#00cfc8] active:scale-95 dark:border-neutral-700/80 dark:text-neutral-300 sm:h-auto sm:w-auto sm:p-2.5"
            >
              <Monitor size={16} />
            </button>
          )}

          {/* Pricing is a separate destination, so it sits with page actions rather than section anchors. */}
          <a
            href="/pricing"
            onClick={(event) => navigate(event, 'Pricing & Plans', '/pricing')}
            aria-current={isPricingPage ? 'page' : undefined}
            className={`hidden xl:inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-xs font-bold tracking-wide transition-[color,background-color,border-color,transform] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 ${isPricingPage ? 'border-[#00cfc8]/55 bg-[#00cfc8]/10 text-[#00736e] dark:text-[#00e0d6]' : 'border-neutral-300 text-neutral-700 hover:border-[#00cfc8] hover:text-[#00736e] dark:border-white/10 dark:text-neutral-200 dark:hover:text-[#00e0d6]'}`}
          >
            Pricing <ArrowUpRight size={14} />
          </a>

          {/* Start a project ↗ Button */}
          <button
            onClick={() => {
              sounds.playLaunch();
              onOpenProjectModal();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="hidden items-center gap-2 rounded-full bg-transparent px-5 py-2.5 text-sm font-bold tracking-tight text-[#070b12] transition-all duration-200 group hover:text-[#00cfc8] dark:text-white dark:hover:text-[#00cfc8] xl:inline-flex"
          >
            <span>Start a project</span>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-sm bg-neutral-200 dark:bg-neutral-800 text-[#070b12] dark:text-white group-hover:bg-[#00cfc8] group-hover:text-black transition-colors duration-200">
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="grid h-11 w-11 place-items-center rounded-xl border border-neutral-300 bg-white/70 text-neutral-800 transition-colors hover:border-[#00cfc8] dark:border-white/15 dark:bg-white/[.04] dark:text-white xl:hidden"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`menu-morph ${mobileMenuOpen ? 'is-open' : ''}`} aria-hidden="true"><span /><span /><span /></span>
          </button>
        </div>
      </div>

      {servicesOpen && <button type="button" className="services-mega-backdrop" aria-label="Close services menu" onClick={() => setServicesOpen(false)} />}
      {servicesOpen && <div id="services-mega" role="region" aria-label="Services overview" className="services-mega relative z-[50] mx-auto mt-2 max-w-[1160px] overflow-hidden rounded-[28px] border p-7 shadow-2xl sm:p-10">
        <div className="mb-6 flex items-end justify-between"><div><p className="mb-2 text-[10px] font-mono uppercase tracking-[.22em] text-[#00736e] dark:text-[#00cfc8]">What we do</p><h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-3xl">Digital systems built to compound.</h2></div><button onClick={() => setServicesOpen(false)} className="rounded-full border border-neutral-300 p-2 dark:border-white/15" aria-label="Close services"><X size={16} /></button></div>
        <div className="grid gap-3 sm:grid-cols-3">{[
          ['01', 'Search & SEO', 'Technical SEO, AEO and GEO infrastructure.', 's1'],
          ['02', 'Digital experiences', 'Distinctive identity and conversion-led UI/UX.', 's2'],
          ['03', 'Engineering', 'Fast full-stack platforms built to scale.', 's3'],
        ].map(([n, title, desc, id]) => <a key={n} href={`#service-${id}`} onClick={(event) => navigateToService(event, id)} className="group rounded-2xl border border-neutral-300/70 p-5 transition hover:border-[#00cfc8] dark:border-white/10"><span className="font-mono text-xs text-[#00736e] dark:text-[#00cfc8]">{n}</span><h3 className="mt-5 text-lg font-bold text-neutral-900 dark:text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">{desc}</p><ArrowUpRight size={17} className="mt-5 text-[#00736e] dark:text-[#00cfc8] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>)}</div>
      </div>}

      {/* Mobile Drawer Menu */}
      <OverlayScrollArea id="mobile-navigation" aria-hidden={!mobileMenuOpen} inert={!mobileMenuOpen} className={`mobile-navigation xl:hidden fixed left-3 right-3 top-[84px] bottom-3 z-[60] rounded-[26px] border border-neutral-300/70 shadow-2xl sm:left-6 sm:right-6 dark:border-white/10 ${mobileMenuOpen ? 'is-open' : ''}`} contentClassName="mobile-navigation-content h-full overflow-y-auto overscroll-contain rounded-[26px] px-5 pb-7 pt-5">
          <div className="mobile-navigation-inner relative mx-auto flex min-h-full max-w-xl flex-col">
            <div className="mobile-navigation-heading mb-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[.18em] text-neutral-500 dark:text-neutral-400">
              <span className="text-[#00736e] dark:text-[#00cfc8]">NXT/STUDIO — MENU</span><span>01 — 05</span>
            </div>
            <p className="mb-4 max-w-[19rem] text-[1.3rem] font-semibold leading-tight tracking-[-.04em] text-neutral-900 dark:text-white">Choose where you want to go.</p>
            <a
              href="/pricing"
              onClick={(event) => navigate(event, 'Pricing & Plans', '/pricing')}
              aria-current={isPricingPage ? 'page' : undefined}
              className={`mb-5 flex min-h-[68px] items-center gap-3 rounded-2xl border px-4 transition-[transform,border-color,background-color] duration-300 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-0.5 ${isPricingPage ? 'border-[#00cfc8]/55 bg-[#00cfc8]/10' : 'border-neutral-300/80 bg-white/60 dark:border-white/10 dark:bg-white/[.035]'}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#00cfc8]/12 font-mono text-xs font-bold text-[#00736e] dark:text-[#00e0d6]">↗</span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-neutral-900 dark:text-white">Pricing &amp; Plans</span><span className="mt-1 block text-[10px] font-mono uppercase tracking-[.1em] text-neutral-500 dark:text-neutral-400">Packages · investment · timelines</span></span>
              <ArrowUpRight size={16} className="shrink-0 text-[#00736e] dark:text-[#00cfc8]" />
            </a>
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[.16em] text-neutral-500 dark:text-neutral-400">Explore sections</p>
            <nav aria-label="Mobile navigation" className="mobile-navigation-list flex-1">
              {navLinks.map((item, index) => item.name === 'Services' ? (
                <div key={item.name} className="mobile-nav-row border-b border-neutral-300/70 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <a href={item.href} aria-current={activeLink === item.name ? 'location' : undefined} onClick={(event) => navigate(event, item.name, item.href)} className={`mobile-nav-link group flex min-h-[70px] flex-1 items-center gap-3 text-neutral-900 dark:text-white ${activeLink === item.name ? 'is-active' : ''}`}>
                      <span className="mobile-nav-number">0{index + 1}</span><span className="min-w-0 flex-1"><span className="mobile-nav-title">{item.name}</span><span className="mobile-nav-description">Search · identity · engineering</span></span><ArrowUpRight size={17} className="mr-2 text-[#00aaa4] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                    <button type="button" aria-label={mobileServicesOpen ? 'Hide service disciplines' : 'Show service disciplines'} aria-expanded={mobileServicesOpen} aria-controls="mobile-service-submenu" onClick={() => setMobileServicesOpen((open) => !open)} className="mobile-services-toggle grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-neutral-300 bg-white/70 dark:border-white/15 dark:bg-white/[.04]">
                      <ChevronDown size={18} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  <div id="mobile-service-submenu" aria-hidden={!mobileServicesOpen} inert={!mobileServicesOpen} className={`mobile-service-submenu ${mobileServicesOpen ? 'is-open' : ''}`}>
                    <div className="mobile-service-submenu-inner grid grid-cols-1 gap-2 pb-4 pl-11 sm:grid-cols-3">
                    {[
                    ['01 / SEARCH', 'SEO, AEO & GEO', 's1'],
                      ['02 / EXPERIENCE', 'Brand, design & motion', 's2'],
                      ['03 / ENGINEERING', 'Full-stack & WebGL', 's3'],
                    ].map(([label, detail, id]) => <a key={label} href={`#service-${id}`} onClick={(event) => navigateToService(event, id)} className="rounded-xl border border-neutral-300/70 px-3 py-3 dark:border-white/10">
                      <span className="block font-mono text-[9px] tracking-[.14em] text-[#00736e] dark:text-[#00cfc8]">{label}</span><span className="mt-1 block text-xs font-semibold text-neutral-800 dark:text-neutral-200">{detail}</span>
                    </a>)}
                    </div>
                  </div>
                </div>
              ) : (
                <a key={item.name} href={item.href} aria-current={activeLink === item.name ? 'location' : undefined} onClick={(event) => navigate(event, item.name, item.href)} className={`mobile-nav-row mobile-nav-link group flex min-h-[70px] items-center gap-3 border-b border-neutral-300/70 text-neutral-900 transition-colors hover:text-[#00aaa4] dark:border-white/10 dark:text-white ${activeLink === item.name ? 'is-active' : ''}`}>
                  <span className="mobile-nav-number">0{index + 1}</span><span className="min-w-0 flex-1"><span className="mobile-nav-title">{item.name}</span><span className="mobile-nav-description">{({ 'Pricing & Plans': 'Packages & custom architecture', Work: 'Selected projects & outcomes', Clients: 'Partners & recognition', Studio: 'Principles & people', Insights: 'Research & field notes' } as Record<string, string>)[item.name]}</span></span><ArrowUpRight size={17} className="mr-1 text-[#00aaa4] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              ))}
            </nav>
            <div className="mobile-navigation-cta mt-6 rounded-2xl border border-neutral-300/80 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[.045]">
              <p className="mb-3 text-[10px] font-mono uppercase tracking-[.16em] text-neutral-500 dark:text-neutral-400">Have a project in mind?</p>
              <button onClick={() => { sounds.playLaunch(); setMobileMenuOpen(false); onOpenProjectModal(); }} className="flex min-h-12 w-full items-center justify-between rounded-xl bg-[#00cfc8] px-4 text-sm font-extrabold text-[#07111a] transition-transform active:scale-[.98]">
                <span>Start a project</span><ArrowUpRight size={18} />
              </button>
              <a href="mailto:partner@nxtstudio.agency" className="mt-3 block text-center text-xs text-neutral-500 dark:text-neutral-400">partner@nxtstudio.agency</a>
            </div>
          </div>
        </OverlayScrollArea>
    </header>
  );
};
