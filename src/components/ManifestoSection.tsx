'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const ManifestoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Track scroll position through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  // Softened spring smoothing for buttery 60fps lerp
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 24,
    restDelta: 0.001,
  });

  // Left Side Image: Scales smoothly from 0.88 to 1.0 on scroll
  const imageScale = useTransform(smoothProgress, [0, 1], [0.88, 1.0]);
  const imageOpacity = useTransform(smoothProgress, [0, 0.4], [0.6, 1.0]);

  // Right Side Display Statement: Translates from y: 40 to y: 0 with opacity: [0, 1]
  const headlineY = useTransform(smoothProgress, [0.15, 0.85], [40, 0]);
  const headlineOpacity = useTransform(smoothProgress, [0.15, 0.75], [0, 1]);

  // Sub-statement Paragraph: Staggered slightly after headline
  const subY = useTransform(smoothProgress, [0.3, 0.95], [30, 0]);
  const subOpacity = useTransform(smoothProgress, [0.3, 0.85], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      data-chapter="manifesto"
      className="min-h-screen w-full bg-[#F4F1EA] text-[#121614] flex items-center relative overflow-hidden px-8 md:px-12 lg:px-16 xl:px-24 py-28 md:py-36"
    >
      <div className="w-full flex flex-col lg:flex-row items-center justify-between relative z-10">
        {/* Left Side: Scroll-Driven Expanding Architectural Image */}
        <div className="w-full lg:w-[46%] h-[68vh] md:h-[78vh] lg:h-[86vh] relative overflow-hidden rounded-[2px] shadow-[0_25px_60px_-15px_rgba(26,34,28,0.22)] border border-[#121614]/10 shrink-0">
          <motion.div
            style={{
              scale: imageScale,
              opacity: imageOpacity,
            }}
            className="w-full h-full relative overflow-hidden will-change-transform"
          >
            <img
              src="/pictures/home/largestResort.png"
              alt="Serene Heights Nathia Gali 5-Star Mountain Resort Panoramic Exterior"
              className="w-full h-full object-cover object-center pointer-events-none select-none"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Right Side: Editorial Typography Stagger Reveal */}
        <div className="w-full lg:w-[50%] lg:pl-16 xl:pl-24 flex flex-col justify-center text-left mt-10 lg:mt-0">
          {/* Display Statement */}
          <motion.h2
            style={{
              y: headlineY,
              opacity: headlineOpacity,
            }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] tracking-tight text-[#1A221C] font-normal mb-8 will-change-transform"
          >
            Serene Heights Nathia Gali is built to the highest standard of luxury Pakistan has ever seen: the premier 5-star mountain resort in the country.
          </motion.h2>

          {/* Sub-statement Paragraph */}
          <motion.p
            style={{
              y: subY,
              opacity: subOpacity,
            }}
            className="font-sans text-base md:text-lg text-[#2A302B]/80 font-light leading-relaxed max-w-xl will-change-transform"
          >
            Both a private residence and a fully managed retreat: staffed, serviced and alive through all four seasons across 30+ Kanals.
          </motion.p>
        </div>
      </div>

      {/* Persistent Bottom Bar (Matching Reference image_5fb07f.png) */}
      <div className="absolute bottom-8 left-0 w-full px-8 md:px-16 z-20 pointer-events-none select-none flex items-end justify-between">
        {/* Bottom-Left: "02 / 12" + slender line */}
        <div className="flex items-center pointer-events-auto">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-[#121614] uppercase font-medium">
            02 / 12
          </span>
          <span className="w-12 md:w-16 h-[1.5px] bg-[#121614]/30 ml-4 inline-block align-middle" />
        </div>

        {/* Bottom-Right: Audio Indicator */}
        <div className="flex items-center pointer-events-auto ml-auto">
          <button
            onClick={() => setIsMuted((prev) => !prev)}
            type="button"
            className="font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#121614]/75 hover:text-[#121614] uppercase transition-colors"
          >
            {isMuted ? '.... SOUND OFF' : '.... SOUND ON'}
          </button>
        </div>
      </div>
    </section>
  );
};
