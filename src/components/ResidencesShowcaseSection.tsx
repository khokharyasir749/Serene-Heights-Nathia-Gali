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
  primaryTag: string;
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
    caption: 'A single, efficient mountain room; the entry into Serene Heights.',
    primaryImage: '/img/res-studio-lg.webp',
    primaryTag: 'STUDIO · FOREST SUITE',
    secondaryImage: '/pictures/about/obj/objImg4.png',
    secondaryTag: 'SUITE INTERIOR',
    unitIdx: 0,
  },
  {
    id: '1-bedroom',
    watermark: '02',
    category: '02 / 05 · PINEWOOD SUITES',
    title: '1 Bedroom',
    subtitle: 'Framed valley views: the heart of Serene Heights.',
    residencesCount: 74,
    area: '607 to 1,170',
    priceOrStatus: 'From 3.9',
    isSoldOut: false,
    caption: 'The core of the building, and the most flexible to let.',
    primaryImage: '/pictures/about/obj/objImg1.png',
    primaryTag: 'PINEWOOD · 1-BED EXECUTIVE SUITE',
    secondaryImage: '/img/int-fireplace-lg.webp',
    secondaryTag: 'FIREPLACE LOUNGE',
    unitIdx: 1,
  },
  {
    id: '2-bedroom',
    watermark: '03',
    category: '03 / 05 · MURREE RIDGE',
    title: '2 Bedroom',
    subtitle: 'For the families who summer, and now winter, in the hills.',
    residencesCount: 27,
    area: '1,056 to 2,305',
    priceOrStatus: 'From 7.1',
    isSoldOut: false,
    caption: 'Family scale residences with dual aspect on most floors.',
    primaryImage: '/pictures/about/obj/objImg2.png',
    primaryTag: 'MURREE · 2-BED RESIDENCE',
    secondaryImage: '/img/int-master-bath-lg.webp',
    secondaryTag: 'MASTER BATH & BED',
    unitIdx: 2,
  },
  {
    id: '3-bedroom',
    watermark: '04',
    category: '04 / 05 · SUMMIT RESIDENCES',
    title: '3 Bedroom',
    subtitle: 'The widest valley frontage in Serene Heights.',
    residencesCount: 12,
    area: '1,856 to 2,189',
    priceOrStatus: 'From 12.5',
    isSoldOut: false,
    caption: 'The deepest plates in the building.',
    primaryImage: '/pictures/about/obj/objImg3.png',
    primaryTag: 'SUMMIT · 3-BED SUITE',
    secondaryImage: '/img/dining-terrace-lg.webp',
    secondaryTag: 'ALPINE DINING',
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
    primaryTag: 'SKY · HEATED PLUNGE POOL',
    secondaryImage: '/img/res-pent-living-lg.webp',
    secondaryTag: 'PENTHOUSE SALON',
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
  const xHigh = useTransform(smoothProgress, [0, 1], ['0%', '-81%']);

  // Dynamic counter-parallel parallax translation for the 13-item filmstrip carousel
  const xLow = useTransform(smoothProgress, [0, 1], ['0%', '-45%']);

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
        {/* Sticky Stage Viewport with Balanced Top Padding */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-[#F4F1EA]">
          {/* ================= TOP BAR ================= */}
          <div className="w-full flex justify-between items-center z-20 shrink-0 pt-6 md:pt-8 px-8 md:px-14">
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
          <div className="relative w-full flex-1 flex items-center overflow-hidden my-auto px-8 md:px-14">
            <motion.div
              style={{ x: xHigh }}
              className="flex items-center pl-2 md:pl-4 will-change-transform"
            >
              {/* --- PANEL 0: EXACT INTRO SHOWCASE CARD (DUAL-IMAGE ARCHITECTURAL COMPOSITION) --- */}
              <div className="w-[90vw] sm:w-[86vw] md:w-[82vw] lg:w-[80vw] shrink-0 mr-12 md:mr-20 flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 w-full items-center">
                  {/* Left Column: Eyebrow, Display Headline, Editorial Body, Category Filter */}
                  <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
                    {/* Top Eyebrow */}
                    <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                      <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#7A7468] uppercase font-light">
                        06
                      </span>
                      <span className="w-8 sm:w-10 h-[1px] bg-[#7A7468]/40 inline-block" />
                      <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#7A7468] uppercase font-light">
                        THE RESIDENCES
                      </span>
                    </div>

                    {/* Headline Typography (Exact Two-Tone Styling matching image_f7943f.png) */}
                    <h2 className="tracking-tight leading-[0.92]">
                      <span className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] text-[#1E2621] block leading-[0.92]">
                        From studios
                      </span>
                      <span className="font-serif italic font-light text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] text-[#9B8E7D] tracking-normal leading-[0.92] mt-1 sm:mt-2 block">
                        to penthouses.
                      </span>
                    </h2>

                    {/* Left Editorial Body Copy */}
                    <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-[#555E57] max-w-md mt-6 sm:mt-8">
                      Over one hundred and fifty executive residences across three towers. Fully
                      furnished 5-star mountain suites managed directly under DM Consortium.
                    </p>

                    {/* Bottom Category Filter Row */}
                    <div className="font-mono text-[10px] sm:text-xs tracking-[0.22em] uppercase text-[#7A7468] font-medium flex items-center flex-wrap gap-2 sm:gap-2.5 mt-8 sm:mt-10">
                      <button
                        type="button"
                        onClick={() => handleThumbnailClick(0.18)}
                        className="hover:text-[#1E2621] transition-colors cursor-pointer"
                      >
                        STUDIO
                      </button>
                      <span className="text-[#7A7468]/60">·</span>
                      <button
                        type="button"
                        onClick={() => handleThumbnailClick(0.35)}
                        className="hover:text-[#1E2621] transition-colors cursor-pointer"
                      >
                        1 BEDROOM
                      </button>
                      <span className="text-[#7A7468]/60">·</span>
                      <button
                        type="button"
                        onClick={() => handleThumbnailClick(0.52)}
                        className="hover:text-[#1E2621] transition-colors cursor-pointer"
                      >
                        2 BEDROOM
                      </button>
                      <span className="text-[#7A7468]/60">·</span>
                      <button
                        type="button"
                        onClick={() => handleThumbnailClick(0.69)}
                        className="hover:text-[#1E2621] transition-colors cursor-pointer"
                      >
                        3 BEDROOM
                      </button>
                      <span className="text-[#7A7468]/60">·</span>
                      <button
                        type="button"
                        onClick={() => handleThumbnailClick(0.86)}
                        className="hover:text-[#1E2621] transition-colors cursor-pointer"
                      >
                        PENTHOUSE
                      </button>
                      <button
                        type="button"
                        onClick={() => handleThumbnailClick(0.18)}
                        className="hover:text-[#1E2621] transition-colors cursor-pointer ml-1"
                      >
                        <ArrowRight className="w-3.5 h-3.5 inline-block" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Imagery Composition (Primary Card + Inset Floating Card) */}
                  <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center lg:items-end justify-center pr-4 sm:pr-8 md:pr-10">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[380px] sm:h-[440px] md:h-[500px] w-full max-w-[560px] lg:max-w-[620px] bg-[#EAE6DE]">
                      {/* Primary Bedroom Suite Render with Mountain Balcony Window */}
                      <img
                        src="/img/int-penthouse-bedroom-lg.webp"
                        alt="Serene Heights Luxury Suite Bedroom"
                        className="w-full h-full object-cover"
                        loading="eager"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('res-studio-lg.webp')) {
                            target.src = '/img/res-studio-lg.webp';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                      {/* "SOLD OUT" Badge pinned top-right inside primary image */}
                      <div className="absolute top-5 right-5 px-3.5 py-1.5 rounded-full bg-[#EAE6DE]/90 text-[#1E2621] font-mono text-[9px] tracking-[0.22em] uppercase font-semibold backdrop-blur-md shadow-sm z-10">
                        SOLD OUT
                      </div>
                    </div>

                    {/* Inset Floating Thumbnail overlapping bottom-right */}
                    <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-40 sm:w-48 md:w-56 h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border-[3px] border-[#F4F1EA] shadow-2xl z-20 bg-[#EAE6DE]">
                      <img
                        src="/img/int-suite-living-lg.webp"
                        alt="Serene Heights Living Lounge"
                        className="w-full h-full object-cover"
                        loading="eager"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('int-1bed-living-lg.webp')) {
                            target.src = '/img/int-1bed-living-lg.webp';
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                        <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#efe9df] font-medium drop-shadow-sm truncate block">
                          SUITE LIVING
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- PANELS 1–5: THE 5 RESIDENCES (PRIMARY HERO + INSET FLOATING THUMBNAIL) --- */}
              {RESIDENCES.map((res) => {
                return (
                  <div
                    key={res.id}
                    className="w-[90vw] sm:w-[86vw] md:w-[82vw] lg:w-[80vw] shrink-0 mr-12 md:mr-20 flex items-center"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 w-full items-center">
                      {/* Left Column: Editorial Copy, Watermark, Specs, CTAs */}
                      <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col justify-center py-1 md:py-2">
                        {/* Giant Watermark Numeral Floating in Background */}
                        <span
                          className="absolute right-0 -top-6 md:-top-10 font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-light text-transparent select-none pointer-events-none leading-none z-0"
                          style={{
                            WebkitTextStroke: '1px rgba(30, 38, 33, 0.18)',
                          }}
                        >
                          {res.watermark}
                        </span>

                        <div className="relative z-10 flex flex-col justify-center">
                          {/* Top: Category Eyebrow, Main Title & Subtitle */}
                          <div>
                            <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#9B8E7D] uppercase mb-1.5 md:mb-2">
                              {res.category}
                            </div>

                            <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1E2621] tracking-tight leading-[1.02]">
                              {res.title}
                            </h3>

                            <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#9B8E7D] font-light mt-1.5 mb-2">
                              {res.subtitle}
                            </p>
                          </div>

                          {/* Middle: Specifications Grid & Body Paragraph */}
                          <div className="py-2 md:py-3">
                            <div className="grid grid-cols-3 gap-3 sm:gap-4 py-3 sm:py-4 md:py-5 border-y border-[#1E2621]/15">
                              <div>
                                <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-[#1E2621]/60 uppercase mb-1">
                                  RESIDENCES
                                </span>
                                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1E2621] font-light block tabular-nums lining-nums leading-none">
                                  {res.residencesCount}
                                </span>
                              </div>

                              <div>
                                <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-[#1E2621]/60 uppercase mb-1">
                                  AREA · SQ FT
                                </span>
                                <span className="font-mono text-xs sm:text-sm md:text-base text-[#1E2621] font-medium block tabular-nums lining-nums leading-tight">
                                  {res.area}
                                </span>
                              </div>

                              <div>
                                <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-[#1E2621]/60 uppercase mb-1">
                                  {res.isSoldOut ? 'AVAILABILITY' : 'FROM · PKR CRORE'}
                                </span>
                                {res.isSoldOut ? (
                                  <span className="inline-block font-mono text-xs sm:text-sm text-red-700 font-semibold uppercase tracking-wider leading-tight">
                                    Sold out
                                  </span>
                                ) : (
                                  <span className="font-mono text-xs sm:text-sm md:text-base text-[#1E2621] font-semibold block tabular-nums lining-nums leading-tight">
                                    {res.priceOrStatus}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Brief Architectural Summary */}
                            <p className="font-sans font-light text-xs sm:text-sm md:text-base text-[#555E57] leading-relaxed mt-3.5 md:mt-4 max-w-sm lg:max-w-md">
                              {res.caption}
                            </p>
                          </div>

                          {/* Bottom: Action CTA Row */}
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3 md:pt-4">
                            {!res.isSoldOut && (
                              <button
                                onClick={() => setModalResName(res.title)}
                                type="button"
                                className="bg-[#1E2621] text-[#EAE6DE] px-6 py-3 rounded-full text-xs font-mono tracking-wider hover:bg-black transition-colors flex items-center space-x-2 shadow-md cursor-pointer active:scale-95"
                              >
                                <span>REQUEST THE FLOOR PLATE</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={onOpenExplorer}
                              type="button"
                              className="font-mono text-xs tracking-wider text-[#1E2621] flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer py-1.5 px-1"
                            >
                              <Compass className="w-4 h-4 text-[#9B8E7D]" />
                              <span>EXPLORE IN 3D</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Dominant Primary Hero Image + Inset Floating Thumbnail */}
                      <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center lg:items-end justify-center pr-4 sm:pr-8 md:pr-10">
                        {/* Primary Hero Image (Dominant Window) */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[380px] sm:h-[440px] md:h-[500px] w-full max-w-[560px] lg:max-w-[620px] bg-[#EAE6DE]">
                          <img
                            src={res.primaryImage}
                            alt={`${res.title} Primary View`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                            loading="lazy"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                          {/* "SOLD OUT" Badge pinned top-right if applicable */}
                          {res.isSoldOut && (
                            <div className="absolute top-5 right-5 px-3.5 py-1.5 rounded-full bg-[#EAE6DE]/90 text-[#1E2621] font-mono text-[9px] tracking-[0.22em] uppercase font-semibold backdrop-blur-md shadow-sm z-10">
                              SOLD OUT
                            </div>
                          )}

                          {/* Subtle bottom-left room tag badge */}
                          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#efe9df] font-medium drop-shadow-sm px-2.5 py-1 rounded bg-black/40 backdrop-blur-sm">
                              {res.primaryTag}
                            </span>
                          </div>
                        </div>

                        {/* Inset Floating Secondary Thumbnail */}
                        <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 w-40 sm:w-48 md:w-56 h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden border-[3px] border-[#F4F1EA] shadow-2xl z-20 bg-[#EAE6DE]">
                          <img
                            src={res.secondaryImage}
                            alt={`${res.title} Detail View`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                            loading="lazy"
                            onError={handleImageError}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                          {/* Tag Badge anchored to bottom */}
                          <div className="absolute bottom-3 left-3 right-3 pointer-events-none z-10">
                            <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#efe9df] font-medium truncate block drop-shadow-sm">
                              {res.secondaryTag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* --- PANEL 6: OUTRO PANEL --- */}
              <div className="w-[34vw] min-w-[280px] shrink-0 flex flex-col justify-center items-center text-center pr-12 group">
                <span className="font-mono text-xs tracking-[0.3em] text-[#9B8E7D] uppercase mb-3">
                  THE MIX
                </span>
                <button
                  onClick={() => setModalResName('The Complete Collection')}
                  type="button"
                  className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-light text-[#1E2621] hover:text-[#9B8E7D] transition-colors flex items-center space-x-3 cursor-pointer"
                >
                  <span>The full mix</span>
                  <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                </button>
                <p className="font-mono text-xs text-[#1E2621]/60 tracking-wider mt-3 max-w-xs">
                  133 private residences. Studio to Penthouse.
                </p>
              </div>
            </motion.div>
          </div>

          {/* ================= BOTTOM INTERACTIVE FILMSTRIP CAROUSEL (ZERO WHITE GAP) ================= */}
          <div className="w-full z-20 shrink-0 pb-4 md:pb-6 bg-transparent">
            {/* Indicator Row: 06 / 12 on left, Sound on right */}
            <div className="w-full flex items-center justify-between px-6 md:px-12 mb-2 sm:mb-2.5">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#1E2621] uppercase font-semibold">
                  06 / 12
                </span>
                <span className="w-8 md:w-12 h-[1px] bg-[#1E2621]/30 inline-block" />
              </div>

              <div>
                <button
                  onClick={() => setIsSoundOn((prev) => !prev)}
                  type="button"
                  className="flex items-center space-x-2 font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#1E2621]/70 hover:text-[#1E2621] uppercase transition-colors cursor-pointer"
                >
                  <span className="font-mono tracking-widest text-[#9B8E7D]">
                    {isSoundOn ? '||||' : '....'}
                  </span>
                  <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
                </button>
              </div>
            </div>

            {/* Continuous Edge-to-Edge Filmstrip Track */}
            <div className="w-full overflow-hidden">
              <motion.div
                style={{ x: xLow }}
                className="w-max flex items-center flex-nowrap gap-3 md:gap-4 px-6 md:px-12 will-change-transform"
              >
                {FILMSTRIP_ITEMS.map((item) => {
                  const isActive = activeUnitIdx === item.unitIdx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleThumbnailClick(item.targetRatio)}
                      type="button"
                      className={`group w-44 sm:w-52 md:w-60 h-[88px] md:h-[102px] flex-shrink-0 relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer shadow-md ${
                        isActive
                          ? 'ring-2 ring-[#9B8E7D] border-transparent scale-[1.02] shadow-xl'
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
                      <div className="absolute bottom-2 left-3 z-10 pointer-events-none text-left">
                        <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] uppercase text-[#efe9df] font-medium drop-shadow-sm truncate">
                          {item.tag}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
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
