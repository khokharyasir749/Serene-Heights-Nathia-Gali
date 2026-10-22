'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface StructureNode {
  number: string;
  label: string;
}

const STRUCTURE_NODES: StructureNode[] = [
  { number: '10%', label: 'TO BOOK' },
  { number: '1%', label: 'MONTHLY' },
  { number: '10%', label: 'ON POSSESSION' },
  { number: '2030', label: 'HANDOVER' },
];

interface PriceRow {
  title: string;
  isSoldOut: boolean;
  price?: string;
}

const PRICE_ROWS: PriceRow[] = [
  { title: 'Studio', isSoldOut: true },
  { title: '1 Bedroom', isSoldOut: false, price: '3.9' },
  { title: '2 Bedroom', isSoldOut: false, price: '7.1' },
  { title: '3 Bedroom', isSoldOut: false, price: '12.5' },
  { title: 'Penthouse', isSoldOut: false, price: '20' },
];

const APPROVAL_ITEMS = [
  'Galiyat Development Authority (GDA) approval',
  'EPA Khyber Pakhtunkhwa environmental approval',
  'Forest Department clearance',
];

export const CommercialStructurePricing: React.FC = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);

  return (
    <div className="relative w-full bg-[#F4F1EA] text-[#1E2621] select-none">
      <div className="max-w-[1720px] mx-auto px-8 sm:px-14 md:px-20 pb-16">
        {/* ================= PART 1: THE STRUCTURE (image_fa3374.png & image_fa4df9.png) ================= */}
        <div className="pt-10 pb-16">
          {/* Eyebrow */}
          <div className="flex items-center space-x-3 mb-12 sm:mb-16">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#7A7468] uppercase font-light">
              %
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#7A7468]/50 inline-block" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#7A7468] uppercase font-light">
              THE STRUCTURE
            </span>
          </div>

          {/* Timeline Bar & 4 Nodes */}
          <div className="relative w-full my-8">
            {/* Background static hairline track */}
            <div className="absolute top-[5px] left-0 right-0 h-[1px] bg-[#1E2621]/15 overflow-hidden">
              {/* Active filling line */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-[#1E2621]"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
              />
            </div>

            {/* 4 Milestone Columns */}
            <div className="grid grid-cols-4 gap-4 sm:gap-8 md:gap-12 relative z-10">
              {STRUCTURE_NODES.map((node, i) => (
                <div key={i} className="flex flex-col items-start relative">
                  {/* Circle Ring on the track */}
                  <div className="w-2.5 h-2.5 rounded-full border border-[#1E2621] bg-[#F4F1EA]" />

                  {/* Big Number */}
                  <span
                    style={{
                      fontVariantNumeric: 'lining-nums proportional-nums',
                      fontFeatureSettings: '"lnum" 1, "pnum" 1',
                    }}
                    className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#1E2621] font-light leading-none tracking-tight lining-nums tabular-nums mt-7 sm:mt-8 block"
                  >
                    {node.number}
                  </span>

                  {/* Sub-label */}
                  <span className="font-mono text-[9px] sm:text-[10px] md:text-xs tracking-[0.22em] sm:tracking-[0.28em] text-[#7A7468] uppercase font-light mt-3 block">
                    {node.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= PART 2: THE PRICES (image_fa3374.png & image_fa3398.png) ================= */}
        <div className="pt-8 pb-12">
          {/* Eyebrow */}
          <div className="flex items-center space-x-3 mb-10 sm:mb-14">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#7A7468] uppercase font-light">
              PKR
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#7A7468]/50 inline-block" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#7A7468] uppercase font-light">
              THE PRICES
            </span>
          </div>

          {/* Pricing Rows with Hairline Dividers */}
          <div className="w-full">
            {PRICE_ROWS.map((row, idx) => (
              <div
                key={row.title}
                className={`border-t border-[#1E2621]/15 py-6 sm:py-8 flex items-center justify-between ${
                  idx === PRICE_ROWS.length - 1 ? 'border-b border-[#1E2621]/15' : ''
                }`}
              >
                {/* Left Title */}
                <span
                  className={`font-serif text-3xl sm:text-4xl md:text-5xl font-light ${
                    row.isSoldOut ? 'text-[#7A7468]/60' : 'text-[#1E2621]'
                  }`}
                >
                  {row.title}
                </span>

                {/* Right Badge or Price */}
                {row.isSoldOut ? (
                  <span className="px-5 py-2 rounded-full border border-[#7A7468]/40 font-mono text-[10px] tracking-[0.25em] text-[#7A7468] uppercase select-none">
                    SOLD OUT
                  </span>
                ) : (
                  <div className="flex items-baseline">
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#7A7468] mr-2.5 sm:mr-3">
                      FROM PKR
                    </span>
                    <span
                      style={{
                        fontVariantNumeric: 'lining-nums proportional-nums',
                        fontFeatureSettings: '"lnum" 1, "pnum" 1',
                      }}
                      className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1E2621] font-light leading-none lining-nums"
                    >
                      {row.price}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#7A7468] ml-2">
                      CRORE
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Disclaimer Paragraph */}
          <p className="font-sans font-light text-xs sm:text-sm text-[#7A7468] max-w-2xl mt-8 mb-10 leading-relaxed">
            Starting prices. The full payment schedule is released privately to registered buyers
            ahead of phase completion. Any price quoted on an unauthorized third party website is
            not issued by DM Consortium.
          </p>

          {/* Decorative Centered Tan Accent Dot */}
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9BEAE] my-10 sm:my-14 mx-auto" />
        </div>

        {/* ================= PART 3: APPROVALS HELD (image_fa3398.png & image_fa3414.png) ================= */}
        <div className="pt-4 pb-12">
          {/* Eyebrow */}
          <div className="flex items-center space-x-3 mb-8 sm:mb-12">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#7A7468] uppercase font-light">
              ✓
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#7A7468]/50 inline-block" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#7A7468] uppercase font-light">
              APPROVALS HELD
            </span>
          </div>

          {/* Approval Rows */}
          <div className="w-full">
            {APPROVAL_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`border-t border-[#1E2621]/15 py-6 sm:py-8 flex items-center gap-5 sm:gap-6 ${
                  idx === APPROVAL_ITEMS.length - 1 ? 'border-b border-[#1E2621]/15' : ''
                }`}
              >
                {/* Checkmark Icon */}
                <svg
                  className="w-5 h-5 text-[#1E2621] shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                {/* Approval Name */}
                <span className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1E2621] font-light tracking-tight">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= PART 4: BOTTOM STATUS BAR (image_fa3414.png) ================= */}
        <div className="pt-10 pb-6 flex items-center justify-between text-[#1E2621]">
          {/* Left: Site Works & 10 / 12 */}
          <div className="flex flex-col">
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#7A7468] uppercase mb-1.5 font-light">
              SITE WORKS ARE UNDERWAY.
            </span>
            <div className="flex items-center space-x-3">
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#1E2621] font-semibold">
                10 / 12
              </span>
              <span className="w-12 sm:w-16 h-[1px] bg-[#1E2621]/30 inline-block" />
            </div>
          </div>

          {/* Right: Sound Toggle */}
          <div>
            <button
              onClick={() => setIsSoundOn((prev) => !prev)}
              type="button"
              className="flex items-center space-x-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#1E2621]/70 hover:text-[#1E2621] uppercase transition-colors cursor-pointer"
            >
              <span className="font-mono tracking-widest text-[#9B8E7D]">
                {isSoundOn ? '||||' : '....'}
              </span>
              <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
