import React from 'react';
import { CircularStampBadge, RubberStamp } from './StampBadge';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { MapPin, ArrowDownRight, Radio, Wand2, Camera, Sparkles } from 'lucide-react';

interface HeroCoverProps {
  onOpenFlipbook: () => void;
  onExploreChronicles: () => void;
  onOpenGallery: () => void;
}

const MAGICAL_RUNES = ['ᚫ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚡ', 'ᚪ', 'ᛒ', 'ᚷ', 'ᚹ', 'ᛖ', 'ᛗ', 'ᚾ', '✦', '✧', '⚡', '⚝'];

interface MagicalRuneTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  speedMs?: number;
  triggerKey?: number;
}

const MagicalRuneText: React.FC<MagicalRuneTextProps> = ({
  text,
  className,
  style,
  speedMs = 75,
  triggerKey = 0
}) => {
  const [displayText, setDisplayText] = React.useState<string>(() =>
    text.split('').map(() => MAGICAL_RUNES[Math.floor(Math.random() * MAGICAL_RUNES.length)]).join('')
  );

  React.useEffect(() => {
    const chars = text.split('');
    let currentStep = 0;

    const scrambleInterval = setInterval(() => {
      setDisplayText(
        chars
          .map((c, idx) => {
            if (idx < currentStep) return c;
            return MAGICAL_RUNES[Math.floor(Math.random() * MAGICAL_RUNES.length)];
          })
          .join('')
      );
    }, 35);

    const lockInterval = setInterval(() => {
      currentStep++;
      if (currentStep > chars.length) {
        clearInterval(scrambleInterval);
        clearInterval(lockInterval);
        setDisplayText(text);
      }
    }, speedMs);

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(lockInterval);
    };
  }, [text, speedMs, triggerKey]);

  return (
    <span className={className} style={style}>
      {displayText}
    </span>
  );
};

