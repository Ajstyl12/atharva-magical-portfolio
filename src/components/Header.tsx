import React, { useState, useEffect } from 'react';
import { useWizardTheme, type HouseTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { BookOpen, Download, Volume2, VolumeX, Sun, Moon, Music, Sparkles, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenFlipbook: () => void;
  onOpenResumeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenFlipbook, onOpenResumeModal }) => {
  const {
    themeMode,
    houseTheme,
    toggleLumosNox,
    setHouse,
    getHouseColor,
    scrollAnimationsEnabled,
    toggleScrollAnimations,
    bgMusicEnabled,
    toggleBgMusic,
    setIsSettingsOpen,
    personalInfo
  } = useWizardTheme();

  const [timeStr, setTimeStr] = useState<string>('');
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const houseStyles = getHouseColor();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      };
      setTimeStr(now.toLocaleTimeString('en-US', options) + ' • HOGWARTS / MUMBAI');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const state = soundFx.toggleSound();
    setSoundActive(state);
    if (state) soundFx.playWandCast();
  };

  const isLumos = themeMode === 'lumos';

  return (
    <header className={`sticky top-0 z-40 w-full transition-colors duration-500 ${
      isLumos
        ? 'glass-header-lumos text-[#0B0F19]'
        : 'glass-header-nox text-[#F8FAFC]'
    }`}
    style={{ borderBottomColor: isLumos ? '#8B0000' : houseStyles.border }}
    >
      {/* Top Daily Prophet Ticker Strip */}
      <div className={`w-full py-1.5 px-4 text-[10px] md:text-xs font-mono-runes flex justify-between items-center overflow-x-auto tracking-wider border-b transition-colors ${
        isLumos
          ? 'bg-[#F1EFE9]/90 border-slate-300 text-[#0F172A]'
          : 'bg-[#08080C]/90 border-white/10 text-[#E2E8F0]'
      }`}>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: houseStyles.primary }}></span>
          <span className="font-black uppercase" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
            {houseStyles.badge} // TELEMETRY:
          </span>
          <span className="font-bold">{personalInfo.status}</span>
          <span className="opacity-40">•</span>
          <span className="font-bold">{personalInfo.location}</span>
        </div>
        <div className="flex items-center gap-4 whitespace-nowrap font-mono-runes text-[11px]">
          <span className="font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>{timeStr || 'HOGWARTS CLOCK'}</span>
          <span className="opacity-40 hidden sm:inline">•</span>
          <span className="hidden sm:inline font-bold">{personalInfo.volume}</span>
        </div>
      </div>

      {/* Main Daily Prophet Masthead Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Left: Newspaper Masthead & Atharva Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#cover"
            onClick={() => soundFx.playWandCast()}
            className="group flex flex-col cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className={`font-cinzel-dec text-lg sm:text-xl font-black tracking-wider transition-colors ${
                isLumos ? 'text-[#090D16] group-hover:text-[#8B0000]' : 'text-[#F8FAFC] group-hover:text-[#D4AF37]'
              }`}>
                {personalInfo.name}
              </span>
              <span
                className={`font-mono-runes text-[10px] font-black px-1.5 py-0.5 rounded border transition-colors ${
                  isLumos
                    ? 'bg-[#FFFFFF] text-[#8B0000] border-[#8B0000]'
                    : 'bg-[#0E0E14] text-[#D4AF37] border-white/20'
                }`}
                style={{ borderColor: houseStyles.border, color: isLumos ? houseStyles.primary : houseStyles.secondary }}
              >
                {personalInfo.issueNumber}
              </span>
            </div>
            <span className={`font-medieval text-[11px] font-bold tracking-widest uppercase ${isLumos ? 'text-[#1E293B]' : 'text-[#94A3B8]'}`}>
              THE DAILY PROPHET • HOGWARTS ENGINEERING DOSSIER
            </span>
          </a>
        </div>

        {/* Center: Interactive House Crest Selector */}
        <div className={`hidden lg:flex items-center gap-1.5 p-1 rounded-full border transition-all ${
          isLumos ? 'glass-sub-lumos border-slate-300' : 'glass-sub-nox border-white/10'
        }`}>
          {(['gryffindor', 'ravenclaw', 'slytherin', 'hufflepuff'] as HouseTheme[]).map((house) => {
            const isSelected = houseTheme === house;
            const houseIcons = {
              gryffindor: '🦁',
              ravenclaw: '🦅',
              slytherin: '🐍',
              hufflepuff: '🦡'
            };
            const houseColors = {
              gryffindor: isLumos ? 'bg-[#8B0000] text-[#FFFFFF] border-[#8B0000] shadow-[0_0_12px_rgba(139,0,0,0.4)]' : 'bg-[#DC2626] text-[#FFFFFF] border-[#DC2626] shadow-[0_0_15px_rgba(220,38,38,0.6)]',
              ravenclaw: isLumos ? 'bg-[#0C4A6E] text-[#FFFFFF] border-[#0C4A6E] shadow-[0_0_12px_rgba(12,74,110,0.4)]' : 'bg-[#0284C7] text-[#FFFFFF] border-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.6)]',
              slytherin: isLumos ? 'bg-[#065F46] text-[#FFFFFF] border-[#065F46] shadow-[0_0_12px_rgba(6,95,70,0.4)]' : 'bg-[#059669] text-[#FFFFFF] border-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.6)]',
              hufflepuff: isLumos ? 'bg-[#92400E] text-[#FFFFFF] border-[#92400E] shadow-[0_0_12px_rgba(146,64,14,0.4)]' : 'bg-[#D97706] text-[#FFFFFF] border-[#FDE047] shadow-[0_0_15px_rgba(245,158,11,0.6)]'
            };
            return (
              <button
                key={house}
                onClick={() => setHouse(house)}
                title={`Align with ${house.toUpperCase()} House Theme`}
                className={`px-3 py-1.5 rounded-full text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? `${houseColors[house]} scale-105 font-black`
                    : isLumos
                    ? 'border-transparent text-[#1E293B] hover:text-[#0F172A] hover:bg-white/80'
                    : 'border-transparent text-[#CBD5E1] hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-sm">{houseIcons[house]}</span>
                <span className="capitalize text-[11px] tracking-wide font-bold">{house}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Settings Button, Lumos/Nox, Audio & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* ⚙️ SETTINGS / MINISTRY DESK BUTTON */}
          <button
            onClick={() => {
              soundFx.playWandCast();
              setIsSettingsOpen(true);
            }}
            title="Open Ministry Sanctum & Live Information Editor"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-cinzel font-black uppercase border transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
            style={{
              backgroundColor: houseStyles.primary,
              color: '#FFFFFF',
              borderColor: houseStyles.border
            }}
          >
            <Settings size={14} className="animate-spin-slow" />
            <span className="hidden sm:inline">SETTINGS</span>
          </button>

          {/* LUMOS / NOX THEME TOGGLE BUTTON */}
          <button
            onClick={toggleLumosNox}
            title={isLumos ? "Cast 'NOX' (Switch to Pure Midnight Dark)" : "Cast 'LUMOS' (Switch to Pure Clean White)"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-cinzel font-bold border transition-all cursor-pointer shadow-sm ${
              isLumos
                ? 'bg-[#0F172A] text-[#F8FAFC] border-[#0F172A] hover:bg-[#000000] shadow-md'
                : 'bg-[#D4AF37] text-[#000000] border-[#FDE047] hover:bg-[#FACC15] shadow-[0_0_18px_rgba(212,175,55,0.5)]'
            }`}
          >
            {isLumos ? (
              <>
                <Moon size={14} className="text-[#D4AF37]" />
                <span className="font-black tracking-wider">NOX</span>
                <span className="text-[9px] opacity-90 font-mono">DARK</span>
              </>
            ) : (
              <>
                <Sun size={14} className="text-[#8B0000] animate-spin" />
                <span className="font-black tracking-wider">LUMOS</span>
                <span className="text-[9px] opacity-75 font-mono">LIGHT</span>
              </>
            )}
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            title={soundActive ? "Mute magical sound effects" : "Enable magical spell audio"}
            className={`p-2 rounded transition-all text-xs flex items-center justify-center cursor-pointer ${
              isLumos
                ? 'glass-sub-lumos hover:border-[#8B0000] text-[#090D16]'
                : 'glass-sub-nox hover:border-[#D4AF37] text-[#E2E8F0]'
            }`}
          >
            {soundActive ? <Volume2 size={14} style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }} /> : <VolumeX size={14} />}
          </button>

          {/* 🎵 Background Music Toggle */}
          <button
            onClick={() => {
              toggleBgMusic();
              soundFx.playWandCast();
            }}
            title={bgMusicEnabled ? "Stop Hogwarts ambient music" : "Play Hogwarts ambient music"}
            className={`p-2 rounded transition-all text-xs flex items-center justify-center cursor-pointer ${
              bgMusicEnabled
                ? 'border border-[#059669] bg-[#059669]/20 text-[#059669]'
                : isLumos
                ? 'glass-sub-lumos hover:border-[#8B0000] text-[#090D16]'
                : 'glass-sub-nox hover:border-[#D4AF37] text-[#E2E8F0]'
            }`}
          >
            <Music size={14} />
          </button>

          {/* ✨ Scroll Animations Toggle */}
          <button
            onClick={() => {
              toggleScrollAnimations();
              soundFx.playWandCast();
            }}
            title={scrollAnimationsEnabled ? "Disable scroll animations" : "Enable scroll animations"}
            className={`hidden md:flex p-2 rounded transition-all text-xs items-center justify-center cursor-pointer ${
              scrollAnimationsEnabled
                ? isLumos
                  ? 'border border-[#8B0000] bg-[#8B0000]/15 text-[#8B0000]'
                  : 'border border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37]'
                : isLumos
                ? 'glass-sub-lumos text-[#475569]'
                : 'glass-sub-nox text-[#64748B]'
            }`}
          >
            <Sparkles size={14} />
          </button>

          {/* Spellbook Flipbook Modal Trigger */}
          <button
            onClick={() => {
              soundFx.playPageTurn();
              onOpenFlipbook();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 border rounded text-xs font-cinzel font-black transition-all shadow-sm cursor-pointer hover:scale-105 ${
              isLumos
                ? 'border-[#8B0000] bg-[#8B0000] text-white hover:bg-[#700000]'
                : 'border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#8B0000]/20 hover:bg-[#8B0000]/40 text-[#D4AF37]'
            }`}
            style={{
              borderColor: isLumos ? undefined : houseStyles.border,
              color: isLumos ? '#FFFFFF' : houseStyles.secondary
            }}
          >
            <BookOpen size={13} className="animate-bounce" />
            <span className="hidden sm:inline">SPELLBOOK</span>
            <span className="sm:hidden">BOOK</span>
            <span className={`text-[10px] px-1 rounded ${isLumos ? 'bg-white/20 text-white' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>3D</span>
          </button>

          {/* Ministry Resume Dossier */}
          <button
            onClick={() => {
              soundFx.playWandCast();
              onOpenResumeModal();
            }}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-cinzel font-bold transition-all cursor-pointer ${
              isLumos
                ? 'glass-sub-lumos text-[#090D16] hover:border-[#8B0000]'
                : 'glass-sub-nox text-[#F8FAFC] hover:border-white/30'
            }`}
          >
            <Download size={13} style={{ color: houseStyles.primary }} />
            <span>DOSSIER</span>
          </button>
        </div>
      </div>
    </header>
  );
};
