'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Track scroll progress across the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Apply smooth spring physics to avoid frame stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001,
  });

  // Handle video metadata and scroll-to-frame linking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsReady(true);
      video.pause();
      video.currentTime = 0;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (video && video.duration && !isNaN(video.duration)) {
        // Scrub video timeline directly via scroll
        video.currentTime = Math.min(
          Math.max(latest * video.duration, 0.001),
          video.duration - 0.05
        );
      }
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      unsubscribe();
    };
  }, [smoothProgress]);

  // Audio toggle
  const toggleSound = () => {
    setIsSoundOn((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = !next;
      }
      return next;
    });
  };

  // Dynamic overlays tied to scroll progress
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 0.8, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.96]);
  const secondaryOpacity = useTransform(scrollYProgress, [0.35, 0.6, 0.85], [0, 1, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={containerRef} id="hero" data-chapter="hero" className="relative h-[320vh] bg-[#161B18]">
      {/* Sticky Fullscreen Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Background Scrubbed Video */}
        <video
          ref={videoRef}
          playsInline
          muted={!isSoundOn}
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          src="/Video/Nathia%20gali%20project.mp4"
        />

        {/* Luxury Vignette & Contrast Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161B18] via-transparent to-[#161B18]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Phase 1 Overlay: Main Hero Identity */}
        <motion.div
          style={{ opacity: titleOpacity, scale: titleScale }}
          className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center select-none"
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

        {/* Phase 2 Overlay: Floating Elevation Milestone */}
        <motion.div
          style={{ opacity: secondaryOpacity }}
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
          style={{ opacity: scrollIndicatorOpacity }}
          className="relative z-10 w-full px-8 pb-8 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-[#A8A195] uppercase select-none"
        >
          <span>00 / 12 ————</span>
          <span className="animate-pulse">↓ SCROLL TO EXPLORE</span>
          <button
            type="button"
            onClick={toggleSound}
            className="hover:text-[#EDE8DF] transition-colors cursor-pointer"
          >
            {isSoundOn ? '.... SOUND ON' : '.... SOUND OFF'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
