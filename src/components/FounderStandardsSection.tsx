'use client';

import React, { useState } from 'react';

export const FounderStandardsSection: React.FC = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);

  return (
    <section
      id="elevate"
      data-chapter="elevate"
      className="relative w-full bg-[#161B18] text-[#EAE6DE] select-none"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-20 lg:py-28">
        {/* Main Grid: Sticky Left Column + Scrolling Right Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN (Sticky Founder Portrait) ================= */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28 w-full flex flex-col justify-between">
            {/* Portrait Framing */}
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#202722] shadow-2xl border border-[#7A7468]/20">
              <img
                src="/img/founder-lg.webp"
                alt="Ahmed Khilji, Founder of Elevate Holdings"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>

            {/* Bottom Chapter Tag (Desktop) */}
            <div className="mt-6 hidden lg:flex items-center gap-4">
              <span className="font-mono text-xs tracking-[0.25em] text-[#A8A195]/80 uppercase font-light">
                11 / 12
              </span>
              <span className="w-12 h-[1px] bg-[#A8A195]/30 inline-block" />
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Editorial Content & Scroll Flow) ================= */}
          <div className="lg:col-span-7 flex flex-col space-y-12 sm:space-y-16 lg:pl-6">
            {/* Header Block with Eyebrow and Headline */}
            <div>
              {/* Eyebrow (matching Screenshot 12 —— ELEVATE HOLDINGS) */}
              <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#A8A195] uppercase font-light">
                  12
                </span>
                <span className="w-8 sm:w-10 h-[1px] bg-[#A8A195]/50 inline-block" />
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#A8A195] uppercase font-light">
                  ELEVATE HOLDINGS
                </span>
              </div>

              {/* Three-Line Two-Tone Headline */}
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.2rem] text-[#EAE6DE] leading-[0.95] tracking-tight">
                <span className="block font-normal">Three reserves.</span>
                <span className="block font-normal">Five years.</span>
                <span className="block italic font-light text-[#C9BEAE] mt-1 sm:mt-2">
                  One standard.
                </span>
              </h2>
            </div>

            {/* Editorial Paragraphs */}
            <div className="space-y-6">
              <p className="font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed text-[#C4BCB0] max-w-2xl">
                Six million people visit the Galyat every year, and find almost nothing built to
                receive them. Elevate Holdings builds only in Northern Pakistan: mountain reserves
                designed, built and then operated by the same company. The Nathia Reserve is the
                first of three.
              </p>
              <p className="font-sans font-light text-sm sm:text-base md:text-lg leading-relaxed text-[#C4BCB0] max-w-2xl">
                Founded by Ahmed Khilji, an operator before a developer, whose team has run 24/7
                guest operations for 4,000+ properties worldwide.
              </p>
            </div>

            {/* Editorial Pull Quote */}
            <div className="py-2 my-2">
              <span className="text-4xl sm:text-5xl text-[#C9BEAE] font-serif mb-2 leading-none block select-none">
                “
              </span>
              <p className="font-serif italic font-light text-2xl sm:text-3xl md:text-4xl text-[#C9BEAE] leading-snug tracking-normal">
                We are building the addresses Pakistan deserves. It begins on the Nathia road.
              </p>
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light mt-6 block">
                AHMED KHILJI · FOUNDER — ELEVATE HOLDINGS
              </span>
            </div>

            {/* Credits Grid (Two-Column Partnership) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-[#7A7468]/20">
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#A8A195] uppercase font-light mb-2 block">
                  ARCHITECTURE
                </span>
                <span className="font-serif text-xl sm:text-2xl text-[#EAE6DE] font-normal block">
                  Noor Khan Design Studio
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#A8A195] uppercase font-light mb-2 block">
                  PRINCIPAL CONTRACTOR
                </span>
                <span className="font-serif text-xl sm:text-2xl text-[#EAE6DE] font-normal tracking-wide block">
                  ZKB
                </span>
              </div>
            </div>

            {/* Story Action Link */}
            <div>
              <a
                href="#register"
                className="inline-flex items-center gap-3 font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#EAE6DE] hover:text-[#C9BEAE] transition-colors pb-1 border-b border-[#EAE6DE]/30 hover:border-[#C9BEAE] self-start cursor-pointer"
              >
                <span>THE FULL STORY</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM GLOBAL STATUS BAR ================= */}
        <div className="pt-16 pb-8 flex items-center justify-between text-[#EAE6DE] mt-16 sm:mt-20 border-t border-[#7A7468]/15">
          {/* Left: 11 / 12 */}
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#EAE6DE] font-semibold">
              11 / 12
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-[#EAE6DE]/30 inline-block" />
          </div>

          {/* Right: Sound Toggle */}
          <div>
            <button
              onClick={() => setIsSoundOn((prev) => !prev)}
              type="button"
              className="flex items-center space-x-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#EAE6DE]/70 hover:text-[#EAE6DE] uppercase transition-colors cursor-pointer"
            >
              <span className="font-mono tracking-widest text-[#C9BEAE]">
                {isSoundOn ? '||||' : '....'}
              </span>
              <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
