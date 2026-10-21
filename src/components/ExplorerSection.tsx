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

  // Track scroll position through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end end'],
  });

  // Smooth lerp for buttery 60fps animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  // Top Typography reveal (early entry)
  const headerY = useTransform(smoothProgress, [0, 0.22], [30, 0]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.18], [0, 1]);

  // Expanding Image Frame (Smooth Scroll Zoom)
  // Initial State: Compact centered card frame (w-[42vw] max-w-[560px] h-[48vh] rounded-[24px])
  // Scrolled State: Full cinematic view (w-[92vw] max-w-[1400px] h-[74vh] rounded-[16px])
  const cardWidth = useTransform(smoothProgress, [0.18, 0.75], ['42vw', '92vw']);
  const cardHeight = useTransform(smoothProgress, [0.18, 0.75], ['48vh', '74vh']);
  const cardRadius = useTransform(smoothProgress, [0.18, 0.75], ['24px', '16px']);

  // Parallax subtle zoom on the building image inside
  const imageScale = useTransform(smoothProgress, [0.18, 0.75], [1.12, 1.0]);

  // Overlay CTA Elements reveal when card expands
  const ctaOpacity = useTransform(smoothProgress, [0.45, 0.75], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.45, 0.75], [24, 0]);

  const explorerUrl = siteData?.project?.explorerUrl || 'https://nathia-reserve-explorer.vercel.app';

  return (
    <section
      ref={containerRef}
      id="explorer"
      data-chapter="explorer"
      className="relative w-full min-h-[150vh] bg-[#F4F1EA] text-[#121614] overflow-hidden"
    >
      {/* Pinned Sticky Stage */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-between pt-16 md:pt-20 pb-8 px-6 md:px-12 overflow-hidden z-10">
        {/* Top Typography & Reveal Animation */}
        <motion.div
          style={{
            y: headerY,
            opacity: headerOpacity,
          }}
          className="flex flex-col items-center text-center max-w-4xl z-20 will-change-transform shrink-0"
        >
          {/* Eyebrow Tag */}
          <span className="font-mono text-xs tracking-[0.3em] text-[#121614]/60 uppercase mb-3 sm:mb-4">
            3D — 3D EXPLORER
          </span>

          {/* Main Editorial Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] text-[#1A221C] tracking-tight max-w-3xl mb-3 sm:mb-4 font-normal">
            Tour both towers{' '}
            <span className="font-serif italic font-light">in 360°.</span>
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#121614]/70 font-light tracking-wide text-center max-w-xl">
            Browse studios, apartments and penthouses, and view floor plans
          </p>
        </motion.div>

        {/* Center Expanding Image Frame */}
        <div className="w-full flex items-center justify-center relative my-auto z-10">
          <motion.div
            style={{
              width: cardWidth,
              height: cardHeight,
              borderRadius: cardRadius,
              minWidth: '310px',
              maxWidth: '1400px',
            }}
            className="relative overflow-hidden shadow-2xl border border-[#121614]/10 bg-[#121614]/5 will-change-[width,height,border-radius]"
          >
            {/* High-Resolution Daytime Architectural Facade Render */}
            <motion.div
              style={{ scale: imageScale }}
              className="w-full h-full relative overflow-hidden will-change-transform"
            >
              <img
                src="/img/day-1300-lg.webp"
                alt="The Nathia Reserve Dual Towers 360 Exterior View"
                className="w-full h-full object-cover object-center pointer-events-none select-none"
                loading="eager"
              />
            </motion.div>

            {/* Cinematic Bottom Vignette Scrim for CTA contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none" />

            {/* Overlay CTA Elements (Revealed on Card Expansion) */}
            <motion.div
              style={{
                opacity: ctaOpacity,
                y: ctaY,
              }}
              className="absolute bottom-8 md:bottom-12 inset-x-0 flex flex-col items-center justify-center z-20 px-4 will-change-transform"
            >
              {/* Warm Champagne/Sand Pill Button */}
              <button
                onClick={onOpenExplorer}
                type="button"
                className="group bg-[#d5c3a5] text-[#121614] hover:bg-[#e4d5be] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl inline-flex items-center gap-3 active:scale-95 cursor-pointer"
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

        {/* Persistent Bottom Bar */}
        <div className="w-full flex items-end justify-between pointer-events-none select-none z-20 pt-2 shrink-0">
          {/* Bottom-Left: Chapter index "03 / 12" + slender line */}
          <div className="flex items-center pointer-events-auto">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#121614] uppercase font-medium">
              03 / 12
            </span>
            <span className="w-12 md:w-16 h-[1.5px] bg-[#121614]/30 ml-4 inline-block align-middle" />
          </div>

          {/* Bottom-Right: Audio Indicator */}
          <div className="flex items-center pointer-events-auto ml-auto">
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              type="button"
              className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#121614]/75 hover:text-[#121614] uppercase transition-colors"
            >
              {isMuted ? '.... SOUND OFF' : '.... SOUND ON'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
