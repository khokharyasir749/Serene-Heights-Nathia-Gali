'use client';

import React, { useRef, useEffect } from 'react';
import { useScroll, useSpring } from 'framer-motion';

interface LocationMapSectionProps {
  onOpenExplorer?: () => void;
}

export const LocationMapSection: React.FC<LocationMapSectionProps> = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Track scroll position across the extended 450vh runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Softened, luxurious spring physics for smooth camera scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    mass: 0.5,
    restDelta: 0.0005,
  });

  // Smooth video playback scrubbing driven 100% by scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    let isRunning = true;
    let targetTime = 0;

    const handleProgressChange = (latest: number) => {
      if (video.duration && !isNaN(video.duration)) {
        targetTime = Math.min(video.duration, Math.max(0, latest * video.duration));
      }
    };

    const unsubscribe = smoothProgress.on('change', handleProgressChange);

    const scrubLoop = () => {
      if (!isRunning) return;

      if (video.duration && !isNaN(video.duration)) {
        const v = video as HTMLVideoElement & { fastSeek?: (t: number) => void };
        if (!v.seeking && Math.abs(v.currentTime - targetTime) > 0.02) {
          if (typeof v.fastSeek === 'function') {
            v.fastSeek(targetTime);
          } else {
            v.currentTime = targetTime;
          }
        }
      }

      requestAnimationFrame(scrubLoop);
    };

    requestAnimationFrame(scrubLoop);

    return () => {
      isRunning = false;
      unsubscribe();
    };
  }, [smoothProgress]);

  return (
    <section
      ref={containerRef}
      id="location-map"
      data-chapter="address"
      className="relative w-full min-h-[450vh] h-[450vh] bg-[#0c0f0d] z-10"
    >
      {/* Sticky Fullscreen Stage: Pure full-bleed video layer without overlays */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center select-none">
        <video
          ref={videoRef}
          src="/Video/3d%20location.mp4"
          playsInline
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>
    </section>
  );
};
