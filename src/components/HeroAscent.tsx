'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';

interface HeroAscentProps {
  onRegisterClick: () => void;
  onAscentRevealChange?: (isRevealed: boolean) => void;
  onThemeChange?: (theme: 'dark' | 'light') => void;
}

export const HeroAscent: React.FC<HeroAscentProps> = ({
  onRegisterClick,
  onAscentRevealChange,
  onThemeChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Direct DOM refs for fixed-width digit slots (eliminates React state thrashing & 60fps stutter)
  const d1Ref = useRef<HTMLSpanElement>(null);
  const commaRef = useRef<HTMLSpanElement>(null);
  const d2Ref = useRef<HTMLSpanElement>(null);
  const d3Ref = useRef<HTMLSpanElement>(null);
  const d4Ref = useRef<HTMLSpanElement>(null);

  const displayedAltRef = useRef<number>(0);
  const targetAltRef = useRef<number>(0);

  const currentVideoTimeRef = useRef<number>(0);
  const targetVideoTimeRef = useRef<number>(0);

  const [isMetadataLoaded, setIsMetadataLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const rafIdRef = useRef<number | null>(null);

  // Responsive dimensions for clip-path frame shrink calculations
  const [dimensions, setDimensions] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const update = () => {
      setDimensions({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Direct DOM update: zero re-render, zero layout recalculation
  const updateCounterDOM = (val: number) => {
    const clamped = Math.min(7906, Math.max(0, Math.round(val)));
    const d1 = Math.floor(clamped / 1000);
    const d2 = Math.floor((clamped % 1000) / 100);
    const d3 = Math.floor((clamped % 100) / 10);
    const d4 = clamped % 10;

    const dim = '0.3';
    const active = '0.95';

    if (d1Ref.current) {
      if (d1Ref.current.textContent !== String(d1)) {
        d1Ref.current.textContent = String(d1);
      }
      const targetOp = clamped >= 1000 ? active : dim;
      if (d1Ref.current.style.opacity !== targetOp) {
        d1Ref.current.style.opacity = targetOp;
      }
    }

    if (commaRef.current) {
      const targetOp = clamped >= 1000 ? active : dim;
      if (commaRef.current.style.opacity !== targetOp) {
        commaRef.current.style.opacity = targetOp;
      }
    }

    if (d2Ref.current) {
      if (d2Ref.current.textContent !== String(d2)) {
        d2Ref.current.textContent = String(d2);
      }
      const targetOp = clamped >= 100 ? active : dim;
      if (d2Ref.current.style.opacity !== targetOp) {
        d2Ref.current.style.opacity = targetOp;
      }
    }

    if (d3Ref.current) {
      if (d3Ref.current.textContent !== String(d3)) {
        d3Ref.current.textContent = String(d3);
      }
      const targetOp = clamped >= 10 ? active : dim;
      if (d3Ref.current.style.opacity !== targetOp) {
        d3Ref.current.style.opacity = targetOp;
      }
    }

    if (d4Ref.current) {
      if (d4Ref.current.textContent !== String(d4)) {
        d4Ref.current.textContent = String(d4);
      }
      if (d4Ref.current.style.opacity !== active) {
        d4Ref.current.style.opacity = active;
      }
    }
  };

  // Toggle video audio
  const toggleSound = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  // Track scroll through the 900vh container (Hero Ascent -> Fullscreen Reveal -> Chapter 02 Card Morph)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll spring with softened config for luxurious cinematic damping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 30,
    restDelta: 0.0001,
  });

  // Listen to video metadata
  const handleLoadedMetadata = () => {
    setIsMetadataLoaded(true);
    const v = videoRef.current as (HTMLVideoElement & { fastSeek?: (time: number) => void }) | null;
    if (v && v.duration) {
      const initialRatio = Math.min(1, Math.max(0, smoothProgress.get() / 0.75));
      const initialTime = initialRatio * v.duration;
      targetVideoTimeRef.current = initialTime;
      currentVideoTimeRef.current = initialTime;
      if (typeof v.fastSeek === 'function') {
        v.fastSeek(initialTime);
      } else {
        v.currentTime = initialTime;
      }
    }
  };

  // High-performance 60FPS unified loop: Video Scrubbing + Counter Lerp
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let lastTheme: 'dark' | 'light' = smoothProgress.get() >= 0.87 ? 'light' : 'dark';
    onAscentRevealChange?.(true);
    onThemeChange?.(lastTheme);

    // Initial counter & video positions at mount
    const initialAltRatio = Math.min(1, Math.max(0, smoothProgress.get() / 0.70));
    targetAltRef.current = initialAltRatio * 7906;
    displayedAltRef.current = targetAltRef.current;
    updateCounterDOM(displayedAltRef.current);

    if (video.duration && !isNaN(video.duration)) {
      const initialScrub = Math.min(1, Math.max(0, smoothProgress.get() / 0.75));
      targetVideoTimeRef.current = initialScrub * video.duration;
      currentVideoTimeRef.current = targetVideoTimeRef.current;
      video.currentTime = targetVideoTimeRef.current;
    }

    let isRunning = true;

    // Single unified 60FPS RAF Loop
    const loop = () => {
      if (!isRunning) return;

      // 1. Fluid Lerp Counter update (interpolates gently between frames)
      const diff = targetAltRef.current - displayedAltRef.current;
      if (Math.abs(diff) > 0.08) {
        displayedAltRef.current += diff * 0.22;
        updateCounterDOM(displayedAltRef.current);
      } else if (displayedAltRef.current !== targetAltRef.current) {
        displayedAltRef.current = targetAltRef.current;
        updateCounterDOM(displayedAltRef.current);
      }

      // 2. Video Scrubbing synchronization (smooth 0.15 lerp + zero seek-latency)
      if (video.duration && !isNaN(video.duration)) {
        const timeDiff = targetVideoTimeRef.current - currentVideoTimeRef.current;
        if (Math.abs(timeDiff) > 0.001) {
          currentVideoTimeRef.current += timeDiff * 0.15;
        } else {
          currentVideoTimeRef.current = targetVideoTimeRef.current;
        }

        // Prevent decoder choking & threshold check (> 0.03s)
        const v = video as HTMLVideoElement & { fastSeek?: (time: number) => void };
        if (!v.seeking && Math.abs(v.currentTime - currentVideoTimeRef.current) > 0.03) {
          if (typeof v.fastSeek === 'function') {
            v.fastSeek(currentVideoTimeRef.current);
          } else {
            v.currentTime = currentVideoTimeRef.current;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    const unsubscribe = smoothProgress.on('change', (progress) => {
      // Phase 1: Altitude climbs 0 -> 7906 across 0.0 -> 0.70
      const altRatio = Math.min(1, Math.max(0, progress / 0.70));
      targetAltRef.current = altRatio * 7906;

      // Video scrubs 0.0 -> 0.75 across video.duration
      if (video.duration && !isNaN(video.duration)) {
        const scrubRatio = Math.min(1, Math.max(0, progress / 0.75));
        targetVideoTimeRef.current = scrubRatio * video.duration;
      }

      // Header Theme switch: dark on video, light on ivory Chapter 02
      const newTheme: 'dark' | 'light' = progress >= 0.87 ? 'light' : 'dark';
      if (newTheme !== lastTheme) {
        lastTheme = newTheme;
        onThemeChange?.(newTheme);
      }
    });

    return () => {
      isRunning = false;
      unsubscribe();
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [smoothProgress, onAscentRevealChange, onThemeChange]);

  // Target card dimensions: slender vertical portrait frame (matching exact reference aspect-[9/13])
  const isMobile = dimensions.w < 768;
  const targetW = isMobile
    ? Math.min(dimensions.w * 0.72, 320)
    : Math.min(Math.max(dimensions.w * 0.28, 340), 420);
  const targetH = isMobile
    ? Math.min(dimensions.h * 0.46, 360)
    : Math.min(Math.max(dimensions.h * 0.72, 540), 680);
  const maxClipTop = Math.max(0, (dimensions.h - targetH) / 2);
  const maxClipSide = Math.max(0, (dimensions.w - targetW) / 2);

  // 1. Altitude Counter & Climb Indicator (Phase 1: 0.0 -> 0.65 solid, fades out 0.65 -> 0.74)
  const counterOpacity = useTransform(smoothProgress, [0, 0.65, 0.74], [1, 1, 0]);

  // 2. Fullscreen Headline "The Exceptional, Reserved For You" (Phase 2: 0.72 -> 0.85)
  const phase2Opacity = useTransform(smoothProgress, [0.72, 0.77, 0.83, 0.87], [0, 1, 1, 0]);
  const phase2Y = useTransform(smoothProgress, [0.72, 0.77, 0.83, 0.87], [24, 0, 0, -20]);
  const phase2PointerEvents = useTransform(smoothProgress, (val) => (val >= 0.74 && val <= 0.85 ? 'auto' : 'none'));

  // 3. Ivory Background Crossfade (Phase 3: 0.84 -> 0.89)
  const ivoryOpacity = useTransform(smoothProgress, [0.84, 0.89], [0, 1]);

  // 4. Video Card Shrink & Crop (Phase 3: 0.85 -> 0.93)
  const clipTop = useTransform(smoothProgress, [0.85, 0.93], [0, maxClipTop]);
  const clipSide = useTransform(smoothProgress, [0.85, 0.93], [0, maxClipSide]);
  const clipPath = useMotionTemplate`inset(${clipTop}px ${clipSide}px ${clipTop}px ${clipSide}px round 2px)`;

  // 5. Chapter 02 Typography & Card Frame Reveal (Phase 3: 0.88 -> 0.96)
  const chapter2Opacity = useTransform(smoothProgress, [0.88, 0.94], [0, 1]);
  const chapter2LeftY = useTransform(smoothProgress, [0.88, 0.94], [24, 0]);
  const chapter2RightY = useTransform(smoothProgress, [0.90, 0.96], [24, 0]);
  const chapter2PointerEvents = useTransform(smoothProgress, (val) => (val >= 0.88 ? 'auto' : 'none'));

  // 6. Bottom Bar Crossfade (01 / 12 ivory -> 02 / 12 dark charcoal)
  const bottomBarCh1Opacity = useTransform(smoothProgress, [0.84, 0.88], [1, 0]);
  const bottomBarCh2Opacity = useTransform(smoothProgress, [0.86, 0.90], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="ascent"
      data-chapter="ascent"
      className="relative w-full h-[900vh] bg-[#0A110D] text-[#efe9df]"
    >
      {/* Chapter 02 Scroll Anchor for menu navigation */}
      <div
        id="chapter-ascent-summit"
        data-chapter="chapter-ascent-summit"
        className="absolute top-[85%] left-0 w-full h-[1px] pointer-events-none"
      />

      {/* Pinned Fullscreen Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center z-10">
        {/* Background Inversion Layer: Dark Mountain Black -> Warm Ivory (#F4F1EA) */}
        <motion.div
          style={{ opacity: ivoryOpacity }}
          className="absolute inset-0 bg-[#F4F1EA] z-0 pointer-events-none"
        />

        {/* Background Video Layer with Scrubbing & Shrink-to-Card Morph */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0 z-0 overflow-hidden will-change-[clip-path]"
        >
          <video
            ref={videoRef}
            src="/Video/serene-ascent-scrub.mp4"
            muted={isMuted}
            playsInline
            preload="auto"
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover object-center pointer-events-none will-change-transform"
            style={{ willChange: 'transform' }}
          />
        </motion.div>

        {/* Centered Portrait Card Frame, Shadow & Luxury Border (Chapter 02) */}
        <motion.div
          style={{
            opacity: chapter2Opacity,
            width: targetW,
            height: targetH,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 rounded-[2px] shadow-[0_20px_50px_-10px_rgba(26,34,28,0.18)] border border-[#121614]/10"
        />

        {/* Beneath the centered image card: "GOLDEN HOUR · 7,900 FT" */}
        <motion.div
          style={{
            opacity: chapter2Opacity,
            top: `calc(50% + ${targetH / 2}px + 12px)`,
          }}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-20 text-center whitespace-nowrap"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-[#121614]/70 mt-3 text-center uppercase">
            GOLDEN HOUR · 7,900 FT
          </span>
        </motion.div>

        {/* -------------------------------------------------------------------------
            PHASE 1: GIANT CENTER ALTITUDE COUNTER (0,000 FT -> 7,906 FT)
            Active: 0.0 -> 0.65, Fades out: 0.65 -> 0.74
            Rock-Solid Layout Stability + 60FPS Lerp + Uniform Lining Figures
        -------------------------------------------------------------------------- */}
        <motion.div
          style={{ opacity: counterOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none will-change-transform flex items-start justify-center"
        >
          <div className="relative inline-flex items-start justify-center font-serif font-light tracking-tight">
            {/* Stable fixed-width digit slots: Uniform lining figures ("lnum" 1, "tnum" 1) */}
            <div
              className="inline-flex items-baseline justify-center text-[18vw] md:text-[22vw] leading-none select-none tracking-tight font-light drop-shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-[#efe9df] lining-nums tabular-nums"
              style={{
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontFeatureSettings: '"lnum" 1, "tnum" 1',
              }}
            >
              {/* Digit 1: Thousands */}
              <span
                ref={d1Ref}
                className="inline-block w-[0.55em] text-center lining-nums tabular-nums transition-opacity duration-100"
                style={{
                  opacity: 0.3,
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  fontFeatureSettings: '"lnum" 1, "tnum" 1',
                }}
              >
                0
              </span>

              {/* Fixed-width comma */}
              <span
                ref={commaRef}
                className="inline-block w-[0.2em] text-center lining-nums tabular-nums transition-opacity duration-100 align-baseline"
                style={{
                  opacity: 0.3,
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  fontFeatureSettings: '"lnum" 1, "tnum" 1',
                }}
              >
                ,
              </span>

              {/* Digit 2: Hundreds */}
              <span
                ref={d2Ref}
                className="inline-block w-[0.55em] text-center lining-nums tabular-nums transition-opacity duration-100"
                style={{
                  opacity: 0.3,
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  fontFeatureSettings: '"lnum" 1, "tnum" 1',
                }}
              >
                0
              </span>

              {/* Digit 3: Tens */}
              <span
                ref={d3Ref}
                className="inline-block w-[0.55em] text-center lining-nums tabular-nums transition-opacity duration-100"
                style={{
                  opacity: 0.3,
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  fontFeatureSettings: '"lnum" 1, "tnum" 1',
                }}
              >
                0
              </span>

              {/* Digit 4: Units */}
              <span
                ref={d4Ref}
                className="inline-block w-[0.55em] text-center lining-nums tabular-nums transition-opacity duration-100"
                style={{
                  opacity: 0.95,
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  fontFeatureSettings: '"lnum" 1, "tnum" 1',
                }}
              >
                0
              </span>
            </div>

            {/* Small "FT" unit label locked to the top-right shoulder */}
            <span className="font-mono text-xs md:text-sm tracking-[0.25em] text-[#efe9df]/70 uppercase translate-y-4 md:translate-y-8 ml-2 md:ml-3 shrink-0 select-none">
              FT
            </span>
          </div>
        </motion.div>

        {/* -------------------------------------------------------------------------
            PHASE 2: FULLSCREEN HEADLINE REVEAL (0.72 -> 0.85)
            "The Exceptional, Reserved For You"
        -------------------------------------------------------------------------- */}
        <motion.div
          style={{
            opacity: phase2Opacity,
            y: phase2Y,
            pointerEvents: phase2PointerEvents,
          }}
          className="absolute inset-0 z-20 flex flex-col justify-between px-8 md:px-16 pt-28 md:pt-36 pb-24 select-none pointer-events-none"
        >
          {/* Contrast vignette for high optical clarity against sunset footage */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/35 pointer-events-none -z-10" />

          {/* Upper Section: Eyebrow Tag & Grand Editorial Headline */}
          <div className="max-w-5xl text-left pointer-events-auto mt-4 md:mt-8">
            <p className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-[#efe9df]/75 mb-4 md:mb-6 font-medium">
              NATHIA GALI · THE GALIYAT · 7,900 FT
            </p>

            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] text-[#efe9df] font-normal drop-shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
              The Exceptional,<br />
              <span className="font-serif italic font-light">Reserved</span> For You.
            </h1>
          </div>

          {/* Lower Row Layout: Dual-column baseline */}
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pointer-events-auto">
            <div className="text-left">
              <p className="font-sans text-sm md:text-base font-light text-[#efe9df]/85 tracking-wide leading-relaxed">
                Pakistan’s most premium apartment hotel<br />
                <span className="text-[#efe9df]/65 text-xs md:text-sm font-light">
                  By Elevate Holdings
                </span>
              </p>
            </div>

            <button
              onClick={onRegisterClick}
              type="button"
              className="bg-[#d5c3a5] text-[#121614] hover:bg-[#e4d5be] px-8 py-4 rounded-full font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all shadow-xl inline-flex items-center gap-3 active:scale-95 cursor-pointer"
            >
              <span>REGISTER PRIORITY INTEREST</span>
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </motion.div>

        {/* -------------------------------------------------------------------------
            PHASE 3: CHAPTER 02 EDITORIAL CONTENT (0.85 -> 1.0)
            Exact match with reference image (Balanced 3-Column Stage, Zero Overlap)
        -------------------------------------------------------------------------- */}
        <motion.div
          style={{
            opacity: chapter2Opacity,
            pointerEvents: chapter2PointerEvents,
          }}
          className="absolute inset-0 z-20 pointer-events-none select-none flex items-center justify-between px-8 md:px-12 lg:px-16 xl:px-20"
        >
          {/* Left Column: Eyebrow + Cormorant Garamond Heading */}
          <motion.div
            style={{ y: chapter2LeftY }}
            className="w-full max-w-md xl:max-w-lg text-left pointer-events-auto z-20 pl-0 lg:pl-4 xl:pl-8"
          >
            {/* Chapter tag: "02 —— THE RESERVE" with champagne dash */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="font-mono text-xs tracking-[0.25em] text-[#8C827A] font-medium">02</span>
              <span className="w-8 h-[1px] bg-[#8C827A]/40" />
              <span className="font-mono text-xs tracking-[0.25em] text-[#8C827A] uppercase">
                THE RESERVE
              </span>
            </div>

            {/* Heading text: Refined Editorial Scale with Warm Bronze/Gold Accent */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[3.75rem] leading-[1.08] tracking-tight font-normal text-[#1C201D]">
              Slower days.<br />
              Deeper breaths.<br />
              <span className="font-serif italic text-[#A3886E] font-normal">True rest.</span>
            </h2>
          </motion.div>

          {/* Center Card Spacer: Physically locks space between left and right columns so overlap is impossible */}
          <div
            style={{ width: targetW, minWidth: targetW }}
            className="shrink-0 pointer-events-none invisible mx-4 lg:mx-8"
            aria-hidden="true"
          />

          {/* Right Column Paragraph: Placed at right lower shoulder */}
          <motion.div
            style={{ y: chapter2RightY }}
            className="w-full max-w-[300px] xl:max-w-[340px] text-left pointer-events-auto z-20 self-end mb-16 lg:mb-20 pr-0 lg:pr-4 xl:pr-8"
          >
            <p className="font-serif text-base lg:text-[1.15rem] leading-[1.55] text-[#2A302B]/85 font-normal">
              High on the main road of Nathia Gali, composed in stone, timber and glass above an unbroken sweep of protected pine forest.
            </p>
          </motion.div>
        </motion.div>

        {/* -------------------------------------------------------------------------
            BOTTOM CONTROLS: CHAPTER 01 (Ivory) & CHAPTER 02 (Dark Charcoal)
        -------------------------------------------------------------------------- */}
        {/* Chapter 01 Bottom Controls (Ivory) */}
        <motion.div
          style={{ opacity: bottomBarCh1Opacity }}
          className="absolute bottom-8 left-0 w-full px-8 md:px-16 z-30 pointer-events-none select-none flex items-end justify-between"
        >
          {/* Bottom-Left: "01 / 12" + slender line */}
          <div className="flex items-center pointer-events-auto">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#efe9df]/80 uppercase">
              01 / 12
            </span>
            <span className="w-12 md:w-16 h-[1.5px] bg-[#efe9df]/40 ml-4 inline-block align-middle" />
          </div>

          {/* Bottom-Center: "SCROLL TO CLIMB" + vertical tick line (fades out at summit) */}
          <motion.div
            style={{ opacity: counterOpacity }}
            className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center pointer-events-none"
          >
            <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-[#efe9df]/75 uppercase mb-2 whitespace-nowrap">
              SCROLL TO CLIMB
            </span>
            <span className="w-[1px] h-6 bg-[#efe9df]/40 mx-auto animate-pulse" />
          </motion.div>

          {/* Bottom-Right: Audio Toggle */}
          <div className="flex items-center pointer-events-auto ml-auto">
            <button
              onClick={toggleSound}
              type="button"
              className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#efe9df]/75 hover:text-[#efe9df] uppercase transition-colors"
            >
              {isMuted ? '.... SOUND OFF' : '.... SOUND ON'}
            </button>
          </div>
        </motion.div>

        {/* Chapter 02 Bottom Controls (Dark Charcoal) */}
        <motion.div
          style={{ opacity: bottomBarCh2Opacity }}
          className="absolute bottom-8 left-0 w-full px-8 md:px-16 z-30 pointer-events-none select-none flex items-end justify-between"
        >
          {/* Bottom-Left: "02 / 12" + slender line */}
          <div className="flex items-center pointer-events-auto">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#121614] uppercase font-medium">
              02 / 12
            </span>
            <span className="w-12 md:w-16 h-[1.5px] bg-[#121614]/30 ml-4 inline-block align-middle" />
          </div>

          {/* Bottom-Right: Audio Toggle (Dark) */}
          <div className="flex items-center pointer-events-auto ml-auto">
            <button
              onClick={toggleSound}
              type="button"
              className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#121614]/75 hover:text-[#121614] uppercase transition-colors"
            >
              {isMuted ? '.... SOUND OFF' : '.... SOUND ON'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
