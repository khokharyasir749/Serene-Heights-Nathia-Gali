'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Compass, ArrowRight } from 'lucide-react';
import { FloorPlateModal } from './FloorPlateModal';

interface ResidenceUnit {
  id: string;
  watermark: string;
  category: string;
  title: string;
  subtitle: string;
  residencesCount: number;
  area: string;
  priceOrStatus: string;
  isSoldOut?: boolean;
  caption: string;
  primaryImage: string;
  secondaryImage: string;
  secondaryTag: string;
  unitIdx: number;
}

const RESIDENCES: ResidenceUnit[] = [
  {
    id: 'studio',
    watermark: '01',
    category: '01 / 05 · FOREST STUDIOS',
    title: 'Studio',
    subtitle: 'Intimate spaces opening straight into the pine canopy.',
    residencesCount: 12,
    area: '390 to 416',
    priceOrStatus: 'Sold out',
    isSoldOut: true,
    caption: 'A single, efficient mountain room; the entry into the Reserve.',
    primaryImage: '/img/res-studio-lg.webp',
    secondaryImage: '/img/int-suite-living-lg.webp',
    secondaryTag: 'SUITE LIVING',
    unitIdx: 0,
  },
  {
    id: '1-bedroom',
    watermark: '02',
    category: '02 / 05 · PINEWOOD SUITES',
    title: '1 Bedroom',
    subtitle: 'Framed valley views: the heart of the Reserve.',
    residencesCount: 74,
    area: '607 to 1,170',
    priceOrStatus: 'From 3.9',
    isSoldOut: false,
    caption: 'The core of the building, and the most flexible to let.',
    primaryImage: '/img/int-1bed-living-lg.webp',
    secondaryImage: '/img/int-1bed-fireplace-lg.webp',
    secondaryTag: 'FIREPLACE LOUNGE',
    unitIdx: 1,
  },
  {
    id: '2-bedroom',
    watermark: '03',
    category: '03 / 05 · CEDAR RESIDENCES',
    title: '2 Bedroom',
    subtitle: 'For the families who summer, and now winter, in the hills.',
    residencesCount: 27,
    area: '1,056 to 2,305',
    priceOrStatus: 'From 7.1',
    isSoldOut: false,
    caption: 'Family scale residences with dual aspect on most floors.',
    primaryImage: '/img/res-2bed-lg.webp',
    secondaryImage: '/img/int-2bed-lg.webp',
    secondaryTag: 'MASTER SUITE',
    unitIdx: 2,
  },
  {
    id: '3-bedroom',
    watermark: '04',
    category: '04 / 05 · SUMMIT RESIDENCES',
    title: '3 Bedroom',
    subtitle: 'The widest valley frontage in the Reserve.',
    residencesCount: 12,
    area: '1,856 to 2,189',
    priceOrStatus: 'From 12.5',
    isSoldOut: false,
    caption: 'The deepest plates in the building.',
    primaryImage: '/img/res-3bed-lg.webp',
    secondaryImage: '/img/int-3bed-lg.webp',
    secondaryTag: 'CORNER BEDROOM',
    unitIdx: 3,
  },
  {
    id: 'penthouse',
    watermark: '05',
    category: '05 / 05 · SKY PENTHOUSES',
    title: 'Penthouse',
    subtitle: 'A private plunge pool, high above the pines.',
    residencesCount: 8,
    area: '2,291 to 3,714',
    priceOrStatus: 'From 20',
    isSoldOut: false,
    caption:
      'Each carries its own heated terrace pool, held over the valley: the highest private residences in the Galiyat.',
    primaryImage: '/img/res-pent-lg.webp',
    secondaryImage: '/img/res-pent-living-lg.webp',
    secondaryTag: 'TERRACE SALON',
    unitIdx: 4,
  },
];

