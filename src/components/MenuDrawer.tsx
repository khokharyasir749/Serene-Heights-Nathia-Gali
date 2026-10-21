'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Compass, PhoneCall } from 'lucide-react';
import siteData from '@/data/siteData';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (id: string) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose, onSelectChapter }) => {
  const { menuLinks, chapters, project } = siteData;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/75 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[90] w-full max-w-xl bg-[#0c0f0d] border-l border-[#253129] flex flex-col justify-between overflow-y-auto"
          >
            {/* Header inside drawer */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-[#253129]/60">
              <div className="flex items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-[#c3a78e] animate-ping" />
                <span className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
                  7,900 FT · Nathia Gali
                </span>
              </div>
              <button
                onClick={onClose}
                className="group flex items-center space-x-2 text-xs font-mono uppercase tracking-luxury text-[#efe9df]/70 hover:text-[#efe9df] transition-colors p-2"
                aria-label="Close menu"
              >
                <span>Close</span>
                <span className="p-1 rounded-full border border-[#253129] group-hover:border-[#c3a78e] transition-colors">
                  <X className="w-4 h-4" />
                </span>
              </button>
            </div>

            {/* Menu Sections */}
            <div className="p-6 md:p-8 flex-1">
              <p className="font-mono text-[11px] uppercase tracking-luxury text-[#c3a78e] mb-6">
                Editorial Chapters
              </p>

              <div className="space-y-4">
                {chapters?.map((ch: any) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      onSelectChapter(ch.id);
                      onClose();
                    }}
                    className="w-full text-left group flex items-baseline justify-between py-2 border-b border-[#253129]/40 hover:border-[#c3a78e]/60 transition-all"
                  >
                    <div className="flex items-baseline space-x-4">
                      <span className="font-mono text-xs text-[#c3a78e]/60 group-hover:text-[#c3a78e] transition-colors">
                        {ch.no}
                      </span>
                      <span className="font-serif text-2xl md:text-3xl text-[#efe9df] group-hover:text-[#c3a78e] transition-colors tracking-wide">
                        {ch.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#253129] group-hover:text-[#c3a78e] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </button>
                ))}
              </div>

              {/* Fast links */}
              <div className="mt-10 pt-6 border-t border-[#253129]">
                <p className="font-mono text-[11px] uppercase tracking-luxury text-[#c3a78e] mb-4">
                  Quick Access
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onSelectChapter('returns');
                      onClose();
                    }}
                    className="p-3 text-left rounded bg-[#141c17] border border-[#253129] hover:border-[#c3a78e] transition-colors"
                  >
                    <span className="block font-mono text-[10px] text-[#c3a78e] uppercase tracking-wider">
                      Financial
                    </span>
                    <span className="font-serif text-base text-[#efe9df]">ROI Calculator</span>
                  </button>
                  <button
                    onClick={() => {
                      onSelectChapter('residences');
                      onClose();
                    }}
                    className="p-3 text-left rounded bg-[#141c17] border border-[#253129] hover:border-[#c3a78e] transition-colors"
                  >
                    <span className="block font-mono text-[10px] text-[#c3a78e] uppercase tracking-wider">
                      Availability
                    </span>
                    <span className="font-serif text-base text-[#efe9df]">133 Residences</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer inside drawer */}
            <div className="p-6 md:p-8 bg-[#090d0a] border-t border-[#253129]/60">
              <div className="text-xs text-[#efe9df]/60 space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-luxury text-[#c3a78e]">
                  Elevate Holdings
                </p>
                <p className="font-serif text-base text-[#efe9df] italic">
                  &ldquo;We are building the addresses Pakistan deserves.&rdquo;
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-mono text-[11px] text-[#efe9df]/50">{project?.email}</span>
                  <a
                    href="https://instagram.com/thenathiareserve"
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] text-[#c3a78e] hover:underline"
                  >
                    @thenathiareserve
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
