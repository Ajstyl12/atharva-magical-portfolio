import React, { useState, useRef } from 'react';
import { useWizardTheme, type HouseTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import {
  X,
  Settings,
  User,
  Briefcase,
  Wand2,
  Award,
  Camera,
  Sliders,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  Layers,
  GraduationCap
} from 'lucide-react';
import type {
  CareerRole,
  ProjectWork,
  Certification,
  PhotoMemory
} from '../types/portfolio';
import { MinistrySecurityModal } from './MinistrySecurityModal';

type SettingsTab =
  | 'personal'
  | 'career'
  | 'projects'
  | 'certificates'
  | 'gallery'
  | 'skills'
  | 'theme';

const PRESET_CERTIFICATES = [
  {
    title: 'Google Cloud Certified: Cloud Digital Leader',
    issuer: 'Google Cloud',
    date: 'Sep 2025',
    tag: 'CLOUD & DEVOPS'
  },
  {
    title: 'Harvard CS50: Computer Science & Architecture',
    issuer: 'Harvard University / edX',
    date: 'Jul 2025',
    tag: 'COMPUTER SCIENCE'
  },
  {
    title: 'Meta Professional Front-End Engineer Specialization',
    issuer: 'Meta / Coursera',
    date: 'May 2025',
    tag: 'SOFTWARE CRAFT'
  },
  {
    title: 'Stanford Online: Machine Learning & Deep Networks',
    issuer: 'Stanford Online / DeepLearning.AI',
    date: 'Mar 2025',
    tag: 'AI & DEEP LEARNING'
  }
];

export const SettingsModal: React.FC = () => {
  const {
    isSettingsOpen,
    setIsSettingsOpen,
    themeMode,
    houseTheme,
    toggleLumosNox,
    setHouse,
    getHouseColor,
    scrollAnimationsEnabled,
    toggleScrollAnimations,
    bgMusicEnabled,
    toggleBgMusic,

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

    photos,
    addPhoto,
    updatePhoto,
    removePhoto,
    resetPhotos,

    skillCategories,
    updateSkillCategories,
    addSkillCategory,
    deleteSkillCategory,
    resetSkills,

    publication,
    updatePublication,
    resetPublication,

    resetAllToDefaults,
    exportDataJSON,
    importDataJSON
  } = useWizardTheme();

  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [activeTab, setActiveTab] = useState<SettingsTab>('personal');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Security Lock State
  const [secModal, setSecModal] = useState<{ isOpen: boolean; actionTitle: string; action: () => void }>({
    isOpen: false,
    actionTitle: '',
    action: () => {}
  });

  const requestPasscode = (actionTitle: string, action: () => void) => {
    setSecModal({ isOpen: true, actionTitle, action });
  };

  // File Import Ref
  const jsonImportRef = useRef<HTMLInputElement>(null);

  // Personal Info Form State
  const [personalForm, setPersonalForm] = useState(personalInfo);

  // Synchronize personal form when modal opens
  React.useEffect(() => {
    if (isSettingsOpen) {
      setPersonalForm(personalInfo);
    }
  }, [isSettingsOpen, personalInfo]);

  // Career Role Form State
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);
  const [isAddingRole, setIsAddingRole] = useState<boolean>(false);
  const [roleForm, setRoleForm] = useState<Omit<CareerRole, 'id'>>({
    role: '',
    organization: '',
    period: '',
    location: 'Mumbai, Maharashtra, India',
    category: 'MEDIA & BROADCAST',
    statusBadge: 'VERIFIED ROLE',
    description: [''],
    skills: []
  });
  const [roleSkillInput, setRoleSkillInput] = useState('');

  // Project Form State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isAddingProject, setIsAddingProject] = useState<boolean>(false);
  const [projectForm, setProjectForm] = useState<Omit<ProjectWork, 'id'>>({
    title: '',
    issueCode: 'ENCHANTED ARTIFACT // INNOVATION',
    domain: '',
    period: '2025',
    quote: '',
    overview: '',
    architectureDetails: {
      systemFlow: [''],
      coreComponents: [''],
      technicalHighlights: ['']
    },
    impactAndMetrics: {
      stat1: { label: 'METRIC', value: '100%' },
      stat2: { label: 'ACCURACY', value: 'REAL-TIME' },
      keyTakeaway: ''
    },
    tags: [],
    githubUrl: 'https://github.com/atharvabagwe30',
    liveUrl: '',
    stampText: 'APPROVED'
  });
  const [projTagInput, setProjTagInput] = useState('');

  // Certificate Form State
  const [editingCertId, setEditingCertId] = useState<string | null>(null);
  const [isAddingCert, setIsAddingCert] = useState<boolean>(false);
  const [certForm, setCertForm] = useState<Omit<Certification, 'id'>>({
    title: '',
    issuer: '',
    date: 'Aug 2026',
    tag: 'CLOUD & GEN-AI',
    certificateUrl: '',
    credentialId: ''
  });
  const certFileInputRef = useRef<HTMLInputElement>(null);

  // Photo Form State
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [isAddingPhoto, setIsAddingPhoto] = useState<boolean>(false);
  const [photoForm, setPhotoForm] = useState<Omit<PhotoMemory, 'id'>>({
    title: '',
    caption: '',
    date: 'August 2026',
    location: 'Hogwarts / Mumbai',
    categoryTag: 'PORTRAIT // OFFICIAL',
    imageUrl: ''
  });
  const photoFileInputRef = useRef<HTMLInputElement>(null);

  // Publication Form State
  const [pubForm, setPubForm] = useState(publication);

  // Skill Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatSkills, setNewCatSkills] = useState('');

  if (!isSettingsOpen) return null;

  const triggerToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 2500);
  };

  const handleClose = () => {
    soundFx.playWandCast();
    setIsSettingsOpen(false);
  };

  // Personal Info Submit
  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    requestPasscode('Update Personal Bio & Information', () => {
      updatePersonalInfo(personalForm);
      soundFx.playStamp();
      triggerToast('Personal information updated successfully!');
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch {
        // safe fallback
      }
    });
  };

  // JSON Export / Import
  const handleExportData = () => {
    soundFx.playWandCast();
    const jsonStr = exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Atharva_Bagwe_Portfolio_Data_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('Exported portfolio dataset as JSON!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      requestPasscode('Import JSON Portfolio Dataset', () => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          const success = importDataJSON(text);
          if (success) {
            triggerToast('Imported and applied data successfully!');
          } else {
            alert('Failed to parse the JSON file. Please verify format.');
          }
        };
        reader.readAsText(file);
      });
    }
  };

  // Certificate File Upload
  const handleCertFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFx.playWandCast();
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setCertForm((prev) => ({
          ...prev,
          fileData: result,
          title: prev.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Photo File Upload
  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFx.playWandCast();
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPhotoForm((prev) => ({
          ...prev,
          imageUrl: result,
          title: prev.title || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tabItems: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Personal & Bio', icon: <User size={15} /> },
    { id: 'career', label: 'Career & Experience', icon: <Briefcase size={15} /> },
    { id: 'projects', label: 'Artifacts & Works', icon: <Wand2 size={15} /> },
    { id: 'certificates', label: 'Accreditations Vault', icon: <Award size={15} /> },
    { id: 'gallery', label: 'Moving Portraits', icon: <Camera size={15} /> },
    { id: 'skills', label: 'Skills & Research', icon: <Layers size={15} /> },
    { id: 'theme', label: 'Theme & Magic', icon: <Sliders size={15} /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-2 sm:p-4 overflow-y-auto">
      <div
        className={`relative w-full max-w-6xl h-[92vh] max-h-[900px] rounded-lg shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden border-2 transition-all duration-300 ${
          isLumos
            ? 'glass-card-lumos border-[#0F172A] text-[#090D16]'
            : 'glass-card-nox border-[#D4AF37] text-[#F8FAFC]'
        }`}
        style={{ borderColor: houseStyles.border }}
      >
        {/* Top Header Bar */}
        <div
          className={`flex items-center justify-between px-4 sm:px-6 py-3.5 border-b shrink-0 ${
            isLumos ? 'glass-sub-lumos border-slate-200/80' : 'glass-sub-nox border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center border shadow-sm"
              style={{
                backgroundColor: isLumos ? houseStyles.primary : `${houseStyles.primary}25`,
                borderColor: houseStyles.border,
                color: isLumos ? '#FFFFFF' : houseStyles.secondary
              }}
            >
              <Settings size={18} className="animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-cinzel-dec font-black text-sm sm:text-base tracking-wide ${
                  isLumos ? 'text-[#090D16]' : 'text-white'
                }`}>
                  MINISTRY CONTROL SANCTUM
                </span>
                <span
                  className={`font-mono-runes text-[10px] px-2 py-0.5 rounded border uppercase font-black ${
                    isLumos ? 'bg-slate-200 text-[#090D16]' : 'bg-[#14141A] text-[#CBD5E1]'
                  }`}
                  style={{
                    borderColor: houseStyles.border
                  }}
                >
                  LIVE EDITOR
                </span>
              </div>
              <span className={`font-medieval text-xs tracking-wider block font-semibold ${
                isLumos ? 'text-[#334155]' : 'text-[#94A3B8]'
              }`}>
                Manage, Edit, Add & Delete Portfolio Data • Changes Save Instantly
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Export JSON */}
            <button
              onClick={handleExportData}
              title="Backup complete portfolio data to JSON"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-cinzel font-black rounded border transition-all cursor-pointer ${
                isLumos
                  ? 'glass-sub-lumos hover:bg-white text-[#090D16]'
                  : 'glass-sub-nox hover:bg-white/20 text-[#E2E8F0]'
              }`}
            >
              <Download size={13} style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }} />
              <span>EXPORT</span>
            </button>

            {/* Import JSON */}
            <button
              onClick={() => jsonImportRef.current?.click()}
              title="Restore portfolio data from JSON backup"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-cinzel font-black rounded border transition-all cursor-pointer ${
                isLumos
                  ? 'glass-sub-lumos hover:bg-white text-[#090D16]'
                  : 'glass-sub-nox hover:bg-white/20 text-[#E2E8F0]'
              }`}
            >
              <Upload size={13} style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }} />
              <span>IMPORT</span>
            </button>
            <input
              ref={jsonImportRef}
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />

            {/* Reset All to Defaults */}
            <button
              onClick={() => {
                if (window.confirm('Reset ALL portfolio data back to default values?')) {
                  resetAllToDefaults();
                  triggerToast('Reset everything to initial defaults!');
                }
              }}
              title="Reset all content to original defaults"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-cinzel font-black rounded border transition-colors cursor-pointer text-red-500 hover:bg-red-500/10 border-red-500/30"
            >
              <RotateCcw size={13} />
              <span className="hidden md:inline">RESET ALL</span>
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className={`p-2 rounded-full transition-colors cursor-pointer ml-1 ${
                isLumos
                  ? 'hover:bg-slate-200/60 text-[#090D16]'
                  : 'hover:bg-white/10 text-[#CBD5E1]'
              }`}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {saveToast && (
          <div
            className="absolute top-16 right-6 z-50 bg-[#10B981] text-white px-4 py-2 rounded shadow-xl flex items-center gap-2 font-cinzel text-xs font-bold animate-bounce"
          >
            <CheckCircle2 size={16} />
            <span>{saveToast}</span>
          </div>
        )}

        {/* Main Body Split: Tabs Left / Content Right */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Tab Navigation */}
          <div
            className={`w-full md:w-64 shrink-0 border-b md:border-b-0 md:border-r flex md:flex-col overflow-x-auto md:overflow-y-auto p-2.5 gap-1.5 ${
              isLumos ? 'glass-sub-lumos border-slate-200/80' : 'glass-sub-nox border-white/10'
            }`}
          >
            {tabItems.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    soundFx.playWandCast();
                    setActiveTab(tab.id);
                  }}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-md text-xs font-cinzel font-bold transition-all text-left whitespace-nowrap cursor-pointer border ${
                    isActive
                      ? 'shadow-sm text-white font-black scale-[1.02]'
                      : isLumos
                      ? 'border-transparent text-[#1E293B] hover:bg-white hover:text-[#090D16]'
                      : 'border-transparent text-[#CBD5E1] hover:bg-white/10 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: isActive ? houseStyles.primary : undefined,
                    borderColor: isActive ? houseStyles.border : undefined
                  }}
                >
                  <span style={{ color: isActive ? '#FFFFFF' : (isLumos ? houseStyles.primary : houseStyles.secondary) }}>
                    {tab.icon}
                  </span>
                  <span className="font-bold">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Tab Content Container */}
          <div
            className={`flex-1 overflow-y-auto p-4 sm:p-6 ${
              isLumos ? 'bg-[#FFFFFF]/70' : 'bg-[#07070A]/80'
            }`}
          >
            {/* TAB 1: PERSONAL & BIO INFO */}
            {activeTab === 'personal' && (
              <form onSubmit={handleSavePersonalInfo} className="max-w-3xl space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#2A2A35]">
                  <div>
                    <h3 className="font-cinzel-dec font-black text-lg text-[#FDE047]">
                      PERSONAL DOSSIER & PROFILE
                    </h3>
                    <p className="font-fell italic text-xs text-[#94A3B8]">
                      Edit your public identity, contact details, manifesto, and education credentials.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-cinzel font-bold text-white shadow-md cursor-pointer border hover:scale-105 transition-all"
                    style={{
                      backgroundColor: houseStyles.primary,
                      borderColor: houseStyles.border
                    }}
                  >
                    <Save size={14} />
                    <span>SAVE CHANGES</span>
                  </button>
                </div>

                {/* Primary Identifiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={personalForm.name}
                      onChange={(e) =>
                        setPersonalForm({ ...personalForm, name: e.target.value })
                      }
                      className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                        isLumos
                          ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                          : 'bg-[#121218] border-[#2A2A35] text-white'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                      Short Name / Monogram
                    </label>
                    <input
                      type="text"
                      value={personalForm.shortName}
                      onChange={(e) =>
                        setPersonalForm({ ...personalForm, shortName: e.target.value })
                      }
                      className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                        isLumos
                          ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                          : 'bg-[#121218] border-[#2A2A35] text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                      Edition Issue Number
                    </label>
                    <input
                      type="text"
                      value={personalForm.issueNumber}
                      onChange={(e) =>
                        setPersonalForm({ ...personalForm, issueNumber: e.target.value })
                      }
                      className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                        isLumos
                          ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                          : 'bg-[#121218] border-[#2A2A35] text-white'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                      Volume Masthead
                    </label>
                    <input
                      type="text"
                      value={personalForm.volume}
                      onChange={(e) =>
                        setPersonalForm({ ...personalForm, volume: e.target.value })
                      }
                      className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                        isLumos
                          ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                          : 'bg-[#121218] border-[#2A2A35] text-white'
                      }`}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                      Header Tagline / Technical Proclamation
                    </label>
                    <input
                      type="text"
                      value={personalForm.tagline}
                      onChange={(e) =>
                        setPersonalForm({ ...personalForm, tagline: e.target.value })
                      }
                      className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                        isLumos
                          ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                          : 'bg-[#121218] border-[#2A2A35] text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="pt-4 border-t border-[#2A2A35]">
                  <h4 className="font-cinzel text-xs font-black uppercase text-[#D4AF37] mb-3">
                    COMMUNICATION & TELEMETRY COORDINATES
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={personalForm.email}
                        onChange={(e) =>
                          setPersonalForm({ ...personalForm, email: e.target.value })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={personalForm.phone}
                        onChange={(e) =>
                          setPersonalForm({ ...personalForm, phone: e.target.value })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Location / Sanctum
                      </label>
                      <input
                        type="text"
                        value={personalForm.location}
                        onChange={(e) =>
                          setPersonalForm({ ...personalForm, location: e.target.value })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Ministry Badge ID
                      </label>
                      <input
                        type="text"
                        value={personalForm.ministryId}
                        onChange={(e) =>
                          setPersonalForm({ ...personalForm, ministryId: e.target.value })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Social Channels */}
                <div className="pt-4 border-t border-[#2A2A35]">
                  <h4 className="font-cinzel text-xs font-black uppercase text-[#D4AF37] mb-3">
                    DIGITAL RUNES & DIMENSIONAL PORTALS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        GitHub Profile URL
                      </label>
                      <input
                        type="text"
                        value={personalForm.socials.github}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            socials: { ...personalForm.socials, github: e.target.value }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="text"
                        value={personalForm.socials.linkedin}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            socials: { ...personalForm.socials, linkedin: e.target.value }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Twitter / X Profile URL
                      </label>
                      <input
                        type="text"
                        value={personalForm.socials.twitter}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            socials: { ...personalForm.socials, twitter: e.target.value }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Instagram Profile URL
                      </label>
                      <input
                        type="text"
                        value={personalForm.socials.instagram || ''}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            socials: { ...personalForm.socials, instagram: e.target.value }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Discord URL / Handle
                      </label>
                      <input
                        type="text"
                        value={personalForm.socials.discord || ''}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            socials: { ...personalForm.socials, discord: e.target.value }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Hugging Face / AI URL
                      </label>
                      <input
                        type="text"
                        value={personalForm.socials.huggingface || ''}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            socials: { ...personalForm.socials, huggingface: e.target.value }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Editor's Manifesto Notes */}
                <div className="pt-4 border-t border-[#2A2A35]">
                  <h4 className="font-cinzel text-xs font-black uppercase text-[#D4AF37] mb-3">
                    THE PROPHET'S MANIFESTO & CORE EDITORIAL STATEMENT
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Editorial Quote Paragraph 1
                      </label>
                      <textarea
                        rows={2}
                        value={personalForm.editorNote[0] || ''}
                        onChange={(e) => {
                          const note = [...personalForm.editorNote];
                          note[0] = e.target.value;
                          setPersonalForm({ ...personalForm, editorNote: note });
                        }}
                        className={`w-full px-3 py-2 text-xs rounded border font-sans-body ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Editorial Philosophy Paragraph 2
                      </label>
                      <textarea
                        rows={2}
                        value={personalForm.editorNote[1] || ''}
                        onChange={(e) => {
                          const note = [...personalForm.editorNote];
                          note[1] = e.target.value;
                          setPersonalForm({ ...personalForm, editorNote: note });
                        }}
                        className={`w-full px-3 py-2 text-xs rounded border font-sans-body ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Education Summary */}
                <div className="pt-4 border-t border-[#2A2A35]">
                  <h4 className="font-cinzel text-xs font-black uppercase text-[#D4AF37] mb-3 flex items-center gap-1.5">
                    <GraduationCap size={15} /> ACADEMIC DEGREE & CAPSTONE
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Primary Degree Title
                      </label>
                      <input
                        type="text"
                        value={personalForm.educationSummary.degree}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            educationSummary: {
                              ...personalForm.educationSummary,
                              degree: e.target.value
                            }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        College / Institution
                      </label>
                      <input
                        type="text"
                        value={personalForm.educationSummary.college}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            educationSummary: {
                              ...personalForm.educationSummary,
                              college: e.target.value
                            }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Cumulative GPA / Score
                      </label>
                      <input
                        type="text"
                        value={personalForm.educationSummary.gpa}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            educationSummary: {
                              ...personalForm.educationSummary,
                              gpa: e.target.value
                            }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-cinzel font-bold uppercase mb-1 opacity-80">
                        Academic Duration
                      </label>
                      <input
                        type="text"
                        value={personalForm.educationSummary.period}
                        onChange={(e) =>
                          setPersonalForm({
                            ...personalForm,
                            educationSummary: {
                              ...personalForm.educationSummary,
                              period: e.target.value
                            }
                          })
                        }
                        className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                          isLumos
                            ? 'bg-white border-[#CBD5E1] text-[#0F172A]'
                            : 'bg-[#121218] border-[#2A2A35] text-white'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      resetPersonalInfo();
                      setPersonalForm(personalInfo);
                      triggerToast('Reset personal bio to default!');
                    }}
                    className="px-4 py-2 rounded text-xs font-cinzel font-bold border border-gray-600 hover:bg-gray-700/20 cursor-pointer"
                  >
                    RESET TO DEFAULT
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2 rounded text-xs font-cinzel font-bold text-white shadow-md cursor-pointer border"
                    style={{
                      backgroundColor: houseStyles.primary,
                      borderColor: houseStyles.border
                    }}
                  >
                    <Save size={14} />
                    <span>SAVE DOSSIER</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: CAREER & FIELD EXPERIENCE */}
            {activeTab === 'career' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#2A2A35]">
                  <div>
                    <h3 className="font-cinzel-dec font-black text-lg text-[#FDE047]">
                      CAREER CHRONICLES & WORK ROLES
                    </h3>
                    <p className="font-fell italic text-xs text-[#94A3B8]">
                      Add, modify or remove professional experience, broadcast telemetry, and academic appointments.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playWandCast();
                      setIsAddingRole(true);
                      setEditingRoleId(null);
                      setRoleForm({
                        role: '',
                        organization: '',
                        period: '2026',
                        location: 'Mumbai, Maharashtra, India',
                        category: 'MEDIA & BROADCAST',
                        statusBadge: 'ACTIVE DEPLOYMENT',
                        description: [''],
                        skills: []
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-cinzel font-bold text-white shadow-md cursor-pointer border hover:scale-105 transition-all"
                    style={{
                      backgroundColor: houseStyles.primary,
                      borderColor: houseStyles.border
                    }}
                  >
                    <Plus size={14} />
                    <span>+ ADD NEW EXPERIENCE</span>
                  </button>
                </div>

                {/* Add / Edit Role Modal / Inline Card */}
                {(isAddingRole || editingRoleId) && (
                  <div
                    className={`p-5 rounded border-2 space-y-4 ${
                      isLumos ? 'bg-white border-[#0F172A]' : 'bg-[#101016] border-[#D4AF37]'
                    }`}
                    style={{ borderColor: houseStyles.border }}
                  >
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-cinzel font-black text-sm text-[#FDE047]">
                        {editingRoleId ? 'EDIT CAREER ROLE' : 'ADD NEW CAREER ROLE'}
                      </span>
                      <button
                        onClick={() => {
                          setIsAddingRole(false);
                          setEditingRoleId(null);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Role Title
                        </label>
                        <input
                          type="text"
                          value={roleForm.role}
                          onChange={(e) =>
                            setRoleForm({ ...roleForm, role: e.target.value })
                          }
                          placeholder="e.g. MCR Apprentice and Analyst"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Organization / Guild
                        </label>
                        <input
                          type="text"
                          value={roleForm.organization}
                          onChange={(e) =>
                            setRoleForm({ ...roleForm, organization: e.target.value })
                          }
                          placeholder="e.g. Network 18 Media & Investments Ltd."
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Tenure / Period
                        </label>
                        <input
                          type="text"
                          value={roleForm.period}
                          onChange={(e) =>
                            setRoleForm({ ...roleForm, period: e.target.value })
                          }
                          placeholder="e.g. Dec 2025 — Present"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Category
                        </label>
                        <select
                          value={roleForm.category}
                          onChange={(e) =>
                            setRoleForm({ ...roleForm, category: e.target.value })
                          }
                          className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                            isLumos ? 'bg-white text-black' : 'bg-[#121218] text-white'
                          }`}
                        >
                          <option value="MEDIA & BROADCAST">MEDIA & BROADCAST</option>
                          <option value="ACADEMIC">ACADEMIC</option>
                          <option value="AI & SOFTWARE">AI & SOFTWARE</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Status Badge Text
                        </label>
                        <input
                          type="text"
                          value={roleForm.statusBadge}
                          onChange={(e) =>
                            setRoleForm({ ...roleForm, statusBadge: e.target.value })
                          }
                          placeholder="e.g. ACTIVE BROADCAST DEPLOYMENT"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Responsibilities & Key Accomplishments (One bullet per line)
                        </label>
                        <textarea
                          rows={4}
                          value={roleForm.description.join('\n')}
                          onChange={(e) =>
                            setRoleForm({
                              ...roleForm,
                              description: e.target.value
                                .split('\n')
                                .filter((line) => line.trim().length > 0)
                            })
                          }
                          placeholder="Line 1: Managed real-time broadcast signal streams...&#10;Line 2: Conducted diagnostic telemetry..."
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-sans-body"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Skill Runes / Tags (Add with Enter or comma)
                        </label>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {roleForm.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 flex items-center gap-1 font-mono"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() =>
                                  setRoleForm({
                                    ...roleForm,
                                    skills: roleForm.skills.filter((_, idx) => idx !== sIdx)
                                  })
                                }
                                className="hover:text-white"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={roleSkillInput}
                            onChange={(e) => setRoleSkillInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                if (roleSkillInput.trim()) {
                                  setRoleForm({
                                    ...roleForm,
                                    skills: [...roleForm.skills, roleSkillInput.trim()]
                                  });
                                  setRoleSkillInput('');
                                }
                              }
                            }}
                            placeholder="Type a skill and press Enter..."
                            className="flex-1 px-3 py-1.5 text-xs rounded border bg-transparent font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (roleSkillInput.trim()) {
                                setRoleForm({
                                  ...roleForm,
                                  skills: [...roleForm.skills, roleSkillInput.trim()]
                                });
                                setRoleSkillInput('');
                              }
                            }}
                            className="px-3 py-1.5 text-xs font-cinzel font-bold rounded bg-gray-700 text-white"
                          >
                            + ADD
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingRole(false);
                          setEditingRoleId(null);
                        }}
                        className="px-3 py-1.5 text-xs font-cinzel rounded border border-gray-600"
                      >
                        CANCEL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!roleForm.role || !roleForm.organization) {
                            alert('Please provide role title and organization name.');
                            return;
                          }
                          if (editingRoleId) {
                            updateCareerRole(editingRoleId, roleForm);
                            triggerToast('Updated career role successfully!');
                          } else {
                            addCareerRole(roleForm);
                            triggerToast('Added new career role!');
                          }
                          setIsAddingRole(false);
                          setEditingRoleId(null);
                        }}
                        className="px-4 py-1.5 text-xs font-cinzel font-bold text-white rounded shadow"
                        style={{ backgroundColor: houseStyles.primary }}
                      >
                        {editingRoleId ? 'SAVE ROLE' : 'CREATE ROLE'}
                      </button>
                    </div>
                  </div>
                )}

                {/* List of Existing Roles */}
                <div className="space-y-4">
                  {careerRoles.map((role) => (
                    <div
                      key={role.id}
                      className={`p-4 rounded border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                        isLumos
                          ? 'bg-white border-[#E2E8F0] hover:border-[#0F172A]'
                          : 'bg-[#0E0E14] border-[#1E1E24] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-cinzel text-sm font-black">{role.role}</span>
                          <span
                            className="font-mono-runes text-[9px] px-2 py-0.5 rounded border uppercase"
                            style={{
                              backgroundColor: `${houseStyles.primary}20`,
                              color: houseStyles.secondary,
                              borderColor: houseStyles.border
                            }}
                          >
                            {role.statusBadge}
                          </span>
                        </div>
                        <p className="text-xs font-cinzel font-bold opacity-80" style={{ color: houseStyles.secondary }}>
                          {role.organization} • <span className="font-mono">{role.period}</span>
                        </p>
                        <p className="text-[11px] opacity-70 line-clamp-1 font-sans-body">
                          {role.description[0]}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => {
                            soundFx.playWandCast();
                            setEditingRoleId(role.id);
                            setIsAddingRole(false);
                            setRoleForm({
                              role: role.role,
                              organization: role.organization,
                              period: role.period,
                              location: role.location,
                              category: role.category,
                              statusBadge: role.statusBadge,
                              description: role.description,
                              skills: role.skills
                            });
                          }}
                          className="p-1.5 rounded border border-gray-600 hover:bg-gray-700/20 text-blue-400 cursor-pointer"
                          title="Edit role"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete role "${role.role}"?`)) {
                              deleteCareerRole(role.id);
                              triggerToast('Role deleted.');
                            }
                          }}
                          className="p-1.5 rounded border border-red-500/40 hover:bg-red-500/20 text-red-400 cursor-pointer"
                          title="Delete role"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset career chronicles to defaults?')) {
                        resetCareerRoles();
                        triggerToast('Reset career roles to defaults!');
                      }
                    }}
                    className="text-xs font-cinzel font-bold text-red-400 hover:underline cursor-pointer"
                  >
                    ↻ Reset Career Roles to Default
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: PROJECTS & ARTIFACTS */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#2A2A35]">
                  <div>
                    <h3 className="font-cinzel-dec font-black text-lg text-[#FDE047]">
                      ENCHANTED ARTIFACTS & BLUEPRINTS
                    </h3>
                    <p className="font-fell italic text-xs text-[#94A3B8]">
                      Showcase your AI agent platforms, web intelligence systems, and computational projects.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playWandCast();
                      setIsAddingProject(true);
                      setEditingProjectId(null);
                      setProjectForm({
                        title: '',
                        issueCode: 'ENCHANTED ARTIFACT // NEW',
                        domain: 'AI & Full-Stack System',
                        period: '2025 — 2026',
                        quote: '',
                        overview: '',
                        architectureDetails: {
                          systemFlow: ['Input -> Spell Engine -> Output'],
                          coreComponents: ['Frontend UI', 'Agent Engine', 'Data Store'],
                          technicalHighlights: ['High-throughput execution', 'Responsive UX']
                        },
                        impactAndMetrics: {
                          stat1: { label: 'LATENCY', value: '< 200MS' },
                          stat2: { label: 'ACCURACY', value: '99%' },
                          keyTakeaway: ''
                        },
                        tags: ['JavaScript', 'Python', 'AI'],
                        githubUrl: 'https://github.com/atharvabagwe30',
                        liveUrl: '',
                        stampText: 'MINISTRY APPROVED'
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-cinzel font-bold text-white shadow-md cursor-pointer border hover:scale-105 transition-all"
                    style={{
                      backgroundColor: houseStyles.primary,
                      borderColor: houseStyles.border
                    }}
                  >
                    <Plus size={14} />
                    <span>+ ADD NEW ARTIFACT</span>
                  </button>
                </div>

                {/* Add / Edit Project Form */}
                {(isAddingProject || editingProjectId) && (
                  <div
                    className={`p-5 rounded border-2 space-y-4 ${
                      isLumos ? 'bg-white border-[#0F172A]' : 'bg-[#101016] border-[#D4AF37]'
                    }`}
                    style={{ borderColor: houseStyles.border }}
                  >
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-cinzel font-black text-sm text-[#FDE047]">
                        {editingProjectId ? 'EDIT ARTIFACT BLUEPRINT' : 'CREATE NEW ARTIFACT'}
                      </span>
                      <button
                        onClick={() => {
                          setIsAddingProject(false);
                          setEditingProjectId(null);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Artifact Title
                        </label>
                        <input
                          type="text"
                          value={projectForm.title}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, title: e.target.value })
                          }
                          placeholder="e.g. Insights Skills"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Issue Code / Subtitle
                        </label>
                        <input
                          type="text"
                          value={projectForm.issueCode}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, issueCode: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Domain Focus
                        </label>
                        <input
                          type="text"
                          value={projectForm.domain}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, domain: e.target.value })
                          }
                          placeholder="e.g. AI-Driven Skill Analytics & Assessment Engine"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Period / Timeframe
                        </label>
                        <input
                          type="text"
                          value={projectForm.period}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, period: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Thesis / Philosophical Quote
                        </label>
                        <input
                          type="text"
                          value={projectForm.quote}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, quote: e.target.value })
                          }
                          placeholder="e.g. Precision analytics turn ambiguous skill gaps into executable blueprints."
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-fell italic"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Overview & Technical Description
                        </label>
                        <textarea
                          rows={3}
                          value={projectForm.overview}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, overview: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-sans-body"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          GitHub Repository URL
                        </label>
                        <input
                          type="text"
                          value={projectForm.githubUrl || ''}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, githubUrl: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Live Deployment URL (Optional)
                        </label>
                        <input
                          type="text"
                          value={projectForm.liveUrl || ''}
                          onChange={(e) =>
                            setProjectForm({ ...projectForm, liveUrl: e.target.value })
                          }
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Tags & Tech Stack
                        </label>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {projectForm.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 font-mono"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() =>
                                  setProjectForm({
                                    ...projectForm,
                                    tags: projectForm.tags.filter((_, idx) => idx !== tIdx)
                                  })
                                }
                                className="hover:text-white"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={projTagInput}
                            onChange={(e) => setProjTagInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ',') {
                                e.preventDefault();
                                if (projTagInput.trim()) {
                                  setProjectForm({
                                    ...projectForm,
                                    tags: [...projectForm.tags, projTagInput.trim()]
                                  });
                                  setProjTagInput('');
                                }
                              }
                            }}
                            placeholder="Type a tag and press Enter..."
                            className="flex-1 px-3 py-1.5 text-xs rounded border bg-transparent font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              if (projTagInput.trim()) {
                                setProjectForm({
                                  ...projectForm,
                                  tags: [...projectForm.tags, projTagInput.trim()]
                                });
                                setProjTagInput('');
                              }
                            }}
                            className="px-3 py-1.5 text-xs font-cinzel font-bold rounded bg-gray-700 text-white"
                          >
                            + ADD
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingProject(false);
                          setEditingProjectId(null);
                        }}
                        className="px-3 py-1.5 text-xs font-cinzel rounded border border-gray-600"
                      >
                        CANCEL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!projectForm.title) {
                            alert('Please provide a title for the artifact.');
                            return;
                          }
                          if (editingProjectId) {
                            updateProject(editingProjectId, projectForm);
                            triggerToast('Updated artifact blueprint!');
                          } else {
                            addProject(projectForm);
                            triggerToast('Created new artifact!');
                          }
                          setIsAddingProject(false);
                          setEditingProjectId(null);
                        }}
                        className="px-4 py-1.5 text-xs font-cinzel font-bold text-white rounded shadow"
                        style={{ backgroundColor: houseStyles.primary }}
                      >
                        {editingProjectId ? 'SAVE ARTIFACT' : 'CREATE ARTIFACT'}
                      </button>
                    </div>
                  </div>
                )}

                {/* List of Existing Projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className={`p-4 rounded border flex flex-col justify-between transition-all ${
                        isLumos
                          ? 'bg-white border-[#E2E8F0] hover:border-[#0F172A]'
                          : 'bg-[#0E0E14] border-[#1E1E24] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b text-[10px] font-mono-runes">
                          <span style={{ color: houseStyles.secondary }}>{proj.issueCode}</span>
                          <span>{proj.period}</span>
                        </div>
                        <h4 className="font-cinzel text-base font-black mt-2">{proj.title}</h4>
                        <p className="text-xs font-fell italic text-[#94A3B8] line-clamp-2 mt-1">
                          "{proj.quote || proj.overview}"
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {proj.tags.slice(0, 4).map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 font-mono"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t">
                        <span className="text-[10px] font-cinzel font-bold text-emerald-400">
                          {proj.stampText}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              soundFx.playWandCast();
                              setEditingProjectId(proj.id);
                              setIsAddingProject(false);
                              setProjectForm({
                                title: proj.title,
                                issueCode: proj.issueCode,
                                domain: proj.domain,
                                period: proj.period,
                                quote: proj.quote,
                                overview: proj.overview,
                                architectureDetails: proj.architectureDetails,
                                impactAndMetrics: proj.impactAndMetrics,
                                tags: proj.tags,
                                githubUrl: proj.githubUrl,
                                liveUrl: proj.liveUrl,
                                stampText: proj.stampText
                              });
                            }}
                            className="p-1.5 rounded border border-gray-600 hover:bg-gray-700/20 text-blue-400"
                            title="Edit project"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                                triggerToast('Artifact deleted.');
                              }
                            }}
                            className="p-1.5 rounded border border-red-500/40 hover:bg-red-500/20 text-red-400"
                            title="Delete project"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset artifacts to defaults?')) {
                        resetProjects();
                        triggerToast('Reset artifacts to defaults!');
                      }
                    }}
                    className="text-xs font-cinzel font-bold text-red-400 hover:underline cursor-pointer"
                  >
                    ↻ Reset Artifacts to Default
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: ACCREDITATIONS & CERTIFICATES (Moved here!) */}
            {activeTab === 'certificates' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#2A2A35]">
                  <div>
                    <div className="flex items-center gap-2">
                      <Award size={18} style={{ color: houseStyles.secondary }} />
                      <h3 className="font-cinzel-dec font-black text-lg text-[#FDE047]">
                        MINISTRY ACCREDITATIONS & CERTIFICATES VAULT
                      </h3>
                    </div>
                    <p className="font-fell italic text-xs text-[#94A3B8]">
                      Upload new certification scrolls, manage existing verified badges, or add industry credentials.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playWandCast();
                      setIsAddingCert(true);
                      setEditingCertId(null);
                      setCertForm({
                        title: '',
                        issuer: '',
                        date: 'August 2026',
                        tag: 'CLOUD & GEN-AI',
                        certificateUrl: '',
                        credentialId: '',
                        fileData: undefined
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-cinzel font-bold text-white shadow-md cursor-pointer border hover:scale-105 transition-all"
                    style={{
                      backgroundColor: houseStyles.primary,
                      borderColor: houseStyles.border
                    }}
                  >
                    <Plus size={14} />
                    <span>+ UPLOAD / ADD CERTIFICATE</span>
                  </button>
                </div>

                {/* 1-Click Fast Accreditation Presets */}
                <div className={`p-4 rounded border ${
                  isLumos ? 'bg-white border-[#E2E8F0]' : 'bg-[#0E0E14] border-[#1E1E24]'
                }`}>
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider block mb-2" style={{ color: houseStyles.secondary }}>
                    ⚡ 1-CLICK FAST ACCREDITATION PRESETS:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {PRESET_CERTIFICATES.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => {
                          addCertificate(preset);
                          soundFx.playStamp();
                          triggerToast(`Added ${preset.title}!`);
                        }}
                        className={`p-2.5 rounded border text-left transition-all hover:scale-[1.02] cursor-pointer flex flex-col justify-between ${
                          isLumos
                            ? 'bg-[#F8FAFC] hover:bg-[#F1F5F9] border-[#CBD5E1]'
                            : 'bg-[#14141C] hover:bg-[#1C1C28] border-[#2E2E3E]'
                        }`}
                      >
                        <span className="font-cinzel text-[11px] font-bold line-clamp-1">{preset.title}</span>
                        <div className="flex items-center justify-between text-[9px] mt-2 opacity-70 font-mono">
                          <span>{preset.issuer}</span>
                          <span className="text-emerald-400 font-bold">+ ADD</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add / Edit Certificate Form */}
                {(isAddingCert || editingCertId) && (
                  <div
                    className={`p-5 rounded border-2 space-y-4 ${
                      isLumos ? 'bg-white border-[#0F172A]' : 'bg-[#101016] border-[#D4AF37]'
                    }`}
                    style={{ borderColor: houseStyles.border }}
                  >
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-cinzel font-black text-sm text-[#FDE047]">
                        {editingCertId ? 'EDIT ACCREDITATION SCROLL' : 'ADD NEW ACCREDITATION SCROLL'}
                      </span>
                      <button
                        onClick={() => {
                          setIsAddingCert(false);
                          setEditingCertId(null);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Certificate Title
                        </label>
                        <input
                          type="text"
                          value={certForm.title}
                          onChange={(e) =>
                            setCertForm({ ...certForm, title: e.target.value })
                          }
                          placeholder="e.g. AWS Academy Graduate - Generative AI"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Issuing Guild / Authority
                        </label>
                        <input
                          type="text"
                          value={certForm.issuer}
                          onChange={(e) =>
                            setCertForm({ ...certForm, issuer: e.target.value })
                          }
                          placeholder="e.g. AWS Academy / Tata / Cisco / Coursera"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Issue Date
                        </label>
                        <input
                          type="text"
                          value={certForm.date}
                          onChange={(e) =>
                            setCertForm({ ...certForm, date: e.target.value })
                          }
                          placeholder="e.g. Jul 2025"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Domain Category Tag
                        </label>
                        <select
                          value={certForm.tag}
                          onChange={(e) =>
                            setCertForm({ ...certForm, tag: e.target.value })
                          }
                          className={`w-full px-3 py-2 text-xs rounded border font-mono ${
                            isLumos ? 'bg-white text-black' : 'bg-[#121218] text-white'
                          }`}
                        >
                          <option value="CLOUD & GEN-AI">CLOUD & GEN-AI</option>
                          <option value="DATA ANALYTICS">DATA ANALYTICS</option>
                          <option value="DATA SCIENCE">DATA SCIENCE</option>
                          <option value="SOFTWARE CRAFT">SOFTWARE CRAFT</option>
                          <option value="AI & DEEP LEARNING">AI & DEEP LEARNING</option>
                          <option value="BROADCAST TELEMETRY">BROADCAST TELEMETRY</option>
                        </select>
                      </div>

                      {/* File Upload or Preview */}
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Certificate Document or Badge Image (Optional)
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => certFileInputRef.current?.click()}
                            className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-cinzel font-bold border border-gray-600 hover:bg-gray-700/20 cursor-pointer"
                          >
                            <Upload size={14} />
                            <span>CHOOSE FILE...</span>
                          </button>
                          <input
                            ref={certFileInputRef}
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg,.webp"
                            onChange={handleCertFileUpload}
                            className="hidden"
                          />
                          {certForm.fileData && (
                            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                              <CheckCircle2 size={13} /> Document Attached
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCert(false);
                          setEditingCertId(null);
                        }}
                        className="px-3 py-1.5 text-xs font-cinzel rounded border border-gray-600"
                      >
                        CANCEL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!certForm.title || !certForm.issuer) {
                            alert('Please provide Certificate title and Issuer name.');
                            return;
                          }
                          if (editingCertId) {
                            updateCertificate(editingCertId, certForm);
                            triggerToast('Updated certificate scroll!');
                          } else {
                            addCertificate(certForm);
                            triggerToast('Added certificate scroll!');
                          }
                          setIsAddingCert(false);
                          setEditingCertId(null);
                        }}
                        className="px-4 py-1.5 text-xs font-cinzel font-bold text-white rounded shadow"
                        style={{ backgroundColor: houseStyles.primary }}
                      >
                        {editingCertId ? 'SAVE CERTIFICATE' : 'UPLOAD CERTIFICATE'}
                      </button>
                    </div>
                  </div>
                )}

                {/* List of Verified Certificates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className={`p-3.5 rounded border flex items-center justify-between gap-3 transition-all ${
                        isLumos
                          ? 'bg-white border-[#E2E8F0] hover:border-[#0F172A]'
                          : 'bg-[#0E0E14] border-[#1E1E24] hover:border-[#D4AF37]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-cinzel text-xs font-black">{cert.title}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono-runes opacity-80">
                          <span style={{ color: houseStyles.secondary }}>{cert.issuer}</span>
                          <span>•</span>
                          <span>{cert.date}</span>
                          <span>•</span>
                          <span className="text-emerald-400">{cert.tag}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            soundFx.playWandCast();
                            setEditingCertId(cert.id);
                            setIsAddingCert(false);
                            setCertForm({
                              title: cert.title,
                              issuer: cert.issuer,
                              date: cert.date,
                              tag: cert.tag,
                              certificateUrl: cert.certificateUrl,
                              credentialId: cert.credentialId,
                              fileData: cert.fileData
                            });
                          }}
                          className="p-1.5 rounded border border-gray-600 hover:bg-gray-700/20 text-blue-400"
                          title="Edit certificate"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete certificate "${cert.title}"?`)) {
                              removeCertificate(cert.id);
                              triggerToast('Certificate removed.');
                            }
                          }}
                          className="p-1.5 rounded border border-red-500/40 hover:bg-red-500/20 text-red-400"
                          title="Delete certificate"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset certificates to defaults?')) {
                        resetCertificates();
                        triggerToast('Reset certificates to defaults!');
                      }
                    }}
                    className="text-xs font-cinzel font-bold text-red-400 hover:underline cursor-pointer"
                  >
                    ↻ Reset Certificates to Default
                  </button>
                </div>
              </div>
            )}

            {/* TAB 5: MOVING PORTRAITS (Photo Gallery) */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#2A2A35]">
                  <div>
                    <h3 className="font-cinzel-dec font-black text-lg text-[#FDE047]">
                      ENCHANTED MOVING PORTRAITS VAULT
                    </h3>
                    <p className="font-fell italic text-xs text-[#94A3B8]">
                      Upload personal photos, adjust captions, and configure the interactive B&W-to-color portraits.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      soundFx.playWandCast();
                      setIsAddingPhoto(true);
                      setEditingPhotoId(null);
                      setPhotoForm({
                        title: '',
                        caption: '',
                        date: 'August 2026',
                        location: 'Hogwarts / Mumbai',
                        categoryTag: 'PORTRAIT // NEW',
                        imageUrl: ''
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded text-xs font-cinzel font-bold text-white shadow-md cursor-pointer border hover:scale-105 transition-all"
                    style={{
                      backgroundColor: houseStyles.primary,
                      borderColor: houseStyles.border
                    }}
                  >
                    <Plus size={14} />
                    <span>+ UPLOAD NEW PORTRAIT</span>
                  </button>
                </div>

                {/* Add / Edit Photo Form */}
                {(isAddingPhoto || editingPhotoId) && (
                  <div
                    className={`p-5 rounded border-2 space-y-4 ${
                      isLumos ? 'bg-white border-[#0F172A]' : 'bg-[#101016] border-[#D4AF37]'
                    }`}
                    style={{ borderColor: houseStyles.border }}
                  >
                    <div className="flex items-center justify-between border-b pb-2">
                      <span className="font-cinzel font-black text-sm text-[#FDE047]">
                        {editingPhotoId ? 'EDIT MOVING PORTRAIT' : 'UPLOAD NEW MOVING PORTRAIT'}
                      </span>
                      <button
                        onClick={() => {
                          setIsAddingPhoto(false);
                          setEditingPhotoId(null);
                        }}
                        className="text-gray-400 hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Image Upload / URL Input */}
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Portrait Image (Upload File or Enter Image URL)
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-3">
                          <button
                            type="button"
                            onClick={() => photoFileInputRef.current?.click()}
                            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded text-xs font-cinzel font-bold border border-gray-600 hover:bg-gray-700/20 cursor-pointer"
                          >
                            <Upload size={14} />
                            <span>UPLOAD PHOTO FILE</span>
                          </button>
                          <input
                            ref={photoFileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoFileUpload}
                            className="hidden"
                          />
                          <span className="text-xs opacity-50">OR URL:</span>
                          <input
                            type="text"
                            value={photoForm.imageUrl}
                            onChange={(e) =>
                              setPhotoForm({ ...photoForm, imageUrl: e.target.value })
                            }
                            placeholder="https://... or /images/..."
                            className="flex-1 w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                          />
                        </div>

                        {photoForm.imageUrl && (
                          <div className="mt-3 flex items-center gap-4">
                            <div className="w-20 h-24 rounded border overflow-hidden bg-black">
                              <img
                                src={photoForm.imageUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-xs text-emerald-400 font-mono">
                              ✓ Image ready to save
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Portrait Title
                        </label>
                        <input
                          type="text"
                          value={photoForm.title}
                          onChange={(e) =>
                            setPhotoForm({ ...photoForm, title: e.target.value })
                          }
                          placeholder="e.g. Official Hogwarts Edition Portrait"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Category Badge Tag
                        </label>
                        <input
                          type="text"
                          value={photoForm.categoryTag}
                          onChange={(e) =>
                            setPhotoForm({ ...photoForm, categoryTag: e.target.value })
                          }
                          placeholder="e.g. PORTRAIT // OFFICIAL"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Date Captured
                        </label>
                        <input
                          type="text"
                          value={photoForm.date}
                          onChange={(e) =>
                            setPhotoForm({ ...photoForm, date: e.target.value })
                          }
                          placeholder="e.g. August 2026"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Location
                        </label>
                        <input
                          type="text"
                          value={photoForm.location}
                          onChange={(e) =>
                            setPhotoForm({ ...photoForm, location: e.target.value })
                          }
                          placeholder="e.g. Hogwarts / Mumbai Sanctum"
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                          Caption Note
                        </label>
                        <textarea
                          rows={2}
                          value={photoForm.caption}
                          onChange={(e) =>
                            setPhotoForm({ ...photoForm, caption: e.target.value })
                          }
                          placeholder="Short description..."
                          className="w-full px-3 py-2 text-xs rounded border bg-transparent font-sans-body"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingPhoto(false);
                          setEditingPhotoId(null);
                        }}
                        className="px-3 py-1.5 text-xs font-cinzel rounded border border-gray-600"
                      >
                        CANCEL
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!photoForm.imageUrl || !photoForm.title) {
                            alert('Please provide an image and a title for the portrait.');
                            return;
                          }
                          if (editingPhotoId) {
                            updatePhoto(editingPhotoId, photoForm);
                            triggerToast('Updated moving portrait!');
                          } else {
                            addPhoto(photoForm);
                            triggerToast('Added moving portrait!');
                          }
                          setIsAddingPhoto(false);
                          setEditingPhotoId(null);
                        }}
                        className="px-4 py-1.5 text-xs font-cinzel font-bold text-white rounded shadow"
                        style={{ backgroundColor: houseStyles.primary }}
                      >
                        {editingPhotoId ? 'SAVE PORTRAIT' : 'SAVE & ENCHANT'}
                      </button>
                    </div>
                  </div>
                )}

                {/* List of Photos with Moving Portrait Hover Test */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {photos.map((photo) => (
                    <div
                      key={photo.id}
                      className={`p-3 rounded border flex flex-col justify-between transition-all group ${
                        isLumos
                          ? 'bg-white border-[#E2E8F0]'
                          : 'bg-[#0E0E14] border-[#1E1E24]'
                      }`}
                    >
                      <div>
                        {/* Thumbnail with B&W to Color Lumos Hover */}
                        <div className="relative aspect-[4/5] rounded overflow-hidden mb-2 bg-black border border-white/10">
                          <img
                            src={photo.imageUrl}
                            alt={photo.title}
                            className="w-full h-full object-cover magical-portrait-bw"
                          />
                          <div className="absolute top-1 left-1 bg-black/80 px-1.5 py-0.5 rounded text-[8px] font-mono-runes text-white">
                            {photo.categoryTag}
                          </div>
                        </div>

                        <h4 className="font-cinzel text-xs font-black line-clamp-1">{photo.title}</h4>
                        <p className="font-fell italic text-[11px] opacity-70 line-clamp-2 mt-0.5">
                          {photo.caption}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 mt-2 border-t text-[10px]">
                        <span className="font-mono opacity-60">{photo.date}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              soundFx.playWandCast();
                              setEditingPhotoId(photo.id);
                              setIsAddingPhoto(false);
                              setPhotoForm({
                                title: photo.title,
                                caption: photo.caption,
                                date: photo.date,
                                location: photo.location,
                                categoryTag: photo.categoryTag,
                                imageUrl: photo.imageUrl
                              });
                            }}
                            className="p-1 rounded border border-gray-600 hover:bg-gray-700/20 text-blue-400"
                            title="Edit photo"
                          >
                            <Edit2 size={11} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete portrait "${photo.title}"?`)) {
                                removePhoto(photo.id);
                                triggerToast('Portrait deleted.');
                              }
                            }}
                            className="p-1 rounded border border-red-500/40 hover:bg-red-500/20 text-red-400"
                            title="Delete photo"
                          >
                            <Trash2 size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset gallery portraits to default Atharva photos?')) {
                        resetPhotos();
                        triggerToast('Reset photos to default!');
                      }
                    }}
                    className="text-xs font-cinzel font-bold text-red-400 hover:underline cursor-pointer"
                  >
                    ↻ Reset Gallery to Atharva's Default Portraits
                  </button>
                </div>
              </div>
            )}

            {/* TAB 6: SKILLS & RESEARCH */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#2A2A35]">
                  <h3 className="font-cinzel-dec font-black text-lg text-[#FDE047]">
                    SKILLS & PEER-REVIEWED RESEARCH
                  </h3>
                  <p className="font-fell italic text-xs text-[#94A3B8]">
                    Configure skill domains, add or remove technical proficiencies, and update publication records.
                  </p>
                </div>

                {/* Published Research Paper Editor */}
                <div className={`p-4 rounded border ${
                  isLumos ? 'bg-white border-[#CBD5E1]' : 'bg-[#101016] border-[#2A2A35]'
                }`}>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#2A2A35]">
                    <span className="font-cinzel text-xs font-black uppercase text-[#D4AF37]">
                      PEER-REVIEWED PUBLICATION RECORD
                    </span>
                    <button
                      onClick={() => {
                        updatePublication(pubForm);
                        triggerToast('Updated publication records!');
                      }}
                      className="px-3 py-1 text-xs font-cinzel font-bold rounded text-white shadow"
                      style={{ backgroundColor: houseStyles.primary }}
                    >
                      SAVE PUBLICATION
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                        Paper Title
                      </label>
                      <input
                        type="text"
                        value={pubForm.title}
                        onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded border bg-transparent font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                        Journal / Conference
                      </label>
                      <input
                        type="text"
                        value={pubForm.journal}
                        onChange={(e) => setPubForm({ ...pubForm, journal: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded border bg-transparent font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                        Publication Date
                      </label>
                      <input
                        type="text"
                        value={pubForm.date}
                        onChange={(e) => setPubForm({ ...pubForm, date: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded border bg-transparent font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-cinzel uppercase font-bold mb-1 opacity-80">
                        Synopsis / Abstract Summary
                      </label>
                      <textarea
                        rows={2}
                        value={pubForm.synopsis}
                        onChange={(e) => setPubForm({ ...pubForm, synopsis: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded border bg-transparent font-sans-body"
                      />
                    </div>
                  </div>
                </div>

                {/* Skill Categories Matrix */}
                <div className="space-y-4">
                  <span className="font-cinzel text-xs font-black uppercase text-[#D4AF37]">
                    SKILL CATEGORIES & RUNES
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillCategories.map((cat, catIdx) => (
                      <div
                        key={catIdx}
                        className={`p-3.5 rounded border ${
                          isLumos ? 'bg-white border-[#E2E8F0]' : 'bg-[#0E0E14] border-[#1E1E24]'
                        }`}
                      >
                        <div className="flex items-center justify-between pb-2 mb-2 border-b">
                          <span className="font-cinzel text-xs font-bold" style={{ color: houseStyles.secondary }}>
                            {cat.category}
                          </span>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete category "${cat.category}"?`)) {
                                deleteSkillCategory(catIdx);
                                triggerToast('Category deleted.');
                              }
                            }}
                            className="text-red-400 hover:text-red-300 text-xs"
                            title="Delete category"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {cat.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="px-2 py-0.5 rounded text-[10px] bg-gray-800 text-gray-300 font-mono flex items-center gap-1"
                            >
                              {skill}
                              <button
                                onClick={() => {
                                  const updated = skillCategories.map((c, i) =>
                                    i === catIdx
                                      ? { ...c, skills: c.skills.filter((_, idx) => idx !== sIdx) }
                                      : c
                                  );
                                  updateSkillCategories(updated);
                                }}
                                className="text-gray-400 hover:text-white"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Category */}
                  <div className={`p-4 rounded border ${
                    isLumos ? 'bg-[#F8FAFC] border-[#CBD5E1]' : 'bg-[#121218] border-[#2A2A35]'
                  }`}>
                    <span className="font-cinzel text-xs font-bold block mb-2">
                      + ADD NEW SKILL CATEGORY
                    </span>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        placeholder="Category Name (e.g. DEVOPS & KUBERNETES)"
                        className="px-3 py-1.5 text-xs rounded border bg-transparent font-mono flex-1"
                      />
                      <input
                        type="text"
                        value={newCatSkills}
                        onChange={(e) => setNewCatSkills(e.target.value)}
                        placeholder="Skills separated by commas (e.g. Docker, K8s, CI/CD)"
                        className="px-3 py-1.5 text-xs rounded border bg-transparent font-mono flex-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!newCatName.trim()) return;
                          const parsedSkills = newCatSkills
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean);
                          addSkillCategory({
                            category: newCatName.toUpperCase(),
                            skills: parsedSkills
                          });
                          setNewCatName('');
                          setNewCatSkills('');
                          triggerToast('Added new skill category!');
                        }}
                        className="px-4 py-1.5 text-xs font-cinzel font-bold rounded text-white"
                        style={{ backgroundColor: houseStyles.primary }}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (window.confirm('Reset skills & research to defaults?')) {
                        resetSkills();
                        resetPublication();
                        triggerToast('Reset skills to defaults!');
                      }
                    }}
                    className="text-xs font-cinzel font-bold text-red-400 hover:underline cursor-pointer"
                  >
                    ↻ Reset Skills & Research to Default
                  </button>
                </div>
              </div>
            )}

            {/* TAB 7: THEME & MAGIC STUDIO */}
            {activeTab === 'theme' && (
              <div className="space-y-6 max-w-2xl">
                <div className="pb-3 border-b border-[#2A2A35]">
                  <h3 className="font-cinzel-dec font-black text-lg text-[#FDE047]">
                    HOGWARTS THEME & SENSORY STUDIO
                  </h3>
                  <p className="font-fell italic text-xs text-[#94A3B8]">
                    Control illumination spells (Lumos/Nox), house allegiance palettes, magical sounds, and ambient score.
                  </p>
                </div>

                {/* Lumos / Nox Mode */}
                <div className={`p-4 rounded border flex items-center justify-between ${
                  isLumos ? 'bg-white border-[#CBD5E1]' : 'bg-[#101016] border-[#2A2A35]'
                }`}>
                  <div>
                    <span className="font-cinzel text-xs font-black block">
                      ILLUMINATION SPELL (LIGHT / DARK)
                    </span>
                    <span className="text-[11px] opacity-75">
                      Currently active: <strong className="uppercase" style={{ color: houseStyles.secondary }}>{themeMode === 'lumos' ? 'Lumos (Parchment Light)' : 'Nox (Midnight Dark)'}</strong>
                    </span>
                  </div>
                  <button
                    onClick={toggleLumosNox}
                    className="px-4 py-2 rounded text-xs font-cinzel font-bold border transition-all cursor-pointer shadow-md"
                    style={{
                      backgroundColor: isLumos ? '#0F172A' : '#D4AF37',
                      color: isLumos ? '#FFFFFF' : '#000000',
                      borderColor: houseStyles.border
                    }}
                  >
                    {isLumos ? 'CAST NOX 🌙' : 'CAST LUMOS ☀️'}
                  </button>
                </div>

                {/* House Theme Alignment */}
                <div className={`p-4 rounded border space-y-3 ${
                  isLumos ? 'bg-white border-[#CBD5E1]' : 'bg-[#101016] border-[#2A2A35]'
                }`}>
                  <span className="font-cinzel text-xs font-black block">
                    HOGWARTS HOUSE ALLEGIANCE PALETTE
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['gryffindor', 'ravenclaw', 'slytherin', 'hufflepuff'] as HouseTheme[]).map((house) => {
                      const isSelected = houseTheme === house;
                      const houseIcons = { gryffindor: '🦁', ravenclaw: '🦅', slytherin: '🐍', hufflepuff: '🦡' };
                      return (
                        <button
                          key={house}
                          onClick={() => setHouse(house)}
                          className={`p-3 rounded border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'scale-105 font-black text-white shadow-lg border-white'
                              : 'opacity-70 hover:opacity-100'
                          }`}
                          style={{
                            backgroundColor:
                              house === 'gryffindor'
                                ? '#991B1B'
                                : house === 'ravenclaw'
                                ? '#0284C7'
                                : house === 'slytherin'
                                ? '#059669'
                                : '#D97706'
                          }}
                        >
                          <span className="text-xl block">{houseIcons[house]}</span>
                          <span className="font-cinzel text-[10px] uppercase font-bold tracking-wider text-white">
                            {house}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Audio & Ambient Music */}
                <div className={`p-4 rounded border space-y-3 ${
                  isLumos ? 'bg-white border-[#CBD5E1]' : 'bg-[#101016] border-[#2A2A35]'
                }`}>
                  <span className="font-cinzel text-xs font-black block">
                    AUDIO & SENSORY ENVIRONMENT
                  </span>
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-xs font-bold block">Hogwarts Ambient Synthesizer Music</span>
                      <span className="text-[10px] opacity-70">Gentle generative Web Audio ambient chords</span>
                    </div>
                    <button
                      onClick={toggleBgMusic}
                      className={`px-3 py-1.5 text-xs font-cinzel font-bold rounded border cursor-pointer ${
                        bgMusicEnabled
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-gray-800 text-gray-400 border-gray-700'
                      }`}
                    >
                      {bgMusicEnabled ? 'PLAYING 🎵' : 'MUTED 🔇'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
                    <div>
                      <span className="text-xs font-bold block">Scroll Reveal Animations</span>
                      <span className="text-[10px] opacity-70">Smooth fade-in on scroll triggers</span>
                    </div>
                    <button
                      onClick={toggleScrollAnimations}
                      className={`px-3 py-1.5 text-xs font-cinzel font-bold rounded border cursor-pointer ${
                        scrollAnimationsEnabled
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                          : 'bg-gray-800 text-gray-400 border-gray-700'
                      }`}
                    >
                      {scrollAnimationsEnabled ? 'ENABLED ✨' : 'DISABLED'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Universal Ministry Security Passcode Lock Modal */}
      <MinistrySecurityModal
        isOpen={secModal.isOpen}
        actionTitle={secModal.actionTitle}
        onClose={() => setSecModal({ ...secModal, isOpen: false })}
        onSuccess={secModal.action}
      />
    </div>
  );
};
