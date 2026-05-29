/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquareCode, ThumbsUp, Medal } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      num: '01',
      title: 'Submit Hints',
      description: 'Anonymously type lecture warnings or office hour clues in seconds. Tag the respective course, syllabus chapter, and professor.',
      icon: <MessageSquareCode className="h-6 w-6 text-[#d95d39]" />,
      sub: 'E.g., "S. R. Harrison spent 40 mins on TLB proof walks on chalkboard."'
    },
    {
      id: 2,
      num: '02',
      title: 'Peer Verification',
      description: 'Classmates review submitted hints. Legitimate, verified hints receive upvotes; outdated or false suggestions get downvoted.',
      icon: <ThumbsUp className="h-6 w-6 text-[#d95d39]" />,
      sub: 'Spam filters and verification bots query student domain registry.'
    },
    {
      id: 3,
      num: '03',
      title: 'Top Topics Surface',
      description: 'PrepEngine recalculates weightage scores and realigns the chapters. High-yield topics automatically rise to the top of the feed.',
      icon: <Medal className="h-6 w-6 text-[#d95d39]" />,
      sub: 'Get a clean, prioritized list sorted by confidence score.'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-[#fbfaf8] border-b border-[#ebe5dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#e5ebe5] border border-[#cbd7cc] text-[#2d382e] text-xs font-mono font-bold uppercase tracking-wider">
            <span>VERIFICATION PIPELINE</span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-4xl lg:text-[44px] text-[#0f1410] font-medium tracking-tight">
            From Hint to High Score
          </h2>
          <p className="text-base sm:text-lg text-[#7c6e5a] font-sans max-w-xl mx-auto">
            How PrepEngine compiles messy, disorganized student logs into high-trust academic intelligence.
          </p>
        </div>

        {/* Dynamic flowchart diagram */}
        <div className="relative mb-8 max-w-5xl mx-auto">
          {/* Connecting Line (Horizontal for desktop) */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#ebe5dc] -translate-y-1/2 -z-10 hidden md:block"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-white p-8 rounded-3xl border border-[#ebe5dc] shadow-sm relative hover:border-[#dfd7cc] transition-all flex flex-col items-center text-center group"
              >
                {/* Step indicator tag */}
                <span className="absolute -top-4 bg-[#2d382e] text-white font-mono text-xs font-bold px-3 py-1 rounded-full border border-[#4a5c4d]">
                  Step {step.num}
                </span>

                {/* Circular Icon with halo */}
                <div className="w-16 h-16 bg-[#fcf8f2] text-[#d95d39] border border-[#dfd7cc] rounded-full flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform relative">
                  <div className="absolute inset-0 bg-[#d95d39]/10 rounded-full animate-ping group-hover:block hidden"></div>
                  {step.icon}
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0f1410] mb-3">
                  {step.title}
                </h3>
                
                <p className="text-sm text-[#4a5c4d] leading-relaxed font-sans mb-4 flex-1">
                  {step.description}
                </p>

                {/* Simulated live example text block in monospaced layout */}
                <div className="w-full bg-[#fbfaf8] p-3 rounded-2xl border border-[#ebe5dc] text-left font-mono text-[11px] text-[#7c6e5a] leading-snug">
                  <span className="font-bold text-[#2d382e] text-[10px] block mb-1 uppercase tracking-wider">
                    {idx === 0 ? 'Crowdsourced Tip Input' : idx === 1 ? 'Domain Verification Status' : 'Final Priority Feed'}
                  </span>
                  {step.sub}
                </div>

                {/* Flow indicator arrow for mobile */}
                {idx < 2 && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:hidden">
                    <div className="bg-[#2d382e] text-white p-1 rounded-full">
                      <ArrowRight className="h-4 w-4 rotate-90 text-[#e69d45]" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
