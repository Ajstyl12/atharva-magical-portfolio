import React, { useState, useEffect } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { RubberStamp } from './StampBadge';

interface FlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlipbookModal: React.FC<FlipbookModalProps> = ({ isOpen, onClose }) => {
  const { themeMode, getHouseColor, certificates, personalInfo } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalSpreads = 5; // 5 two-page spreads = 10 pages

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevPage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentPage]);

  if (!isOpen) return null;

  const handleNextPage = () => {
    if (currentPage < totalSpreads - 1) {
      soundFx.playPageTurn();
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      soundFx.playPageTurn();
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleJumpToSpread = (index: number) => {
    soundFx.playPageTurn();
    setCurrentPage(index);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-2 sm:p-6 overflow-y-auto">
      <div
        className={`relative w-full max-w-6xl rounded-md shadow-[0_20px_70px_rgba(0,0,0,0.95)] flex flex-col my-auto overflow-hidden border-2 ${
          isLumos ? 'bg-[#FFFFFF] border-[#0F172A]' : 'bg-[#050508] border-[#D4AF37]'
        }`}
        style={{ borderColor: houseStyles.border }}
      >
        {/* Top Grimoire Bar */}
        <div className={`flex items-center justify-between px-4 sm:px-6 py-3 border-b ${
          isLumos ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0A0A0F] border-[#1E1E24]'
        }`}>
          <div className="flex items-center gap-2">
            <BookOpen size={16} style={{ color: houseStyles.secondary }} />
            <span className="font-cinzel-dec font-black text-sm text-[#FDE047]">
              ATHARVA BAGWE // THE STANDARD BOOK OF SPELLS & ARCHIVES
            </span>
            <span className={`hidden sm:inline font-mono-runes text-[10px] px-2 py-0.5 rounded border ${
              isLumos ? 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#0E0E14] border-[#1E1E24] text-[#D4AF37]'
            }`}>
              SPREAD 0{currentPage + 1} OF 0{totalSpreads}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Table of spells shortcuts */}
            <div className="hidden md:flex items-center gap-1 font-cinzel text-[11px] font-bold">
              {[0, 1, 2, 3, 4].map((idx) => (
                <button
                  key={idx}
                  onClick={() => handleJumpToSpread(idx)}
                  className={`px-2.5 py-0.5 rounded transition-colors cursor-pointer border ${
                    currentPage === idx
                      ? 'text-white font-black'
                      : isLumos
                      ? 'text-[#64748B] hover:text-[#0F172A] border-transparent hover:bg-[#F1F5F9]'
                      : 'text-[#888] hover:text-white border-transparent hover:bg-[#14141C]'
                  }`}
                  style={{
                    backgroundColor: currentPage === idx ? houseStyles.primary : undefined,
                    borderColor: currentPage === idx ? houseStyles.border : undefined,
                  }}
                >
                  SP.0{idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                soundFx.playWandCast();
                onClose();
              }}
              className={`p-1.5 rounded transition-colors cursor-pointer border ${
                isLumos
                  ? 'bg-[#FFFFFF] text-[#0F172A] border-[#CBD5E1] hover:bg-[#F1F5F9]'
                  : 'bg-[#14141C] text-[#FDE047] border-[#2A2A35] hover:bg-[#991B1B]'
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Realistic Two-Page Antique Book Container */}
        <div className={`p-4 sm:p-8 min-h-[530px] flex items-center justify-center ${
          isLumos ? 'bg-[#F8FAFC]' : 'bg-[#000000]'
        }`}>
          <div
            className={`w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 border-2 rounded-sm shadow-2xl overflow-hidden relative ${
              isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#08080C] border-[#1E1E24]'
            }`}
            style={{ borderColor: houseStyles.border }}
          >
            {/* Center Book Spine Shadow Divider */}
            <div className={`hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] z-20 ${
              isLumos ? 'bg-[#E2E8F0]' : 'bg-[#1E1E24]'
            }`}></div>

            {/* ================= SPREAD 01: PROPHET MANIFESTO ================= */}
            {currentPage === 0 && (
              <>
                {/* Left Page: Cover Spread */}
                <div className={`p-6 sm:p-10 border-b md:border-b-0 md:border-r flex flex-col justify-between relative ${
                  isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-gradient-to-b from-[#0F0F14] to-[#08080C] border-[#1E1E24]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>VOL. 01 // EDITION NO. 394</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 01</span>
                    </div>
                    <div className="mt-8 space-y-3">
                      <span className="font-cinzel text-xs uppercase tracking-widest block font-bold" style={{ color: houseStyles.secondary }}>
                        // THE HOGWARTS SCHOLAR
                      </span>
                      <h3 className={`font-cinzel-dec text-4xl sm:text-5xl font-black uppercase leading-none ${
                        isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'
                      }`}>
                        ATHARVA<br />BAGWE
                      </h3>
                      <p className="font-fell italic text-sm pt-2" style={{ color: houseStyles.secondary }}>
                        B.Tech Electronics & Computer Science Engineering • Network 18 Analyst
                      </p>
                    </div>
                  </div>

                  <div className={`mt-8 pt-4 border-t flex justify-between items-center ${
                    isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                  }`}>
                    <RubberStamp label="APPROVED BY HOGWARTS" variant="wax-crimson" angle={-3} />
                    <span className="font-mono-runes text-[10px] text-[#94A3B8]">MUMBAI, INDIA</span>
                  </div>
                </div>

                {/* Right Page: Editor's Note & Vision */}
                <div className={`p-6 sm:p-10 flex flex-col justify-between ${
                  isLumos ? 'bg-[#FAFAFA]' : 'bg-[#08080C]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>THE PROPHET'S MANIFESTO</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 02</span>
                    </div>
                    <div className="mt-6 space-y-4">
                      <h4 className={`font-cinzel text-xl sm:text-2xl font-bold ${
                        isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'
                      }`}>
                        "Engineering is the art of giving physics a digital soul."
                      </h4>
                      <p className={`font-fell italic text-sm leading-relaxed ${
                        isLumos ? 'text-[#334155]' : 'text-[#CCCCCC]'
                      }`}>
                        "{personalInfo.editorNote[0]}"
                      </p>
                      <p className={`font-sans-body text-xs leading-relaxed ${
                        isLumos ? 'text-[#475569]' : 'text-[#A0A0A0]'
                      }`}>
                        {personalInfo.editorNote[1]}
                      </p>
                    </div>
                  </div>

                  <div className={`mt-8 pt-4 border-t font-cinzel text-xs flex justify-between ${
                    isLumos ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#1E1E24] text-[#888]'
                  }`}>
                    <span>STATUS: {personalInfo.status}</span>
                    <span className="text-[#10B981] font-bold">READY FOR ROLES</span>
                  </div>
                </div>
              </>
            )}

            {/* ================= SPREAD 02: CAREER DOSSIER & EDUCATION ================= */}
            {currentPage === 1 && (
              <>
                <div className={`p-6 sm:p-10 border-b md:border-b-0 md:border-r flex flex-col justify-between ${
                  isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#08080C] border-[#1E1E24]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>MINISTRY FIELD CHRONICLES</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 03</span>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className={`p-4 rounded border ${
                        isLumos ? 'bg-[#FAFAFA] border-[#E2E8F0]' : 'bg-[#050508] border-[#1E1E24]'
                      }`}>
                        <span className="font-cinzel text-[10px] font-black block" style={{ color: houseStyles.primary }}>
                          DEC 2025 — PRESENT
                        </span>
                        <h4 className={`font-cinzel text-lg font-bold mt-1 ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                          MCR Apprentice And Analyst
                        </h4>
                        <p className="font-fell italic text-xs" style={{ color: houseStyles.secondary }}>Network 18 Media & Investments</p>
                        <p className={`text-xs font-sans-body mt-2 ${isLumos ? 'text-[#475569]' : 'text-[#A0A0A0]'}`}>
                          Master Control Room signal monitoring, broadcast telemetry, and real-time transmission analytics.
                        </p>
                      </div>

                      <div className={`p-4 rounded border ${
                        isLumos ? 'bg-[#FAFAFA] border-[#E2E8F0]' : 'bg-[#050508] border-[#1E1E24]'
                      }`}>
                        <span className="font-cinzel text-[10px] text-[#10B981] font-black block">
                          JUL 2022 — PRESENT
                        </span>
                        <h4 className={`font-cinzel text-lg font-bold mt-1 ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                          Student, Learner / Engineering Lead
                        </h4>
                        <p className="font-fell italic text-xs text-[#94A3B8]">Shah And Anchor Kutchhi Engg</p>
                        <p className={`text-xs font-sans-body mt-2 ${isLumos ? 'text-[#475569]' : 'text-[#888]'}`}>
                          B.Tech in Electronics & Computer Science (GPA: 7.81). Published peer-reviewed AI research.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={`font-mono-runes text-[10px] pt-4 border-t ${
                    isLumos ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#1E1E24] text-[#666]'
                  }`}>
                    FIELD RECORD // VERIFIED
                  </div>
                </div>

                <div className={`p-6 sm:p-10 flex flex-col justify-between ${
                  isLumos ? 'bg-[#FAFAFA]' : 'bg-[#08080C]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>ACADEMIC BLUEPRINT</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 04</span>
                    </div>
                    <div className="mt-6 space-y-4">
                      <h4 className={`font-cinzel text-xl font-bold ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                        Educational Milestones
                      </h4>
                      <div className="space-y-2 font-mono-runes text-xs">
                        <div className={`p-3 rounded border flex justify-between items-center ${
                          isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#050508] border-[#1E1E24]'
                        }`}>
                          <div>
                            <span className={`font-bold block font-cinzel ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>B.Tech ECS</span>
                            <span className="text-[10px] text-[#94A3B8]">Oct '21 — May '25</span>
                          </div>
                          <span className="text-[#10B981] font-bold">GPA: 7.81</span>
                        </div>

                        <div className={`p-3 rounded border flex justify-between items-center ${
                          isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#050508] border-[#1E1E24]'
                        }`}>
                          <div>
                            <span className={`font-bold block font-cinzel ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>HSC Science</span>
                            <span className="text-[10px] text-[#94A3B8]">Ramniranjan Jhunjhunwala</span>
                          </div>
                          <span className="font-bold" style={{ color: houseStyles.secondary }}>GPA: 7.60</span>
                        </div>

                        <div className={`p-3 rounded border flex justify-between items-center ${
                          isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#050508] border-[#1E1E24]'
                        }`}>
                          <div>
                            <span className={`font-bold block font-cinzel ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>SSC Secondary</span>
                            <span className="text-[10px] text-[#94A3B8]">AIES High School</span>
                          </div>
                          <span className="text-[#10B981] font-bold">GPA: 8.20</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`pt-4 border-t flex justify-center ${
                    isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                  }`}>
                    <RubberStamp label="HOGWARTS MERIT" variant="wax-gold" angle={1} />
                  </div>
                </div>
              </>
            )}

            {/* ================= SPREAD 03: FEATURED CASE STUDIES ================= */}
            {currentPage === 2 && (
              <>
                <div className={`p-6 sm:p-10 border-b md:border-b-0 md:border-r flex flex-col justify-between ${
                  isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#08080C] border-[#1E1E24]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>ENCHANTED ARTIFACT 01</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 05</span>
                    </div>
                    <div className="mt-6 space-y-3">
                      <span className="font-cinzel text-[10px] font-black uppercase" style={{ color: houseStyles.primary }}>
                        AI & DATA DIVINATION
                      </span>
                      <h4 className={`font-cinzel text-2xl font-black ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                        Insights Skills
                      </h4>
                      <p className={`font-sans-body text-xs leading-relaxed ${isLumos ? 'text-[#334155]' : 'text-[#CCCCCC]'}`}>
                        Data-driven skill assessment platform mapping technical competencies and delivering automated career roadmap projections.
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {['React', 'Python', 'Tailwind', 'Data Viz'].map((t) => (
                          <span key={t} className={`px-2 py-0.5 font-mono-runes text-[10px] rounded border ${
                            isLumos ? 'bg-[#FAFAFA] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#050508] border-[#1E1E24]'
                          }`} style={{ color: isLumos ? undefined : houseStyles.secondary }}>
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`font-cinzel text-xs text-[#10B981] font-bold pt-4 border-t ${
                    isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                  }`}>
                    METRIC: 25+ DOMAINS EVALUATED
                  </div>
                </div>

                <div className={`p-6 sm:p-10 flex flex-col justify-between ${
                  isLumos ? 'bg-[#FAFAFA]' : 'bg-[#08080C]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>ENCHANTED ARTIFACT 02</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 06</span>
                    </div>
                    <div className="mt-6 space-y-3">
                      <span className="font-cinzel text-[10px] text-[#10B981] font-black uppercase">
                        AI AGENTS & KNOWLEDGE ENGINES
                      </span>
                      <h4 className={`font-cinzel text-2xl font-black ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                        NeuralNexus AI Agent
                      </h4>
                      <p className={`font-sans-body text-xs leading-relaxed ${isLumos ? 'text-[#334155]' : 'text-[#CCCCCC]'}`}>
                        Autonomous conversational intelligence platform engineered for real-time natural language reasoning, career counseling, and document synthesis.
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {['Python', 'AI Agents', 'FastAPI', 'Generative AI'].map((t) => (
                          <span key={t} className={`px-2 py-0.5 font-mono-runes text-[10px] rounded border ${
                            isLumos ? 'bg-[#FFFFFF] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#050508] border-[#1E1E24] text-[#10B981]'
                          }`}>
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`font-cinzel text-xs font-bold pt-4 border-t ${
                    isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                  }`} style={{ color: houseStyles.primary }}>
                    LATENCY: &lt; 450MS STREAMING RESPONSE
                  </div>
                </div>
              </>
            )}

            {/* ================= SPREAD 04: CERTIFICATIONS & PUBLICATIONS ================= */}
            {currentPage === 3 && (
              <>
                <div className={`p-6 sm:p-10 border-b md:border-b-0 md:border-r flex flex-col justify-between ${
                  isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#08080C] border-[#1E1E24]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>RESEARCH DISPATCH</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 07</span>
                    </div>
                    <div className="mt-6 space-y-3">
                      <span className="font-cinzel text-[10px] px-2 py-0.5 rounded font-black uppercase text-white" style={{ backgroundColor: houseStyles.primary }}>
                        PEER REVIEWED PUBLICATION
                      </span>
                      <h4 className={`font-cinzel text-xl font-bold ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                        "Career Guidance Website: HTML & CSS Solution with AI Chatbot"
                      </h4>
                      <p className="font-fell italic text-xs" style={{ color: houseStyles.secondary }}>
                        IRJMETS Journal • May 2025
                      </p>
                      <p className={`font-sans-body text-xs leading-relaxed ${isLumos ? 'text-[#475569]' : 'text-[#999]'}`}>
                        Explores responsive web counseling architectures augmented with conversational AI chatbot dialog engines.
                      </p>
                    </div>
                  </div>
                  <div className={`pt-4 border-t ${isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'}`}>
                    <RubberStamp label="IRJMETS 2025" variant="wax-crimson" angle={-2} />
                  </div>
                </div>

                <div className={`p-6 sm:p-10 flex flex-col justify-between ${
                  isLumos ? 'bg-[#FAFAFA]' : 'bg-[#08080C]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>MINISTRY ACCREDITATIONS</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 08</span>
                    </div>
                    <div className="mt-6 space-y-2.5 font-mono-runes text-xs">
                      {certificates.slice(0, 4).map((c) => (
                        <div key={c.id} className={`p-2.5 rounded border flex justify-between items-center ${
                          isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#050508] border-[#1E1E24]'
                        }`}>
                          <span className={`font-cinzel font-bold truncate max-w-[200px] ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>{c.title}</span>
                          <span className="text-[10px] shrink-0 ml-2" style={{ color: houseStyles.secondary }}>{c.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`font-cinzel text-[10px] pt-4 border-t ${
                    isLumos ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#1E1E24] text-[#888]'
                  }`}>
                    TOTAL ACCREDITATIONS: {certificates.length} VERIFIED
                  </div>
                </div>
              </>
            )}

            {/* ================= SPREAD 05: COLOPHON & DISPATCH ================= */}
            {currentPage === 4 && (
              <>
                <div className={`p-6 sm:p-10 border-b md:border-b-0 md:border-r flex flex-col justify-between ${
                  isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0]' : 'bg-[#08080C] border-[#1E1E24]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>SPECIMEN TAXONOMY</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 09</span>
                    </div>
                    <div className="mt-6 space-y-3">
                      <span className="font-cinzel text-xs font-bold" style={{ color: houseStyles.secondary }}>CORE SPECIALIZATIONS</span>
                      <div className="flex flex-wrap gap-1.5 font-mono-runes text-xs">
                        {['Artificial Intelligence', 'AI Agents', 'AWS Cloud', 'Python', 'JavaScript', 'MySQL', 'Data Analytics', 'Vibe Coding'].map((s) => (
                          <span key={s} className={`px-2 py-1 rounded text-[11px] border ${
                            isLumos ? 'bg-[#FAFAFA] border-[#CBD5E1] text-[#0F172A]' : 'bg-[#050508] border-[#1E1E24] text-[#CCCCCC]'
                          }`}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`font-cinzel text-xs pt-4 border-t ${
                    isLumos ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#1E1E24] text-[#888]'
                  }`}>
                    LANGUAGES: ENGLISH • HINDI • MARATHI
                  </div>
                </div>

                <div className={`p-6 sm:p-10 flex flex-col justify-between ${
                  isLumos ? 'bg-[#FAFAFA]' : 'bg-gradient-to-b from-[#0F0F14] to-[#08080C]'
                }`}>
                  <div>
                    <div className={`flex justify-between items-center pb-3 border-b font-cinzel text-xs font-black ${
                      isLumos ? 'border-[#E2E8F0]' : 'border-[#1E1E24]'
                    }`} style={{ color: houseStyles.secondary }}>
                      <span>OFFICIAL OWL POST DISPATCH</span>
                      <span className="font-black" style={{ color: houseStyles.primary }}>PG. 10</span>
                    </div>
                    <div className="mt-6 space-y-4 text-center">
                      <h4 className={`font-cinzel-dec text-2xl font-bold ${isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'}`}>
                        Ready for Inquiries
                      </h4>
                      <p className="font-mono-runes text-xs" style={{ color: houseStyles.secondary }}>
                        atharvabagwe30@gmail.com • +91 9930629079
                      </p>
                      <a
                        href="#colophon"
                        onClick={() => {
                          soundFx.playWandCast();
                          onClose();
                        }}
                        className="inline-block px-4 py-2 font-cinzel text-xs font-bold rounded border transition-colors cursor-pointer"
                        style={{
                          backgroundColor: houseStyles.primary,
                          color: '#FFFFFF',
                          borderColor: houseStyles.border
                        }}
                      >
                        TRANSMIT OWL PARCHMENT ↗
                      </a>
                    </div>
                  </div>
                  <div className={`pt-4 border-t flex justify-between items-center font-cinzel text-[10px] ${
                    isLumos ? 'border-[#E2E8F0] text-[#64748B]' : 'border-[#1E1E24] text-[#888]'
                  }`}>
                    <span>EDITION 394 COMPLETED</span>
                    <span className="text-[#10B981] font-bold">ONLINE</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Navigation Toolbar */}
        <div className={`flex items-center justify-between px-6 py-4 border-t ${
          isLumos ? 'bg-[#F8FAFC] border-[#E2E8F0]' : 'bg-[#0A0A0F] border-[#1E1E24]'
        }`}>
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className={`flex items-center gap-1 px-3 py-1.5 disabled:opacity-30 disabled:cursor-not-allowed font-cinzel text-xs font-bold rounded transition-colors cursor-pointer border ${
              isLumos
                ? 'bg-[#FFFFFF] text-[#0F172A] border-[#CBD5E1] hover:bg-[#F1F5F9]'
                : 'bg-[#14141C] text-[#FDE047] border-[#2A2A35] hover:bg-[#20202C]'
            }`}
          >
            <ChevronLeft size={14} />
            <span>PREV SPREAD</span>
          </button>

          <div className="font-cinzel text-xs text-[#94A3B8] flex items-center gap-2">
            <span>USE WAND / ARROWS</span>
            <span className={`hidden sm:inline px-1.5 py-0.5 rounded border font-mono ${
              isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0F172A]' : 'bg-[#0E0E14] border-[#1E1E24] text-white'
            }`}>←</span>
            <span className={`hidden sm:inline px-1.5 py-0.5 rounded border font-mono ${
              isLumos ? 'bg-[#FFFFFF] border-[#E2E8F0] text-[#0F172A]' : 'bg-[#0E0E14] border-[#1E1E24] text-white'
            }`}>→</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalSpreads - 1}
            className={`flex items-center gap-1 px-3 py-1.5 disabled:opacity-30 disabled:cursor-not-allowed font-cinzel text-xs font-bold rounded transition-colors cursor-pointer border ${
              isLumos
                ? 'bg-[#FFFFFF] text-[#0F172A] border-[#CBD5E1] hover:bg-[#F1F5F9]'
                : 'bg-[#14141C] text-[#FDE047] border-[#2A2A35] hover:bg-[#20202C]'
            }`}
          >
            <span>NEXT SPREAD</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
