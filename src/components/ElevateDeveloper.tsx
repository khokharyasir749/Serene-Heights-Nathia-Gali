'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Award, Compass, ShieldCheck } from 'lucide-react';
import siteData from '@/data/siteData';

export const ElevateDeveloper: React.FC = () => {
  const { elevate, project } = siteData;

  return (
    <section
      id="elevate"
      data-chapter="elevate"
      className="relative py-28 md:py-40 bg-[#0c0f0d] text-[#efe9df] border-t border-[#253129]/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Founder Photo & Credential Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-[#253129] shadow-2xl group">
              <img
                src="/img/founder-lg.webp"
                alt="Fahad Masud Lone, Founder of DM Consortium"
                className="w-full h-[460px] md:h-[540px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f0d] via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0c0f0d]/85 backdrop-blur-md border border-[#253129]">
                <span className="font-mono text-[10px] uppercase tracking-luxury text-[#c3a78e] block mb-1">
                  Founder & Operator
                </span>
                <h3 className="font-serif text-2xl text-[#efe9df] font-normal">
                  Fahad Masud Lone
                </h3>
                <p className="font-sans text-xs text-[#efe9df]/70 font-light mt-1">
                  15+ landmark residential and commercial developments successfully delivered across Pakistan.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: DM Consortium Manifesto & Partners */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
              <span>12 · DM Consortium</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-[1.1] font-normal">
              Fifteen landmarks. Proven delivery.{' '}
              <span className="font-serif italic text-[#c3a78e]">One standard.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#efe9df]/80 font-light leading-relaxed">
              Founded in 2018 by Fahad Masud Lone, DM Consortium is dedicated to crafting Pakistan’s
              most prestigious addresses. Serene Heights Nathia Gali stands as the flagship luxury
              mountain resort: spanning 30+ Kanals with 150+ suites, Italian central heating, and 24/7 5-star hospitality.
            </p>

            {/* Founder Quote */}
            <div className="border-l-2 border-[#c3a78e] pl-6 py-2 my-6">
              <p className="font-serif text-xl sm:text-2xl italic text-[#efe9df] font-light leading-snug">
                &ldquo;We are building the addresses Pakistan deserves. It begins at 7,906 feet in Nathia Gali.&rdquo;
              </p>
              <span className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e] block mt-3">
                Fahad Masud Lone · Founder · DM Consortium
              </span>
            </div>

            {/* Project Delivery Partners */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#253129]/60 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#141c17] border border-[#253129]">
                <span className="text-[#efe9df]/50 uppercase tracking-wider text-[10px] block mb-1">
                  Architecture & Masterplan
                </span>
                <span className="font-serif text-lg text-[#efe9df]">
                  {project?.design || 'DM Consortium Design Wing'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#141c17] border border-[#253129]">
                <span className="text-[#efe9df]/50 uppercase tracking-wider text-[10px] block mb-1">
                  General Contractor
                </span>
                <span className="font-serif text-lg text-[#efe9df]">
                  {project?.contractor || 'DM Consortium Infrastructure'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
