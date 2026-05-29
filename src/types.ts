/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExamTopic {
  id: string;
  name: string;
  chapter: string;
  description: string;
  lectureHints: string[];
  upvotes: number;
  downvotes: number;
  confidenceScore: number; // calculated as (upvotes) / (upvotes + downvotes + epsilon) * weightage etc
  category: 'High-Yield' | 'Medium Priority' | 'Low/Ignored';
  professorWiseName: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  professorName: string;
  majorTopicsCount: number;
  studentContributors: number;
  confidenceAverage: number;
  topics: ExamTopic[];
}

export interface LiveHintSubmission {
  id: string;
  courseId: string;
  topicName: string;
  hintText: string;
  chapter: string;
  timestamp: string;
}

export interface TimelineStep {
  id: number;
  phase: string;
  title: string;
  description: string;
  details: string[];
  metrics: string;
  status: 'completed' | 'in-progress' | 'roadmap';
}

export interface Testimony {
  id: string;
  name: string;
  role: string;
  major: string;
  avatarLetter: string;
  university: string;
  quote: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  illustrationType: 'anxiety' | 'time' | 'focus' | 'collaborate' | 'confidence';
}

export interface StudentProfile {
  fullName: string;
  username: string;
  bio: string;
  college: string;
  department: string;
  semester: string;
  badges: string[];
  totalUpvotesEarned: number;
  topicsContributed: number;
  avatarId: string; // avatar identifier, e.g. "avatar-owl"
  postsSubmitted: string[];
  repliesSubmitted: { text: string; topicName: string; timestamp: string }[];
  timeline: { title: string; desc: string; date: string; type: string }[];
}

export interface ThreadReply {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  authorCollege: string;
  text: string;
  timestamp: string;
  upvotes: number;
  replies: ThreadReply[]; // nested replies recursive!
}
