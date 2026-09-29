import React from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { Award, FileCheck, Globe, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';
import { RubberStamp } from './StampBadge';

export const SpecimenCredentials: React.FC = () => {
  const { themeMode, getHouseColor, certificates, skillCategories, publication, languages } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  return (
    <section id="specimens" className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b transition-colors duration-500 ${
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
            <Award size={14} />
            <span>CHAPTER 05 // MINISTRY ACCREDITATIONS & RESEARCH SCROLL</span>
          </div>
          <h2 className={`font-cinzel-dec text-3xl sm:text-5xl font-black uppercase ${
            isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'
          }`}>
            ACCREDITATIONS & RESEARCH
          </h2>
        </div>

        {/* Verified Status Badges */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-cinzel font-black border"
            style={{
              backgroundColor: isLumos ? `${houseStyles.primary}15` : `${houseStyles.primary}20`,
              borderColor: houseStyles.border,
              color: isLumos ? houseStyles.primary : houseStyles.secondary
            }}
          >
            <ShieldCheck size={14} style={{ color: houseStyles.primary }} />
            <span>{certificates.length} VERIFIED CREDENTIALS</span>
          </div>
          <RubberStamp label="PEER REVIEWED" subLabel="IRJMETS 2025" variant="wax-crimson" angle={-1} />
        </div>
      </div>

      {/* Featured Publication Spotlight Box */}
      <div className={`p-6 sm:p-8 rounded-sm mb-10 relative overflow-hidden transition-all duration-300 ${
        isLumos
          ? 'glass-card-lumos'
          : 'glass-card-nox'
      }`}
      style={{ borderColor: isLumos ? undefined : `${houseStyles.border}50` }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-[10px] text-white px-2.5 py-0.5 rounded font-black uppercase tracking-wider shadow-sm"
                style={{ backgroundColor: houseStyles.primary }}
              >
                {publication.badge}
              </span>
              <span className="font-mono-runes text-xs font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                {publication.date}
              </span>
            </div>

            <h3 className={`font-cinzel text-xl sm:text-2xl font-black leading-snug ${
              isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
            }`}>
              "{publication.title}"
            </h3>

            <p className="font-fell italic text-sm font-bold" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
              Published in: <span className="underline">{publication.journal}</span>
            </p>

            <p className={`font-sans-body text-xs sm:text-[13px] leading-relaxed font-semibold ${
              isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
            }`}>
              {publication.synopsis}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center lg:items-end gap-3 w-full lg:w-auto">
            <div className={`p-3 rounded font-cinzel text-[11px] text-center w-full sm:w-auto transition-all ${
              isLumos ? 'glass-sub-lumos text-[#090D16]' : 'glass-sub-nox text-[#F8FAFC]'
            }`}>
              <span className="font-black block">INDEXED RESEARCH</span>
              <span className="font-bold" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>VOL. 07 // MAY 2025</span>
            </div>
            <a
              href="#colophon"
              onClick={() => soundFx.playWandCast()}
              className="w-full sm:w-auto text-center px-4 py-2 text-xs font-cinzel font-black uppercase rounded transition-all shadow-md hover:scale-105"
              style={{
                backgroundColor: houseStyles.primary,
                color: '#FFFFFF',
                borderColor: houseStyles.border
              }}
            >
              INQUIRE CITATION ↗
            </a>
          </div>
        </div>
      </div>

      {/* Grid: Left Certifications (5 cols), Right Skill Matrix (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Certifications Ledger (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`flex items-center justify-between pb-2 border-b ${
            isLumos ? 'border-slate-200/80' : 'border-white/10'
          }`}>
            <span className="font-cinzel text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
              <FileCheck size={14} /> MINISTRY ACCREDITATIONS
            </span>
            <span className="font-mono-runes text-[10px] font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
              {certificates.length} VERIFIED
            </span>
          </div>

          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className={`p-4 rounded-sm transition-all group ${
                  isLumos
                    ? 'glass-card-lumos hover:border-[#8B0000]'
                    : 'glass-card-nox hover:border-[#D4AF37]'
                }`}
              >
                <div className={`flex items-center justify-between text-xs font-mono-runes pb-2 border-b ${
                  isLumos ? 'border-slate-200/80' : 'border-white/10'
                }`}>
                  <span className="font-black text-[10px]" style={{ color: houseStyles.primary }}>[{cert.tag}]</span>
                  <span className={`text-[10px] font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>{cert.date}</span>
                </div>
                <h4 className={`font-cinzel text-sm font-black group-hover:underline transition-colors mt-2 ${
                  isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
                }`}>
                  {cert.title}
                </h4>
                <div className="flex items-center justify-between font-fell italic text-xs mt-2 font-bold" style={{ color: isLumos ? houseStyles.secondary : '#D4AF37' }}>
                  <span>{cert.issuer}</span>
                  <span className="font-cinzel font-black text-[#059669] not-italic flex items-center gap-1">
                    <CheckCircle2 size={12} /> AUTHENTIC
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Languages Block */}
          <div className={`p-5 rounded-sm mt-6 transition-all ${
            isLumos ? 'glass-card-lumos' : 'glass-card-nox'
          }`}>
            <span className="font-cinzel text-xs font-black uppercase tracking-wider block mb-3 flex items-center gap-1.5" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
              <Globe size={14} /> LINGUISTIC PROFICIENCY
            </span>
            <div className="grid grid-cols-3 gap-2 text-center font-cinzel text-xs">
              {languages.map((lang) => (
                <div key={lang.name} className={`p-2.5 rounded transition-all ${
                  isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
                }`}>
                  <span className={`font-black block ${isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'}`}>
                    {lang.name}
                  </span>
                  <span className="text-[10px] text-[#059669] font-mono-runes font-black">{lang.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skill Taxonomy Matrix (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`flex items-center justify-between pb-2 border-b ${
            isLumos ? 'border-slate-200/80' : 'border-white/10'
          }`}>
            <span className="font-cinzel text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
              <Cpu size={14} /> TECHNICAL RUNES & ALCHEMY ARSENAL
            </span>
            <span className={`font-mono-runes text-[10px] font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>ACTIVE ARSENAL</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skillCategories.map((cat, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-sm space-y-3 transition-all ${
                  isLumos ? 'glass-card-lumos' : 'glass-card-nox'
                }`}
              >
                <div className={`pb-2 border-b flex items-center justify-between ${
                  isLumos ? 'border-slate-200/80' : 'border-white/10'
                }`}>
                  <span className={`font-cinzel text-xs font-black ${
                    isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
                  }`}>
                    {cat.category}
                  </span>
                  <span className="font-mono-runes text-[9px] font-black" style={{ color: houseStyles.primary }}>
                    0{idx + 1}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-2.5 py-1 rounded font-mono-runes text-[11px] font-bold transition-all ${
                        isLumos
                          ? 'glass-sub-lumos text-[#090D16] hover:border-[#8B0000]'
                          : 'glass-sub-nox text-[#E2E8F0] hover:border-[#D4AF37] hover:text-white'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
