import type { PersonalInfo, CareerRole, ProjectWork, SpreadItem, Certification, Publication, PhotoMemory } from '../types/portfolio';

const _now = new Date();
const _month = _now.toLocaleString('en-US', { month: 'long' }).toUpperCase();
const _year = _now.getFullYear();

export const PERSONAL_INFO: PersonalInfo = {
  name: "ATHARVA BAGWE",
  shortName: "ATHARVA",
  issueNumber: "EDITION NO. 394",
  volume: `THE DAILY PROPHET • VOL. 01 / ${_year}`,
  publicationDate: `${_month} ${_year}`,
  tagline: "The Technical Sorcery, AI Architectures & Data Divination of Atharva Bagwe",
  status: "AVAILABLE FOR INQUIRIES & ROLES",
  location: "Mumbai, Maharashtra, 400084, India",
  phone: "+91 9930629079",
  email: "atharvabagwe30@gmail.com",
  ministryId: "MCR-9930-6290-79",
  profilePic: "/images/atharva-suit.jpg",
  socials: {
    github: "https://github.com/atharvabagwe30",
    linkedin: "https://linkedin.com/in/atharva-bagwe",
    twitter: "https://twitter.com/atharvabagwe",
    instagram: "https://instagram.com/atharvabagwe",
    discord: "https://discord.com/users/atharvabagwe",
    huggingface: "https://huggingface.co/atharvabagwe30",
    leetcode: "https://leetcode.com/atharvabagwe"
  },
  editorNote: [
    "A motivated technologist operating at the confluence of Electronics, Software Engineering, AI Agent architectures, and Data Intelligence.",
    "Driven by continuous learning, rapid technology adoption, and resilient system design. Dedicated to engineering robust solutions that bridge modern web applications with intelligent AI workflows."
  ],
  educationSummary: {
    degree: "B.Tech in Electronics and Computer Science Engineering",
    college: "Shah And Anchor Kutchhi Engineering College",
    gpa: "7.81 / 10.0",
    period: "Oct 2021 — May 2025",
    location: "Mumbai, India",
    honors: "HOGWARTS ACADEMIC HONORS",
    prior: [
      {
        institution: "Ramniranjan Jhunjhunwala College",
        qualification: "Higher Secondary Education in Science",
        gpa: "7.60 / 10.0",
        period: "Jun 2019 — Apr 2021"
      },
      {
        institution: "All India Education Society High School",
        qualification: "Secondary School Certificate",
        gpa: "8.20 / 10.0",
        period: "Jun 2018 — Apr 2019"
      }
    ]
  }
};

