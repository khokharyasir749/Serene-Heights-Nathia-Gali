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
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isMuted, setIsMuted] = useState(true);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    let isSeeking = false;
    let queuedTime: number | null = null;

    const requestSeek = (targetTime: number) => {
      if (!video || isNaN(video.duration) || video.duration === 0) return;

      const clamped = Math.min(
        Math.max(targetTime, 0.01),
        video.duration - 0.05
      );

      if (isSeeking || video.seeking) {
        queuedTime = clamped;
        return;
      }

      isSeeking = true;
      video.currentTime = clamped;
    };

    const onSeeked = () => {
      isSeeking = false;
      if (queuedTime !== null) {
        const nextTime = queuedTime;
        queuedTime = null;
        requestSeek(nextTime);
      }
    };

    const onLoaded = () => {
      if (video && video.duration && !isNaN(video.duration)) {
        requestSeek(smoothProgress.get() * video.duration);
      }
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("canplay", onLoaded);

    const unsubscribe = smoothProgress.on("change", (latest) => {
      // 1. Scrub video timeline cleanly
      if (video && video.duration && !isNaN(video.duration)) {
        const target = latest * video.duration;
        requestSeek(target);
      }

      // 2. Direct DOM update for formatted counter (0,000 to 7,900)
      const altitude = Math.round(latest * 7900);
      if (counterRef.current) {
        const formatted =
          altitude >= 1000
            ? altitude.toLocaleString("en-US")
            : `0,${altitude.toString().padStart(3, "0")}`;
        counterRef.current.innerText = formatted;
      }

      if (onThemeChange) {
        onThemeChange(latest >= 0.88 ? "light" : "dark");
      }
      if (onAscentRevealChange) {
        onAscentRevealChange(latest >= 0.1);
      }
    });

    return () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("canplay", onLoaded);
      unsubscribe();
    };
  }, [smoothProgress, onThemeChange, onAscentRevealChange]);

  const toggleSound = () => {
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  };

  // Phase Transitions
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.45, 0.55], [1, 0.9, 0]);
  const phase1Scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.94]);

  const phase2Opacity = useTransform(scrollYProgress, [0.58, 0.75, 1], [0, 1, 1]);
  const phase2Y = useTransform(scrollYProgress, [0.58, 0.75], [30, 0]);

  return (
    <section
      ref={containerRef}
      id="ascent"
      data-chapter="ascent"
      className="relative h-[450vh] bg-[#161B18]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Video */}
        <video
          ref={videoRef}
          playsInline
          muted={isMuted}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          src="/Video/serene-heights-nathia-gali.mp4"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161B18]/90 via-black/20 to-[#161B18]/70 pointer-events-none" />

        {/* PHASE 1: MASSIVE CENTER ALTITUDE (MATCHES IMAGE 2) */}
        <motion.div
          style={{ opacity: phase1Opacity, scale: phase1Scale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none"
        >
          <div className="relative flex items-start">
            <div className="font-serif text-[7.5rem] sm:text-[12rem] md:text-[15rem] lg:text-[18rem] text-[#EDE8DF] font-light tracking-tight leading-none tabular-nums drop-shadow-2xl">
              <span ref={counterRef}>0,000</span>
            </div>
            <span className="font-mono text-sm sm:text-xl text-[#C9BEAE] tracking-widest ml-2 mt-4 sm:mt-8">
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

        {/* PHASE 2: EDITORIAL TITLE & CTA (MATCHES IMAGE 1) */}
        <motion.div
          style={{ opacity: phase2Opacity, y: phase2Y }}
          className="absolute inset-0 z-10 flex flex-col justify-end px-8 sm:px-14 pb-16 pointer-events-none select-none"
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6">
            <div className="max-w-3xl">
              <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#C9BEAE] mb-4 block">
                NATHIA GALI · THE GALIYAT · 7,900 FT
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#EDE8DF] font-light leading-[0.94] tracking-tight">
                The Exceptional,<br />
                <span className="italic font-normal">Reserved For You.</span>
              </h1>
              <p className="font-sans text-sm sm:text-base text-[#efe9df]/85 tracking-wide mt-6 leading-relaxed">
                Pakistan’s most premium apartment hotel<br />
                <span className="text-[#C9BEAE] text-xs sm:text-sm font-light">
                  By Elevate Holdings
                </span>
              </p>
            </div>

            <div className="pointer-events-auto">
              <button
                onClick={onRegisterClick}
                type="button"
                className="bg-[#C9BEAE] hover:bg-[#d8cfc2] text-[#161B18] font-medium text-xs sm:text-sm tracking-widest uppercase px-8 sm:px-10 py-4 sm:py-5 rounded-full flex items-center gap-4 transition-all shadow-xl group active:scale-95 cursor-pointer"
              >
                <span>Register Priority Interest</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Persistent Indicators */}
        <div className="relative z-20 mt-auto w-full px-8 sm:px-14 pb-8 flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase select-none pointer-events-auto">
          <div className="flex items-center gap-4 pointer-events-none">
            <span>01 / 12</span>
            <span className="h-[1px] w-8 sm:w-12 bg-[#A8A195]/40" />
          </div>

          <button
            onClick={toggleSound}
            type="button"
            className="hover:text-[#EDE8DF] transition-colors cursor-pointer"
          >
            {isMuted ? ".... SOUND OFF" : ".... SOUND ON"}
          </button>
        </div>
      </div>
    </section>
  );
}

export { HeroAscent };