// Exactly 13 relevant, verified architectural renders from public/img
const FILMSTRIP_ITEMS = [
  {
    id: 'studio-forest',
    tag: 'STUDIO · FOREST SUITE',
    image: '/img/res-studio-lg.webp',
    targetRatio: 0.18,
    unitIdx: 0,
  },
  {
    id: 'pinewood-lounge',
    tag: 'PINEWOOD · LIVING LOUNGE',
    image: '/img/int-1bed-living-lg.webp',
    targetRatio: 0.35,
    unitIdx: 1,
  },
  {
    id: 'murree-fireplace',
    tag: 'MURREE · FIREPLACE SUITE',
    image: '/img/int-1bed-fireplace-lg.webp',
    targetRatio: 0.35,
    unitIdx: 1,
  },
  {
    id: 'cedar-master',
    tag: 'CEDAR · MASTER BEDROOM',
    image: '/img/res-2bed-lg.webp',
    targetRatio: 0.52,
    unitIdx: 2,
  },
  {
    id: 'cedar-balcony',
    tag: 'CEDAR · PANORAMIC BALCONY',
    image: '/img/int-2bed-lg.webp',
    targetRatio: 0.52,
    unitIdx: 2,
  },
  {
    id: 'summit-living',
    tag: 'SUMMIT · VALLEY LIVING',
    image: '/img/res-3bed-lg.webp',
    targetRatio: 0.69,
    unitIdx: 3,
  },
  {
    id: 'summit-corner',
    tag: 'SUMMIT · CORNER SUITE',
    image: '/img/int-3bed-lg.webp',
    targetRatio: 0.69,
    unitIdx: 3,
  },
  {
    id: 'summit-dining',
    tag: 'SUMMIT · ALPINE DINING',
    image: '/img/dining-terrace-lg.webp',
    targetRatio: 0.69,
    unitIdx: 3,
  },
  {
    id: 'sky-terrace',
    tag: 'SKY · PENTHOUSE TERRACE',
    image: '/img/res-pent-lg.webp',
    targetRatio: 0.86,
    unitIdx: 4,
  },
  {
    id: 'sky-pool',
    tag: 'SKY · HEATED PLUNGE POOL',
    image: '/img/plunge-lg.webp',
    targetRatio: 0.86,
    unitIdx: 4,
  },
  {
    id: 'valley-mist',
    tag: 'VALLEY · MORNING MIST',
    image: '/img/day-0700-lg.webp',
    targetRatio: 0.18,
    unitIdx: 0,
  },
  {
    id: 'facade-golden',
    tag: 'FACADE · GOLDEN HOUR',
    image: '/img/day-1830-lg.webp',
    targetRatio: 0.52,
    unitIdx: 2,
  },
  {
    id: 'reserve-starlit',
    tag: 'RESERVE · STARLIT NIGHT',
    image: '/img/day-2200-lg.webp',
    targetRatio: 0.86,
    unitIdx: 4,
  },
];

interface ResidencesShowcaseSectionProps {
  onOpenExplorer: () => void;
  onVisibilityChange?: (visible: boolean) => void;
}

