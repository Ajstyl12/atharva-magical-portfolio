import React from 'react';
import { SPREAD_CONTENTS } from '../data/portfolioData';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { ArrowUpRight, BookOpen, Wand2 } from 'lucide-react';

interface ContentsGridProps {
  onOpenSpread: (sectionId: string) => void;
  onOpenFlipbook: () => void;
}

export const ContentsGrid: React.FC<ContentsGridProps> = ({ onOpenSpread, onOpenFlipbook }) => {
  const { themeMode, getHouseColor } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  return (
    <section id="contents-index" className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b transition-colors duration-500 ${
      isLumos ? 'border-[#CBD5E1] bg-[#FFFFFF]' : 'border-[#1E1E24] bg-[#000000]'
    }`}>
      {/* Section Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b ${
        isLumos ? 'border-[#8B0000]' : 'border-[#1E1E24]'
      }`}
      style={{ borderColor: houseStyles.border }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-cinzel font-bold tracking-widest uppercase mb-1" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
            <Wand2 size={14} />
            <span>THE STANDARD GRIMOIRE SPREADS // {houseStyles.badge}</span>
          </div>
          <h2 className={`font-cinzel-dec text-3xl sm:text-5xl font-black uppercase ${
            isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'
          }`}>
            TABLE OF SPREADS
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playPageTurn();
              onOpenFlipbook();
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-cinzel font-black uppercase rounded border transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            style={{
              backgroundColor: houseStyles.primary,
              color: '#FFFFFF',
              borderColor: houseStyles.border
            }}
          >
            <BookOpen size={14} />
            <span>OPEN 3D BOOK OF SPELLS</span>
          </button>
        </div>
      </div>

      {/* Grid of Numbered Grimoire Spreads */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPREAD_CONTENTS.map((spread) => (
          <div
            key={spread.number}
            className={`group relative p-6 sm:p-7 rounded-sm transition-all duration-300 flex flex-col justify-between ${
              isLumos
                ? 'glass-card-lumos hover:border-[#8B0000]'
                : 'glass-card-nox hover:border-[#D4AF37]'
            }`}
            style={{
              borderColor: isLumos ? undefined : `${houseStyles.border}50`
            }}
          >
            {/* Top Row: Spread Number & Page Range */}
            <div>
              <div className={`flex items-center justify-between pb-3 border-b ${
                isLumos ? 'border-slate-200/80' : 'border-white/10'
              }`}>
                <span className="font-cinzel-dec text-3xl sm:text-4xl font-black tracking-tight group-hover:scale-105 transition-transform" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  {spread.number}
                </span>
                <div className="text-right font-mono-runes">
                  <span className="text-xs font-black block" style={{ color: houseStyles.primary }}>
                    {spread.pageRange}
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-cinzel font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                    {spread.category}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="mt-4 space-y-2">
                <h3 className={`font-cinzel text-lg sm:text-xl font-black group-hover:underline transition-colors leading-snug ${
                  isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
                }`}>
                  {spread.title}
                </h3>
                <h4 className="font-medieval text-xs font-bold" style={{ color: isLumos ? houseStyles.secondary : houseStyles.secondary }}>
                  {spread.subtitle}
                </h4>
                <p className={`font-fell italic text-xs sm:text-[13px] leading-relaxed pt-2 font-semibold ${
                  isLumos ? 'text-[#1E293B]' : 'text-[#E2E8F0]'
                }`}>
                  "{spread.blurb}"
                </p>
              </div>
            </div>

            {/* Bottom Action Trigger */}
            <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <button
                onClick={() => {
                  soundFx.playWandCast();
                  onOpenSpread(spread.sectionId);
                }}
                className={`flex items-center gap-1.5 text-xs font-cinzel font-black transition-colors cursor-pointer ${
                  isLumos ? 'text-[#090D16] hover:text-[#8B0000]' : 'text-[#E2E8F0] hover:text-white'
                }`}
              >
                <span>OPEN SPREAD</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" style={{ color: houseStyles.primary }} />
              </button>
              <span className={`font-mono-runes text-[9px] font-bold uppercase ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                VOL. 394 // 2026
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
