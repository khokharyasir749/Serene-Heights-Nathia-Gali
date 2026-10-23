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
  const initialWidth = Math.min(560, windowSize.width * 0.92);
  const initialHeight = Math.min(410, windowSize.height * 0.46);

  const cardWidth = useTransform(smoothProgress, [0.15, 0.65], [initialWidth, windowSize.width]);
  const cardHeight = useTransform(smoothProgress, [0.15, 0.65], [initialHeight, windowSize.height]);
  const cardRadius = useTransform(smoothProgress, [0.15, 0.65], [16, 0]);

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
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center relative bg-[#F5F2EB]">
        
        {/* Top Typography & Reveal Animation */}
        <motion.div
          style={{
            y: headerY,
            opacity: headerOpacity,
          }}
          className="absolute top-10 sm:top-14 md:top-16 inset-x-0 mx-auto flex flex-col items-center text-center px-6 z-30 pointer-events-none will-change-transform max-w-4xl"
        >
          {/* Eyebrow Tag */}
          <span className="font-mono text-xs tracking-[0.3em] text-[#8C7E6A] uppercase mb-2">
            3D — 3D EXPLORER
          </span>

          {/* Main Editorial Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1C1917] tracking-tight max-w-3xl mb-2 font-normal">
            Tour all three towers{' '}
            <span className="font-serif italic font-light text-[#8C7E6A]">in 360°.</span>
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#1C1917]/70 font-light tracking-wide text-center max-w-xl">
            Browse studios, apartments and penthouses, and view floor plans
          </p>
        </motion.div>

        {/* Center Expanding Image Frame: Smooth Zero-Margin Fullscreen Expansion */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
          <motion.div
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: cardRadius,
            }}
            className="relative flex items-center justify-center overflow-hidden z-10 will-change-[width,height,border-radius] shadow-2xl pointer-events-auto bg-[#1C1917]"
          >
            {/* High-Resolution Daytime Architectural Facade Render */}
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full relative overflow-hidden will-change-transform"
            >
              <img
                src="/pictures/home/largestResort.png"
                alt="Serene Heights Nathia Gali 3D Architectural View"
                className="w-full h-full object-cover object-center pointer-events-none select-none"
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
        </div>

        {/* =========================================================================
            3-COLUMN EDITORIAL CALLOUT OVERLAY (FLANKING THE CENTER 3D CARD)
        ========================================================================== */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none px-6 sm:px-10 lg:px-12 pt-16">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side Column: Pakistan's First & Largest Premier Winter Resort */}
            <motion.div
              style={{
                opacity: sideDetailsOpacity,
                x: sideLeftX,
              }}
              className="hidden lg:flex lg:col-span-3 flex-col text-left space-y-4 pointer-events-auto"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C7E6A]" />
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#8C7E6A] uppercase font-semibold">
                  PAKISTAN&apos;S FIRST &amp; LARGEST
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl xl:text-3xl text-[#1C1917] font-normal leading-tight">
                Premier Winter Resort
              </h3>

              {/* Description */}
              <p className="font-sans text-xs xl:text-sm text-[#1C1917]/75 font-light leading-relaxed">
                Designed for year-round mountain alpine living, featuring Pakistan&apos;s premier dedicated ski slopes, winter sports access, and panoramic Himalayan pine ridges.
              </p>

              {/* Metric Badge */}
              <div className="pt-3 border-t border-[#1C1917]/10 flex items-center gap-2">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#1C1917]/90 font-medium">
                  30+ KANALS · 3 TOWERS
                </span>
              </div>
            </motion.div>

            {/* Center Grid Spacer (Phantom placeholder matching center card width) */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center pointer-events-none">
              <div
                style={{ width: initialWidth, height: initialHeight }}
                className="shrink-0 pointer-events-none"
              />
            </div>

            {/* Right Side Column: Alpine Comforts & Four-Season Architecture */}
            <motion.div
              style={{
                opacity: sideDetailsOpacity,
                x: sideRightX,
              }}
              className="hidden lg:flex lg:col-span-3 flex-col text-right items-end space-y-4 pointer-events-auto"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-2 justify-end">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#8C7E6A] uppercase font-semibold">
                  ALPINE COMFORTS &amp; HEATING
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8C7E6A]" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl xl:text-3xl text-[#1C1917] font-normal leading-tight">
                Four-Season Architecture
              </h3>

              {/* Key Amenities */}
              <ul className="space-y-2.5 text-right">
                <li className="font-sans text-[11px] xl:text-xs text-[#1C1917]/80 font-light leading-relaxed flex items-start justify-end gap-2">
                  <span>Italian-engineered central heating &amp; heated flooring throughout.</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C7E6A] mt-1 shrink-0" />
                </li>
                <li className="font-sans text-[11px] xl:text-xs text-[#1C1917]/80 font-light leading-relaxed flex items-start justify-end gap-2">
                  <span>Temperature-controlled infinity pool &amp; thermal hydrotherapy spa.</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C7E6A] mt-1 shrink-0" />
                </li>
                <li className="font-sans text-[11px] xl:text-xs text-[#1C1917]/80 font-light leading-relaxed flex items-start justify-end gap-2">
                  <span>Ski-in / ski-out lounge &amp; heated equipment lockers.</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C7E6A] mt-1 shrink-0" />
                </li>
              </ul>

              {/* Altitude Badge */}
              <div className="pt-3 border-t border-[#1C1917]/10 flex items-center justify-end gap-2">
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#8C7E6A] font-semibold">
                  SUMMIT ELEVATION: 7,906 FT
                </span>
              </div>
            </motion.div>

          </div>
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
