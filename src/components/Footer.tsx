/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { GraduationCap, Flame, Github, Twitter, MessageSquare, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="app-footer" className="bg-[#1a221b] text-[#cbd7cc] border-t border-[#2d382e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand block */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-transparent text-[#fbfaf8] p-0.5 flex items-center justify-center group-hover:opacity-90 transition-opacity">
                <img
                  src="/src/assets/images/prepengine_logo_1780077920116.png"
                  alt="PrepEngine Logo"
                  className="h-10 w-10 object-contain rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-tight flex items-center">
                  PrepEngine
                  <Flame className="h-4 w-4 text-[#d95d39] fill-[#d95d39] ml-1" />
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#7c6e5a] uppercase -mt-1 font-semibold">
                  Syllabus Compiler Network
                </span>
              </div>
            </div>
            <p className="text-sm text-[#88a38b] max-w-sm font-sans leading-relaxed">
              We turn disorganized lecture whispers, scrap papers, and late reviews into structured, peer-ranked syllabus intelligence maps for universities across West Bengal.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer" aria-label="Discord">
                <MessageSquare className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1 space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase font-bold">
              Product Structure
            </h4>
            <ul className="space-y-2 text-sm text-[#88a38b]">
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-white text-[#88a38b] transition-colors text-left cursor-pointer">
                  Verification Flowchart
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('dashboard')} className="hover:text-white text-[#d95d39] transition-colors text-left cursor-pointer font-bold">
                  Interactive Live Feed
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-white text-[#88a38b] transition-colors text-left cursor-pointer">
                  Peer Endorsements
                </button>
              </li>
            </ul>
          </div>

          {/* Company/Trust block */}
          <div className="col-span-1 space-y-4">
            <h4 className="text-xs font-mono tracking-widest text-white uppercase font-bold">
              Security & Policy
            </h4>
            <ul className="space-y-2 text-sm text-[#88a38b]">
              <li>
                <span className="hover:text-white text-[#e69d45] transition-colors text-left font-bold block cursor-pointer">
                  Campus Verified Domains
                </span>
              </li>
              <li>
                <a href="#" className="hover:text-white text-[#88a38b] transition-colors text-left cursor-pointer">
                  Honour Code Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white text-[#88a38b] transition-colors text-left cursor-pointer">
                  FERPA Compliant Crypt
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and copyright */}
        <div className="mt-12 pt-8 border-t border-[#2d382e] flex flex-col md:flex-row items-center justify-between text-xs text-[#7c6e5a] space-y-4 md:space-y-0">
          <div>
            &copy; {currentYear} PrepEngine West Bengal Initiative. All rights reserved. Secured for student anonymity.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">FERPA & Honor Code Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