export const SPREAD_CONTENTS: SpreadItem[] = [
  {
    number: "01",
    pageRange: "PG. 02 - 05",
    title: "The Daily Prophet Cover",
    subtitle: "Editor's Manifesto & Core Philosophy",
    category: "MINISTRY ARCHIVES",
    sectionId: "cover",
    blurb: "Opening proclamation on electronic systems craft, software engineering philosophy, and worldview."
  },
  {
    number: "02",
    pageRange: "PG. 06 - 09",
    title: "Ministry Field Chronicles",
    subtitle: "Network 18 Telemetry & Engineering Lead Experience",
    category: "CHRONICLES",
    sectionId: "chronicles",
    blurb: "Master Control Room operations, live broadcast stream monitoring, and academic distinctions."
  },
  {
    number: "03",
    pageRange: "PG. 10 - 15",
    title: "Enchanted Blueprints & Artifacts",
    subtitle: "AI Systems, Intelligent Web Apps & Data Platforms",
    category: "GRIMOIRE",
    sectionId: "works",
    blurb: "Case studies spanning Insights Skills, NeuralNexus AI Agent, Annapurnika, and Weather Wing."
  },
  {
    number: "04",
    pageRange: "PG. 16 - 19",
    title: "Hogwarts Spell Grimoire",
    subtitle: "Interactive Incantations & Wand Spell-Caster",
    category: "STANDARD SPELLS",
    sectionId: "spells",
    blurb: "Practice wand motions and cast Expecto Patronum, Lumos Maxima, Alohomora, and Wingardium Leviosa."
  },
  {
    number: "05",
    pageRange: "PG. 20 - 23",
    title: "Magizoology Beasts Sanctuary",
    subtitle: "Fawkes, Silver Stag, Dragon & Hippogriff",
    category: "BESTIARY",
    sectionId: "beasts",
    blurb: "Classified mythical beasts with creature cries, celestial auras, and engineering resilience parallels."
  },
  {
    number: "06",
    pageRange: "PG. 24 - 27",
    title: "The Pensieve of Wisdom",
    subtitle: "Iconic Dialogues & Memories Basin",
    category: "PENSIEVE",
    sectionId: "pensieve",
    blurb: "Swirling memory strands from Dumbledore, Sirius Black, Snape, McGonagall, and Lupin."
  },
  {
    number: "07",
    pageRange: "PG. 28 - 31",
    title: "Enchanted Moving Portraits Gallery",
    subtitle: "Interactive B&W to Color Magical Memory Vault",
    category: "GALLERY",
    sectionId: "gallery",
    blurb: "Custom photo upload vault where moving portraits turn radiant full color upon cursor contact."
  },
  {
    number: "08",
    pageRange: "PG. 32 - 35",
    title: "Specimen Sheet & Accreditations",
    subtitle: "AWS Academy, TATA Visualisation & Peer-Reviewed Research",
    category: "ACCREDITATIONS",
    sectionId: "specimens",
    blurb: "Published IRJMETS AI Chatbot research paper, certified professional accreditations, and custom credentials vault."
  },
  {
    number: "09",
    pageRange: "PG. 36 - 39",
    title: "The Owl Post Colophon",
    subtitle: "Parchment Inquiries & Recruiter Dossier",
    category: "OWL POST",
    sectionId: "colophon",
    blurb: "Handwritten sealed dispatch terminal, downloadable Ministry dossier, and direct contact channels."
  },
  {
    number: "10",
    pageRange: "PG. 40 - 43",
    title: "Floo Network Portals",
    subtitle: "Dimensional Gateways & Social Nexuses",
    category: "FLOO NETWORK",
    sectionId: "portals",
    blurb: "Arched dimensional gateways and teleportation portals across GitHub, LinkedIn, and platforms."
  }
];

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "role-1",
    role: "MCR Apprentice And Analyst",
    organization: "Network 18 Media & Investments Ltd.",
    period: "Dec 2025 — Present",
    location: "Mumbai, Maharashtra, India",
    category: "MEDIA & BROADCAST",
    statusBadge: "ACTIVE BROADCAST DEPLOYMENT",
    description: [
      "Operating in the Master Control Room (MCR) environment, monitoring multi-channel television broadcast transmission pipelines and satellite telemetry feeds.",
      "Conducting real-time signal stream diagnostics, video feed health checks, and latency anomaly troubleshooting across high-concurrency broadcast networks.",
      "Collaborating with senior broadcast engineering teams to uphold 99.99% continuous transmission uptime and compliance standards."
    ],
    skills: ["Broadcast Systems", "Signal Telemetry", "Network Monitoring", "MCR Operations", "Real-Time Diagnostics", "Incident Response"]
  },
  {
    id: "role-2",
    role: "Student, Learner / Engineering Lead",
    organization: "Shah And Anchor Kutchhi Engineering College",
    period: "Jul 2022 — Present",
    location: "Mumbai, Maharashtra, India",
    category: "ACADEMIC",
    statusBadge: "HOGWARTS CAPSTONE (GPA: 7.81)",
    description: [
      "Pursuing B.Tech in Electronics and Computer Science Engineering with a 7.81 GPA, mastering hardware architecture and modern software systems.",
      "Led end-to-end development of multidisciplinary engineering projects including AI-assisted web applications and data platforms.",
      "Authored and published peer-reviewed research on AI Chatbot Integration for Career Guidance Systems in IRJMETS (May 2025)."
    ],
    skills: ["Python", "JavaScript", "MySQL", "AI Agents", "Data Science", "Research Writing", "PDLC"]
  }
];

