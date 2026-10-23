'use client';

import React from 'react';
import { motion } from 'framer-motion';
import siteData from '@/data/siteData';

export const Manifesto: React.FC = () => {
  const { manifesto } = siteData;

  return (
    <section
      id="manifesto"
      data-chapter="manifesto"
      className="relative py-28 md:py-40 bg-[#0c0f0d] text-[#efe9df] overflow-hidden border-t border-[#253129]/40"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Chapter Label & Big Editorial Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 md:space-y-8"
          >
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
              <span>02 · Serene Heights</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-[1.15] font-normal">
              Pakistan’s most premium{' '}
              <span className="font-serif italic text-[#c3a78e]">apartment hotel.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg md:text-xl text-[#efe9df]/85 font-light leading-relaxed border-l-2 border-[#c3a78e]/50 pl-6 my-6">
              Serene Heights Nathia Gali is built to the highest standard of luxury Pakistan has ever seen:
              both a private residence and a fully managed retreat: staffed, serviced and alive
              through all four seasons.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 font-mono text-xs">
              <div className="p-4 rounded border border-[#253129] bg-[#141c17]/50">
                <span className="block text-[#c3a78e] text-lg font-serif">150+</span>
                <span className="text-[#efe9df]/60 uppercase tracking-wider text-[11px]">
                  Private Suites
                </span>
              </div>
              <div className="p-4 rounded border border-[#253129] bg-[#141c17]/50">
                <span className="block text-[#c3a78e] text-lg font-serif">365 Days</span>
                <span className="text-[#efe9df]/60 uppercase tracking-wider text-[11px]">
                  Hotel-Operated
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Architectural Photography Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#253129] shadow-2xl group">
              <img
                src="/pictures/home/largestResort.png"
                alt="Serene Heights Nathia Gali 5-Star Mountain Resort Panoramic Exterior"
                className="w-full h-[420px] md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-[10px] uppercase tracking-luxury text-[#c3a78e] block mb-1">
                  The Stone Terrace Café
                </span>
                <p className="font-serif text-sm text-[#efe9df]/90 italic">
                  &ldquo;A terrace above the clouds, morning coffee at 7,906 ft.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
