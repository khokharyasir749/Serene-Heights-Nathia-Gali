'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import siteData from '@/data/siteData';

interface ExplorerSectionProps {
  onOpenExplorer: () => void;
}

export const ExplorerSection: React.FC<ExplorerSectionProps> = ({ onOpenExplorer }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);

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

  // Top Typography: reveal early [0.0 -> 0.15], hold, then smoothly fade out [0.25 -> 0.50]
  const headerY = useTransform(smoothProgress, [0, 0.15, 0.25, 0.50], [24, 0, 0, -30]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.12, 0.25, 0.48], [0, 1, 1, 0]);

  // Seamless Zero-Margin Fullscreen Expansion:
  // - [0.15 -> 0.65]: Smooth expansion from compact card (42vw, 48vh, 24px) to full edge-to-edge (100vw, 100vh, 0px)
  // - [0.65 -> 0.95]: HOLD/LOCK PHASE at 100vw, 100vh, 0px border-radius
  const cardWidth = useTransform(smoothProgress, [0.15, 0.65], ['42vw', '100vw']);
  const cardHeight = useTransform(smoothProgress, [0.15, 0.65], ['48vh', '100vh']);
  const cardRadius = useTransform(smoothProgress, [0.15, 0.65], ['24px', '0px']);

  // Parallax subtle camera zoom on the building image inside
  const imageScale = useTransform(smoothProgress, [0.15, 0.65], [1.12, 1.0]);

  // Overlay CTA Elements reveal as card expands [0.35 -> 0.60], then hold firmly through [0.60 -> 1.0]
  const ctaOpacity = useTransform(smoothProgress, [0.35, 0.60], [0, 1]);
  const ctaScale = useTransform(smoothProgress, [0.35, 0.60], [0.94, 1.0]);
  const ctaY = useTransform(smoothProgress, [0.35, 0.60], [24, 0]);

  // Persistent Controls adaptation: Crossfade colors as image takes over ivory background [0.20 -> 0.55]
  const indicatorColor = useTransform(smoothProgress, [0.20, 0.55], ['#121614', '#efe9df']);
  const indicatorLineBg = useTransform(
    smoothProgress,
    [0.20, 0.55],
    ['rgba(18,22,20,0.3)', 'rgba(239,233,223,0.4)']
  );
  const soundColor = useTransform(
    smoothProgress,
    [0.20, 0.55],
    ['rgba(18,22,20,0.75)', 'rgba(239,233,223,0.75)']
  );

  const explorerUrl = siteData?.project?.explorerUrl || 'https://nathia-reserve-explorer.vercel.app';

  return (
    <section
      ref={containerRef}
      id="explorer"
      data-chapter="explorer"
      className="relative w-full h-[280vh] bg-[#F4F1EA] text-[#121614] z-20"
    >
      {/* Sticky Fullscreen Stage: Zero padding, absolute edge-to-edge */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center relative">
        {/* Top Typography & Reveal Animation */}
        <motion.div
          style={{
            y: headerY,
            opacity: headerOpacity,
          }}
          className="absolute top-16 sm:top-20 md:top-24 inset-x-0 mx-auto flex flex-col items-center text-center px-6 z-20 pointer-events-none will-change-transform max-w-4xl"
        >
          {/* Eyebrow Tag */}
          <span className="font-mono text-xs tracking-[0.3em] text-[#121614]/60 uppercase mb-3">
            3D — 3D EXPLORER
          </span>

          {/* Main Editorial Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] text-[#1A221C] tracking-tight max-w-3xl mb-3 font-normal">
            Tour all three towers{' '}
            <span className="font-serif italic font-light">in 360°.</span>
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#121614]/70 font-light tracking-wide text-center max-w-xl">
            Browse studios, apartments and penthouses, and view floor plans
          </p>
        </motion.div>

        {/* Expanding Image Frame: Smooth Zero-Margin Fullscreen Expansion */}
        <motion.div
          style={{
            width: cardWidth,
            height: cardHeight,
            borderRadius: cardRadius,
            minWidth: 'min(320px, 92vw)',
          }}
          className="relative flex items-center justify-center overflow-hidden z-10 will-change-[width,height,border-radius] shadow-2xl"
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
