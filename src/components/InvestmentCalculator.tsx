'use client';

import React, { useState, useMemo } from 'react';

interface InvestmentCalculatorProps {
  onRegisterClick?: () => void;
}

interface ResidenceType {
  name: string;
  priceLabel: string;
  priceCrore: number; // in crores (1 crore = 10,000,000 PKR)
  defaultRate: number;
  minRate: number;
  maxRate: number;
  rateStep: number;
}

const RESIDENCE_TYPES: ResidenceType[] = [
  {
    name: '1 Bedroom',
    priceLabel: 'from PKR 3.9 crore',
    priceCrore: 3.9,
    defaultRate: 70000,
    minRate: 40000,
    maxRate: 150000,
    rateStep: 2500,
  },
  {
    name: '2 Bedroom',
    priceLabel: 'from PKR 7.1 crore',
    priceCrore: 7.1,
    defaultRate: 125000,
    minRate: 70000,
    maxRate: 220000,
    rateStep: 2500,
  },
  {
    name: '3 Bedroom',
    priceLabel: 'from PKR 12.5 crore',
    priceCrore: 12.5,
    defaultRate: 200000,
    minRate: 100000,
    maxRate: 350000,
    rateStep: 5000,
  },
];

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({ onRegisterClick }) => {
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const selectedUnit = RESIDENCE_TYPES[selectedUnitIndex];

  const [nightlyRate, setNightlyRate] = useState<number>(RESIDENCE_TYPES[0].defaultRate);
  const [occupancy, setOccupancy] = useState<number>(60);
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Switch residence and reset its default nightly rate
  const handleUnitChange = (index: number) => {
    setSelectedUnitIndex(index);
    setNightlyRate(RESIDENCE_TYPES[index].defaultRate);
  };

  // Reactive financial calculations
  const {
    nights,
    grossCrore,
    mgmtCrore,
    netCrore,
    netMonthLakh,
    yieldFormatted,
    paybackFormatted,
    multiplierFormatted,
  } = useMemo(() => {
    const calculatedNights = Math.round((occupancy / 100) * 365);
    const grossIncomePKR = nightlyRate * calculatedNights;
    const managementFeePKR = grossIncomePKR * 0.3; // 30% hotel management
    const netYearlyPKR = grossIncomePKR - managementFeePKR;
    const netMonthlyPKR = netYearlyPKR / 12;

    const pricePKR = selectedUnit.priceCrore * 10000000;
    const yieldPct = (netYearlyPKR / pricePKR) * 100;
    const payback = pricePKR / netYearlyPKR;

    // Monthly instalment on 1% monthly plan
    const monthlyInstalmentPKR = pricePKR * 0.01;
    const mult = netMonthlyPKR / monthlyInstalmentPKR;

    return {
      nights: calculatedNights,
      grossCrore: (grossIncomePKR / 10000000).toFixed(2),
      mgmtCrore: (managementFeePKR / 10000000).toFixed(2),
      netCrore: (netYearlyPKR / 10000000).toFixed(2),
      netMonthLakh: (netMonthlyPKR / 100000).toFixed(1),
      yieldFormatted: yieldPct.toFixed(1),
      paybackFormatted: payback.toFixed(1),
      multiplierFormatted: mult.toFixed(1),
    };
  }, [selectedUnit, nightlyRate, occupancy]);

  return (
    <section
      id="returns"
      data-chapter="returns"
      className="relative w-full bg-[#161B18] text-[#EAE6DE] select-none"
    >
      <div className="max-w-[1720px] mx-auto px-8 sm:px-14 md:px-20 pt-28 pb-16">
        {/* ================= HEADER BLOCK (Screenshot 112721.png) ================= */}
        <div>
          {/* Eyebrow */}
          <div className="flex items-center space-x-3 mb-8">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#A8A195] uppercase font-light">
              11
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#A8A195]/50 inline-block" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#A8A195] uppercase font-light">
              WHAT IT EARNS
            </span>
          </div>

          {/* Two-Tone Headline */}
          <h2 className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-[#EAE6DE] leading-[0.92] tracking-tight block">
            It is not a second home.
          </h2>
          <div className="mt-2 sm:mt-3 flex items-baseline">
            <span className="font-serif italic font-light text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-[#C9BEAE] leading-[0.95] tracking-normal inline-block">
              It is a business.
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9BEAE] ml-5 sm:ml-7 mb-2 sm:mb-4 align-middle" />
          </div>

          {/* Editorial Paragraph */}
          <p className="font-sans font-light text-xs sm:text-sm md:text-base leading-relaxed text-[#C4BCB0] max-w-xl mt-10">
            Every residence is run inside the Reserve’s own hotel operation, so it works all year
            rather than sitting shut for eleven months. The two numbers below are the ones that decide
            the answer: what a night sells for, and how full the building is. Both start where we
            expect to run them. Move either and watch the figure change.
          </p>
        </div>

        {/* ================= ROI BANNER (Screenshot 112743.png) ================= */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 mt-20 sm:mt-24">
          <span
            style={{
              fontVariantNumeric: 'lining-nums proportional-nums',
              fontFeatureSettings: '"lnum" 1, "pnum" 1',
            }}
            className="font-serif font-light text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] text-[#C9BEAE] leading-none tracking-tight lining-nums"
          >
            Up to 35%
          </span>
          <p className="font-sans font-light text-xs sm:text-sm text-[#A8A195] max-w-xs leading-relaxed self-center">
            net a year at 60% occupancy and our own planned nightly rates, before you change a thing
          </p>
        </div>

        {/* ================= MAIN SPLIT GRID (Screenshot 112743.png & 112802.png) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-16 sm:mt-20 items-start">
          {/* Left Column (Interactive Controls) */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#A8A195] uppercase font-light mb-6 block">
                YOUR RESIDENCE, AS AN ASSET
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#A8A195] uppercase font-light mb-4 block">
                RESIDENCE
              </span>

              {/* 3 Unit Selector Tabs */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {RESIDENCE_TYPES.map((unit, idx) => {
                  const isSelected = selectedUnitIndex === idx;
                  return (
                    <button
                      key={unit.name}
                      type="button"
                      onClick={() => handleUnitChange(idx)}
                      className={`p-4 sm:p-5 border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C9BEAE] bg-[#C9BEAE]/5'
                          : 'border-[#7A7468]/30 hover:border-[#7A7468]/60 bg-transparent'
                      }`}
                    >
                      <span className="block font-serif text-base sm:text-lg font-light text-[#EAE6DE]">
                        {unit.name}
                      </span>
                      <span className="block font-mono text-[10px] sm:text-[11px] text-[#A8A195] mt-1.5 tracking-wider">
                        {unit.priceLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider 1: Nightly Rate */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light">
                  NIGHTLY RATE
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'lining-nums proportional-nums',
                    fontFeatureSettings: '"lnum" 1, "pnum" 1',
                  }}
                  className="font-serif text-xl sm:text-2xl text-[#EAE6DE] font-light lining-nums"
                >
                  PKR {nightlyRate.toLocaleString()} a night
                </span>
              </div>
              <input
                type="range"
                min={selectedUnit.minRate}
                max={selectedUnit.maxRate}
                step={selectedUnit.rateStep}
                value={nightlyRate}
                onChange={(e) => setNightlyRate(Number(e.target.value))}
                className="calc-range-slider"
              />
              <p className="font-sans font-light text-xs text-[#7A7468] mt-3 leading-relaxed">
                Starts at the Reserve’s own planned nightly rate for this residence type. Planned: PKR {selectedUnit.defaultRate.toLocaleString()}.
              </p>
            </div>

            {/* Slider 2: Occupancy Across The Year */}
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light">
                  OCCUPANCY ACROSS THE YEAR
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'lining-nums proportional-nums',
                    fontFeatureSettings: '"lnum" 1, "pnum" 1',
                  }}
                  className="font-serif text-xl sm:text-2xl text-[#EAE6DE] font-light lining-nums"
                >
                  {occupancy}% — {nights} nights
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={90}
                step={1}
                value={occupancy}
                onChange={(e) => setOccupancy(Number(e.target.value))}
                className="calc-range-slider"
              />
              <p className="font-sans font-light text-xs text-[#7A7468] mt-3 leading-relaxed">
                Starts at our planning figure of 60% of the year let.
              </p>
            </div>
          </div>

          {/* Right Column (Dynamic Calculations Ledger) */}
          <div className="lg:col-span-6">
            <div className="w-full">
              {/* Row 1: Nights let a year */}
              <div className="border-b border-[#253129] py-5 flex items-center justify-between">
                <span className="font-sans font-light text-xs sm:text-sm md:text-base text-[#A8A195]">
                  Nights let a year
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'lining-nums proportional-nums',
                    fontFeatureSettings: '"lnum" 1, "pnum" 1',
                  }}
                  className="font-serif text-xl sm:text-2xl text-[#EAE6DE] font-light lining-nums tabular-nums"
                >
                  {nights}
                </span>
              </div>

              {/* Row 2: Gross room income a year */}
              <div className="border-b border-[#253129] py-5 flex items-center justify-between">
                <span className="font-sans font-light text-xs sm:text-sm md:text-base text-[#A8A195]">
                  Gross room income a year ({nightlyRate.toLocaleString()} × {nights})
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'lining-nums proportional-nums',
                    fontFeatureSettings: '"lnum" 1, "pnum" 1',
                  }}
                  className="font-serif text-xl sm:text-2xl text-[#EAE6DE] font-light lining-nums tabular-nums"
                >
                  PKR {grossCrore} crore
                </span>
              </div>

              {/* Row 3: Less hotel management */}
              <div className="border-b border-[#253129] py-5 flex items-center justify-between">
                <span className="font-sans font-light text-xs sm:text-sm md:text-base text-[#A8A195]">
                  Less hotel management (30% of gross)
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'lining-nums proportional-nums',
                    fontFeatureSettings: '"lnum" 1, "pnum" 1',
                  }}
                  className="font-serif text-xl sm:text-2xl text-[#A8A195] font-light lining-nums tabular-nums"
                >
                  – PKR {mgmtCrore} crore
                </span>
              </div>

              {/* Row 4: Net to you a year */}
              <div className="border-b border-[#253129] py-5 flex items-center justify-between">
                <span className="font-sans font-light text-xs sm:text-sm md:text-base text-[#EAE6DE]">
                  Net to you a year
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'lining-nums proportional-nums',
                    fontFeatureSettings: '"lnum" 1, "pnum" 1',
                  }}
                  className="font-serif text-2xl sm:text-3xl text-[#EAE6DE] font-light lining-nums tabular-nums"
                >
                  PKR {netCrore} crore
                </span>
              </div>

              {/* Row 5: Net to you a month */}
              <div className="border-b border-[#253129] py-5 flex items-center justify-between">
                <span className="font-sans font-light text-xs sm:text-sm md:text-base text-[#A8A195]">
                  Net to you a month
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'lining-nums proportional-nums',
                    fontFeatureSettings: '"lnum" 1, "pnum" 1',
                  }}
                  className="font-serif text-xl sm:text-2xl text-[#EAE6DE] font-light lining-nums tabular-nums"
                >
                  PKR {netMonthLakh} lakh
                </span>
              </div>

              {/* Row 6: Net yield on the starting price */}
              <div className="border-b border-[#253129] py-6 flex items-center justify-between">
                <span className="font-sans font-light text-xs sm:text-sm md:text-base text-[#A8A195]">
                  Net yield on the starting price
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'lining-nums proportional-nums',
                    fontFeatureSettings: '"lnum" 1, "pnum" 1',
                  }}
                  className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#C9BEAE] font-light lining-nums tabular-nums"
                >
                  {yieldFormatted}%
                </span>
              </div>

              {/* Row 7: Years to pay back the purchase */}
              <div className="border-b border-[#253129] py-5 flex items-center justify-between">
                <span className="font-sans font-light text-xs sm:text-sm md:text-base text-[#A8A195]">
                  Years to pay back the purchase
                </span>
                <span
                  style={{
                    fontVariantNumeric: 'lining-nums proportional-nums',
                    fontFeatureSettings: '"lnum" 1, "pnum" 1',
                  }}
                  className="font-serif text-xl sm:text-2xl text-[#EAE6DE] font-light lining-nums tabular-nums"
                >
                  {paybackFormatted} years
                </span>
              </div>
            </div>

            {/* Multiplier Callout */}
            <p className="font-sans font-light text-xs sm:text-sm text-[#A8A195] mt-8 leading-relaxed max-w-md">
              At these assumptions the residence earns{' '}
              <span
                style={{
                  fontVariantNumeric: 'lining-nums proportional-nums',
                  fontFeatureSettings: '"lnum" 1, "pnum" 1',
                }}
                className="font-serif italic text-base sm:text-lg text-[#C9BEAE] lining-nums"
              >
                {multiplierFormatted}×
              </span>{' '}
              what its own monthly instalment costs.
            </p>

            {/* CTA Button */}
            <button
              onClick={onRegisterClick}
              type="button"
              className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#C9BEAE] text-[#161B18] font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-[#EAE6DE] transition-all flex items-center justify-center gap-3 mt-10 shadow-lg cursor-pointer"
            >
              <span>GET THE FIGURES FOR A SPECIFIC RESIDENCE</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>

        {/* ================= BOTTOM STATUS BAR (Screenshot 112721.png & 112802.png) ================= */}
        <div className="pt-16 pb-8 flex items-center justify-between text-[#EAE6DE] mt-10">
          {/* Left: 11 / 12 */}
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#EAE6DE] font-semibold">
              11 / 12
            </span>
            <span className="w-12 sm:w-16 h-[1px] bg-[#EAE6DE]/30 inline-block" />
          </div>

          {/* Right: Sound Toggle */}
          <div>
            <button
              onClick={() => setIsSoundOn((prev) => !prev)}
              type="button"
              className="flex items-center space-x-2.5 font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-[#EAE6DE]/70 hover:text-[#EAE6DE] uppercase transition-colors cursor-pointer"
            >
              <span className="font-mono tracking-widest text-[#C9BEAE]">
                {isSoundOn ? '||||' : '....'}
              </span>
              <span>{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
