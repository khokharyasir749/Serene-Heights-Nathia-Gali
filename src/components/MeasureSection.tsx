'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Compass } from 'lucide-react';
import siteData from '@/data/siteData';

interface MeasureSectionProps {
  onOpenExplorer?: () => void;
}

export const MeasureSection: React.FC<MeasureSectionProps> = ({ onOpenExplorer }) => {
  const containerRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  const metrics = [
    {
      value: 7006,
      unit: 'FT',
      label: 'Above sea level',
      note: 'Roughly 2,400 metres. Above the mist line.',
    },
    {
      value: 133,
      unit: '',
      label: 'Private residences',
      note: 'Two towers, joined by a glass skywalk.',
    },
    {
      value: 365,
      unit: '',
      label: 'Days a year',
      note: 'Staffed and serviced through all four seasons.',
    },
    {
      value: 1,
      unit: '',
      label: 'On the main road',
      note: 'The only private residence estate on the main Nathia Gali road.',
    },
  ];

  // Track scroll position across the locked 250vh sticky track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth lag-free scrubbing with stiffness: 80, damping: 25
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Parallax subtle scale & y-shift on the sunset cloud-sea backdrop
  const bgScale = useTransform(smoothProgress, [0, 1], [1.08, 1.0]);
  const bgY = useTransform(smoothProgress, [0, 1], ['0%', '6%']);

  // Digits counter: strictly 0 -> 7006 across scroll progress [0.10 -> 0.85]
  const altitudeValue = useTransform(smoothProgress, [0.1, 0.85], [0, 7006]);

  // Formatter enforcing 0,000.0 -> 7,006.0 with lining-nums and tabular numbers
  const formatAltitude = (val: number): string => {
    const clamped = Math.min(7006, Math.max(0, val));
    const thousands = Math.floor(clamped / 1000);
    const remainder = Math.floor(clamped % 1000)
      .toString()
      .padStart(3, '0');
    const tenths = Math.floor((clamped * 10) % 10);
    return `${thousands},${remainder}.${tenths}`;
  };

  // Direct DOM ref updates to eliminate React re-render stutter and lock 60FPS
  useMotionValueEvent(altitudeValue, 'change', (latest) => {
    if (activeStep === 0 && counterRef.current) {
      counterRef.current.textContent = formatAltitude(latest);
    }
  });

  // Sync active step display if step !== 0
  useEffect(() => {
    if (counterRef.current) {
      if (activeStep === 0) {
        counterRef.current.textContent = formatAltitude(altitudeValue.get());
      } else {
        const item = metrics[activeStep];
        counterRef.current.textContent = item?.value?.toLocaleString('en-US') || '';
      }
    }
  }, [activeStep, altitudeValue, metrics]);

  // Staggered reveal of text below main counter as count approaches 7,006 (0.65 -> 0.85)
  const infoOpacity = useTransform(smoothProgress, [0.65, 0.85], [0, 1]);
  const infoY = useTransform(smoothProgress, [0.65, 0.85], [24, 0]);

  const currentMetric = metrics[activeStep] || metrics[0];

  return (
    <section
      ref={containerRef}
      id="numbers"
      data-chapter="numbers"
      className="relative w-full h-[250vh] bg-[#121614] text-[#efe9df]"
    >
      {/* Pinned Sticky Stage: Locks firmly in place while traversing the 250vh scroll track */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center z-10 select-none">
        {/* Full-bleed sunset cloud-sea backdrop with subtle depth scale */}
        <motion.div
          style={{
            scale: bgScale,
            y: bgY,
          }}
          className="absolute inset-0 w-full h-full pointer-events-none will-change-transform z-0"
        >
          <img
            src="/img/the%20nathi.png"
            alt="The Nathia Reserve Sunset Cloud Sea"
            className="w-full h-full object-cover object-center pointer-events-none select-none brightness-95"
            loading="eager"
          />
          {/* Atmospheric gradient overlay for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f0d]/60 via-transparent to-[#0c0f0d]/85 pointer-events-none" />
        </motion.div>

        {/* Top Eyebrow Tag (Left) */}
        <div className="w-full px-8 md:px-16 pt-16 md:pt-20 flex justify-between items-center z-20 shrink-0">
          <div className="font-mono text-xs tracking-[0.3em] text-[#efe9df]/85 uppercase">
            03 — THE MEASURE
          </div>
        </div>

        {/* Center-Right 'EXPLORE' Ring Link */}
        <button
          onClick={onOpenExplorer}
          type="button"
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-[#efe9df]/10 border border-[#efe9df]/30 backdrop-blur-md flex flex-col justify-center items-center absolute right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 cursor-pointer hover:bg-[#efe9df] hover:text-[#121614] hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl group z-30"
          aria-label="Explore in 3D"
        >
          <Compass className="w-4 h-4 text-[#efe9df] group-hover:text-[#121614] transition-colors mb-0.5 group-hover:rotate-45 duration-500" />
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-semibold text-[#efe9df] group-hover:text-[#121614] transition-colors">
            EXPLORE
          </span>
        </button>

        {/* Massive Center Animated Digits Counter */}
        <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center px-4 w-full">
          <div className="relative inline-flex items-baseline justify-center">
            {/* The Big Digits with Image Masking & Subtle Light Gradient */}
            <span
              ref={counterRef}
              style={{
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontFeatureSettings: '"lnum" 1, "tnum" 1',
                backgroundImage:
                  'url(/img/the%20nathi.png), linear-gradient(180deg, #FFFFFF 0%, #F5E8D3 55%, #C2AC8F 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.45))',
              }}
              className="text-[16vw] md:text-[20vw] leading-none font-serif tracking-tight font-normal text-center select-none will-change-transform inline-block tabular-nums lining-nums"
            >
              0,000.0
            </span>

            {/* Pinned "FT" Unit Label */}
            {currentMetric.unit && (
              <span className="text-[1.8vw] md:text-[1.4vw] font-mono tracking-widest text-[#efe9df]/75 uppercase ml-2 md:ml-4 select-none self-start mt-4 md:mt-8 inline-block">
                {currentMetric.unit}
              </span>
            )}
          </div>

          {/* Staggered Text Reveal Below Main Digit Counter */}
          <motion.div
            style={{
              opacity: infoOpacity,
              y: infoY,
            }}
            className="flex flex-col items-center text-center mt-4 md:mt-6 will-change-transform"
          >
            {/* Index Indicator & Label */}
            <div className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-[#efe9df]/75 mb-2">
              0{activeStep + 1} / 04 — {currentMetric.label.toUpperCase()}
            </div>

            {/* Subtext Headline */}
            <p className="font-serif text-lg md:text-2xl text-center tracking-wide text-[#efe9df] font-light max-w-xl px-4 drop-shadow">
              {currentMetric.note}
            </p>
          </motion.div>
        </div>

        {/* Bottom Persistent Controls & Interactive Multi-Segment Timeline */}
        <div className="w-full px-8 md:px-16 pb-8 flex items-end justify-between pointer-events-none select-none z-20 shrink-0">
          {/* Bottom-Left: Chapter index "03 / 12" + solid line */}
          <div className="flex items-center pointer-events-auto">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#efe9df] uppercase font-medium">
              03 / 12
            </span>
            <span className="w-12 md:w-16 h-[1.5px] bg-[#efe9df]/40 ml-4 inline-block align-middle" />
          </div>

          {/* Bottom-Center: Interactive Multi-Segment Timeline Selector (4 steps) */}
          <div className="flex items-center space-x-2 md:space-x-3 pointer-events-auto">
            {metrics.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                type="button"
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  activeStep === idx
                    ? 'w-8 md:w-12 bg-[#efe9df]'
                    : 'w-4 md:w-6 bg-[#efe9df]/30 hover:bg-[#efe9df]/60'
                }`}
                aria-label={`Step 0${idx + 1}`}
              />
            ))}
          </div>

          {/* Bottom-Right: Audio Indicator */}
          <div className="flex items-center pointer-events-auto ml-auto">
            <button
              onClick={() => setIsMuted((prev) => !prev)}
              type="button"
              className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#efe9df]/75 hover:text-[#efe9df] uppercase transition-colors"
            >
              {isMuted ? '.... SOUND OFF' : '.... SOUND ON'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
