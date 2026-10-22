'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Maximize2, RotateCcw } from 'lucide-react';
import siteData from '@/data/siteData';

interface ExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExplorerModal: React.FC<ExplorerModalProps> = ({ isOpen, onClose }) => {
  const explorerUrl = siteData?.project?.explorerUrl || 'https://nathia-reserve-explorer.vercel.app';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-2 sm:p-4 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full h-full max-w-7xl max-h-[92vh] bg-[#0c0f0d] border border-[#253129] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#253129] bg-[#141c17]/80">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-[#c3a78e] animate-pulse" />
                <span className="font-serif text-lg text-[#efe9df]">
                  Serene Heights Nathia Gali · 360° Interactive Explorer
                </span>
                <span className="hidden sm:inline-block font-mono text-[10px] text-[#c3a78e] border border-[#253129] px-2 py-0.5 rounded uppercase">
                  3 Towers · 150+ Suites
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-[#253129] hover:border-[#c3a78e] text-xs font-mono text-[#efe9df] transition-colors"
                  title="Open in standalone tab"
                >
                  <span>Open tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#c3a78e]" />
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full bg-[#1c261f] text-[#efe9df] hover:text-[#c3a78e] transition-colors border border-[#253129]"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Iframe Viewer / 3D Canvas Container */}
            <div className="relative flex-1 bg-black w-full h-full overflow-hidden">
              <iframe
                src={explorerUrl}
                title="Serene Heights Nathia Gali 3D Explorer"
                className="w-full h-full border-0"
                allow="accelerometer; gyroscope; magnetometer; fullscreen"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-6 pointer-events-none bg-[#0c0f0d]/80 backdrop-blur-md px-3 py-1.5 rounded border border-[#253129] font-mono text-[10px] text-[#efe9df]/70 uppercase tracking-wider">
                Click & Drag to rotate · Scroll to zoom
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
