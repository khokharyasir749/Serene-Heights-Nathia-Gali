'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { EstateAmenitiesLevels } from './EstateAmenitiesLevels';

interface RoomStrip {
  id: string;
  kicker: string;
  title: string;
  img: string;
  fallback: string;
  alt: string;
  desc: string;
}

const ROOMS_STRIPS: RoomStrip[] = [
  {
    id: 'fitness',
    kicker: 'MOVEMENT',
    title: 'The Fitness Pavilion',
    img: '/img/gym-lg.webp',
    fallback: '/img/amenity-gym.webp',
    alt: 'High-altitude glass gym with spinning bikes and valley view',
    desc: 'High-altitude cardio and resistance training surrounded by ancient pine forest. Floor-to-ceiling panoramic glass brings the mist-covered peaks right to your workout.',
  },
  {
    id: 'yoga',
    kicker: 'STILLNESS',
    title: 'The Yoga Garden',
    img: '/img/yoga-zen-lg.webp',
    fallback: '/img/day-0700-lg.webp',
    alt: 'Timber studio with mats facing pine mist',
    desc: 'Heated oak floors with daily guided meditation and sunrise yoga facing the ridge. Intimate acoustic balance and natural mountain airflow.',
  },
  {
    id: 'lobby',
    kicker: 'ARRIVAL',
    title: 'The Grand Lobby',
    img: '/img/reception-lg.webp',
    fallback: '/img/int-lobby.webp',
    alt: 'Double-height stone foyer with crystal chandelier and reception desk',
    desc: 'A soaring double-height stone foyer welcoming owners and guests into the Reserve, centered by handcrafted brass screens and crystalline chandeliers.',
  },
  {
    id: 'cigar',
    kicker: 'RITUAL',
    title: 'The Cigar Lounge',
    img: '/img/cigar-lounge-lg.webp',
    fallback: '/img/amenity-cigar.webp',
    alt: 'Dark wooden paneling, leather chairs and fireplace evening view',
    desc: 'Climatically balanced cedar humidors, vintage malts, and low-lit fireside seating for quiet evening conversation overlooking the ridge at dusk.',
  },
  {
    id: 'salon',
    kicker: 'BEAUTY',
    title: 'The Salon',
    img: '/img/salon-lg.webp',
    fallback: '/img/amenity-salon.webp',
    alt: 'Luxury grooming chairs, illuminated mirrors and natural stone feature wall',
    desc: 'Private hair styling, grooming, and aesthetic treatments in a tranquil stone sanctuary, staffed by dedicated visiting therapists.',
  },
  {
    id: 'boardroom',
    kicker: 'SUMMITS',
    title: 'The Boardroom',
    img: '/img/boardroom-lg.webp',
    fallback: '/img/amenity-boardroom.webp',
    alt: 'Long conference executive oak table with illuminated glass pendant sculpture',
    desc: 'High-speed fiber connectivity, acoustic isolation, and confidential meeting facilities suspended above the clouds at 7,900 feet.',
  },
];

