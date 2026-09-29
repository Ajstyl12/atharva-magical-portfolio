import React, { useState, useEffect } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { HARRY_POTTER_QUOTES, type WizardQuote } from '../data/wizardLoreData';
import { Sparkles, Quote, RefreshCw, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { RubberStamp } from './StampBadge';

export const PensieveQuotes: React.FC = () => {
  const { themeMode, getHouseColor } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSwirling, setIsSwirling] = useState<boolean>(false);

  const categories = ['ALL', 'WISDOM', 'COURAGE', 'CHOICES', 'MAGIC', 'WIT', 'LOYALTY'];

  const filteredQuotes = HARRY_POTTER_QUOTES.filter((q) => {
    return activeCategory === 'ALL' || q.category === activeCategory;
  });

  const featuredMemory: WizardQuote = filteredQuotes[currentIndex % filteredQuotes.length] || HARRY_POTTER_QUOTES[0];

  // Auto-rotate featured memory quote every 6.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSwirling(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
        setIsSwirling(false);
      }, 350);
    }, 6500);

    return () => clearInterval(interval);
  }, [filteredQuotes.length]);

  const handleDrawRandomMemory = () => {
    soundFx.playPensieveSwirl();
    setIsSwirling(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      setCurrentIndex(randomIndex);
      setIsSwirling(false);
    }, 350);
  };

  const handleSelectSnape = () => {
    soundFx.playPensieveSwirl();
    setIsSwirling(true);
    setActiveCategory('ALL');
    const snapeIndex = HARRY_POTTER_QUOTES.findIndex(q => q.speaker.includes('Snape'));
    setTimeout(() => {
      if (snapeIndex !== -1) {
        setCurrentIndex(snapeIndex);
      }
      setIsSwirling(false);
    }, 300);
  };

  const handleSelectQuoteBySpeaker = (targetIndex: number) => {
    soundFx.playWandCast();
    setIsSwirling(true);
    setActiveCategory('ALL');
    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setIsSwirling(false);
    }, 250);
  };

  const handleNextMemory = () => {
    soundFx.playWandCast();
    setIsSwirling(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredQuotes.length);
      setIsSwirling(false);
    }, 250);
  };

  const handlePrevMemory = () => {
    soundFx.playWandCast();
    setIsSwirling(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredQuotes.length) % filteredQuotes.length);
      setIsSwirling(false);
    }, 250);
  };

  return (
    <section
      id="pensieve"
      aria-label="The Pensieve of Inspiration & Motivational Quotes"
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
            <Sparkles size={13} className="animate-spin-slow" />
            <span>THE PENSIEVE // INSPIRATION & MOTIVATION</span>
          </div>

          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black font-cinzel-dec tracking-wider ${
            isLumos ? 'text-[#090D16]' : 'text-white'
          }`}>
            PENSIEVE OF MOTIVATION
          </h2>

          <p className={`text-xs sm:text-sm font-fell italic ${
            isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'
          }`}>
            "Siphon timeless wisdom and unyielding motivation from master wizards and visionaries."
          </p>
        </div>

        {/* Category Pills & Prominent Severus Snape Featured Pill */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
          {/* Snape Instant Staple Button */}
          <button
            onClick={handleSelectSnape}
            className={`px-3 py-1 rounded-full text-[11px] font-cinzel font-black uppercase tracking-wider flex items-center gap-1 border shadow-md transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              featuredMemory.speaker.includes('Snape')
                ? 'bg-red-600 text-white border-red-400 ring-2 ring-red-500 scale-105 animate-pulse'
                : 'bg-red-950/40 text-red-300 border-red-500/40 hover:bg-red-900/60'
            }`}
          >
            <Heart size={12} className="fill-red-500 text-red-500" />
            <span>SNAPE • ALWAYS</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playWandCast();
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-cinzel font-bold border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'shadow-sm scale-105'
                  : isLumos
                  ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
              }`}
              style={{
                backgroundColor: activeCategory === cat ? houseStyles.primary : undefined,
                color: activeCategory === cat ? '#FFFFFF' : undefined,
                borderColor: activeCategory === cat ? houseStyles.border : undefined
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* SINGLE Pensieve Basin Container */}
        <div className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-500 overflow-hidden ${
          featuredMemory.speaker.includes('Snape')
            ? isLumos
              ? 'bg-red-50/90 border-red-400 shadow-xl ring-2 ring-red-300'
              : 'bg-slate-900/95 border-red-500/60 shadow-2xl ring-2 ring-red-500/30 backdrop-blur-md'
            : isLumos
            ? 'bg-white border-amber-300/80 shadow-lg'
            : 'bg-slate-900/90 border-sky-500/40 shadow-2xl backdrop-blur-md'
        } ${isSwirling ? 'opacity-30 scale-[0.98] filter blur-[2px]' : 'opacity-100 scale-100'}`}
        style={{
          boxShadow: featuredMemory.speaker.includes('Snape')
            ? '0 0 40px rgba(220, 38, 38, 0.3)'
            : isLumos
            ? '0 8px 30px rgba(212, 175, 55, 0.15)'
            : '0 0 40px rgba(56, 189, 248, 0.25)'
        }}
        >
          {/* Decorative Corner Seal */}
          <div className="absolute top-4 right-4 rotate-6 transform z-20 pointer-events-none scale-90 sm:scale-100">
            <RubberStamp
              label={featuredMemory.speaker.includes('Snape') ? "ALWAYS • SNAPE" : "MOTIVATION"}
              variant={featuredMemory.speaker.includes('Snape') ? 'wax-crimson' : 'wax-gold'}
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrevMemory}
            aria-label="Previous Memory"
            className={`absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all duration-200 z-20 cursor-pointer ${
              isLumos
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-white/10 text-sky-300 border-white/20 hover:bg-white/20'
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNextMemory}
            aria-label="Next Memory"
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full border transition-all duration-200 z-20 cursor-pointer ${
              isLumos
                ? 'bg-amber-50 text-amber-900 border-amber-300 hover:bg-amber-100'
                : 'bg-white/10 text-sky-300 border-white/20 hover:bg-white/20'
            }`}
          >
            <ChevronRight size={20} />
          </button>

          <div className="space-y-4 max-w-2xl mx-auto text-center px-4 sm:px-6">
            {/* Memory Citation Badge & Snape Special Highlight */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-runes font-bold"
                style={{
                  backgroundColor: featuredMemory.speaker.includes('Snape')
                    ? 'rgba(220, 38, 38, 0.2)'
                    : isLumos
                    ? '#FEF3C7'
                    : 'rgba(255, 255, 255, 0.1)',
                  color: featuredMemory.speaker.includes('Snape')
                    ? '#EF4444'
                    : isLumos
                    ? '#78350F'
                    : '#FDE047'
                }}
              >
                <Quote size={13} />
                <span>{featuredMemory.bookOrContext}</span>
              </div>

              {featuredMemory.speaker.includes('Snape') && (
                <span className="px-3 py-1 rounded-full text-xs font-cinzel font-black uppercase bg-red-600 text-white animate-pulse shadow-md flex items-center gap-1">
                  <Heart size={12} className="fill-white" />
                  <span>SEVERUS SNAPE STAPLE</span>
                </span>
              )}

              <span className={`text-[10px] font-mono-runes uppercase px-2 py-0.5 rounded border ${
                isLumos ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-white/5 border-white/10 text-slate-300'
              }`}>
                {featuredMemory.category}
              </span>
            </div>

            {/* Main Featured Quote Text */}
            <blockquote className={`text-xl sm:text-2xl md:text-3xl font-fell italic leading-relaxed px-2 transition-all duration-300 ${
              featuredMemory.speaker.includes('Snape')
                ? 'text-red-600 dark:text-red-400 font-bold'
                : isLumos
                ? 'text-[#090D16]'
                : 'text-white'
            }`}>
              "{featuredMemory.quote}"
            </blockquote>

            {/* Speaker & Role */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-sm">
              <span className="font-cinzel-dec font-black tracking-wider text-base sm:text-lg" style={{
                color: featuredMemory.speaker.includes('Snape')
                  ? '#DC2626'
                  : isLumos
                  ? '#8B0000'
                  : '#38BDF8'
              }}>
                — {featuredMemory.speaker}
              </span>
              <span className={`font-mono-runes text-xs opacity-75 ${isLumos ? 'text-slate-600' : 'text-slate-400'}`}>
                ({featuredMemory.role})
              </span>
            </div>

            {/* Tech Parallel Note */}
            {featuredMemory.techParallel && (
              <div className={`p-3.5 rounded-xl border text-left max-w-lg mx-auto space-y-1 transition-all ${
                featuredMemory.speaker.includes('Snape')
                  ? isLumos
                    ? 'bg-red-100/80 border-red-300 text-red-950'
                    : 'bg-red-950/40 border-red-500/30 text-red-100'
                  : isLumos
                  ? 'bg-amber-50/90 border-amber-200 text-slate-900'
                  : 'bg-white/5 border-white/10 text-slate-200'
              }`}>
                <div className="flex items-center gap-1.5 text-[11px] font-cinzel font-black uppercase text-amber-700 dark:text-amber-400">
                  <Sparkles size={13} />
                  <span>ATHARVA'S MOTIVATIONAL PARALLEL:</span>
                </div>
                <p className="text-xs font-sans-body leading-relaxed">
                  {featuredMemory.techParallel}
                </p>
              </div>
            )}

            {/* Bottom Actions & Dots */}
            <div className="pt-2 flex flex-col items-center gap-3">
              <button
                onClick={handleDrawRandomMemory}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-cinzel font-black tracking-wider uppercase shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer ${
                  featuredMemory.speaker.includes('Snape')
                    ? 'bg-red-600 text-white hover:bg-red-700 ring-2 ring-red-400'
                    : isLumos
                    ? 'bg-[#8B0000] text-white hover:bg-[#700000]'
                    : 'bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white hover:brightness-110'
                }`}
              >
                <RefreshCw size={14} className={isSwirling ? 'animate-spin' : ''} />
                <span>SWIRL PENSIEVE MEMORY</span>
                <Sparkles size={14} />
              </button>

              {/* Speaker Ribbon Selectors */}
              <div className="flex flex-wrap items-center justify-center gap-1 max-w-xl mx-auto pt-1">
                {HARRY_POTTER_QUOTES.map((q, idx) => {
                  const isSnapeQuote = q.speaker.includes('Snape');
                  const isSelected = featuredMemory.id === q.id;
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleSelectQuoteBySpeaker(idx)}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono-runes font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? isSnapeQuote
                            ? 'bg-red-600 text-white border-red-500 font-bold scale-105 shadow-sm'
                            : 'bg-sky-500 text-white border-sky-400 font-bold scale-105 shadow-sm'
                          : isSnapeQuote
                          ? 'bg-red-950/30 text-red-400 border-red-500/40 hover:bg-red-900/50'
                          : isLumos
                          ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      {isSnapeQuote ? '❤️ Snape' : q.speaker.split(' ')[0]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
