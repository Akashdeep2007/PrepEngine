/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Flame, Layers, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onJoinBeta: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onJoinBeta, onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 flex items-center overflow-hidden bg-[#fbfaf8]"
    >
      {/* Decorative ambient subtle background grid */}
      <div 
        className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: "radial-gradient(#2d382e 0.5px, transparent 0.5px)", 
          backgroundSize: "24px 24px" 
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT SIDE: Copy & Call To Actions */}
          <div className="col-span-1 lg:col-span-6 space-y-6 sm:space-y-8 text-left max-w-2xl">
            {/* Soft badge (Removed tagline, added specialized university network badge) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1 bg-[#e5ebe5]/80 border border-[#cbd7cc] text-[#2d382e] text-xs font-mono uppercase font-bold tracking-wider rounded-full"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#d95d39]" />
              <span>Active Student Portal</span>
            </motion.div>

            {/* Headline block */}
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-xs font-mono tracking-widest text-[#7c6e5a] uppercase block font-semibold"
              >
                PrepEngine — Cooperative Syllabus Map
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-serif text-[40px] leading-[1.1] sm:text-5xl lg:text-[54px] text-[#0f1410] font-medium tracking-tight"
                id="hero-headline"
              >
                Turn classroom whispers into <span className="italic text-[#d95d39] underline decoration-[#dfd7cc] underline-offset-4">exam clarity</span>.
              </motion.h1>
            </div>

            {/* Paragraph explanation */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-base sm:text-lg text-[#3b4b3e] leading-relaxed font-sans"
            >
              Escape exam season stress. PrepEngine lets students crowdsource lecture clues, verify syllabus focus areas, and build confidence metrics before finals week.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <button
                id="hero-cta-beta"
                onClick={onJoinBeta}
                className="px-8 py-4 bg-[#2d382e] hover:bg-[#3b4b3e] text-white rounded-xl text-lg font-bold shadow-xl shadow-[#2d382e]/10 transition-all duration-300 active:scale-95 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform text-[#e69d45]" />
              </button>
              <button
                id="hero-cta-explore"
                onClick={() => onNavigate('dashboard')}
                className="px-8 py-4 bg-white hover:bg-[#fbfaf8] border border-[#ebe5dc] text-[#2d382e] rounded-xl text-lg font-bold transition-all duration-300 active:scale-95 flex items-center justify-center space-x-1 cursor-pointer"
              >
                <span>Explore Live Feed</span>
              </button>
            </motion.div>

            {/* Trusted by and micro metrics split */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-6 border-t border-[#ebe5dc]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 justify-between opacity-90">
                <div className="flex items-center space-x-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#7c6e5a] font-sans block">
                    ACTIVE AT
                  </span>
                  <div className="flex space-x-3.5 font-serif text-sm font-bold text-[#4a5c4d]">
                    <span>INSPIRIA</span>
                    <span>SILIGURI COLLEGE</span>
                    <span>NBU</span>
                    <span>SIEM</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-xs text-[#7c6e5a] font-mono font-bold">
                  <span>96% Alignment</span>
                  <span>|</span>
                  <span>Verified Domains</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Custom illustration & dynamic floating widgets */}
          <div className="col-span-1 lg:col-span-6 relative flex justify-center items-center">
            {/* Background absolute dot pattern to match design HTML exactly */}
            <div className="absolute -inset-8 opacity-20" style={{ backgroundImage: "radial-gradient(#2d382e 0.7px, transparent 0.7px)", backgroundSize: "20px 20px" }}></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-[#ebe5dc] p-2.5 bg-white max-w-md sm:max-w-xl lg:max-w-full"
            >
              <img
                src="/src/assets/images/hero_library_students_1780072966311.png"
                alt="University students collaborating in university library"
                className="w-full h-auto rounded-2xl object-cover hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Floating Clue Widget 1: Live upvoting ticker */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute top-8 -right-4 sm:-right-8 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-[#ebe5dc] shadow-xl max-w-[220px] hidden sm:block transform rotate-2 hover:rotate-0 transition-all duration-300"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="bg-[#fcf8f2] p-1 rounded-md">
                    <Flame className="h-4 w-4 text-[#d95d39] fill-[#d95d39]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#d95d39] tracking-wider uppercase">
                    HIGH YIELD MATCH
                  </span>
                </div>
                <h4 className="text-xs font-serif font-bold text-[#0f1410] leading-snug">
                  Page Tables Proof
                </h4>
                <p className="text-[10px] text-[#7c6e5a] font-mono mt-0.5">
                  Chapter 8: Virtual Memory
                </p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#f4f6f4]">
                  <span className="text-xs font-mono font-bold text-[#2d382e]">
                    96% confidence
                  </span>
                  <span className="text-[11px] bg-[#fcf8f2] border border-[#dfd7cc] px-1.5 py-0.5 rounded text-[#d95d39] font-bold font-mono">
                    +84 upvotes
                  </span>
                </div>
              </motion.div>

              {/* Floating Clue Widget 2: Student validation status banner */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-4 left-6 sm:left-12 bg-[#2d382e] text-white p-3.5 rounded-2xl border border-[#4a5c4d] shadow-xl max-w-[280px] flex items-center space-x-3 animate-bounce-subtle"
              >
                <div className="bg-[#3b4b3e] p-2 rounded-xl">
                  <Layers className="h-5 w-5 text-[#e69d45]" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-mono tracking-widest text-[#cbd7cc] uppercase font-bold">
                      VERIFICATION COOP
                    </span>
                    <span className="h-1.5 w-1.5 bg-[#e69d45] rounded-full animate-pulse"></span>
                  </div>
                  <h4 className="text-xs font-sans font-bold text-[#fbfaf8] tracking-tight leading-none mt-0.5">
                    Active Syllabus Match Engine
                  </h4>
                  <p className="text-[9px] text-[#cbd7cc] mt-1 space-x-1 block leading-normal italic">
                    "Grignard nucleophilic attacks are high probability final targets"
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
