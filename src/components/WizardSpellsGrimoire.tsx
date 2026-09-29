import React, { useState } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { WIZARD_SPELLS, type WizardSpell } from '../data/wizardLoreData';
import { Wand2, Sparkles, Shield, Sun, Key, Feather, Flame, Droplets, Smile, Zap, Magnet, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const WizardSpellsGrimoire: React.FC = () => {
  const { themeMode, getHouseColor } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedSpellIndex, setSelectedSpellIndex] = useState<number>(0);
  const [activeCastSpellId, setActiveCastSpellId] = useState<string | null>(null);
  const [castSuccessMessage, setCastSuccessMessage] = useState<string | null>(null);

  const categories = ['ALL', 'CHARM', 'DEFENSE', 'ELEMENTAL', 'SUMMONING'];

  const filteredSpells = activeCategory === 'ALL'
    ? WIZARD_SPELLS
    : WIZARD_SPELLS.filter(s => s.category === activeCategory);

  const selectedSpell = filteredSpells[selectedSpellIndex % filteredSpells.length] || WIZARD_SPELLS[0];

  const handleCastSpell = (spell: WizardSpell) => {
    setActiveCastSpellId(spell.id);

    // Audio & Visual Dispatch based on spell type
    switch (spell.effectType) {
      case 'patronus':
        soundFx.playExpectoPatronum();
        confetti({
          particleCount: 70,
          spread: 120,
          origin: { y: 0.6 },
          colors: ['#38BDF8', '#E0F2FE', '#FFFFFF', '#93C5FD', '#7DD3FC']
        });
        setCastSuccessMessage("✨ EXPECTO PATRONUM! A radiant Silver Stag manifests to shield your session!");
        break;

      case 'lumos':
        soundFx.playLumos();
        confetti({
          particleCount: 50,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#FEF08A', '#FDE047', '#FBBF24', '#FFFFFF']
        });
        setCastSuccessMessage("💡 LUMOS MAXIMA! Pure incandescent light floods the Great Hall!");
        break;

      case 'alohomora':
        soundFx.playAlohomora();
        confetti({
          particleCount: 40,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F59E0B', '#B45309']
        });
        setCastSuccessMessage("🗝️ ALOHOMORA! Sealed vaults and secret archives have clicked open!");
        break;

      case 'leviosa':
        soundFx.playWingardiumLeviosa();
        setCastSuccessMessage("🪶 WINGARDIUM LEVIOSA! 'Swish and Flick!' Elements rise in zero gravity!");
        break;

      case 'incendio':
        soundFx.playIncendio();
        confetti({
          particleCount: 45,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#DC2626', '#F97316', '#FBBF24', '#7F1D1D']
        });
        setCastSuccessMessage("🔥 INCENDIO! Swirling golden flames and crackling embers ignite!");
        break;

      case 'aguamenti':
        soundFx.playAguamenti();
        confetti({
          particleCount: 40,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0284C7', '#38BDF8', '#7DD3FC', '#E0F2FE']
        });
        setCastSuccessMessage("💧 AGUAMENTI! A crystalline stream of pure water pours forth!");
        break;

      case 'riddikulus':
        soundFx.playRiddikulus();
        confetti({
          particleCount: 80,
          spread: 140,
          origin: { y: 0.6 },
          colors: ['#EC4899', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B']
        });
        setCastSuccessMessage("🎭 RIDDIKULUS! Fears transform into laughter and joyful celebration!");
        break;

      case 'expelliarmus':
        soundFx.playExpelliarmus();
        confetti({
          particleCount: 50,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#DC2626', '#EF4444', '#F87171', '#FFFFFF']
        });
        setCastSuccessMessage("⚡ EXPELLIARMUS! Scarlet laser beam disarms all dark anomalies!");
        break;

      case 'accio':
        soundFx.playAccio();
        setCastSuccessMessage("🧲 ACCIO! Distant knowledge scrolls and engineering blueprints summoned!");
        break;

      case 'nox':
        soundFx.playNox();
        setCastSuccessMessage("🌙 NOX! Extinguishes light to return the chamber to midnight stillness.");
        break;

      default:
        soundFx.playWandCast();
        setCastSuccessMessage(`⚡ ${spell.name.toUpperCase()} Cast with precision!`);
        break;
    }

    setTimeout(() => {
      setActiveCastSpellId(null);
    }, 2000);

    setTimeout(() => {
      setCastSuccessMessage(null);
    }, 4500);
  };

  const getSpellIcon = (iconName: string, size = 18) => {
    switch (iconName) {
      case 'Shield': return <Shield size={size} className="text-sky-400" />;
      case 'Sun': return <Sun size={size} className="text-amber-400" />;
      case 'Key': return <Key size={size} className="text-yellow-500" />;
      case 'Feather': return <Feather size={size} className="text-purple-400" />;
      case 'Flame': return <Flame size={size} className="text-red-500" />;
      case 'Droplets': return <Droplets size={size} className="text-blue-400" />;
      case 'Smile': return <Smile size={size} className="text-pink-400" />;
      case 'Zap': return <Zap size={size} className="text-rose-500" />;
      case 'Magnet': return <Magnet size={size} className="text-indigo-400" />;
      case 'Moon': return <Moon size={size} className="text-slate-400" />;
      default: return <Wand2 size={size} className="text-yellow-400" />;
    }
  };

  const handleNextSpell = () => {
    soundFx.playWandCast();
    setSelectedSpellIndex(prev => (prev + 1) % filteredSpells.length);
  };

  const handlePrevSpell = () => {
    soundFx.playWandCast();
    setSelectedSpellIndex(prev => (prev - 1 + filteredSpells.length) % filteredSpells.length);
  };

  return (
    <section
      id="spells"
      aria-label="Interactive Hogwarts Spell Grimoire & Wand Caster"
      className="relative z-10 w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b transition-colors"
      style={{
        borderColor: isLumos ? 'rgba(15, 23, 42, 0.12)' : 'rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Compact Section Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-cinzel font-black tracking-widest uppercase transition-all"
            style={{
              borderColor: isLumos ? '#78350F' : houseStyles.secondary,
              backgroundColor: isLumos ? 'rgba(254, 243, 199, 0.8)' : 'rgba(212, 175, 55, 0.12)',
              color: isLumos ? '#78350F' : '#FDE047'
            }}
          >
            <Wand2 size={13} className="animate-pulse" />
            <span>HOGWARTS SPELL GRIMOIRE // GRADE VII</span>
          </div>

          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black font-cinzel-dec tracking-wider ${
            isLumos ? 'text-[#090D16]' : 'text-white'
          }`}>
            SPELL GRIMOIRE & WAND CASTER
          </h2>

          <p className={`text-xs sm:text-sm font-fell italic ${
            isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'
          }`}>
            "Select any spell and wave your wand to execute the spell in real-time."
          </p>
        </div>

        {/* Live Cast Feedback Banner */}
        {castSuccessMessage && (
          <div className="max-w-xl mx-auto py-2 px-4 rounded-xl border text-center font-cinzel font-bold text-xs shadow-xl animate-ink-spread transition-all"
            style={{
              backgroundColor: isLumos ? '#FEF3C7' : 'rgba(15, 23, 42, 0.95)',
              borderColor: isLumos ? '#D97706' : '#FDE047',
              color: isLumos ? '#78350F' : '#FDE047',
              boxShadow: isLumos ? '0 4px 15px rgba(217, 119, 6, 0.2)' : '0 0 25px rgba(253, 224, 71, 0.25)'
            }}
          >
            {castSuccessMessage}
          </div>
        )}

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playWandCast();
                  setActiveCategory(cat);
                  setSelectedSpellIndex(0);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-cinzel font-black tracking-wider transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'shadow-md scale-105'
                    : isLumos
                    ? 'bg-slate-100 text-[#0F172A] border-slate-300 hover:bg-slate-200'
                    : 'bg-white/5 text-[#E2E8F0] border-white/10 hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: isSelected ? houseStyles.primary : undefined,
                  borderColor: isSelected ? houseStyles.border : undefined,
                  color: isSelected ? '#FFFFFF' : undefined
                }}
              >
                {cat === 'ALL' ? 'ALL SPELLS' : cat}
              </button>
            );
          })}
        </div>

        {/* Sleek Interactive Horizontal Spell Badge Ribbon (Replaces Boxy Tile Grid) */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none px-2">
          {filteredSpells.map((spell, idx) => {
            const isSelected = selectedSpell.id === spell.id;
            return (
              <button
                key={spell.id}
                onClick={() => {
                  soundFx.playWandCast();
                  setSelectedSpellIndex(idx);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-cinzel font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? isLumos
                      ? 'bg-amber-100 border-amber-500 text-amber-950 scale-105 shadow-md ring-2 ring-amber-400'
                      : 'bg-yellow-500/20 border-yellow-400 text-yellow-300 scale-105 shadow-lg ring-2 ring-yellow-400'
                    : isLumos
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-amber-50'
                    : 'bg-slate-900/60 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                {getSpellIcon(spell.iconName, 14)}
                <span>{spell.incantation}</span>
              </button>
            );
          })}
        </div>

        {/* Creative Central Interactive Wand Casting Stand */}
        <div className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 overflow-hidden ${
          isLumos ? 'bg-white border-amber-300/80 shadow-lg' : 'bg-slate-900/90 border-amber-500/30 shadow-2xl backdrop-blur-md'
        }`}>
          {/* Navigation Controls */}
          <button
            onClick={handlePrevSpell}
            aria-label="Previous Spell"
            className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all duration-200 z-20 cursor-pointer ${
              isLumos
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-white/10 text-yellow-300 border-white/20 hover:bg-white/20'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNextSpell}
            aria-label="Next Spell"
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all duration-200 z-20 cursor-pointer ${
              isLumos
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-white/10 text-yellow-300 border-white/20 hover:bg-white/20'
            }`}
          >
            <ChevronRight size={20} />
          </button>

          <div className="max-w-2xl mx-auto space-y-5 text-center px-4 sm:px-6">
            {/* Top Badge: Icon + Category + Difficulty */}
            <div className="flex items-center justify-center gap-2">
              <div className={`p-2 rounded-full border ${
                isLumos ? 'bg-amber-100 border-amber-300' : 'bg-white/10 border-white/20'
              }`}>
                {getSpellIcon(selectedSpell.iconName, 22)}
              </div>

              <span className={`text-xs font-mono-runes font-black uppercase px-2.5 py-0.5 rounded-full ${
                isLumos ? 'bg-amber-100 text-amber-900' : 'bg-yellow-500/20 text-yellow-300'
              }`}>
                {selectedSpell.category}
              </span>

              <span className={`text-[10px] font-mono-runes px-2 py-0.5 rounded-full border font-bold ${
                selectedSpell.difficulty === 'ADVANCED' || selectedSpell.difficulty === 'MASTER'
                  ? 'border-red-500/40 text-red-600 dark:text-red-400 bg-red-500/10'
                  : 'border-emerald-500/40 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10'
              }`}>
                {selectedSpell.difficulty}
              </span>
            </div>

            {/* Main Spell Name & Pronunciation */}
            <div className="space-y-1">
              <h3 className={`text-2xl sm:text-3xl font-black font-cinzel-dec tracking-wider ${
                isLumos ? 'text-[#090D16]' : 'text-white'
              }`}>
                {selectedSpell.name}
              </h3>
              <p className="text-xs font-mono-runes italic opacity-80" style={{ color: isLumos ? '#78350F' : '#FDE047' }}>
                Incantation: <span className="font-bold">{selectedSpell.incantation}</span> ({selectedSpell.pronunciation})
              </p>
            </div>

            {/* Spell Description */}
            <p className={`text-sm sm:text-base font-fell leading-relaxed max-w-xl mx-auto ${
              isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'
            }`}>
              "{selectedSpell.description}"
            </p>

            {/* Wand Gesture Trail */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono-runes ${
              isLumos ? 'bg-amber-50 text-amber-950 border border-amber-200' : 'bg-black/40 text-yellow-300 border border-yellow-500/20'
            }`}>
              <span>🪄 WAND MOTION:</span>
              <span className="font-semibold">{selectedSpell.wandMotion}</span>
            </div>

            {/* Big Action Cast Button */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={() => handleCastSpell(selectedSpell)}
                className={`w-full sm:w-auto px-8 py-3 rounded-full text-sm font-cinzel font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 active:scale-95 ${
                  activeCastSpellId === selectedSpell.id
                    ? 'bg-yellow-400 text-black ring-4 ring-yellow-300 animate-pulse'
                    : isLumos
                    ? 'bg-[#8B0000] text-white hover:bg-[#700000]'
                    : 'bg-gradient-to-r from-red-700 via-amber-600 to-yellow-600 text-white hover:brightness-110'
                }`}
              >
                <Wand2 size={16} className={activeCastSpellId === selectedSpell.id ? 'animate-spin' : ''} />
                <span>CAST {selectedSpell.incantation.toUpperCase()}</span>
                <Sparkles size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
