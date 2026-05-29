/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, TimelineStep, Testimony, Benefit } from './types';

export const INITIAL_COURSES: Course[] = [
  {
    id: 'cs-301',
    code: 'CS 301',
    name: 'Operating Systems & Kernel Architecture',
    professorName: 'Prof. Sterling Harrison',
    majorTopicsCount: 8,
    studentContributors: 148,
    confidenceAverage: 92,
    topics: [
      {
        id: 'cs-t1',
        name: 'TLB Translation & Page Table Walks',
        chapter: 'Chapter 8: Virtual Memory',
        description: 'Multi-level translation tables, page directory entries, and page faults. Prof. Harrison repeated this proof twice during week 7 and spent 40 minutes drawing memory diagrams on the board.',
        lectureHints: [
          'Prof said: "If you cannot sketch the hardware state machine of a TLB miss from memory, do not expect to pass Question 3."',
          'Emphasis on the exact bitwise math for page offsets under a 32-bit linear address space.',
          'Scribbled in TA review sheet: "Study the hardware walk walk diagrams."'
        ],
        upvotes: 84,
        downvotes: 3,
        confidenceScore: 96,
        category: 'High-Yield',
        professorWiseName: 'Harrison'
      },
      {
        id: 'cs-t2',
        name: 'Semaphore Synchronization (The Producer-Consumer Contract)',
        chapter: 'Chapter 5: Process Sync',
        description: 'Classical concurrency problems. Writing deadlock-safe semaphores. Handouts were distributed with a notice: "Highly recommended review material."',
        lectureHints: [
          'Hint given by peer: "He said this exam will have a coding portion asking us to restore safe state using semaphores."',
          'Voted up by 3 top students who pointed out that the midterm omitted process sync completely.',
          'Dr Harrison mentioned: "Many programmers fail to initialize semaphores correctly. I grade strictly on initialization."'
        ],
        upvotes: 71,
        downvotes: 5,
        confidenceScore: 92,
        category: 'High-Yield',
        professorWiseName: 'Harrison'
      },
      {
        id: 'cs-t3',
        name: 'Page Replacement Algorithms (LRU vs. FIFO)',
        chapter: 'Chapter 9: Memory Mgmt',
        description: 'Simulating page hit-miss ratios on static access sequences. Relatively straightforward computation.',
        lectureHints: [
          'Instructor noted: "Understand Belady’s anomaly on midterms, but LRU implementation is what developers should value in the real world."',
          '"Standard computational question, historically accounts for 15% of points."'
        ],
        upvotes: 45,
        downvotes: 9,
        confidenceScore: 81,
        category: 'Medium Priority',
        professorWiseName: 'Harrison'
      },
      {
        id: 'cs-t4',
        name: 'CPU Scheduling Math (Shortest Remaining Time First)',
        chapter: 'Chapter 4: Threading',
        description: 'Gantt chart rendering, calculating average waiting and turnaround times. Easily crammable.',
        lectureHints: [
          'TA stated in review: "We cover CPU sched on high school levels. Expected to be a small multi-choice block, not a long-form proof."'
        ],
        upvotes: 28,
        downvotes: 14,
        confidenceScore: 61,
        category: 'Medium Priority',
        professorWiseName: 'Harrison'
      },
      {
        id: 'cs-t5',
        name: 'RAID Levels 0, 1, 5 & Disk Geometry',
        chapter: 'Chapter 12: I/O & Storage',
        description: 'Calculating logical track layouts, block stripping. Hard theory block, low return on time.',
        lectureHints: [
          'Audit note: "Syllabus mentions RAID but Harrison skipped half of the presentation slides due to winter weather delay. Low test probability."'
        ],
        upvotes: 8,
        downvotes: 32,
        confidenceScore: 18,
        category: 'Low/Ignored',
        professorWiseName: 'Harrison'
      }
    ]
  },
  {
    id: 'chem-210',
    code: 'CHEM 210',
    name: 'Organic Chemistry II (Mechanisms & Synthesis)',
    professorName: 'Dr. Evelyn Croft',
    majorTopicsCount: 11,
    studentContributors: 210,
    confidenceAverage: 88,
    topics: [
      {
        id: 'ch-t1',
        name: 'Grignard Additions to Carbonyls (Aldehydes vs. Esters)',
        chapter: 'Chapter 17: Alcohols & Organometallics',
        description: 'Nucleophilic attacks, nucleophiles generation, tetrahedral intermediate collapses, and protonation steps. Extreme mechanism focus.',
        lectureHints: [
          'Dr. Croft said: "Mechanisms aren’t options. Drawing curved electron arrows is the language of this department. Grignard is foundational."',
          'Croft mentioned during office hours that ester dual-activation is a classic trap students fail on.',
          'Student peer hint: "She skipped ketone synthesis in lecture but spent three entire boards on esters. Plan accordingly."'
        ],
        upvotes: 112,
        downvotes: 4,
        confidenceScore: 97,
        category: 'High-Yield',
        professorWiseName: 'Croft'
      },
      {
        id: 'ch-t2',
        name: 'Aldol Condensation & Enolate Formations',
        chapter: 'Chapter 22: Carbonyl Alpha-Substitution',
        description: 'Acidic alpha-protons, deprotonation, nucleophilic addition, heat-driven dehydration to form alpha-beta-unsaturated compounds.',
        lectureHints: [
          'Peer post: "Her slides on condensation had 3 custom colored stars. She only stars content that represents high-value exam items."',
          'CROFT HINT: "Do not forget the dehydration product when heat is specified on the reaction arrow!"'
        ],
        upvotes: 94,
        downvotes: 6,
        confidenceScore: 94,
        category: 'High-Yield',
        professorWiseName: 'Croft'
      },
      {
        id: 'ch-t3',
        name: 'Fischer Esterification Steps & Proton Shuffling',
        chapter: 'Chapter 21: Carboxylic derivatives',
        description: 'Acid-catalyzed conversion. Reversible reaction dynamic. Tracking isotopic oxygen tags.',
        lectureHints: [
          'Croft note: "Thermodynamics play a huge role. Know how shifting equilibrium affects conversion efficiency."'
        ],
        upvotes: 56,
        downvotes: 12,
        confidenceScore: 79,
        category: 'Medium Priority',
        professorWiseName: 'Croft'
      },
      {
        id: 'ch-t4',
        name: '1H NMR Coupling Constant Analysis (Spin-Spin Splitting)',
        chapter: 'Chapter 14: Spectroscopy',
        description: 'Interpreting doublet of doublets, quartet couplings, and drawing chemical structures from NMR charts.',
        lectureHints: [
          'TA peer remark: "We did 4 worksheets on this. Croft loves NMR structure determination. It is usually worth 20 points in section III."'
        ],
        upvotes: 48,
        downvotes: 20,
        confidenceScore: 68,
        category: 'Medium Priority',
        professorWiseName: 'Croft'
      },
      {
        id: 'ch-t5',
        name: 'Diels-Alder Stereochemistry (Endo vs Exo Additions)',
        chapter: 'Chapter 15: Conjugated Systems',
        description: 'Symmetric orbital overlaps, thermal [4+2] cycloadditions. Highly dimensional spatial orientation.',
        lectureHints: [
          'Hint: "Croft commented that understanding transition states takes deep practice, but due to time limits, exo setups will not be tested long-form."'
        ],
        upvotes: 15,
        downvotes: 54,
        confidenceScore: 21,
        category: 'Low/Ignored',
        professorWiseName: 'Croft'
      }
    ]
  },
  {
    id: 'econ-110',
    code: 'ECON 110',
    name: 'Principles of Macroeconomic Forecasting',
    professorName: 'Prof. Julian Vance',
    majorTopicsCount: 7,
    studentContributors: 185,
    confidenceAverage: 85,
    topics: [
      {
        id: 'ec-t1',
        name: 'IS-LM Equilibrium Formulation under Closed Economy',
        chapter: 'Chapter 11: IS-LM Framework',
        description: 'Solving simultaneous economic curves. Deriving investment-savings interest impacts and money liquidity demand equations.',
        lectureHints: [
          'Prof. Vance highlighted: "Students always swap monetary expansion effects with tax rate shock shapes. Understand the shift direction."',
          'Peer insight: "The practice quiz had 2 long-form questions on IS-LM mathematical shifts under interest control. 100% test candidate."'
        ],
        upvotes: 79,
        downvotes: 2,
        confidenceScore: 97,
        category: 'High-Yield',
        professorWiseName: 'Vance'
      },
      {
        id: 'ec-t2',
        name: 'Open Market Operations & Balance Sheet Shocks',
        chapter: 'Chapter 15: Monetary Dynamics',
        description: 'Federal Reserve asset buys and sales. How government bond transactions impact commercial reserves. Flowchart layout required.',
        lectureHints: [
          'Vance emphasized: "Understand the mechanics of central bank balance sheets inside out. Do not just memorize words, track the assets."',
          'Review note: "Will ask us to fill asset/liability shift boxes in the exam booklet."'
        ],
        upvotes: 68,
        downvotes: 4,
        confidenceScore: 93,
        category: 'High-Yield',
        professorWiseName: 'Vance'
      },
      {
        id: 'ec-t3',
        name: 'Solow-Swan Steady State Growth Kinetics',
        chapter: 'Chapter 6: Long-term Growth',
        description: 'Capital stock accumulation equations, constant return thresholds, and depreciation equilibrium math. Heavy formulas.',
        lectureHints: [
          'TA notice: "The golden rule level of capital algebra is optional. Just study savings rate shocks on per-worker capital output."',
          'Vance mentioned: "Steady-state calculations represent structural macroeconomics. Expect standard questions."'
        ],
        upvotes: 42,
        downvotes: 11,
        confidenceScore: 76,
        category: 'Medium Priority',
        professorWiseName: 'Vance'
      },
      {
        id: 'ec-t4',
        name: 'Keynesian Cross Multiplier Algebra',
        chapter: 'Chapter 10: Wealth Multip.',
        description: 'Calculating marginal propensity to consume (MPC) and corresponding public tax multipliers. Standard simple algebra.',
        lectureHints: [
          'Class forum: "Very basic algebra. Only expect minor multiple choice questions or simple filling blanks."'
        ],
        upvotes: 31,
        downvotes: 19,
        confidenceScore: 59,
        category: 'Medium Priority',
        professorWiseName: 'Vance'
      },
      {
        id: 'ec-t5',
        name: 'Philips Curve Short Run vs Long Run Shocks',
        chapter: 'Chapter 18: Inflation & Unemployment',
        description: 'Supply-side structural changes, adaptive expectations. Pure graphical description, no mathematical computations.',
        lectureHints: [
          'Hint: "In week 12 recitation, TA mentioned Vance is dropping Phillips curve long-form topics to prioritize aggregate demand shifts."'
        ],
        upvotes: 9,
        downvotes: 41,
        confidenceScore: 16,
        category: 'Low/Ignored',
        professorWiseName: 'Vance'
      }
    ]
  }
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 1,
    phase: 'CHALLENGE 1',
    title: 'Scope & User Needs',
    description: 'Our team navigated real-world product challenges — from ambiguous problem framing to building a system students would actually trust. Every roadblock became a lesson.',
    details: [
      'Interviewed 420+ stressed students before finals week to identify syllabus blindspots.',
      'Discovered that 80% of study time is wasted on sections professors skipped or minimized in lecture.',
      'Refined the scope to center strictly on crowdsourced lecture cues and peer confidence validation.'
    ],
    metrics: '420+ User Interviews',
    status: 'completed'
  },
  {
    id: 2,
    phase: 'CHALLENGE 2',
    title: 'Trust for Anonymous Submissions',
    description: 'We had to design an anonymous platform where students could share classroom tips safely, preventing academic backlash while eliminating spam.',
    details: [
      'Pioneered the hashless verification token ensuring anonymity while verifying authentic student email cards.',
      'Constructed peer review parameters (upvotes/downvotes) to automatically isolate joke tips.',
      'Implemented automated algorithmic filtering to stop malicious course notes spam in real time.'
    ],
    metrics: '100% Private, Spam Resistant',
    status: 'completed'
  },
  {
    id: 3,
    phase: 'CHALLENGE 3',
    title: 'Designing the Weightage Algorithm',
    description: 'Fusing dynamic classroom factors into an objective numerical weightage score that accurately lists high-yield contents.',
    details: [
      'Programmed our "PeerScore Decay" index, giving higher weight to tips posted close to exam structures.',
      'Cross-analyzed upvoting authority based on historic accuracy of previous course contributors.',
      'Validated algorithm against historical university midterms showing a 91% exam alignment accuracy rate.'
    ],
    metrics: '91% Topic Alignment Accuracy',
    status: 'completed'
  },
  {
    id: 4,
    phase: 'MILESTONE',
    title: 'Prototype Launch',
    description: 'Releasing PrepEngine to active cohorts during rigorous exam seasons to convert anxiety into immediate academic strategy.',
    details: [
      'Beta launch across 5 universities with 1,200+ active student contributors.',
      'Over 8,400 exam hints compiled across 124 dynamic course topics.',
      'Secured supportive backing from local student tutoring cooperatives and academic study groups.'
    ],
    metrics: '1,200+ Active Cohorts',
    status: 'completed'
  }
];

