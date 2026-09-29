import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WizardThemeProvider, useWizardTheme } from './context/ThemeContext';
import { trackPageVisit } from './lib/analytics';
import { Header } from './components/Header';
import { FloatingDock } from './components/FloatingDock';
import { HeroCover } from './components/HeroCover';
import { ContentsGrid } from './components/ContentsGrid';
import { CareerChronicles } from './components/CareerChronicles';
import { SelectedWorks } from './components/SelectedWorks';
import { WizardSpellsGrimoire } from './components/WizardSpellsGrimoire';
import { MythicalBeastsSanctuary } from './components/MythicalBeastsSanctuary';
import { PensieveQuotes } from './components/PensieveQuotes';
import { EnchantedGallery } from './components/EnchantedGallery';
import { SpecimenCredentials } from './components/SpecimenCredentials';
import { ColophonContact } from './components/ColophonContact';
import { DimensionalPortals } from './components/DimensionalPortals';
import { FlipbookModal } from './components/FlipbookModal';
import { ResumeModal } from './components/ResumeModal';
import { CertificateUploaderModal } from './components/CertificateUploaderModal';
import { SettingsModal } from './components/SettingsModal';
import { MagicalBotCompanion } from './components/MagicalBotCompanion';
import { MaraudersLoader } from './components/MaraudersLoader';
import { HogwartsAmbientMusic } from './components/HogwartsAmbientMusic';
import { WandCursorTrail } from './components/WandCursorTrail';
import { GoldenSnitchEasterEgg } from './components/GoldenSnitchEasterEgg';
import { soundFx } from './utils/audioEffects';

/**
 * ScrollRevealWrapper
 * Wraps a section with the scroll-reveal CSS class and handles
 * IntersectionObserver registration for fade-in/fade-out on scroll.
 */
