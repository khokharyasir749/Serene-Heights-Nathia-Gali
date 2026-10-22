'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MenuDrawer } from './MenuDrawer';
import { Menu } from 'lucide-react';

interface HeaderProps {
  onRegisterClick: () => void;
  onSelectChapter: (id: string) => void;
  isVisible?: boolean;
  hidden?: boolean;
  theme?: 'dark' | 'light';
}

export const Header: React.FC<HeaderProps> = ({
  onRegisterClick,
  onSelectChapter,
  isVisible = true,
  hidden = false,
  theme = 'dark',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inResidencesDom, setInResidencesDom] = useState(false);
  const [isScrollVisible, setIsScrollVisible] = useState(true);
  const lastScrollY = useRef(0);
  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Maintain Chapter 06 Residences Dom exclusion
      const resEl = document.getElementById('residences');
      if (resEl) {
        const rect = resEl.getBoundingClientRect();
        // Active when residences section is in view
        const inRes = rect.top <= 100 && rect.bottom >= 100;
        setInResidencesDom(inRes);
      }

      // 2. Smart Auto-Hiding scroll direction detection
      // Always show at the top of the page
      if (currentScrollY < 60) {
        setIsScrollVisible(true);
      } else if (
        currentScrollY > lastScrollY.current &&
        currentScrollY - lastScrollY.current > 10
      ) {
        // Scrolling down -> smoothly slide up and hide navbar
        setIsScrollVisible(false);
      } else if (
        currentScrollY < lastScrollY.current &&
        lastScrollY.current - currentScrollY > 10
      ) {
        // Scrolling up -> smoothly slide down and reveal navbar
        setIsScrollVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldShow = isVisible && !hidden && !inResidencesDom && (isScrollVisible || isMenuOpen);

  return (
    <>
      <header
        style={{
          transform: shouldShow ? 'translateY(0)' : 'translateY(-100%)',
          opacity: shouldShow ? 1 : 0,
          pointerEvents: shouldShow ? 'auto' : 'none',
          transition:
            'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`fixed top-0 left-0 right-0 z-40 w-full bg-transparent px-8 md:px-16 pt-8 pb-4 ${
          shouldShow
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
      >
        <div className="w-full flex justify-between items-center">
          {/* Left: Official Logo Crest & Elegant Luxury Typography */}
          <a
            href="#ascent"
            className="group flex items-center gap-3 sm:gap-4 text-left focus:outline-none select-none transition-opacity hover:opacity-95"
            aria-label="Serene Heights Nathia Gali"
          >
            <img
              src={isLight ? '/assets/logo/logoGreen.png' : '/assets/logo/logo.png'}
              alt="Serene Heights Crest"
              className="h-10 sm:h-12 w-auto object-contain transition-all duration-500 shrink-0 drop-shadow"
            />
            <div className="flex flex-col items-start">
              <span
                className={`font-serif text-xl sm:text-2xl md:text-3xl tracking-[0.16em] uppercase font-light leading-none transition-colors duration-500 ${
                  isLight ? 'text-[#121614]' : 'text-[#efe9df] group-hover:text-[#c3a78e]'
                }`}
              >
                Serene Heights
              </span>
              <span
                className={`font-mono text-[8px] sm:text-[9.5px] tracking-[0.32em] uppercase font-light leading-tight mt-1 transition-colors duration-500 ${
                  isLight ? 'text-[#121614]/75' : 'text-[#efe9df]/70 group-hover:text-[#c3a78e]'
                }`}
              >
                Nathia Gali · 7,906 FT
              </span>
            </div>
          </a>

          {/* Right Action Controls: Transparent Pill CTA & Two-Line Menu Trigger */}
          <div className="flex items-center space-x-5 sm:space-x-8 md:space-x-10">
            {/* "REGISTER INTEREST" Button */}
            <button
              onClick={onRegisterClick}
              type="button"
              className={`border rounded-full px-5 sm:px-6 py-2 sm:py-2.5 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-500 bg-transparent active:scale-95 ${
                isLight
                  ? 'border-[#121614]/40 hover:border-[#121614] text-[#121614] hover:bg-[#121614]/5'
                  : 'border-[#efe9df]/40 hover:border-[#c3a78e] text-[#efe9df] hover:text-[#c3a78e]'
              }`}
            >
              REGISTER INTEREST
            </button>

            {/* "MENU" Trigger: Clean uppercase text "MENU" paired with minimal two-line hamburger */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              type="button"
              className="group flex items-center space-x-3 transition-colors focus:outline-none py-1"
              aria-label="Toggle navigation menu"
            >
              <span
                className={`font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${
                  isLight
                    ? 'text-[#121614]'
                    : 'text-[#efe9df] group-hover:text-[#c3a78e]'
                }`}
              >
                MENU
              </span>
              <div className="flex flex-col justify-center items-center space-y-1 w-6">
                <span
                  className={`w-6 h-[1.5px] transition-colors duration-500 rounded-full ${
                    isLight ? 'bg-[#121614]' : 'bg-[#efe9df] group-hover:bg-[#c3a78e]'
                  }`}
                />
                <span
                  className={`w-6 h-[1.5px] transition-colors duration-500 rounded-full ${
                    isLight ? 'bg-[#121614]' : 'bg-[#efe9df] group-hover:bg-[#c3a78e]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Split Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectChapter={onSelectChapter}
        onRegisterClick={onRegisterClick}
      />
    </>
  );
};
