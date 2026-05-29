/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle, Mail } from 'lucide-react';

interface CTAProps {
  onJoinBeta: (initialEmail?: string) => void;
}

export default function CTA({ onJoinBeta }: CTAProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    onJoinBeta(email);
  };

  return (
    <section id="cta" className="relative py-20 sm:py-28 bg-[#2d382e] overflow-hidden text-white text-center border-t border-[#4a5c4d]">
      
      {/* Decorative background ambient lighting circles */}
      <div className="absolute -left-12 -top-12 w-64 h-64 bg-[#718d75]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#e69d45]/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-8 sm:space-y-12">
        
        {/* Soft Sparkle Indicator */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#e69d45]">
          <Sparkles className="h-3.5 w-3.5 mr-1" />
          <span>JOIN THE COOPERATIVE NETWORK TODAY</span>
        </div>

        {/* Header Block */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-tight">
            Stop Guessing. <br className="sm:hidden" />Start Crowdsourcing.
          </h2>
          <p className="text-sm sm:text-lg text-[#cbd7cc] font-sans max-w-2xl mx-auto leading-relaxed">
            PrepEngine helps Siliguri college students focus only on what truly matters before exams. Reclaim your study hours, dissolve academic stress, and collaborate with your classmates safely.
          </p>
        </div>

        {/* Input box form with instant validation callback */}
        <div className="max-w-md mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-stretch gap-2.5"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#cbd7cc]">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                id="cta-email-input"
                placeholder="Enter college email (e.g. student@inspiria.edu.in)..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 text-white placeholder-[#cbd7cc]/60 border border-white/15 focus:outline-none focus:ring-1 focus:ring-[#e69d45] text-sm font-sans"
                required
              />
            </div>
            <button
              type="submit"
              id="cta-submit-btn"
              className="px-6 py-3 bg-[#d95d39] text-white hover:bg-[#c85a17] font-bold rounded-xl text-sm active:scale-95 transition-all flex items-center justify-center space-x-1 shrink-0 cursor-pointer shadow shadow-[#d95d39]/10"
            >
              <span>Secure Seat</span>
              <ArrowRight className="h-4 w-4 text-[#e69d45]" />
            </button>
          </form>
        </div>

        {/* Bottom trust metadata metrics */}
        <div className="pt-6 border-t border-white/10 max-w-2xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono text-[#cbd7cc]">
          <div>
            <span className="block text-white font-bold text-sm">Verified</span>
            Siliguri Campuses Managed
          </div>
          <div>
            <span className="block text-white font-[#cbd7cc] font-bold text-sm">FERPA Cryptographic</span>
            Student Identity Protected
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="block text-[#e69d45] font-bold text-sm">Free Forever</span>
            Built for Peers
          </div>
        </div>

      </div>
    </section>
  );
}