export const ResidencesShowcaseSection: React.FC<ResidencesShowcaseSectionProps> = ({
  onOpenExplorer,
  onVisibilityChange,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [modalResName, setModalResName] = useState<string | null>(null);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Direct viewport check to guarantee header hiding on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= 100;
      if (inView) {
        document.documentElement.setAttribute('data-in-residences', 'true');
        onVisibilityChange?.(true);
      } else {
        if (document.documentElement.getAttribute('data-in-residences') === 'true') {
          document.documentElement.removeAttribute('data-in-residences');
          onVisibilityChange?.(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.documentElement.removeAttribute('data-in-residences');
    };
  }, [onVisibilityChange]);

  // Track scroll position through the 550vh runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Inertial spring with precision parameters matching specs (stiffness: 55, damping: 24, mass: 0.5)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    mass: 0.5,
    restDelta: 0.0005,
  });

  // Primary horizontal translation driving upper residence cards (translates left)
  const xHigh = useTransform(smoothProgress, [0, 1], ['0%', '-78%']);

  // Dynamic counter-parallel parallax translation for the 13-item filmstrip carousel
  const xLow = useTransform(smoothProgress, [0, 1], ['0%', '-42%']);

  // Dynamic active unit index tracking for bottom filmstrip highlight
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    let idx = 0;
    if (latest >= 0.78) idx = 4;
    else if (latest >= 0.6) idx = 3;
    else if (latest >= 0.43) idx = 2;
    else if (latest >= 0.26) idx = 1;
    else idx = 0;

    if (idx !== activeUnitIdx) {
      setActiveUnitIdx(idx);
    }
  });

  // Smooth scroll page to jump directly to a specific residence offset
  const handleThumbnailClick = (targetRatio: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;

    window.scrollTo({
      top: containerTop + scrollableDistance * targetRatio,
      behavior: 'smooth',
    });
  };

  // Safe image error fallback handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (!target.src.includes('res-studio-lg.webp')) {
      target.src = '/img/res-studio-lg.webp';
    }
  };

  return (
    <>
      <motion.section
        ref={containerRef}
        id="residences"
        data-chapter="residences"
        onViewportEnter={() => {
          document.documentElement.setAttribute('data-in-residences', 'true');
          onVisibilityChange?.(true);
        }}
        onViewportLeave={() => {
          document.documentElement.removeAttribute('data-in-residences');
          onVisibilityChange?.(false);
        }}
        viewport={{ amount: 0.05 }}
        className="relative w-full h-[550vh] bg-[#F4F1EA] text-[#1E2621] select-none z-10"
      >
        {/* Sticky Stage Viewport with Balanced Top Padding (pt-10 md:pt-14 px-8 md:px-14) */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-10 md:pt-14 pb-4 px-8 md:px-14 bg-[#F4F1EA]">
          {/* ================= TOP BAR ================= */}
          <div className="w-full flex justify-between items-center z-20 shrink-0 mb-3 md:mb-5">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs tracking-[0.25em] text-[#1E2621]/70 uppercase">
                06
              </span>
              <span className="w-8 h-[1px] bg-[#1E2621]/30 inline-block" />
              <span className="font-mono text-xs tracking-[0.3em] text-[#1E2621]/90 uppercase font-medium">
                THE RESIDENCES
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-3 text-xs font-mono text-[#1E2621]/60 tracking-[0.25em] uppercase">
              <span>SCROLL HORIZONTALLY</span>
              <span className="w-8 h-[1px] bg-[#1E2621]/30 inline-block" />
            </div>
          </div>

          {/* ================= HORIZONTAL SLIDER TRACK (PARALLAX LAYER 1) ================= */}
          <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto py-2">
            <motion.div
              style={{ x: xHigh }}
              className="flex items-center pl-2 md:pl-4 will-change-transform"
            >
              {/* --- PANEL 0: INTRO EDITORIAL PANEL --- */}
              <div className="w-[44vw] min-w-[340px] md:w-[42vw] shrink-0 flex flex-col justify-center pr-8 lg:pr-14">
                <div className="flex items-center space-x-2 font-mono text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#8C7A6B] uppercase mb-3">
                  <span>06</span>
                  <span>·</span>
                  <span>THE RESIDENCES</span>
                </div>

                <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-[#1E2621] leading-[0.95] tracking-tight">
                  From studios <br />
                  <span className="italic text-[#8C7A6B]">to penthouses.</span>
                </h2>

                <p className="font-sans font-light text-xs sm:text-sm md:text-base text-[#1E2621]/80 leading-relaxed mt-6 max-w-sm">
                  One hundred and thirty three residences across two towers. Every unit is sold:
                  Elevate Holdings retains none for itself.
                </p>

                <div className="flex items-center space-x-2 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#8C7A6B] uppercase mt-8 pt-4 border-t border-[#1E2621]/15">
                  <span>STUDIO · 1 BEDROOM · 2 BEDROOM · 3 BEDROOM · PENTHOUSE</span>
                  <ArrowRight className="w-3.5 h-3.5 inline-block ml-1" />
                </div>
              </div>

              {/* --- PANELS 1–5: THE 5 RESIDENCES (DUAL-IMAGE ARCHITECTURAL LAYOUT) --- */}
              {RESIDENCES.map((res) => {
                return (
                  <div
                    key={res.id}
                    className="w-[90vw] sm:w-[86vw] md:w-[82vw] lg:w-[80vw] shrink-0 mr-12 md:mr-20 flex items-center"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 w-full items-center">
                      {/* Left Column: Editorial Copy, Watermark, Specs, CTAs */}
                      <div className="lg:col-span-5 relative flex flex-col justify-center">
                        {/* Giant Watermark Numeral Floating in Background */}
                        <span
                          className="absolute right-0 -top-10 md:-top-14 font-serif text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-light text-transparent select-none pointer-events-none leading-none z-0"
                          style={{
                            WebkitTextStroke: '1px rgba(30, 38, 33, 0.2)',
                          }}
                        >
                          {res.watermark}
                        </span>

                        <div className="relative z-10">
                          {/* Top Category Eyebrow */}
                          <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#8C7A6B] uppercase mb-1.5">
                            {res.category}
                          </div>

                          {/* Main Title */}
                          <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1E2621] tracking-tight leading-[1.05] mt-1">
                            {res.title}
                          </h3>

                          {/* Italic Subtitle */}
                          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#1E2621]/75 font-light mt-1 mb-5">
                            {res.subtitle}
                          </p>

                          {/* Specifications Grid */}
                          <div className="grid grid-cols-3 gap-2 sm:gap-4 py-3.5 my-3.5 border-y border-[#1E2621]/15">
                            <div>
                              <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-[#1E2621]/60 uppercase">
                                RESIDENCES
                              </span>
                              <span className="font-serif text-2xl sm:text-3xl text-[#1E2621] font-light mt-1 block tabular-nums lining-nums">
                                {res.residencesCount}
                              </span>
                            </div>

                            <div>
                              <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-[#1E2621]/60 uppercase">
                                AREA · SQ FT
                              </span>
                              <span className="font-mono text-xs sm:text-sm text-[#1E2621] font-medium mt-1.5 block tabular-nums lining-nums">
                                {res.area}
                              </span>
                            </div>

                            <div>
                              <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-[#1E2621]/60 uppercase">
                                {res.isSoldOut ? 'AVAILABILITY' : 'FROM · PKR CRORE'}
                              </span>
                              {res.isSoldOut ? (
                                <span className="inline-block mt-1.5 font-mono text-xs text-red-700 font-semibold uppercase tracking-wider">
                                  Sold out
                                </span>
                              ) : (
                                <span className="font-mono text-xs sm:text-sm text-[#8C7A6B] font-semibold mt-1.5 block tabular-nums lining-nums">
                                  {res.priceOrStatus}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Editorial Footnote */}
                          <p className="font-sans font-light text-xs sm:text-sm text-[#1E2621]/80 leading-relaxed mt-3 max-w-sm">
                            {res.caption}
                          </p>

                          {/* Action CTA Row */}
                          <div className="flex flex-wrap items-center gap-4 mt-5">
                            {!res.isSoldOut && (
                              <button
                                onClick={() => setModalResName(res.title)}
                                type="button"
                                className="bg-[#1E2621] text-[#F4F1EA] px-6 py-3 rounded-full text-xs font-mono tracking-wider hover:bg-black transition-colors flex items-center space-x-2 shadow-md cursor-pointer active:scale-95"
                              >
                                <span>REQUEST THE FLOOR PLATE</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={onOpenExplorer}
                              type="button"
                              className="font-mono text-xs tracking-wider text-[#1E2621] flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer py-2 px-1"
                            >
                              <Compass className="w-4 h-4 text-[#8C7A6B]" />
                              <span>EXPLORE IN 3D</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Dual Architectural Image Showcase (60% / 40% Split) */}
                      <div className="lg:col-span-7 relative flex flex-col justify-center">
                        <div className="grid grid-cols-12 gap-3 sm:gap-4 w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[410px]">
                          {/* Primary Hero Render (60% / col-span-7) */}
                          <div className="col-span-7 relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-[#E3DDD2] group">
                            <img
                              src={res.primaryImage}
                              alt={`${res.title} Primary View`}
                              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                              loading="lazy"
                              onError={handleImageError}
                            />
                            <div className="bg-gradient-to-t from-black/40 via-transparent to-transparent absolute inset-0 pointer-events-none opacity-60" />

                            {/* Sold Out Badge if applicable */}
                            {res.isSoldOut && (
                              <div className="absolute top-3.5 right-3.5 bg-[#F4F1EA]/95 border border-[#8C7A6B]/30 text-[#1E2621] font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full shadow-sm z-10 font-semibold">
                                SOLD OUT
                              </div>
                            )}
                          </div>

                          {/* Secondary Detail Render (40% / col-span-5) */}
                          <div className="col-span-5 relative h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-[#E3DDD2] group">
                            <img
                              src={res.secondaryImage}
                              alt={`${res.title} Detail View`}
                              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                              loading="lazy"
                              onError={handleImageError}
                            />
                            <div className="bg-gradient-to-t from-black/60 via-transparent to-transparent absolute inset-0 pointer-events-none" />

                            {/* Detail Micro Badge */}
                            <div className="absolute bottom-3 left-3.5 right-3.5 pointer-events-none z-10">
                              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#efe9df]/90 font-medium truncate block drop-shadow-sm">
                                {res.secondaryTag}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* --- PANEL 6: OUTRO PANEL --- */}
              <div className="w-[34vw] min-w-[280px] shrink-0 flex flex-col justify-center items-center text-center pr-12 group">
                <span className="font-mono text-xs tracking-[0.3em] text-[#8C7A6B] uppercase mb-4">
                  THE MIX
                </span>
                <button
                  onClick={() => setModalResName('The Complete Collection')}
                  type="button"
                  className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-light text-[#1E2621] hover:text-[#8C7A6B] transition-colors flex items-center space-x-3 cursor-pointer"
                >
                  <span>The full mix</span>
                  <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                </button>
                <p className="font-mono text-xs text-[#1E2621]/60 tracking-wider mt-4 max-w-xs">
                  133 private residences. Studio to Penthouse.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ================= BOTTOM INTERACTIVE FILMSTRIP CAROUSEL (EXACTLY 13 ARCHITECTURAL RENDERS) ================= */}
          <div className="w-full flex items-center justify-between gap-4 z-20 shrink-0 pt-2 pb-1">
            {/* Bottom-Left: Chapter index */}
            <div className="flex items-center shrink-0">
              <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#1E2621] uppercase font-semibold">
                06 / 12
              </span>
              <span className="w-8 md:w-12 h-[1px] bg-[#1E2621]/30 ml-3 inline-block" />
            </div>

            {/* Bottom-Center: 13 Architectural Renders Filmstrip Row with Smooth Scrolling Parallax */}
            <div className="relative overflow-hidden py-1 max-w-full lg:max-w-[75vw] xl:max-w-[78vw]">
              <motion.div
                style={{ x: xLow }}
                className="flex items-center space-x-3 md:space-x-4 will-change-transform"
              >
                {FILMSTRIP_ITEMS.map((item) => {
                  const isActive = activeUnitIdx === item.unitIdx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleThumbnailClick(item.targetRatio)}
                      type="button"
                      className={`group w-56 sm:w-64 md:w-72 h-30 sm:h-34 md:h-38 flex-shrink-0 relative overflow-hidden rounded-xl md:rounded-2xl border transition-all duration-300 cursor-pointer shadow-md ${
                        isActive
                          ? 'ring-2 ring-[#8C7A6B] border-transparent scale-[1.02] shadow-xl'
                          : 'border-[#1E2621]/10 opacity-85 hover:opacity-100 hover:scale-[1.01]'
                      }`}
                    >
                      {/* Full-bleed Photo */}
                      <img
                        src={item.image}
                        alt={item.tag}
                        className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                        onError={handleImageError}
                      />

                      {/* Subtle Bottom Gradient Overlay */}
                      <div className="bg-gradient-to-t from-black/75 via-black/25 to-transparent absolute inset-0 pointer-events-none" />

                      {/* Bottom-Left Anchored Tracked Typography */}
                      <div className="absolute bottom-3 left-4 md:bottom-3.5 md:left-4 z-10 pointer-events-none text-left">
                        <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#efe9df] font-medium drop-shadow-md truncate">
                          {item.tag}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            </div>

            {/* Bottom-Right: Interactive Sound Button */}
            <div className="flex items-center ml-auto sm:ml-0 shrink-0">
              <button
                onClick={() => setIsSoundOn((prev) => !prev)}
                type="button"
                className="flex items-center space-x-2 font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#1E2621]/70 hover:text-[#1E2621] uppercase transition-colors cursor-pointer"
              >
                <span className="font-mono tracking-widest text-[#8C7A6B]">
                  {isSoundOn ? '||||' : '....'}
                </span>
                <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Floor Plate Lead Intake Modal */}
      <FloorPlateModal
        isOpen={!!modalResName}
        residenceName={modalResName || ''}
        onClose={() => setModalResName(null)}
      />
    </>
  );
};
