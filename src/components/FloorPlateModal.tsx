'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, FileText, Send } from 'lucide-react';

interface FloorPlateModalProps {
  isOpen: boolean;
  residenceName: string;
  onClose: () => void;
}

export const FloorPlateModal: React.FC<FloorPlateModalProps> = ({
  isOpen,
  residenceName,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setEmail('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-lg bg-[#0c0f0d] border border-[#253129] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#efe9df]"
          >
            <button
              onClick={handleReset}
              className="absolute top-6 right-6 p-1.5 rounded-full border border-[#253129] hover:border-[#c3a78e] text-[#efe9df]/60 hover:text-[#efe9df] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-[#c3a78e] uppercase tracking-luxury mb-3">
                  <FileText className="w-4 h-4 text-[#c3a78e]" />
                  <span>Confidential Floor Plate</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#efe9df] mb-2">
                  Request {residenceName} plate
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#efe9df]/70 mb-6 font-light">
                  Architectural floor plans, square footage breakdowns, and view orientations are
                  released privately upon verification.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-[#efe9df]/60 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Malik"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#141c17] border border-[#253129] focus:border-[#c3a78e] rounded-lg px-4 py-3 text-[#efe9df] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#efe9df]/60 mb-1.5">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#141c17] border border-[#253129] focus:border-[#c3a78e] rounded-lg px-4 py-3 text-[#efe9df] outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#efe9df]/60 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="tariq@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#141c17] border border-[#253129] focus:border-[#c3a78e] rounded-lg px-4 py-3 text-[#efe9df] outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-3.5 rounded-full bg-[#c3a78e] hover:bg-[#d9c2ad] text-[#0c0f0d] font-mono text-xs uppercase tracking-luxury font-medium transition-all flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Floor Plate Request</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-[#c3a78e] mx-auto mb-4 animate-bounce" />
                <h3 className="font-serif text-3xl text-[#efe9df] mb-2">Request Received</h3>
                <p className="font-sans text-sm text-[#efe9df]/75 font-light max-w-sm mx-auto mb-6">
                  Thank you, {name}. The private architectural floor plate for{' '}
                  <strong className="text-[#c3a78e] font-serif">{residenceName}</strong> has been queued
                  and will be shared directly with your WhatsApp.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full border border-[#253129] hover:border-[#c3a78e] font-mono text-xs uppercase tracking-luxury text-[#efe9df] transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
