/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-white border-b border-navy-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="text-xs font-mono tracking-widest text-indigo-600 block font-bold uppercase">
            STUDENT VOICES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-950 font-bold tracking-tight">
            Loved by Stressed Students
          </h2>
          <p className="text-base sm:text-lg text-navy-700 font-sans max-w-xl mx-auto">
            See how undergraduates are escaping syllabus chaos, transforming exam weeks into calm clarity.
          </p>
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((testimony, index) => (
            <motion.div
              key={testimony.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-150/70 hover:bg-neutral-50/50 hover:shadow-xl hover:shadow-navy-950/2 transition-all duration-300 relative group flex flex-col justify-between"
            >
              {/* Giant elegant background quotation bubble */}
              <Quote className="absolute top-6 right-6 h-12 w-12 text-neutral-200/60 -z-0 pointer-events-none group-hover:scale-110 transition-transform" />

              <div className="space-y-4 relative z-10">
                <p className="text-sm sm:text-base text-navy-900 font-sans italic leading-relaxed">
                  "{testimony.quote}"
                </p>
              </div>

              {/* Bio details */}
              <div className="flex items-center space-x-3 pt-6 border-t border-neutral-200/60 mt-6 relative z-10">
                {/* Custom avatar placeholder sphere */}
                <div className="w-10 h-10 rounded-full bg-navy-950 text-white font-serif font-bold text-sm flex items-center justify-center shadow shadow-navy-950/20">
                  {testimony.avatarLetter}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950 leading-none">
                    {testimony.name}
                  </h4>
                  <span className="text-[11px] text-navy-600 block mt-1 tracking-tight font-sans">
                    {testimony.role} • <strong className="font-semibold text-indigo-700">{testimony.major}</strong>
                  </span>
                  <span className="text-[10px] text-neutral-400 block font-mono">
                    {testimony.university}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
