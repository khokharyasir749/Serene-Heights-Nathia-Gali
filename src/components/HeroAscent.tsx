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
  const videoRef = useRef<HTMLVideoElement>(null);
  const isSeekingRef = useRef<boolean>(false);
  const nextTargetTimeRef = useRef<number | null>(null);

  // 1. Tall runway so user has sufficient scroll distance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Smooth spring to prevent abrupt delta spikes
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  const [altitude, setAltitude] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce paused state and initial load
    video.pause();
    video.currentTime = 0;

    const handleLoaded = () => {
      video.pause();
      if (video.duration && !isNaN(video.duration)) {
        const currentProgress = smoothProgress.get();
        if (currentProgress > 0) {
          applyTargetTime(currentProgress * video.duration);
        }
      }
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);

    // Direct seeking lock mechanism to guarantee frame render without decoder freeze
    const applyTargetTime = (targetTime: number) => {
      if (!video || isNaN(video.duration) || video.duration === 0) return;

      const clampedTime = Math.min(
        Math.max(targetTime, 0.01),
        video.duration - 0.05
      );

      if (video.seeking || isSeekingRef.current) {
        nextTargetTimeRef.current = clampedTime;
        return;
      }

      isSeekingRef.current = true;
      video.currentTime = clampedTime;
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (nextTargetTimeRef.current !== null) {
        const next = nextTargetTimeRef.current;
        nextTargetTimeRef.current = null;
        applyTargetTime(next);
      }
    };

    video.addEventListener("seeked", handleSeeked);

    const unsubscribe = smoothProgress.on("change", (latest) => {
      // Synchronize Altitude Counter
      const currentAltitude = Math.round(latest * 7800);
      setAltitude(currentAltitude);

      // Advance video frames smoothly via seeking queue
      if (video && video.duration && !isNaN(video.duration)) {
        applyTargetTime(latest * video.duration);
      }

      if (onThemeChange) {
        onThemeChange(latest >= 0.88 ? "light" : "dark");
      }
      if (onAscentRevealChange) {
        onAscentRevealChange(latest >= 0.1);
      }
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
      video.removeEventListener("seeked", handleSeeked);
      unsubscribe();
    };
  }, [smoothProgress, onThemeChange, onAscentRevealChange]);

  // Editorial Overlays: Ensure proper timing so text doesn't overlap
  const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const buildingLabelOpacity = useTransform(
    scrollYProgress,
    [0.6, 0.75, 0.95],
    [0, 1, 0]
  );
  const bottomBarOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.4]);

  return (
    <section
      ref={containerRef}
      id="ascent"
      data-chapter="ascent"
      className="relative h-[400vh] bg-[#161B18]"
    >
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Scroll-Scrubbed Video Element */}
        <video
          ref={videoRef}
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          src="/Video/serene-heights-nathia-gali.mp4"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161B18] via-transparent to-[#161B18]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Top Centered Elevation Counter */}
        <div className="relative z-10 pt-28 text-center pointer-events-none select-none">
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#C9BEAE]">
            ELEVATION ASCENT
          </span>
          <div className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#EDE8DF] font-light tracking-tight mt-1">
            {altitude.toLocaleString()}{" "}
            <span className="text-2xl sm:text-3xl text-[#A8A195]">FT</span>
          </div>
        </div>

        {/* Initial Eyebrow */}
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

        {/* Reveal Phase (Appears only around 60-95% scroll when building is visible) */}
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
