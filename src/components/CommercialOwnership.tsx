'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Check, Calendar, TrendingUp, Key } from 'lucide-react';
import siteData from '@/data/siteData';

export const CommercialOwnership: React.FC = () => {
  const { ownership } = siteData;

  return (
    <section
      id="ownership"
      data-chapter="ownership"
      className="relative py-28 md:py-40 bg-[#0c0f0d] text-[#efe9df] border-t border-[#253129]/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
            <span>10 · A Commercial Asset</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-[1.1] font-normal">
            Own it. Earn from it.{' '}
            <span className="font-serif italic text-[#c3a78e]">Never worry about it.</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#efe9df]/80 font-light leading-relaxed pt-2">
            {ownership?.lede}
          </p>
        </div>

        {/* 3 Pillars Grid: Structure, Features, Approvals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Payment Structure */}
          <div className="p-8 rounded-2xl border border-[#253129] bg-[#141c17]/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#c3a78e] uppercase tracking-luxury mb-6">
                <Calendar className="w-4 h-4 text-[#c3a78e]" />
                <span>The Structure</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {ownership?.structure?.map((st: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl border border-[#253129]/60 bg-[#0c0f0d]/60">
                    <span className="block font-serif text-3xl text-[#efe9df] mb-1">{st.value}</span>
                    <span className="font-mono text-[11px] text-[#c3a78e] uppercase tracking-wider">
                      {st.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-mono text-[11px] text-[#efe9df]/50 pt-8 mt-8 border-t border-[#253129]/60 leading-relaxed">
              Flexible 5-year capital deployment plan aligned with construction milestones.
            </p>
          </div>

          {/* Pillar 2: Turnkey Management List */}
          <div className="p-8 rounded-2xl border border-[#253129] bg-[#141c17]/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#c3a78e] uppercase tracking-luxury mb-6">
                <Key className="w-4 h-4 text-[#c3a78e]" />
                <span>Single Operator Model</span>
              </div>

              <div className="space-y-4 font-sans text-sm text-[#efe9df]/85">
                {ownership?.list?.map((item: string, i: number) => (
                  <div key={i} className="flex items-start space-x-3">
                    <span className="w-4 h-4 rounded-full border border-[#c3a78e]/60 flex items-center justify-center text-[#c3a78e] shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span className="font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-mono text-[11px] text-[#efe9df]/50 pt-8 mt-8 border-t border-[#253129]/60 leading-relaxed">
              Elevate Holdings runs the entire asset with 24/7 hospitality teams.
            </p>
          </div>

          {/* Pillar 3: Approvals & Legal Security */}
          <div className="p-8 rounded-2xl border border-[#253129] bg-[#141c17]/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#c3a78e] uppercase tracking-luxury mb-6">
                <ShieldCheck className="w-4 h-4 text-[#c3a78e]" />
                <span>Government Approvals</span>
              </div>

              <div className="space-y-4 font-sans text-sm text-[#efe9df]/85">
                {ownership?.approvals?.map((app: string, i: number) => (
                  <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-[#0c0f0d]/60 border border-[#253129]/60">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-mono text-xs">{app}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#253129]/60 flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#c3a78e] uppercase tracking-wider">
                Status
              </span>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                {ownership?.works || 'Site works are underway'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