export const STUDENT_BENEFITS: Benefit[] = [
  {
    id: 'b1',
    title: 'Reduce Study Anxiety',
    description: 'Convert overwhelming books into concise, peer-sorted core topics. Know exactly what to focus on under time constraints.',
    illustrationType: 'anxiety'
  },
  {
    id: 'b2',
    title: 'Save Countless Hours',
    description: 'Skip cataloging 500-page slide decks. Let the aggregated lecture clues of 150 classmates prioritize your week.',
    illustrationType: 'time'
  },
  {
    id: 'b3',
    title: 'Target High-Yield Concepts',
    description: 'Identify the exact mechanisms and code logic that your professor spent the most chalk, voice, and hours detailing dynamic concepts.',
    illustrationType: 'focus'
  },
  {
    id: 'b4',
    title: 'Collaborate Anonymously',
    description: 'Share office hour leaks and syllabus warnings with peers without fear of exposure. Cooperative high scores for all.',
    illustrationType: 'collaborate'
  },
  {
    id: 'b5',
    title: 'Prepare with Real Certainty',
    description: 'Harness a visual confidence index. See what other classmates upvote, verify, and tag as "definitely on the final".',
    illustrationType: 'confidence'
  }
];

export const TESTIMONIALS: Testimony[] = [
  {
    id: 't1',
    name: 'Maya Lin',
    role: 'Junior Engineering Major',
    major: 'Computer Science & Systems',
    avatarLetter: 'M',
    university: 'Stanford University',
    quote: 'Before PrepEngine, CS 301 felt like drinking from a firehose. Our professor was arbitrary, but of the 148 people on Earth in that room, we crowded all lecture hints. We knew virtual memory was Question 3. I saved 15 study hours and aced it.'
  },
  {
    id: 't2',
    name: 'Devon Patel',
    role: 'Pre-Med Candidate',
    major: 'Molecular Biochemistry',
    avatarLetter: 'D',
    university: 'UC Berkeley',
    quote: 'Organic Chemistry mechanisms are notoriously stressful. PrepEngine compiled Grignard and Aldol clues that the TA let slip in late review. Seeing the 97% confidence badge took away the initial night-before panic and gave me pure direction.'
  },
  {
    id: 't3',
    name: 'Chloe Chevalier',
    role: 'Finance Undergrad',
    major: 'Principles of Macroeconomics',
    avatarLetter: 'C',
    university: 'Wharton School',
    quote: 'Micro and macro syllabi are massive. But with PrepEngine, we tracked exactly which models Prof. Vance starred on the chalkboard. Highly collaborative, totally anonymous, and incredibly effective. I recommend this to everyone.'
  },
  {
    id: 't4',
    name: 'Lukas Meier',
    role: 'College Senior / Honors Student',
    major: 'Aeronautical Systems',
    avatarLetter: 'L',
    university: 'Georgia Tech',
    quote: 'We spent weeks studying RAID drive geometry, but on PrepEngine the community correctly downvoted the topic into "Low Priority" because the prof skipped it. It was 100% correct. This saved my grade point average.'
  }
];
