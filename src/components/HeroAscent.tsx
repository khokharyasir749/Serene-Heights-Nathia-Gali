"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface HeroAscentProps {
  onRegisterClick?: () => void;
  onAscentRevealChange?: (isRevealed: boolean) => void;
  onThemeChange?: (theme: "dark" | "light") => void;
}

export default function HeroAscent({
  onRegisterClick,
  onAscentRevealChange,
  onThemeChange,
}: HeroAscentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(1);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Responsive window dimensions for smooth pixel-perfect crop animation
  const [windowSize, setWindowSize] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Standard Chapter 02 card dimensions: 380px x 520px (responsive on narrow screens)
  const targetWidth =
    typeof window !== "undefined" && windowSize.width < 420
      ? Math.min(380, windowSize.width * 0.85)
      : 380;
  const targetHeight =
    typeof window !== "undefined" && windowSize.width < 420
      ? Math.round(targetWidth * (520 / 380))
      : 520;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Soft spring to smoothly interpolate scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 28,
    mass: 0.5,
    restDelta: 0.0005,
  });

  const TOTAL_FRAMES = 300;

  const getFramePath = (index: number) =>
    `/pictures/home/frames/frame_${String(index).padStart(4, "0")}.jpg`;

  const drawFrame = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const ratio = Math.max(cw / iw, ch / ih);
    const x = (cw - iw * ratio) / 2;
    const y = (ch - ih * ratio) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, iw, ih, x, y, iw * ratio, ih * ratio);
  };

  const renderFrame = (index: number) => {
    const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, index));
    currentFrameRef.current = frameIndex;

    const images = imagesRef.current;
    const targetImg = images[frameIndex];
    if (targetImg && targetImg.complete && targetImg.naturalWidth > 0) {
      drawFrame(targetImg);
      return;
    }

    // Nearest fallback frame to avoid any black frame or flicker
    for (let offset = 1; offset < 40; offset++) {
      const prev = images[frameIndex - offset];
      if (prev && prev.complete && prev.naturalWidth > 0) {
        drawFrame(prev);
        return;
      }
      const next = images[frameIndex + offset];
      if (next && next.complete && next.naturalWidth > 0) {
        drawFrame(next);
        return;
      }
    }
  };

  // Preload frames progressively
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    // 1. Immediately load frame 1 for instant paint
    const firstImg = new Image();
    firstImg.src = getFramePath(1);
    firstImg.onload = () => {
      if (currentFrameRef.current === 1) {
        drawFrame(firstImg);
      }
    };
    images[1] = firstImg;

    // 2. High-speed pass: every 5th frame
    for (let i = 5; i <= TOTAL_FRAMES; i += 5) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (currentFrameRef.current === i) {
          drawFrame(img);
        }
      };
      images[i] = img;
    }

    // 3. Complete pass: load all intermediate frames
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      if (images[i]) continue;
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (currentFrameRef.current === i) {
          drawFrame(img);
        }
      };
      images[i] = img;
    }
  }, []);

  // Update canvas resolution and repaint current frame on window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1920;
    canvas.height = 1080;

    const currentImg =
      imagesRef.current[currentFrameRef.current] || imagesRef.current[1];
    if (currentImg && currentImg.complete) {
      drawFrame(currentImg);
    }
  }, [windowSize]);

  // Scroll sync: scrub frames & update altitude counter
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      // 1. Scrub 300 frames cleanly up to building peak (~58% of scroll)
      const scrubProgress = Math.min(1, Math.max(0, latest / 0.58));
      const targetFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(scrubProgress * (TOTAL_FRAMES - 1)) + 1)
      );
      renderFrame(targetFrame);

      // 2. Direct DOM update for formatted counter (0,000 to 7,906 FT) during Phase 1
      const progressToPeak = Math.min(1, Math.max(0, latest / 0.45));
      const altitude = Math.round(progressToPeak * 7906);
      if (counterRef.current) {
        const formatted =
          altitude >= 1000
            ? altitude.toLocaleString("en-US")
            : `0,${altitude.toString().padStart(3, "0")}`;
        if (counterRef.current.innerText !== formatted) {
          counterRef.current.innerText = formatted;
        }
      }

      // Dynamic header theme switch when transitioning into cream parchment Chapter 02
      if (onThemeChange) {
        onThemeChange(latest >= 0.74 ? "light" : "dark");
      }
      if (onAscentRevealChange) {
        onAscentRevealChange(latest >= 0.1);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [smoothProgress, onThemeChange, onAscentRevealChange]);

  const toggleSound = () => {
    setIsMuted((prev) => !prev);
  };

  // =========================================================================
  // SCROLL-LINKED TRANSFORMATION TIMELINE (0.00 -> 1.00 across 800vh)
  // =========================================================================

  // 1. Phase 1: Massive 0,000 FT Counter (visible 0 -> 0.44, fades out to 0.50 without scaling)
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.44, 0.50], [1, 1, 0]);

  // 2. Phase 2: Editorial Headline & CTA ("The Exceptional, Reserved For You")
  const phase2Opacity = useTransform(scrollYProgress, [0.50, 0.57, 0.65, 0.71], [0, 1, 1, 0]);
  const phase2Y = useTransform(scrollYProgress, [0.50, 0.57, 0.65, 0.71], [30, 0, 0, -30]);

  // 3. Phase 3: Seamless Background Morph (#161B18 -> #F5F2EB parchment)
  const bgColor = useTransform(scrollYProgress, [0.68, 0.78], ["#161B18", "#F5F2EB"]);
  const vignetteOpacity = useTransform(scrollYProgress, [0.68, 0.76], [1, 0]);

  // 4. Phase 3: Contracting Center Media Frame (100vw/100vh -> 380px/520px card)
  const frameWidth = useTransform(scrollYProgress, [0.68, 0.80], [windowSize.width, targetWidth]);
  const frameHeight = useTransform(scrollYProgress, [0.68, 0.80], [windowSize.height, targetHeight]);
  const frameBorderRadius = useTransform(scrollYProgress, [0.68, 0.80], [0, 4]);
  const frameShadow = useTransform(
    scrollYProgress,
    [0.68, 0.80],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 25px 60px -15px rgba(28,25,23,0.3)"]
  );

  // 5. Chapter 02: 3-Column Editorial Content Reveals smoothly alongside the cropped frame
  const ch2LeftOpacity = useTransform(scrollYProgress, [0.72, 0.80], [0, 1]);
  const ch2LeftY = useTransform(scrollYProgress, [0.72, 0.80], [25, 0]);

  const ch2CaptionOpacity = useTransform(scrollYProgress, [0.75, 0.82], [0, 1]);
  const ch2CaptionY = useTransform(scrollYProgress, [0.75, 0.82], [15, 0]);

  const ch2RightOpacity = useTransform(scrollYProgress, [0.74, 0.82], [0, 1]);
  const ch2RightY = useTransform(scrollYProgress, [0.74, 0.82], [25, 0]);

  // 6. Bottom Bar Crossfade (01 / 12 -> 02 / 12 and dark to parchment text)
  const ch1IndicatorOpacity = useTransform(scrollYProgress, [0.70, 0.76], [1, 0]);
  const ch2IndicatorOpacity = useTransform(scrollYProgress, [0.74, 0.80], [0, 1]);
  const bottomTextColor = useTransform(scrollYProgress, [0.70, 0.78], ["#A8A195", "#78716C"]);
  const bottomLineColor = useTransform(
    scrollYProgress,
    [0.70, 0.78],
    ["rgba(168,161,149,0.4)", "rgba(120,113,108,0.4)"]
  );

  return (
    <section
      ref={containerRef}
      id="ascent"
      data-chapter="ascent"
      className="relative h-[800vh]"
    >
      {/* Anchor point for Chapter 02 The Reserve navigation */}
      <div id="reserve" className="absolute top-[68%] w-full h-1 pointer-events-none" />

      {/* Pinned Sticky Viewport with Dynamic Morphing Background */}
      <motion.div
        style={{ backgroundColor: bgColor }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* =========================================================================
            CENTER CONTRACTING MEDIA FRAME (FULL-BLEED -> 380px x 520px CENTER CARD)
            Directly holds the video's final scrubbed frame at the building peak.
        ========================================================================== */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
          <motion.div
            style={{
              width: frameWidth,
              height: frameHeight,
              borderRadius: frameBorderRadius,
              boxShadow: frameShadow,
            }}
            className="relative overflow-hidden shrink-0 bg-[#161B18]"
          >
            {/* 300-Frame Scroll-Scrubbed Canvas */}
            <canvas
              ref={canvasRef}
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            />
          </motion.div>
        </div>

        {/* Cinematic Vignette (Fades to 0 during parchment transition) */}
        <motion.div
          style={{ opacity: vignetteOpacity }}
          className="absolute inset-0 bg-gradient-to-t from-[#161B18]/90 via-black/20 to-[#161B18]/70 pointer-events-none"
        />

        {/* =========================================================================
            PHASE 1: MASSIVE CENTER ALTITUDE (0,000 -> 7,906 FT)
            - Static font size that NEVER changes or scales during scroll
            - Tabular digits with fixed-width inline span to stop sideways vibration
        ========================================================================== */}
        <motion.div
          style={{ opacity: phase1Opacity }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <div
            style={{ fontVariantNumeric: "tabular-nums" }}
            className="relative flex items-start select-none"
          >
            <div
              style={{ fontVariantNumeric: "tabular-nums" }}
              className="text-[13rem] sm:text-[16rem] md:text-[20rem] lg:text-[22rem] font-serif font-light leading-none select-none text-[#EDE8DF] drop-shadow-2xl"
            >
              <span
                ref={counterRef}
                style={{
                  fontVariantNumeric: "tabular-nums",
                  fontFeatureSettings: '"tnum" 1, "lnum" 1',
                  display: "inline-block",
                  width: "4.8ch",
                  textAlign: "right",
                  letterSpacing: "0.02em",
                }}
                className="tabular-nums whitespace-nowrap select-none"
              >
                0,000
              </span>
            </div>
            <span className="font-mono text-base sm:text-xl text-[#C9BEAE] tracking-widest ml-3 mt-8 sm:mt-12 select-none">
              FT
            </span>
          </div>

          <div className="absolute bottom-16 flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] sm:text-xs text-[#EDE8DF]/70 tracking-[0.3em] uppercase">
              SCROLL TO CLIMB
            </span>
            <div className="w-[1px] h-6 bg-gradient-to-b from-[#C9BEAE] to-transparent animate-pulse" />
          </div>
        </motion.div>

        {/* =========================================================================
            PHASE 2: EDITORIAL TITLE & CTA (Serene Heights Summit Frame)
        ========================================================================== */}
        <motion.div
          style={{ opacity: phase2Opacity, y: phase2Y }}
          className="absolute inset-0 z-20 flex flex-col justify-end px-8 sm:px-14 pb-16 pointer-events-none select-none overflow-hidden"
        >
          {/* Subtle luxury gradient scrim behind text on the left */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent lg:bg-gradient-to-r lg:from-black/75 lg:via-black/35 lg:to-transparent pointer-events-none -z-10" />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6 relative z-10">
            <div className="max-w-3xl">
              <span className="font-mono text-xs tracking-[0.25em] uppercase text-[#E2D9CC] font-medium mb-4 block drop-shadow-md">
                SERENE HEIGHTS · NATHIA GALI · 7,906 FT
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.25rem] text-[#FDFBF7] font-light leading-[1.02] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
                Pakistan&apos;s First &amp; Largest<br />
                <span className="italic font-normal">Winter Resort.</span>
              </h1>
              <div className="mt-6 space-y-1.5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                <p className="font-sans text-sm sm:text-base text-[#FDFBF7]/95 tracking-wide font-normal leading-relaxed">
                  30+ Kanals · 3 Towers · 150+ Executive Suites
                </p>
                <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#E2D9CC] font-medium">
                  A Project of DM Consortium
                </p>
              </div>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={onRegisterClick}
                type="button"
                className="bg-[#C5A880] hover:bg-[#d4b993] text-[#121212] font-semibold text-xs sm:text-sm tracking-widest uppercase px-8 sm:px-10 py-4 sm:py-5 rounded-full flex items-center gap-4 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.35)] group active:scale-95 cursor-pointer"
              >
                <span>Register Priority Interest</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            PHASE 3 / CHAPTER 02: 3-COLUMN EDITORIAL SHOWCASE (THE RESERVE)
        ========================================================================== */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8 sm:px-14 lg:px-16 pointer-events-none select-none">
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Column 1: Left Eyebrow & Staggered Serif Headline */}
            <motion.div
              style={{ opacity: ch2LeftOpacity, y: ch2LeftY }}
              className="lg:col-span-4 flex flex-col justify-center"
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#78716C]">
                  02
                </span>
                <span className="w-8 h-[1px] bg-[#78716C]/40" />
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#78716C]">
                  THE RESERVE
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] text-[#1C1917] font-light leading-[1.08] tracking-tight">
                Slower days.<br />
                Deeper breaths.<br />
                <span className="italic font-normal font-serif text-[#8C7E6A]">
                  True rest.
                </span>
              </h2>
            </motion.div>

            {/* Column 2: Center Spacer (matches frame dimensions 380px x 520px) + Caption below */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              {/* Phantom spacer that guarantees grid column alignment */}
              <div
                style={{ width: targetWidth, height: targetHeight }}
                className="shrink-0 pointer-events-none"
              />

              {/* Caption right below the frame */}
              <motion.p
                style={{ opacity: ch2CaptionOpacity, y: ch2CaptionY }}
                className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#78716C] mt-4 text-center select-none"
              >
                GOLDEN HOUR · 7,906 FT
              </motion.p>
            </div>

            {/* Column 3: Right Editorial Prose with delicate leading */}
            <motion.div
              style={{ opacity: ch2RightOpacity, y: ch2RightY }}
              className="lg:col-span-4 flex flex-col justify-end lg:pt-36 lg:pl-6"
            >
              <p className="font-serif text-lg sm:text-xl lg:text-2xl text-[#292524] font-light leading-relaxed max-w-sm">
                High on the main road of Nathia Gali, composed in stone, timber and glass above an unbroken sweep of protected pine forest.
              </p>
            </motion.div>

          </div>
        </div>

        {/* =========================================================================
            BOTTOM PERSISTENT CONTROLS (01 / 12 -> 02 / 12 & SOUND TOGGLE)
        ========================================================================== */}
        <motion.div
          style={{ color: bottomTextColor }}
          className="relative z-30 mt-auto w-full max-w-7xl mx-auto px-8 sm:px-14 lg:px-16 pb-8 flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase select-none pointer-events-auto"
        >
          <div className="flex items-center gap-4 pointer-events-none relative h-4">
            {/* 01 / 12 Chapter 01 indicator */}
            <motion.div
              style={{ opacity: ch1IndicatorOpacity }}
              className="flex items-center gap-4 absolute left-0 top-0 whitespace-nowrap"
            >
              <span>01 / 12</span>
              <motion.span
                style={{ backgroundColor: bottomLineColor }}
                className="h-[1px] w-8 sm:w-12"
              />
            </motion.div>

            {/* 02 / 12 Chapter 02 indicator */}
            <motion.div
              style={{ opacity: ch2IndicatorOpacity }}
              className="flex items-center gap-4 absolute left-0 top-0 whitespace-nowrap"
            >
              <span>02 / 12</span>
              <motion.span
                style={{ backgroundColor: bottomLineColor }}
                className="h-[1px] w-8 sm:w-12"
              />
            </motion.div>
          </div>

          <button
            onClick={toggleSound}
            type="button"
            className="hover:opacity-80 transition-opacity cursor-pointer"
          >
            {isMuted ? ".... SOUND OFF" : ".... SOUND ON"}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export { HeroAscent };
