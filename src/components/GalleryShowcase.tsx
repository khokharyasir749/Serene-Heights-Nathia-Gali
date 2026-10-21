'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import siteData from '@/data/siteData';

export const GalleryShowcase: React.FC = () => {
  const { gallery } = siteData;
  const items = gallery?.items || [];
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setSelectedPhotoIdx(idx);
  const closeLightbox = () => setSelectedPhotoIdx(null);

  const prevPhoto = () => {
    if (selectedPhotoIdx === null) return;
    setSelectedPhotoIdx((selectedPhotoIdx - 1 + items.length) % items.length);
  };

  const nextPhoto = () => {
    if (selectedPhotoIdx === null) return;
    setSelectedPhotoIdx((selectedPhotoIdx + 1) % items.length);
  };

  return (
    <>
      <section
        id="gallery"
        data-chapter="gallery"
        className="relative py-28 md:py-40 bg-[#0c0f0d] text-[#efe9df] border-t border-[#253129]/40 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
                <span>08 · First Look</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-tight font-normal">
                Inside the <span className="font-serif italic text-[#c3a78e]">Reserve.</span>
              </h2>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono text-[#efe9df]/50 uppercase tracking-luxury">
              <span>Drag or scroll to browse</span>
              <span className="text-[#c3a78e]">12 Curated Plates</span>
            </div>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div className="flex items-stretch space-x-6 overflow-x-auto no-scrollbar px-6 md:px-12 pb-8 pt-2">
          {items.map((item: any, idx: number) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                onClick={() => openLightbox(idx)}
                className="group flex-shrink-0 w-[280px] sm:w-[340px] md:w-[400px] cursor-pointer rounded-2xl overflow-hidden border border-[#253129] bg-[#141c17] transition-all duration-300 hover:border-[#c3a78e]/60 shadow-xl"
              >
                <div className="relative h-[320px] sm:h-[380px] overflow-hidden">
                  <img
                    src={`/img/${item.img}-lg.webp`}
                    alt={item.alt || item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-transparent to-transparent opacity-80" />

                  {/* Photo index tag */}
                  <span className="absolute top-4 left-4 font-mono text-[11px] text-[#efe9df]/80 bg-[#0c0f0d]/80 px-2.5 py-1 rounded border border-[#253129]">
                    {num}
                  </span>

                  {/* Zoom indicator on hover */}
                  <div className="absolute top-4 right-4 p-2 rounded-full bg-[#0c0f0d]/80 text-[#c3a78e] border border-[#253129] opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-3.5 h-3.5" />
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#efe9df] group-hover:text-[#c3a78e] transition-colors">
                      {item.caption}
                    </h3>
                    <p className="font-sans text-xs text-[#efe9df]/60 font-light truncate mt-1">
                      {item.alt}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-[#efe9df]">
              <div className="flex items-center space-x-3">
                <span className="text-[#c3a78e]">
                  {String(selectedPhotoIdx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                <span className="hidden sm:inline-block text-[#efe9df]/60">
                  {items[selectedPhotoIdx]?.caption}
                </span>
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full border border-[#253129] hover:border-[#c3a78e] text-[#efe9df]/80 hover:text-[#efe9df] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo View */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <button
                onClick={prevPhoto}
                className="absolute left-2 md:left-6 z-10 p-3 rounded-full bg-[#0c0f0d]/80 border border-[#253129] text-[#efe9df] hover:border-[#c3a78e] transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={selectedPhotoIdx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                src={`/img/${items[selectedPhotoIdx]?.img}-lg.webp`}
                alt={items[selectedPhotoIdx]?.alt}
                className="max-h-[80vh] max-w-full object-contain rounded-xl border border-[#253129]"
              />

              <button
                onClick={nextPhoto}
                className="absolute right-2 md:right-6 z-10 p-3 rounded-full bg-[#0c0f0d]/80 border border-[#253129] text-[#efe9df] hover:border-[#c3a78e] transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption */}
            <div className="text-center font-serif text-lg text-[#efe9df]/90 pb-2">
              {items[selectedPhotoIdx]?.caption} ·{' '}
              <span className="font-sans text-sm text-[#efe9df]/50 italic">
                {items[selectedPhotoIdx]?.alt}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
