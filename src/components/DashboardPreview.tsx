/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Course, ExamTopic, ThreadReply, StudentProfile } from '../types';
import { INITIAL_COURSES } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, ThumbsUp, ThumbsDown, MessageSquareCode, Send, HelpCircle, 
  Flame, CheckCircle, BookOpen, Clock, Award, ShieldCheck, Filter, ChevronRight, User, Heart
} from 'lucide-react';

// Starting recursive comments dataset to make discussions feel alive right away
const INITIAL_REPLIES_BY_TOPIC: Record<string, ThreadReply[]> = {
  'cs-t1': [
    {
      id: 'r1',
      authorName: 'Sujal Sarkar',
      authorUsername: 'cramming_expert_slg',
      authorAvatar: '🦉',
      authorCollege: 'Inspiria Knowledge Campus',
      text: 'Dr. Harrison repeated this bitwise math twice during week 7 and spent 40 minutes drawing multi-level paging schemes. Focus strictly on 32-bit linear addresses.',
      timestamp: '2 hours ago',
      upvotes: 24,
      replies: [
        {
          id: 'r2',
          authorName: 'Aishwarya Roy',
          authorUsername: 'siliguri_coder',
          authorAvatar: '🦊',
          authorCollege: 'Siliguri College',
          text: 'Did he state if we need to sketch the hardware walk state machine or just explain virtual page numbers?',
          timestamp: '1 hour ago',
          upvotes: 12,
          replies: [
            {
              id: 'r3',
              authorName: 'Sujal Sarkar',
              authorUsername: 'cramming_expert_slg',
              authorAvatar: '🦉',
              authorCollege: 'Inspiria Knowledge Campus',
              text: 'He literally muttered: "If you cannot sketch the hardware translation path of a TLB miss, do not expect to score in full."',
              timestamp: '45 mins ago',
              upvotes: 18,
              replies: []
            }
          ]
        }
      ]
    },
    {
      id: 'r4',
      authorName: 'Rohit Sharma',
      authorUsername: 'rohit_siem',
      authorAvatar: '🐨',
      authorCollege: 'Surendra Institute of Engineering & Management',
      text: 'Our TA hinted that the practice question sheet is mirroring the actual exam diagram exactly.',
      timestamp: '5 hours ago',
      upvotes: 15,
      replies: []
    }
  ],
  'cs-t2': [
    {
      id: 'r5',
      authorName: 'Nikita Das',
      authorUsername: 'nikita_nbu',
      authorAvatar: '🦌',
      authorCollege: 'University of North Bengal',
      text: 'Semaphore initialization is where everyone trips up. He grades strictly on the wait() and signal() ordering.',
      timestamp: '4 hours ago',
      upvotes: 14,
      replies: [
        {
          id: 'r6',
          authorName: 'Pritam Paul',
          authorUsername: 'pritam_nit',
          authorAvatar: '🐆',
          authorCollege: 'Narula Institute Siliguri Campus',
          text: 'Does this apply to basic binary semaphores or counting ones as well?',
          timestamp: '3 hours ago',
          upvotes: 7,
          replies: [
            {
              id: 'r7',
              authorName: 'Nikita Das',
              authorUsername: 'nikita_nbu',
              authorAvatar: '🦌',
              authorCollege: 'University of North Bengal',
              text: 'He mentioned the classic Producer-Consumer contract which usually employs counting semaphores.',
              timestamp: '2 hours ago',
              upvotes: 9,
              replies: []
            }
          ]
        }
      ]
    }
  ],
  'ch-t1': [
    {
      id: 'r8',
      authorName: 'Sneha Mitra',
      authorUsername: 'sneha_salesian',
      authorAvatar: '🦊',
      authorCollege: 'Salesian College',
      text: 'Dr. Croft loves testing ester dual-activation because students always forget that the Grignard reacts twice! Study this mechanism step-by-step.',
      timestamp: 'Yesterday',
      upvotes: 31,
      replies: [
        {
          id: 'r9',
          authorName: 'Abhishek Dey',
          authorUsername: 'dey_abhishek',
          authorAvatar: '🦉',
          authorCollege: 'Inspiria Knowledge Campus',
          text: 'Does the reaction abort at the ketone state or go all the way to tertiary alcohol?',
          timestamp: '20 hours ago',
          upvotes: 15,
          replies: [
            {
              id: 'r10',
              authorName: 'Sneha Mitra',
              authorUsername: 'sneha_salesian',
              authorAvatar: '🦊',
              authorCollege: 'Salesian College',
              text: 'Tertiary alcohol is the final stable product! You cannot isolate the ketone because the intermediate is highly reactive.',
              timestamp: '18 hours ago',
              upvotes: 21,
              replies: []
            }
          ]
        }
      ]
    }
  ]
};

