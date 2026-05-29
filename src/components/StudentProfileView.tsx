/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, MapPin, Sparkles, Clock, BookOpen, MessageSquare, 
  User, Check, Edit2, ShieldCheck, Flame, Heart, ChevronRight, RefreshCw
} from 'lucide-react';

const AVATARS = [
  { id: 'avatar-owl', emoji: '🦉', label: 'Earthy Owl', bg: 'bg-[#e5ebe5]' },
  { id: 'avatar-fox', emoji: '🦊', label: 'Syllabus Fox', bg: 'bg-[#fcf8f2]' },
  { id: 'avatar-deer', emoji: '🦌', label: 'Mindful Deer', bg: 'bg-[#f5f2eb]' },
  { id: 'avatar-koala', emoji: '🐨', label: 'Cramming Koala', bg: 'bg-emerald-50' },
  { id: 'avatar-panther', emoji: '🐆', label: 'Exam Panther', bg: 'bg-orange-50' },
];

interface StudentProfileViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onNavigateToFeed: () => void;
}

export default function StudentProfileView({ profile, onUpdateProfile, onNavigateToFeed }: StudentProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(profile.fullName);
  const [editUsername, setEditUsername] = useState(profile.username);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editDept, setEditDept] = useState(profile.department);
  const [editSem, setEditSem] = useState(profile.semester);
  const [selectedAvatarId, setSelectedAvatarId] = useState(profile.avatarId);
  const [activeTab, setActiveTab] = useState<'contributions' | 'replies' | 'timeline'>('contributions');

  // Local feedback toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSave = () => {
    if (!editName.trim()) return;
    
    // Create new timeline event for updating profile
    const updatedTimeline = [
      {
        title: 'Updated Profile Details',
        desc: 'Refined workspace card, bio, and personal metadata.',
        date: 'Just now',
        type: 'profile'
      },
      ...profile.timeline
    ];

    onUpdateProfile({
      ...profile,
      fullName: editName,
      username: editUsername || 'anonymous_user',
      bio: editBio,
      department: editDept,
      semester: editSem,
      avatarId: selectedAvatarId,
      timeline: updatedTimeline
    });

    setIsEditing(false);
    triggerToast('Profile updated smoothly!');
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const getAvatarChar = () => {
    const found = AVATARS.find(a => a.id === selectedAvatarId);
    return found ? found.emoji : '🎓';
  };

  const getAvatarBg = () => {
    const found = AVATARS.find(a => a.id === selectedAvatarId);
    return found ? found.bg : 'bg-[#e5ebe5]';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-12">
      {/* Dynamic Local Profile Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#2d382e] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#4a5c4d] flex items-center space-x-2"
          >
            <Check className="h-4 w-4 text-[#e69d45]" />
            <span className="text-sm font-medium font-sans">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Student identity card */}
        <div className="col-span-1 lg:col-span-4 bg-white rounded-3xl border border-[#ebe5dc] shadow-sm overflow-hidden sticky top-24">
          <div className="h-24 bg-[#e5ebe5]" />
          
          <div className="px-6 pb-6 text-center -mt-12 relative">
            {/* Avatar Select / Display */}
            <div className="inline-block relative">
              <div id="student-profile-avatar" className={`w-24 h-24 rounded-3xl shadow-md ${getAvatarBg()} border-4 border-white flex items-center justify-center text-4xl select-none transition-all`}>
                {getAvatarChar()}
              </div>
              <span className="absolute bottom-1 right-1 bg-[#d95d39] text-white p-1 rounded-lg text-[9px] font-mono tracking-widest leading-none font-bold">
                PRO
              </span>
            </div>

            {/* Profile Core Details */}
            {!isEditing ? (
              <div className="mt-4 space-y-1">
                <h2 id="profile-fullname-text" className="font-serif text-2xl font-bold text-[#0f1410]">
                  {profile.fullName}
                </h2>
                <p id="profile-username-text" className="text-sm font-mono text-[#7c6e5a]">
                  @{profile.username}
                </p>
                
                <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-[#f4f6f4] border border-[#e5ebe5] text-xs font-sans text-[#4a5c4d] mt-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#d95d39]" />
                  <span className="font-medium">Active Alpha Candidate</span>
                </div>

                <p id="profile-bio-text" className="text-sm text-[#3b4b3e] italic pt-3 max-w-sm mx-auto leading-relaxed">
                  "{profile.bio || 'Crowdsourcing high-yield syllabus priorities around West Bengal colleges.'}"
                </p>
              </div>
            ) : (
              <div className="mt-4 text-left space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-2 rounded-xl border border-[#ebe5dc] bg-[#fbfaf8] text-sm focus:outline-none focus:ring-1 focus:ring-[#4a5c4d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase">Username</label>
                  <input
                    type="text"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    className="w-full p-2 rounded-xl border border-[#ebe5dc] bg-[#fbfaf8] text-sm focus:outline-none focus:ring-1 focus:ring-[#4a5c4d]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase">Short Bio</label>
                  <textarea
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    rows={2}
                    className="w-full p-2 rounded-xl border border-[#ebe5dc] bg-[#fbfaf8] text-sm focus:outline-none focus:ring-1 focus:ring-[#4a5c4d]"
                  />
                </div>

                {/* Avatar presets */}
                <div className="space-y-1.5 pt-1">
                  <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">Select Avatar Emblem</label>
                  <div className="flex gap-2 justify-center flex-wrap">
                    {AVATARS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setSelectedAvatarId(av.id)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl border transition-all ${
                          selectedAvatarId === av.id 
                            ? 'border-[#4a5c4d] bg-[#e5ebe5] ring-2 ring-[#718d75]/30' 
                            : 'border-[#ebe5dc] bg-[#fbfaf8] hover:bg-[#f5f2eb]'
                        }`}
                        title={av.label}
                      >
                        {av.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Academic Placement block */}
            <div className="mt-6 pt-5 border-t border-[#ebe5dc] text-left space-y-4">
              <div className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-[#d95d39] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block leading-none">College Campus</span>
                  <p id="profile-college-display" className="text-sm font-bold text-[#0f1410] leading-tight">
                    {profile.college}
                  </p>
                </div>
              </div>

              {!isEditing ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">Department</span>
                    <p className="text-sm font-medium text-[#0f1410]">
                      {profile.department || 'Computer Science'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">Semester Term</span>
                    <p className="text-sm font-medium text-[#0f1410]">
                      {profile.semester}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">Department</label>
                    <select
                      value={editDept}
                      onChange={(e) => setEditDept(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#ebe5dc] bg-[#fbfaf8] text-xs"
                    >
                      <option value="Computer Science">Computer CS</option>
                      <option value="Information Technology">Information IT</option>
                      <option value="Civil Engineering">Civil Eng</option>
                      <option value="Management Studies">Management</option>
                      <option value="Pure Sciences">Pure Sciences</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts / Humanities">Arts / Humanities</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase block">Semester</label>
                    <select
                      value={editSem}
                      onChange={(e) => setEditSem(e.target.value)}
                      className="w-full p-2 rounded-lg border border-[#ebe5dc] bg-[#fbfaf8] text-xs"
                    >
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                      <option value="Semester 7">Semester 7</option>
                      <option value="Semester 8">Semester 8</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Action Buttons */}
            <div className="mt-6 pt-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#ebe5dc] text-xs font-semibold text-[#4a5c4d] hover:bg-[#f5f2eb] hover:border-[#dfd7cc] transition-all flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                  <span>Refine Profile card</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-2 px-3 rounded-xl border border-[#ebe5dc] text-xs text-[#7c6e5a] hover:bg-[#fbfaf8]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#2d382e] text-white hover:bg-[#3b4b3e] text-xs font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Badges, Upvotes, Dynamic Submissions Tabs */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          {/* Summary Stat Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#fbfaf8] rounded-2xl border border-[#ebe5dc] p-4 text-center">
              <span className="text-[10px] font-mono text-[#7c6e5a] uppercase font-bold tracking-wider block">REPUTATION</span>
              <div className="flex items-center justify-center space-x-1.5 mt-1.5">
                <Award className="h-5 w-5 text-[#e69d45]" />
                <span className="font-serif text-2xl font-bold text-[#0f1410]">150</span>
              </div>
              <span className="text-[10px] font-sans text-[#4a5c4d] block mt-1 font-semibold">"Syllabus Sage"</span>
            </div>

            <div className="bg-[#fbfaf8] rounded-2xl border border-[#ebe5dc] p-4 text-center">
              <span className="text-[10px] font-mono text-[#7c6e5a] uppercase font-bold tracking-wider block">Total Upvotes</span>
              <div className="flex items-center justify-center space-x-1.5 mt-1.5">
                <Flame className="h-5 w-5 text-[#d95d39]" />
                <span className="font-serif text-2xl font-bold text-[#0f1410]">{profile.totalUpvotesEarned}</span>
              </div>
              <span className="text-[9px] font-mono text-[#7c6e5a] block mt-1">Classroom approved</span>
            </div>

            <div className="bg-[#fbfaf8] rounded-2xl border border-[#ebe5dc] p-4 text-center">
              <span className="text-[10px] font-mono text-[#7c6e5a] uppercase font-bold tracking-wider block">Leaks Contributed</span>
              <div className="flex items-center justify-center space-x-1.5 mt-1.5">
                <BookOpen className="h-5 w-5 text-[#88a38b]" />
                <span className="font-serif text-2xl font-bold text-[#0f1410]">{profile.topicsContributed}</span>
              </div>
              <span className="text-[9px] font-mono text-[#7c6e5a] block mt-1">Topics active</span>
            </div>

            <div className="bg-[#fbfaf8] rounded-2xl border border-[#ebe5dc] p-4 text-center">
              <span className="text-[10px] font-mono text-[#7c6e5a] uppercase font-bold tracking-wider block">Verification Tier</span>
              <div className="flex items-center justify-center space-x-1.5 mt-1.5">
                <Sparkles className="h-5 w-5 text-[#e69d45]" />
                <span className="font-serif text-2xl font-bold text-[#0f1410]">T-1</span>
              </div>
              <span className="text-[9px] font-sans text-emerald-700 block mt-1 font-bold">100% Certified Domain</span>
            </div>
          </div>

          {/* Badges Drawer */}
          <div className="bg-[#fcf8f2] border border-[#dfd7cc] p-4 rounded-3xl">
            <h4 className="text-xs font-mono font-bold text-[#7c6e5a] uppercase tracking-wider mb-2.5">
              Acquired Badges & Reputation Awards
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {profile.badges.map((badge, idx) => (
                <div key={idx} className="bg-white border border-[#ebe5dc] rounded-full px-3.5 py-1.5 flex items-center space-x-1.5 shadow-sm">
                  <span className="text-xs">{idx === 0 ? '🏆' : idx === 1 ? '🌟' : '📚'}</span>
                  <span className="text-xs font-sans font-bold text-[#2d382e]">{badge}</span>
                </div>
              ))}
              <div className="bg-[#FAF8F5] border border-dashed border-[#dfd7cc] rounded-full px-3 py-1 flex items-center space-x-1">
                <span className="text-[10px] font-mono text-[#7c6e5a] font-bold">Next Lock: Syllabus Sentinel</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-3xl border border-[#ebe5dc] shadow-sm overflow-hidden">
            <div className="flex border-b border-[#ebe5dc] bg-[#FAF8F5]">
              <button
                onClick={() => setActiveTab('contributions')}
                className={`flex-1 py-4 text-sm font-semibold transition-all border-b-2 flex items-center justify-center space-x-1.5 cursor-pointer ${
                  activeTab === 'contributions' 
                    ? 'border-[#d95d39] text-[#2d382e] bg-white font-bold' 
                    : 'border-transparent text-[#7c6e5a] hover:text-[#0f1410]'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>My Hints ({profile.postsSubmitted.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('replies')}
                className={`flex-1 py-4 text-sm font-semibold transition-all border-b-2 flex items-center justify-center space-x-1.5 cursor-pointer ${
                  activeTab === 'replies' 
                    ? 'border-[#d95d39] text-[#2d382e] bg-white font-bold' 
                    : 'border-transparent text-[#7c6e5a] hover:text-[#0f1410]'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                <span>My Discussion Replies ({profile.repliesSubmitted.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`flex-1 py-4 text-sm font-semibold transition-all border-b-2 flex items-center justify-center space-x-1.5 cursor-pointer ${
                  activeTab === 'timeline' 
                    ? 'border-[#d95d39] text-[#2d382e] bg-white font-bold' 
                    : 'border-transparent text-[#7c6e5a] hover:text-[#0f1410]'
                }`}
              >
                <Clock className="h-4 w-4" />
                <span>Activity Timeline</span>
              </button>
            </div>

            <div className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === 'contributions' && (
                  <motion.div
                    key="contributions-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {profile.postsSubmitted.length === 0 ? (
                      <div className="text-center py-10 space-y-3">
                        <p className="text-sm text-[#7c6e5a]">No peer hints submitted yet onto PrepEngine.</p>
                        <button 
                          onClick={onNavigateToFeed}
                          className="px-4 py-2 bg-[#2d382e] hover:bg-[#3b4b3e] text-xs font-bold text-white rounded-xl transition-all cursor-pointer"
                        >
                          Contribute first hint now
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {profile.postsSubmitted.map((post, idx) => (
                          <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#ebe5dc] flex items-start space-x-3.5 hover:shadow-md transition-shadow">
                            <div className="h-8 w-8 rounded-xl bg-[#e5ebe5] text-[#2d382e] flex items-center justify-center shrink-0">
                              <BookOpen className="h-4.5 w-4.5" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-mono font-bold text-[#d95d39]">VERIFIED CLUE</span>
                                <span className="text-xs text-[#7c6e5a]">• Just posted</span>
                              </div>
                              <p className="text-sm font-medium text-[#0f1410] leading-relaxed">
                                {post}
                              </p>
                              <div className="flex items-center space-x-3 pt-2 text-[#7c6e5a] text-[11px] font-mono">
                                <span className="flex items-center"><Flame className="h-3 w-3 text-[#d95d39] mr-0.5" /> +12 Peer Weight</span>
                                <span>• Live in Dashboard</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'replies' && (
                  <motion.div
                    key="replies-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {profile.repliesSubmitted.length === 0 ? (
                      <div className="text-center py-10 text-sm text-[#7c6e5a]">
                        No replies recorded yet. Participate in live discussions to gain upvotes.
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {profile.repliesSubmitted.map((reply, idx) => (
                          <div key={idx} className="bg-[#fcf8f2] p-4 rounded-2xl border border-[#dfd7cc] space-y-2">
                            <div className="flex items-center justify-between text-[11px] font-mono">
                              <span className="text-[#7c6e5a]">Replied on: <strong>{reply.topicName}</strong></span>
                              <span className="text-[#cbbfae]">{reply.timestamp}</span>
                            </div>
                            <p className="text-sm text-[#2d382e] font-sans leading-relaxed">
                              "{reply.text}"
                            </p>
                            <div className="flex items-center space-x-2.5 text-[10px] font-mono text-[#88a38b] pt-1">
                              <span>✓ Recursive Depth Verified</span>
                              <span>• +1 upvote</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === 'timeline' && (
                  <motion.div
                    key="timeline-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="relative border-l-2 border-[#e5ebe5] pl-6 ml-4 space-y-6 py-2"
                  >
                    {profile.timeline.map((item, idx) => (
                      <div key={idx} className="relative">
                        {/* Dot indicator */}
                        <span className="absolute -left-[31px] top-1.5 w-4 h-4 bg-white border-2 border-[#88a38b] rounded-full flex items-center justify-center">
                          <span className="w-1.5 h-1.5 bg-[#d95d39] rounded-full" />
                        </span>
                        
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-sm font-bold text-[#0f1410]">{item.title}</h5>
                            <span className="text-[10px] font-mono text-[#7c6e5a] bg-[#f5f2eb] px-2 py-0.5 rounded">
                              {item.date}
                            </span>
                          </div>
                          <p className="text-xs text-[#4a5c4d]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
