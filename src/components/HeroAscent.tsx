"use client";

import React, { useRef, useEffect } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const altitudeRef = useRef<HTMLSpanElement>(null);
  const isSeekingRef = useRef<boolean>(false);
  const targetTimeRef = useRef<number>(0);

  // 1. Extended runway for effortless, unhurried scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Soft, luxurious spring physics to completely absorb wheel jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 24,
    mass: 0.8,
    restDelta: 0.0005,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const performSeek = (targetTime: number) => {
      if (!video || isNaN(video.duration) || video.duration === 0) return;

      const clamped = Math.min(
        Math.max(targetTime, 0),
        video.duration - 0.05
      );

      // Prefer fastSeek if supported by modern browser engine
      if ("fastSeek" in video && typeof (video as any).fastSeek === "function") {
        try {
          (video as any).fastSeek(clamped);
          return;
        } catch {
          // fallback to currentTime
        }
      }

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = clamped;
      } else {
        targetTimeRef.current = clamped;
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (Math.abs(video.currentTime - targetTimeRef.current) > 0.05) {
        isSeekingRef.current = true;
        video.currentTime = targetTimeRef.current;
      }
    };

    video.addEventListener("seeked", handleSeeked);

    const unsubscribe = smoothProgress.on("change", (progress) => {
      // 1. Direct DOM update for altitude numbers to eliminate React re-render vibration/jitter
      const currentAltitude = Math.round(progress * 7800);
      if (altitudeRef.current) {
        altitudeRef.current.innerText = currentAltitude.toLocaleString();
      }

      // 2. Smoothly seek video
      if (video && video.duration) {
        targetTimeRef.current = progress * video.duration;
        performSeek(targetTimeRef.current);
      }

      if (onThemeChange) {
        onThemeChange(progress >= 0.88 ? "light" : "dark");
      }
      if (onAscentRevealChange) {
        onAscentRevealChange(progress >= 0.1);
      }
    });

    return () => {
      video.removeEventListener("seeked", handleSeeked);
      unsubscribe();
    };
  }, [smoothProgress, onThemeChange, onAscentRevealChange]);

  // Editorial Overlays: Cleanly timed so nothing clashes
  const introOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const buildingLabelOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.82, 0.96],
    [0, 1, 0]
  );
  const bottomBarOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.35]);

  return (
    <section
      ref={containerRef}
      id="ascent"
      data-chapter="ascent"
      className="relative h-[450vh] bg-[#161B18]"
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Video */}
        <video
          ref={videoRef}
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          src="/Video/serene-heights-nathia-gali.mp4"
        />

        {/* Cinematic Darkness Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161B18] via-transparent to-[#161B18]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Large, Rock-Solid Altitude Display (No vibrating/jitter) */}
        <div className="relative z-10 pt-24 sm:pt-28 text-center pointer-events-none select-none">
          <span className="font-mono text-xs sm:text-sm tracking-[0.35em] uppercase text-[#C9BEAE]">
            ELEVATION ASCENT
          </span>
          <div className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] text-[#EDE8DF] font-light tracking-tight mt-1 leading-none tabular-nums">
            <span ref={altitudeRef}>0</span>{" "}
            <span className="text-3xl sm:text-5xl md:text-6xl text-[#A8A195] font-normal tracking-normal ml-1">
              FT
            </span>
          </div>
        </div>

        {/* Initial Prompt */}
        <motion.div
          style={{ opacity: introOpacity }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#EDE8DF] font-light">
            Serene Heights
          </h1>
          <p className="font-mono text-xs text-[#A8A195] tracking-[0.25em] uppercase mt-3">
            SCROLL TO ASCEND THE RIDGE
          </p>
        </motion.div>

        {/* Building Reveal Milestone */}
        <motion.div
          style={{ opacity: buildingLabelOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#C9BEAE] mb-3">
            7,800 FT · ABOVE THE MIST LINE
          </span>
          <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#EDE8DF] font-light max-w-4xl">
            The Residence at Nathia Gali
          </h2>
        </motion.div>

        {/* Bottom Status Bar */}
        <motion.div
          style={{ opacity: bottomBarOpacity }}
          className="relative z-10 w-full px-8 pb-8 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#A8A195] uppercase select-none"
        >
          <span>01 / 12 ————</span>
          <span className="animate-pulse">↓ SCROLL TO EXPLORE</span>
          <span>NATHIA GALI, PAKISTAN</span>
        </motion.div>
      </div>
    </section>
  );
}

export { HeroAscent };