// Available Siliguri semesters
const SEMESTERS = [
  { value: 'All Semesters', label: 'All Semesters' },
  { value: 'Semester 1', label: 'Semester 1 (Autumn)' },
  { value: 'Semester 2', label: 'Semester 2 (Spring)' },
  { value: 'Semester 3', label: 'Semester 3 (Autumn)' },
  { value: 'Semester 4', label: 'Semester 4 (Spring)' },
  { value: 'Semester 5', label: 'Semester 5 (Autumn)' },
  { value: 'Semester 6', label: 'Semester 6 (Spring)' },
  { value: 'Semester 7', label: 'Semester 7 (Autumn)' },
  { value: 'Semester 8', label: 'Semester 8 (Spring)' },
];

interface DashboardPreviewProps {
  studentProfile: StudentProfile | null;
  onAddPostToProfile: (text: string) => void;
  onAddReplyToProfile: (text: string, topicName: string) => void;
  onOpenBeta: () => void;
}

export default function DashboardPreview({ studentProfile, onAddPostToProfile, onAddReplyToProfile, onOpenBeta }: DashboardPreviewProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourseId, setActiveCourseId] = useState<string>('cs-301');
  const [activeTopicIdForDetails, setActiveTopicIdForDetails] = useState<string | null>('cs-t1');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filters
  const [selectedSemester, setSelectedSemester] = useState<string>('All Semesters');
  const [selectedProfessor, setSelectedProfessor] = useState<string>('All Faculty');

  // Infinite replies state
  const [repliesByTopic, setRepliesByTopic] = useState<Record<string, ThreadReply[]>>(INITIAL_REPLIES_BY_TOPIC);

  // Form states for submitting a hint anonymously
  const [targetTopicId, setTargetTopicId] = useState<string>('new');
  const [customTopicName, setCustomTopicName] = useState<string>('');
  const [hintText, setHintText] = useState<string>('');
  const [chapterText, setChapterText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<'High-Yield' | 'Medium Priority' | 'Low/Ignored'>('High-Yield');

  // Initialize data on mount
  useEffect(() => {
    const cached = localStorage.getItem('prep_engine_courses');
    if (cached) {
      try {
        setCourses(JSON.parse(cached));
      } catch (err) {
        setCourses(INITIAL_COURSES);
      }
    } else {
      // Set initial courses with Siliguri appropriate academic metadata
      const siliguriAdaptedCourses = INITIAL_COURSES.map(c => {
        if (c.id === 'cs-301') {
          return {
            ...c,
            professorName: 'Prof. S. R. Harrison (Guest Lect. SIT)',
          };
        } else if (c.id === 'chem-210') {
          return {
            ...c,
            professorName: 'Dr. Evelyn Croft (HOD Chemistry, NBU)',
          };
        } else {
          return {
            ...c,
            professorName: 'Prof. J. Vance (Visiting SIEM)',
          };
        }
      });
      setCourses(siliguriAdaptedCourses);
    }
  }, []);

  const saveCoursesToState = (updated: Course[]) => {
    setCourses(updated);
    localStorage.setItem('prep_engine_courses', JSON.stringify(updated));
  };

  const activeCourse = courses.find((c) => c.id === activeCourseId) || courses[0] || INITIAL_COURSES[0];

  // Upvote/Downvote actions
  const handleVote = (topicId: string, action: 'up' | 'down') => {
    const updated = courses.map((course) => {
      const isTargetCourse = course.topics.some(t => t.id === topicId);
      if (!isTargetCourse) return course;

      const updatedTopics = course.topics.map((topic) => {
        if (topic.id !== topicId) return topic;

        let up = topic.upvotes;
        let down = topic.downvotes;

        if (action === 'up') {
          up += 1;
        } else {
          down += 1;
        }

        const total = up + down;
        const confidence = total === 0 ? 0 : Math.round((up / total) * 100);

        // Adjust category dynamically based on confidence
        let cat: ExamTopic['category'] = 'Medium Priority';
        if (confidence >= 80) {
          cat = 'High-Yield';
        } else if (confidence < 45) {
          cat = 'Low/Ignored';
        }

        return {
          ...topic,
          upvotes: up,
          downvotes: down,
          confidenceScore: confidence,
          category: cat,
        };
      });

      const avgConf = Math.round(
        updatedTopics.reduce((acc, t) => acc + t.confidenceScore, 0) / updatedTopics.length
      );

      return {
        ...course,
        topics: updatedTopics,
        confidenceAverage: avgConf,
        studentContributors: course.studentContributors + 1,
      };
    });

    saveCoursesToState(updated);
    showToast(`Your peer feedback has been verified and applied instantly!`);
  };

  // Submit anonymous hint logic
  const handlePostHint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hintText.trim() || (targetTopicId === 'new' && !customTopicName.trim())) {
      return;
    }

    const targetCourse = courses.find(c => c.id === activeCourseId) || courses[0];
    const trackingTopicName = targetTopicId === 'new' ? customTopicName : (targetCourse.topics.find(t => t.id === targetTopicId)?.name || 'Syllabus Topic');

    const updated = courses.map((course) => {
      if (course.id !== activeCourseId) return course;

      let updatedTopics = [...course.topics];

      if (targetTopicId !== 'new') {
        updatedTopics = updatedTopics.map((topic) => {
          if (topic.id !== targetTopicId) return topic;
          return {
            ...topic,
            upvotes: topic.upvotes + 4,
            confidenceScore: Math.round(((topic.upvotes + 4) / (topic.upvotes + 4 + topic.downvotes)) * 100),
            lectureHints: [hintText, ...topic.lectureHints]
          };
        });
        showToast('Hint successfully appended to topic with bonus weights (+4).');
      } else {
        const newTopicId = `custom-topic-${Date.now()}`;
        const newTopic: ExamTopic = {
          id: newTopicId,
          name: customTopicName,
          chapter: chapterText || 'Syllabus Chapter Weight',
          description: `Classroom peer lead. Direct contribution.`,
          lectureHints: [hintText],
          upvotes: 9,
          downvotes: 1,
          confidenceScore: 90,
          category: selectedCategory,
          professorWiseName: course.topics[0]?.professorWiseName || 'Faculty'
        };

        updatedTopics = [newTopic, ...updatedTopics];
        setActiveTopicIdForDetails(newTopicId);
        showToast(`Topic "${customTopicName}" is now live in the cooperative feed!`);
      }

      const avgConf = Math.round(
        updatedTopics.reduce((acc, t) => acc + t.confidenceScore, 0) / updatedTopics.length
      );

      return {
        ...course,
        topics: updatedTopics,
        confidenceAverage: avgConf,
        majorTopicsCount: updatedTopics.length,
        studentContributors: course.studentContributors + 1,
      };
    });

    saveCoursesToState(updated);

    // Call callback to sync with student portal profile
    if (studentProfile) {
      onAddPostToProfile(`[${activeCourse.code}] ${trackingTopicName}: "${hintText}"`);
    }

    // Reset fields
    setHintText('');
    setCustomTopicName('');
    setChapterText('');
    setTargetTopicId('new');
  };

  // Safe toast message
  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4500);
  };

  // List of ALL professors across active syllabus data
  const professorsList = [
    'All Faculty',
    'Prof. S. R. Harrison (Guest Lect. SIT)',
    'Dr. Evelyn Croft (HOD Chemistry, NBU)',
    'Prof. J. Vance (Visiting SIEM)'
  ];

  // Filtering Logic
  const filteredTopics = activeCourse?.topics.filter((topic) => {
    // Professor filter
    if (selectedProfessor !== 'All Faculty' && activeCourse.professorName !== selectedProfessor) {
      return false;
    }
    return true;
  }) || [];

  // Filter courses by semester if needed (mocked mapping for demo)
  const isCourseInSemester = (courseId: string, semValue: string) => {
    if (semValue === 'All Semesters') return true;
    if (semValue === 'Semester 5') return courseId === 'cs-301';
    if (semValue === 'Semester 3') return courseId === 'chem-210';
    if (semValue === 'Semester 1') return courseId === 'econ-110';
    return false; // other semesters are empty in initial mock list
  };

  const visibleCourses = courses.filter(c => isCourseInSemester(c.id, selectedSemester));

  const getCategoryTheme = (cat: ExamTopic['category']) => {
    switch (cat) {
      case 'High-Yield':
        return {
          bg: 'bg-[#fcf8f2] border-[#dfd7cc] text-[#d95d39]',
          badge: 'bg-[#d95d39] text-white',
          text: 'text-[#d95d39]'
        };
      case 'Medium Priority':
        return {
          bg: 'bg-[#fcfaf8] border-[#ebe5dc] text-[#e69d45]',
          badge: 'bg-[#e69d45] text-white',
          text: 'text-[#e69d45]'
        };
      case 'Low/Ignored':
        return {
          bg: 'bg-[#f4f6f4] border-[#e5ebe5] text-[#718d75]',
          badge: 'bg-[#88a38b] text-[#2d382e]',
          text: 'text-[#718d75]'
        };
    }
  };

  // Recursive comment handler
  const handleAddNewReply = (topicId: string, parentCommentId: string | null, text: string) => {
    const authorName = studentProfile?.fullName || 'Anonymous Contributor';
    const authorUsername = studentProfile?.username || 'anonymous_peer';
    const authorAvatar = studentProfile?.avatarId === 'avatar-owl' ? '🦉' : studentProfile?.avatarId === 'avatar-fox' ? '🦊' : studentProfile?.avatarId === 'avatar-deer' ? '🦌' : '👽';
    const authorCollege = studentProfile?.college || 'Siliguri Student Network';

    const newReply: ThreadReply = {
      id: `comment-${Date.now()}`,
      authorName,
      authorUsername,
      authorAvatar,
      authorCollege,
      text,
      timestamp: 'Just now',
      upvotes: 1,
      replies: []
    };

    const currentTopicReplies = repliesByTopic[topicId] || [];

    const insertReplyRecursively = (list: ThreadReply[]): boolean => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === parentCommentId) {
          list[i].replies = [newReply, ...list[i].replies];
          return true;
        }
        if (list[i].replies.length > 0) {
          const found = insertReplyRecursively(list[i].replies);
          if (found) return true;
        }
      }
      return false;
    };

    let updatedReplies = [...currentTopicReplies];
    if (!parentCommentId) {
      // it is a root-level reply top comment
      updatedReplies = [newReply, ...updatedReplies];
    } else {
      insertReplyRecursively(updatedReplies);
    }

    setRepliesByTopic({
      ...repliesByTopic,
      [topicId]: updatedReplies
    });

    // Notify parent app if student sits on an active profile card
    if (studentProfile) {
      const trackingTopic = activeCourse.topics.find(t => t.id === topicId)?.name || 'Syllabus Topic';
      onAddReplyToProfile(text, trackingTopic);
    }

    showToast('Discussion comment posted smoothly inside nested thread.');
  };

  // Upvote single comment recursively
  const handleCommentUpvote = (topicId: string, commentId: string) => {
    const currentReplies = repliesByTopic[topicId] || [];
    
    const upvoteRecursively = (list: ThreadReply[]): boolean => {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === commentId) {
          list[i].upvotes += 1;
          return true;
        }
        if (list[i].replies.length > 0) {
          const found = upvoteRecursively(list[i].replies);
          if (found) return true;
        }
      }
      return false;
    };

    const updated = [...currentReplies];
    upvoteRecursively(updated);
    setRepliesByTopic({
      ...repliesByTopic,
      [topicId]: updated
    });
  };

  const activeTopic = activeCourse?.topics.find(t => t.id === activeTopicIdForDetails) || activeCourse?.topics[0];

  // Helper recursive subcomponent to render nested replies
  function ReplyNode({ node, depth, topicId }: { node: ThreadReply; depth: number; topicId: string; key?: string }) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyInputValue, setReplyInputValue] = useState('');

    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!replyInputValue.trim()) return;
      handleAddNewReply(topicId, node.id, replyInputValue);
      setReplyInputValue('');
      setIsReplying(false);
    };

    return (
      <div className={`pl-4 border-l border-[#ebe5dc] py-2 mt-2 ml-1 sm:ml-3`}>
        <div className="bg-[#fbfaf8] border border-[#ebe5dc] rounded-2xl p-4 space-y-2 hover:border-[#dfd7cc] transition-colors shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl leading-none">{node.authorAvatar}</span>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[#0f1410]">{node.authorName}</span>
                  <span className="text-[10px] text-[#7c6e5a] font-mono">@{node.authorUsername}</span>
                </div>
                <p className="text-[9px] text-[#7c6e5a] leading-none font-sans mt-0.5">{node.authorCollege}</p>
              </div>
            </div>
            <span className="text-[10px] text-[#cbbfae] font-mono">{node.timestamp}</span>
          </div>

          <p className="text-sm text-[#2d382e] font-sans leading-relaxed whitespace-pre-line pl-1">
            {node.text}
          </p>

          <div className="flex items-center space-x-3 pt-2.5 pl-1 border-t border-[#f4f6f4] text-xs font-mono">
            <button
              onClick={() => handleCommentUpvote(topicId, node.id)}
              className="flex items-center space-x-1 text-[#7c6e5a] hover:text-[#d95d39] transition-colors"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{node.upvotes}</span>
            </button>
            <span>•</span>
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="text-[#4a5c4d] hover:text-[#2d382e] font-bold"
            >
              Reply
            </button>
          </div>

          {isReplying && (
            <form onSubmit={onSubmit} className="flex gap-2 pt-2.5">
              <input
                type="text"
                placeholder={`Reply back to @${node.authorUsername}...`}
                value={replyInputValue}
                onChange={(e) => setReplyInputValue(e.target.value)}
                className="flex-1 p-2 border border-[#ebe5dc] rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-[#4a5c4d] bg-white text-[#2d382e]"
                autoFocus
              />
              <button
                type="submit"
                className="bg-[#2d382e] hover:bg-[#3b4b3e] text-white text-xs px-3 py-1.5 rounded-xl font-bold font-sans flex items-center space-x-1 shrink-0"
              >
                <Send className="h-3 w-3" />
                <span>Submit</span>
              </button>
            </form>
          )}
        </div>

        {/* Recursive rendering of responses */}
        {node.replies && node.replies.length > 0 && (
          <div className="space-y-1.5 mt-2">
            {node.replies.map((subReply) => (
              <ReplyNode key={subReply.id} node={subReply} depth={depth + 1} topicId={topicId} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <section id="dashboard" className="py-16 sm:py-24 bg-white border-b border-[#ebe5dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro header with elegant editorial alignment */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="text-xs font-mono tracking-[0.2em] text-[#d95d39] block font-bold uppercase">
            LIVE SYLLABUS DESK
          </span>
          <h2 className="font-serif text-[32px] sm:text-[40px] leading-tight text-[#0f1410] font-medium tracking-tight">
            Cooperative Exam Predictor Feed
          </h2>
          <p className="text-lg text-[#7c6e5a] font-sans max-w-2xl mx-auto leading-relaxed">
            Choose Siliguri courses, upvote priority exam topics, checkout lecture clues, or join nested discussion chains below.
          </p>
        </div>

        {/* Global Filter Bar */}
        <div className="bg-[#FAF8F5] border border-[#ebe5dc] p-4 rounded-3xl mb-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#7c6e5a] uppercase flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5 text-[#d95d39]" />
              Syllabus Filter:
            </span>
            
            {/* Semester Filter */}
            <select
              value={selectedSemester}
              onChange={(e) => {
                setSelectedSemester(e.target.value);
                // Auto switch course list
                const availableForSem = courses.filter(c => isCourseInSemester(c.id, e.target.value));
                if (availableForSem.length > 0) {
                  setActiveCourseId(availableForSem[0].id);
                }
              }}
              className="bg-white border border-[#ebe5dc] text-xs font-sans rounded-xl p-2.5 text-[#2d382e] focus:outline-none focus:ring-1 focus:ring-[#4a5c4d]"
            >
              {SEMESTERS.map(sem => (
                <option key={sem.value} value={sem.value}>{sem.label}</option>
              ))}
            </select>

            {/* Professor Filter */}
            <select
              value={selectedProfessor}
              onChange={(e) => setSelectedProfessor(e.target.value)}
              className="bg-white border border-[#ebe5dc] text-xs font-sans rounded-xl p-2.5 text-[#2d382e] focus:outline-none focus:ring-1 focus:ring-[#4a5c4d]"
            >
              {professorsList.map((prof, i) => (
                <option key={i} value={prof}>{prof}</option>
              ))}
            </select>
          </div>

          <div className="text-right text-xs text-[#7c6e5a] font-mono flex items-center justify-end space-x-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#d95d39] animate-pulse"></span>
            <span>Real-time Consensus weights applied</span>
          </div>
        </div>

        {/* Spotlights: "Most Discussed Today" and "Most Likely to Appear" */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ebe5dc] flex items-start space-x-4">
            <div className="bg-[#fcf8f2] p-3 rounded-2xl border border-[#dfd7cc]">
              <MessageSquareCode className="h-6 w-6 text-[#d95d39]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#d95d39] uppercase font-bold tracking-wider block">MOST DISCUSSED TODAY</span>
              <h4 className="text-base font-serif font-bold text-[#0f1410] mt-0.5 leading-snug">
                Fischer Esterification Steps & Proton Shuffling
              </h4>
              <p className="text-xs text-[#7c6e5a] mt-1 font-sans">
                Active discussion with 11 comments from North Bengal University (NBU) chemistry batch.
              </p>
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ebe5dc] flex items-start space-x-4">
            <div className="bg-[#FAF8F5] p-3 rounded-2xl border border-[#ebe5dc]">
              <Flame className="h-6 w-6 text-[#e69d45]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#e69d45] uppercase font-bold tracking-wider block">MOST LIKELY IN EXAMS</span>
              <h4 className="text-base font-serif font-bold text-[#0f1410] mt-0.5 leading-snug">
                TLB Translation & Page Table Walks
              </h4>
              <p className="text-xs text-[#7c6e5a] mt-1 font-sans">
                Voted as High-Yield target with 96% peer alignment validation score.
              </p>
            </div>
          </div>
        </div>

        {/* Main Application Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT RAIL (3 cols): Courses and Subject Heatmaps */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ebe5dc] space-y-4">
              <div>
                <span className="text-[10px] font-mono tracking-wider font-bold text-[#7c6e5a] uppercase">
                  ACTIVE DEPARTMENTS
                </span>
                <h3 className="text-sm font-serif font-bold text-[#0f1410] mt-0.5">
                  Select Subject Hub
                </h3>
              </div>

              {/* Course Selector Buttons */}
              <div className="space-y-2">
                {visibleCourses.length === 0 ? (
                  <p className="text-xs text-[#7c6e5a] italic p-2 text-center">No active courses in this term.</p>
                ) : (
                  visibleCourses.map((course) => (
                    <button
                      key={course.id}
                      onClick={() => {
                        setActiveCourseId(course.id);
                        const firstTopicId = course.topics[0]?.id || null;
                        setActiveTopicIdForDetails(firstTopicId);
                        setTargetTopicId('new');
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        activeCourseId === course.id
                          ? 'bg-[#2d382e] text-white border-[#2d382e] shadow-md shadow-[#2d382e]/10'
                          : 'bg-white text-[#2d382e] border-[#ebe5dc] hover:bg-[#e5ebe5]/30 hover:border-[#cbd7cc]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-mono text-[10px] font-bold uppercase opacity-80">
                            {course.code}
                          </span>
                          <div className={`h-1.5 w-1.5 rounded-full ${
                            course.confidenceAverage >= 90 ? 'bg-red-400' : 'bg-[#e69d45]'
                          }`}></div>
                        </div>
                        <h4 className="text-xs font-serif font-bold tracking-tight leading-snug mt-0.5 truncate max-w-[130px]">
                          {course.name}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        activeCourseId === course.id ? 'bg-white/10 text-white' : 'bg-[#f4f6f4] text-[#2d382e]'
                      }`}>
                        {course.confidenceAverage}%
                      </span>
                    </button>
                  ))
                )}
              </div>

              {/* Professor info */}
              {activeCourse && (
                <div className="bg-white p-4.5 rounded-2xl border border-[#ebe5dc] space-y-2">
                  <span className="text-[9px] font-mono font-bold text-[#7c6e5a] block tracking-wider uppercase">
                    ACTIVE PROFESSOR
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-[#e5ebe5] text-[#2d382e] font-serif font-bold text-xs flex items-center justify-center">
                      🎓
                    </div>
                    <div>
                      <h5 className="text-xs font-serif font-bold text-[#0f1410] leading-none">
                        {activeCourse.professorName}
                      </h5>
                      <span className="text-[10px] text-[#7c6e5a] font-sans">
                        Syllabus Controller
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Subject HEATMAP: Beautiful visual grid layout representing syllabus modules */}
            <div className="bg-[#FAF8F5] p-5 rounded-3xl border border-[#ebe5dc] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#7c6e5a] tracking-wider uppercase">
                  SUBJECT TOPIC HEATMAP
                </span>
                <span className="text-[9px] font-mono text-emerald-800 font-bold bg-[#e5ebe5] px-1.5 py-0.5 rounded">Heatmap</span>
              </div>
              
              <p className="text-[11px] text-[#7c6e5a] leading-tight">
                Click box elements to jump directly to detailed hints & nested threads:
              </p>

              {activeCourse && (
                <div className="grid grid-cols-4 gap-2 pt-2">
                  {activeCourse.topics.map((t, idx) => {
                    const theme = getCategoryTheme(t.category);
                    const isActive = activeTopicIdForDetails === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActiveTopicIdForDetails(t.id)}
                        className={`h-9 rounded-xl transition-all flex flex-col items-center justify-center font-mono text-[10px] font-bold border ${theme.bg} ${
                          isActive ? 'ring-2 ring-[#d95d39] scale-105 border-[#d95d39]' : 'hover:scale-102'
                        }`}
                        title={`${t.name} (${t.confidenceScore}% confidence)`}
                      >
                        <span className="leading-none text-[8px] opacity-75">T{idx+1}</span>
                        <span className="leading-none font-bold text-[10px] mt-0.5">{t.confidenceScore}%</span>
                      </button>
                    );
                  })}
                  <button
                    onClick={() => {
                      setTargetTopicId('new');
                      showToast("Write a new topic in the right portal panel!");
                    }}
                    className="h-9 rounded-xl border border-dashed border-[#cbbfae] text-[#7c6e5a] flex items-center justify-center font-mono text-xs font-bold bg-white hover:bg-[#FAF8F5]"
                  >
                    +
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between text-[9px] font-mono text-[#7c6e5a] pt-3 border-t border-[#ebe5dc]">
                <div className="flex items-center space-x-1">
                  <div className="w-2.5 h-2.5 bg-[#FAF8F5] border border-[#ebe5dc] rounded" />
                  <span>Low</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2.5 h-2.5 bg-[#fcfaf8] border border-[#ebe5dc] rounded" />
                  <span>Medium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2.5 h-2.5 bg-[#fcf8f2] border border-[#dfd7cc] rounded" />
                  <span>High Yield</span>
                </div>
              </div>
            </div>
            
            {/* Campus verification lock */}
            <div className="p-4 rounded-2xl bg-[#f4f6f4] border border-[#e5ebe5] flex items-start space-x-2.5">
              <ShieldCheck className="h-4.5 w-4.5 text-[#3b4b3e] shrink-0 mt-0.5" />
              <p className="text-[11px] text-[#3b4b3e] leading-relaxed">
                <strong>Domain verification active</strong>. Only verified Siliguri institutional account metrics are counted in average weighting scores. Rest easy.
              </p>
            </div>
          </div>

          {/* MIDDLE COLUMN (5 cols): Ranked Topic Cards Feed */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#ebe5dc]">
              <div>
                <span className="font-mono text-[10px] text-[#7c6e5a] font-bold uppercase tracking-widest block">
                  CROWDSOURCED PRIORITY INDEX
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0f1410] flex items-center">
                  Exam Weightages
                  <Flame className="h-4 w-4 text-[#d95d39] fill-[#d95d39] ml-1.5" />
                </h3>
              </div>
              <span className="text-xs text-[#7c6e5a] font-mono bg-[#FAF8F5] px-2.5 py-1 rounded-xl border border-[#ebe5dc]">
                Order: Peer Score
              </span>
            </div>

            {/* List with larger text sizes and easy to read layouts */}
            <div className="space-y-5">
              {filteredTopics.length === 0 ? (
                <div className="bg-[#FAF8F5] rounded-3xl p-10 text-center text-[#7c6e5a] italic text-sm">
                  No topics matching filtration. Try selecting another classroom.
                </div>
              ) : (
                filteredTopics.map((topic, index) => {
                  const theme = getCategoryTheme(topic.category);
                  const isSelected = activeTopicIdForDetails === topic.id;

                  return (
                    <div
                      key={topic.id}
                      id={`topic-card-${topic.id}`}
                      onClick={() => setActiveTopicIdForDetails(topic.id)}
                      className={`p-5 rounded-3xl border transition-all cursor-pointer text-[#0f1410] group text-left ${
                        isSelected 
                          ? 'bg-white border-[#d95d39] ring-2 ring-[#d95d39]/15 shadow-md' 
                          : 'bg-[#fbfaf8] border-[#ebe5dc] hover:bg-white hover:border-[#dfd7cc]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#d95d39]">
                              Live #{index + 1}
                            </span>
                            <span className="text-[10px] font-mono text-[#7c6e5a] bg-[#f5f2eb] px-2.5 py-0.5 rounded-lg">
                              {topic.chapter}
                            </span>
                            <span className={`text-[10px] font-mono font-bold px-2 rounded-full leading-relaxed border ${theme.badge}`}>
                              {topic.category}
                            </span>
                          </div>
                          
                          <h4 className="font-serif text-lg font-bold text-[#0f1410] group-hover:text-[#d95d39] transition-colors leading-snug">
                            {topic.name}
                          </h4>
                          
                          <p className="text-sm text-[#2d382e] font-sans leading-relaxed">
                            {topic.description}
                          </p>
                        </div>

                        {/* Confidence score gauge card */}
                        <div className="flex flex-col items-center space-y-1 shrink-0 bg-white p-3 rounded-2xl border border-[#ebe5dc] shadow-sm min-w-[76px] transition-transform group-hover:scale-103">
                          <span className="text-[8px] font-mono text-[#7c6e5a] font-bold uppercase tracking-wider block">
                            CONFIDENCE
                          </span>
                          <span className="font-mono text-base font-bold text-[#0f1410] leading-none">
                            {topic.confidenceScore}%
                          </span>
                          
                          <div className="flex items-center space-x-2 pt-2 border-t border-[#f4f6f4] mt-1.5">
                            <button
                              id={`vote-up-${topic.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVote(topic.id, 'up');
                              }}
                              className="p-1 hover:text-[#d95d39] hover:bg-[#fbf5f2] rounded-lg transition-all text-[#7c6e5a] cursor-pointer"
                              title="Upvote Hint Accuracy"
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </button>
                            <button
                              id={`vote-down-${topic.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleVote(topic.id, 'down');
                              }}
                              className="p-1 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all text-[#7c6e5a] cursor-pointer"
                              title="Downvote"
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </button>
                          </div>
                          <span className="text-[9px] font-mono text-[#7c6e5a] pt-1">
                            +{topic.upvotes} votes
                          </span>
                        </div>
                      </div>

                      {/* Display active hints count info */}
                      <div className="mt-4 pt-3.5 border-t border-[#ebe5dc] flex items-center justify-between text-xs text-[#7c6e5a] font-mono">
                        <span className="flex items-center gap-1">
                          <MessageSquareCode className="h-4 w-4 text-[#d95d39]" />
                          Discussion Nest ({repliesByTopic[topic.id]?.length || 0} threads)
                        </span>
                        <span className="text-[#d95d39] font-bold group-hover:translate-x-0.5 transition-transform flex items-center">
                          View Hints & Discusssion <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR (4 cols): Detailed Discussion Thread Hub (Reddit/Discord nested comments) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Thread detail card */}
            {activeTopic ? (
              <div className="bg-[#FAF8F5] border border-[#ebe5dc] rounded-3xl p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#d95d39] uppercase font-bold tracking-wider">
                      ACTIVE NESTED DISCUSSION
                    </span>
                    <span className="text-xs font-mono text-[#7c6e5a]">{activeTopic.chapter}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#0f1410] mt-1.5 leading-snug">
                    {activeTopic.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs font-mono text-[#7c6e5a] pt-1 border-b border-[#ebe5dc] pb-3">
                    <span>Faculty: <strong>{activeCourse.professorName.split('(')[0].trim()}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">{activeTopic.confidenceScore}% consensus</span>
                  </div>
                </div>

                {/* Hints Compiled Lists */}
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono font-bold text-[#7c6e5a] uppercase tracking-wider block">
                    Syllabus Hints Compiled ({activeTopic.lectureHints.length})
                  </span>
                  <div className="space-y-1.5">
                    {activeTopic.lectureHints.map((hint, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-2xl border border-[#ebe5dc] text-xs font-sans text-[#2c382e] italic leading-relaxed relative">
                        <span className="absolute -left-1 -top-1 bg-[#88a38b] text-white text-[8px] font-mono w-4 h-4 rounded-full flex items-center justify-center">
                          {idx + 1}
                        </span>
                        "{hint}"
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reddit Style Infinite Reply chains */}
                <div className="pt-2 border-t border-[#ebe5dc] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2d382e] uppercase flex items-center">
                      <MessageSquareCode className="h-4 w-4 text-[#d95d39] mr-1" />
                      Live Discussion Nest
                    </span>
                    <span className="text-[10px] text-[#7c6e5a] font-mono uppercase">Infinite Depth on</span>
                  </div>

                  {/* Submission box for original root discussions */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const replyInput = form.elements.namedItem('root-comment') as HTMLInputElement;
                      if (!replyInput.value.trim()) return;
                      handleAddNewReply(activeTopic.id, null, replyInput.value);
                      replyInput.value = '';
                    }}
                    className="flex gap-2"
                  >
                    <input
                      name="root-comment"
                      type="text"
                      placeholder="Start a thread or ask a question..."
                      className="flex-1 px-3 py-2 border border-[#ebe5dc] bg-white text-xs font-sans text-[#0f1410] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#4a5c4d]"
                    />
                    <button
                      type="submit"
                      className="bg-[#2d382e] hover:bg-[#3b4b3e] text-white px-3 py-1.5 rounded-xl font-bold font-sans text-xs flex items-center space-x-1 shrink-0"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>

                  <div className="space-y-4 max-h-[440px] overflow-y-auto pr-1">
                    {(!repliesByTopic[activeTopic.id] || repliesByTopic[activeTopic.id].length === 0) ? (
                      <p className="text-xs text-[#7c6e5a] italic text-center py-6">
                        No threads started yet. Type a question above to begin cooperative lecture mapping!
                      </p>
                    ) : (
                      repliesByTopic[activeTopic.id].map((comment) => (
                        <div key={comment.id} className="space-y-1">
                          {/* Render recursively */}
                          <ReplyNode node={comment} depth={0} topicId={activeTopic.id} />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF8F5] border border-[#ebe5dc] rounded-3xl p-6 text-center text-[#7c6e5a] italic text-sm">
                Select any exam topic card on the left list grid to look at infinite nested peer discussions and compiled lecture hints in real-time.
              </div>
            )}

            {/* Submitting Anonymous hints to compiled map */}
            <div className="bg-[#fcf8f2] border border-[#dfd7cc] rounded-3xl p-6 space-y-4">
              <div>
                <span className="font-mono text-[10px] text-[#d95d39] font-bold uppercase tracking-wider block">
                  CROWDSOURCING DESK
                </span>
                <h3 className="text-sm font-serif font-[#0f1410] font-bold">
                  Submit Anonymous Hint Leak
                </h3>
                <p className="text-[11px] text-[#7c6e5a] font-sans leading-normal">
                  Heard an office review warning or noticed key blackboard highlighting in class? Add it instantly.
                </p>
              </div>

              <form onSubmit={handlePostHint} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-[#7c6e5a] uppercase">
                    Target Syllabus Entry
                  </label>
                  <select
                    id="form-target-topic"
                    value={targetTopicId}
                    onChange={(e) => setTargetTopicId(e.target.value)}
                    className="w-full p-2 bg-white border border-[#ebe5dc] rounded-xl text-xs text-[#2d382e] focus:outline-none"
                  >
                    <option value="new">+ Declare New Topic Hub</option>
                    {activeCourse.topics.map((t) => (
                      <option key={t.id} value={t.id}>
                        Append to: {t.name.substring(0, 30)}...
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submitting new topic blocks */}
                {targetTopicId === 'new' && (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono font-bold text-[#7c6e5a] uppercase">Topic Heading</label>
                      <input
                        id="form-topic-name"
                        type="text"
                        placeholder="E.g., Page Replacement Algorithms"
                        value={customTopicName}
                        onChange={(e) => setCustomTopicName(e.target.value)}
                        className="w-full p-2 border border-[#ebe5dc] bg-white text-xs rounded-xl focus:outline-none"
                        required={targetTopicId === 'new'}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-[#7c6e5a] uppercase">Syllabus Section</label>
                        <input
                          id="form-chapter-name"
                          type="text"
                          placeholder="Chapter 8"
                          value={chapterText}
                          onChange={(e) => setChapterText(e.target.value)}
                          className="w-full p-2 border border-[#ebe5dc] bg-white text-xs rounded-xl focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-mono font-bold text-[#7c6e5a] uppercase">Initial Weight</label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value as any)}
                          className="w-full p-2 border border-[#ebe5dc] bg-white text-xs rounded-xl focus:outline-none"
                        >
                          <option value="High-Yield">High-Yield</option>
                          <option value="Medium Priority">Medium</option>
                          <option value="Low/Ignored">Low/Ignored</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-[#7c6e5a] uppercase">Word-of-Mouth Clue Text</label>
                  <textarea
                    id="form-hint-text"
                    value={hintText}
                    onChange={(e) => setHintText(e.target.value)}
                    rows={3}
                    placeholder="E.g., In lecture, professor spent 3 Entire rows sketching this out... told us to expect calculations!"
                    className="w-full p-2.5 border border-[#ebe5dc] bg-white text-xs rounded-xl focus:outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  id="btn-post-hint"
                  className="w-full p-3 bg-[#d95d39] hover:bg-[#c85a17] text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer shadow shadow-[#d95d39]/10 active:scale-98 transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Map Clue onto Syllabus</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
