'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryPlate {
  id: string;
  number: string;
  title: string;
  aspectRatio: string;
  image: string;
  fallbackImage: string;
}

const GALLERY_COLUMNS: GalleryPlate[][] = [
  // Column 1
  [
    {
      id: 'plate-01',
      number: '01',
      title: 'Golden hour',
      aspectRatio: 'aspect-[4/4.5]',
      image: '/img/facade-hero-sunset-lg.webp',
      fallbackImage: '/img/facade-hero-day-lg.webp',
    },
    {
      id: 'plate-05',
      number: '05',
      title: 'The plunge',
      aspectRatio: 'aspect-[4/3]',
      image: '/img/res-pent-lg.webp',
      fallbackImage: '/img/plunge-lg.webp',
    },
    {
      id: 'plate-09',
      number: '09',
      title: 'Pinewood · The kitchen',
      aspectRatio: 'aspect-[4/4.2]',
      image: '/img/int-1bed-kitchen-lg.webp',
      fallbackImage: '/img/int-1bed-living-lg.webp',
    },
  ],
  // Column 2
  [
    {
      id: 'plate-02',
      number: '02',
      title: 'The terraces',
      aspectRatio: 'aspect-[4/3.8]',
      image: '/img/facade-terraces-pool-lg.webp',
      fallbackImage: '/img/amenity-pool-lg.webp',
    },
    {
      id: 'plate-06',
      number: '06',
      title: 'The pods',
      aspectRatio: 'aspect-[3/4.8]',
      image: '/img/amenity-pods-lg.webp',
      fallbackImage: '/img/pod-bridge-lg.webp',
    },
    {
      id: 'plate-10',
      number: '10',
      title: 'Sky Penthouse · Panoramic',
      aspectRatio: 'aspect-[4/3.6]',
      image: '/img/int-penthouse-bedroom-lg.webp',
      fallbackImage: '/img/res-pent-living-lg.webp',
    },
  ],
  // Column 3
  [
    {
      id: 'plate-03',
      number: '03',
      title: 'First snow',
      aspectRatio: 'aspect-[4/3.4]',
      image: '/img/facade-snow-night-lg.webp',
      fallbackImage: '/img/facade-hero-day-lg.webp',
    },
    {
      id: 'plate-07',
      number: '07',
      title: 'The terrace',
      aspectRatio: 'aspect-[3/4.4]',
      image: '/img/dining-night-lg.webp',
      fallbackImage: '/img/dining-terrace-lg.webp',
    },
    {
      id: 'plate-11',
      number: '11',
      title: 'Sky Penthouse · The master',
      aspectRatio: 'aspect-[4/4]',
      image: '/img/int-penthouse-master-lg.webp',
      fallbackImage: '/img/int-bedroom-lg.webp',
    },
  ],
  // Column 4
  [
    {
      id: 'plate-04',
      number: '04',
      title: 'Hydrotherapy',
      aspectRatio: 'aspect-[3/4.8]',
      image: '/img/hydro-night-lg.webp',
      fallbackImage: '/img/amenity-pool-lg.webp',
    },
    {
      id: 'plate-08',
      number: '08',
      title: 'The ridge',
      aspectRatio: 'aspect-[4/3.5]',
      image: '/img/aerial-ridge-lg.webp',
      fallbackImage: '/img/cloudsea-lg.webp',
    },
    {
      id: 'plate-12',
      number: '12',
      title: 'The café',
      aspectRatio: 'aspect-[4/3.8]',
      image: '/img/cafe-day-lg.webp',
      fallbackImage: '/img/amenity-restaurant-lg.webp',
    },
  ],
];

// Flatten all plates for lightbox indexing
const ALL_PLATES = GALLERY_COLUMNS.flat();