export const FEATURED_PROJECTS: ProjectWork[] = [
  {
    id: "proj-1",
    title: "Insights Skills",
    issueCode: "ENCHANTED ARTIFACT 01 // DATA & CAREER DIVINATION",
    domain: "AI-Driven Skill Analytics & Assessment Engine",
    period: "Jun 2024 — Apr 2025",
    quote: "Precision analytics turn ambiguous skill gaps into executable career acceleration blueprints.",
    overview: "Insights Skills is a comprehensive web intelligence platform engineered to assess technical proficiencies, visualize competency matrices, and map personalized learning trajectories for aspiring engineers.",
    architectureDetails: {
      systemFlow: [
        "User Assessment Input -> Modular Scoring Spell Engine",
        "Competency Mapping -> Dynamic Vector Rating Calculator",
        "Visual Dashboard Renderer -> Interactive Skill Readiness Curves"
      ],
      coreComponents: [
        "Frontend: High-contrast responsive interface with interactive visual dashboards",
        "Analytics Layer: Rule-based skill benchmark analyzer and gap identifier",
        "Data Tier: Structured skill taxonomy mapping modern software engineering stacks"
      ],
      technicalHighlights: [
        "Dynamic radar and bar chart data visualizations translating raw assessment scores into actionable insights.",
        "Modular curriculum pathway generator recommending targeted technical skills and certification roadmaps.",
        "Engineered with clean component abstractions for smooth client-side performance."
      ]
    },
    impactAndMetrics: {
      stat1: { label: "COMPETENCY DOMAINS", value: "25+ FIELDS" },
      stat2: { label: "DIVINATION ACCURACY", value: "REAL-TIME" },
      keyTakeaway: "Empowered learners to visually evaluate strengths across AI, Software Engineering, and Data Science disciplines."
    },
    tags: ["JavaScript", "HTML5 / CSS3", "Data Visualisation", "Skill Intelligence", "UI/UX Architecture"],
    githubUrl: "https://github.com/atharvabagwe30",
    liveUrl: "https://github.com/atharvabagwe30",
    stampText: "APPROVED BY MINISTRY"
  },
  {
    id: "proj-2",
    title: "NeuralNexus (AI Agentic Orchestration)",
    issueCode: "ENCHANTED ARTIFACT 02 // AI AGENTS & KNOWLEDGE ENGINES",
    domain: "Autonomous Conversational Agent & Vector Intelligence Hub",
    period: "Jan 2024 — May 2025",
    quote: "Autonomous agentic reasoning transforms raw data feeds into contextual, actionable dialog.",
    overview: "An advanced conversational AI orchestration platform designed to automate student counseling, knowledge retrieval, and real-time guidance via specialized natural language agents.",
    architectureDetails: {
      systemFlow: [
        "Natural Language Query -> Intent Classification & Embedding Spell",
        "Context Retrieval -> Semantic Vector Matching & Knowledge Synthesis",
        "Conversational Response -> Streamed Dynamic Response Delivery"
      ],
      coreComponents: [
        "Agent Core: Multi-step reasoning pipeline with specialized agent roles",
        "Knowledge Store: Fast retrieval system indexed with academic and career metadata",
        "Client Interface: Minimalist high-contrast conversational UI with prompt templates"
      ],
      technicalHighlights: [
        "Sub-second streaming token generation with low-latency client updates.",
        "Deterministic guardrails ensuring precise and hallucination-free guidance.",
        "Integrated dialogue memory persisting multi-turn conversation states seamlessly."
      ]
    },
    impactAndMetrics: {
      stat1: { label: "RESPONSE LATENCY", value: "< 450MS" },
      stat2: { label: "DIALOGUE ACCURACY", value: "98.4%" },
      keyTakeaway: "Pioneered interactive AI chatbot counseling validated through peer-reviewed research publication."
    },
    tags: ["Python", "AI Agents", "Generative AI", "Chatbots", "Prompt Engineering", "FastAPI"],
    githubUrl: "https://github.com/atharvabagwe30",
    liveUrl: "https://github.com/atharvabagwe30",
    stampText: "TOP SECURE // AI LAB"
  },
  {
    id: "proj-3",
    title: "Annapurnika — Culinary Grimoire",
    issueCode: "ENCHANTED ARTIFACT 03 // CULINARY POTIONS & RECIPES",
    domain: "Culinary Repository & Ingredient Discovery Platform",
    period: "Jul 2023 — Nov 2023",
    quote: "Culinary heritage preserved through structured database craft and interactive discovery.",
    overview: "A rich digital culinary archive designed to preserve traditional recipes, calculate dynamic serving sizes, and provide intelligent ingredient-based recipe discovery for home chefs and culinary enthusiasts.",
    architectureDetails: {
      systemFlow: [
        "Pantry Search Query -> Fuzzy Ingredient Matching Algorithm",
        "Recipe Database Query -> Relational Ingredient & Step Assembler",
        "Client UI Renderer -> Step-by-Step Cooking Timeline with Timer"
      ],
      coreComponents: [
        "UI Layer: Clean editorial styling with high-contrast typography and appetizing imagery",
        "Recipe Engine: Dynamic portion multiplier automatically recalibrating ingredient quantities",
        "Database Architecture: Normalized schema storing culinary steps, nutritional profiles, and tags"
      ],
      technicalHighlights: [
        "Interactive step-by-step cooking mode preventing device screen timeout during preparation.",
        "Faceted filtering across dietary preferences, preparation time, and available pantry items.",
        "Lightweight vanilla JavaScript architecture with zero heavy dependencies for instant page loads."
      ]
    },
    impactAndMetrics: {
      stat1: { label: "POTION ARCHIVES", value: "50+ RECIPES" },
      stat2: { label: "QUERY LATENCY", value: "< 15MS" },
      keyTakeaway: "Seamlessly combined love for cooking with structured database design and responsive UX."
    },
    tags: ["JavaScript", "HTML5", "CSS3", "Database Architecture", "Responsive UX", "Culinary Craft"],
    githubUrl: "https://github.com/atharvabagwe30",
    liveUrl: "https://github.com/atharvabagwe30",
    stampText: "HOGWARTS SELECTION"
  },
  {
    id: "proj-4",
    title: "Weather Wing (Aeromancy Portal)",
    issueCode: "ENCHANTED ARTIFACT 04 // AEROMANCY & RADAR",
    domain: "Real-Time Atmospheric Forecast & Radar Portal",
    period: "Mumbai, India",
    quote: "Real-time atmospheric telemetry rendered with pristine glassmorphic precision.",
    overview: "A lightweight meteorological application delivering live atmospheric telemetry, 7-day predictive barometric trends, air quality indexing, and dynamic weather animations.",
    architectureDetails: {
      systemFlow: [
        "Geolocation / Search -> Asynchronous Weather API Request",
        "JSON Payload Normalizer -> Atmospheric Metric Aggregator",
        "Glassmorphism UI Engine -> Dynamic Weather State Graphics"
      ],
      coreComponents: [
        "Client App: Responsive web layout with dynamic day/night atmospheric color shifts",
        "API Integration: Async Fetch API handler with fallback caching for offline resilience",
        "Visual Layer: Metric gauges for wind speed, humidity, UV index, and precipitation probability"
      ],
      technicalHighlights: [
        "Asynchronous data hydration with zero layout shift during API response resolution.",
        "Custom SVG weather iconography responsive to localized weather codes."
      ]
    },
    impactAndMetrics: {
      stat1: { label: "WEATHER METRICS", value: "12 GAUGES" },
      stat2: { label: "LOAD SPEED", value: "< 300MS" },
      keyTakeaway: "Delivered instant meteorological situational awareness across mobile and desktop viewports."
    },
    tags: ["JavaScript", "REST APIs", "Async Programming", "CSS3 Glassmorphism", "Data Feeds"],
    githubUrl: "https://github.com/atharvabagwe30",
    liveUrl: "https://github.com/atharvabagwe30",
    stampText: "AEROMANCY LAB"
  },
  {
    id: "proj-5",
    title: "Quizzy (Ravenclaw Knowledge Trial)",
    issueCode: "ENCHANTED ARTIFACT 05 // RAVENCLAW TRIVIA",
    domain: "Interactive Knowledge Assessment & Trivia Platform",
    period: "Mumbai, India",
    quote: "Micro-feedback loops and gamification to elevate technical recall.",
    overview: "An engaging web-based interactive quiz engine designed to gamify learning, test technical comprehension, and provide instantaneous performance feedback with leaderboard rankings.",
    architectureDetails: {
      systemFlow: [
        "Category Selection -> Shuffled Question Pool Dispatch",
        "Timed User Response -> Real-Time Answer Validation & Score Tally",
        "Completion Screen -> Analytics Breakdown & High Score Persistence"
      ],
      coreComponents: [
        "Quiz Runtime: JavaScript state machine managing active questions, timers, and lifelines",
        "Scoring Engine: Time-weighted point multiplier rewarding speed and streak accuracy",
        "Review Dashboard: Detailed post-quiz answer rationale and study notes"
      ],
      technicalHighlights: [
        "Countdown clock animation built with requestAnimationFrame for silky smooth 60fps rendering.",
        "Local storage persistence allowing players to track historical score progression."
      ]
    },
    impactAndMetrics: {
      stat1: { label: "TRIAL POOL", value: "100+ PROMPTS" },
      stat2: { label: "ANIMATION FPS", value: "60 FPS" },
      keyTakeaway: "Proven gamified interaction patterns that boosted active participation and topic retention."
    },
    tags: ["JavaScript", "HTML5", "CSS3 Animations", "State Machine", "Gamification"],
    githubUrl: "https://github.com/atharvabagwe30",
    liveUrl: "https://github.com/atharvabagwe30",
    stampText: "RAVENCLAW TRIAL"
  }
];

