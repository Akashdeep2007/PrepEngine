/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, GraduationCap, Flame, User } from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenBeta: () => void;
  studentProfile: StudentProfile | null;
  currentView: 'home' | 'profile';
  onSetView: (view: 'home' | 'profile') => void;
}

export default function Navbar({ 
  onNavigate, 
  activeSection, 
  onOpenBeta, 
  studentProfile,
  currentView,
  onSetView
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Dashboard Feed', id: 'dashboard' },
    { label: 'Classroom Reviews', id: 'testimonials' },
  ];

  const handleItemClick = (id: string) => {
    onSetView('home');
    setTimeout(() => {
      onNavigate(id);
    }, 50);
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    onSetView('profile');
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentView === 'profile'
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#ebe5dc]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with Natural Styling */}
          <div
            id="nav-logo"
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => {
              onSetView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="bg-transparent text-[#fbfaf8] p-0.5 flex items-center justify-center group-hover:opacity-90 transition-opacity">
              <img
                src="/src/assets/images/prepengine_logo_1780077920116.png"
                alt="PrepEngine Logo"
                className="h-11 w-11 object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl text-[#0f1410] tracking-tight flex items-center">
                PrepEngine
                <Flame className="h-4.5 w-4.5 text-[#d95d39] fill-[#d95d39] ml-1" />
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#7c6e5a] uppercase -mt-1 font-semibold">
                Syllabus Compiler
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div id="desktop-links" className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  currentView === 'home' && activeSection === item.id
                    ? 'text-[#2d382e] bg-[#e5ebe5]/60 font-bold'
                    : 'text-[#7c6e5a] hover:text-[#0f1410] hover:bg-[#FAF8F5]'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Smart dynamic profile tab */}
            {studentProfile && (
              <button
                onClick={handleProfileClick}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                  currentView === 'profile'
                    ? 'text-[#2d382e] bg-[#e5ebe5] font-bold border border-[#cbd7cc]'
                    : 'text-[#d95d39] hover:bg-[#fbf5f2] border border-transparent'
                }`}
              >
                <User className="h-4 w-4" />
                <span>My Student Profile</span>
              </button>
            )}
          </div>

          {/* CTA & Actions */}
          <div id="nav-cta-container" className="hidden md:flex items-center space-x-4">
            <button
              id="btn-nav-demo"
              onClick={() => handleItemClick('dashboard')}
              className="text-sm font-semibold text-[#4a5c4d] hover:text-[#2d382e] transition-colors cursor-pointer"
            >
              Interactive Feed
            </button>
            
            {studentProfile ? (
              <button
                id="btn-profile-card-badge"
                onClick={handleProfileClick}
                className="px-4 py-2 bg-[#2d382e] text-[#fbfaf8] border border-[#2d382e] rounded-xl text-sm font-bold shadow-md hover:bg-[#3b4b3e] hover:shadow-lg transition-all duration-200 flex items-center space-x-1.5 cursor-pointer"
              >
                <div className="w-5 h-5 rounded-full bg-white text-[#2d382e] flex items-center justify-center text-xs">
                  {studentProfile.avatarId === 'avatar-owl' ? '🦉' : studentProfile.avatarId === 'avatar-fox' ? '🦊' : '🦌'}
                </div>
                <span>@{studentProfile.username}</span>
              </button>
            ) : (
              <button
                id="btn-nav-beta"
                onClick={onOpenBeta}
                className="px-5 py-2.5 bg-[#2d382e] text-[#fbfaf8] rounded-xl text-sm font-bold hover:bg-[#3b4b3e] transition-all duration-200 shadow-md shadow-[#2d382e]/10 hover:shadow-lg active:scale-95 cursor-pointer"
              >
                Get Started
              </button>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div id="mobile-menu-trigger" className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-[#2d382e] hover:bg-[#FAF8F5] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        id="mobile-nav-drawer"
        className={`lg:hidden transition-all duration-300 ease-in-out border-b border-[#ebe5dc] ${
          isOpen ? 'max-h-screen opacity-100 block' : 'max-h-0 opacity-0 hidden'
        } bg-[#fbfaf8]/95 backdrop-blur-lg`}
      >
        <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-center shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`block w-full px-4 py-3 rounded-xl text-base font-medium transition-all ${
                currentView === 'home' && activeSection === item.id
                  ? 'bg-[#e5ebe5] text-[#2d382e] font-bold'
                  : 'text-[#7c6e5a] hover:text-[#0f1410] hover:bg-[#f5f2eb]'
              }`}
            >
              {item.label}
            </button>
          ))}

          {studentProfile && (
            <button
              onClick={handleProfileClick}
              className={`block w-full px-4 py-3 rounded-xl text-base font-bold transition-all ${
                currentView === 'profile'
                  ? 'bg-[#e5ebe5] text-[#2d382e]'
                  : 'text-[#d95d39] hover:bg-[#fbf5f2]'
              }`}
            >
              My Student Profile (@{studentProfile.username})
            </button>
          )}

          <div className="pt-4 border-t border-[#ebe5dc] mt-4 px-4 flex flex-col space-y-3">
            <button
              id="btn-mobile-demo"
              onClick={() => handleItemClick('dashboard')}
              className="py-2.5 text-sm font-semibold text-[#4a5c4d] border border-[#ebe5dc] bg-white rounded-xl hover:bg-[#FAF8F5]"
            >
              Interactive Feed
            </button>
            
            {studentProfile ? (
              <button
                onClick={handleProfileClick}
                className="w-full py-3 bg-[#2d382e] text-white rounded-xl text-sm font-bold"
              >
                Go to Profile
              </button>
            ) : (
              <button
                id="btn-mobile-beta"
                onClick={() => {
                  onOpenBeta();
                  setIsOpen(false);
                }}
                className="w-full py-3 bg-[#d95d39] text-white rounded-xl text-sm font-bold shadow-md"
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
