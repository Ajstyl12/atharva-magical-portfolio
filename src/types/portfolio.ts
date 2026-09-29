export interface PriorEducation {
  institution: string;
  qualification: string;
  gpa: string;
  period: string;
}

export interface EducationSummary {
  degree: string;
  college: string;
  gpa: string;
  period: string;
  location: string;
  honors: string;
  prior: PriorEducation[];
}

export interface PersonalInfo {
  name: string;
  shortName: string;
  issueNumber: string;
  volume: string;
  publicationDate: string;
  tagline: string;
  status: string;
  location: string;
  phone: string;
  email: string;
  ministryId: string;
  profilePic?: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    discord?: string;
    huggingface?: string;
    leetcode?: string;
  };
  editorNote: string[];
  educationSummary: EducationSummary;
}

export interface CareerRole {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  category: 'ALL' | 'MEDIA & BROADCAST' | 'ACADEMIC' | string;
  statusBadge: string;
  description: string[];
  skills: string[];
}

export interface ProjectWork {
  id: string;
  title: string;
  issueCode: string;
  domain: string;
  period: string;
  quote: string;
  overview: string;
  architectureDetails: {
    systemFlow: string[];
    coreComponents: string[];
    technicalHighlights: string[];
  };
  impactAndMetrics: {
    stat1: { label: string; value: string };
    stat2: { label: string; value: string };
    keyTakeaway: string;
  };
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  stampText: string;
}

export interface PhotoMemory {
  id: string;
  title: string;
  caption: string;
  date: string;
  location: string;
  categoryTag: string;
  imageUrl: string;
  isCustom?: boolean;
}

export interface SpreadItem {
  number: string;
  pageRange: string;
  title: string;
  subtitle: string;
  category: string;
  sectionId: string;
  blurb: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  tag: string;
  certificateUrl?: string;
  fileData?: string;
}

export interface Publication {
  title: string;
  journal: string;
  date: string;
  doi?: string;
  synopsis: string;
  badge: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Language {
  name: string;
  proficiency: string;
  status: string;
}
