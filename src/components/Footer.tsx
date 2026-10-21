'use client';

import React from 'react';
import { ArrowUp, Instagram, Mail, MapPin } from 'lucide-react';
import siteData from '@/data/siteData';

export const Footer: React.FC = () => {
  const { project } = siteData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070a08] text-[#efe9df] border-t border-[#253129] pt-20 pb-28 md:pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#253129]/60 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl tracking-widest text-[#efe9df] uppercase">
              The Nathia Reserve
            </span>
            <p className="font-sans text-xs text-[#efe9df]/60 font-light max-w-sm leading-relaxed">
              Pakistan&apos;s most premium apartment hotel. 133 private residences on the main Nathia
              Gali road, managed inside one full-service hotel, open all four seasons.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#c3a78e] pt-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{project?.locationLine || 'Nathia Gali · The Galiyat · 7,900 ft'}</span>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#c3a78e] uppercase tracking-luxury block mb-2">
              Development
            </span>
            <p className="text-[#efe9df]/80">Elevate Holdings</p>
            <p className="text-[#efe9df]/50">Founder: {project?.founder}</p>
            <p className="text-[#efe9df]/50">Handover: {project?.handover}</p>
            <p className="text-[#efe9df]/50">Design: {project?.design}</p>
          </div>

          <div className="lg:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-[#c3a78e] uppercase tracking-luxury block mb-2">
              Inquiries & Social
            </span>
            <p className="flex items-center space-x-2 text-[#efe9df]/80">
              <Mail className="w-3.5 h-3.5 text-[#c3a78e]" />
              <a href={`mailto:${project?.email}`} className="hover:text-[#c3a78e] transition-colors">
                {project?.email}
              </a>
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {project?.instagram?.map((h: string) => (
                <a
                  key={h}
                  href={`https://instagram.com/${h.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 rounded-full border border-[#253129] hover:border-[#c3a78e] text-[10px] text-[#efe9df]/70 hover:text-[#efe9df] transition-colors inline-flex items-center space-x-1"
                >
                  <Instagram className="w-3 h-3 text-[#c3a78e]" />
                  <span>{h}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#efe9df]/50 gap-4">
          <p>© {new Date().getFullYear()} The Nathia Reserve · Elevate Holdings. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 hover:text-[#c3a78e] transition-colors"
          >
            <span>Back to Summit (7,900 FT)</span>
            <ArrowUp className="w-4 h-4 text-[#c3a78e]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
