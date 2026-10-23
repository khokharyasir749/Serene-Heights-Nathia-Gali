'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import siteData from '@/data/siteData';

interface ExplorerSectionProps {
  onOpenExplorer: () => void;
}

export const ExplorerSection: React.FC<ExplorerSectionProps> = ({ onOpenExplorer }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Track scroll position across the extended 250vh runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Elastic smooth spring for jitter-free 60fps hardware accelerated interpolation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    restDelta: 0.001,
  });

  // Header & Typography transforms: Opacity [1, 1, 0] between [0, 0.25, 0.45], Y [0, 0, -40]
  const headerOpacity = useTransform(smoothProgress, [0, 0.25, 0.45], [1, 1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.25, 0.45], [0, 0, -40]);

  // Left Side Card: Opacity [1, 1, 0] between [0, 0.2, 0.4], X [0, 0, -80]
  const leftCardOpacity = useTransform(smoothProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const leftCardX = useTransform(smoothProgress, [0, 0.2, 0.4], [0, 0, -80]);

  // Right Side Card: Opacity [1, 1, 0] between [0, 0.2, 0.4], X [0, 0, 80]
  const rightCardOpacity = useTransform(smoothProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const rightCardX = useTransform(smoothProgress, [0, 0.2, 0.4], [0, 0, 80]);

  // Vertical placement: shifts cards & image down to give plenty of clearance from the header subtitle
  const cardY = useTransform(smoothProgress, [0, 0.2, 0.75, 1], [36, 36, 0, 0]);
  const sideCardY = useTransform(smoothProgress, [0, 0.2, 0.4], [36, 36, 36]);

  // Center Image Container Expansion:
  // Decreased initial height to 340px (desktop) / 310px (mobile) to prevent any overlap with top text
  const initialWidth = windowSize.width >= 1024 ? 540 : Math.min(460, windowSize.width * 0.92);
  const initialHeight = windowSize.width >= 1024 ? 340 : 310;

  const cardWidth = useTransform(
    smoothProgress,
    [0, 0.2, 0.75, 1],
    [initialWidth, initialWidth, windowSize.width, windowSize.width]
  );
  const cardHeight = useTransform(
    smoothProgress,
    [0, 0.2, 0.75, 1],
    [initialHeight, initialHeight, windowSize.height, windowSize.height]
  );
  const cardRadius = useTransform(
    smoothProgress,
    [0, 0.2, 0.75, 1],
    [16, 16, 0, 0]
  );

  // Parallax subtle zoom on image inside
  const imageScale = useTransform(smoothProgress, [0.2, 0.75], [1.12, 1.0]);

  // CTA Button: Opacity [0, 0, 1] between [0.6, 0.75, 1]
  const ctaOpacity = useTransform(smoothProgress, [0.6, 0.75, 1], [0, 1, 1]);
  const ctaY = useTransform(smoothProgress, [0.6, 0.75, 1], [30, 0, 0]);
  const ctaScale = useTransform(smoothProgress, [0.6, 0.75, 1], [0.92, 1, 1]);

  // Bottom indicator colors adaptation: transitions from dark (#1C1917) to light (#efe9df) as image expands
  const indicatorColor = useTransform(smoothProgress, [0.20, 0.55], ['#1C1917', '#efe9df']);
  const indicatorLineBg = useTransform(
    smoothProgress,
    [0.20, 0.55],
    ['rgba(28,25,23,0.3)', 'rgba(239,233,223,0.4)']
  );
  const soundColor = useTransform(
    smoothProgress,
    [0.20, 0.55],
    ['rgba(28,25,23,0.75)', 'rgba(239,233,223,0.75)']
  );

  const explorerUrl = siteData?.project?.explorerUrl || 'https://nathia-reserve-explorer.vercel.app';

  return (
    <section
      ref={containerRef}
      id="explorer"
      data-chapter="explorer"
      className="relative w-full h-[250vh] bg-[#F4F1EA] text-[#1C1917] z-20"
    >
      {/* Sticky Fullscreen Stage: Pinned 100vh viewport matching top section's warm parchment background */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center relative bg-[#F4F1EA]">
        
        {/* Top Header & Typography with safe headroom */}
        <motion.div
          style={{
            opacity: headerOpacity,
            y: headerY,
          }}
          className="absolute top-6 sm:top-8 md:top-10 inset-x-0 mx-auto flex flex-col items-center text-center px-4 z-30 pointer-events-none will-change-transform max-w-4xl"
        >
          {/* Eyebrow Tag */}
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.3em] text-[#8C7E6A] uppercase mb-1.5 block">
            3D — 3D EXPLORER
          </span>

          {/* Main Editorial Headline */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1C1917] tracking-tight mb-2 font-normal leading-tight">
            Tour all three towers{' '}
            <span className="font-serif italic font-light text-[#8C7E6A]">in 360°.</span>
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm text-[#1C1917]/70 font-light tracking-wide text-center max-w-xl mx-auto">
            Browse studios, apartments and penthouses, and view floor plans
          </p>
        </motion.div>

        {/* Center Expanding Image Frame */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
          <motion.div
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: cardRadius,
              y: cardY,
            }}
            className="relative flex items-center justify-center overflow-hidden z-10 will-change-[width,height,border-radius] shadow-2xl pointer-events-auto bg-[#1C1917]"
          >
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full relative overflow-hidden will-change-transform"
            >
              <img
                src="/pictures/home/Snowy Mountain Resort Among Pines.png"
                alt="Serene Heights Nathia Gali 3D Architectural View"
                className="w-full h-full object-cover object-center pointer-events-none select-none"
                loading="eager"
              />
            </motion.div>

            {/* Dark luxury bottom vignette for CTA contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* Side Editorial Cards (Flanking the Center Card) */}
        <div className="absolute inset-0 z-20 flex items-center justify-between px-6 sm:px-10 lg:px-14 pointer-events-none max-w-7xl mx-auto">
          {/* Left Side Card: 01 / Regional Masterpiece */}
          <motion.div
            style={{
              opacity: leftCardOpacity,
              x: leftCardX,
              y: sideCardY,
            }}
            className="hidden lg:flex w-[270px] lg:w-[290px] h-[310px] lg:h-[340px] shrink-0 p-5 lg:p-6 flex-col justify-between pointer-events-auto bg-[#1C1D1A]/95 backdrop-blur-md border border-[#C5A880]/25 rounded-md shadow-2xl"
          >
            <div className="flex flex-col h-full justify-between">
              {/* Top Content */}
              <div>
                <span className="text-[#C5A880] text-[10px] tracking-[0.25em] uppercase font-semibold mb-2 block">
                  01 / REGIONAL MASTERPIECE
                </span>
                <h3 className="text-[#FDFBF7] font-serif text-xl lg:text-2xl tracking-tight mb-2.5 font-normal leading-snug">
                  Premier Winter Resort
                </h3>
                <p className="text-[#C7C3B8] text-xs lg:text-[13px] leading-relaxed font-light">
                  Designed for year-round mountain alpine living, featuring Pakistan&apos;s premier dedicated ski slopes, winter sports access, and panoramic Himalayan pine ridges.
                </p>
              </div>

              {/* Footer Metric */}
              <div className="border-t border-[#C5A880]/20 pt-2.5 flex items-center justify-between text-xs font-mono text-[#8C867A] w-full">
                <span className="tracking-[0.2em] uppercase text-[10px]">
                  MASTERPLAN
                </span>
                <span className="text-[#FDFBF7] font-medium whitespace-nowrap">
                  30+ Kanals · 3 Towers
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side Card: 02 / Alpine Amenities */}
          <motion.div
            style={{
              opacity: rightCardOpacity,
              x: rightCardX,
              y: sideCardY,
            }}
            className="hidden lg:flex w-[270px] lg:w-[290px] h-[310px] lg:h-[340px] shrink-0 p-5 lg:p-6 flex-col justify-between pointer-events-auto bg-[#1C1D1A]/95 backdrop-blur-md border border-[#C5A880]/25 rounded-md shadow-2xl"
          >
            <div className="flex flex-col h-full justify-between">
              {/* Top Content */}
              <div>
                <span className="text-[#C5A880] text-[10px] tracking-[0.25em] uppercase font-semibold mb-2 block">
                  02 / ALPINE AMENITIES
                </span>
                <h3 className="text-[#FDFBF7] font-serif text-xl lg:text-2xl tracking-tight mb-2.5 font-normal leading-snug">
                  Four-Season Comforts
                </h3>
                <div className="flex flex-col">
                  <div className="py-1.5 border-b border-[#C5A880]/15 flex items-center gap-2.5 text-xs lg:text-[12.5px] text-[#C7C3B8] font-light">
                    <span className="text-[#C5A880] font-mono text-xs font-semibold shrink-0">01</span>
                    <span>Italian Central Heating &amp; Underfloor Warmth</span>
                  </div>
                  <div className="py-1.5 border-b border-[#C5A880]/15 flex items-center gap-2.5 text-xs lg:text-[12.5px] text-[#C7C3B8] font-light">
                    <span className="text-[#C5A880] font-mono text-xs font-semibold shrink-0">02</span>
                    <span>Heated Infinity Pool &amp; Hydrotherapy Spa</span>
                  </div>
                  <div className="py-1.5 border-b border-[#C5A880]/15 flex items-center gap-2.5 text-xs lg:text-[12.5px] text-[#C7C3B8] font-light">
                    <span className="text-[#C5A880] font-mono text-xs font-semibold shrink-0">03</span>
                    <span>Ski-in / Ski-out Lounge &amp; Heated Lockers</span>
                  </div>
                </div>
              </div>

              {/* Footer Altitude Metric */}
              <div className="border-t border-[#C5A880]/20 pt-2.5 flex items-center justify-between text-xs font-mono text-[#8C867A] w-full">
                <span className="tracking-[0.2em] uppercase text-[10px]">
                  PEAK ELEVATION
                </span>
                <span className="text-[#FDFBF7] font-medium whitespace-nowrap">
                  7,906 FT
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating CTA Button (Revealed after expansion [0.6 -> 0.75 -> 1.0]) */}
        <motion.div
          style={{
            opacity: ctaOpacity,
            scale: ctaScale,
            y: ctaY,
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center px-4 w-full max-w-sm pointer-events-auto"
        >
          {/* Sand/Champagne Pill CTA Button */}
          <button
            onClick={onOpenExplorer}
            type="button"
            className="group bg-[#d5c3a5] text-[#121614] hover:bg-[#e4d5be] px-8 py-4 rounded-full font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] inline-flex items-center gap-3 active:scale-95 cursor-pointer"
          >
            <span>ENTER THE EXPLORER</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 font-mono">
              →
            </span>
          </button>

          {/* Helper Text Link */}
          <a
            href={explorerUrl}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-mono text-[10px] tracking-[0.25em] text-[#efe9df]/85 hover:text-[#efe9df] uppercase mt-2.5 text-center drop-shadow transition-colors block"
          >
            OPEN IN A NEW TAB
          </a>
        </motion.div>

        {/* Persistent Bottom Bar Indicators (03/12 & Sound Toggle) */}
        <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-8 md:px-16 flex items-end justify-between pointer-events-none select-none z-30">
          {/* Bottom-Left: Chapter index "03 / 12" + slender line */}
          <div className="flex items-center pointer-events-auto">
            <motion.span
              style={{ color: indicatorColor }}
              className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-medium transition-colors"
            >
              03 / 12
            </motion.span>
            <motion.span
              style={{ backgroundColor: indicatorLineBg }}
              className="w-12 md:w-16 h-[1.5px] ml-4 inline-block align-middle transition-colors"
            />
          </div>

          {/* Bottom-Right: Audio Indicator */}
          <div className="flex items-center pointer-events-auto ml-auto">
            <motion.button
              style={{ color: soundColor }}
              onClick={() => setIsMuted((prev) => !prev)}
              type="button"
              className="font-mono text-[10px] md:text-xs tracking-[0.25em] hover:opacity-100 uppercase transition-colors"
            >
              {isMuted ? '.... SOUND OFF' : '.... SOUND ON'}
            </motion.button>
          </div>
        </div>

      </div>
    </section>
  );
};
