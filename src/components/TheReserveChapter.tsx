"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TheReserveChapterProps {
  id?: string;
  isMuted?: boolean;
  onToggleSound?: () => void;
}

const easeCubic = [0.25, 0.1, 0.25, 1.0] as const;

export default function TheReserveChapter({
  id = "reserve",
  isMuted: externalMuted,
  onToggleSound,
}: TheReserveChapterProps) {
  const [internalMuted, setInternalMuted] = useState(true);
  const isMuted = externalMuted !== undefined ? externalMuted : internalMuted;

  const handleToggleSound = () => {
    if (onToggleSound) {
      onToggleSound();
    } else {
      setInternalMuted((prev) => !prev);
    }
  };

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Soft subtle parallax for the center architectural image
  const imageParallaxY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  return (
    <section
      ref={sectionRef}
      id={id}
      data-chapter="reserve"
      className="relative min-h-screen w-full bg-[#F5F2EB] text-[#1C1917] flex flex-col justify-between overflow-hidden"
    >
      {/* Main 3-Column Editorial Showcase */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-8 sm:px-14 lg:px-16 pt-28 sm:pt-32 lg:pt-32 pb-12 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Column 1: Left Eyebrow & Staggered Serif Headline */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, ease: easeCubic }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#78716C]">
                02
              </span>
              <span className="w-8 h-[1px] bg-[#78716C]/40" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#78716C]">
                THE RESERVE
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] text-[#1C1917] font-light leading-[1.08] tracking-tight">
              Slower days.<br />
              Deeper breaths.<br />
              <span className="italic font-normal font-serif text-[#8C7E6A]">
                True rest.
              </span>
            </h2>
          </motion.div>

          {/* Column 2: Center Architectural Dusk Frame & Caption */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 25 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.2, delay: 0.1, ease: easeCubic }}
            className="lg:col-span-4 flex flex-col items-center justify-center"
          >
            <div className="w-full max-w-sm sm:max-w-md">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden shadow-2xl rounded-[1px] bg-[#E7E2D8]">
                <motion.div
                  style={{ y: imageParallaxY }}
                  className="w-full h-[110%] -mt-[5%] relative"
                >
                  <img
                    src="/pictures/home/largestResort.png"
                    alt="Serene Heights Nathia Gali - Golden Hour at 7,906 FT"
                    className="w-full h-full object-cover object-[65%_35%] select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                    loading="eager"
                  />
                </motion.div>
              </div>

              {/* Caption */}
              <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#78716C] mt-4 text-center">
                GOLDEN HOUR · 7,906 FT
              </p>
            </div>
          </motion.div>

          {/* Column 3: Right Editorial Prose with delicate leading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.1, delay: 0.25, ease: easeCubic }}
            className="lg:col-span-4 flex flex-col justify-end lg:pt-36 lg:pl-6"
          >
            <p className="font-serif text-lg sm:text-xl lg:text-2xl text-[#292524] font-light leading-relaxed max-w-sm">
              High on the main road of Nathia Gali, composed in stone, timber and glass above an unbroken sweep of protected pine forest.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Persistent Bottom Bar */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 sm:px-14 lg:px-16 pb-8 flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#78716C] uppercase select-none">
        <div className="flex items-center gap-4">
          <span>02 / 12</span>
          <span className="h-[1px] w-8 sm:w-12 bg-[#78716C]/40" />
        </div>

        <button
          onClick={handleToggleSound}
          type="button"
          className="hover:text-[#1C1917] transition-colors cursor-pointer"
        >
          {isMuted ? ".... SOUND OFF" : ".... SOUND ON"}
        </button>
      </div>
    </section>
  );
}

export { TheReserveChapter };
