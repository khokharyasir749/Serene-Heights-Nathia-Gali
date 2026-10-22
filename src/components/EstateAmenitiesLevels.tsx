'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';

interface LevelSlide {
  id: string;
  romanNumber: string;
  tabTitle: string;
  eyebrow: string;
  title: string;
  description: string;
  hook: string;
  img: string;
  fallbackImg: string;
}

const LEVEL_SLIDES: LevelSlide[] = [
  {
    id: 'water',
    romanNumber: 'I',
    tabTitle: 'THE WATER',
    eyebrow: 'CHAPTER I · THE INFINITY EDGE',
    title: 'The Water',
    description:
      'A heated pool held above the valley with its own swim up bar, a candlelit hydrotherapy hall, and plunge pools fed by a waterfall skylight. Open through the snow.',
    hook: 'HEATED OUTDOOR POOL & SWIM UP BAR',
    img: '/img/amenity-pool-lg.webp',
    fallbackImg: '/img/facade-terraces-pool-lg.webp',
  },
  {
    id: 'spa',
    romanNumber: 'II',
    tabTitle: 'THE ALPINE SPA',
    eyebrow: 'CHAPTER II · THE SPA',
    title: 'The Alpine Spa',
    description:
      'A spa hall wrapped in a curtain of falling water, facing the peaks. Cedar saunas, steam rooms and treatment suites in the quiet of the hillside.',
    hook: 'THE WATER CURTAIN RELAXATION HALL',
    img: '/img/amenity-spa-lg.webp',
    fallbackImg: '/img/spa-curtain-lg.webp',
  },
  {
    id: 'skywalk',
    romanNumber: 'III',
    tabTitle: 'THE SKYWALK',
    eyebrow: 'CHAPTER III · BETWEEN THE TOWERS',
    title: 'The Skywalk',
    description:
      'A glass bridge floating between the towers: the forest sixty feet below your feet, the sky lobby at either end.',
    hook: 'THE FOREST, SIXTY FEET BELOW YOUR FEET',
    img: '/img/amenity-skywalk-lg.webp',
    fallbackImg: '/img/skywalk-corridor-lg.webp',
  },
  {
    id: 'pods',
    romanNumber: 'IV',
    tabTitle: 'THE FOREST PODS',
    eyebrow: 'CHAPTER IV · THE PODS',
    title: 'The Forest Pods',
    description:
      'Woven dining pods cantilevered over the canopy: a private table in the treetops, reached by a suspended walkway. A seat you will find nowhere else.',
    hook: 'PRIVATE DINING IN THE TREETOPS',
    img: '/img/amenity-pods-lg.webp',
    fallbackImg: '/img/pod-bridge-lg.webp',
  },
  {
    id: 'table',
    romanNumber: 'V',
    tabTitle: 'THE TABLE',
    eyebrow: 'CHAPTER V · THE TABLE',
    title: 'The Table',
    description:
      'A signature restaurant in stone and brass, twilight terraces under the deodars, and an all day café facing the peaks, morning to late.',
    hook: 'SIGNATURE DINING ROOM & TWILIGHT TERRACES',
    img: '/img/amenity-restaurant-lg.webp',
    fallbackImg: '/img/dining-night-lg.webp',
  },
];

