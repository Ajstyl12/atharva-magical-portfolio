import React, { useState, useEffect } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { Compass, FileText, Briefcase, Wand2, Flame, Sparkles, Camera, Award, ArrowUp, Feather, Settings, Globe } from 'lucide-react';

interface DockItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  page: string;
}

const NAV_ITEMS: DockItem[] = [
  { id: 'cover', label: 'PROPHET', icon: <Compass size={13} />, page: '01' },
  { id: 'contents-index', label: 'INDEX', icon: <FileText size={13} />, page: '02' },
  { id: 'chronicles', label: 'CHRONICLES', icon: <Briefcase size={13} />, page: '03' },
  { id: 'works', label: 'ARTIFACTS', icon: <Wand2 size={13} />, page: '04' },
  { id: 'spells', label: 'SPELLS', icon: <Sparkles size={13} />, page: '05' },
  { id: 'beasts', label: 'BEASTS', icon: <Flame size={13} />, page: '06' },
  { id: 'pensieve', label: 'PENSIEVE', icon: <Sparkles size={13} />, page: '07' },
  { id: 'gallery', label: 'PORTRAITS', icon: <Camera size={13} />, page: '08' },
  { id: 'specimens', label: 'SCROLLS', icon: <Award size={13} />, page: '09' },
  { id: 'colophon', label: 'OWL POST', icon: <Feather size={13} />, page: '10' },
  { id: 'portals', label: 'PORTALS', icon: <Globe size={13} />, page: '11' },
];

export const FloatingDock: React.FC = () => {
  const { themeMode, getHouseColor, setIsSettingsOpen } = useWizardTheme();
  const [activeSection, setActiveSection] = useState<string>('cover');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [snitchVisible, setSnitchVisible] = useState<boolean>(true);

  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  // Sync snitch visibility state from GoldenSnitchEasterEgg
  useEffect(() => {
    const handleVisibilityChange = (e: CustomEvent<{ visible: boolean }>) => {
      setSnitchVisible(e.detail.visible);
    };
    window.addEventListener('snitch-visibility-change', handleVisibilityChange as EventListener);
    return () => window.removeEventListener('snitch-visibility-change', handleVisibilityChange as EventListener);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sectionElements = NAV_ITEMS.map((item) => ({
        id: item.id,
        el: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 250;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    soundFx.playWandCast();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    soundFx.playPageTurn();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 w-auto max-w-[98vw] px-2">
      <nav
        aria-label="Golden Snitch Navigation Dock"
        className={`flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full transition-all duration-300 overflow-x-auto max-w-full no-scrollbar ${
          isLumos
            ? 'glass-dock-lumos'
            : 'glass-dock-nox'
        }`}
        style={{ borderColor: houseStyles.border }}
      >
        {/* Little Golden Snitch Wing Indicator */}
        <div className="px-1.5 hidden md:flex items-center animate-snitch" style={{ color: houseStyles.primary }}>
          <span className="text-xs">⚡</span>
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-cinzel font-black transition-all duration-300 cursor-pointer border shrink-0 ${
                isActive
                  ? 'shadow-lg scale-105'
                  : isLumos
                  ? 'border-transparent text-[#090D16] hover:text-[#000000] hover:bg-slate-200/70'
                  : 'border-transparent text-[#E2E8F0] hover:text-white hover:bg-white/15'
              }`}
              style={{
                backgroundColor: isActive ? houseStyles.primary : undefined,
                color: isActive ? '#FFFFFF' : undefined,
                borderColor: isActive ? houseStyles.secondary : 'transparent',
                boxShadow: isActive ? `0 0 12px ${houseStyles.glow}` : undefined,
              }}
              title={item.label}
            >
              <span className="shrink-0">{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
              <span className={`text-[9px] font-mono-runes opacity-75 hidden sm:inline ${
                isActive ? 'text-white' : ''
              }`}>
                {item.page}
              </span>
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-[1px] h-4 bg-slate-400/30 mx-0.5" />

        {/* Summon Golden Snitch Button (Anime.js Magic) */}
        <button
          onClick={() => {
            soundFx.playWandCast();
            window.dispatchEvent(new CustomEvent('summon-golden-snitch'));
          }}
          className={`p-1.5 rounded-full border transition-all cursor-pointer ${
            isLumos
              ? 'border-amber-300 text-amber-700 hover:bg-amber-100 hover:text-black'
              : 'border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-300'
          }`}
          title="⚡ Summon Golden Snitch"
          aria-label="Summon Golden Snitch"
        >
          <span className="text-xs">⚡</span>
        </button>

        {/* Hide / Unhide Snitch Toggle */}
        <button
          onClick={() => {
            window.dispatchEvent(new CustomEvent('toggle-golden-snitch'));
          }}
          className={`px-2 py-1 rounded-full border transition-all cursor-pointer text-[9px] font-cinzel font-black ${
            snitchVisible
              ? isLumos
                ? 'border-amber-300 text-amber-700 hover:bg-amber-100'
                : 'border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/20'
              : isLumos
                ? 'border-slate-400 text-slate-500 hover:bg-slate-200'
                : 'border-white/20 text-slate-400 hover:bg-white/10'
          }`}
          title={snitchVisible ? 'Hide Golden Snitch' : 'Show Golden Snitch'}
          aria-label={snitchVisible ? 'Hide Snitch' : 'Show Snitch'}
        >
          {snitchVisible ? '👁 SNITCH' : '🚫 SNITCH'}
        </button>

        {/* Settings Button */}
        <button
          onClick={() => {
            soundFx.playWandCast();
            setIsSettingsOpen(true);
          }}
          className={`p-1.5 rounded-full border transition-all cursor-pointer ${
            isLumos
              ? 'border-slate-300 text-slate-700 hover:bg-slate-200 hover:text-black'
              : 'border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
          }`}
          title="Open Hogwarts Ministry Settings & Audio Lab"
          aria-label="Open Settings"
        >
          <Settings size={14} />
        </button>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-full bg-yellow-500/20 text-yellow-500 border border-yellow-500/40 hover:bg-yellow-500 hover:text-black transition-all cursor-pointer animate-fade-in"
            title="Return to Prophet Masthead"
            aria-label="Scroll to top"
          >
            <ArrowUp size={14} />
          </button>
        )}
      </nav>
    </div>
  );
};
