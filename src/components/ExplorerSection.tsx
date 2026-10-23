'use client';

import React, { useState } from 'react';
import siteData from '@/data/siteData';

interface ExplorerSectionProps {
  onOpenExplorer: () => void;
}

export const ExplorerSection: React.FC<ExplorerSectionProps> = ({ onOpenExplorer }) => {
  const [isMuted, setIsMuted] = useState(true);

  const explorerUrl = siteData?.project?.explorerUrl || 'https://nathia-reserve-explorer.vercel.app';

  return (
    <section
      id="explorer"
      data-chapter="explorer"
      className="relative w-full h-screen min-h-screen overflow-hidden bg-black text-[#efe9df] z-20"
    >
      {/* 2. Image Container Full Screen: Edge-to-edge top 0 to bottom 0 */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/pictures/home/Snowy Mountain Resort Among Pines.png"
          alt="Serene Heights Nathia Gali 3D Architectural View"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Subtle dark bottom & top gradients to ensure ultra-crisp typography and buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60 pointer-events-none" />
      </div>

      {/* 3. Navbar & Floating Controls Layering: Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pt-8 sm:pt-10 md:pt-12 flex flex-col items-center text-center px-4 pointer-events-none max-w-4xl mx-auto">
        {/* Eyebrow Tag */}
        <span className="font-mono text-xs tracking-[0.3em] text-[#C5A880] uppercase mb-1.5 block drop-shadow">
          3D — 3D EXPLORER
        </span>

        {/* Main Editorial Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#FDFBF7] tracking-tight mb-2 font-normal leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          Tour all three towers{' '}
          <span className="font-serif italic font-light text-[#C5A880]">in 360°.</span>
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-xs sm:text-sm md:text-base text-[#C7C3B8] font-light tracking-wide text-center max-w-xl mx-auto drop-shadow-md">
          Browse studios, apartments and penthouses, and view floor plans
        </p>
      </div>

      {/* Floating Side Editorial Cards (Flanking the Panorama) */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-6 sm:px-10 lg:px-14 pointer-events-none max-w-7xl mx-auto">
        {/* Left Side Card: 01 / Regional Masterpiece */}
        <div className="hidden lg:flex w-[260px] lg:w-[280px] h-[340px] lg:h-[360px] shrink-0 p-5 flex-col justify-between pointer-events-auto bg-[#1C1D1A]/95 backdrop-blur-md border border-[#C5A880]/25 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col h-full justify-between">
            {/* Top Content */}
            <div>
              <span className="text-[#C5A880] text-[9px] tracking-[0.25em] uppercase font-semibold mb-1 block">
                01 / REGIONAL MASTERPIECE
              </span>
              <h3 className="text-[#FDFBF7] font-serif text-lg lg:text-xl font-medium mb-2 leading-snug">
                Premier Winter Resort
              </h3>
              <p className="text-[#C7C3B8] text-[11px] leading-relaxed font-light">
                Designed for year-round mountain alpine living, featuring Pakistan&apos;s premier dedicated ski slopes, winter sports access, and panoramic Himalayan pine ridges.
              </p>
            </div>

            {/* Footer Metric */}
            <div className="border-t border-[#C5A880]/20 pt-2 flex items-center justify-between text-[10px] font-mono text-[#8C867A] w-full">
              <span className="tracking-[0.2em] uppercase">
                MASTERPLAN
              </span>
              <span className="text-[#FDFBF7] font-medium whitespace-nowrap">
                30+ Kanals · 3 Towers
              </span>
            </div>
          </div>
        </div>

        {/* Right Side Card: 02 / Alpine Amenities */}
        <div className="hidden lg:flex w-[260px] lg:w-[280px] h-[340px] lg:h-[360px] shrink-0 p-5 flex-col justify-between pointer-events-auto bg-[#1C1D1A]/95 backdrop-blur-md border border-[#C5A880]/25 rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col h-full justify-between">
            {/* Top Content */}
            <div>
              <span className="text-[#C5A880] text-[9px] tracking-[0.25em] uppercase font-semibold mb-1 block">
                02 / ALPINE AMENITIES
              </span>
              <h3 className="text-[#FDFBF7] font-serif text-lg lg:text-xl font-medium mb-2 leading-snug">
                Four-Season Comforts
              </h3>
              <div className="flex flex-col">
                <div className="py-1 border-b border-[#C5A880]/15 flex items-center gap-2 text-[#C7C3B8] text-[11px] leading-relaxed font-light">
                  <span className="text-[#C5A880] font-mono text-[10px] font-semibold shrink-0">01</span>
                  <span>Italian Central Heating &amp; Underfloor Warmth</span>
                </div>
                <div className="py-1 border-b border-[#C5A880]/15 flex items-center gap-2 text-[#C7C3B8] text-[11px] leading-relaxed font-light">
                  <span className="text-[#C5A880] font-mono text-[10px] font-semibold shrink-0">02</span>
                  <span>Heated Infinity Pool &amp; Hydrotherapy Spa</span>
                </div>
                <div className="py-1 border-b border-[#C5A880]/15 flex items-center gap-2 text-[#C7C3B8] text-[11px] leading-relaxed font-light">
                  <span className="text-[#C5A880] font-mono text-[10px] font-semibold shrink-0">03</span>
                  <span>Ski-in / Ski-out Lounge &amp; Heated Lockers</span>
                </div>
              </div>
            </div>

            {/* Footer Altitude Metric */}
            <div className="border-t border-[#C5A880]/20 pt-2 flex items-center justify-between text-[10px] font-mono text-[#8C867A] w-full">
              <span className="tracking-[0.2em] uppercase">
                PEAK ELEVATION
              </span>
              <span className="text-[#FDFBF7] font-medium whitespace-nowrap">
                7,906 FT
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom CTA button & helper link */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center px-4 w-full max-w-sm pointer-events-auto">
        {/* Sand/Champagne Pill CTA Button */}
        <button
          onClick={onOpenExplorer}
          type="button"
          className="group bg-[#d5c3a5] text-[#121614] hover:bg-[#e4d5be] px-8 py-4 rounded-full font-sans text-xs md:text-sm font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] inline-flex items-center gap-3 active:scale-95 cursor-pointer"
        >
          <span>ENTER THE EXPLORER</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1 font-mono">
            →
          </span>
        </button>

        {/* Helper Text Link */}
        <a
          href={explorerUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="font-mono text-[10px] tracking-[0.25em] text-[#efe9df]/85 hover:text-[#efe9df] uppercase mt-2.5 text-center drop-shadow transition-colors block"
        >
          OPEN IN A NEW TAB
        </a>
      </div>

      {/* Persistent Bottom Bar Indicators (03/12 & Sound Toggle) */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full px-8 md:px-16 flex items-end justify-between pointer-events-none select-none z-20">
        {/* Bottom-Left: Chapter index "03 / 12" + slender line */}
        <div className="flex items-center pointer-events-auto">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-medium text-[#efe9df]">
            03 / 12
          </span>
          <span className="w-12 md:w-16 h-[1.5px] ml-4 inline-block align-middle bg-[#efe9df]/40" />
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
    </section>
  );
};
