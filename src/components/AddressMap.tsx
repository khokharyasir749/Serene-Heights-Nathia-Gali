'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, ShieldCheck, Compass } from 'lucide-react';
import siteData from '@/data/siteData';

export const AddressMap: React.FC = () => {
  const { address, places } = siteData;

  return (
    <section
      id="address"
      data-chapter="address"
      className="relative py-28 md:py-40 bg-[#090d0a] text-[#efe9df] border-t border-[#253129]/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
              <span>04 · The Only Address</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-[1.1] font-normal">
              The only address on the{' '}
              <span className="font-serif italic text-[#c3a78e]">main Nathia road.</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl text-[#efe9df]/60 font-serif italic pt-3">
                There will never be another.
              </span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#efe9df]/80 font-light leading-relaxed max-w-2xl">
              {address?.body}
            </p>

            <div className="inline-flex items-center space-x-3 text-xs font-mono text-[#c3a78e] bg-[#141c17] px-4 py-2 rounded-full border border-[#253129]">
              <ShieldCheck className="w-4 h-4 text-[#c3a78e]" />
              <span>Bordered by Ayubia National Park · Permanent Protected Vistas</span>
            </div>
          </div>

          {/* Elevation Profile Graphic */}
          <div className="lg:col-span-5 p-8 rounded-2xl border border-[#253129] bg-[#141c17]/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#c3a78e] uppercase tracking-wider mb-4">
                <span>Ridge Line Elevation</span>
                <span>Coordinates</span>
              </div>
              <div className="font-serif text-4xl text-[#efe9df] mb-1">
                7,900 <span className="text-base font-mono text-[#c3a78e]">FT</span>
              </div>
              <p className="font-mono text-xs text-[#efe9df]/60">
                34.0722° N, 73.3842° E · Highest ridge point
              </p>
            </div>

            <div className="my-8 py-6 border-y border-[#253129]/60">
              <div className="flex justify-between text-[11px] font-mono text-[#efe9df]/60 mb-2">
                <span>Islamabad (1,750 FT)</span>
                <span>The Reserve (7,900 FT)</span>
              </div>
              <div className="relative h-2 rounded-full bg-[#253129] overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-full bg-gradient-to-r from-[#253129] via-[#c3a78e]/60 to-[#c3a78e]" />
              </div>
              <div className="text-right text-[10px] font-mono text-[#c3a78e] mt-1.5">
                ▲ +6,150 FT Net Elevation Gain
              </div>
            </div>

            <p className="font-mono text-[11px] text-[#efe9df]/50 uppercase tracking-luxury">
              {address?.note}
            </p>
          </div>
        </div>

        {/* Driving Distance Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {places?.map((pl: any, idx: number) => (
            <motion.div
              key={pl.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-xl border border-[#253129] bg-[#141c17]/40 hover:border-[#c3a78e]/60 transition-all group"
            >
              <div className="flex items-center justify-between text-[#c3a78e] mb-4">
                <MapPin className="w-4 h-4 text-[#c3a78e] group-hover:scale-110 transition-transform" />
                <span className="font-mono text-xs text-[#efe9df]/50">{pl.km}</span>
              </div>
              <h3 className="font-serif text-lg text-[#efe9df] mb-2 font-medium">{pl.name}</h3>
              <div className="flex items-center space-x-1.5 text-xs font-mono text-[#c3a78e]/90">
                <Clock className="w-3.5 h-3.5" />
                <span>{pl.drive}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
