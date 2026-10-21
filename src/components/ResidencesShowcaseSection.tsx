'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Compass, ArrowRight, ShieldCheck, Check } from 'lucide-react';
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
  secondaryImage?: string;
  targetRatio: number;
}

const RESIDENCES: ResidenceUnit[] = [
  {
    id: 'studio',
    watermark: '01',
    category: '01 / 05 · FOREST STUDIOS',
    title: 'Studio',
    subtitle: 'Intimate spaces opening straight into the pine canopy.',
    residencesCount: 12,
    area: '390 to 416 SQ FT',
    priceOrStatus: 'Sold out',
    isSoldOut: true,
    caption: 'A single, efficient mountain room; the entry into the Reserve.',
    primaryImage: '/img/res-studio-lg.webp',
    targetRatio: 0.04,
  },
  {
    id: '1-bedroom',
    watermark: '02',
    category: '02 / 05 · PINEWOOD SUITES',
    title: '1 Bedroom',
    subtitle: 'Framed valley views: the heart of the Reserve.',
    residencesCount: 74,
    area: '607 to 1,170 SQ FT',
    priceOrStatus: 'From 3.9 PKR Crore',
    isSoldOut: false,
    caption: 'The core of the building, and the most flexible to let.',
    primaryImage: '/img/int-1bed-living-lg.webp',
    secondaryImage: '/img/int-1bed-fireplace-lg.webp',
    targetRatio: 0.26,
  },
  {
    id: '2-bedroom',
    watermark: '03',
    category: '03 / 05 · CEDAR RESIDENCES',
    title: '2 Bedroom',
    subtitle: 'For the families who summer, and now winter, in the hills.',
    residencesCount: 27,
    area: '1,056 to 2,305 SQ FT',
    priceOrStatus: 'From 7.1 PKR Crore',
    isSoldOut: false,
    caption: 'Family scale residences with dual aspect on most floors.',
    primaryImage: '/img/res-2bed-lg.webp',
    secondaryImage: '/img/int-2bed-lg.webp',
    targetRatio: 0.5,
  },
  {
    id: '3-bedroom',
    watermark: '04',
    category: '04 / 05 · SUMMIT RESIDENCES',
    title: '3 Bedroom',
    subtitle: 'The widest valley frontage in the Reserve.',
    residencesCount: 12,
    area: '1,856 to 2,189 SQ FT',
    priceOrStatus: 'From 12.5 PKR Crore',
    isSoldOut: false,
    caption: 'The deepest plates in the building.',
    primaryImage: '/img/int-3bed-lg.webp',
    targetRatio: 0.74,
  },
  {
    id: 'penthouse',
    watermark: '05',
    category: '05 / 05 · SKY PENTHOUSES',
    title: 'Penthouse',
    subtitle: 'A private plunge pool, high above the pines.',
    residencesCount: 8,
    area: '2,291 to 3,714 SQ FT',
    priceOrStatus: 'From 20 PKR Crore',
    isSoldOut: false,
    caption:
      'Each carries its own heated terrace pool, held over the valley: the highest private residences in the Galiyat.',
    primaryImage: '/img/res-pent-living-lg.webp',
    secondaryImage: '/img/plunge-lg.webp',
    targetRatio: 0.95,
  },
];

interface ResidencesShowcaseSectionProps {
  onOpenExplorer: () => void;
}

