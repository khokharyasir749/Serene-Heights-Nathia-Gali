'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';

interface TimePhase {
  id: string;
  time: string;
  label: string;
  headline: string;
  img: string;
  targetRatio: number;
}

const PHASES: TimePhase[] = [
  {
    id: '0700',
    time: '07:00',
    label: 'FIRST LIGHT',
    headline: 'Breakfast above the mist line.',
    img: '/img/day-0700-lg.webp',
    targetRatio: 0.08,
  },
  {
    id: '1300',
    time: '13:00',
    label: 'MIDDAY',
    headline: 'Laps in the heated infinity pool.',
    img: '/pictures/home/image3.png',
    targetRatio: 0.38,
  },
  {
    id: '1830',
    time: '18:30',
    label: 'GOLDEN HOUR',
    headline: 'Sunset over the pine valley from 7,906 FT.',
    img: '/pictures/home/largestResort.png',
    targetRatio: 0.68,
  },
  {
    id: '2200',
    time: '22:00',
    label: 'NIGHTFALL',
    headline: 'Stars over the snow ridge. Silence below.',
    img: '/pictures/home/frames/frame4.png',
    targetRatio: 0.92,
  },
];

export const OneDaySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  const [activePhase, setActivePhase] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Track scroll position across the extended 550vh runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Softened, luxurious spring physics for slow and controlled scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 30,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // ================= 1. TRUE CONTINUOUS CROSS-DISSOLVE INTERPOLATION =================
  // Exact requested curves:
  // opacity1: [0, 0.22, 0.32] -> [1, 1, 0]
  const img0Opacity = useTransform(smoothProgress, [0, 0.22, 0.32], [1, 1, 0]);

  // opacity2: [0.18, 0.30, 0.48, 0.58] -> [0, 1, 1, 0]
  const img1Opacity = useTransform(
    smoothProgress,
    [0.18, 0.3, 0.48, 0.58],
    [0, 1, 1, 0]
  );

  // opacity3: [0.46, 0.58, 0.74, 0.84] -> [0, 1, 1, 0]
  const img2Opacity = useTransform(
    smoothProgress,
    [0.46, 0.58, 0.74, 0.84],
    [0, 1, 1, 0]
  );

  // opacity4: [0.72, 0.84, 1.0] -> [0, 1, 1]
  const img3Opacity = useTransform(smoothProgress, [0.72, 0.84, 1.0], [0, 1, 1]);

  // Subtle cinematic zoom drift: [1.02 -> 1.0] across the sticky runway
  const bgScale = useTransform(smoothProgress, [0, 1], [1.02, 1.0]);

  // ================= 2. SUN / MOON CELESTIAL ORB ARC MOVEMENT =================
  const orbX = useTransform(smoothProgress, [0, 0.5, 1], [-45, -12, 0]);
  const orbY = useTransform(smoothProgress, [0, 0.45, 1], [4, -8, 2]);
  const orbColor = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 0.82, 1],
    ['#f6cb82', '#fde047', '#f97316', '#e2e8f0', '#ffffff']
  );
  const orbShadow = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 0.82, 1],
    [
      '0 0 15px #f6cb82',
      '0 0 20px #fde047',
      '0 0 20px #f97316',
      '0 0 16px rgba(226, 232, 240, 0.7)',
      '0 0 20px rgba(255, 255, 255, 0.95)',
    ]
  );

  // ================= 3. CONTINUOUS DYNAMIC MINUTE-BY-MINUTE CLOCK =================
  // Total span: 7:00 AM (420 mins) to 10:15 PM (1335 mins)
  const formatMinutes = (progress: number): string => {
    const clamped = Math.min(1, Math.max(0, progress));
    const totalMins = Math.floor(420 + clamped * (1335 - 420));
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  };

  // Direct DOM updates for 60FPS lock
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (clockRef.current) {
      clockRef.current.textContent = formatMinutes(latest);
    }

    // Exact phase thresholds matching timestamps:
    // Phase 1 (07:00 - 10:00): progress < 0.20
    // Phase 2 (10:00 - 16:00): progress 0.20 -> 0.59
    // Phase 3 (16:00 - 19:30): progress 0.59 -> 0.82
    // Phase 4 (19:30 - 22:15): progress >= 0.82
    let phase = 0;
    if (latest >= 0.82) phase = 3;
    else if (latest >= 0.59) phase = 2;
    else if (latest >= 0.2) phase = 1;

    if (phase !== activePhase) {
      setActivePhase(phase);
    }
  });

  // Jump to specific time slot upon click
  const handleSlotClick = (slotIdx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;

    const targetRatio = PHASES[slotIdx]?.targetRatio ?? 0.1;
    window.scrollTo({
      top: containerTop + scrollableDistance * targetRatio,
      behavior: 'smooth',
    });
  };

  // Initialize clock on mount
  useEffect(() => {
    if (clockRef.current) {
      clockRef.current.textContent = formatMinutes(smoothProgress.get());
    }
  }, [smoothProgress]);

  const currentPhase = PHASES[activePhase] || PHASES[0];

  return (
    <section
      ref={containerRef}
      id="day"
      data-chapter="day"
      className="relative w-full min-h-[550vh] h-[550vh] bg-[#0c0f0d] text-[#efe9df] z-10"
    >
      {/* Sticky Fullscreen Stage: Locks firmly in place flush at top-0 */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center z-10 select-none">
        {/* ================= 4-PHASE STACKED ARCHITECTURAL CAPTURES ================= */}
        {/* Phase 1: 07:00 First Light */}
        <motion.div
          style={{ opacity: img0Opacity, scale: bgScale }}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-[opacity] z-0 origin-center"
        >
          <img
            src="/img/day-0700-lg.webp"
            alt="Serene Heights at 07:00 First Light"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
            loading="eager"
          />
        </motion.div>

        {/* Phase 2: 13:00 Midday */}
        <motion.div
          style={{ opacity: img1Opacity, scale: bgScale }}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-[opacity] z-0 origin-center"
        >
          <img
            src="/pictures/home/image3.png"
            alt="Serene Heights at 13:00 Midday Heated Pool"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
            loading="eager"
          />
        </motion.div>

        {/* Phase 3: 18:30 Golden Hour */}
        <motion.div
          style={{ opacity: img2Opacity, scale: bgScale }}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-[opacity] z-0 origin-center"
        >
          <img
            src="/pictures/home/largestResort.png"
            alt="Serene Heights at 18:30 Golden Hour"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
            loading="eager"
          />
        </motion.div>

        {/* Phase 4: 22:00 Nightfall */}
        <motion.div
          style={{ opacity: img3Opacity, scale: bgScale }}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-[opacity] z-0 origin-center"
        >
          <img
            src="/pictures/home/frames/frame4.png"
            alt="Serene Heights at 22:00 Nightfall"
            className="w-full h-full object-cover object-center pointer-events-none select-none"
            loading="eager"
          />
        </motion.div>

        {/* Atmospheric vignette & gradient overlays for optimal text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f0d]/65 via-transparent to-[#0c0f0d]/85 pointer-events-none z-10" />

        {/* ================= TOP PINNED AREA: Positioned cleanly beneath fixed Brand Header ================= */}
        <div className="w-full px-8 md:px-16 pt-28 md:pt-32 flex justify-between items-start z-20 shrink-0">
          {/* Top-Left: Chapter Tag */}
          <div className="flex items-center space-x-3 mt-1">
            <span className="font-mono text-xs tracking-[0.25em] text-[#efe9df]/85 uppercase">
              05
            </span>
            <span className="w-8 h-[1px] bg-[#efe9df]/40 inline-block" />
            <span className="font-mono text-xs tracking-[0.3em] text-[#efe9df]/85 uppercase font-medium">
              ONE DAY AT SERENE HEIGHTS
            </span>
          </div>

          {/* ================= TOP-RIGHT DYNAMIC CLOCK & CELESTIAL ORB ================= */}
          <div className="flex flex-col items-end">
            {/* Luminous Sun/Moon Orb moving along an arc */}
            <motion.div
              style={{
                x: orbX,
                y: orbY,
                backgroundColor: orbColor,
                boxShadow: orbShadow,
              }}
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full mb-1.5 transition-shadow duration-300 will-change-transform"
            />

            {/* Massive Serif Clock Figures */}
            <span
              ref={clockRef}
              style={{
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontFeatureSettings: '"lnum" 1, "tnum" 1',
              }}
              className="font-serif text-7xl sm:text-8xl md:text-9xl text-[#efe9df] tracking-tight leading-none tabular-nums lining-nums drop-shadow-2xl select-none"
            >
              07:00
            </span>

            {/* Clean Underline Hairline Rule */}
            <div className="w-full h-[1px] bg-white/30 my-2" />

            {/* Micro Location Label */}
            <span className="font-mono text-[10px] md:text-xs tracking-[0.35em] text-[#efe9df]/70 text-right uppercase">
              NATHIA GALI
            </span>
          </div>
        </div>

        {/* ================= BOTTOM CONTENT AREA ================= */}
        <div className="w-full px-8 md:px-16 pb-8 md:pb-10 flex flex-col justify-end z-20 shrink-0">
          {/* Editorial Headline with clean vertical float & fade */}
          <div className="mb-6 md:mb-10 max-w-3xl min-h-[4.5rem] flex items-end">
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentPhase.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] font-light leading-tight drop-shadow-md"
              >
                {currentPhase.headline}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* ================= 4-SLOT PERSISTENT TIMELINE BAR ================= */}
          <div className="w-full relative">
            {/* Continuous smooth sliding progress line */}
            <div className="relative w-full h-[2px] bg-[#efe9df]/15 mb-4 overflow-hidden rounded-full">
              <motion.div
                style={{
                  scaleX: smoothProgress,
                  transformOrigin: 'left',
                }}
                className="absolute left-0 top-0 bottom-0 w-full bg-[#efe9df] will-change-transform"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-start">
              {PHASES.map((p, idx) => {
                const isActive = activePhase === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSlotClick(idx)}
                    type="button"
                    className="flex flex-col text-left group cursor-pointer transition-all relative"
                  >
                    {/* Active highlight indicator bar */}
                    <div
                      className={`h-[2px] transition-all duration-300 -mt-[18px] mb-3.5 ${
                        isActive
                          ? 'w-12 bg-[#efe9df]'
                          : 'w-0 bg-transparent group-hover:w-6 group-hover:bg-[#efe9df]/40'
                      }`}
                    />

                    {/* Time */}
                    <span
                      className={`font-mono text-[10px] md:text-xs transition-colors ${
                        isActive
                          ? 'text-[#efe9df] font-medium'
                          : 'text-[#efe9df]/45 group-hover:text-[#efe9df]/75'
                      }`}
                    >
                      {p.time}
                    </span>

                    {/* Title */}
                    <span
                      className={`font-mono text-xs md:text-sm tracking-[0.25em] font-medium uppercase mt-1 transition-colors ${
                        isActive
                          ? 'text-[#efe9df]'
                          : 'text-[#efe9df]/45 group-hover:text-[#efe9df]/75'
                      }`}
                    >
                      {p.label}
                    </span>

                    {/* Under slot 1: Chapter 05 / 12 indicator */}
                    {idx === 0 && (
                      <div className="flex items-center mt-3 pt-2">
                        <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#efe9df]/75 uppercase">
                          05 / 12
                        </span>
                        <span className="w-8 h-[1px] bg-[#efe9df]/30 ml-2 inline-block" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom-Right: Audio Indicator */}
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              type="button"
              className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#efe9df]/60 hover:text-[#efe9df] uppercase transition-colors"
            >
              {isMuted ? '.... SOUND OFF' : '.... SOUND ON'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
