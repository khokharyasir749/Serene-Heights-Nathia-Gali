'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RESIDENCE_OPTIONS = [
  { id: 'studio', label: 'Studio', soldOut: true },
  { id: '1bed', label: '1 Bedroom', soldOut: false },
  { id: '2bed', label: '2 Bedroom', soldOut: false },
  { id: '3bed', label: '3 Bedroom', soldOut: false },
  { id: 'penthouse', label: 'Penthouse', soldOut: false },
  { id: 'advise', label: 'Advise me', soldOut: false },
];

const TIMING_OPTIONS = [
  { id: 'ready', label: 'Ready now' },
  { id: 'months', label: 'Next few months' },
  { id: 'exploring', label: 'Just exploring' },
];

const DIAL_CODES = [
  { code: '+92', label: '🇵🇰 +92' },
  { code: '+44', label: '🇬🇧 +44' },
  { code: '+971', label: '🇦🇪 +971' },
  { code: '+966', label: '🇸🇦 +966' },
  { code: '+1', label: '🇺🇸 +1' },
  { code: '+974', label: '🇶🇦 +974' },
];

export const PublicReleaseRegistration: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Interest & Timing, 2: Contact Info, 3: Success
  const [selectedInterest, setSelectedInterest] = useState<string>('Advise me');
  const [selectedTiming, setSelectedTiming] = useState<string>('Ready now');

  // Step 2 Form States
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [dialCode, setDialCode] = useState('+92');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Audio Toggle state for bottom status bar
  const [isSoundOn, setIsSoundOn] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (step === 1) {
      if (!selectedInterest) {
        setErrorMsg('Please select a residence type.');
        return;
      }
      if (!selectedTiming) {
        setErrorMsg('Please select your purchasing timeframe.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!city.trim()) {
        setErrorMsg('Please enter your city of residence.');
        return;
      }
      if (!whatsapp.trim()) {
        setErrorMsg('Please provide your WhatsApp contact number.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('Please provide a valid email address.');
        return;
      }

      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(3);
      }, 700);
    }
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello, I would like priority founder's allocation details for Serene Heights Nathia Gali. (Selected: ${selectedInterest}, Timeframe: ${selectedTiming})`
    );
    window.open(`https://wa.me/923008497999?text=${text}`, '_blank');
  };

  return (
    <section
      id="register"
      data-chapter="register"
      className="relative w-full bg-[#161B18] text-[#EAE6DE] select-none min-h-screen flex flex-col justify-between"
    >
      <div className="max-w-[1720px] mx-auto w-full px-8 sm:px-14 md:px-20 py-24 sm:py-28 flex-1 flex flex-col justify-between">
        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start my-auto">
          {/* ================= LEFT COLUMN (Editorial & Priority Tiers) ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center space-x-3 mb-8">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#A8A195] uppercase font-light">
                  14
                </span>
                <span className="w-8 sm:w-10 h-[1px] bg-[#A8A195]/50 inline-block" />
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] text-[#A8A195] uppercase font-light">
                  PUBLIC RELEASE
                </span>
              </div>

              {/* Two-Tone Headline */}
              <h2 className="font-serif font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] text-[#EAE6DE] leading-[0.92] tracking-tight block">
                Register
              </h2>
              <div className="flex items-baseline mt-2 sm:mt-3">
                <span className="font-serif italic font-light text-6xl sm:text-7xl md:text-8xl lg:text-[7rem] text-[#C9BEAE] leading-[0.95] tracking-normal inline-block">
                  your interest.
                </span>
                {/* Floating Tan Accent Dot */}
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C9BEAE] ml-8 mb-4 align-middle" />
              </div>

              {/* Editorial Subtext */}
              <p className="font-sans font-light text-sm sm:text-base leading-relaxed text-[#C4BCB0] max-w-lg mt-8 mb-12">
                A limited number of residences are released first, at founders’ terms, to those who
                register before the public launch.
              </p>

              {/* Priority Tier Rows */}
              <div className="w-full space-y-0">
                {/* Row I */}
                <div className="border-t border-[#7A7468]/20 py-6 grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-1 font-serif text-lg sm:text-xl text-[#C9BEAE]">
                    I.
                  </div>
                  <div className="col-span-11 font-sans font-light text-xs sm:text-sm text-[#C4BCB0] leading-relaxed">
                    <strong className="text-[#EAE6DE] font-medium font-sans">
                      First allocation.
                    </strong>{' '}
                    Priority choice of residence and floor before public release.
                  </div>
                </div>

                {/* Row II */}
                <div className="border-t border-[#7A7468]/20 py-6 grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-1 font-serif text-lg sm:text-xl text-[#C9BEAE]">
                    II.
                  </div>
                  <div className="col-span-11 font-sans font-light text-xs sm:text-sm text-[#C4BCB0] leading-relaxed">
                    <strong className="text-[#EAE6DE] font-medium font-sans">
                      Founders’ pricing.
                    </strong>{' '}
                    The most favourable terms Serene Heights will ever offer.
                  </div>
                </div>

                {/* Row III */}
                <div className="border-t border-[#7A7468]/20 py-6 grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-1 font-serif text-lg sm:text-xl text-[#C9BEAE]">
                    III.
                  </div>
                  <div className="col-span-11 font-sans font-light text-xs sm:text-sm text-[#C4BCB0] leading-relaxed">
                    <strong className="text-[#EAE6DE] font-medium font-sans">
                      The full particulars.
                    </strong>{' '}
                    Floor plans, specifications and payment plans, sent privately.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Interactive Multi-Step Card) ================= */}
          <div className="lg:col-span-6">
            <div className="relative bg-[#1A211D] border border-[#7A7468]/25 rounded-2xl p-8 sm:p-10 md:p-12 shadow-2xl">
              {/* Stepper Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#7A7468]/20">
                <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#A8A195] uppercase font-light">
                  {step === 1 && "01 —— JOIN THE FOUNDERS' LIST"}
                  {step === 2 && '02 —— CONTACT PARTICULARS'}
                  {step === 3 && '03 —— CONFIRMATION'}
                </span>

                {/* Step indicator horizontal dashes */}
                <div className="flex items-center space-x-2">
                  <span
                    className={`h-[1.5px] w-6 transition-colors ${
                      step >= 1 ? 'bg-[#C9BEAE]' : 'bg-[#7A7468]/30'
                    }`}
                  />
                  <span
                    className={`h-[1.5px] w-6 transition-colors ${
                      step >= 2 ? 'bg-[#C9BEAE]' : 'bg-[#7A7468]/30'
                    }`}
                  />
                  <span
                    className={`h-[1.5px] w-6 transition-colors ${
                      step >= 3 ? 'bg-[#C9BEAE]' : 'bg-[#7A7468]/30'
                    }`}
                  />
                </div>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="mt-6 p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-200 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* ================= STEP 1: RESIDENCE INTEREST & TIMING ================= */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    {/* Question 1 */}
                    <div>
                      <h3 className="font-serif font-normal text-3xl sm:text-4xl text-[#EAE6DE] mb-5 tracking-tight">
                        I’m interested in
                      </h3>

                      <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-10">
                        {RESIDENCE_OPTIONS.map((opt) => {
                          const isSelected = selectedInterest === opt.label;
                          if (opt.soldOut) {
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                disabled
                                className="px-5 py-2.5 rounded-full border border-[#7A7468]/30 text-[#7A7468] text-xs sm:text-sm font-sans flex items-center gap-2 cursor-not-allowed select-none bg-transparent"
                              >
                                <span>{opt.label}</span>
                                <span className="font-mono text-[9px] tracking-wider text-[#7A7468]">
                                  SOLD OUT
                                </span>
                              </button>
                            );
                          }

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setSelectedInterest(opt.label)}
                              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all cursor-pointer ${
                                isSelected
                                  ? 'border border-[#C9BEAE] bg-[#C9BEAE] text-[#161B18] font-medium shadow-md'
                                  : 'border border-[#7A7468]/35 text-[#EAE6DE] hover:border-[#C9BEAE]/60 bg-transparent'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div>
                      <h3 className="font-serif font-normal text-3xl sm:text-4xl text-[#EAE6DE] mb-5 tracking-tight">
                        And when are you looking?
                      </h3>

                      <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-12">
                        {TIMING_OPTIONS.map((opt) => {
                          const isSelected = selectedTiming === opt.label;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setSelectedTiming(opt.label)}
                              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all cursor-pointer ${
                                isSelected
                                  ? 'border border-[#C9BEAE] bg-[#C9BEAE] text-[#161B18] font-medium shadow-md'
                                  : 'border border-[#7A7468]/35 text-[#EAE6DE] hover:border-[#C9BEAE]/60 bg-transparent'
                              }`}
                            >
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Continue Action Button */}
                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={handleContinue}
                        className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#C9BEAE] text-[#161B18] font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase font-bold hover:bg-[#EAE6DE] transition-all flex items-center gap-3 cursor-pointer shadow-lg"
                      >
                        <span>CONTINUE</span>
                        <span className="text-sm">→</span>
                      </button>
                    </div>

                    {/* Privacy Disclaimer */}
                    <p className="font-sans font-light text-[11px] sm:text-xs text-[#7A7468] leading-relaxed mt-10">
                      It takes twenty seconds. Your progress saves as you go. Your details remain
                      private to Serene Heights Nathia Gali and DM Consortium, and are used only to
                      contact you about this project.
                    </p>
                  </motion.div>
                )}

                {/* ================= STEP 2: CONTACT DETAILS ================= */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 space-y-6"
                  >
                    <h3 className="font-serif font-normal text-3xl sm:text-4xl text-[#EAE6DE] mb-6 tracking-tight">
                      Your details
                    </h3>

                    {/* Full Name */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-[#A8A195] mb-2 font-light">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        autoFocus
                        required
                        placeholder="e.g. Asad Siddiqui"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#161B18] border border-[#7A7468]/40 focus:border-[#C9BEAE] rounded-xl px-4 py-3.5 text-[#EAE6DE] outline-none text-sm transition-colors"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-[#A8A195] mb-2 font-light">
                        City of Residence *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Islamabad, London, Dubai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#161B18] border border-[#7A7468]/40 focus:border-[#C9BEAE] rounded-xl px-4 py-3.5 text-[#EAE6DE] outline-none text-sm transition-colors"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-[#A8A195] mb-2 font-light">
                        WhatsApp Contact Number *
                      </label>
                      <div className="flex space-x-2">
                        <select
                          value={dialCode}
                          onChange={(e) => setDialCode(e.target.value)}
                          className="bg-[#161B18] border border-[#7A7468]/40 focus:border-[#C9BEAE] rounded-xl px-3 py-3.5 text-[#EAE6DE] outline-none text-xs"
                        >
                          {DIAL_CODES.map((d) => (
                            <option key={d.code} value={d.code} className="bg-[#161B18]">
                              {d.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          required
                          placeholder="3XX XXXXXXX"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="flex-1 bg-[#161B18] border border-[#7A7468]/40 focus:border-[#C9BEAE] rounded-xl px-4 py-3.5 text-[#EAE6DE] outline-none text-sm transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-mono text-[10px] uppercase tracking-wider text-[#A8A195] mb-2 font-light">
                        Email Address (For floor plans & payment pack) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#161B18] border border-[#7A7468]/40 focus:border-[#C9BEAE] rounded-xl px-4 py-3.5 text-[#EAE6DE] outline-none text-sm transition-colors"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6 border-t border-[#7A7468]/20">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="font-mono text-xs tracking-wider uppercase text-[#A8A195] hover:text-[#EAE6DE] transition-colors"
                      >
                        ← BACK
                      </button>

                      <button
                        type="button"
                        onClick={handleContinue}
                        disabled={isSubmitting}
                        className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#C9BEAE] text-[#161B18] font-mono text-[11px] sm:text-xs tracking-[0.22em] uppercase font-bold hover:bg-[#EAE6DE] transition-all flex items-center gap-3 cursor-pointer shadow-lg disabled:opacity-50"
                      >
                        <span>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT REGISTRATION'}</span>
                        <span className="text-sm">→</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ================= STEP 3: CONFIRMATION ================= */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 text-center py-8 space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#C9BEAE]/10 border border-[#C9BEAE] flex items-center justify-center mx-auto text-[#C9BEAE]">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.75}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C9BEAE] block mb-2 font-light">
                        FOUNDERS’ LIST ENTRY RECORDED
                      </span>
                      <h3 className="font-serif text-3xl sm:text-4xl text-[#EAE6DE] font-normal mb-3">
                        You’re on the founders’ list.
                      </h3>
                      <p className="font-sans text-sm text-[#C4BCB0] font-light max-w-md mx-auto leading-relaxed">
                        A member of the DM Consortium private client team will release the full particulars,
                        floor plans, and starting allocations directly to your contact details.
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleWhatsAppDirect}
                        className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-mono text-xs uppercase tracking-luxury font-medium transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <span>MESSAGE US ON WHATSAPP NOW</span>
                        <span>→</span>
                      </button>
                      <p className="font-mono text-[10px] text-[#A8A195] mt-3">
                        Direct connection to private client advisory.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM GLOBAL BAR (Screenshot) ================= */}
        <div className="pt-16 pb-4 flex items-center justify-between text-[#EAE6DE] mt-16 sm:mt-20 border-t border-[#7A7468]/15">
          {/* Left: 12 / 12 */}
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-[#EAE6DE] font-semibold">
              12 / 12
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
