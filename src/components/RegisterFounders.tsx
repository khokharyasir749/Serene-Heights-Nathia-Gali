'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ArrowRight, ArrowLeft, MessageCircle, Shield, CheckCircle2 } from 'lucide-react';
import siteData from '@/data/siteData';

export const RegisterFounders: React.FC = () => {
  const { register } = siteData;

  const [step, setStep] = useState(0); // 0: Interest & Timing, 1: Name & City, 2: WhatsApp & Email, 3: Completed
  const [selectedInterest, setSelectedInterest] = useState<string>('1 Bedroom');
  const [selectedTiming, setSelectedTiming] = useState<string>('Ready now');
  const [fullName, setFullName] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [dialCode, setDialCode] = useState<string>('92');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const dialCodes = register?.dialCodes || [
    { code: '92', label: '🇵🇰 +92' },
    { code: '44', label: '🇬🇧 +44' },
    { code: '971', label: '🇦🇪 +971' },
    { code: '966', label: '🇸🇦 +966' },
    { code: '1', label: '🇺🇸 +1' },
    { code: '974', label: '🇶🇦 +974' },
  ];

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 0) {
      if (!selectedInterest) {
        setErrorMsg('Please select a residence type.');
        return;
      }
      setStep(1);
    } else if (step === 1) {
      if (!fullName.trim() || !city.trim()) {
        setErrorMsg('Please enter both your name and city.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!whatsapp.trim()) {
        setErrorMsg('Please provide a WhatsApp contact number.');
        return;
      }
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(3); // Completed!
      }, 700);
    }
  };

  const openWhatsAppDirect = () => {
    const prefill = encodeURIComponent(
      register?.done?.whatsappPrefill ||
        'Hello — I have just registered on thenathiareserve.com and would like the details.'
    );
    window.open(`https://wa.me/923000000000?text=${prefill}`, '_blank');
  };

  return (
    <section
      id="register"
      data-chapter="register"
      className="relative py-28 md:py-44 bg-[#090d0a] text-[#efe9df] border-t border-[#253129]/40"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Founding Allocation Promises */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center space-x-2 font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c3a78e]" />
              <span>12 · Priority Release</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#efe9df] leading-[1.1] font-normal">
              Register{' '}
              <span className="font-serif italic text-[#c3a78e]">your interest.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-[#efe9df]/80 font-light leading-relaxed">
              {register?.body}
            </p>

            <div className="space-y-6 pt-4 border-t border-[#253129]/60">
              {register?.promises?.map((prom: any, idx: number) => (
                <div key={idx} className="flex items-start space-x-4">
                  <span className="font-mono text-sm text-[#c3a78e] font-light mt-0.5">
                    {prom.no}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-[#efe9df] font-medium mb-1">
                      {prom.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[#efe9df]/70 font-light leading-relaxed">
                      {prom.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Multi-Step Interactive Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 rounded-3xl border border-[#253129] bg-[#141c17]/80 shadow-2xl relative overflow-hidden">
            {step < 3 ? (
              <div>
                {/* Stepper Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#253129]/60">
                  <span className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e]">
                    Step {step + 1} of 3 · {register?.steps?.[step]}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    {[0, 1, 2].map((s) => (
                      <div
                        key={s}
                        className={`h-1.5 rounded-full transition-all ${
                          s === step
                            ? 'w-6 bg-[#c3a78e]'
                            : s < step
                            ? 'w-3 bg-[#c3a78e]/60'
                            : 'w-3 bg-[#253129]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 mb-6 rounded-lg bg-red-950/60 border border-red-800/40 text-red-200 text-xs font-mono">
                    {errorMsg}
                  </div>
                )}

                {/* Step 1: Residence Interest & Timing */}
                {step === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#efe9df]/70 mb-3">
                        I am interested in:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {register?.interests?.map((int: string) => {
                          const isSoldOut = register?.soldOut?.includes(int);
                          const isSelected = selectedInterest === int;
                          return (
                            <button
                              key={int}
                              type="button"
                              disabled={isSoldOut}
                              onClick={() => setSelectedInterest(int)}
                              className={`p-3 rounded-xl border text-left font-serif transition-all flex flex-col justify-between ${
                                isSoldOut
                                  ? 'opacity-40 cursor-not-allowed border-[#253129] bg-[#0c0f0d]/30'
                                  : isSelected
                                  ? 'border-[#c3a78e] bg-[#1d2920] text-[#efe9df] shadow-md'
                                  : 'border-[#253129] bg-[#0c0f0d]/60 text-[#efe9df]/80 hover:border-[#c3a78e]/50'
                              }`}
                            >
                              <span className="text-base">{int}</span>
                              {isSoldOut ? (
                                <span className="text-[9px] font-mono uppercase text-red-400 mt-1">
                                  Sold out
                                </span>
                              ) : isSelected ? (
                                <span className="text-[10px] font-mono text-[#c3a78e] mt-1 flex items-center space-x-1">
                                  <Check className="w-3 h-3" />
                                  <span>Selected</span>
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#253129]/60">
                      <label className="block font-mono text-xs uppercase tracking-wider text-[#efe9df]/70 mb-3">
                        {register?.timingQ || 'And when are you looking?'}
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {register?.timings?.map((tm: string) => {
                          const isSelected = selectedTiming === tm;
                          return (
                            <button
                              key={tm}
                              type="button"
                              onClick={() => setSelectedTiming(tm)}
                              className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                                isSelected
                                  ? 'border-[#c3a78e] bg-[#1d2920] text-[#c3a78e]'
                                  : 'border-[#253129] bg-[#0c0f0d]/60 text-[#efe9df]/70 hover:border-[#c3a78e]/50'
                              }`}
                            >
                              {tm}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Name & City */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5 font-mono text-xs"
                  >
                    <div>
                      <label className="block uppercase tracking-wider text-[#efe9df]/70 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        autoFocus
                        required
                        placeholder="e.g. Asad Siddiqui"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#0c0f0d] border border-[#253129] focus:border-[#c3a78e] rounded-xl px-4 py-3.5 text-[#efe9df] outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#efe9df]/70 mb-2">
                        City of Residence *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Islamabad, London, Dubai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#0c0f0d] border border-[#253129] focus:border-[#c3a78e] rounded-xl px-4 py-3.5 text-[#efe9df] outline-none text-sm"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 3: WhatsApp & Email */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5 font-mono text-xs"
                  >
                    <div>
                      <label className="block uppercase tracking-wider text-[#efe9df]/70 mb-2">
                        WhatsApp Contact Number *
                      </label>
                      <div className="flex space-x-2">
                        <select
                          value={dialCode}
                          onChange={(e) => setDialCode(e.target.value)}
                          className="bg-[#0c0f0d] border border-[#253129] focus:border-[#c3a78e] rounded-xl px-3 py-3.5 text-[#efe9df] outline-none text-xs"
                        >
                          {dialCodes.map((d: any) => (
                            <option key={d.code} value={d.code} className="bg-[#0c0f0d]">
                              {d.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          autoFocus
                          required
                          placeholder="3XX XXXXXXX"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          className="flex-1 bg-[#0c0f0d] border border-[#253129] focus:border-[#c3a78e] rounded-xl px-4 py-3.5 text-[#efe9df] outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#efe9df]/70 mb-2">
                        Email Address (For floor plans & payment pack) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0c0f0d] border border-[#253129] focus:border-[#c3a78e] rounded-xl px-4 py-3.5 text-[#efe9df] outline-none text-sm"
                      />
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-[#efe9df]/60 font-sans pt-1">
                      <Shield className="w-3.5 h-3.5 text-[#c3a78e] shrink-0" />
                      <span>Your details remain strictly confidential to DM Consortium.</span>
                    </div>
                  </motion.div>
                )}

                {/* Form Navigation Controls */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-[#253129]/60">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex items-center space-x-2 text-xs font-mono text-[#efe9df]/70 hover:text-[#efe9df] transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-8 py-3.5 rounded-full bg-[#c3a78e] hover:bg-[#d9c2ad] text-[#0c0f0d] font-mono text-xs uppercase tracking-luxury font-medium transition-all shadow-xl active:scale-95 disabled:opacity-50"
                  >
                    <span>
                      {step === 2 ? (isSubmitting ? 'Submitting...' : 'Register interest') : 'Continue'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Step 3: Success Confirmation Screen */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 sm:py-8 space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#c3a78e]/10 border border-[#c3a78e] flex items-center justify-center mx-auto text-[#c3a78e]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="font-mono text-xs uppercase tracking-luxury text-[#c3a78e] block mb-2">
                    {register?.done?.label || 'Received'}
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#efe9df] font-normal mb-3">
                    {register?.done?.title || 'You’re on the founders’ list'}
                  </h3>
                  <p className="font-sans text-sm text-[#efe9df]/75 font-light max-w-md mx-auto leading-relaxed">
                    {register?.done?.body}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={openWhatsAppDirect}
                    className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-mono text-xs uppercase tracking-luxury font-medium transition-all shadow-xl hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>{register?.done?.whatsappCta || 'Message us on WhatsApp now'}</span>
                  </button>
                  <p className="font-mono text-[10px] text-[#efe9df]/50 mt-2">
                    {register?.done?.whatsappNote || 'Faster than waiting for us to call.'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
