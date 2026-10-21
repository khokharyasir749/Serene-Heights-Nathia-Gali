'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { Compass } from 'lucide-react';

interface MeasureSectionProps {
  onOpenExplorer?: () => void;
}

export const MeasureSection: React.FC<MeasureSectionProps> = ({ onOpenExplorer }) => {
  const containerRef = useRef<HTMLElement>(null);
  const altitudeRef = useRef<HTMLSpanElement>(null);
  const residencesRef = useRef<HTMLSpanElement>(null);
  const daysRef = useRef<HTMLSpanElement>(null);
  const mainRoadRef = useRef<HTMLSpanElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [activeStep, setActiveStep] = useState(0);

  // Track scroll position across the extended 850vh runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth, luxurious spring physics for slow and controlled scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 30,
    mass: 0.8,
    restDelta: 0.0005,
  });

  // Parallax subtle scale for backgrounds
  const bgScale1 = useTransform(smoothProgress, [0, 0.28], [1.08, 1.02]);
  const bgScale2 = useTransform(smoothProgress, [0.24, 0.55], [1.08, 1.02]);
  const bgScale3 = useTransform(smoothProgress, [0.48, 0.81], [1.08, 1.02]);
  const bgScale4 = useTransform(smoothProgress, [0.75, 1], [1.08, 1.02]);

  // Background Crossfades
  const slide1BgOpacity = useTransform(smoothProgress, [0.22, 0.27], [1, 0]);
  const slide2BgOpacity = useTransform(
    smoothProgress,
    [0.23, 0.28, 0.49, 0.54],
    [0, 1, 1, 0]
  );
  const slide3BgOpacity = useTransform(
    smoothProgress,
    [0.5, 0.55, 0.75, 0.8],
    [0, 1, 1, 0]
  );
  const slide4BgOpacity = useTransform(smoothProgress, [0.76, 0.81], [0, 1]);

  // ================= PHASE 1 (01 / 04 - Above Sea Level): 0,000 -> 7,900 FT =================
  const altitudeValue = useTransform(smoothProgress, [0.02, 0.16], [0, 7900]);
  const slide1InfoOpacity = useTransform(smoothProgress, [0.1, 0.16], [0, 1]);
  const slide1InfoY = useTransform(smoothProgress, [0.1, 0.16], [24, 0]);
  const slide1Opacity = useTransform(smoothProgress, [0.22, 0.27], [1, 0]);
  const slide1Y = useTransform(smoothProgress, [0.22, 0.27], [0, -28]);

  // ================= PHASE 2 (02 / 04 - Private Residences): 0 -> 133 =================
  const slide2Opacity = useTransform(
    smoothProgress,
    [0.25, 0.3, 0.49, 0.54],
    [0, 1, 1, 0]
  );
  const slide2Y = useTransform(
    smoothProgress,
    [0.25, 0.3, 0.49, 0.54],
    [28, 0, 0, -28]
  );
  const residencesValue = useTransform(smoothProgress, [0.3, 0.44], [0, 133]);
  const slide2InfoOpacity = useTransform(smoothProgress, [0.38, 0.44], [0, 1]);
  const slide2InfoY = useTransform(smoothProgress, [0.38, 0.44], [20, 0]);

  // ================= PHASE 3 (03 / 04 - Days A Year · Hotel Operated): 0 -> 365 =================
  const slide3Opacity = useTransform(
    smoothProgress,
    [0.52, 0.57, 0.75, 0.8],
    [0, 1, 1, 0]
  );
  const slide3Y = useTransform(
    smoothProgress,
    [0.52, 0.57, 0.75, 0.8],
    [28, 0, 0, -28]
  );
  const daysValue = useTransform(smoothProgress, [0.57, 0.7], [0, 365]);
  const slide3InfoOpacity = useTransform(smoothProgress, [0.64, 0.7], [0, 1]);
  const slide3InfoY = useTransform(smoothProgress, [0.64, 0.7], [20, 0]);

  // ================= PHASE 4 (04 / 04 - Development On The Main Road): 1. =================
  const slide4Opacity = useTransform(smoothProgress, [0.78, 0.83], [0, 1]);
  const slide4Y = useTransform(smoothProgress, [0.78, 0.83], [28, 0]);
  const mainRoadValue = useTransform(smoothProgress, [0.79, 0.86], [0, 1]);
  const slide4InfoOpacity = useTransform(smoothProgress, [0.84, 0.9], [0, 1]);
  const slide4InfoY = useTransform(smoothProgress, [0.84, 0.9], [20, 0]);

  // Pure integer formatting: "0,000" -> "7,900" with zero decimals
  const formatAltitude = (val: number): string => {
    const clamped = Math.min(7900, Math.max(0, Math.floor(val)));
    const thousands = Math.floor(clamped / 1000);
    const remainder = (clamped % 1000).toString().padStart(3, '0');
    return `${thousands},${remainder}`;
  };

  // Direct DOM updates for 60FPS lock without React re-render stutter
  useMotionValueEvent(altitudeValue, 'change', (latest) => {
    if (altitudeRef.current) {
      altitudeRef.current.textContent = formatAltitude(latest);
    }
  });

  useMotionValueEvent(residencesValue, 'change', (latest) => {
    if (residencesRef.current) {
      const count = Math.min(133, Math.max(0, Math.round(latest)));
      residencesRef.current.textContent = count.toString();
    }
  });

  useMotionValueEvent(daysValue, 'change', (latest) => {
    if (daysRef.current) {
      const count = Math.min(365, Math.max(0, Math.round(latest)));
      daysRef.current.textContent = count.toString();
    }
  });

  useMotionValueEvent(mainRoadValue, 'change', (latest) => {
    if (mainRoadRef.current) {
      const count = Math.round(latest);
      mainRoadRef.current.textContent = `${count}.`;
    }
  });

  // Sync active step state with scroll progression
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (latest >= 0.77) {
      if (activeStep !== 3) setActiveStep(3);
    } else if (latest >= 0.52) {
      if (activeStep !== 2) setActiveStep(2);
    } else if (latest >= 0.25) {
      if (activeStep !== 1) setActiveStep(1);
    } else {
      if (activeStep !== 0) setActiveStep(0);
    }
  });

  // Handle timeline clicks to jump smoothly to respective slide
  const handleStepClick = (idx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollableDistance = containerHeight - windowHeight;

    let targetRatio = 0;
    if (idx === 0) targetRatio = 0.08;
    else if (idx === 1) targetRatio = 0.36;
    else if (idx === 2) targetRatio = 0.63;
    else if (idx === 3) targetRatio = 0.9;

    window.scrollTo({
      top: containerTop + scrollableDistance * targetRatio,
      behavior: 'smooth',
    });
  };

  // Initialize values on mount
  useEffect(() => {
    if (altitudeRef.current) {
      altitudeRef.current.textContent = formatAltitude(altitudeValue.get());
    }
    if (residencesRef.current) {
      residencesRef.current.textContent = Math.min(
        133,
        Math.max(0, Math.round(residencesValue.get()))
      ).toString();
    }
    if (daysRef.current) {
      daysRef.current.textContent = Math.min(
        365,
        Math.max(0, Math.round(daysValue.get()))
      ).toString();
    }
    if (mainRoadRef.current) {
      mainRoadRef.current.textContent = `${Math.round(mainRoadValue.get())}.`;
    }
  }, [altitudeValue, residencesValue, daysValue, mainRoadValue]);

  return (
    <section
      ref={containerRef}
      id="numbers"
      data-chapter="numbers"
      className="relative w-full min-h-[850vh] h-[850vh] bg-[#121614] text-[#efe9df] z-10"
    >
      {/* Pinned Sticky Stage: Locks firmly in place flush at top-0 */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between items-center z-10 select-none">
        {/* ================= BACKGROUND 1: Sunset Cloud-Sea (Slide 01) ================= */}
        <motion.div
          style={{
            scale: bgScale1,
            opacity: slide1BgOpacity,
          }}
          className="absolute -top-[6%] -bottom-[6%] -left-[6%] -right-[6%] w-[112%] h-[112%] pointer-events-none will-change-transform z-0 origin-center overflow-hidden"
        >
          <img
            src="/img/the%20nathi.png"
            alt="The Nathia Reserve Sunset Cloud Sea"
            className="w-full h-full object-cover object-center pointer-events-none select-none scale-105"
            style={{
              filter: 'blur(6px) brightness(0.42) contrast(1.02)',
            }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f0d]/50 via-transparent to-[#0c0f0d]/80 pointer-events-none" />
        </motion.div>

        {/* ================= BACKGROUND 2: Evening Facade Render (Slide 02) ================= */}
        <motion.div
          style={{
            scale: bgScale2,
            opacity: slide2BgOpacity,
          }}
          className="absolute -top-[6%] -bottom-[6%] -left-[6%] -right-[6%] w-[112%] h-[112%] pointer-events-none will-change-transform z-0 origin-center overflow-hidden"
        >
          <img
            src="/img/day-2200-lg.webp"
            alt="The Nathia Reserve Night Architectural Facade"
            className="w-full h-full object-cover object-center pointer-events-none select-none scale-105"
            style={{
              filter: 'blur(6px) brightness(0.38) contrast(1.05)',
            }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f0d]/50 via-transparent to-[#0c0f0d]/80 pointer-events-none" />
        </motion.div>

        {/* ================= BACKGROUND 3: Daytime Architectural Facade (Slide 03) ================= */}
        <motion.div
          style={{
            scale: bgScale3,
            opacity: slide3BgOpacity,
          }}
          className="absolute -top-[6%] -bottom-[6%] -left-[6%] -right-[6%] w-[112%] h-[112%] pointer-events-none will-change-transform z-0 origin-center overflow-hidden"
        >
          <img
            src="/img/day-1300-lg.webp"
            alt="The Nathia Reserve Daytime Architectural Facade"
            className="w-full h-full object-cover object-center pointer-events-none select-none scale-105"
            style={{
              filter: 'blur(6px) brightness(0.38) contrast(1.05)',
            }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f0d]/50 via-transparent to-[#0c0f0d]/80 pointer-events-none" />
        </motion.div>

        {/* ================= BACKGROUND 4: Aerial View Curved Estate (Slide 04) ================= */}
        <motion.div
          style={{
            scale: bgScale4,
            opacity: slide4BgOpacity,
          }}
          className="absolute -top-[6%] -bottom-[6%] -left-[6%] -right-[6%] w-[112%] h-[112%] pointer-events-none will-change-transform z-0 origin-center overflow-hidden"
        >
          <img
            src="/img/aerial-curve-lg.webp"
            alt="The Nathia Reserve Aerial Curve Estate"
            className="w-full h-full object-cover object-center pointer-events-none select-none scale-105"
            style={{
              filter: 'blur(6px) brightness(0.38) contrast(1.05)',
            }}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0f0d]/50 via-transparent to-[#0c0f0d]/80 pointer-events-none" />
        </motion.div>

        {/* ================= TOP PINNED BAR: Chapter Eyebrow (Left) ================= */}
        <div className="w-full px-8 md:px-16 pt-16 md:pt-20 flex justify-between items-center z-30 shrink-0">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xs tracking-[0.25em] text-[#efe9df]/85 uppercase">
              03
            </span>
            <span className="w-8 h-[1px] bg-[#efe9df]/40 inline-block" />
            <span className="font-mono text-xs tracking-[0.3em] text-[#efe9df]/85 uppercase font-medium">
              THE MEASURE
            </span>
          </div>
        </div>

        {/* ================= PINNED EXPLORE RING (Center-Right) ================= */}
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

        {/* ================= SLIDE 01: 7,900 FT (Above Sea Level) ================= */}
        <motion.div
          style={{
            opacity: slide1Opacity,
            y: slide1Y,
            pointerEvents: activeStep === 0 ? 'auto' : 'none',
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 w-full will-change-transform"
        >
          <div className="relative inline-flex items-baseline justify-center">
            {/* Crisp, Sharp, Glowing Text-Masked Digits (100% unblurred) */}
            <span
              ref={altitudeRef}
              style={{
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontFeatureSettings: '"lnum" 1, "tnum" 1',
                backgroundImage:
                  'url(/img/the%20nathi.png), linear-gradient(180deg, #FFFFFF 0%, #F5E8D3 55%, #C2AC8F 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 45%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                filter:
                  'drop-shadow(0 25px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 1px rgba(239,233,223,0.35))',
              }}
              className="text-[16vw] md:text-[20vw] leading-none font-serif tracking-tight font-normal text-center select-none will-change-transform inline-block tabular-nums lining-nums"
            >
              0,000
            </span>

            <span className="text-[1.8vw] md:text-[1.4vw] font-mono tracking-widest text-[#efe9df]/85 uppercase ml-2 md:ml-4 select-none self-start mt-4 md:mt-8 inline-block drop-shadow">
              FT
            </span>
          </div>

          <motion.div
            style={{
              opacity: slide1InfoOpacity,
              y: slide1InfoY,
            }}
            className="flex flex-col items-center text-center mt-4 md:mt-6 will-change-transform max-w-2xl px-4"
          >
            {/* Micro Indicator: 01 / 04 */}
            <span className="font-mono text-xs md:text-sm tracking-[0.35em] text-[#efe9df]/75 uppercase">
              01 / 04
            </span>

            {/* Title: ABOVE SEA LEVEL */}
            <h3 className="font-mono text-xs md:text-sm tracking-[0.3em] font-semibold text-[#efe9df] uppercase mt-2">
              ABOVE SEA LEVEL
            </h3>

            {/* Subtext */}
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-center text-[#efe9df] font-light mt-3 tracking-wide drop-shadow-md">
              Roughly 2,400 metres. Above the mist line.
            </p>
          </motion.div>
        </motion.div>

        {/* ================= SLIDE 02: 133 (Private Residences) ================= */}
        <motion.div
          style={{
            opacity: slide2Opacity,
            y: slide2Y,
            pointerEvents: activeStep === 1 ? 'auto' : 'none',
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 w-full will-change-transform"
        >
          {/* Giant Illuminated Architectural Mask Digits */}
          <div className="relative inline-flex items-baseline justify-center">
            <span
              ref={residencesRef}
              style={{
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontFeatureSettings: '"lnum" 1, "tnum" 1',
                backgroundImage:
                  'url(/img/day-2200-lg.webp), linear-gradient(180deg, #FFFFFF 0%, #F5E8D3 55%, #C2AC8F 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 38%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                filter:
                  'drop-shadow(0 25px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 1px rgba(239,233,223,0.35))',
              }}
              className="text-[20vw] md:text-[22vw] leading-none font-serif tracking-tight font-normal text-center select-none will-change-transform inline-block tabular-nums lining-nums"
            >
              0
            </span>
          </div>

          {/* Typography & Indicators matching reference */}
          <motion.div
            style={{
              opacity: slide2InfoOpacity,
              y: slide2InfoY,
            }}
            className="flex flex-col items-center text-center mt-3 md:mt-5 will-change-transform px-4 max-w-2xl"
          >
            {/* Micro Indicator: 02 / 04 */}
            <span className="font-mono text-xs md:text-sm tracking-[0.35em] text-[#efe9df]/70 uppercase">
              02 / 04
            </span>

            {/* Title: PRIVATE RESIDENCES */}
            <h3 className="font-mono text-xs md:text-sm tracking-[0.3em] font-semibold text-[#efe9df] uppercase mt-2">
              PRIVATE RESIDENCES
            </h3>

            {/* Subtext: Two towers, joined by a glass skywalk. */}
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-center text-[#efe9df] font-light mt-3 tracking-wide drop-shadow-md">
              Two towers, joined by a glass skywalk.
            </p>
          </motion.div>
        </motion.div>

        {/* ================= SLIDE 03: 365 (Days A Year · Hotel Operated) ================= */}
        <motion.div
          style={{
            opacity: slide3Opacity,
            y: slide3Y,
            pointerEvents: activeStep === 2 ? 'auto' : 'none',
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 w-full will-change-transform"
        >
          {/* Giant Daytime Architectural Mask Digits */}
          <div className="relative inline-flex items-baseline justify-center">
            <span
              ref={daysRef}
              style={{
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontFeatureSettings: '"lnum" 1, "tnum" 1',
                backgroundImage:
                  'url(/img/day-1300-lg.webp), linear-gradient(180deg, #FFFFFF 0%, #F5E8D3 55%, #C2AC8F 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 38%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                filter:
                  'drop-shadow(0 25px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 1px rgba(239,233,223,0.35))',
              }}
              className="text-[20vw] md:text-[22vw] leading-none font-serif tracking-tight font-normal text-center select-none will-change-transform inline-block tabular-nums lining-nums"
            >
              0
            </span>
          </div>

          {/* Typography & Indicators matching image_6dd762.png */}
          <motion.div
            style={{
              opacity: slide3InfoOpacity,
              y: slide3InfoY,
            }}
            className="flex flex-col items-center text-center mt-3 md:mt-5 will-change-transform px-4 max-w-2xl"
          >
            {/* Micro Indicator: 03 / 04 */}
            <span className="font-mono text-xs md:text-sm tracking-[0.35em] text-[#efe9df]/70 uppercase">
              03 / 04
            </span>

            {/* Title: DAYS A YEAR · HOTEL OPERATED */}
            <h3 className="font-mono text-xs md:text-sm tracking-[0.3em] font-semibold text-[#efe9df] uppercase mt-2">
              DAYS A YEAR · HOTEL OPERATED
            </h3>

            {/* Subtext */}
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-center text-[#efe9df] font-light mt-3 tracking-wide drop-shadow-md">
              Staffed and serviced through all four seasons.
            </p>
          </motion.div>
        </motion.div>

        {/* ================= SLIDE 04: 1. (Development On The Main Road) ================= */}
        <motion.div
          style={{
            opacity: slide4Opacity,
            y: slide4Y,
            pointerEvents: activeStep === 3 ? 'auto' : 'none',
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 w-full will-change-transform"
        >
          {/* Giant Aerial Curve Mask Digit */}
          <div className="relative inline-flex items-baseline justify-center">
            <span
              ref={mainRoadRef}
              style={{
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontFeatureSettings: '"lnum" 1, "tnum" 1',
                backgroundImage:
                  'url(/img/aerial-curve-lg.webp), linear-gradient(180deg, #FFFFFF 0%, #F5E8D3 55%, #C2AC8F 100%)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 40%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                filter:
                  'drop-shadow(0 25px 50px rgba(0,0,0,0.8)) drop-shadow(0 0 1px rgba(239,233,223,0.35))',
              }}
              className="text-[20vw] md:text-[22vw] leading-none font-serif tracking-tight font-normal text-center select-none will-change-transform inline-block tabular-nums lining-nums"
            >
              1.
            </span>
          </div>

          {/* Typography & Indicators matching image_6de9c5.png */}
          <motion.div
            style={{
              opacity: slide4InfoOpacity,
              y: slide4InfoY,
            }}
            className="flex flex-col items-center text-center mt-3 md:mt-5 will-change-transform px-4 max-w-2xl"
          >
            {/* Micro Indicator: 04 / 04 */}
            <span className="font-mono text-xs md:text-sm tracking-[0.35em] text-[#efe9df]/70 uppercase">
              04 / 04
            </span>

            {/* Title: DEVELOPMENT ON THE MAIN ROAD */}
            <h3 className="font-mono text-xs md:text-sm tracking-[0.3em] font-semibold text-[#efe9df] uppercase mt-2">
              DEVELOPMENT ON THE MAIN ROAD
            </h3>

            {/* Editorial Headline */}
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-center text-[#efe9df] font-light mt-3 tracking-wide drop-shadow-md max-w-2xl">
              The only private residence estate on the main Nathia Gali road.
            </p>
          </motion.div>
        </motion.div>

        {/* ================= BOTTOM PERSISTENT BAR & MULTI-SEGMENT TIMELINE ================= */}
        <div className="w-full px-8 md:px-16 pb-8 flex items-end justify-between pointer-events-none select-none z-30 shrink-0">
          {/* Bottom-Left: Chapter index "03 / 12" + solid line */}
          <div className="flex items-center pointer-events-auto">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#efe9df] uppercase font-medium">
              03 / 12
            </span>
            <span className="w-12 md:w-16 h-[1.5px] bg-[#efe9df]/40 ml-4 inline-block align-middle" />
          </div>

          {/* Bottom-Center: Multi-Segment Timeline Indicator across all 4 slides */}
          <div className="flex items-center space-x-3 md:space-x-4 pointer-events-auto">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                type="button"
                className={`h-[2px] transition-all duration-300 cursor-pointer ${
                  activeStep === idx
                    ? 'w-10 md:w-14 bg-[#efe9df]'
                    : 'w-6 md:w-8 bg-[#efe9df]/30 hover:bg-[#efe9df]/60'
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
