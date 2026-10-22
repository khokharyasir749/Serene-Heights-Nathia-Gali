'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Snowflake, Flame, Shield, CheckCircle } from 'lucide-react';
import siteData from '@/data/siteData';

export const FourSeasonsSnow: React.FC = () => {
  const { snow } = siteData;

  return (
    <section
      id="snow"
      data-chapter="snow"
      className="relative py-28 md:py-40 bg-[#090d0a] text-[#efe9df] border-t border-[#253129]/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual snow showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-[#253129] shadow-2xl group"
          >
            <img
              src="/pictures/home/frames/frame4.png"
              alt="Snowfall at Serene Heights Nathia Gali at night"
              className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-transparent to-transparent opacity-80" />

            <div className="absolute top-6 left-6 inline-flex items-center space-x-2 text-xs font-mono text-[#c3a78e] bg-[#0c0f0d]/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#253129]">
              <Snowflake className="w-3.5 h-3.5 text-cyan-200 animate-spin-slow" />
              <span>Winter Operation · 7,906 FT</span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#0c0f0d]/80 backdrop-blur-md border border-[#253129]">
              <div className="flex items-center space-x-2 text-[#c3a78e] text-xs font-mono uppercase mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Geothermal & Heated Water System</span>
              </div>
              <p className="font-serif text-sm text-[#efe9df]/90">
                The heated outdoor infinity pool stays open in sub-zero snow.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Editorial narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
              <span>09 · Four Seasons High</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-[1.1] font-normal">
              Snow falls.{' '}
              <span className="font-serif italic text-[#c3a78e]">Serene Heights stays warm.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#efe9df]/80 font-light leading-relaxed">
              {snow?.body}
            </p>

            {/* Winter Infrastructure Specs */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#253129]/60 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#141c17] border border-[#253129]">
                <span className="block font-serif text-3xl text-[#c3a78e] mb-1">365</span>
                <span className="text-[#efe9df]/60 uppercase tracking-wider text-[10px]">
                  Days a year · Fully staffed
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#141c17] border border-[#253129]">
                <span className="block font-serif text-3xl text-[#c3a78e] mb-1">100%</span>
                <span className="text-[#efe9df]/60 uppercase tracking-wider text-[10px]">
                  Covered Valet & Arrival
                </span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 font-sans text-sm text-[#efe9df]/85">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-[#c3a78e] shrink-0" />
                <span>Underfloor hydronic heating throughout all 133 private residences</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-[#c3a78e] shrink-0" />
                <span>Independent snow clearing equipment stationed on site permanently</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-[#c3a78e] shrink-0" />
                <span>Full backup power grid & on-demand hospitality concierges</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