export const EstateAmenitiesLevels: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [segmentProgress, setSegmentProgress] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [altitude, setAltitude] = useState(0);

  // Track scroll position across the 500vh container (5 full viewport steps)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate active slide (0-4), local segment progress (0-1), and altitude
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(0.9999, latest));
    const newIdx = Math.floor(clamped * 5);
    const localProg = (clamped * 5) % 1;

    if (newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
    setSegmentProgress(localProg);

    // Dynamic Altitude counter for Slide 3 (Skywalk): transitions 0 -> 60 FT BELOW as user walks across bridge
    if (newIdx === 2) {
      const currentAlt = Math.round(localProg * 60);
      setAltitude(currentAlt);
    } else if (newIdx < 2) {
      setAltitude(0);
    } else {
      setAltitude(60);
    }
  });

  // Smoothly scroll window to target slide offset when user clicks a tab
  const handleSelectSlide = (idx: number) => {
    setActiveIndex(idx);
    if (!containerRef.current) return;
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;

    const targetOffset = containerTop + (idx * 0.2 + 0.01) * scrollableDistance;

    window.scrollTo({
      top: targetOffset,
      behavior: 'smooth',
    });
  };

  const currentSlide = LEVEL_SLIDES[activeIndex] || LEVEL_SLIDES[0];

  // Subtle natural zoom factor: 1.0 to 1.07 as user scrolls through segment
  const currentScale = 1.0 + segmentProgress * 0.07;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500vh] bg-[#161B18] select-none"
    >
      {/* Sticky 100vh Pinned Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between bg-[#161B18] text-[#EAE6DE] z-30">
        {/* =========================================================================
            BACKGROUND IMAGE: FULL-SCREEN BLEED WITH SOFT LEFT VIGNETTE (image_f86d7d.png)
        ========================================================================= */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <AnimatePresence mode="sync">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `scale(${currentScale})`,
                willChange: 'transform',
              }}
              className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out"
            >
              <img
                src={currentSlide.img}
                alt={currentSlide.title}
                className="w-full h-full object-cover select-none filter-none"
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== currentSlide.fallbackImg) {
                    target.src = currentSlide.fallbackImg;
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Delicate Left Vignette for Razor-Sharp Text Contrast while Keeping Right Side Bright & Natural */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none z-10" />

          {/* Soft Bottom Vignette for Navigation Bar Legibility */}
          <div className="absolute bottom-0 left-0 w-full h-44 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none z-10" />
        </div>

        {/* =========================================================================
            TOP-RIGHT CHAPTER INDEX & ALTITUDE COUNTER (image_f86d7d.png)
        ========================================================================= */}
        <div className="absolute top-16 sm:top-20 md:top-24 right-8 sm:right-12 md:right-16 z-20 flex flex-col items-end text-right pointer-events-none">
          {/* Chapter Roman Index: e.g. III / V */}
          <div className="flex items-baseline space-x-1.5 font-serif font-light text-[#EAE6DE]/90 tracking-widest leading-none mb-3 sm:mb-4">
            <span className="text-3xl sm:text-4xl">{currentSlide.romanNumber}</span>
            <span className="text-base sm:text-lg text-[#EAE6DE]/50">/</span>
            <span className="text-lg sm:text-xl text-[#EAE6DE]/60">V</span>
          </div>

          {/* Dynamic Scroll-Driven Altitude Counter for Slide 3 (The Skywalk) */}
          <AnimatePresence>
            {activeIndex === 2 && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-end"
              >
                <span className="font-serif text-6xl sm:text-7xl md:text-8xl text-[#EAE6DE] font-light leading-none">
                  {altitude}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.28em] text-[#A8A195] uppercase mt-2">
                  FT BELOW
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =========================================================================
            LOWER-LEFT EDITORIAL TYPOGRAPHY (image_f86d7d.png)
        ========================================================================= */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex flex-col justify-end pb-28 sm:pb-32 md:pb-36 h-full pointer-events-none">
          <div className="max-w-xl md:max-w-2xl pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Eyebrow */}
                <div className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#C4BCB0]/90 uppercase font-light mb-3 sm:mb-4">
                  {currentSlide.eyebrow}
                </div>

                {/* Main Display Serif Title */}
                <h2 className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] text-[#EAE6DE] leading-[0.92] tracking-tight mb-5 sm:mb-6 drop-shadow-sm">
                  {currentSlide.title}
                </h2>

                {/* Editorial Description Copy */}
                <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-[#C4BCB0] max-w-lg mb-6 sm:mb-7 drop-shadow-sm">
                  {currentSlide.description}
                </p>

                {/* Bottom Detail Hook with Downward Arrow */}
                <div className="font-mono text-[10px] sm:text-xs tracking-[0.22em] text-[#9B8E7D] uppercase font-light flex items-center gap-2">
                  <span className="text-sm leading-none">↓</span>
                  <span>{currentSlide.hook}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM NAVIGATION BAR: 5 SEGMENT TABS WITH REAL-TIME SCRUBBERS (image_f86d7d.png)
        ========================================================================= */}
        <div className="absolute bottom-6 sm:bottom-8 left-0 w-full px-6 sm:px-10 md:px-14 z-30 pointer-events-auto">
          {/* 5-Column Grid spanning edge-to-edge */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full items-start">
            {LEVEL_SLIDES.map((slide, idx) => {
              const isActive = activeIndex === idx;
              const isPast = idx < activeIndex;

              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  type="button"
                  className="group flex flex-col items-start cursor-pointer text-left w-full"
                >
                  {/* Clean Hairline Progress Track directly above tab title */}
                  <div className="w-full h-[1.5px] bg-[#7A7468]/30 mb-2 sm:mb-2.5 relative overflow-hidden rounded-full">
                    <div
                      className="h-full bg-[#EAE6DE] transition-all duration-75"
                      style={{
                        width: isPast
                          ? '100%'
                          : isActive
                          ? `${segmentProgress * 100}%`
                          : '0%',
                      }}
                    />
                  </div>

                  {/* Tab Label: Roman Numeral + Tab Title */}
                  <div className="flex items-center space-x-2 font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.2em] uppercase transition-colors">
                    <span
                      className={
                        isActive
                          ? 'text-[#EAE6DE] font-semibold'
                          : 'text-[#7A7468] group-hover:text-[#A8A195]'
                      }
                    >
                      {slide.romanNumber}
                    </span>
                    <span
                      className={
                        isActive
                          ? 'text-[#EAE6DE] font-semibold'
                          : 'text-[#7A7468] group-hover:text-[#A8A195]'
                      }
                    >
                      {slide.tabTitle}
                    </span>
                  </div>

                  {/* Under Column 0: 07 / 12 Subhead */}
                  {idx === 0 && (
                    <div className="flex items-center space-x-2.5 mt-2.5 text-[#A8A195]/80 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase">
                      <span>07 / 12</span>
                      <span className="w-6 h-[1px] bg-[#7A7468]/40 inline-block" />
                    </div>
                  )}

                  {/* Under Column 4: SOUND ON / SOUND OFF Toggle */}
                  {idx === 4 && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsSoundOn((prev) => !prev)}
                      }
                      className="flex items-center space-x-2 mt-2.5 text-[#A8A195]/80 hover:text-[#EDE8DF] font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase transition-colors cursor-pointer"
                    >
                      <span className="font-mono tracking-widest text-[#7A7468]">
                        {isSoundOn ? '||||' : '....'}
                      </span>
                      <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