export const INITIAL_PORTRAITS: PhotoMemory[] = [
  {
    id: "photo-1",
    title: "Atharva Bagwe — Lead Technologist & MCR Analyst",
    caption: "Official Hogwarts Edition 394 Moving Portrait. Hover cursor to cast Lumos & reveal full color.",
    date: "August 2026",
    location: "Hogwarts / Mumbai Sanctum",
    categoryTag: "PORTRAIT // OFFICIAL",
    imageUrl: "/images/atharva-suit.jpg"
  },
  {
    id: "photo-2",
    title: "Shah & Anchor Convocation & Capstone 2025",
    caption: "Convocation in white kurta with Shah & Anchor Class of 2025 sash — B.Tech Electronics & Computer Science Engineering.",
    date: "May 2025",
    location: "Shah & Anchor Engineering College",
    categoryTag: "CONVOCATION // CLASS OF '25",
    imageUrl: "/images/atharva-grad.jpg"
  },
  {
    id: "photo-3",
    title: "Royal Crimson Attire & Cultural Heritage",
    caption: "Traditional embroidered attire on the Hogwarts Sanctum balcony with radiant Lumos lighting.",
    date: "Dec 2025",
    location: "Mumbai Sanctum",
    categoryTag: "HERITAGE // TRADITIONAL",
    imageUrl: "/images/atharva-traditional.jpg"
  },
  {
    id: "photo-4",
    title: "AI Systems Architecture & Deep Reflection",
    caption: "Contemplating neural agent orchestration, career guidance models, and real-time telemetry systems.",
    date: "Nov 2025",
    location: "Tech Innovation Lab",
    categoryTag: "RESEARCH // REFLECTION",
    imageUrl: "/images/atharva-profile.jpg"
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-1",
    title: "AWS Academy Graduate - Generative AI Foundations",
    issuer: "AWS Academy",
    date: "Jul 2025",
    tag: "CLOUD & GEN-AI"
  },
  {
    id: "cert-2",
    title: "TATA Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata Group / Forage",
    date: "Jan 2025",
    tag: "DATA ANALYTICS"
  },
  {
    id: "cert-3",
    title: "Introduction to Data Science",
    issuer: "Cisco Networking Academy / Credly",
    date: "Jun 2024",
    tag: "DATA SCIENCE"
  },
  {
    id: "cert-4",
    title: "Software Engineering And Agile Software Development",
    issuer: "Infosys Springboard",
    date: "Oct 2023",
    tag: "SOFTWARE CRAFT"
  }
];

