'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, HelpCircle, Check, Info } from 'lucide-react';
import siteData from '@/data/siteData';

interface ReturnsCalculatorProps {
  onRegisterClick: () => void;
}

export const ReturnsCalculator: React.FC<ReturnsCalculatorProps> = ({ onRegisterClick }) => {
  const { returns, rentalBasis, nightlyRate } = siteData;

  // Available residences with pricing for calculator
  const calcResidences = [
    { name: '1 Bedroom', price: 3.9, defaultRate: 70000, minRate: 40000, maxRate: 120000 },
    { name: '2 Bedroom', price: 7.1, defaultRate: 160000, minRate: 90000, maxRate: 260000 },
    { name: '3 Bedroom', price: 12.5, defaultRate: 250000, minRate: 140000, maxRate: 400000 },
  ];

  const [selectedUnit, setSelectedUnit] = useState(calcResidences[0]);
  const [currentRate, setCurrentRate] = useState<number>(calcResidences[0].defaultRate);
  const [occupancy, setOccupancy] = useState<number>(rentalBasis?.occupancy || 60);

  // Switch residence and reset its default nightly rate
  const handleSelectUnit = (unit: typeof calcResidences[0]) => {
    setSelectedUnit(unit);
    setCurrentRate(unit.defaultRate);
  };

  // Perform calculations
  const stats = useMemo(() => {
    const pricePKR = selectedUnit.price * 10000000; // 1 crore = 10 million PKR
    const nights = Math.round((occupancy / 100) * 365);
    const grossIncome = currentRate * nights;
    const managementFee = grossIncome * 0.3; // 30% hotel management
    const netIncome = grossIncome - managementFee;
    const monthlyNet = netIncome / 12;
    const yieldPct = (netIncome / pricePKR) * 100;
    const paybackYears = pricePKR / netIncome;

    const monthlyInstalment = pricePKR * 0.01; // 1% monthly plan
    const timesMultiplier = monthlyNet / monthlyInstalment;

    return {
      pricePKR,
      nights,
      grossIncome,
      managementFee,
      netIncome,
      monthlyNet,
      yieldPct,
      paybackYears,
      monthlyInstalment,
      timesMultiplier,
    };
  }, [selectedUnit, currentRate, occupancy]);

  // Currency formatters
  const formatPKR = (amount: number) => {
    return 'PKR ' + Math.round(amount).toLocaleString('en-US');
  };

  const formatCrore = (amount: number) => {
    return `PKR ${(amount / 10000000).toFixed(2)} crore`;
  };

  const formatLakh = (amount: number) => {
    return `PKR ${(amount / 100000).toFixed(1)} lakh`;
  };

  return (
    <section
      id="returns"
      data-chapter="returns"
      className="relative py-28 md:py-40 bg-[#090d0a] text-[#efe9df] border-t border-[#253129]/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
            <span>11 · What It Earns</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-[1.1] font-normal">
            It is not a second home.{' '}
            <span className="font-serif italic text-[#c3a78e]">It is a business.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#efe9df]/80 font-light leading-relaxed">
            {returns?.lede}
          </p>
        </div>

        {/* Top Highlight Yield Banner */}
        <div className="mb-12 p-6 md:p-8 rounded-2xl border border-[#253129] bg-gradient-to-r from-[#141c17] to-[#0c0f0d] flex flex-col md:flex-row items-baseline justify-between gap-4">
          <div className="flex items-baseline space-x-3">
            <span className="font-serif text-4xl sm:text-5xl text-[#c3a78e] font-light">
              Up to {stats.yieldPct.toFixed(1)}%
            </span>
            <span className="font-serif text-xl sm:text-2xl text-[#efe9df]">net a year</span>
          </div>
          <p className="font-mono text-xs text-[#efe9df]/60 max-w-md">
            At {occupancy}% annual occupancy and {formatPKR(currentRate)}/night operating rate, before
            capital appreciation.
          </p>
        </div>

        {/* Interactive Calculator Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Left Column: Sliders & Residence Selector */}
          <div className="lg:col-span-7 p-6 md:p-10 rounded-3xl border border-[#253129] bg-[#141c17]/60 space-y-8 shadow-2xl">
            <div>
              <span className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e] block mb-3">
                1. Select Residence Type
              </span>
              <div className="grid grid-cols-3 gap-3">
                {calcResidences.map((unit) => {
                  const isSelected = unit.name === selectedUnit.name;
                  return (
                    <button
                      key={unit.name}
                      onClick={() => handleSelectUnit(unit)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-[#c3a78e] bg-[#1d2920] shadow-md'
                          : 'border-[#253129] bg-[#0c0f0d]/50 hover:border-[#c3a78e]/50'
                      }`}
                    >
                      <span className="block font-serif text-base sm:text-lg text-[#efe9df] mb-1">
                        {unit.name}
                      </span>
                      <span className="block font-mono text-[11px] text-[#c3a78e]">
                        PKR {unit.price} cr
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slider 1: Nightly Rate */}
            <div className="space-y-3 pt-4 border-t border-[#253129]/60">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-luxury text-[#efe9df]">
                    Nightly Rate
                  </span>
                  <p className="font-sans text-[11px] text-[#efe9df]/50 font-light">
                    {returns?.rateNote}
                  </p>
                </div>
                <span className="font-mono text-base sm:text-lg font-medium text-[#c3a78e]">
                  {formatPKR(currentRate)}
                </span>
              </div>
              <input
                type="range"
                min={selectedUnit.minRate}
                max={selectedUnit.maxRate}
                step={2500}
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#c3a78e]"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#efe9df]/40">
                <span>Min: {formatPKR(selectedUnit.minRate)}</span>
                <span>Max: {formatPKR(selectedUnit.maxRate)}</span>
              </div>
            </div>

            {/* Slider 2: Annual Occupancy */}
            <div className="space-y-3 pt-4 border-t border-[#253129]/60">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-luxury text-[#efe9df]">
                    Annual Occupancy
                  </span>
                  <p className="font-sans text-[11px] text-[#efe9df]/50 font-light">
                    {returns?.occNote}
                  </p>
                </div>
                <span className="font-mono text-base sm:text-lg font-medium text-[#c3a78e]">
                  {occupancy}% ({stats.nights} nights/yr)
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={90}
                step={1}
                value={occupancy}
                onChange={(e) => setOccupancy(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#c3a78e]"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#efe9df]/40">
                <span>30% (Low season)</span>
                <span>Planning figure: 60%</span>
                <span>90% (Peak capacity)</span>
              </div>
            </div>

            {/* Crossover Monthly Callout */}
            {stats.timesMultiplier >= 1 && (
              <div className="p-4 rounded-xl bg-[#0c0f0d] border border-[#c3a78e]/40 flex items-center space-x-3 text-xs">
                <TrendingUp className="w-5 h-5 text-[#c3a78e] shrink-0" />
                <p className="font-sans text-[#efe9df]/90 font-light">
                  At these assumptions the residence earns{' '}
                  <strong className="text-[#c3a78e] font-serif text-sm">
                    {stats.timesMultiplier.toFixed(1)}x
                  </strong>{' '}
                  what its own monthly instalment costs.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Calculated Yield Breakdown Ledger */}
          <div className="lg:col-span-5 p-6 md:p-10 rounded-3xl border border-[#253129] bg-[#141c17] space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#253129] pb-4">
              <span className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
                Pro-Forma Ledger
              </span>
              <span className="font-mono text-[11px] text-[#efe9df]/50">
                {selectedUnit.name}
              </span>
            </div>

            {/* Ledger Rows */}
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between py-1">
                <span className="text-[#efe9df]/70">{returns?.rows?.nights}</span>
                <span className="text-[#efe9df]">{stats.nights} nights</span>
              </div>

              <div className="flex justify-between py-1">
                <span className="text-[#efe9df]/70">{returns?.rows?.gross}</span>
                <span className="text-[#efe9df]">{formatLakh(stats.grossIncome)}</span>
              </div>

              <div className="flex justify-between py-1 text-red-300">
                <span>{returns?.rows?.fee} (30%)</span>
                <span>- {formatLakh(stats.managementFee)}</span>
              </div>

              <div className="flex justify-between py-2 border-t border-[#253129] font-medium text-sm text-[#efe9df]">
                <span>{returns?.rows?.net}</span>
                <span className="text-[#c3a78e]">{formatCrore(stats.netIncome)}</span>
              </div>

              <div className="flex justify-between py-1 text-[#efe9df]/80">
                <span>{returns?.rows?.monthly}</span>
                <span>{formatLakh(stats.monthlyNet)} / mo</span>
              </div>

              <div className="flex justify-between py-2 border-t border-[#253129] text-sm">
                <span className="text-[#c3a78e] uppercase tracking-wider">
                  {returns?.rows?.yield}
                </span>
                <span className="font-serif text-xl text-[#c3a78e]">
                  {stats.yieldPct.toFixed(1)}%
                </span>
              </div>

              <div className="flex justify-between py-1 text-[#efe9df]/70">
                <span>{returns?.rows?.payback}</span>
                <span className="text-[#efe9df] font-medium">
                  {stats.paybackYears.toFixed(1)} years
                </span>
              </div>
            </div>

            {/* CTA inside returns module */}
            <button
              onClick={onRegisterClick}
              className="w-full mt-6 py-4 rounded-full bg-[#c3a78e] hover:bg-[#d9c2ad] text-[#0c0f0d] font-mono text-xs uppercase tracking-luxury font-medium transition-all shadow-xl active:scale-95"
            >
              Get figures for a specific residence
            </button>
          </div>
        </div>

        {/* Assumptions Stated */}
        <div className="mt-16 p-6 md:p-8 rounded-2xl border border-[#253129]/60 bg-[#0c0f0d]/60">
          <h3 className="font-serif text-xl text-[#efe9df] mb-4 flex items-center space-x-2">
            <Info className="w-4 h-4 text-[#c3a78e]" />
            <span>The assumptions, stated</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-xs text-[#efe9df]/70 leading-relaxed font-light">
            {returns?.assumptions?.map((ass: string, i: number) => (
              <p key={i} className="border-l border-[#253129] pl-3">
                {ass}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
