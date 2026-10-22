"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  const targetTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track altitude synchronously with scroll (0 -> 7,800 FT)
  const [altitude, setAltitude] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const handleLoaded = () => {
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);

    // Smooth lerp loop running on RAF for silky 60fps scrubbing
    const updateVideoFrame = () => {
      if (video && !isNaN(video.duration) && video.duration > 0) {
        // Linear interpolation towards target time
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.005) {
          video.currentTime += diff * 0.12; // 0.12 provides smooth dampening
        }
      }
      animationFrameRef.current = requestAnimationFrame(updateVideoFrame);
    };

    animationFrameRef.current = requestAnimationFrame(updateVideoFrame);

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      // 1. Update target video time clamped safely
      if (video && video.duration) {
        targetTimeRef.current = Math.min(
          Math.max(progress * video.duration, 0),
          video.duration - 0.05
        );
      }
      // 2. Synchronously lock altitude counter to the exact same scroll percentage
      const currentAltitude = Math.round(progress * 7800);
      setAltitude(currentAltitude);

      // Notify parent theme and reveal states if provided
      if (onThemeChange) {
        onThemeChange(progress >= 0.88 ? "light" : "dark");
      }
      if (onAscentRevealChange) {
        onAscentRevealChange(progress >= 0.1);
      }
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      unsubscribe();
    };
  }, [scrollYProgress, onThemeChange, onAscentRevealChange]);

  // Editorial overlays linked to the synchronized scroll timeline
  const introOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const buildingLabelOpacity = useTransform(scrollYProgress, [0.45, 0.7, 0.9], [0, 1, 0]);

  return (
    <section
      ref={containerRef}
      id="ascent"
      data-chapter="ascent"
      className="relative h-[350vh] bg-[#161B18]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Strictly Scroll-Scrubbed Video Asset */}
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

        {/* Top Centered Elevation Counter (In Perfect Sync with Video) */}
        <div className="relative z-10 pt-28 text-center pointer-events-none select-none">
          <span className="font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#C9BEAE]">
            ELEVATION ASCENT
          </span>
          <div className="font-serif text-5xl sm:text-7xl md:text-8xl text-[#EDE8DF] font-light tracking-tight mt-1">
            {altitude.toLocaleString()}{" "}
            <span className="text-2xl sm:text-3xl text-[#A8A195]">FT</span>
          </div>
        </div>

        {/* Initial Eyebrow & Prompt */}
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

        {/* Reveal Phase as Video Reaches the Architectural Peak */}
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
        <div className="relative z-10 w-full px-8 pb-8 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#A8A195] uppercase select-none">
          <span>01 / 12 ————</span>
          <span className="animate-pulse">↓ SCROLL TO EXPLORE</span>
          <span>NATHIA GALI, PAKISTAN</span>
        </div>
      </div>
    </section>
  );
}

export { HeroAscent };
