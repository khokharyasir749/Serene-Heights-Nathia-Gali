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
      <style>{`
        html[data-in-residences='true'] header {
          opacity: 0 !important;
          transform: translateY(-100%) !important;
          pointer-events: none !important;
          transition: opacity 0.35s ease, transform 0.35s ease !important;
        }
      `}</style>
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
          {/* Left: Elegant Luxury Stacked Serif Brand Logo */}
          <a
            href="#ascent"
            className="group flex flex-col items-start text-left focus:outline-none select-none transition-opacity hover:opacity-90"
            aria-label="The Nathia Reserve"
          >
            <span
              className={`font-serif italic text-xs md:text-sm leading-none pl-0.5 mb-1 font-normal transition-colors duration-500 ${
                isLight ? 'text-[#121614]/70' : 'text-[#efe9df]/75 group-hover:text-[#c3a78e]'
              }`}
            >
              The
            </span>
            <span
              className={`font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.2em] uppercase font-light leading-none transition-colors duration-500 ${
                isLight ? 'text-[#121614]' : 'text-[#efe9df] group-hover:text-[#c3a78e]'
              }`}
            >
              Nathia
            </span>
            <span
              className={`font-serif text-[11px] sm:text-xs md:text-sm tracking-[0.38em] uppercase font-light leading-tight mt-0.5 pl-0.5 transition-colors duration-500 ${
                isLight ? 'text-[#121614]/85' : 'text-[#efe9df]/90 group-hover:text-[#c3a78e]'
              }`}
            >
              Reserve
            </span>
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
              onClick={() => setIsMenuOpen(true)}
              type="button"
              className="group flex items-center space-x-3 transition-colors focus:outline-none py-1"
              aria-label="Open navigation menu"
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

      {/* Slide-over Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectChapter={onSelectChapter}
      />
    </>
  );
};
