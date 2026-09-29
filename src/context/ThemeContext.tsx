import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFx } from '../utils/audioEffects';
import {
  PERSONAL_INFO as DEFAULT_PERSONAL_INFO,
  CAREER_ROLES as DEFAULT_CAREER_ROLES,
  FEATURED_PROJECTS as DEFAULT_PROJECTS,
  CERTIFICATIONS as DEFAULT_CERTIFICATIONS,
  INITIAL_PORTRAITS as DEFAULT_PORTRAITS,
  SKILL_CATEGORIES as DEFAULT_SKILLS,
  PUBLICATION as DEFAULT_PUBLICATION,
  LANGUAGES as DEFAULT_LANGUAGES
} from '../data/portfolioData';
import type {
  PersonalInfo,
  CareerRole,
  ProjectWork,
  Certification,
  PhotoMemory,
  SkillCategory,
  Publication,
  Language
} from '../types/portfolio';

export type ThemeMode = 'nox' | 'lumos';
export type HouseTheme = 'gryffindor' | 'ravenclaw' | 'slytherin' | 'hufflepuff';

export interface HouseColorTokens {
  name: string;
  badge: string;
  primary: string;
  secondary: string;
  accent: string;
  border: string;
  cardBg: string;
  glow: string;
  textHighlight: string;
  gradient: string;
}

interface WizardThemeContextType {
  // Theme & Appearance
  themeMode: ThemeMode;
  houseTheme: HouseTheme;
  toggleLumosNox: () => void;
  setHouse: (house: HouseTheme) => void;
  getHouseColor: () => HouseColorTokens;
  scrollAnimationsEnabled: boolean;
  toggleScrollAnimations: () => void;
  bgMusicEnabled: boolean;
  toggleBgMusic: () => void;

  // Settings Modal State
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;

  // Personal Information
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  resetPersonalInfo: () => void;

  // Career Roles
  careerRoles: CareerRole[];
  addCareerRole: (role: Omit<CareerRole, 'id'>) => void;
  updateCareerRole: (id: string, role: Partial<CareerRole>) => void;
  deleteCareerRole: (id: string) => void;
  resetCareerRoles: () => void;

  // Projects
  projects: ProjectWork[];
  addProject: (project: Omit<ProjectWork, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectWork>) => void;
  deleteProject: (id: string) => void;
  resetProjects: () => void;

  // Certifications / Accreditations
  certificates: Certification[];
  addCertificate: (cert: Omit<Certification, 'id'>) => void;
  updateCertificate: (id: string, cert: Partial<Certification>) => void;
  removeCertificate: (id: string) => void;
  resetCertificates: () => void;
  isUploaderOpen: boolean;
  setIsUploaderOpen: (open: boolean) => void;

  // Photos & Memories
  photos: PhotoMemory[];
  addPhoto: (photo: Omit<PhotoMemory, 'id'>) => void;
  updatePhoto: (id: string, photo: Partial<PhotoMemory>) => void;
  removePhoto: (id: string) => void;
  resetPhotos: () => void;
  isPhotoUploaderOpen: boolean;
  setIsPhotoUploaderOpen: (open: boolean) => void;

  // Skills & Passions
  skillCategories: SkillCategory[];
  updateSkillCategories: (categories: SkillCategory[]) => void;
  addSkillCategory: (cat: SkillCategory) => void;
  deleteSkillCategory: (index: number) => void;
  resetSkills: () => void;

  // Publication
  publication: Publication;
  updatePublication: (pub: Partial<Publication>) => void;
  resetPublication: () => void;

  // Languages
  languages: Language[];
  updateLanguages: (langs: Language[]) => void;
  resetLanguages: () => void;

