'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Sparkles, Footprints, Utensils, Waves, Check } from 'lucide-react';
import siteData from '@/data/siteData';

export const EstateAmenities: React.FC = () => {
  const { estate } = siteData;
  const chapters = estate?.chapters || [];
  const rooms = estate?.rooms || [];

  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const currentChapter = chapters[activeChapterIdx] || chapters[0];

  return (
    <section
      id="estate"
      data-chapter="estate"
      className="relative py-28 md:py-40 bg-[#090d0a] text-[#efe9df] border-t border-[#253129]/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-20">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
              <span>07 · The Estate</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-[1.1] font-normal">
              Everything you need at 7,900 feet.{' '}
              <span className="font-serif italic text-[#c3a78e]">Nothing you don’t.</span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#efe9df]/80 font-light max-w-2xl leading-relaxed pt-2">
              {estate?.body}
            </p>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl border border-[#253129] bg-[#141c17]/50 font-mono text-xs">
            <div className="flex items-center justify-between text-[#c3a78e] uppercase tracking-wider mb-2">
              <span>Skywalk Connection</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex items-center justify-between font-serif text-xl text-[#efe9df] py-1">
              <span>{estate?.towers?.[0] || 'Tower A'}</span>
              <span className="font-mono text-xs text-[#c3a78e]">⟷ {estate?.towersLink} ⟷</span>
              <span>{estate?.towers?.[1] || 'Tower B'}</span>
            </div>
            <p className="text-[11px] text-[#efe9df]/50 pt-2 border-t border-[#253129]/60">
              {estate?.skywalkGauge}
            </p>
          </div>
        </div>

        {/* 5 Primary Chapters Interactive Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-3 mb-10 border-b border-[#253129]/60">
          {chapters.map((ch: any, idx: number) => {
            const isActive = idx === activeChapterIdx;
            return (
              <button
                key={ch.no}
                onClick={() => setActiveChapterIdx(idx)}
                className={`px-6 py-3 rounded-full font-mono text-xs uppercase tracking-luxury whitespace-nowrap transition-all flex items-center space-x-2.5 ${
                  isActive
                    ? 'bg-[#c3a78e] text-[#0c0f0d] font-medium shadow-xl'
                    : 'border border-[#253129] bg-[#141c17]/40 text-[#efe9df]/70 hover:border-[#c3a78e]/60 hover:text-[#efe9df]'
                }`}
              >
                <span className="opacity-70 font-mono">{ch.no}.</span>
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Chapter Showcase */}
        {currentChapter && (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentChapter.no}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center rounded-3xl border border-[#253129] bg-[#141c17]/60 p-6 md:p-12 mb-20 shadow-2xl"
            >
              {/* Image Frame */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[#253129] h-[340px] sm:h-[440px] group">
                <img
                  src={`/img/${currentChapter.img}-lg.webp`}
                  alt={currentChapter.alt || currentChapter.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-luxury text-[#c3a78e] bg-[#0c0f0d]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#253129]">
                  {currentChapter.kicker}
                </div>
              </div>

              {/* Text content */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="font-mono text-xs text-[#c3a78e] uppercase tracking-luxury block mb-2">
                    Chapter {currentChapter.no} · {currentChapter.kicker}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#efe9df] font-normal mb-4">
                    {currentChapter.title}
                  </h3>
                  <p className="font-sans text-base text-[#efe9df]/80 font-light leading-relaxed">
                    {currentChapter.body}
                  </p>
                </div>

                {currentChapter.list && currentChapter.list.length > 0 && (
                  <div className="space-y-2.5 pt-4 border-t border-[#253129]/60 font-sans text-sm">
                    {currentChapter.list.map((item: string, i: number) => (
                      <div key={i} className="flex items-center space-x-3 text-[#efe9df]/90">
                        <span className="w-4 h-4 rounded-full border border-[#c3a78e]/60 flex items-center justify-center text-[#c3a78e]">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* And The Rooms Between: Grid of 6 Amenities */}
        <div className="mt-24 pt-16 border-t border-[#253129]/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e] block mb-2">
                Curated Spaces
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#efe9df]">
                {estate?.roomsLabel || 'And the rooms between'}
              </h3>
            </div>
            <p className="font-mono text-xs uppercase tracking-luxury text-[#efe9df]/50">
              Staffed and operational year-round
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl border border-[#253129] bg-[#141c17]/50 overflow-hidden hover:border-[#c3a78e]/60 transition-all shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={`/img/${room.img}-lg.webp`}
                    alt={room.alt || room.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-luxury text-[#c3a78e] bg-[#0c0f0d]/80 px-2.5 py-0.5 rounded border border-[#253129]">
                    {room.kicker}
                  </span>
                </div>
                <div className="p-6">
                  <h4 className="font-serif text-xl text-[#efe9df] group-hover:text-[#c3a78e] transition-colors font-medium">
                    {room.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tower B Callout */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl border border-[#253129] bg-gradient-to-r from-[#141c17] to-[#0c0f0d] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
              Connected Wing
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#efe9df]">
              Across the skywalk, Tower B.
            </h3>
            <p className="font-sans text-sm md:text-base text-[#efe9df]/75 font-light leading-relaxed">
              {estate?.towerBBody}
            </p>
          </div>
          <div className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e] border border-[#253129] px-6 py-3 rounded-full bg-[#0c0f0d]">
            Full Hotel Services Inside
          </div>
        </div>
      </div>
    </section>
  );
};
