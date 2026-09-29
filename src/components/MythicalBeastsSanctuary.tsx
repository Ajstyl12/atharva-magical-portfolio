import React, { useState } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { MYTHICAL_BEASTS, type MythicalBeast } from '../data/wizardLoreData';
import { Sparkles, Shield, Flame, Wind, Compass, Volume2, CheckCircle2 } from 'lucide-react';
import { RubberStamp } from './StampBadge';
import confetti from 'canvas-confetti';

export const MythicalBeastsSanctuary: React.FC = () => {
  const { themeMode, getHouseColor } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [activeBeast, setActiveBeast] = useState<MythicalBeast>(MYTHICAL_BEASTS[0]);
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null);
  const [bowedState, setBowedState] = useState<boolean>(false);

  const handleTriggerBeastAction = (beast: MythicalBeast) => {
    setActiveAnimation(beast.actionType);

    if (beast.actionType === 'phoenix') {
      soundFx.playPhoenixCry();
      soundFx.playIncendio();
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#F59E0B', '#D4AF37', '#FEF08A']
      });
    } else if (beast.actionType === 'patronus') {
      soundFx.playExpectoPatronum();
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#38BDF8', '#E0F2FE', '#FFFFFF', '#93C5FD']
      });
    } else if (beast.actionType === 'dragon') {
      soundFx.playDragonRoar();
      soundFx.playIncendio();
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EAB308', '#B45309', '#F97316', '#78350F']
      });
    } else if (beast.actionType === 'hippogriff') {
      soundFx.playHippogriffCry();
      setBowedState(true);
      setTimeout(() => setBowedState(false), 3000);
    }

    setTimeout(() => {
      setActiveAnimation(null);
    }, 2500);
  };

  const getElementIcon = (element: string) => {
    if (element.toLowerCase().includes('fire') || element.toLowerCase().includes('flame') || element.toLowerCase().includes('magma')) {
      return <Flame size={14} className="text-amber-500" />;
    }
    if (element.toLowerCase().includes('starlight') || element.toLowerCase().includes('silver') || element.toLowerCase().includes('spirit')) {
      return <Sparkles size={14} className="text-sky-400" />;
    }
    if (element.toLowerCase().includes('sky') || element.toLowerCase().includes('wind') || element.toLowerCase().includes('gale')) {
      return <Wind size={14} className="text-emerald-400" />;
    }
    return <Shield size={14} className="text-yellow-500" />;
  };

  return (
    <section
      id="beasts"
      aria-label="Magizoology Bestiary & Mythical Beasts Sanctuary"
      className="relative z-10 w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b transition-colors"
      style={{
        borderColor: isLumos ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-cinzel font-black tracking-widest uppercase transition-all"
            style={{
              borderColor: isLumos ? '#78350F' : houseStyles.secondary,
              backgroundColor: isLumos ? 'rgba(254, 243, 199, 0.7)' : 'rgba(212, 175, 55, 0.12)',
              color: isLumos ? '#78350F' : '#FDE047'
            }}
          >
            <Compass size={14} className="animate-spin-slow" />
            <span>MINISTRY MAGIZOOLOGY ARCHIVES // SECTION 04-B</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black font-cinzel-dec tracking-wider ${
            isLumos ? 'text-[#090D16]' : 'text-white'
          }`}>
            HOGWARTS MAGIZOOLOGY SANCTUARY
          </h2>

          <p className={`text-sm sm:text-base font-fell italic leading-relaxed ${
            isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
          }`}>
            "Every beast holds an innate cosmic wisdom. From the self-healing fires of the Phoenix to the cryptographic vigilance of the Silver Stag, their magical faculties mirror the resilience of transcendent software architecture."
          </p>
        </div>

        {/* Beast Selector Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
          {MYTHICAL_BEASTS.map((beast) => {
            const isSelected = activeBeast.id === beast.id;
            return (
              <button
                key={beast.id}
                onClick={() => {
                  soundFx.playWandCast();
                  setActiveBeast(beast);
                }}
                className={`group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-cinzel font-black transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'shadow-xl scale-105'
                    : isLumos
                    ? 'glass-sub-lumos text-[#0F172A] hover:bg-slate-200/80 hover:border-slate-400'
                    : 'glass-sub-nox text-[#E2E8F0] hover:bg-white/10 hover:border-white/20'
                }`}
                style={{
                  borderColor: isSelected ? beast.primaryColor : undefined,
                  backgroundColor: isSelected ? beast.primaryColor : undefined,
                  color: isSelected ? '#FFFFFF' : undefined,
                  boxShadow: isSelected ? `0 0 20px ${beast.glowColor}` : undefined
                }}
              >
                <span className="text-base">
                  {beast.id === 'beast-1' ? '🔥' : beast.id === 'beast-2' ? '🦌' : beast.id === 'beast-3' ? '🐉' : '🦅'}
                </span>
                <span>{beast.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono-runes ${
                  isSelected ? 'bg-black/30 text-white' : isLumos ? 'bg-slate-200 text-slate-700' : 'bg-white/10 text-slate-300'
                }`}>
                  {beast.classification}
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Mythical Beast Showcase Card */}
        <div className={`p-6 sm:p-8 lg:p-10 rounded-2xl border transition-all duration-500 ${
          isLumos ? 'glass-card-lumos' : 'glass-card-nox'
        }`}
        style={{
          borderColor: isLumos ? '#CBD5E1' : activeBeast.primaryColor,
          boxShadow: `0 12px 40px rgba(0, 0, 0, 0.4), 0 0 35px ${activeBeast.glowColor}`
        }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: High-Resolution Beast Artwork Frame */}
            <div className="lg:col-span-5 relative group">
              <div className="relative overflow-hidden rounded-2xl border-2 p-1.5 transition-all duration-500"
                style={{
                  borderColor: activeBeast.primaryColor,
                  boxShadow: `0 0 30px ${activeBeast.glowColor}`
                }}
              >
                {/* Image Container with Ambient Glow Effects */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40">
                  <img
                    src={activeBeast.imageUrl}
                    alt={activeBeast.name}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      activeAnimation === activeBeast.actionType ? 'animate-pulse scale-105' : ''
                    } ${bowedState && activeBeast.actionType === 'hippogriff' ? 'translate-y-4' : ''}`}
                    onError={(e) => {
                      // Fallback placeholder if image path fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Gradient Ambient Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Classification Tag Overlay */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-mono-runes font-black tracking-wider uppercase bg-black/85 text-white border border-white/20 backdrop-blur-md">
                    MINISTRY RATING: {activeBeast.classification}
                  </div>

                  {/* Beast Name Overlay at Bottom of Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <p className="text-xs font-mono-runes text-yellow-300 font-bold uppercase tracking-wider">
                        {activeBeast.aka}
                      </p>
                      <p className="text-lg font-cinzel-dec font-black text-white drop-shadow-md">
                        {activeBeast.name}
                      </p>
                    </div>
                    <div className="p-2 rounded-full bg-black/60 border border-white/20 text-white">
                      {getElementIcon(activeBeast.element)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rubber Stamp Badge */}
              <div className="absolute -top-3 -right-3 rotate-6 transform z-20 pointer-events-none">
                <RubberStamp
                  label="VERIFIED BEAST"
                  variant={isLumos ? 'wax-crimson' : 'wax-gold'}
                />
              </div>
            </div>

            {/* Right Column: Beast Dossier, Abilities & Tech Analogy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Dossier Header Info */}
              <div className="space-y-2 border-b pb-4" style={{ borderColor: isLumos ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)' }}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded text-[11px] font-mono-runes font-black uppercase"
                    style={{
                      backgroundColor: isLumos ? '#F1EFE9' : 'rgba(255, 255, 255, 0.1)',
                      color: isLumos ? '#78350F' : '#FDE047',
                      border: `1px solid ${isLumos ? '#CBD5E1' : 'rgba(255, 255, 255, 0.15)'}`
                    }}
                  >
                    STATUS: {activeBeast.classificationLabel}
                  </span>
                  <span className="text-xs opacity-50">•</span>
                  <span className="text-xs font-mono-runes font-semibold" style={{ color: isLumos ? '#475569' : '#94A3B8' }}>
                    HABITAT: {activeBeast.nativeRegion}
                  </span>
                </div>

                <h3 className={`text-2xl sm:text-3xl font-black font-cinzel-dec tracking-wider ${
                  isLumos ? 'text-[#090D16]' : 'text-white'
                }`}>
                  {activeBeast.name}
                </h3>
              </div>

              {/* Description Paragraph */}
              <p className={`text-sm sm:text-base font-fell leading-relaxed ${
                isLumos ? 'text-[#1E293B]' : 'text-[#E2E8F0]'
              }`}>
                {activeBeast.description}
              </p>

              {/* Beast Magical Abilities Pills */}
              <div className="space-y-2">
                <p className="text-xs font-cinzel font-black uppercase tracking-wider" style={{ color: isLumos ? '#8B0000' : '#FDE047' }}>
                  MAGICAL ATTRIBUTES & TALENTS:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeBeast.abilities.map((ability, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono-runes font-bold transition-colors ${
                        isLumos
                          ? 'bg-[#F8FAFC] border-slate-300 text-[#0F172A]'
                          : 'bg-white/5 border-white/10 text-white'
                      }`}
                    >
                      <CheckCircle2 size={13} style={{ color: activeBeast.primaryColor }} />
                      <span>{ability}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Architecture Parallel Highlight */}
              <div className={`p-4 rounded-xl border space-y-1.5 transition-colors ${
                isLumos
                  ? 'bg-amber-50/80 border-amber-300 text-slate-900'
                  : 'bg-white/[0.03] border-white/15 text-slate-100'
              }`}>
                <div className="flex items-center gap-2 text-xs font-cinzel font-black uppercase text-amber-600 dark:text-amber-400">
                  <Sparkles size={14} />
                  <span>SOFTWARE ARCHITECTURE PARALLEL:</span>
                </div>
                <p className="text-xs sm:text-sm font-sans-body font-medium leading-relaxed">
                  {activeBeast.techAffinity}
                </p>
              </div>

              {/* Iconic Quote from Hagrid / Dumbledore / Lupin */}
              <blockquote className={`p-3.5 rounded-lg border-l-4 italic text-xs sm:text-sm font-fell ${
                isLumos
                  ? 'bg-slate-100/80 border-slate-400 text-slate-800'
                  : 'bg-black/40 border-yellow-500/80 text-slate-200'
              }`}>
                "{activeBeast.quote}"
                <span className="block mt-1 font-cinzel font-black not-italic text-[11px]" style={{ color: isLumos ? '#8B0000' : '#FDE047' }}>
                  — {activeBeast.quoteSpeaker}
                </span>
              </blockquote>

              {/* Interactive Beast Action Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleTriggerBeastAction(activeBeast)}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-cinzel font-black tracking-wider uppercase text-white shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                  style={{
                    backgroundColor: activeBeast.primaryColor,
                    boxShadow: `0 8px 25px ${activeBeast.glowColor}`
                  }}
                >
                  <Volume2 size={16} className="animate-bounce" />
                  <span>{activeBeast.actionLabel}</span>
                  <Sparkles size={14} className="group-hover:rotate-45 transition-transform" />
                </button>

                <span className={`text-xs font-mono-runes ${isLumos ? 'text-slate-600' : 'text-slate-400'}`}>
                  {activeAnimation === activeBeast.actionType ? '⚡ Spell Manifested!' : 'Click to invoke creature harmonic audio & visual'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
