import React, { useState } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { Briefcase, Calendar, MapPin, GraduationCap, Filter } from 'lucide-react';
import { RubberStamp } from './StampBadge';

export const CareerChronicles: React.FC = () => {
  const { themeMode, getHouseColor, careerRoles, personalInfo } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const filterTabs: string[] = [
    'ALL',
    'MEDIA & BROADCAST',
    'ACADEMIC',
    'AI & SOFTWARE'
  ];

  const filteredRoles = selectedFilter === 'ALL'
    ? careerRoles
    : careerRoles.filter((role) => role.category === selectedFilter);

  const handleFilterClick = (cat: string) => {
    soundFx.playWandCast();
    setSelectedFilter(cat);
  };

  return (
    <section id="chronicles" className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b transition-colors duration-500 ${
      isLumos ? 'border-[#CBD5E1] bg-[#FFFFFF]' : 'border-[#1E1E24] bg-[#000000]'
    }`}>
      {/* Chapter Editorial Header Block */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b ${
        isLumos ? 'border-[#8B0000]' : 'border-[#1E1E24]'
      }`}
      style={{ borderColor: houseStyles.border }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-cinzel font-bold tracking-widest uppercase mb-1" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
            <Briefcase size={14} />
            <span>CHAPTER 02 // MINISTRY FIELD CHRONICLES & HOGWARTS ARCHIVES</span>
          </div>
          <h2 className={`font-cinzel-dec text-3xl sm:text-5xl font-black uppercase ${
            isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'
          }`}>
            CAREER CHRONICLES
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <RubberStamp label="EXPERIENCE VERIFIED" subLabel="MINISTRY OF MAGIC" variant="wax-crimson" angle={2} />
        </div>
      </div>

      {/* Filter Tab Pills */}
      <div className="flex items-center gap-2 pb-6 overflow-x-auto select-none">
        <span className={`font-cinzel text-xs font-bold flex items-center gap-1 mr-2 ${isLumos ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
          <Filter size={12} style={{ color: houseStyles.primary }} /> DIVINATION FILTER:
        </span>
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleFilterClick(tab)}
            className={`px-3.5 py-1.5 rounded text-xs font-cinzel font-black tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
              selectedFilter === tab
                ? 'shadow-md scale-105'
                : isLumos
                ? 'glass-sub-lumos text-[#090D16] hover:bg-white'
                : 'glass-sub-nox text-[#CBD5E1] hover:text-white hover:bg-white/10'
            }`}
            style={{
              borderColor: selectedFilter === tab ? houseStyles.border : undefined,
              backgroundColor: selectedFilter === tab ? houseStyles.primary : undefined,
              color: selectedFilter === tab ? '#FFFFFF' : undefined
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Timeline Cards, Right Education Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Timeline Dossier Cards (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className={`relative p-6 sm:p-7 rounded-sm transition-all group ${
                isLumos
                  ? 'glass-card-lumos hover:border-[#8B0000]'
                  : 'glass-card-nox hover:border-[#D4AF37]'
              }`}
            >
              {/* Top Meta Strip */}
              <div className={`flex flex-wrap items-center justify-between gap-2 pb-4 border-b ${
                isLumos ? 'border-slate-200/80' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-2">
                  <span
                    className="font-cinzel text-[10px] font-black uppercase px-2.5 py-0.5 rounded border"
                    style={{
                      backgroundColor: isLumos ? `${houseStyles.primary}15` : `${houseStyles.primary}25`,
                      borderColor: houseStyles.border,
                      color: isLumos ? houseStyles.primary : houseStyles.secondary
                    }}
                  >
                    {role.statusBadge}
                  </span>
                  <span className={`font-mono-runes text-xs font-black ${isLumos ? 'text-[#090D16]' : 'text-[#F1F5F9]'}`}>
                    {role.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono-runes">
                  <span className="flex items-center gap-1 font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                    <Calendar size={12} /> {role.period}
                  </span>
                  <span className="opacity-40 hidden sm:inline">•</span>
                  <span className={`hidden sm:flex items-center gap-1 font-black ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
                    <MapPin size={12} /> {role.location}
                  </span>
                </div>
              </div>

              {/* Role Title & Guild */}
              <div className="my-4 space-y-1">
                <h3 className={`font-cinzel-dec text-xl sm:text-2xl font-black group-hover:underline transition-colors ${
                  isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
                }`}>
                  {role.role}
                </h3>
                <h4 className="font-fell italic text-sm sm:text-base font-bold" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  {role.organization}
                </h4>
              </div>

              {/* Responsibilities Bullets */}
              <div className="space-y-2.5 my-4">
                {role.description.map((desc, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] font-sans-body">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: houseStyles.primary }}></span>
                    <p className={`leading-relaxed font-bold ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Skills Runes Matrix */}
              <div className={`pt-4 border-t flex flex-wrap items-center gap-1.5 ${
                isLumos ? 'border-slate-300' : 'border-white/20'
              }`}>
                <span className={`font-cinzel text-[10px] mr-2 uppercase font-black ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                  SKILL RUNES:
                </span>
                {role.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-0.5 rounded font-mono-runes text-[10px] font-black transition-all ${
                      isLumos
                        ? 'glass-sub-lumos text-[#000000] hover:border-[#8B0000]'
                        : 'glass-sub-nox text-[#FFFFFF] hover:border-[#D4AF37]'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Hogwarts Academic Credentials (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Main Degree Spotlight Card */}
          <div className={`p-6 rounded-sm transition-all ${
            isLumos
              ? 'glass-card-lumos'
              : 'glass-card-nox'
          }`}
          style={{ borderColor: isLumos ? undefined : `${houseStyles.border}50` }}
          >
            <div className={`flex items-center justify-between pb-3 border-b ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <span className="font-cinzel text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                <GraduationCap size={15} /> ACADEMIC HONORS
              </span>
              <span className="font-mono-runes text-[10px] text-[#059669] font-black">
                {personalInfo.educationSummary.honors || 'CAPSTONE 2025'}
              </span>
            </div>

            {/* University & Degree */}
            <div className="mt-4 space-y-2">
              <span className={`font-mono-runes text-[10px] font-bold block ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                {personalInfo.educationSummary.period}
              </span>
              <h4 className={`font-cinzel text-lg font-black ${
                isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
              }`}>
                {personalInfo.educationSummary.degree}
              </h4>
              <p className="font-fell italic text-xs sm:text-sm font-bold" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                {personalInfo.educationSummary.college}
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-cinzel text-xs font-black px-2 py-0.5 rounded border" style={{
                  color: isLumos ? houseStyles.primary : houseStyles.secondary,
                  backgroundColor: `${houseStyles.primary}15`,
                  borderColor: houseStyles.border
                }}>
                  GPA: {personalInfo.educationSummary.gpa}
                </span>
                <span className={`font-mono-runes text-[10px] font-bold ${isLumos ? 'text-[#090D16]' : 'text-[#E2E8F0]'}`}>
                  {personalInfo.educationSummary.location}
                </span>
              </div>
            </div>

            {/* Prior Education Timeline */}
            <div className={`mt-6 pt-4 border-t space-y-4 ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <span className={`font-cinzel text-[10px] uppercase tracking-wider block font-black ${isLumos ? 'text-[#090D16]' : 'text-[#E2E8F0]'}`}>
                PRIOR SCHOLASTIC DISTINCTIONS
              </span>

              {personalInfo.educationSummary.prior.map((item, idx) => (
                <div key={idx} className={`p-3 rounded space-y-1 transition-all ${
                  isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
                }`}>
                  <div className="flex justify-between items-center">
                    <span className={`font-cinzel text-[11px] font-black ${
                      isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
                    }`}>
                      {item.qualification}
                    </span>
                    <span className="font-mono-runes text-[10px] font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                      GPA: {item.gpa}
                    </span>
                  </div>
                  <p className={`text-[11px] font-fell italic font-semibold ${
                    isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
                  }`}>
                    {item.institution}
                  </p>
                  <span className={`font-mono-runes text-[9px] font-bold block ${isLumos ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                    {item.period}
                  </span>
                </div>
              ))}
            </div>

            {/* Vintage Academic Stamp */}
            <div className={`mt-6 pt-4 border-t flex justify-center ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <RubberStamp label="HOGWARTS MERIT" subLabel="ENGINEERING GRADUATE" variant="wax-gold" angle={-2} />
            </div>
          </div>

          {/* Quick Stats Box */}
          <div className={`p-5 rounded-sm font-cinzel text-xs space-y-3 ${
            isLumos ? 'glass-card-lumos' : 'glass-card-nox'
          }`}>
            <div className={`flex justify-between items-center ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
              <span className="font-bold">CORE DISCIPLINES:</span>
              <span className={`font-black ${isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'}`}>
                ELECTRONICS & CS
              </span>
            </div>
            <div className={`flex justify-between items-center ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
              <span className="font-bold">RESEARCH PUBLICATION:</span>
              <span className="text-[#059669] font-black">1 PEER-REVIEWED</span>
            </div>
            <div className={`flex justify-between items-center ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
              <span className="font-bold">MINISTRY CERTIFICATIONS:</span>
              <span className="font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>VERIFIED ACCREDITED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
