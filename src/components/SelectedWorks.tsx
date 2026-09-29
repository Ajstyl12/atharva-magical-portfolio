import React, { useState } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { ArrowUpRight, Cpu, CheckCircle, Wand2 } from 'lucide-react';
import { RubberStamp } from './StampBadge';

type ProjectTab = 'OVERVIEW' | 'ARCHITECTURE' | 'IMPACT & STACK';

export const SelectedWorks: React.FC = () => {
  const { themeMode, getHouseColor, projects } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<ProjectTab>('OVERVIEW');

  const safeIndex = (activeProjectIndex >= 0 && activeProjectIndex < projects.length) ? activeProjectIndex : 0;
  const currentProject = projects[safeIndex] || projects[0];

  const handleSelectProject = (index: number) => {
    soundFx.playWandCast();
    setActiveProjectIndex(index);
  };

  const handleTabChange = (tab: ProjectTab) => {
    soundFx.playPageTurn();
    setActiveTab(tab);
  };

  return (
    <section id="works" className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b transition-colors duration-500 ${
      isLumos ? 'border-[#CBD5E1] bg-[#FFFFFF]' : 'border-[#1E1E24] bg-[#000000]'
    }`}>
      {/* Chapter Masthead */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b ${
        isLumos ? 'border-[#8B0000]' : 'border-[#1E1E24]'
      }`}
      style={{ borderColor: houseStyles.border }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-cinzel font-bold tracking-widest uppercase mb-1" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
            <Wand2 size={14} />
            <span>CHAPTER 03 // ENCHANTED ARTIFACTS & SYSTEM BLUEPRINTS</span>
          </div>
          <h2 className={`font-cinzel-dec text-3xl sm:text-5xl font-black uppercase ${
            isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'
          }`}>
            ENCHANTED WORKS
          </h2>
        </div>

        {/* Project Selector Mini-Pills */}
        <div className="flex items-center gap-2 overflow-x-auto select-none">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => handleSelectProject(idx)}
              className={`px-3 py-1.5 rounded font-cinzel text-xs font-black transition-all whitespace-nowrap cursor-pointer border ${
                activeProjectIndex === idx
                  ? 'text-[#FFFFFF] font-black shadow-md scale-105'
                  : isLumos
                  ? 'glass-sub-lumos text-[#090D16] hover:bg-white'
                  : 'glass-sub-nox text-[#CBD5E1] hover:text-white hover:bg-white/10'
              }`}
              style={{
                backgroundColor: activeProjectIndex === idx ? houseStyles.primary : undefined,
                borderColor: activeProjectIndex === idx ? houseStyles.border : undefined,
                color: activeProjectIndex === idx ? '#FFFFFF' : undefined
              }}
            >
              0{idx + 1}. {proj.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Showcase Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Title, Issue Tag, Thesis Quote & Actions (5 cols) */}
        <div className={`lg:col-span-5 p-7 sm:p-8 rounded-sm flex flex-col justify-between relative group transition-all duration-300 ${
          isLumos
            ? 'glass-card-lumos'
            : 'glass-card-nox'
        }`}
        style={{ borderColor: isLumos ? undefined : `${houseStyles.border}50` }}
        >
          <div>
            {/* Top Issue Identifier */}
            <div className={`flex items-center justify-between pb-3 border-b ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <span className="font-cinzel text-xs font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                {currentProject.issueCode}
              </span>
              <span className={`font-mono-runes text-[11px] font-black ${isLumos ? 'text-[#090D16]' : 'text-[#E2E8F0]'}`}>
                {currentProject.period}
              </span>
            </div>

            {/* Project Title */}
            <div className="mt-5 space-y-2">
              <h3 className={`font-cinzel-dec text-2xl sm:text-4xl font-black leading-tight ${
                isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
              }`}>
                {currentProject.title}
              </h3>
              <p className="font-fell italic text-xs sm:text-sm font-bold" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                {currentProject.domain}
              </p>
            </div>

            {/* Featured Editorial Quote Box */}
            <div
              className={`my-6 p-4 border-l-4 rounded-r transition-all ${
                isLumos ? 'glass-sub-lumos border-slate-300' : 'glass-sub-nox border-white/10'
              }`}
              style={{ borderLeftColor: houseStyles.primary }}
            >
              <span className="font-cinzel text-[9px] uppercase tracking-widest block mb-1 font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                // ARCHITECTURAL SPELL THESIS
              </span>
              <p className={`font-fell italic text-sm sm:text-base leading-relaxed font-bold ${
                isLumos ? 'text-[#090D16]' : 'text-[#F1F5F9]'
              }`}>
                "{currentProject.quote}"
              </p>
            </div>
          </div>

          {/* Bottom Actions & Vintage Stamp Overlay */}
          <div className={`space-y-4 pt-4 border-t ${
            isLumos ? 'border-slate-200/80' : 'border-white/10'
          }`}>
            <div className="flex items-center justify-between">
              <RubberStamp
                label={currentProject.stampText}
                variant={activeProjectIndex % 2 === 0 ? 'wax-crimson' : 'wax-gold'}
                angle={-2}
              />
              <span className={`font-mono-runes text-[10px] font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                REV. 2026.01
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href={currentProject.githubUrl || "https://github.com/atharvabagwe30"}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playWandCast()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-cinzel font-black uppercase rounded border transition-all shadow-sm hover:scale-105 active:scale-95"
                style={{ backgroundColor: houseStyles.primary, color: '#FFFFFF', borderColor: houseStyles.border }}
              >
                <ArrowUpRight size={13} />
                <span>SOURCE RUNES</span>
              </a>

              <button
                onClick={() => handleTabChange('ARCHITECTURE')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded font-cinzel text-xs font-black transition-all cursor-pointer ${
                  isLumos
                    ? 'glass-sub-lumos hover:bg-white text-[#090D16]'
                    : 'glass-sub-nox text-[#E2E8F0] hover:text-white hover:bg-white/10'
                }`}
              >
                <Cpu size={13} style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }} />
                <span>SYSTEM BLUEPRINTS ↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Tabbed Workspace (7 cols) */}
        <div className={`lg:col-span-7 p-7 sm:p-8 rounded-sm flex flex-col justify-between transition-all duration-300 ${
          isLumos
            ? 'glass-card-lumos'
            : 'glass-card-nox'
        }`}>
          <div>
            {/* Tab Navigation Header */}
            <div className={`flex items-center justify-between pb-4 border-b overflow-x-auto ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <div className="flex items-center gap-2">
                {(['OVERVIEW', 'ARCHITECTURE', 'IMPACT & STACK'] as ProjectTab[]).map((tab, idx) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-3 py-1.5 font-cinzel text-xs font-black rounded transition-all cursor-pointer ${
                      activeTab === tab
                        ? 'text-[#FFFFFF] shadow-sm border'
                        : isLumos
                        ? 'glass-sub-lumos text-[#090D16] hover:bg-white'
                        : 'glass-sub-nox text-[#CBD5E1] hover:text-white hover:bg-white/10'
                    }`}
                    style={{
                      backgroundColor: activeTab === tab ? houseStyles.primary : undefined,
                      borderColor: activeTab === tab ? houseStyles.border : undefined,
                      color: activeTab === tab ? '#FFFFFF' : undefined
                    }}
                  >
                    0{idx + 1} / {tab}
                  </button>
                ))}
              </div>
              <span className={`font-mono-runes text-[10px] font-black hidden sm:inline ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                INTERACTIVE GRIMOIRE VIEW
              </span>
            </div>

            {/* Dynamic Tab 01: OVERVIEW */}
            {activeTab === 'OVERVIEW' && (
              <div className="py-5 space-y-5">
                <div>
                  <span className="font-cinzel text-[10px] uppercase tracking-wider block mb-1 font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                    EXECUTIVE SUMMARY & PROBLEM STATEMENT
                  </span>
                  <p className={`font-sans-body text-sm sm:text-[15px] leading-relaxed font-bold ${
                    isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'
                  }`}>
                    {currentProject.overview}
                  </p>
                </div>

                {/* Key Metrics / Stat Callout Grid */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className={`p-4 rounded transition-all ${
                    isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
                  }`}>
                    <span className={`font-cinzel text-[10px] uppercase block font-black ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                      {currentProject.impactAndMetrics.stat1.label}
                    </span>
                    <span className="font-cinzel-dec text-2xl sm:text-3xl font-black block mt-1" style={{ color: houseStyles.primary }}>
                      {currentProject.impactAndMetrics.stat1.value}
                    </span>
                  </div>
                  <div className={`p-4 rounded transition-all ${
                    isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
                  }`}>
                    <span className={`font-cinzel text-[10px] uppercase block font-black ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                      {currentProject.impactAndMetrics.stat2.label}
                    </span>
                    <span className="font-cinzel-dec text-2xl sm:text-3xl font-black block mt-1" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                      {currentProject.impactAndMetrics.stat2.value}
                    </span>
                  </div>
                </div>

                <div className={`p-3.5 rounded flex items-start gap-2 text-xs sm:text-[13px] font-sans-body font-bold transition-all ${
                  isLumos ? 'glass-sub-lumos text-[#000000]' : 'glass-sub-nox text-[#FFFFFF]'
                }`}>
                  <CheckCircle size={15} className="text-[#059669] mt-0.5 shrink-0" />
                  <span>{currentProject.impactAndMetrics.keyTakeaway}</span>
                </div>
              </div>
            )}

            {/* Dynamic Tab 02: ARCHITECTURE */}
            {activeTab === 'ARCHITECTURE' && (
              <div className="py-5 space-y-5">
                <div>
                  <span className="font-cinzel text-[10px] uppercase tracking-wider block mb-2 font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                    SYSTEM PIPELINE & DATA FLOW
                  </span>
                  <div className="space-y-2 font-mono-runes text-xs">
                    {currentProject.architectureDetails.systemFlow.map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded flex items-center gap-3 font-semibold transition-all ${
                          isLumos
                            ? 'glass-sub-lumos text-[#090D16]'
                            : 'glass-sub-nox text-[#F1F5F9]'
                        }`}
                      >
                        <span className="font-black" style={{ color: houseStyles.primary }}>0{idx + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className={`font-cinzel text-[10px] uppercase tracking-wider block mb-2 font-black ${isLumos ? 'text-[#090D16]' : 'text-[#E2E8F0]'}`}>
                    CORE SYSTEM COMPONENTS
                  </span>
                  <ul className={`space-y-1.5 font-sans-body text-xs sm:text-[13px] font-semibold ${
                    isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
                  }`}>
                    {currentProject.architectureDetails.coreComponents.map((comp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-black font-cinzel" style={{ color: houseStyles.primary }}>✦</span>
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Dynamic Tab 03: IMPACT & STACK */}
            {activeTab === 'IMPACT & STACK' && (
              <div className="py-5 space-y-5">
                <div>
                  <span className={`font-cinzel text-[10px] uppercase tracking-wider block mb-2 font-black ${isLumos ? 'text-[#090D16]' : 'text-[#E2E8F0]'}`}>
                    TECHNOLOGY STACK & RUNIC INTEGRATIONS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-3 py-1.5 rounded font-mono-runes text-xs font-black transition-all ${
                          isLumos
                            ? 'glass-sub-lumos text-[#090D16] hover:border-[#8B0000]'
                            : 'glass-sub-nox text-[#F8FAFC] hover:border-[#D4AF37]'
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded space-y-3 font-mono-runes text-xs font-semibold transition-all ${
                  isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
                }`}>
                  <div className={`flex justify-between items-center pb-2 border-b ${
                    isLumos ? 'border-slate-200/80 text-[#1E293B]' : 'border-white/10 text-[#CBD5E1]'
                  }`}>
                    <span className="font-bold">DEPLOYMENT STATE:</span>
                    <span className="text-[#059669] font-black">READY / REPRODUCIBLE</span>
                  </div>
                  <div className={`flex justify-between items-center pb-2 border-b ${
                    isLumos ? 'border-slate-200/80 text-[#1E293B]' : 'border-white/10 text-[#CBD5E1]'
                  }`}>
                    <span className="font-bold">REPOSITORY ACCESS:</span>
                    <span className="font-black text-[#090D16]">PUBLIC GITHUB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`font-bold ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>ARCHITECTURE REVIEW:</span>
                    <span className="font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>PASS // ZERO DRIFT</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Pagination Strip */}
          <div className={`pt-4 border-t flex items-center justify-between text-xs font-cinzel ${
            isLumos ? 'border-slate-200/80 text-[#1E293B]' : 'border-white/10 text-[#CBD5E1]'
          }`}>
            <span className="font-black">ARTIFACT {safeIndex + 1} OF {projects.length}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSelectProject((safeIndex - 1 + projects.length) % projects.length)}
                className={`px-3 py-1 rounded cursor-pointer font-black transition-all ${
                  isLumos ? 'glass-sub-lumos hover:bg-white text-[#090D16]' : 'glass-sub-nox text-white hover:bg-white/20'
                }`}
              >
                PREV ‹
              </button>
              <button
                onClick={() => handleSelectProject((safeIndex + 1) % projects.length)}
                className={`px-3 py-1 rounded cursor-pointer font-black transition-all ${
                  isLumos ? 'glass-sub-lumos hover:bg-white text-[#090D16]' : 'glass-sub-nox text-white hover:bg-white/20'
                }`}
              >
                NEXT ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
