/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';
import StudentProfileView from './components/StudentProfileView';
import { StudentProfile } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ShieldAlert, Sparkles, GraduationCap, AlertCircle, Mail, User, BookOpen } from 'lucide-react';

const SILIGURI_COLLEGES = [
  { name: 'Inspiria Knowledge Campus', domain: 'inspiria.edu.in', domains: ['inspiria.edu.in', 'inspiria.in', 'inspiria'] },
  { name: 'Siliguri College', domain: 'siliguricollege.org.in', domains: ['siliguricollege.org.in', 'siliguricollege.in', 'siliguricollege'] },
  { name: 'Salesian College', domain: 'salesian.edu', domains: ['salesian.edu', 'salesian.in', 'salesiancollege.in', 'salesian'] },
  { name: 'University of North Bengal', domain: 'nbu.ac.in', domains: ['nbu.ac.in', 'nbu.res.in', 'nbu', 'northbengal'] },
  { name: 'Surendra Institute of Engineering & Management', domain: 'siem.org.in', domains: ['siem.org.in', 'siem.in', 'siem', 'surendra'] },
  { name: 'Narula Institute Siliguri Campus', domain: 'jisgroup.ac.in', domains: ['jisgroup.ac.in', 'nit.ac.in', 'narula', 'nit'] },
  { name: 'Siliguri Institute of Technology (SIT)', domain: 'sittechnology.org', domains: ['sittechnology.org', 'sit.ac.in', 'sit'] },
  { name: 'Acharya Prafulla Chandra Roy Government College', domain: 'apcgovcol.ac.in', domains: ['apcgovcol.ac.in', 'apcrgc.org', 'apc'] },
  { name: 'Siliguri College of Commerce', domain: 'scc.org', domains: ['scc.org', 'scc.in', 'siliguricollegeofcommerce'] }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  
  // Active Student Profile state (null means guest student)
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);

  // Onboarding Step management
  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3>(1);

  // Onboarding Field States
  const [onboardingCampus, setOnboardingCampus] = useState(SILIGURI_COLLEGES[0].name);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [semester, setSemester] = useState('Semester 1');
  const [selectedAvatarId, setSelectedAvatarId] = useState('avatar-owl');
  const [studentEmail, setStudentEmail] = useState('');

  // Live domain verification match status block
  const [detectedCollege, setDetectedCollege] = useState<{ name: string; match: boolean } | null>(null);

  // Scroll spy to update active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (currentView !== 'home') return;
      const sections = ['hero', 'how-it-works', 'dashboard', 'testimonials'];
      const scrollPosition = window.scrollY + 200; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Live intelligent domain check as email alters
  useEffect(() => {
    if (!studentEmail.trim() || !studentEmail.includes('@')) {
      setDetectedCollege(null);
      return;
    }

    const domainPart = studentEmail.split('@')[1]?.toLowerCase() || '';
    if (!domainPart) {
      setDetectedCollege(null);
      return;
    }

    // Attempt intelligent substring verification across college metadata
    const matched = SILIGURI_COLLEGES.find((college) => {
      return college.domains.some(dom => domainPart.includes(dom));
    });

    if (matched) {
      setDetectedCollege({ name: matched.name, match: true });
      // Sync choice automatically to delight user!
      setOnboardingCampus(matched.name);
    } else {
      setDetectedCollege({ name: 'General Student Network', match: false });
    }
  }, [studentEmail]);

  const handleNavigate = (sectionId: string) => {
    setCurrentView('home');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarOffset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        setActiveSection(sectionId);
      }
    }, 50);
  };

  const handleOpenBeta = (initialEmail?: string) => {
    if (initialEmail) {
      setStudentEmail(initialEmail);
    }
    setIsBetaModalOpen(true);
    setOnboardingStep(1);
  };

  // Submit alpha signup and instantiate student profile page
  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !username.trim() || !studentEmail.trim()) return;

    // Use auto-detected college if matched, otherwise onboarding choice
    const finalCollege = detectedCollege?.match ? detectedCollege.name : onboardingCampus;

    const initialProfile: StudentProfile = {
      fullName: fullName,
      username: username.replace(/\s+/g, '_').toLowerCase(),
      bio: bio || `Cramming high-yield exam patterns at ${finalCollege}`,
      college: finalCollege,
      department: department,
      semester: semester,
      badges: ['Syllabus Sage', 'Verified Contributor', 'Siliguri Alpha Pioneer'],
      totalUpvotesEarned: 18, // nice welcome balance
      topicsContributed: 1,
      avatarId: selectedAvatarId,
      postsSubmitted: [
        `Joined PrepEngine network holding verified student card for ${finalCollege}!`
      ],
      repliesSubmitted: [],
      timeline: [
        {
          title: 'Joined PrepEngine Alpha Portal',
          desc: `Identity verified holding security domain token. Assigned to ${department} (${semester}).`,
          date: 'Just now',
          type: 'signup'
        }
      ]
    };

    setStudentProfile(initialProfile);
    setIsBetaModalOpen(false);
    
    // Smooth transition straight to their brand new Profile Page view!
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback to append a new hint submission directly to the student profile timeline
  const addPostToProfile = (text: string) => {
    if (!studentProfile) return;
    setStudentProfile({
      ...studentProfile,
      topicsContributed: studentProfile.topicsContributed + 1,
      totalUpvotesEarned: studentProfile.totalUpvotesEarned + 12,
      postsSubmitted: [text, ...studentProfile.postsSubmitted],
      timeline: [
        {
          title: 'Contributed Lecture Hint',
          desc: `Crowdsourced exam prioritize clue submitted anonymously to dashboard. (+12 rep earned)`,
          date: 'Just now',
          type: 'post'
        },
        ...studentProfile.timeline
      ]
    });
  };

  // Callback to append a nested comment reply directly to the student profile timeline
  const addReplyToProfile = (replyText: string, topicName: string) => {
    if (!studentProfile) return;
    setStudentProfile({
      ...studentProfile,
      totalUpvotesEarned: studentProfile.totalUpvotesEarned + 5,
      repliesSubmitted: [
        { text: replyText, topicName, timestamp: 'Just now' },
        ...studentProfile.repliesSubmitted
      ],
      timeline: [
        {
          title: 'Replied to Discussion Thread',
          desc: `Joined active consensus debate under "${topicName}" topic.`,
          date: 'Just now',
          type: 'reply'
        },
        ...studentProfile.timeline
      ]
    });
  };

  const handleUpdateProfile = (updated: StudentProfile) => {
    setStudentProfile(updated);
  };

  return (
    <div id="prepengine-root" className="min-h-screen bg-[#fbfaf8] text-[#0f1410] font-sans antialiased overflow-x-hidden selection:bg-[#cbd7cc]">
      
      {/* Sticky Top Navigation block */}
      <Navbar
        onNavigate={handleNavigate}
        activeSection={activeSection}
        onOpenBeta={() => handleOpenBeta()}
        studentProfile={studentProfile}
        currentView={currentView}
        onSetView={setCurrentView}
      />

      {/* Primary Display Switcher */}
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* 1. Cinematic Hero Section */}
            <Hero onJoinBeta={() => handleOpenBeta()} onNavigate={handleNavigate} />

            {/* 2. Verification Flowchart Section */}
            <HowItWorks />

            {/* 3. Redesigned Live Dashboard Feed */}
            <DashboardPreview 
              studentProfile={studentProfile}
              onAddPostToProfile={addPostToProfile}
              onAddReplyToProfile={addReplyToProfile}
              onOpenBeta={() => handleOpenBeta()}
            />

            {/* 4. Authentic Student Testimonials */}
            <Testimonials />

            {/* 5. Natural Organic Call to Action */}
            <CTA onJoinBeta={(emailInput) => handleOpenBeta(emailInput)} />
          </motion.div>
        ) : (
          <motion.div
            key="profile-screen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', damping: 26, stiffness: 150 }}
            className="pt-16 pb-24 bg-[#FAF8F5] min-h-screen"
          >
            {/* Dynamic Interactive Profile Component */}
            {studentProfile ? (
              <StudentProfileView
                profile={studentProfile}
                onUpdateProfile={handleUpdateProfile}
                onNavigateToFeed={() => {
                  setCurrentView('home');
                  setTimeout(() => {
                    handleNavigate('dashboard');
                  }, 150);
                }}
              />
            ) : (
              <div className="text-center py-20">
                <p className="text-sm text-[#7c6e5a]">No profile initialized yet. Click Get Started to register!</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clean Organic footer */}
      <Footer onNavigate={handleNavigate} />

      {/* 3-Step Interactive Onboarding Modal dialog */}
      <AnimatePresence>
        {isBetaModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBetaModalOpen(false)}
              className="absolute inset-0 bg-[#0f1410]/60 backdrop-blur-sm"
              id="modal-backdrop"
            ></motion.div>

            {/* Modal box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#ebe5dc] max-w-lg w-full relative z-10 overflow-hidden text-left"
              id="onboarding-modal"
            >
              {/* Close Button Button */}
              <button
                onClick={() => setIsBetaModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-[#7c6e5a] hover:text-[#0f1410] rounded-xl hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                aria-label="Close Dialog"
                id="modal-close-btn"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Progress Stepper bars */}
              <div className="flex items-center space-x-2 mb-6">
                <div className={`h-1.5 flex-1 rounded-full transition-all ${onboardingStep >= 1 ? 'bg-[#d95d39]' : 'bg-[#f4f6f4]'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-all ${onboardingStep >= 2 ? 'bg-[#d95d39]' : 'bg-[#f4f6f4]'}`} />
                <div className={`h-1.5 flex-1 rounded-full transition-all ${onboardingStep >= 3 ? 'bg-[#d95d39]' : 'bg-[#f4f6f4]'}`} />
              </div>

              {/* Steps views split */}
              <form onSubmit={handleOnboardingSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  {onboardingStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-[#fcf8f2] border border-[#dfd7cc] text-[#d95d39] text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Sparkles className="h-3.5 w-3.5 text-[#e69d45] fill-[#e69d45]" />
                          <span>Step 1 of 3: Campus & Identity</span>
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-[#0f1410] mt-1">
                          Select Your College
                        </h3>
                        <p className="text-xs text-[#7c6e5a] font-sans leading-relaxed">
                          PrepEngine is custom-tailored for local college curriculum systems in West Bengal. Select your active campus block:
                        </p>
                      </div>

                      {/* College Selection List */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">
                          Siliguri Campus Location
                        </label>
                        <select
                          id="onboarding-select-college"
                          value={onboardingCampus}
                          onChange={(e) => setOnboardingCampus(e.target.value)}
                          className="w-full p-3 rounded-xl border border-[#ebe5dc] bg-white text-xs font-sans text-[#0f1410] focus:ring-1 focus:ring-[#4a5c4d]"
                        >
                          {SILIGURI_COLLEGES.map((col, index) => (
                            <option key={index} value={col.name}>{col.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Basic credentials */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">
                            Full Student Name
                          </label>
                          <input
                            type="text"
                            placeholder="E.g. Akash Sharma"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-[#ebe5dc] bg-white text-xs font-sans text-[#0f1410] focus:ring-1 focus:ring-[#4a5c4d]"
                            required
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">
                            Username Handles
                          </label>
                          <input
                            type="text"
                            placeholder="E.g. akash_slg"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-[#ebe5dc] bg-white text-xs font-sans text-[#0f1410] focus:ring-1 focus:ring-[#4a5c4d]"
                            required
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (!fullName.trim() || !username.trim()) {
                              alert('Please fill out your Full Name and Username handles before continuing!');
                              return;
                            }
                            setOnboardingStep(2);
                          }}
                          className="w-full py-3 bg-[#2d382e] text-white rounded-xl text-xs font-bold hover:bg-[#3b4b3e] active:scale-98 transition-all flex items-center justify-center space-x-1"
                        >
                          <span>Proceed to Academic Placement</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {onboardingStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-[#fcf8f2] border border-[#dfd7cc] text-[#d95d39] text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Sparkles className="h-3.5 w-3.5 text-[#e69d45] fill-[#e69d45]" />
                          <span>Step 2 of 3: Academic Placement & Avatar</span>
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-[#0f1410] mt-1">
                          Where Do You Focus?
                        </h3>
                        <p className="text-xs text-[#7c6e5a] font-sans">
                          Describe your batch details to match correct textbook guides and classroom hints dynamically.
                        </p>
                      </div>

                      {/* Semester and Dept dropdown select */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">
                            Department
                          </label>
                          <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-[#ebe5dc] bg-white text-xs text-[#0f1410]"
                          >
                            <option value="Computer Science">Computer Science (CSE)</option>
                            <option value="Information Technology">Information Technology (IT)</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Management Studies">Management Studies</option>
                            <option value="Pure Sciences">Pure Sciences</option>
                            <option value="Commerce">Commerce</option>
                            <option value="Humanities">Humanities & Social Sciences</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">
                            Current Term
                          </label>
                          <select
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            className="w-full p-2.5 rounded-xl border border-[#ebe5dc] bg-white text-xs text-[#0f1410]"
                          >
                            <option value="Semester 1">Semester 1 (Autumn)</option>
                            <option value="Semester 2">Semester 2 (Spring)</option>
                            <option value="Semester 3">Semester 3 (Autumn)</option>
                            <option value="Semester 4">Semester 4 (Spring)</option>
                            <option value="Semester 5">Semester 5 (Autumn)</option>
                            <option value="Semester 6">Semester 6 (Spring)</option>
                            <option value="Semester 7">Semester 7 (Autumn)</option>
                            <option value="Semester 8">Semester 8 (Spring)</option>
                          </select>
                        </div>
                      </div>

                      {/* Bio text block */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">
                          Short Student Bio (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="E.g. Cramming virtual memory tables before Harrison starts grading strictly."
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-[#ebe5dc] bg-white text-xs text-[#0f1410]"
                        />
                      </div>

                      {/* Select Avatar design */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">
                          Select Your Mask Mascot
                        </label>
                        <div className="grid grid-cols-5 gap-2.5">
                          {[
                            { id: 'avatar-owl', item: '🦉', label: 'Owl' },
                            { id: 'avatar-fox', item: '🦊', label: 'Fox' },
                            { id: 'avatar-deer', item: '🦌', label: 'Deer' },
                            { id: 'avatar-koala', item: '🐨', label: 'Koala' },
                            { id: 'avatar-panther', item: '🐆', label: '🐆' },
                          ].map((masc) => (
                            <button
                              key={masc.id}
                              type="button"
                              onClick={() => setSelectedAvatarId(masc.id)}
                              className={`p-2.5 rounded-2xl text-2xl border transition-all ${
                                selectedAvatarId === masc.id
                                  ? 'border-[#2d382e] bg-[#e5ebe5]/80 font-bold scale-102 ring-2 ring-[#718d75]/20'
                                  : 'border-[#ebe5dc] bg-[#fbfaf8] hover:bg-[#f5f2eb]'
                              }`}
                            >
                              {masc.item}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setOnboardingStep(1)}
                          className="flex-1 py-3 border border-[#ebe5dc] rounded-xl text-xs text-[#7c6e5a] hover:bg-[#FAF8F5]"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={() => setOnboardingStep(3)}
                          className="flex-1 py-3 bg-[#2d382e] text-white rounded-xl text-xs font-bold hover:bg-[#3b4b3e]"
                        >
                          Verification Check
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {onboardingStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-[#fcf8f2] border border-[#dfd7cc] text-[#d95d39] text-[10px] font-mono uppercase font-bold tracking-wider">
                          <Sparkles className="h-3.5 w-3.5 text-[#e69d45] fill-[#e69d45]" />
                          <span>Step 3 of 3: Campus Email Match</span>
                        </span>
                        <h3 className="font-serif text-2xl font-bold text-[#0f1410] mt-1">
                          Security Gate Anonymity
                        </h3>
                        <p className="text-xs text-[#7c6e5a] font-sans">
                          Submit your university email ID. We will run intelligent domain matching to verify and authenticate your campus registration securely.
                        </p>
                      </div>

                      {/* Email selection layout with live checking and verify alert banner */}
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">
                          University Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7c6e5a]">
                            <Mail className="h-4 w-4" />
                          </div>
                          <input
                            type="email"
                            placeholder="student@inspiria.edu.in or student@siliguricollege.in"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            className="w-full pl-9 pr-3 py-3 rounded-xl border border-[#ebe5dc] bg-white text-xs font-sans text-[#0f1410] focus:ring-1 focus:ring-[#4a5c4d]"
                            required
                          />
                        </div>

                        {/* LIVE INTELLIGENT DOMAIN BANNER METADATA */}
                        <AnimatePresence mode="wait">
                          {detectedCollege && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className={`p-3 rounded-xl border flex items-start space-x-2.5 ${
                                detectedCollege.match
                                  ? 'bg-[#f4f6f4] border-[#cbd7cc] text-[#2d382e]'
                                  : 'bg-[#fcf8f2] border-[#dfd7cc] text-[#7c6e5a]'
                              }`}
                            >
                              {detectedCollege.match ? (
                                <Check className="h-4.5 w-4.5 text-[#d95d39] shrink-0 mt-0.5" />
                              ) : (
                                <AlertCircle className="h-4.5 w-4.5 text-[#e69d45] shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block">
                                  {detectedCollege.match ? 'INTELLIGENT ROUTE DETECTED' : 'UNRECOGNIZED DOMAIN'}
                                </span>
                                <p className="text-xs font-sans mt-0.5 leading-snug">
                                  {detectedCollege.match ? (
                                    <>
                                      Successfully matched email with <strong>{detectedCollege.name}</strong> official servers! Domain validated.
                                    </>
                                  ) : (
                                    <>
                                      Registered under general Bengal network. Double check your email domain if you belong to matching Siliguri campuses!
                                    </>
                                  )}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* FERPA Shield Disclaimer */}
                      <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#ebe5dc] flex items-start space-x-2">
                        <ShieldAlert className="h-4 w-4 text-[#d95d39] shrink-0 mt-0.5" />
                        <p className="text-[10px] text-[#7c6e5a] leading-relaxed">
                          We do not share study tracks, posts, or comments with university registrars. Cryptographic token security ensures complete academic code isolation.
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setOnboardingStep(2)}
                          className="flex-1 py-3 border border-[#ebe5dc] rounded-xl text-xs text-[#7c6e5a] hover:bg-[#FAF8F5]"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          id="modal-submit-btn"
                          className="flex-1 py-3 bg-[#d95d39] text-white rounded-xl text-xs font-bold hover:bg-[#c85a17] active:scale-95 transition-all shadow-md shadow-[#d95d39]/15"
                        >
                          Secure My Alpha Seat
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
