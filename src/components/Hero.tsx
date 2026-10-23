"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 1. Vertical scroll tracking across a 300vh track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 2. Smooth spring physics for lag-free, non-jittery scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // 3. Strictly bind video frame to scroll position ONLY
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force video to stay paused and ready
    video.pause();
    video.currentTime = 0;

    const handleLoaded = () => {
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);

    // Scrub ONLY on scroll change
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (video && video.duration && !isNaN(video.duration)) {
        const targetTime = Math.min(
          Math.max(latest * video.duration, 0),
          video.duration - 0.04
        );
        video.currentTime = targetTime;
      }
    });

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
      unsubscribe();
    };
  }, [smoothProgress]);

  // Overlays tied strictly to vertical scroll
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.38], [1, 0.8, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const quoteOpacity = useTransform(scrollYProgress, [0.4, 0.65, 0.88], [0, 1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      data-chapter="hero"
      className="relative h-[300vh] bg-[#161B18]"
    >
      {/* Pinned Sticky Viewport (Locks screen while scrolling) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Video: STRICTLY NO AUTOPLAY, NO LOOP, NO POINTER EVENTS */}
        <video
          ref={videoRef}
          playsInline
          muted
          autoPlay
          loop
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          src="/Video/serene heights nathia gali project.mp4"
        />

        {/* Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161B18] via-transparent to-[#161B18]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />

        {/* Phase 1: Identity & Initial Title */}
        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center select-none pointer-events-none"
        >
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#C9BEAE] mb-4">
            NATHIA GALI · 7,800 FT
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#EDE8DF] font-light tracking-tight leading-[0.92]">
            Serene Heights
          </h1>
          <p className="font-sans font-light text-xs sm:text-sm text-[#A8A195] tracking-widest uppercase mt-6">
            SCROLL TO ASCEND
          </p>
        </motion.div>

        {/* Phase 2: Middle Scroll Quote */}
        <motion.div
          style={{ opacity: quoteOpacity }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center pointer-events-none select-none"
        >
          <span className="font-mono text-xs tracking-[0.28em] uppercase text-[#C9BEAE] mb-3">
            ABOVE THE CLOUD LINE
          </span>
          <h2 className="font-serif italic text-4xl sm:text-6xl md:text-7xl text-[#EDE8DF] font-light max-w-3xl leading-snug">
            Where architecture meets the Himalayan horizon.
          </h2>
        </motion.div>

        {/* Bottom Bar Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="relative z-10 w-full px-8 pb-8 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#A8A195] uppercase select-none pointer-events-none"
        >
          <span>00 / 12 ————</span>
          <span className="animate-pulse">↓ SCROLL TO EXPLORE</span>
          <span>7,800 FT</span>
        </motion.div>
      </div>
    </section>
  );
}

export { Hero };