  // Global Management
  resetAllToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const WizardThemeContext = createContext<WizardThemeContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEY_PERSONAL = 'wizarding_portfolio_personal_v3';
const STORAGE_KEY_ROLES = 'wizarding_portfolio_roles_v3';
const STORAGE_KEY_PROJECTS = 'wizarding_portfolio_projects_v3';
const STORAGE_KEY_CERTS = 'wizarding_portfolio_certificates_v3';
const STORAGE_KEY_PHOTOS = 'wizarding_portfolio_photos_v4';
const STORAGE_KEY_SKILLS = 'wizarding_portfolio_skills_v3';
const STORAGE_KEY_PUB = 'wizarding_portfolio_pub_v3';
const STORAGE_KEY_LANGS = 'wizarding_portfolio_langs_v3';
const STORAGE_KEY_HOUSE = 'wizarding_portfolio_house_v3';
const STORAGE_KEY_MODE = 'wizarding_portfolio_mode_v3';
const STORAGE_KEY_SCROLL_ANIM = 'wizarding_portfolio_scroll_anim_v3';
const STORAGE_KEY_BG_MUSIC = 'wizarding_portfolio_bg_music_v3';

export const WizardThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Appearance States
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MODE);
      return (saved === 'lumos' || saved === 'nox') ? saved : 'nox';
    } catch {
      return 'nox';
    }
  });

  const [houseTheme, setHouseTheme] = useState<HouseTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HOUSE);
      return (saved === 'gryffindor' || saved === 'ravenclaw' || saved === 'slytherin' || saved === 'hufflepuff')
        ? saved
        : 'gryffindor';
    } catch {
      return 'gryffindor';
    }
  });

  const [scrollAnimationsEnabled, setScrollAnimationsEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SCROLL_ANIM);
      return saved !== 'false';
    } catch {
      return true;
    }
  });

  const [bgMusicEnabled, setBgMusicEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BG_MUSIC);
      return saved !== 'false';
    } catch {
      return true;
    }
  });

  // Modal Open States
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState<boolean>(false);
  const [isPhotoUploaderOpen, setIsPhotoUploaderOpen] = useState<boolean>(false);

  // ── Helper: compute current month/year fields (always fresh) ────────
  const _computeDateFields = (): Pick<PersonalInfo, 'publicationDate' | 'volume'> => {
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'long' }).toUpperCase();
    const year = now.getFullYear();
    return {
      publicationDate: `${month} ${year}`,
      volume: `THE DAILY PROPHET • VOL. 01 / ${year}`,
    };
  };

  // Dynamic Portfolio Data States
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PERSONAL);
      if (saved) {
        const parsed = JSON.parse(saved) as PersonalInfo;
        // Always override date-dependent fields with fresh values
        return { ...parsed, ..._computeDateFields() };
      }
    } catch {
      // fallback
    }
    return DEFAULT_PERSONAL_INFO;
  });

  const [careerRoles, setCareerRoles] = useState<CareerRole[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ROLES);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CAREER_ROLES;
  });

  const [projects, setProjects] = useState<ProjectWork[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PROJECTS;
  });

  const [certificates, setCertificates] = useState<Certification[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CERTS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CERTIFICATIONS;
  });

  const [photos, setPhotos] = useState<PhotoMemory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PHOTOS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PORTRAITS;
  });

  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SKILLS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_SKILLS;
  });

  const [publication, setPublication] = useState<Publication>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PUB);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_PUBLICATION;
  });

  const [languages, setLanguages] = useState<Language[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_LANGUAGES;
  });

  // LocalStorage Persist Handlers
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY_MODE, themeMode); } catch { /* ignore */ }
    try { localStorage.setItem(STORAGE_KEY_HOUSE, houseTheme); } catch { /* ignore */ }

    const root = document.documentElement;
    const body = document.body;

    body.classList.remove('theme-nox', 'theme-lumos');
    body.classList.add(`theme-${themeMode}`);

    body.classList.remove('house-gryffindor', 'house-ravenclaw', 'house-slytherin', 'house-hufflepuff');
    body.classList.add(`house-${houseTheme}`);

    const houseTokens = getHouseColor();
    root.style.setProperty('--house-primary', houseTokens.primary);
    root.style.setProperty('--house-secondary', houseTokens.secondary);
    root.style.setProperty('--house-accent', houseTokens.accent);
    root.style.setProperty('--house-border', houseTokens.border);
    root.style.setProperty('--house-glow', houseTokens.glow);
    root.style.setProperty('--house-card-bg', houseTokens.cardBg);
    root.style.setProperty('--house-text-highlight', houseTokens.textHighlight);
  }, [themeMode, houseTheme]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY_PERSONAL, JSON.stringify(personalInfo)); } catch { /* ignore */ }
  }, [personalInfo]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY_ROLES, JSON.stringify(careerRoles)); } catch { /* ignore */ }
  }, [careerRoles]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects)); } catch { /* ignore */ }
  }, [projects]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY_CERTS, JSON.stringify(certificates)); } catch { /* ignore */ }
  }, [certificates]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY_PHOTOS, JSON.stringify(photos)); } catch { /* ignore */ }
  }, [photos]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY_SKILLS, JSON.stringify(skillCategories)); } catch { /* ignore */ }
  }, [skillCategories]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY_PUB, JSON.stringify(publication)); } catch { /* ignore */ }
  }, [publication]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY_LANGS, JSON.stringify(languages)); } catch { /* ignore */ }
  }, [languages]);

  // Actions
  const toggleLumosNox = () => {
    const nextMode = themeMode === 'nox' ? 'lumos' : 'nox';
    if (nextMode === 'lumos') {
      soundFx.playLumos();
    } else {
      soundFx.playNox();
    }
    setThemeMode(nextMode);
  };

  const setHouse = (house: HouseTheme) => {
    soundFx.playWandCast();
    setHouseTheme(house);
  };

  const toggleScrollAnimations = () => {
    setScrollAnimationsEnabled(prev => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEY_SCROLL_ANIM, String(next)); } catch { /* ignore */ }
      return next;
    });
  };

  const toggleBgMusic = () => {
    setBgMusicEnabled(prev => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEY_BG_MUSIC, String(next)); } catch { /* ignore */ }
      return next;
    });
  };

  // Personal Info Methods
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    soundFx.playStamp();
    setPersonalInfo(prev => ({
      ...prev,
      ...info,
      socials: { ...prev.socials, ...(info.socials || {}) },
      educationSummary: {
        ...prev.educationSummary,
        ...(info.educationSummary || {}),
        prior: info.educationSummary?.prior || prev.educationSummary.prior
      }
    }));
  };

  const resetPersonalInfo = () => {
    soundFx.playWandCast();
    setPersonalInfo(DEFAULT_PERSONAL_INFO);
  };

  // Career Roles Methods
  const addCareerRole = (role: Omit<CareerRole, 'id'>) => {
    soundFx.playStamp();
    const newRole: CareerRole = {
      ...role,
      id: `role-custom-${Date.now()}`
    };
    setCareerRoles(prev => [newRole, ...prev]);
  };

  const updateCareerRole = (id: string, role: Partial<CareerRole>) => {
    soundFx.playStamp();
    setCareerRoles(prev => prev.map(r => r.id === id ? { ...r, ...role } : r));
  };

  const deleteCareerRole = (id: string) => {
    soundFx.playWandCast();
    setCareerRoles(prev => prev.filter(r => r.id !== id));
  };

  const resetCareerRoles = () => {
    soundFx.playWandCast();
    setCareerRoles(DEFAULT_CAREER_ROLES);
  };

  // Projects Methods
  const addProject = (project: Omit<ProjectWork, 'id'>) => {
    soundFx.playStamp();
    const newProj: ProjectWork = {
      ...project,
      id: `proj-custom-${Date.now()}`
    };
    setProjects(prev => [newProj, ...prev]);
  };

  const updateProject = (id: string, project: Partial<ProjectWork>) => {
    soundFx.playStamp();
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...project } : p));
  };

  const deleteProject = (id: string) => {
    soundFx.playWandCast();
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const resetProjects = () => {
    soundFx.playWandCast();
    setProjects(DEFAULT_PROJECTS);
  };

  // Certifications Methods
  const addCertificate = (newCert: Omit<Certification, 'id'>) => {
    soundFx.playStamp();
    const cert: Certification = {
      ...newCert,
      id: `cert-custom-${Date.now()}`
    };
    setCertificates(prev => [cert, ...prev]);
  };

  const updateCertificate = (id: string, cert: Partial<Certification>) => {
    soundFx.playStamp();
    setCertificates(prev => prev.map(c => c.id === id ? { ...c, ...cert } : c));
  };

  const removeCertificate = (id: string) => {
    soundFx.playWandCast();
    setCertificates(prev => prev.filter(c => c.id !== id));
  };

  const resetCertificates = () => {
    soundFx.playWandCast();
    setCertificates(DEFAULT_CERTIFICATIONS);
  };

  // Photos Methods
  const addPhoto = (newPhoto: Omit<PhotoMemory, 'id'>) => {
    soundFx.playStamp();
    const photo: PhotoMemory = {
      ...newPhoto,
      id: `photo-custom-${Date.now()}`,
      isCustom: true
    };
    setPhotos(prev => [photo, ...prev]);
  };

  const updatePhoto = (id: string, photo: Partial<PhotoMemory>) => {
    soundFx.playStamp();
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, ...photo } : p));
  };

  const removePhoto = (id: string) => {
    soundFx.playWandCast();
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const resetPhotos = () => {
    soundFx.playWandCast();
    setPhotos(DEFAULT_PORTRAITS);
  };

  // Skills Methods
  const updateSkillCategories = (categories: SkillCategory[]) => {
    soundFx.playStamp();
    setSkillCategories(categories);
  };

  const addSkillCategory = (cat: SkillCategory) => {
    soundFx.playStamp();
    setSkillCategories(prev => [...prev, cat]);
  };

  const deleteSkillCategory = (index: number) => {
    soundFx.playWandCast();
    setSkillCategories(prev => prev.filter((_, idx) => idx !== index));
  };

  const resetSkills = () => {
    soundFx.playWandCast();
    setSkillCategories(DEFAULT_SKILLS);
  };

  // Publication Methods
  const updatePublication = (pub: Partial<Publication>) => {
    soundFx.playStamp();
    setPublication(prev => ({ ...prev, ...pub }));
  };

  const resetPublication = () => {
    soundFx.playWandCast();
    setPublication(DEFAULT_PUBLICATION);
  };

  // Languages Methods
  const updateLanguages = (langs: Language[]) => {
    soundFx.playStamp();
    setLanguages(langs);
  };

  const resetLanguages = () => {
    soundFx.playWandCast();
    setLanguages(DEFAULT_LANGUAGES);
  };

  // Reset Everything
  const resetAllToDefaults = () => {
    soundFx.playWandCast();
    setPersonalInfo(DEFAULT_PERSONAL_INFO);
    setCareerRoles(DEFAULT_CAREER_ROLES);
    setProjects(DEFAULT_PROJECTS);
    setCertificates(DEFAULT_CERTIFICATIONS);
    setPhotos(DEFAULT_PORTRAITS);
    setSkillCategories(DEFAULT_SKILLS);
    setPublication(DEFAULT_PUBLICATION);
    setLanguages(DEFAULT_LANGUAGES);
  };

  // Export JSON
  const exportDataJSON = (): string => {
    const bundle = {
      personalInfo,
      careerRoles,
      projects,
      certificates,
      photos,
      skillCategories,
      publication,
      languages,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(bundle, null, 2);
  };

  // Import JSON
  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.personalInfo) setPersonalInfo(data.personalInfo);
      if (data.careerRoles) setCareerRoles(data.careerRoles);
      if (data.projects) setProjects(data.projects);
      if (data.certificates) setCertificates(data.certificates);
      if (data.photos) setPhotos(data.photos);
      if (data.skillCategories) setSkillCategories(data.skillCategories);
      if (data.publication) setPublication(data.publication);
      if (data.languages) setLanguages(data.languages);
      soundFx.playStamp();
      return true;
    } catch {
      return false;
    }
  };

  const getHouseColor = (): HouseColorTokens => {
    const isLumos = themeMode === 'lumos';

    switch (houseTheme) {
      case 'gryffindor':
        return {
          name: 'Gryffindor',
          badge: '🦁 GRYFFINDOR',
          primary: isLumos ? '#8B0000' : '#FF2E4D',
          secondary: isLumos ? '#78350F' : '#FFC72C',
          accent: isLumos ? '#991B1B' : '#F59E0B',
          border: isLumos ? '#8B0000' : '#EF4444',
          cardBg: isLumos ? '#FFFFFF' : '#0B0B0E',
          glow: isLumos ? 'rgba(139, 0, 0, 0.4)' : 'rgba(255, 46, 77, 0.45)',
          textHighlight: isLumos ? '#8B0000' : '#FFD700',
          gradient: isLumos ? 'from-[#8B0000] via-[#78350F] to-[#8B0000]' : 'from-[#FF2E4D] via-[#FFC72C] to-[#FF2E4D]'
        };
      case 'ravenclaw':
        return {
          name: 'Ravenclaw',
          badge: '🦅 RAVENCLAW',
          primary: isLumos ? '#0C4A6E' : '#0284C7',
          secondary: isLumos ? '#78350F' : '#C99E58',
          accent: isLumos ? '#0369A1' : '#38BDF8',
          border: isLumos ? '#0C4A6E' : '#38BDF8',
          cardBg: isLumos ? '#FFFFFF' : '#080C14',
          glow: isLumos ? 'rgba(12, 74, 110, 0.4)' : 'rgba(56, 189, 248, 0.5)',
          textHighlight: isLumos ? '#0C4A6E' : '#38BDF8',
          gradient: isLumos ? 'from-[#0C4A6E] via-[#78350F] to-[#0C4A6E]' : 'from-[#0284C7] via-[#C99E58] to-[#0284C7]'
        };
      case 'slytherin':
        return {
          name: 'Slytherin',
          badge: '🐍 SLYTHERIN',
          primary: isLumos ? '#065F46' : '#10B981',
          secondary: isLumos ? '#0F172A' : '#94A3B8',
          accent: isLumos ? '#047857' : '#34D399',
          border: isLumos ? '#065F46' : '#10B981',
          cardBg: isLumos ? '#FFFFFF' : '#060F0C',
          glow: isLumos ? 'rgba(6, 95, 70, 0.4)' : 'rgba(16, 185, 129, 0.5)',
          textHighlight: isLumos ? '#065F46' : '#34D399',
          gradient: isLumos ? 'from-[#065F46] via-[#0F172A] to-[#065F46]' : 'from-[#059669] via-[#94A3B8] to-[#059669]'
        };
      case 'hufflepuff':
        return {
          name: 'Hufflepuff',
          badge: '🦡 HUFFLEPUFF',
          primary: isLumos ? '#92400E' : '#F59E0B',
          secondary: isLumos ? '#451A03' : '#EAB308',
          accent: isLumos ? '#B45309' : '#FDE047',
          border: isLumos ? '#92400E' : '#F59E0B',
          cardBg: isLumos ? '#FFFFFF' : '#0F0D08',
          glow: isLumos ? 'rgba(146, 64, 14, 0.4)' : 'rgba(245, 158, 11, 0.5)',
          textHighlight: isLumos ? '#92400E' : '#FDE047',
          gradient: isLumos ? 'from-[#92400E] via-[#451A03] to-[#92400E]' : 'from-[#D97706] via-[#FDE047] to-[#D97706]'
        };
    }
  };

  return (
    <WizardThemeContext.Provider
      value={{
        themeMode,
        houseTheme,
        toggleLumosNox,
        setHouse,
        getHouseColor,
        scrollAnimationsEnabled,
        toggleScrollAnimations,
        bgMusicEnabled,
        toggleBgMusic,

        isSettingsOpen,
        setIsSettingsOpen,

        personalInfo,
        updatePersonalInfo,
        resetPersonalInfo,

        careerRoles,
        addCareerRole,
        updateCareerRole,
        deleteCareerRole,
        resetCareerRoles,

        projects,
        addProject,
        updateProject,
        deleteProject,
        resetProjects,

        certificates,
        addCertificate,
        updateCertificate,
        removeCertificate,
        resetCertificates,
        isUploaderOpen,
        setIsUploaderOpen,

        photos,
        addPhoto,
        updatePhoto,
        removePhoto,
        resetPhotos,
        isPhotoUploaderOpen,
        setIsPhotoUploaderOpen,

        skillCategories,
        updateSkillCategories,
        addSkillCategory,
        deleteSkillCategory,
        resetSkills,

        publication,
        updatePublication,
        resetPublication,

        languages,
        updateLanguages,
        resetLanguages,

        resetAllToDefaults,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </WizardThemeContext.Provider>
  );
};

export const useWizardTheme = () => {
  const context = useContext(WizardThemeContext);
  if (!context) {
    throw new Error('useWizardTheme must be used within a WizardThemeProvider');
  }
  return context;
};
