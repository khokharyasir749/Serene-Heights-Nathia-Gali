'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, ExternalLink, Box, Sparkles } from 'lucide-react';
import siteData from '@/data/siteData';

interface ExplorerSectionProps {
  onOpenExplorer: () => void;
}

export const ExplorerSection: React.FC<ExplorerSectionProps> = ({ onOpenExplorer }) => {
  const { explorer, project } = siteData;

  return (
    <section
      id="explorer"
      data-chapter="explorer"
      className="relative py-24 md:py-36 bg-[#0c0f0d] text-[#efe9df] border-t border-[#253129]/40 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-[#253129] bg-gradient-to-b from-[#141c17] to-[#0c0f0d] p-8 md:p-14 overflow-hidden shadow-2xl"
        >
          {/* Subtle background ambient glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#c3a78e]/10 blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e] px-3 py-1 rounded-full border border-[#253129] bg-[#0c0f0d]/60">
                <Box className="w-3.5 h-3.5 text-[#c3a78e]" />
                <span>3D Explorer</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-tight font-normal">
                Tour both towers{' '}
                <span className="font-serif italic text-[#c3a78e]">in 360°.</span>
              </h2>

              <p className="font-sans text-base md:text-lg text-[#efe9df]/75 font-light max-w-lg leading-relaxed">
                Browse studios, apartments and penthouses, and view floor plans in interactive 3D.
                Fly over the ridge, walk through the skywalk and inspect unit layouts.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenExplorer}
                  className="group flex items-center space-x-3 px-7 py-3.5 rounded-full bg-[#c3a78e] hover:bg-[#d9c2ad] text-[#0c0f0d] font-mono text-xs uppercase tracking-luxury font-medium transition-all shadow-xl hover:shadow-[#c3a78e]/30"
                >
                  <Compass className="w-4 h-4 text-[#0c0f0d] group-hover:rotate-45 transition-transform" />
                  <span>Enter the explorer</span>
                </button>

                <a
                  href={project?.explorerUrl || 'https://nathia-reserve-explorer.vercel.app'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-2 px-5 py-3.5 rounded-full border border-[#253129] hover:border-[#c3a78e] text-[#efe9df] font-mono text-xs uppercase tracking-luxury transition-colors"
                >
                  <span>Open in a new tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#c3a78e]" />
                </a>
              </div>
            </div>

            {/* Right preview poster */}
            <div className="lg:col-span-5 relative">
              <div
                onClick={onOpenExplorer}
                className="group cursor-pointer relative rounded-2xl overflow-hidden border border-[#253129] hover:border-[#c3a78e]/60 transition-all duration-500 shadow-2xl"
              >
                <img
                  src="/explorer/poster.webp"
                  alt="3D Building model preview of The Nathia Reserve"
                  className="w-full h-[280px] sm:h-[340px] object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#0c0f0d]/30 group-hover:bg-[#0c0f0d]/10 transition-colors" />

                {/* Central Play/Explore Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-[#0c0f0d]/80 border border-[#c3a78e] backdrop-blur-md text-[#c3a78e] group-hover:scale-110 group-hover:bg-[#c3a78e] group-hover:text-[#0c0f0d] transition-all shadow-2xl">
                    <Compass className="w-8 h-8 animate-spin-slow" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-[#efe9df]/80 bg-[#0c0f0d]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#253129]">
                  <span>Interactive 3D Engine</span>
                  <span className="text-[#c3a78e]">Click to Launch</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