const ScrollRevealSection: React.FC<{
  children: React.ReactNode;
  variant?: 'default' | 'left' | 'right' | 'scale';
  delay?: number;
}> = ({ children, variant = 'default', delay }) => {
  const ref = useRef<HTMLDivElement>(null);

  const className = [
    variant === 'default' ? 'scroll-reveal' :
    variant === 'left' ? 'scroll-reveal-left' :
    variant === 'right' ? 'scroll-reveal-right' :
    'scroll-reveal-scale',
    delay ? `scroll-reveal-delay-${delay}` : ''
  ].filter(Boolean).join(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
        } else {
          // Remove 'revealed' when scrolling away so it fades out
          el.classList.remove('revealed');
        }
      },
      {
        threshold: 0.08, // Trigger when 8% visible
        rootMargin: '0px 0px -60px 0px', // Slight bottom offset
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

const MainPortfolioLayout: React.FC = () => {
  const { themeMode, houseTheme, getHouseColor, isUploaderOpen, setIsUploaderOpen, scrollAnimationsEnabled } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  // ── Supabase: fire analytics on first load ──────────────────────────
  useEffect(() => {
    trackPageVisit(houseTheme, themeMode);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    try {
      const shown = sessionStorage.getItem('marauders_loader_played');
      return !shown;
    } catch {
      return true;
    }
  });

  const [isFlipbookOpen, setIsFlipbookOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);

  const handleLoaderComplete = () => {
    try {
      sessionStorage.setItem('marauders_loader_played', 'true');
    } catch {
      // ignore
    }
    setIsLoading(false);
  };

  const handleReplayIntro = () => {
    soundFx.playWandCast();
    setIsLoading(true);
  };

  const handleOpenSpread = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {/* Cinematic Hogwarts Marauder's Map Loading Sequence */}
      {isLoading && (
        <MaraudersLoader onComplete={handleLoaderComplete} />
      )}

      {/* Interactive Magical Wand Particle Trail */}
      <WandCursorTrail />

      {/* Hogwarts Ambient Background Music (Web Audio Synth) */}
      <HogwartsAmbientMusic />

      <div className={`min-h-screen relative overflow-x-hidden font-sans-body transition-colors duration-500 ${
        isLumos ? 'bg-[#FFFFFF] text-[#000000]' : 'bg-[#000000] text-[#F8FAFC]'
      } ${!scrollAnimationsEnabled ? 'no-scroll-animation' : ''}`}>

        {/* Top Sticky Utility & Daily Prophet Masthead Bar */}
        <Header
          onOpenFlipbook={() => setIsFlipbookOpen(true)}
          onOpenResumeModal={() => setIsResumeOpen(true)}
        />

        {/* Main Single-Page Wizarding World Grimoire Flow */}
        <main className="relative z-10 pb-24 sm:pb-32">
          {/* Section 01: The Daily Prophet Cover */}
          <ScrollRevealSection>
            <HeroCover
              onOpenFlipbook={() => setIsFlipbookOpen(true)}
              onExploreChronicles={() => handleOpenSpread('chronicles')}
              onOpenGallery={() => handleOpenSpread('gallery')}
            />
          </ScrollRevealSection>

          {/* Section 02: Table of Grimoire Spreads */}
          <ScrollRevealSection variant="scale">
            <ContentsGrid
              onOpenSpread={handleOpenSpread}
              onOpenFlipbook={() => setIsFlipbookOpen(true)}
            />
          </ScrollRevealSection>

          {/* Section 03: Ministry Field Chronicles & Hogwarts Archives */}
          <ScrollRevealSection variant="left">
            <CareerChronicles />
          </ScrollRevealSection>

          {/* Section 04: Enchanted Artifacts & Blueprints */}
          <ScrollRevealSection variant="right">
            <SelectedWorks />
          </ScrollRevealSection>

          {/* Section 05: Hogwarts Spell Grimoire & Wand Caster */}
          <ScrollRevealSection variant="scale">
            <WizardSpellsGrimoire />
          </ScrollRevealSection>

          {/* Section 06: Magizoology Bestiary & Mythical Beasts Sanctuary */}
          <ScrollRevealSection variant="left">
            <MythicalBeastsSanctuary />
          </ScrollRevealSection>

          {/* Section 07: The Pensieve of Wisdom & Iconic Wizarding Dialogues */}
          <ScrollRevealSection variant="right">
            <PensieveQuotes />
          </ScrollRevealSection>

          {/* Section 08: Enchanted Moving Portraits & Memories Photo Gallery */}
          <ScrollRevealSection variant="scale">
            <EnchantedGallery />
          </ScrollRevealSection>

          {/* Section 09: Ministry Accreditations & Research Scroll */}
          <ScrollRevealSection variant="left">
            <SpecimenCredentials />
          </ScrollRevealSection>

          {/* Section 10: Owl Post Dispatch & Sealed Inquiry Form */}
          <ScrollRevealSection>
            <ColophonContact
              onOpenResumeModal={() => setIsResumeOpen(true)}
            />
          </ScrollRevealSection>

          {/* Section 11: Floo Network Dimensional Portals & Arched Magical Doors */}
          <ScrollRevealSection>
            <DimensionalPortals />
          </ScrollRevealSection>
        </main>

        {/* Footer Editorial Colophon Strip */}
        <ScrollRevealSection>
          <footer className={`relative z-10 w-full py-8 px-4 sm:px-6 lg:px-8 border-t text-center font-medieval text-xs space-y-2 transition-colors ${
            isLumos
              ? 'border-[#E2E8F0] bg-[#FAFAFA] text-[#475569]'
              : 'border-[#1E1E24] bg-[#050508] text-[#94A3B8]'
          }`}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className={`font-cinzel-dec font-black text-sm ${isLumos ? 'text-[#0F172A]' : 'text-white'}`}>ATHARVA BAGWE</span>
                <span>•</span>
                <span className="font-black font-cinzel" style={{ color: houseStyles.primary }}>EDITION NO. 394</span>
                <span>•</span>
                <span className="font-bold" style={{ color: houseStyles.secondary }}>HOGWARTS 2026</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-cinzel font-bold">
                <a href="#cover" className="hover:opacity-80 transition-colors" style={{ color: houseStyles.secondary }}>TOP</a>
                <a href="#chronicles" className="hover:opacity-80 transition-colors" style={{ color: houseStyles.secondary }}>CHRONICLES</a>
                <a href="#works" className="hover:opacity-80 transition-colors" style={{ color: houseStyles.secondary }}>ARTIFACTS</a>
                <a href="#spells" className="hover:opacity-80 transition-colors" style={{ color: houseStyles.secondary }}>SPELLS</a>
                <a href="#beasts" className="hover:opacity-80 transition-colors" style={{ color: houseStyles.secondary }}>BEASTS</a>
                <a href="#pensieve" className="hover:opacity-80 transition-colors" style={{ color: houseStyles.secondary }}>PENSIEVE</a>
                <a href="#gallery" className="hover:opacity-80 transition-colors" style={{ color: houseStyles.secondary }}>GALLERY</a>
                <a href="#colophon" className="hover:opacity-80 transition-colors" style={{ color: houseStyles.secondary }}>OWL POST</a>
                <button
                  onClick={handleReplayIntro}
                  className="hover:underline cursor-pointer flex items-center gap-1 font-bold"
                  style={{ color: houseStyles.primary }}
                >
                  <span>⚡ REPLAY INTRO</span>
                </button>
              </div>

              <div className="text-[10px] opacity-75 font-mono-runes">
                PRINTED UNDER MINISTRY DISPENSATION • ALL RIGHTS RESERVED
              </div>
            </div>
          </footer>
        </ScrollRevealSection>

        {/* Floating Golden Snitch Navigation Pill Dock */}
        <FloatingDock />

        {/* Anime.js Golden Snitch Quidditch Interactive Easter Egg */}
        <GoldenSnitchEasterEgg />

        {/* Phineas Pygmy Puff Portfolio AI Observer Bot */}
        <MagicalBotCompanion />

        {/* Fullscreen 3D Standard Book of Spells Flipbook Modal */}
        <FlipbookModal
          isOpen={isFlipbookOpen}
          onClose={() => setIsFlipbookOpen(false)}
        />

        {/* Printable Ministry Recruiter Scroll Modal */}
        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />

        {/* Ministry Certificate Uploader & Vault Modal */}
        <CertificateUploaderModal
          isOpen={isUploaderOpen}
          onClose={() => setIsUploaderOpen(false)}
        />

        {/* Ministry Control Sanctum & Live Editor Settings Modal */}
        <SettingsModal />
      </div>
    </>
  );
};

export function App() {
  return (
    <WizardThemeProvider>
      <MainPortfolioLayout />
    </WizardThemeProvider>
  );
}

export default App;