export const EstateAmenities: React.FC = () => {
  const [selectedTower, setSelectedTower] = useState<'A' | 'B'>('A');
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [hoveredStripIdx, setHoveredStripIdx] = useState<number | null>(null);
  const [selectedModalRoom, setSelectedModalRoom] = useState<RoomStrip | null>(null);

  return (
    <section
      id="estate"
      data-chapter="estate"
      className="relative w-full bg-[#161B18] text-[#EAE6DE] select-none"
    >
      {/* =========================================================================================
          STAGE 1: INTRO HERO SCREEN (min-h-screen flex flex-col justify-between)
      ========================================================================================= */}
      <div className="relative w-full min-h-screen flex flex-col justify-between pt-28 md:pt-32 pb-8 md:pb-10 px-8 md:px-16 bg-[#161B18]">
        {/* Subtle Ambient Radial Lighting - Dark, Velvety Matte Luxury Tone */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(circle at 25% 40%, rgba(28, 36, 30, 0.35) 0%, rgba(22, 27, 24, 0.95) 65%, #161B18 100%)',
          }}
        />

        {/* ----------------- UPPER EDITORIAL BLOCK ----------------- */}
        <div className="w-full max-w-7xl flex flex-col justify-start">
          {/* Section Eyebrow: 07 —— THE ESTATE */}
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light">
              07
            </span>
            <span className="w-8 md:w-10 h-[1px] bg-[#7A7468]/40 inline-block" />
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light">
              THE ESTATE
            </span>
          </div>

          {/* Massive Display Serif Headline: Two-Tone Bone Ivory + Warm Sand Bronze */}
          <h1 className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8rem] leading-[0.92] tracking-tight">
            <span className="block text-[#EAE6DE]">Everything you need</span>
            <span className="block text-[#EAE6DE] mt-1 sm:mt-2">at 7,900 feet.</span>
            <span className="block font-serif italic font-light text-[#C9BEAE] mt-1 sm:mt-2">
              Nothing you don’t.
            </span>
          </h1>

          {/* Accent dot placed below the headline */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <span className="block w-1.5 h-1.5 rounded-full bg-[#C9BEAE] shadow-[0_0_8px_rgba(201,190,174,0.4)]" />
          </div>

          {/* Left Description Paragraph */}
          <p className="font-sans font-light text-sm sm:text-[15px] leading-relaxed text-[#A8A195] max-w-lg mt-4 sm:mt-6">
            More than 25,000 sq ft given over to amenities across four dedicated levels: staffed and
            open through all four seasons, including the snow months.
          </p>
        </div>

        {/* ----------------- BOTTOM CONTROLS & TOWER SLIDER ----------------- */}
        <div className="pt-12 pb-2 flex items-end justify-between w-full">
          {/* Bottom-Left: 07 / 12 ———— */}
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light">
              07 / 12
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-[#7A7468]/30 inline-block" />
          </div>

          {/* Bottom-Right Controls: Glass Skywalk Tower Selector & Sound Toggle */}
          <div className="flex flex-col items-end space-y-3 sm:space-y-4">
            {/* Tower Selector Widget */}
            <div className="flex flex-col items-center">
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#7A7468] uppercase block mb-1.5 select-none">
                GLASS SKYWALK
              </span>
              <div className="flex items-center space-x-3 text-[#A8A195] font-mono text-[10px] tracking-[0.2em] uppercase select-none">
                <button
                  type="button"
                  onClick={() => setSelectedTower('A')}
                  className={`transition-colors cursor-pointer ${
                    selectedTower === 'A'
                      ? 'text-[#A8A195] font-semibold'
                      : 'text-[#7A7468] hover:text-[#A8A195]'
                  }`}
                >
                  TOWER A
                </button>

                <div
                  className="relative flex items-center w-28 sm:w-36 md:w-44 h-4 cursor-pointer group"
                  onClick={() => setSelectedTower((prev) => (prev === 'A' ? 'B' : 'A'))}
                  title="Toggle Skywalk Connection"
                >
                  {/* Track Line */}
                  <div className="w-full h-[1px] bg-[#7A7468]/30 group-hover:bg-[#7A7468]/50 transition-colors" />

                  {/* Left Dot (Tower A) */}
                  <div
                    className={`absolute left-0 w-2 h-2 rounded-full transition-all duration-300 ${
                      selectedTower === 'A'
                        ? 'bg-[#A8A195] scale-125 shadow-[0_0_8px_rgba(168,161,149,0.8)]'
                        : 'bg-[#7A7468] group-hover:bg-[#A8A195]'
                    }`}
                  />

                  {/* Right Dot (Tower B) */}
                  <div
                    className={`absolute right-0 w-2 h-2 rounded-full transition-all duration-300 ${
                      selectedTower === 'B'
                        ? 'bg-[#A8A195] scale-125 shadow-[0_0_8px_rgba(168,161,149,0.8)]'
                        : 'bg-[#7A7468] group-hover:bg-[#A8A195]'
                    }`}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedTower('B')}
                  className={`transition-colors cursor-pointer ${
                    selectedTower === 'B'
                      ? 'text-[#A8A195] font-semibold'
                      : 'text-[#7A7468] hover:text-[#A8A195]'
                  }`}
                >
                  TOWER B
                </button>
              </div>
            </div>

            {/* Audio Button */}
            <div>
              <button
                onClick={() => setIsSoundOn((prev) => !prev)}
                type="button"
                className="flex items-center space-x-2.5 font-mono text-[10px] tracking-[0.2em] text-[#A8A195] hover:text-[#EAE6DE] uppercase transition-colors cursor-pointer"
              >
                <span className="font-mono tracking-widest text-[#7A7468]">
                  {isSoundOn ? '||||' : '....'}
                </span>
                <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================================
          STAGE 2: "AND THE ROOMS BETWEEN" ACCORDION SHOWCASE (FULL-HEIGHT INTERACTIVE EXPANDING ACCORDION)
      ========================================================================================= */}
      <div className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 px-6 md:px-12 bg-[#161B18] border-t border-[#7A7468]/15 select-none">
        {/* Top Header / Eyebrow: + —— AND THE ROOMS BETWEEN (Safe clearance below fixed navbar) */}
        <div className="w-full mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 font-mono text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light">
            <span className="font-mono text-xs text-[#A8A195] font-light">+</span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#7A7468]/40 inline-block" />
            <span>AND THE ROOMS BETWEEN</span>
          </div>
        </div>

        {/* Center: The 6 Vertical Accordion Strips Container */}
        <div className="w-full flex-1 flex items-center justify-center my-auto">
          <div
            onMouseLeave={() => setHoveredStripIdx(null)}
            className="w-full h-[62vh] min-h-[520px] max-h-[660px] flex gap-2.5 sm:gap-3.5 overflow-hidden rounded-2xl border border-[#7A7468]/20 bg-[#161B18] shadow-2xl p-2"
          >
            {ROOMS_STRIPS.map((room, idx) => {
              const isHovered = hoveredStripIdx === idx;
              const isAnyHovered = hoveredStripIdx !== null;

              // Balanced Flex Distribution:
              // Active: flex-[2.8] (wide enough for cinematic view, but NOT suffocating siblings)
              // Inactive: flex-[1] with min-w-[110px] sm:min-w-[130px]
              let flexStyle = '1 1 0%';
              if (isAnyHovered) {
                flexStyle = isHovered ? '2.8 1 0%' : '1 1 0%';
              }

              return (
                <div
                  key={room.id}
                  onMouseEnter={() => setHoveredStripIdx(idx)}
                  onClick={() => setSelectedModalRoom(room)}
                  style={{
                    flex: flexStyle,
                    transition: 'flex 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
                    willChange: 'flex',
                  }}
                  className="relative h-full min-w-[110px] sm:min-w-[130px] overflow-hidden rounded-xl cursor-pointer group border border-[#7A7468]/25 group-hover:border-[#C9BEAE]/40 transition-colors"
                >
                  {/* Full-bleed Photo with natural exposure */}
                  <img
                    src={room.img}
                    alt={room.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-100 filter-none"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== room.fallback) {
                        target.src = room.fallback;
                      }
                    }}
                  />

                  {/* Delicate bottom-only vignette for crisp legibility (upper 55% completely untouched) */}
                  <div className="bg-gradient-to-t from-black/75 via-black/25 to-transparent h-[45%] absolute bottom-0 left-0 w-full pointer-events-none" />

                  {/* Floating Center Ivory "VIEW ↗" Badge on Hovered Card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 m-auto w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#EDE8DF] text-[#161B18] flex flex-col items-center justify-center font-mono text-[9px] font-bold shadow-2xl z-20 pointer-events-none select-none"
                      >
                        <span className="leading-none">VIEW</span>
                        <span className="text-xs leading-none mt-1">↗</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Anchored Bottom-Left Typography */}
                  <div className="absolute bottom-5 left-4 sm:bottom-6 sm:left-5 z-10 text-left pointer-events-none overflow-hidden max-w-[90%]">
                    <span className="font-mono text-[8.5px] sm:text-[9.5px] tracking-[0.22em] text-[#C4BCB0] uppercase font-medium mb-1 block whitespace-nowrap drop-shadow-sm">
                      {room.kicker}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg md:text-xl text-[#EAE6DE] font-normal leading-snug break-words drop-shadow-md">
                      {room.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: 07 / 12 ———— and .... SOUND OFF */}
        <div className="pt-6 sm:pt-8 flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light">
              07 / 12
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-[#7A7468]/30 inline-block" />
          </div>

          <div>
            <button
              onClick={() => setIsSoundOn((prev) => !prev)}
              type="button"
              className="flex items-center space-x-2.5 font-mono text-[10px] tracking-[0.2em] text-[#A8A195] hover:text-[#EDE8DF] uppercase transition-colors cursor-pointer"
            >
              <span className="font-mono tracking-widest text-[#7A7468]">
                {isSoundOn ? '||||' : '....'}
              </span>
              <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================================
          STAGE 3: FULL-SCREEN SCROLL-TO-SCRUB SHOWCASE (CHAPTER 07 LEVELS I - V)
      ========================================================================================= */}
      <EstateAmenitiesLevels />

      {/* =========================================================================================
          STAGE 4: CHAPTER 07 OUTRO TRANSITION SCREEN ("Across the skywalk, Tower B.")
      ========================================================================================= */}
      <div className="relative w-full min-h-screen flex flex-col justify-between py-12 md:py-16 px-8 sm:px-14 md:px-20 bg-[#161B18] text-[#EAE6DE] z-10 border-t border-[#7A7468]/15 select-none">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute inset-0 pointer-events-none -z-10"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(32, 42, 35, 0.25) 0%, rgba(22, 27, 24, 0.95) 70%, #161B18 100%)',
          }}
        />

        {/* Top Space / Clearance & Upper Headline Block */}
        <div className="w-full pt-8 sm:pt-12 md:pt-16">
          <div className="max-w-5xl">
            <h2 className="tracking-tight leading-[0.92]">
              <span className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-[#EAE6DE] leading-[0.92] tracking-tight block">
                Across the skywalk,
              </span>
              <span className="font-serif italic font-light text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-[#C9BEAE] leading-[0.95] tracking-normal mt-2 sm:mt-3 block">
                Tower B.
              </span>
            </h2>

            {/* Decorative Tan Dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9BEAE] my-8 sm:my-10" />
          </div>
        </div>

        {/* Mid-Lower Content Row (Split Layout) */}
        <div className="w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12 pb-12 sm:pb-16">
          {/* Left Editorial Body Copy */}
          <p className="font-serif text-lg sm:text-2xl md:text-[1.65rem] text-[#C4BCB0] font-light leading-relaxed max-w-2xl">
            The second tower holds everything that makes owning here easy: owners’ concierge and
            housekeeping, covered arrival and valet parking, a rooftop event terrace at 7,900 ft,
            and a full rental management desk.
          </p>

          {/* Right Action Link: EVERY AMENITY, LISTED → */}
          <button
            type="button"
            onClick={() => {
              const firstRoom = ROOMS_STRIPS[0];
              if (firstRoom) setSelectedModalRoom(firstRoom);
            }}
            className="group font-mono text-xs sm:text-[13px] tracking-[0.25em] uppercase text-[#EAE6DE] hover:text-[#C9BEAE] transition-colors pb-1 border-b border-[#C4BCB0]/40 flex items-center gap-2 self-start lg:self-end mb-2 cursor-pointer"
          >
            <span>EVERY AMENITY, LISTED</span>
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">→</span>
          </button>
        </div>

        {/* Bottom Status Bar (07 / 12 and .... SOUND OFF) */}
        <div className="w-full pt-6 sm:pt-8 flex items-center justify-between border-t border-[#7A7468]/15">
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#A8A195]/80 uppercase font-light">
              07 / 12
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-[#7A7468]/30 inline-block" />
          </div>

          <div>
            <button
              onClick={() => setIsSoundOn((prev) => !prev)}
              type="button"
              className="flex items-center space-x-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#A8A195]/80 hover:text-[#EDE8DF] uppercase transition-colors cursor-pointer"
            >
              <span className="font-mono tracking-widest text-[#7A7468]">
                {isSoundOn ? '||||' : '....'}
              </span>
              <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================================
          MODAL: AMENITY ROOM DETAIL LIGHTBOX
      ========================================================================================= */}
      <AnimatePresence>
        {selectedModalRoom && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-[#161B18] border border-[#7A7468]/25 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedModalRoom(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-[#EAE6DE] flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Photo Frame */}
              <div className="md:w-3/5 relative h-72 sm:h-96 md:h-auto overflow-hidden">
                <img
                  src={selectedModalRoom.img}
                  alt={selectedModalRoom.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161B18] via-transparent to-transparent md:hidden" />
              </div>

              {/* Content Panel */}
              <div className="md:w-2/5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs tracking-[0.25em] text-[#7A7468] uppercase block mb-2 font-medium">
                    {selectedModalRoom.kicker}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#EAE6DE] font-light mb-4">
                    {selectedModalRoom.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#A8A195] font-light leading-relaxed">
                    {selectedModalRoom.desc}
                  </p>
                </div>

                <div className="pt-8 border-t border-[#7A7468]/15 mt-8 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#7A7468] tracking-wider uppercase">
                    THE RESERVE ESTATE
                  </span>
                  <button
                    onClick={() => setSelectedModalRoom(null)}
                    className="font-mono text-xs tracking-wider text-[#A8A195] flex items-center space-x-1.5 hover:text-[#EAE6DE] transition-colors cursor-pointer"
                  >
                    <span>CLOSE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