export const HeroCover: React.FC<HeroCoverProps> = ({ onOpenFlipbook, onExploreChronicles, onOpenGallery }) => {
  const { themeMode, getHouseColor, personalInfo } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [spellRecastKey, setSpellRecastKey] = React.useState(0);

  const handleRecastSpell = () => {
    setSpellRecastKey((prev) => prev + 1);
    soundFx.playWandCast();
  };

  const heroImage = personalInfo.profilePic || '/images/atharva-suit.jpg';

  return (
    <section id="cover" className={`relative min-h-[92vh] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b transition-colors duration-500 ${
      isLumos ? 'border-[#CBD5E1] bg-[#FFFFFF]' : 'border-[#1E1E24] bg-[#000000]'
    }`}>
      {/* Background Marauder's Map Watermark Typography */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none flex flex-col justify-around ${
        isLumos ? 'opacity-[0.02] text-[#78350F]' : 'opacity-[0.015] text-white'
      }`}>
        <div className="font-cinzel-dec text-[11vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter">
          SOLEMNLY SWEAR I AM UP TO GOOD
        </div>
        <div className="font-cinzel-dec text-[11vw] font-black uppercase whitespace-nowrap leading-none tracking-tighter text-right">
          MISCHIEF MANAGED • HOGWARTS 2026
        </div>
      </div>

      {/* Top Issue Title & Daily Prophet Header Masthead */}
      <div className={`relative z-10 w-full pt-4 pb-6 border-b-2 flex flex-col md:flex-row items-start md:items-end justify-between gap-4 ${
        isLumos ? 'border-[#8B0000]' : 'border-[#DC2626]'
      }`}
      style={{ borderColor: houseStyles.border }}
      >
        <div
          className="relative group cursor-pointer select-none"
          onClick={handleRecastSpell}
          title="Click to recast magical title spell animation"
        >
          {/* Animated Magical Sparkle Stars around Title Card */}
          <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
            {/* Sparkle 1: Top-Left of ATHARVA (Golden Star) */}
            <svg
              className="absolute -top-3 -left-3 w-6 h-6 text-amber-300 magical-sparkle-star"
              style={{ '--twinkle-speed': '2.4s', '--twinkle-delay': '0s' } as React.CSSProperties}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

            {/* Sparkle 2: Left Mid near ATHARVA 'A' (Spell Pink Glint) */}
            <svg
              className="absolute top-8 -left-6 w-4 h-4 text-pink-400 magical-sparkle-star"
              style={{ '--twinkle-speed': '3.2s', '--twinkle-delay': '0.7s' } as React.CSSProperties}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

            {/* Sparkle 3: Between ATHARVA and BAGWE (Pure White Sparkle) */}
            <svg
              className="absolute top-[48%] left-10 w-5 h-5 text-white magical-sparkle-star"
              style={{ '--twinkle-speed': '2.8s', '--twinkle-delay': '1.2s' } as React.CSSProperties}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

            {/* Sparkle 4: Center Right of ATHARVA (Magenta Sparkle) */}
            <svg
              className="absolute top-6 right-16 sm:right-24 w-5 h-5 text-fuchsia-400 magical-sparkle-star"
              style={{ '--twinkle-speed': '3.5s', '--twinkle-delay': '0.4s' } as React.CSSProperties}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

            {/* Sparkle 5: Mid-Right floating (Golden Amber) */}
            <svg
              className="absolute top-1/2 -right-4 w-4 h-4 text-amber-400 magical-sparkle-star"
              style={{ '--twinkle-speed': '2.6s', '--twinkle-delay': '1.8s' } as React.CSSProperties}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

            {/* Sparkle 6: Beside BAGWE 'G/W' (Bright Crimson Glint) */}
            <svg
              className="absolute bottom-4 left-[38%] w-4 h-4 text-rose-500 magical-sparkle-star"
              style={{ '--twinkle-speed': '3.0s', '--twinkle-delay': '1.5s' } as React.CSSProperties}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>

            {/* Sparkle 7: Right of BAGWE 'E' (Radiant Gold Star) */}
            <svg
              className="absolute bottom-2 left-[58%] sm:left-[62%] w-5 h-5 text-yellow-300 magical-sparkle-star"
              style={{ '--twinkle-speed': '2.2s', '--twinkle-delay': '0.9s' } as React.CSSProperties}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span
              className="font-cinzel text-xs tracking-widest uppercase font-black px-2.5 py-0.5 border rounded shadow-sm"
              style={{
                backgroundColor: isLumos ? houseStyles.primary : `${houseStyles.primary}25`,
                color: '#FFFFFF',
                borderColor: houseStyles.border
              }}
            >
              SPECIAL DAILY PROPHET EDITION • {houseStyles.badge}
            </span>
            <span className={`font-mono-runes text-xs font-bold tracking-wider ${
              isLumos ? 'text-[#0F172A]' : 'text-[#E2E8F0]'
            }`}>
              {personalInfo.volume}
            </span>
            <span className="opacity-40">•</span>
            <span className="font-cinzel text-xs tracking-wider font-bold" style={{ color: houseStyles.secondary }}>
              {personalInfo.publicationDate}
            </span>
          </div>

          <h1 className="font-cinzel-dec text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight leading-[0.88] transition-all duration-700">
            {/* ATHARVA: Pure brilliant white in Knox mode, pure black in Lumos mode */}
            <span className="block">
              <MagicalRuneText
                text={personalInfo.shortName || 'ATHARVA'}
                speedMs={80}
                triggerKey={spellRecastKey}
                className="inline-block transition-transform duration-500 group-hover:scale-[1.01]"
                style={{
                  color: isLumos ? '#000000' : '#FFFFFF',
                  textShadow: isLumos
                    ? 'none'
                    : '0 0 20px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)'
                }}
              />
            </span>

            {/* BAGWE: Brightest, boldest house color hue (Gryffindor Red, Ravenclaw Blue, Slytherin Emerald, Hufflepuff Gold) */}
            <span className="block mt-1 sm:mt-2">
              <MagicalRuneText
                text={personalInfo.name.split(' ').slice(1).join(' ') || 'BAGWE'}
                speedMs={95}
                triggerKey={spellRecastKey}
                className="inline-block text-transparent bg-clip-text font-black magical-title-gradient transition-all duration-500 group-hover:scale-[1.01]"
                style={{
                  backgroundImage: isLumos
                    ? houseStyles.name === 'Gryffindor'
                      ? 'linear-gradient(110deg, #8B0000 0%, #B91C1C 35%, #78350F 70%, #8B0000 100%)'
                      : houseStyles.name === 'Ravenclaw'
                      ? 'linear-gradient(110deg, #0C4A6E 0%, #0369A1 35%, #78350F 70%, #0C4A6E 100%)'
                      : houseStyles.name === 'Slytherin'
                      ? 'linear-gradient(110deg, #065F46 0%, #047857 35%, #0F172A 70%, #065F46 100%)'
                      : 'linear-gradient(110deg, #92400E 0%, #B45309 35%, #451A03 70%, #92400E 100%)'
                    : houseStyles.name === 'Gryffindor'
                      ? 'linear-gradient(110deg, #FF1E40 0%, #FF4D6D 30%, #FFD700 50%, #FF4D6D 70%, #FF0033 100%)'
                      : houseStyles.name === 'Ravenclaw'
                      ? 'linear-gradient(110deg, #00D2FF 0%, #38BDF8 30%, #E0F2FE 50%, #38BDF8 70%, #0284C7 100%)'
                      : houseStyles.name === 'Slytherin'
                      ? 'linear-gradient(110deg, #00FF87 0%, #10B981 30%, #A7F3D0 50%, #10B981 70%, #059669 100%)'
                      : 'linear-gradient(110deg, #FFD700 0%, #FBBF24 30%, #FEF08A 50%, #FBBF24 70%, #F59E0B 100%)',
                  filter: isLumos
                    ? 'none'
                    : houseStyles.name === 'Gryffindor'
                      ? 'drop-shadow(0 0 25px rgba(255, 30, 64, 0.95)) drop-shadow(0 0 45px rgba(255, 215, 0, 0.6))'
                      : houseStyles.name === 'Ravenclaw'
                      ? 'drop-shadow(0 0 25px rgba(0, 210, 255, 0.95)) drop-shadow(0 0 45px rgba(56, 189, 248, 0.6))'
                      : houseStyles.name === 'Slytherin'
                      ? 'drop-shadow(0 0 25px rgba(0, 255, 135, 0.95)) drop-shadow(0 0 45px rgba(16, 185, 129, 0.6))'
                      : 'drop-shadow(0 0 25px rgba(255, 215, 0, 0.95)) drop-shadow(0 0 45px rgba(245, 158, 11, 0.6))'
                }}
              />
            </span>
          </h1>
        </div>

        {/* Rotating Circular Ministry Stamp Overlay */}
        <div className="self-end md:self-auto flex items-center gap-4">
          <CircularStampBadge
            text={`• ${personalInfo.name.toUpperCase()} • THE DAILY PROPHET • ${houseStyles.name.toUpperCase()} SPECIAL •`}
            subText="EST. 2026"
            size={140}
            onClick={onOpenFlipbook}
          />
        </div>
      </div>

      {/* Famous Wizarding Quote Ribbon */}
      <div className={`my-6 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm font-fell italic transition-all ${
        isLumos
          ? 'bg-amber-50/80 border-amber-300 text-slate-800'
          : 'bg-white/[0.04] border-white/15 text-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="shrink-0 text-amber-500 animate-pulse" />
          <span>"Words are, in my not-so-humble opinion, our most inexhaustible source of magic. Capable of both inflicting injury, and remedying it."</span>
        </div>
        <span className="font-cinzel font-black not-italic text-[11px] shrink-0" style={{ color: isLumos ? '#8B0000' : '#FDE047' }}>
          — Albus Dumbledore
        </span>
      </div>

      {/* Main 3-Column Editorial Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 my-8 items-stretch">
        {/* Left Column: Editorial Feature & Metadata Block (5 cols) */}
        <div className={`lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-sm transition-all duration-300 ${
          isLumos
            ? 'glass-card-lumos'
            : 'glass-card-nox'
        }`}>
          <div className="space-y-4">
            <div className={`flex items-center justify-between pb-3 border-b ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <div className="flex items-center gap-2">
                <Radio size={14} className="animate-pulse" style={{ color: houseStyles.primary }} />
                <span className="font-cinzel text-xs font-black tracking-wider uppercase" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  MCR APPRENTICE & ANALYST
                </span>
              </div>
              <span className={`font-mono-runes text-[11px] font-bold uppercase ${
                isLumos ? 'text-[#0F172A]' : 'text-[#E2E8F0]'
              }`}>
                NETWORK 18
              </span>
            </div>

            {/* Editorial Statement */}
            <div className="space-y-3">
              <span className="font-cinzel text-[11px] uppercase tracking-widest block font-bold flex items-center gap-1" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                <Wand2 size={12} /> // THE PROPHET'S MANIFESTO
              </span>
              <p className={`font-fell italic text-lg sm:text-xl leading-relaxed font-bold ${
                isLumos ? 'text-[#090D16]' : 'text-[#F1F5F9]'
              }`}>
                "{personalInfo.editorNote[0]}"
              </p>
              <p className={`text-xs leading-relaxed font-sans-body font-medium ${
                isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
              }`}>
                {personalInfo.editorNote[1]}
              </p>
            </div>

            {/* Quick Spec Matrix */}
            <div className={`grid grid-cols-2 gap-3 pt-4 border-t font-mono-runes text-xs ${
              isLumos ? 'border-slate-300' : 'border-white/20'
            }`}>
              <div className={`p-3 rounded transition-all ${
                isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
              }`}>
                <span className={`text-[10px] block uppercase font-cinzel font-black ${
                  isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'
                }`}>ACADEMIC DEGREE</span>
                <span className="font-black text-xs block mt-1" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  {personalInfo.educationSummary.degree} (GPA: {personalInfo.educationSummary.gpa})
                </span>
                <span className={`text-[10px] font-bold block mt-0.5 ${isLumos ? 'text-[#090D16]' : 'text-[#F1F5F9]'}`}>{personalInfo.educationSummary.college}</span>
              </div>
              <div className={`p-3 rounded transition-all ${
                isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
              }`}>
                <span className={`text-[10px] block uppercase font-cinzel font-black ${
                  isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'
                }`}>MINISTRY LOCATION</span>
                <span className={`font-black text-xs block mt-1 flex items-center gap-1 ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                  <MapPin size={12} style={{ color: houseStyles.primary }} /> {personalInfo.location}
                </span>
                <span className={`text-[10px] font-bold block mt-0.5 ${isLumos ? 'text-[#090D16]' : 'text-[#F1F5F9]'}`}>ID: #{personalInfo.ministryId}</span>
              </div>
            </div>
          </div>

          <div className={`mt-6 pt-4 border-t flex items-center justify-between ${
            isLumos ? 'border-slate-200/80' : 'border-white/10'
          }`}>
            <button
              onClick={() => {
                soundFx.playWandCast();
                onExploreChronicles();
              }}
              className="flex items-center gap-2 text-xs font-cinzel hover:opacity-80 font-black transition-colors cursor-pointer group"
              style={{ color: isLumos ? '#090D16' : houseStyles.secondary }}
            >
              <span>EXPLORE MINISTRY CHRONICLES</span>
              <ArrowDownRight size={14} className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" style={{ color: houseStyles.primary }} />
            </button>
            <RubberStamp label="VERIFIED" subLabel="MINISTRY OF MAGIC" variant="wax-crimson" angle={-3} />
          </div>
        </div>

        {/* Center Column: Moving Portrait Frame with Interactive B&W to Color Hover (4 cols) */}
        <div className={`lg:col-span-4 relative flex flex-col justify-between p-6 rounded-sm overflow-hidden ${
          isLumos
            ? 'glass-card-lumos'
            : 'glass-card-nox'
        }`}
        style={{ borderColor: isLumos ? undefined : houseStyles.border }}
        >
          {/* Top Frame Label */}
          <div className={`flex items-center justify-between text-xs font-cinzel pb-2 border-b ${
            isLumos ? 'border-slate-200/80 text-[#090D16]' : 'border-white/10 text-[#F1F5F9]'
          }`}>
            <span className="font-bold">FIG. 01 — ENCHANTED MOVING PORTRAIT</span>
            <span className="font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>{personalInfo.issueNumber}</span>
          </div>

          {/* Moving Portrait Frame with B&W to Color cursor hover */}
          <div
            onClick={() => {
              soundFx.playWandCast();
              onOpenGallery();
            }}
            className={`relative my-4 aspect-[4/5] border flex flex-col items-center justify-end p-4 text-center overflow-hidden cursor-pointer group rounded ${
              isLumos
                ? 'bg-[#F8FAFC] border-slate-300'
                : 'bg-[#050508] border-white/15'
            }`}
            style={{
              borderColor: houseStyles.border
            }}
          >
            {/* Real Moving Portrait Image */}
            <img
              src={heroImage}
              alt={personalInfo.name}
              className="absolute inset-0 w-full h-full object-cover object-top magical-portrait-bw group-hover:scale-105 transition-all duration-700"
            />

            {/* Hover Lumos Glow Overlay Badge */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-cinzel font-bold text-[#FDE047] border border-[#D4AF37]/60 flex items-center gap-1 z-20">
              <Sparkles size={10} className="animate-spin" />
              <span>LUMOS ACTIVE</span>
            </div>

            {/* Subtle Gradient Vignette at Bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none" />

            {/* Portrait Monogram & Caption Overlay */}
            <div className="relative z-20 text-center w-full space-y-1">
              <span className="font-cinzel-dec font-black text-xl text-white block drop-shadow-md">
                {personalInfo.name}
              </span>
              <p className="font-fell italic text-xs max-w-[240px] mx-auto text-amber-200 drop-shadow font-semibold">
                {personalInfo.tagline}
              </p>
            </div>

            {/* Vintage Corner Runes */}
            <div className="absolute top-2 left-2 font-mono-runes text-[8px] bg-black/80 px-1.5 py-0.5 rounded text-white z-20 uppercase font-bold">
              MCR BROADCAST
            </div>
            <div className="absolute bottom-2 right-2 font-mono-runes text-[8px] bg-black/80 px-1.5 py-0.5 rounded text-[#10B981] z-20 uppercase flex items-center gap-1 font-bold">
              <Camera size={10} />
              <span>OPEN GALLERY ↗</span>
            </div>
          </div>

          {/* Bottom Barcode / Identifier */}
          <div className={`pt-2 border-t flex items-center justify-between text-xs font-mono-runes ${
            isLumos ? 'border-slate-200/80 text-[#1E293B]' : 'border-white/10 text-[#CBD5E1]'
          }`}>
            <span className="text-[11px] font-bold">MINISTRY ID: #{personalInfo.ministryId}</span>
            <span className="text-[#059669] text-[10px] font-black">ACTIVE & READY</span>
          </div>
        </div>

        {/* Right Column: Daily Prophet Catalog Barcode & Quick Jump (3 cols) */}
        <div className={`lg:col-span-3 flex flex-col justify-between p-6 rounded-sm transition-all duration-300 ${
          isLumos
            ? 'glass-card-lumos'
            : 'glass-card-nox'
        }`}>
          <div>
            <div className={`flex items-center justify-between pb-3 border-b ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <span className="font-cinzel text-xs font-black uppercase tracking-wider" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                GRIMOIRE INDEX
              </span>
              <span
                className="font-mono-runes text-[10px] px-2 py-0.5 rounded font-black border"
                style={{
                  backgroundColor: isLumos ? `${houseStyles.primary}15` : `${houseStyles.primary}25`,
                  color: isLumos ? houseStyles.primary : houseStyles.secondary,
                  borderColor: houseStyles.border
                }}
              >
                PAGES
              </span>
            </div>

            {/* Quick Chapter Shortcuts */}
            <div className="mt-4 space-y-2.5 font-cinzel text-xs">
              <a
                href="#chronicles"
                onClick={() => soundFx.playWandCast()}
                className={`flex items-center justify-between p-2.5 rounded transition-all ${
                  isLumos
                    ? 'glass-sub-lumos hover:border-[#8B0000] text-[#090D16] hover:bg-white'
                    : 'glass-sub-nox hover:border-[#D4AF37] text-[#F1F5F9] hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black font-mono" style={{ color: houseStyles.primary }}>02</span>
                  <span className="font-bold">CHRONICLES</span>
                </div>
                <span className={`text-[10px] font-bold ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>PG. 06</span>
              </a>

              <a
                href="#works"
                onClick={() => soundFx.playWandCast()}
                className={`flex items-center justify-between p-2.5 rounded transition-all ${
                  isLumos
                    ? 'glass-sub-lumos hover:border-[#8B0000] text-[#090D16] hover:bg-white'
                    : 'glass-sub-nox hover:border-[#D4AF37] text-[#F1F5F9] hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black font-mono" style={{ color: houseStyles.primary }}>03</span>
                  <span className="font-bold">ENCHANTED WORKS</span>
                </div>
                <span className={`text-[10px] font-bold ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>PG. 10</span>
              </a>

              <a
                href="#spells"
                onClick={() => soundFx.playWandCast()}
                className={`flex items-center justify-between p-2.5 rounded transition-all ${
                  isLumos
                    ? 'glass-sub-lumos hover:border-[#8B0000] text-[#090D16] hover:bg-white'
                    : 'glass-sub-nox hover:border-[#D4AF37] text-[#F1F5F9] hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black font-mono" style={{ color: houseStyles.primary }}>04</span>
                  <span className="font-bold">SPELLS GRIMOIRE</span>
                </div>
                <span className={`text-[10px] font-bold ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>PG. 16</span>
              </a>

              <a
                href="#beasts"
                onClick={() => soundFx.playWandCast()}
                className={`flex items-center justify-between p-2.5 rounded transition-all ${
                  isLumos
                    ? 'glass-sub-lumos hover:border-[#8B0000] text-[#090D16] hover:bg-white'
                    : 'glass-sub-nox hover:border-[#D4AF37] text-[#F1F5F9] hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black font-mono" style={{ color: houseStyles.primary }}>05</span>
                  <span className="font-bold">BEASTS SANCTUARY</span>
                </div>
                <span className={`text-[10px] font-bold ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>PG. 20</span>
              </a>

              <a
                href="#pensieve"
                onClick={() => soundFx.playWandCast()}
                className={`flex items-center justify-between p-2.5 rounded transition-all ${
                  isLumos
                    ? 'glass-sub-lumos hover:border-[#8B0000] text-[#090D16] hover:bg-white'
                    : 'glass-sub-nox hover:border-[#D4AF37] text-[#F1F5F9] hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black font-mono" style={{ color: houseStyles.primary }}>06</span>
                  <span className="font-bold">PENSIEVE WISDOM</span>
                </div>
                <span className={`text-[10px] font-bold ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>PG. 24</span>
              </a>

              <a
                href="#gallery"
                onClick={() => soundFx.playWandCast()}
                className={`flex items-center justify-between p-2.5 rounded transition-all ${
                  isLumos
                    ? 'glass-sub-lumos hover:border-[#8B0000] text-[#090D16] hover:bg-white'
                    : 'glass-sub-nox hover:border-[#D4AF37] text-[#F1F5F9] hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black font-mono" style={{ color: houseStyles.primary }}>07</span>
                  <span className="font-bold">PHOTO GALLERY</span>
                </div>
                <span className={`text-[10px] font-bold ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>PG. 28</span>
              </a>

              <a
                href="#colophon"
                onClick={() => soundFx.playWandCast()}
                className={`flex items-center justify-between p-2.5 rounded transition-all ${
                  isLumos
                    ? 'glass-sub-lumos hover:border-[#8B0000] text-[#090D16] hover:bg-white'
                    : 'glass-sub-nox hover:border-[#D4AF37] text-[#F1F5F9] hover:text-white hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-black font-mono" style={{ color: houseStyles.primary }}>08</span>
                  <span className="font-bold">OWL POST</span>
                </div>
                <span className={`text-[10px] font-bold ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>PG. 36</span>
              </a>
            </div>
          </div>

          {/* Barcode Graphic & Trigger */}
          <div className={`mt-6 pt-4 border-t space-y-3 ${
            isLumos ? 'border-slate-200/80' : 'border-white/10'
          }`}>
            <div
              onClick={() => {
                soundFx.playPageTurn();
                onOpenFlipbook();
              }}
              title="Click to launch interactive 3D Standard Book of Spells"
              className={`p-3 rounded cursor-pointer group transition-all ${
                isLumos
                  ? 'glass-sub-lumos hover:border-[#8B0000]'
                  : 'glass-sub-nox hover:border-[#D4AF37]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`font-cinzel text-[9px] tracking-widest uppercase font-black ${
                  isLumos ? 'text-[#1E293B]' : 'text-[#E2E8F0]'
                }`}>
                  HOGWARTS LIBRARY CODE
                </span>
                <span className="font-cinzel text-[9px] font-black group-hover:underline" style={{ color: houseStyles.primary }}>
                  OPEN 3D SPELLBOOK ↗
                </span>
              </div>
              <div className="h-9 w-full flex items-center justify-between gap-[2px] opacity-90 group-hover:opacity-100 transition-opacity">
                {[12, 28, 16, 32, 8, 24, 18, 30, 10, 26, 14, 34, 20, 16, 28, 22, 10, 32, 18, 26, 14, 30, 24, 12, 34, 18, 22, 14, 28, 20].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}px`, backgroundColor: isLumos ? houseStyles.primary : houseStyles.secondary }}
                    className="w-full transition-colors"
                  />
                ))}
              </div>
              <div className={`text-center font-mono-runes text-[9px] font-bold tracking-[0.25em] mt-1 ${
                isLumos ? 'text-[#0F172A]' : 'opacity-90 text-white'
              }`}>
                ISBN 978-0-HOGWARTS-ATHARVA-394
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Daily Prophet Footer Banner */}
      <div className={`relative z-10 w-full pt-4 border-t flex flex-col sm:flex-row items-center justify-between text-xs font-medieval gap-2 ${
        isLumos ? 'border-[#CBD5E1] text-[#334155]' : 'border-[#1E1E24] text-[#94A3B8]'
      }`}>
        <div className="flex items-center gap-2">
          <span className="font-bold" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>THE DAILY PROPHET</span>
          <span>•</span>
          <span className="font-bold">HOGWARTS / MUMBAI DISPATCH</span>
          <span>•</span>
          <span className="font-mono-runes font-bold">{personalInfo.email}</span>
        </div>
        <div className="flex items-center gap-3 font-bold">
          <span>PRICE: 5 KNUTS</span>
          <span>•</span>
          <span style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>CIRCULATION: WIZARDING GLOBAL</span>
        </div>
      </div>
    </section>
  );
};