export const ResidencesShowcaseSection: React.FC<ResidencesShowcaseSectionProps> = ({
  onOpenExplorer,
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [modalResName, setModalResName] = useState<string | null>(null);
  const [activeUnitIdx, setActiveUnitIdx] = useState(0);

  // Track scroll position through the 600vh runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Inertial spring for buttery smooth horizontal glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 26,
    mass: 0.6,
    restDelta: 0.0005,
  });

  // Translate horizontal track from 0% to -78%
  const trackX = useTransform(smoothProgress, [0, 1], ['0%', '-78%']);

  // Sync active unit index for bottom filmstrip highlight
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    let idx = 0;
    if (latest >= 0.85) idx = 4;
    else if (latest >= 0.62) idx = 3;
    else if (latest >= 0.38) idx = 2;
    else if (latest >= 0.15) idx = 1;

    if (idx !== activeUnitIdx) {
      setActiveUnitIdx(idx);
    }
  });

  // Jump to specific residence horizontal offset on thumbnail click
  const handleUnitClick = (targetRatio: number) => {
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

  return (
    <>
      <section
        ref={containerRef}
        id="residences"
        data-chapter="residences"
        className="relative w-full min-h-[600vh] h-[600vh] bg-[#f6f3ee] text-[#1a211e] select-none z-10"
      >
        {/* Sticky Viewport Stage */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between py-6 md:py-8 z-10">
          {/* ================= TOP BAR (Beneath Fixed Brand Header) ================= */}
          <div className="w-full px-8 md:px-16 pt-24 md:pt-28 flex justify-between items-center z-20 shrink-0">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs tracking-[0.25em] text-[#1a211e]/70 uppercase">
                06
              </span>
              <span className="w-8 h-[1px] bg-[#1a211e]/30 inline-block" />
              <span className="font-mono text-xs tracking-[0.3em] text-[#1a211e]/85 uppercase font-medium">
                THE RESIDENCES
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#1a211e]/60 tracking-wider">
              <span>SCROLL HORIZONTALLY</span>
              <span className="w-6 h-[1px] bg-[#1a211e]/30 inline-block" />
            </div>
          </div>

          {/* ================= HORIZONTAL SCROLL TRACK ================= */}
          <div className="relative w-full flex items-center overflow-hidden my-auto py-2">
            <motion.div
              style={{ x: trackX }}
              className="flex items-center pl-8 md:pl-16 will-change-transform"
            >
              {RESIDENCES.map((res, idx) => {
                return (
                  <div
                    key={res.id}
                    className="relative w-[88vw] sm:w-[82vw] md:w-[76vw] lg:w-[70vw] shrink-0 h-[64vh] sm:h-[66vh] md:h-[68vh] rounded-3xl bg-[#efebe4] border border-[#e2dcd2] shadow-xl overflow-hidden mr-6 md:mr-10 flex flex-col justify-between p-7 sm:p-9 md:p-11"
                  >
                    {/* Giant Watermark Numeral Floating in Background */}
                    <span className="absolute right-6 md:right-10 top-2 font-serif text-[20vw] sm:text-[16vw] md:text-[13vw] font-light text-[#1a211e]/[0.05] select-none pointer-events-none leading-none z-0">
                      {res.watermark}
                    </span>

                    {/* Card Content Grid */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 h-full items-center">
                      {/* Left Column: Specs, Editorial & CTAs */}
                      <div className="lg:col-span-6 flex flex-col justify-between h-full py-1">
                        <div>
                          {/* Category Tag */}
                          <div className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#8c6b4b] uppercase font-semibold mb-2">
                            {res.category}
                          </div>

                          {/* Unit Title */}
                          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1a211e] font-normal leading-[1.05] tracking-tight">
                            {res.title}
                          </h2>

                          {/* Subtitle */}
                          <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#1a211e]/75 mt-2 font-light leading-snug">
                            {res.subtitle}
                          </p>

                          {/* 3-Column Specifications Box */}
                          <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 sm:py-5 my-4 sm:my-5 border-y border-[#1a211e]/15">
                            <div>
                              <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-[#1a211e]/55 uppercase">
                                RESIDENCES
                              </span>
                              <span className="font-serif text-xl sm:text-2xl text-[#1a211e] font-normal mt-0.5 block">
                                {res.residencesCount}
                              </span>
                            </div>
                            <div>
                              <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-[#1a211e]/55 uppercase">
                                AREA
                              </span>
                              <span className="font-mono text-xs sm:text-sm text-[#1a211e] font-medium mt-1 block">
                                {res.area}
                              </span>
                            </div>
                            <div>
                              <span className="block font-mono text-[9px] sm:text-[10px] tracking-wider text-[#1a211e]/55 uppercase">
                                AVAILABILITY
                              </span>
                              {res.isSoldOut ? (
                                <span className="inline-block mt-1 font-mono text-xs text-red-700 font-semibold uppercase tracking-wider">
                                  Sold out
                                </span>
                              ) : (
                                <span className="font-mono text-xs sm:text-sm text-[#8c6b4b] font-semibold mt-1 block">
                                  {res.priceOrStatus}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Editorial Caption */}
                          <p className="font-sans text-xs sm:text-sm text-[#1a211e]/70 font-light leading-relaxed max-w-md">
                            {res.caption}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 mt-auto">
                          {!res.isSoldOut && (
                            <button
                              onClick={() => setModalResName(res.title)}
                              type="button"
                              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#1a211e] text-[#f6f3ee] hover:bg-[#2e3b35] font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium transition-all shadow-md active:scale-95 flex items-center space-x-2"
                            >
                              <span>REQUEST THE FLOOR PLATE</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={onOpenExplorer}
                            type="button"
                            className="inline-flex items-center space-x-1.5 font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#1a211e]/70 hover:text-[#1a211e] py-2 px-3 rounded-full hover:bg-black/5 transition-colors"
                          >
                            <Compass className="w-4 h-4 text-[#8c6b4b]" />
                            <span>EXPLORE IN 3D</span>
                          </button>
                        </div>
                      </div>

                      {/* Right Column: Architectural Photography / Render */}
                      <div className="lg:col-span-6 h-full flex flex-col justify-center">
                        <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-2xl overflow-hidden border border-[#d8d0c4] shadow-md group">
                          <img
                            src={res.primaryImage}
                            alt={`${res.title} - The Nathia Reserve`}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                          {/* Sold Out Overlay Badge if applicable */}
                          {res.isSoldOut && (
                            <div className="absolute top-4 right-4 bg-red-900/90 border border-red-700/60 text-white font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg">
                              SOLD OUT
                            </div>
                          )}

                          {/* Secondary Mini-View Inset if available */}
                          {res.secondaryImage && (
                            <div className="hidden sm:block absolute bottom-3 right-3 w-28 h-20 rounded-xl overflow-hidden border-2 border-white/80 shadow-xl group-hover:scale-105 transition-transform duration-300">
                              <img
                                src={res.secondaryImage}
                                alt={`${res.title} detail`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* ================= BOTTOM PERSISTENT FILMSTRIP & CONTROLS ================= */}
          <div className="w-full px-8 md:px-16 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20 shrink-0">
            {/* Bottom-Left: Chapter index */}
            <div className="flex items-center">
              <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#1a211e] uppercase font-medium">
                06 / 12
              </span>
              <span className="w-12 md:w-16 h-[1.5px] bg-[#1a211e]/30 ml-4 inline-block align-middle" />
            </div>

            {/* Bottom-Center: Interactive Filmstrip Units Selector */}
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto no-scrollbar py-1">
              {RESIDENCES.map((r, idx) => {
                const isActive = activeUnitIdx === idx;
                return (
                  <button
                    key={r.id}
                    onClick={() => handleUnitClick(r.targetRatio)}
                    type="button"
                    className={`px-3 sm:px-4 py-1.5 rounded-full font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center space-x-1.5 ${
                      isActive
                        ? 'bg-[#1a211e] text-[#f6f3ee] shadow-md font-medium scale-105'
                        : 'bg-[#efebe4] text-[#1a211e]/60 hover:text-[#1a211e] hover:bg-[#e6e1d7] border border-[#e2dcd2]'
                    }`}
                  >
                    <span>{r.title}</span>
                    {r.isSoldOut ? (
                      <span className="text-[8px] opacity-75 font-mono">· Sold</span>
                    ) : (
                      <span className="text-[9px] opacity-70">({r.residencesCount})</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom-Right: Audio Indicator */}
            <div className="flex items-center ml-auto sm:ml-0">
              <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#1a211e]/60 uppercase">
                .... SOUND OFF
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plate Lead Intake Modal */}
      <FloorPlateModal
        isOpen={!!modalResName}
        residenceName={modalResName || ''}
        onClose={() => setModalResName(null)}
      />
    </>
  );
};
