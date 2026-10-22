'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sunset, Moon, Sunrise, Clock } from 'lucide-react';
import siteData from '@/data/siteData';

export const DayCycle: React.FC = () => {
  const { day } = siteData;
  const moments = day?.moments || [];
  const [activeIdx, setActiveIdx] = useState(2); // Default to 18:30 Golden Hour as on original site

  const current = moments[activeIdx] || moments[0];

  const getMomentIcon = (label: string) => {
    switch (label) {
      case 'First light':
        return <Sunrise className="w-4 h-4" />;
      case 'Midday':
        return <Sun className="w-4 h-4" />;
      case 'Golden hour':
        return <Sunset className="w-4 h-4" />;
      case 'Nightfall':
        return <Moon className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="day"
      data-chapter="day"
      className="relative py-28 md:py-40 bg-[#0c0f0d] text-[#efe9df] border-t border-[#253129]/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
              <span>05 · One Day at Serene Heights</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-tight font-normal">
              From morning mist to{' '}
              <span className="font-serif italic text-[#c3a78e]">mountain starlight.</span>
            </h2>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-[#c3a78e] bg-[#141c17] px-4 py-2 rounded-full border border-[#253129] self-start md:self-auto">
            <Clock className="w-4 h-4 text-[#c3a78e]" />
            <span>Nathia Gali Mountain Time</span>
          </div>
        </div>

        {/* Time Tabs Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
          {moments.map((m: any, idx: number) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={m.time}
                onClick={() => setActiveIdx(idx)}
                className={`relative p-4 md:p-6 rounded-2xl border transition-all text-left flex flex-col justify-between overflow-hidden group ${
                  isActive
                    ? 'border-[#c3a78e] bg-[#1a251e] shadow-xl'
                    : 'border-[#253129] bg-[#141c17]/50 hover:border-[#253129] hover:bg-[#141c17]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDayTab"
                    className="absolute inset-0 bg-gradient-to-br from-[#c3a78e]/15 to-transparent pointer-events-none"
                    transition={{ type: 'spring', duration: 0.5 }}
                  />
                )}

                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span
                    className={`${
                      isActive ? 'text-[#c3a78e]' : 'text-[#efe9df]/50 group-hover:text-[#efe9df]'
                    }`}
                  >
                    {m.time}
                  </span>
                  <span
                    className={`${
                      isActive ? 'text-[#c3a78e]' : 'text-[#efe9df]/40 group-hover:text-[#c3a78e]'
                    }`}
                  >
                    {getMomentIcon(m.label)}
                  </span>
                </div>

                <span
                  className={`font-serif text-lg md:text-xl block ${
                    isActive ? 'text-[#efe9df]' : 'text-[#efe9df]/70 group-hover:text-[#efe9df]'
                  }`}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Cinematic Display Screen with Smooth Cross-fade */}
        <div className="relative rounded-3xl overflow-hidden border border-[#253129] shadow-2xl h-[420px] sm:h-[540px] md:h-[620px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.time}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={`/img/${current.img}-lg.webp`}
                alt={`${current.label} at Serene Heights Nathia Gali`}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-[#0c0f0d]/30 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Overlaid Luxury Narrative Badge */}
          <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 max-w-xl z-10 pointer-events-none">
            <motion.div
              key={`text-${current.time}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-6 md:p-8 rounded-2xl bg-[#0c0f0d]/80 backdrop-blur-md border border-[#253129]"
            >
              <div className="flex items-center space-x-3 text-xs font-mono text-[#c3a78e] uppercase tracking-luxury mb-2">
                <span>{current.time}</span>
                <span>·</span>
                <span>{current.label}</span>
              </div>
              <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#efe9df] leading-snug font-normal">
                &ldquo;{current.line}&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