export const FirstLookGallery: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedPlateIdx, setSelectedPlateIdx] = useState<number | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  // 1. Multi-Column Scroll Parallax Scrubbing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yCol1 = useTransform(scrollYProgress, [0, 1], ['0%', '-4%']);
  const yCol2 = useTransform(scrollYProgress, [0, 1], ['6%', '-10%']);
  const yCol3 = useTransform(scrollYProgress, [0, 1], ['-2%', '-6%']);
  const yCol4 = useTransform(scrollYProgress, [0, 1], ['8%', '-12%']);

  const colParallax = [yCol1, yCol2, yCol3, yCol4];

  // 2. Smooth Magnetic Mouse-Follower Badge ("VIEW ↗")
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 250, damping: 25, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const openLightbox = (plateId: string) => {
    const idx = ALL_PLATES.findIndex((p) => p.id === plateId);
    if (idx !== -1) setSelectedPlateIdx(idx);
  };

  const closeLightbox = () => setSelectedPlateIdx(null);

  const prevPhoto = () => {
    if (selectedPlateIdx === null) return;
    setSelectedPlateIdx(
      (selectedPlateIdx - 1 + ALL_PLATES.length) % ALL_PLATES.length
    );
  };

  const nextPhoto = () => {
    if (selectedPlateIdx === null) return;
    setSelectedPlateIdx((selectedPlateIdx + 1) % ALL_PLATES.length);
  };

  const currentPlate =
    selectedPlateIdx !== null ? ALL_PLATES[selectedPlateIdx] : null;

  return (
    <>
      <section
        ref={containerRef}
        id="gallery"
        data-chapter="gallery"
        className="relative w-full bg-[#F4F1EA] text-[#1E2621] select-none overflow-hidden"
      >
        {/* ================= SECTION HEADER ================= */}
        <div className="w-full pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 max-w-[1720px] mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#7A7468] uppercase font-light">
              08
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#7A7468]/40 inline-block" />
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.25em] text-[#7A7468] uppercase font-light">
              FIRST LOOK
            </span>
          </div>

          {/* Headline Typography (Two-Tone Styling matching reference) */}
          <h2 className="tracking-tight leading-[0.92]">
            <span className="font-serif font-normal text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#1E2621] tracking-tight inline-block">
              Inside the{' '}
            </span>
            <span className="font-serif italic font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#9B8E7D] tracking-normal inline-block ml-2 sm:ml-3">
              Reserve.
            </span>
          </h2>

          {/* Decorative Centered Tan Accent Dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9BEAE] my-8 sm:my-10" />
        </div>

        {/* ================= THE 12 CURATED PLATES (4-COLUMN STAGGERED PARALLAX MASONRY) ================= */}
        <div className="max-w-[1720px] mx-auto px-6 sm:px-12 md:px-16 pb-24 sm:pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 items-start">
            {GALLERY_COLUMNS.map((column, colIdx) => (
              <motion.div
                key={colIdx}
                style={{ y: colParallax[colIdx] }}
                className="flex flex-col gap-6 md:gap-7 will-change-transform"
              >
                {column.map((plate) => (
                  <div key={plate.id} className="flex flex-col">
                    {/* Card Container with Image */}
                    <div
                      onClick={() => openLightbox(plate.id)}
                      onMouseEnter={() => setIsHoveringCard(true)}
                      onMouseLeave={() => setIsHoveringCard(false)}
                      className={`group relative rounded-2xl overflow-hidden bg-[#EAE6DE] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer ${plate.aspectRatio}`}
                    >
                      <img
                        src={plate.image}
                        alt={plate.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-100 filter-none"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== plate.fallbackImage) {
                            target.src = plate.fallbackImage;
                          }
                        }}
                      />

                      {/* Subtle ambient bottom gradient for depth on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Bottom Label (Anchored right below each card) */}
                    <div className="mt-2.5 sm:mt-3 flex items-center">
                      <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] text-[#7A7468] font-medium mr-2">
                        {plate.number}
                      </span>
                      <span className="font-serif text-sm sm:text-base text-[#1E2621] font-normal tracking-tight">
                        {plate.title}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= BOTTOM STATUS BAR ================= */}
        <div className="w-full max-w-[1720px] mx-auto px-6 sm:px-12 md:px-16 pt-8 pb-12 flex items-center justify-between border-t border-[#1E2621]/15 text-[#1E2621]">
          {/* Left: 08 / 12 Indicator */}
          <div className="flex items-center space-x-4">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#1E2621] uppercase font-semibold">
              08 / 12
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-[#1E2621]/30 inline-block" />
          </div>

          {/* Right: Audio Toggle */}
          <div>
            <button
              onClick={() => setIsSoundOn((prev) => !prev)}
              type="button"
              className="flex items-center space-x-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#1E2621]/80 hover:text-[#1E2621] uppercase transition-colors cursor-pointer"
            >
              <span className="font-mono tracking-widest text-[#9B8E7D]">
                {isSoundOn ? '||||' : '....'}
              </span>
              <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= SMOOTH FLOATING MOUSE-FOLLOWER BADGE ("VIEW ↗") ================= */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHoveringCard && selectedPlateIdx === null ? 1 : 0,
          opacity: isHoveringCard && selectedPlateIdx === null ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-16 h-16 rounded-full bg-[#EDE8DF] text-[#1E2621] shadow-2xl pointer-events-none z-50 flex flex-col items-center justify-center font-mono text-[9px] font-bold tracking-widest uppercase border border-[#1E2621]/10 select-none will-change-transform backdrop-blur-sm"
      >
        <span className="leading-none">VIEW</span>
        <span className="text-[11px] leading-none mt-1">↗</span>
      </motion.div>

      {/* ================= LIGHTBOX MODAL ================= */}
      <AnimatePresence>
        {currentPlate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 select-none"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 text-[#EAE6DE] flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 text-[#EAE6DE] flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 text-[#EAE6DE] flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Center Modal Card */}
            <motion.div
              key={currentPlate.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#161B18] border border-white/10">
                <img
                  src={currentPlate.image}
                  alt={currentPlate.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              {/* Lightbox Caption */}
              <div className="mt-4 flex items-center space-x-3 text-center">
                <span className="font-mono text-xs tracking-[0.25em] text-[#C9BEAE] uppercase">
                  {currentPlate.number}
                </span>
                <span className="w-4 h-[1px] bg-white/30" />
                <span className="font-serif text-lg sm:text-xl text-[#EAE6DE] font-normal">
                  {currentPlate.title}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
