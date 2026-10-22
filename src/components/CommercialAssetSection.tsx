'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const CommercialAssetSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Frame-Locked Center Zoom Animation on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.7], [1.0, 1.15]);

  const bulletPoints = [
    'Every residence is managed within Serene Heights hotel operations',
    'Bookings, housekeeping and maintenance: all handled',
    'One operator, one 5-star standard, year round: no caretaker, no chowkidar',
    'Overseas buyers welcome: 28 days annual stay & monthly rental returns',
  ];

  return (
    <section
      ref={containerRef}
      id="ownership"
      data-chapter="ownership"
      className="relative w-full bg-[#F4F1EA] text-[#1E2621] select-none"
    >
      {/* ================= HEADER BLOCK (image_f9c2fc.png) ================= */}
      <div className="pt-28 pb-14 px-8 sm:px-14 md:px-20 max-w-[1720px] mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#7A7468] uppercase font-light">
            10
          </span>
          <span className="w-8 sm:w-10 h-[1px] bg-[#7A7468]/50 inline-block" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#7A7468] uppercase font-light">
            A COMMERCIAL ASSET
          </span>
        </div>

        {/* Two-Tone Display Headline */}
        <h2 className="tracking-tight leading-[0.92]">
          <span className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-[#1E2621] leading-[0.92] tracking-tight block">
            Own it. Earn from it.
          </span>
          <span className="font-serif italic font-light text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-[#9B8E7D] leading-[0.95] tracking-normal block mt-2 sm:mt-3">
            Never worry about it.
          </span>
        </h2>

        {/* Decorative Accent Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9BEAE] mt-8 mb-4" />
      </div>

      {/* ================= MAIN TWO-COLUMN SPLIT (image_f9c353.png) ================= */}
      <div className="px-8 sm:px-14 md:px-20 pb-24 max-w-[1720px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Editorial & Bullet Specs */}
        <div className="lg:col-span-6 flex flex-col justify-start">
          {/* Lead Editorial Paragraph */}
          <p className="font-serif text-xl sm:text-2xl md:text-[1.75rem] text-[#1E2621] font-light leading-[1.35] tracking-tight mb-10">
            This is an income asset, not just a second home. After handover Serene Heights operates
            as a premier full-service 5-star mountain resort, open all four seasons and staffed
            year-round. Every one of the 150+ suites across 3 towers is managed inside that operation
            by Serene Heights&apos; dedicated hospitality team. You hold deed ownership with 28 days
            free annual stay; the rest of the year it generates monthly rental returns.
          </p>

          {/* Feature Bullet List with Hairline Dividers */}
          <div className="w-full">
            {bulletPoints.map((point, idx) => (
              <div
                key={idx}
                className={`border-t border-[#1E2621]/15 py-4 flex items-start gap-3.5 ${
                  idx === bulletPoints.length - 1 ? 'border-b border-[#1E2621]/15' : ''
                }`}
              >
                <span className="text-[#9B8E7D] text-lg leading-none select-none mt-0.5">•</span>
                <p className="font-sans font-light text-sm sm:text-base text-[#4A524D] leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Frame-Locked Center Zoom Picture */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
          <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.8] lg:aspect-[4/4.6] rounded-2xl overflow-hidden bg-[#EAE6DE] shadow-2xl">
            {/* Smooth Zoom Image clipped neatly inside the rounded container */}
            <motion.img
              src="/pictures/home/nathiagaliResort/nathiagaliResort.png"
              alt="Grand Resort Architecture at Serene Heights Nathia Gali"
              style={{ scale }}
              className="w-full h-full object-cover will-change-transform origin-center"
              loading="lazy"
            />
            {/* Subtle natural ambient gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
