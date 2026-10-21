'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, FileText, ArrowRight, Check, Compass, Maximize2 } from 'lucide-react';
import siteData from '@/data/siteData';
import { FloorPlateModal } from './FloorPlateModal';

interface ResidencesGridProps {
  onOpenExplorer: () => void;
}

export const ResidencesGrid: React.FC<ResidencesGridProps> = ({ onOpenExplorer }) => {
  const { residences, residencesIntro } = siteData;
  const [selectedResId, setSelectedResId] = useState<string>(residences?.[1]?.id || '1-bedroom');
  const [modalResName, setModalResName] = useState<string | null>(null);

  const activeRes = residences?.find((r: any) => r.id === selectedResId) || residences?.[0];

  return (
    <>
      <section
        id="residences"
        data-chapter="residences"
        className="relative py-28 md:py-40 bg-[#0c0f0d] text-[#efe9df] border-t border-[#253129]/40"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
                <span>06 · The Residences</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-tight font-normal">
                From studios to{' '}
                <span className="font-serif italic text-[#c3a78e]">penthouses.</span>
              </h2>
            </div>
            <p className="font-sans text-sm md:text-base text-[#efe9df]/75 font-light max-w-md">
              {residencesIntro?.body}
            </p>
          </div>

          {/* Unit Switcher Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-4 mb-12 border-b border-[#253129]/60">
            {residences?.map((r: any) => {
              const isSelected = r.id === selectedResId;
              return (
                <button
                  key={r.id}
                  onClick={() => setSelectedResId(r.id)}
                  className={`px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-luxury transition-all whitespace-nowrap flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-[#c3a78e] text-[#0c0f0d] font-medium shadow-lg'
                      : 'border border-[#253129] bg-[#141c17]/50 text-[#efe9df]/70 hover:border-[#c3a78e]/50 hover:text-[#efe9df]'
                  }`}
                >
                  <span>{r.name}</span>
                  {r.soldOut ? (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 font-mono border border-red-800/40">
                      Sold out
                    </span>
                  ) : (
                    <span className="text-[10px] opacity-75">({r.units})</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Unit Detailed Feature Card */}
          <AnimatePresence mode="wait">
            {activeRes && (
              <motion.div
                key={activeRes.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center rounded-3xl border border-[#253129] bg-[#141c17]/60 p-8 md:p-14 shadow-2xl relative overflow-hidden"
              >
                {/* Left Column: Visual Showcase (2 Images: Hero & Interior Plate) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative rounded-2xl overflow-hidden border border-[#253129] h-[280px] sm:h-[380px] group">
                    <img
                      src={`/img/${activeRes.hero}-lg.webp`}
                      alt={activeRes.heroAlt || activeRes.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-transparent to-transparent opacity-70" />
                    <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-luxury text-[#efe9df]/80 bg-[#0c0f0d]/80 px-2.5 py-1 rounded border border-[#253129]">
                      Living & Outlook
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-[#253129] h-[280px] sm:h-[380px] group">
                    <img
                      src={`/img/${activeRes.plate}-lg.webp`}
                      alt={activeRes.plateAlt || activeRes.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-transparent to-transparent opacity-70" />
                    <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-luxury text-[#efe9df]/80 bg-[#0c0f0d]/80 px-2.5 py-1 rounded border border-[#253129]">
                      Suite Details
                    </span>
                  </div>
                </div>

                {/* Right Column: Specifications & Inquiries */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e] block mb-2">
                      {activeRes.collection}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#efe9df] font-normal mb-3">
                      {activeRes.name}
                    </h3>
                    <p className="font-serif italic text-lg sm:text-xl text-[#c3a78e]/90 leading-snug">
                      &ldquo;{activeRes.line}&rdquo;
                    </p>
                  </div>

                  <p className="font-sans text-sm text-[#efe9df]/75 font-light leading-relaxed">
                    {activeRes.note}
                  </p>

                  {/* Specifications Grid */}
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#253129]/60 font-mono text-xs">
                    <div>
                      <span className="text-[#efe9df]/50 uppercase tracking-wider block text-[10px]">
                        Covered Area
                      </span>
                      <span className="text-base text-[#efe9df] font-serif">
                        {activeRes.area} <span className="font-mono text-xs text-[#c3a78e]">SQ FT</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[#efe9df]/50 uppercase tracking-wider block text-[10px]">
                        Pricing
                      </span>
                      {activeRes.soldOut ? (
                        <span className="text-base text-red-400 font-serif">Sold Out</span>
                      ) : (
                        <span className="text-base text-[#c3a78e] font-serif">
                          From PKR {activeRes.price} <span className="font-mono text-xs text-[#efe9df]/60">crore</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Triggers: Request Floor Plate & 3D Explorer */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button
                      onClick={() => setModalResName(`${activeRes.name} (${activeRes.collection})`)}
                      className="flex-1 flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-[#c3a78e] hover:bg-[#d9c2ad] text-[#0c0f0d] font-mono text-xs uppercase tracking-luxury font-medium transition-all shadow-lg active:scale-95"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Request floor plate</span>
                    </button>

                    <button
                      onClick={onOpenExplorer}
                      className="flex items-center justify-center space-x-2 px-5 py-3.5 rounded-full border border-[#253129] hover:border-[#c3a78e] text-[#efe9df] font-mono text-xs uppercase tracking-luxury transition-colors bg-[#0c0f0d]/50"
                      title="Inspect this unit layout in 3D"
                    >
                      <Compass className="w-4 h-4 text-[#c3a78e]" />
                      <span>Explore in 3D</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Floor Plate Inquiry Modal */}
      <FloorPlateModal
        isOpen={!!modalResName}
        residenceName={modalResName || ''}
        onClose={() => setModalResName(null)}
      />
    </>
  );
};
