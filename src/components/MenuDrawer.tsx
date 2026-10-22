'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (id: string) => void;
  onRegisterClick?: () => void;
}

interface MenuItem {
  num: string;
  title: string;
  subtitle: string;
  targetId: string;
  image: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    num: '01',
    title: 'The Reserve',
    subtitle: 'ABOVE THE MIST LINE',
    targetId: 'manifesto',
    image: '/img/cloudsea-lg.webp',
  },
  {
    num: '02',
    title: 'Residences',
    subtitle: '133 · STUDIO TO PENTHOUSE',
    targetId: 'residences',
    image: '/img/facade-snow-night-lg.webp',
  },
  {
    num: '03',
    title: 'The Estate',
    subtitle: '25,000+ SQ FT · FOUR LEVELS',
    targetId: 'estate',
    image: '/img/amenity-lobby-lg.webp',
  },
  {
    num: '04',
    title: 'Location',
    subtitle: 'THE MAIN NATHIA GALI ROAD',
    targetId: 'location-map',
    image: '/img/aerial-ridge-lg.webp',
  },
  {
    num: '05',
    title: 'Elevate',
    subtitle: 'OPERATOR BEFORE DEVELOPER',
    targetId: 'elevate',
    image: '/img/founder-lg.webp',
  },
  {
    num: '06',
    title: 'Questions',
    subtitle: 'DIRECT ANSWERS',
    targetId: 'register',
    image: '/img/int-living-day-lg.webp',
  },
];

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  onRegisterClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Lock body scroll and listen for Escape key when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  const handleItemClick = (targetId: string) => {
    onClose();
    setTimeout(() => {
      onSelectChapter(targetId);
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  const handleRegister = () => {
    onClose();
    setTimeout(() => {
      if (onRegisterClick) {
        onRegisterClick();
      } else {
        const el = document.getElementById('register');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 450);
  };

  const handleExplorer = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById('explorer');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 450);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-[#161B18] text-[#EAE6DE] flex overflow-hidden select-none shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
        >
          {/* ================= LEFT HALF: DYNAMIC IMAGE PREVIEW (Desktop) ================= */}
          <div className="hidden lg:block lg:w-[45%] xl:w-[48%] h-full relative overflow-hidden bg-[#0c0f0d]">
            <AnimatePresence mode="wait">
              <motion.img
                key={MENU_ITEMS[activeIndex].image}
                src={MENU_ITEMS[activeIndex].image}
                alt={MENU_ITEMS[activeIndex].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            {/* Vignette gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#161B18] to-transparent pointer-events-none" />

            {/* Brand Logo Watermark (Top Left) */}
            <div className="absolute top-10 left-10 z-10 select-none pointer-events-none opacity-80">
              <div className="font-serif text-xl tracking-[0.15em] text-[#EAE6DE] font-light leading-none">
                The
              </div>
              <div className="font-serif text-3xl tracking-[0.2em] text-[#C9BEAE] font-normal leading-tight uppercase -mt-0.5">
                Nathia
              </div>
              <div className="font-mono text-[9px] tracking-[0.35em] text-[#EAE6DE]/70 uppercase">
                Reserve
              </div>
            </div>
          </div>

          {/* ================= RIGHT HALF: NAVIGATION & ACTIONS ================= */}
          <div className="flex-1 h-full px-8 sm:px-14 md:px-16 lg:px-20 py-10 md:py-12 flex flex-col justify-between overflow-y-auto bg-[#161B18]">
            {/* Top Bar inside Menu Drawer */}
            <div className="flex items-center justify-between w-full">
              {/* Centered Decorative Tan Dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9BEAE]" />

              {/* Right Action Controls */}
              <div className="flex items-center space-x-6 sm:space-x-8">
                <button
                  type="button"
                  onClick={handleRegister}
                  className="px-6 py-2 rounded-full border border-[#7A7468]/50 text-[#EAE6DE] hover:border-[#C9BEAE] hover:text-[#C9BEAE] transition-all font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase cursor-pointer"
                >
                  REGISTER INTEREST
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-[#EAE6DE] hover:text-[#C9BEAE] transition-colors cursor-pointer group"
                >
                  <span>CLOSE</span>
                  <span className="text-base font-light transition-transform group-hover:rotate-90 duration-300">
                    ✕
                  </span>
                </button>
              </div>
            </div>

            {/* Main Menu List (The 6 Luxury Chapter Items) */}
            <div className="my-auto w-full py-6">
              {MENU_ITEMS.map((item, index) => {
                const isHovered = activeIndex === index;
                return (
                  <div
                    key={item.num}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleItemClick(item.targetId)}
                    className="w-full border-b border-[#7A7468]/20 py-4 sm:py-5 lg:py-6 flex items-baseline justify-between group cursor-pointer transition-colors"
                  >
                    {/* Left: Number and Title */}
                    <div className="flex items-baseline gap-6 sm:gap-10">
                      <span className="font-mono text-xs sm:text-sm tracking-wider text-[#A8A195]/60 group-hover:text-[#C9BEAE] transition-colors w-6 sm:w-8 shrink-0">
                        {item.num}
                      </span>
                      <span
                        className={`font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] font-light tracking-tight leading-none transition-colors ${
                          isHovered
                            ? 'text-[#C9BEAE]'
                            : 'text-[#EAE6DE] group-hover:text-[#C9BEAE]'
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>

                    {/* Right: Subtitle */}
                    <span className="font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light ml-4 text-right group-hover:text-[#EAE6DE] transition-colors shrink-0">
                      {item.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Controls & Metadata Footer */}
            <div className="w-full pt-4">
              {/* 3D Explorer Button */}
              <button
                type="button"
                onClick={handleExplorer}
                className="px-6 py-2.5 rounded-full border border-[#7A7468]/50 text-[#EAE6DE] hover:border-[#C9BEAE] hover:text-[#C9BEAE] font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase transition-all flex items-center gap-2.5 cursor-pointer mb-6"
              >
                <span>3D EXPLORER</span>
                <span className="text-sm">→</span>
              </button>

              {/* Three Editorial Footer Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-[#7A7468]/15 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-light">
                <div>
                  <span className="text-[#7A7468] block mb-1">ADDRESS</span>
                  <span className="text-[#EAE6DE]">Nathia Gali Road, 7,900 FT</span>
                </div>
                <div>
                  <span className="text-[#7A7468] block mb-1">ENQUIRIES</span>
                  <span className="text-[#EAE6DE]">concierge@thenathiareserve.com</span>
                </div>
                <div>
                  <span className="text-[#7A7468] block mb-1">YOU ARE HERE</span>
                  <span className="text-[#C9BEAE]">The Nathia Reserve</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