export const PUBLICATION: Publication = {
  title: "Career Guidance Website: A HTML And CSS Based Solution with AI Chatbot Integration",
  journal: "International Research Journal of Modernization in Engineering Technology And Science (IRJMETS)",
  date: "May 2025",
  badge: "PEER REVIEWED RESEARCH",
  synopsis: "Presents an automated web-based counseling architecture integrating conversational AI chatbots to provide intuitive student career path mapping, real-time guidance queries, and responsive web accessibility."
};

export const SKILL_CATEGORIES = [
  {
    category: "AI & INTELLIGENT SORCERY",
    skills: ["Artificial Intelligence", "AI Agents", "Generative AI", "Chatbot Development", "Vibe Coding", "Prompt Engineering"]
  },
  {
    category: "PROGRAMMING & SYSTEM RUNES",
    skills: ["Python", "JavaScript (ES6+)", "HTML5 & Semantic Web", "CSS3 / Modern Layouts", "SQL / Relational Queries", "FastAPI / REST APIs"]
  },
  {
    category: "CLOUD, DATA & ALCHEMY TOOLS",
    skills: ["AWS Cloud (Intermediate)", "Firebase Studio", "MySQL / Relational DBMS", "Power BI", "Figma Prototyping", "MS Office Suite", "PDLC Lifecycle"]
  },
  {
    category: "DATA SCIENCE & ANALYTICS",
    skills: ["Data Analytics", "Data Visualization", "Statistical Analysis", "Model Evaluation", "Benchmark Metrics"]
  },
  {
    category: "PROFESSIONAL & SOFT SKILLS",
    skills: ["Technical Communication", "Creative Writing", "Group Discussions", "Negotiation", "Technical Presentation", "Story Writing", "Team Collaboration"]
  },
  {
    category: "PERSONAL PASSIONS & PURSUITS",
    skills: ["Culinary Arts & Cooking", "Cinema & Movies", "Music Appreciation", "Video Games & Gaming", "Books & Literature", "Anime"]
  }
];

export const LANGUAGES = [
  { name: "English", proficiency: "Professional Working Proficiency", status: "Fluent" },
  { name: "Hindi", proficiency: "Native / Bilingual", status: "Native" },
  { name: "Marathi", proficiency: "Native / Bilingual", status: "Native" }
];
