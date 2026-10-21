'use client';

import React from 'react';
import { motion } from 'framer-motion';
import siteData from '@/data/siteData';

export const MeasureNumbers: React.FC = () => {
  const { numbers } = siteData;

  return (
    <section
      id="numbers"
      data-chapter="numbers"
      className="relative py-28 md:py-40 bg-[#0c0f0d] text-[#efe9df] border-t border-[#253129]/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
              <span>03 · The Measure</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-tight">
              Calculated in stone,{' '}
              <span className="font-serif italic text-[#c3a78e]">elevation and light.</span>
            </h2>
          </div>
          <p className="font-mono text-xs uppercase tracking-luxury text-[#efe9df]/50 max-w-xs">
            01 / 04 Key architectural metrics defining the estate
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {numbers?.map((item: any, idx: number) => {
            const no = `0${idx + 1} / 04`;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group relative rounded-2xl border border-[#253129] bg-[#141c17]/60 overflow-hidden flex flex-col justify-between p-8 hover:border-[#c3a78e]/60 transition-all duration-500 shadow-xl"
              >
                {/* Background image preview with luxury gradient */}
                {item.img && (
                  <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                    <img
                      src={`/img/${item.img}-lg.webp`}
                      alt={item.label}
                      className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-[#0c0f0d]/80 to-transparent" />
                  </div>
                )}

                <div className="relative z-10">
                  <div className="flex items-center justify-between text-xs font-mono text-[#c3a78e] mb-8">
                    <span>{no}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]/60 group-hover:bg-[#c3a78e] transition-colors" />
                  </div>

                  {/* Big Number Display */}
                  <div className="font-serif text-5xl sm:text-6xl text-[#efe9df] group-hover:text-[#c3a78e] transition-colors tracking-tight flex items-baseline space-x-2">
                    <span>{item.value.toLocaleString('en-US')}</span>
                    {item.unit && (
                      <span className="font-mono text-sm tracking-luxury text-[#c3a78e] uppercase font-light">
                        {item.unit}
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative z-10 pt-10 border-t border-[#253129]/60 mt-10">
                  <h3 className="font-serif text-xl text-[#efe9df] mb-2 tracking-wide font-medium">
                    {item.label}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#efe9df]/70 font-light leading-relaxed">
                    {item.note}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
