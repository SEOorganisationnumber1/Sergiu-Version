import React, { useState, useEffect } from 'react';
import { Sun, Moon, Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onOpenProjectModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleDarkMode,
  onOpenProjectModal,
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Work');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing & Plans', href: '#pricing' },
    { name: 'Clients', href: '#clients' },
    { name: 'Studio', href: '#studio' },
    { name: 'Insights', href: '#insights' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f2f5f8]/90 dark:bg-[#080c12]/90 backdrop-blur-md shadow-sm'
          : 'bg-[#f2f5f8] dark:bg-[#080c12]'
      } border-b border-neutral-300/60 dark:border-neutral-800/80`}
    >
      <div className="max-w-[1680px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo - NXT/STUDIO */}
        <a
          href="#"
          onClick={() => sounds.playClick()}
          className="group flex items-center gap-1 text-2xl font-black tracking-[-0.04em] text-[#070b12] dark:text-white select-none"
        >
          <span>NXT</span>
          <span className="text-[#00cfc8] group-hover:rotate-12 transition-transform duration-300 inline-block font-black">
            /
          </span>
          <span>STUDIO</span>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => {
                sounds.playClick();
                setActiveLink(item.name);
              }}
              onMouseEnter={() => sounds.playHover()}
              className={`relative text-sm tracking-wide transition-colors duration-200 font-semibold ${
                activeLink === item.name
                  ? 'text-[#070b12] dark:text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-[#070b12] dark:hover:text-white'
              }`}
            >
              {item.name}
              {activeLink === item.name && (
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#00cfc8] rounded-full animate-in fade-in" />
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls & CTA */}
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Audio Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => sounds.playHover()}
            title={isMuted ? 'Enable Sound FX' : 'Mute Sound FX'}
            className="p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700/80 text-neutral-600 dark:text-neutral-300 hover:border-[#00cfc8] hover:text-[#00cfc8] transition-all duration-200"
            aria-label="Sound Toggle"
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} className="text-[#00cfc8]" />}
          </button>

          {/* Dark / Light Mode Switcher */}
          <button
            onClick={() => {
              sounds.playClick();
              toggleDarkMode();
            }}
            onMouseEnter={() => sounds.playHover()}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2.5 rounded-full border border-neutral-300 dark:border-neutral-700/80 text-neutral-600 dark:text-neutral-300 hover:border-[#00cfc8] hover:text-[#00cfc8] transition-all duration-200"
            aria-label="Theme Toggle"
          >
            {isDarkMode ? <Sun size={17} className="text-amber-300" /> : <Moon size={17} />}
          </button>

          {/* Start a project ↗ Button */}
          <button
            onClick={() => {
              sounds.playLaunch();
              onOpenProjectModal();
            }}
            onMouseEnter={() => sounds.playHover()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-none font-bold text-sm tracking-tight bg-transparent text-[#070b12] dark:text-white hover:text-[#00cfc8] dark:hover:text-[#00cfc8] transition-all duration-200 group"
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
            className="md:hidden p-2.5 rounded-sm border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-white"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-[#f2f5f8] dark:bg-[#080c12] border-b border-neutral-300 dark:border-neutral-800 p-6 flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  sounds.playClick();
                  setActiveLink(item.name);
                  setMobileMenuOpen(false);
                }}
                className="text-xl font-bold text-[#070b12] dark:text-white hover:text-[#00cfc8] flex items-center justify-between py-1 border-b border-neutral-200/50 dark:border-neutral-800/50"
              >
                <span>{item.name}</span>
                <ArrowUpRight size={16} className="text-[#00cfc8]" />
              </a>
            ))}
          </div>

          <button
            onClick={() => {
              sounds.playLaunch();
              setMobileMenuOpen(false);
              onOpenProjectModal();
            }}
            className="w-full py-3.5 px-6 bg-[#070d18] dark:bg-[#00cfc8] text-white dark:text-black font-extrabold tracking-wide uppercase text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Start a project</span>
            <ArrowUpRight size={18} />
          </button>
        </div>
      )}
    </header>
  );
};
