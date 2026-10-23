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

  // Track scroll position across the extended 280vh runway
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

  // Top Typography: holds firmly at start, then smoothly fades out as card expands [0.20 -> 0.48]
  const headerY = useTransform(smoothProgress, [0, 0.20, 0.48], [0, 0, -25]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.20, 0.45], [1, 1, 0]);

  // Side Editorial Columns: visible initially framing the center 3D card, fade & slide out [0.18 -> 0.45]
  const sideDetailsOpacity = useTransform(smoothProgress, [0, 0.18, 0.45], [1, 1, 0]);
  const sideLeftX = useTransform(smoothProgress, [0.15, 0.45], [0, -30]);
  const sideRightX = useTransform(smoothProgress, [0.15, 0.45], [0, 30]);

  // Seamless Zero-Margin Fullscreen Expansion:
  // - [0.15 -> 0.65]: Smooth expansion from compact framed card to full edge-to-edge (100vw, 100vh, 0px)
  // - [0.65 -> 0.95]: HOLD/LOCK PHASE at 100vw, 100vh, 0px border-radius
  const initialWidth = windowSize.width >= 1024 ? 460 : Math.min(420, windowSize.width * 0.92);
  const initialHeight = windowSize.width >= 1024 ? 360 : 340;

  const cardWidth = useTransform(smoothProgress, [0.15, 0.65], [initialWidth, windowSize.width]);
  const cardHeight = useTransform(smoothProgress, [0.15, 0.65], [initialHeight, windowSize.height]);
  const cardRadius = useTransform(smoothProgress, [0.15, 0.65], [8, 0]);

  // Parallax subtle camera zoom on the building image inside
  const imageScale = useTransform(smoothProgress, [0.15, 0.65], [1.12, 1.0]);

  // Overlay CTA Elements reveal as card expands [0.35 -> 0.60], then hold firmly through [0.60 -> 1.0]
  const ctaOpacity = useTransform(smoothProgress, [0.35, 0.60], [0, 1]);
  const ctaScale = useTransform(smoothProgress, [0.35, 0.60], [0.94, 1.0]);
  const ctaY = useTransform(smoothProgress, [0.35, 0.60], [24, 0]);

  // Persistent Controls adaptation: Crossfade colors as image takes over ivory background [0.20 -> 0.55]
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
      className="relative w-full h-[280vh] bg-[#F5F2EB] text-[#1C1917] z-20"
    >
      {/* Sticky Fullscreen Stage: Warm parchment background with zero-margin expansion capability */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center relative bg-[#F5F2EB]">
        
        {/* Top Typography & Reveal Animation */}
        <motion.div
          style={{
            y: headerY,
            opacity: headerOpacity,
          }}
          className="relative z-20 mb-6 text-center px-4 pointer-events-none will-change-transform max-w-3xl"
        >
          {/* Eyebrow Tag */}
          <span className="font-mono text-xs tracking-[0.3em] text-[#8C7E6A] uppercase mb-1.5 block">
            3D — 3D EXPLORER
          </span>

          {/* Main Editorial Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1C1917] tracking-tight max-w-3xl mb-1.5 font-normal leading-tight">
            Tour all three towers{' '}
            <span className="font-serif italic font-light text-[#8C7E6A]">in 360°.</span>
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#1C1917]/70 font-light tracking-wide text-center max-w-xl mx-auto">
            Browse studios, apartments and penthouses, and view floor plans
          </p>
        </motion.div>

        {/* =========================================================================
            ALIGNED 3-ITEM ROW: [LEFT CARD] - [CENTER IMAGE] - [RIGHT CARD]
        ========================================================================== */}
        <div className="flex flex-row items-stretch justify-center gap-4 lg:gap-6 w-full max-w-6xl mx-auto px-4 relative z-20">
          
          {/* Left Side Card: 01 / Regional Masterpiece */}
          <motion.div
            style={{
              opacity: sideDetailsOpacity,
              x: sideLeftX,
            }}
            className="hidden lg:flex w-[260px] lg:w-[280px] h-[340px] lg:h-[360px] shrink-0 p-5 flex-col justify-between pointer-events-auto bg-[#1C1D1A]/95 backdrop-blur-md border border-[#C5A880]/25 rounded-md shadow-xl relative z-10"
          >
            <div className="flex flex-col h-full justify-between">
              {/* Top Content */}
              <div>
                <span className="text-[#C5A880] text-[9px] tracking-[0.25em] uppercase font-semibold mb-1 block">
                  01 / REGIONAL MASTERPIECE
                </span>
                <h3 className="text-[#FDFBF7] font-serif text-lg lg:text-xl font-medium mb-2 leading-snug">
                  Premier Winter Resort
                </h3>
                <p className="text-[#C7C3B8] text-[11px] leading-relaxed font-light">
                  Designed for year-round mountain alpine living, featuring Pakistan&apos;s premier dedicated ski slopes, winter sports access, and panoramic Himalayan pine ridges.
                </p>
              </div>

              {/* Footer Metric */}
              <div className="border-t border-[#C5A880]/20 pt-2 flex items-center justify-between text-[10px] font-mono text-[#8C867A] w-full">
                <span className="tracking-[0.2em] uppercase">
                  MASTERPLAN
                </span>
                <span className="text-[#FDFBF7] font-medium whitespace-nowrap">
                  30+ Kanals · 3 Towers
                </span>
              </div>
            </div>
          </motion.div>

          {/* Center Expanding Image Frame: Smooth Zero-Margin Fullscreen Expansion */}
          <motion.div
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: cardRadius,
            }}
            className="relative flex items-center justify-center overflow-hidden z-20 will-change-[width,height,border-radius] shadow-lg pointer-events-auto bg-[#1C1917] w-[420px] lg:w-[460px] h-[340px] lg:h-[360px] shrink-0 rounded-lg"
          >
            {/* High-Resolution Architectural Facade Render */}
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full relative overflow-hidden will-change-transform"
            >
              <img
                src="/pictures/home/Snowy Mountain Resort Among Pines.png"
                alt="Serene Heights Nathia Gali 3D Architectural View"
                className="w-full h-full object-cover pointer-events-none select-none"
                loading="eager"
              />
            </motion.div>

            {/* Subtle dark bottom-up shadow overlay for extreme legibility of CTAs */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Overlay CTA Elements (Revealed at Peak Fullscreen Progress) */}
            <motion.div
              style={{
                opacity: ctaOpacity,
                scale: ctaScale,
                y: ctaY,
              }}
              className="absolute bottom-12 md:bottom-16 inset-x-0 flex flex-col items-center justify-center z-20 px-4 will-change-transform"
            >
              {/* Sand/Champagne Pill CTA Button */}
              <button
                onClick={onOpenExplorer}
                type="button"
                className="group bg-[#d5c3a5] text-[#121614] hover:bg-[#e4d5be] px-8 py-4 rounded-full font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl inline-flex items-center gap-3 active:scale-95 cursor-pointer"
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
          </motion.div>

          {/* Right Side Card: 02 / Alpine Amenities */}
          <motion.div
            style={{
              opacity: sideDetailsOpacity,
              x: sideRightX,
            }}
            className="hidden lg:flex w-[260px] lg:w-[280px] h-[340px] lg:h-[360px] shrink-0 p-5 flex-col justify-between pointer-events-auto bg-[#1C1D1A]/95 backdrop-blur-md border border-[#C5A880]/25 rounded-md shadow-xl relative z-10"
          >
            <div className="flex flex-col h-full justify-between">
              {/* Top Content */}
              <div>
                <span className="text-[#C5A880] text-[9px] tracking-[0.25em] uppercase font-semibold mb-1 block">
                  02 / ALPINE AMENITIES
                </span>
                <h3 className="text-[#FDFBF7] font-serif text-lg lg:text-xl font-medium mb-2 leading-snug">
                  Four-Season Comforts
                </h3>
                <div className="flex flex-col">
                  <div className="py-1 border-b border-[#C5A880]/15 flex items-center gap-2 text-[#C7C3B8] text-[11px] leading-relaxed font-light">
                    <span className="text-[#C5A880] font-mono text-[10px] font-semibold shrink-0">01</span>
                    <span>Italian Central Heating &amp; Underfloor Warmth</span>
                  </div>
                  <div className="py-1 border-b border-[#C5A880]/15 flex items-center gap-2 text-[#C7C3B8] text-[11px] leading-relaxed font-light">
                    <span className="text-[#C5A880] font-mono text-[10px] font-semibold shrink-0">02</span>
                    <span>Heated Infinity Pool &amp; Hydrotherapy Spa</span>
                  </div>
                  <div className="py-1 border-b border-[#C5A880]/15 flex items-center gap-2 text-[#C7C3B8] text-[11px] leading-relaxed font-light">
                    <span className="text-[#C5A880] font-mono text-[10px] font-semibold shrink-0">03</span>
                    <span>Ski-in / Ski-out Lounge &amp; Heated Lockers</span>
                  </div>
                </div>
              </div>

              {/* Footer Altitude Metric */}
              <div className="border-t border-[#C5A880]/20 pt-2 flex items-center justify-between text-[10px] font-mono text-[#8C867A] w-full">
                <span className="tracking-[0.2em] uppercase">
                  PEAK ELEVATION
                </span>
                <span className="text-[#FDFBF7] font-medium whitespace-nowrap">
                  7,906 FT
                </span>
              </div>
            </div>
          </motion.div>

        </div>

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
