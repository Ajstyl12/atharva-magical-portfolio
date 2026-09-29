import React, { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { soundFx } from '../utils/audioEffects';
import { Sparkles, Wand2, ArrowRight } from 'lucide-react';

interface MaraudersLoaderProps {
  onComplete: () => void;
}

export const MaraudersLoader: React.FC<MaraudersLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [quoteStage, setQuoteStage] = useState<number>(0);
  const [isFinishing, setIsFinishing] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  // Refs for Anime.js targets
  const crestRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const runesRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── Magical entrance animation via Anime.js ──────────────────────────
  useEffect(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    // 1. Ink-wash overlay sweeps up and fades
    if (overlayRef.current) {
      animate(overlayRef.current, {
        scaleY: [1, 0],
        opacity: [1, 0],
        duration: 1100,
        ease: 'outExpo',
        delay: 200,
        transformOrigin: 'bottom'
      });
    }

    // 2. Crest pops in with elastic spring
    if (crestRef.current) {
      animate(crestRef.current, {
        scale: [0, 1.15, 1],
        opacity: [0, 1],
        rotate: [-15, 5, 0],
        duration: 900,
        ease: 'outElastic',
        delay: 500
      });
    }

    // 3. Title slides up with gold shimmer glow
    if (titleRef.current) {
      animate(titleRef.current, {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 800,
        ease: 'outExpo',
        delay: 750
      });
    }

    // 4. Subtitle fades in
    if (subtitleRef.current) {
      animate(subtitleRef.current, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
        ease: 'outQuad',
        delay: 1000
      });
    }

    // 5. Progress bar slides in from left
    if (progressBarRef.current) {
      animate(progressBarRef.current, {
        translateX: [-60, 0],
        opacity: [0, 1],
        duration: 600,
        ease: 'outBack',
        delay: 1200
      });
    }

    // 6. Enter button pulses in
    if (btnRef.current) {
      animate(btnRef.current, {
        scale: [0.6, 1.08, 1],
        opacity: [0, 1],
        duration: 700,
        ease: 'outBack',
        delay: 1300
      });
    }

    // 7. Shoot magical rune particles from the crest
    spawnRuneParticles();
  }, []);

  // ── Floating magical rune particles ─────────────────────────────────
  const spawnRuneParticles = () => {
    const container = particleContainerRef.current;
    if (!container) return;

    const runes = ['✦', '✧', '⚡', '★', '✶', '⁕', '❋', '✺', '✹', '⟡'];
    const colors = ['#FDE047', '#D4AF37', '#FFFFFF', '#F59E0B', '#EF4444', '#818CF8'];

    for (let i = 0; i < 28; i++) {
      const span = document.createElement('span');
      span.textContent = runes[Math.floor(Math.random() * runes.length)];
      span.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        font-size: ${Math.random() * 14 + 8}px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        pointer-events: none;
        opacity: 0;
        font-family: serif;
        text-shadow: 0 0 8px currentColor;
      `;
      container.appendChild(span);

      const angle = Math.random() * Math.PI * 2;
      const dist = 80 + Math.random() * 200;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      animate(span, {
        translateX: [0, tx],
        translateY: [0, ty],
        opacity: [0, 1, 0],
        scale: [0.3, 1.4, 0.2],
        rotate: [0, Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)],
        duration: 1400 + Math.random() * 800,
        ease: 'outExpo',
        delay: 400 + Math.random() * 600,
        onComplete: () => span.remove()
      });
    }
  };

  // ── Progress auto-advance ─────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 90);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress > 30 && quoteStage === 0) {
      setQuoteStage(1);
    } else if (progress > 70 && quoteStage === 1) {
      setQuoteStage(2);
      // Mid-progress second wave of particles
      spawnRuneParticles();
    } else if (progress === 100 && quoteStage === 2) {
      setQuoteStage(3);
      soundFx.playWandCast();
      spawnRuneParticles();
      const timeout = setTimeout(() => {
        handleEnter();
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [progress, quoteStage]);

  const handleEnter = () => {
    // Final Anime.js exit: everything dissolves upward
    if (crestRef.current) {
      animate(crestRef.current, {
        scale: [1, 1.35],
        opacity: [1, 0],
        duration: 600,
        ease: 'inExpo'
      });
    }
    setIsFinishing(true);
    soundFx.playPageTurn();
    setTimeout(() => onComplete(), 700);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 sm:p-12 transition-all duration-700 bg-[#07070A] overflow-hidden select-none ${
        isFinishing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ── Ink-wash entrance overlay ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-20 bg-[#07070A] pointer-events-none"
        style={{ transformOrigin: 'bottom center' }}
      />

      {/* ── Particle container (sits above loader content) ── */}
      <div
        ref={particleContainerRef}
        className="absolute inset-0 z-30 pointer-events-none overflow-hidden flex items-center justify-center"
      />

      {/* ── Ornate Background Runes Watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.04 }}>
        <span
          className="font-cinzel-dec font-black leading-none text-center"
          style={{ fontSize: '22vw', color: '#FFFFFF' }}
        >
          HOGWARTS
        </span>
      </div>

      {/* ── Magical star field ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background: '#FFFFFF',
              opacity: Math.random() * 0.5 + 0.1,
              animation: `pulse ${2 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ── Top Header Bar ── */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-between border-b pb-4" style={{ borderColor: '#3E3428' }}>
        <div className="flex items-center gap-2 font-cinzel text-xs font-black tracking-widest uppercase" style={{ color: '#FDE047' }}>
          <Wand2 size={15} className="animate-spin" style={{ color: '#FDE047' }} />
          <span style={{ color: '#FDE047' }}>THE DAILY PROPHET • SPECIAL EDITION</span>
        </div>
        <div className="font-mono-runes text-[11px] font-bold" style={{ color: '#FFFFFF' }}>
          EDITION NO. 394 // VOL. 01
        </div>
      </div>

      {/* ── Center Cinematic Content ── */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center my-auto space-y-6">

        {/* Glowing Monogram Crest */}
        <div
          ref={crestRef}
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 flex items-center justify-center"
          style={{
            borderColor: '#D4AF37',
            background: '#100D14',
            boxShadow: '0 0 60px rgba(212,175,55,0.5), 0 0 120px rgba(212,175,55,0.2)',
            opacity: 0
          }}
        >
          <span
            className="font-cinzel-dec font-black tracking-tighter"
            style={{ fontSize: '2.5rem', color: '#FDE047' }}
          >
            AB
          </span>
          <div
            className="absolute -bottom-2 px-2.5 py-0.5 font-cinzel text-[9px] font-black uppercase rounded border"
            style={{ background: '#8B0000', color: '#FDE047', borderColor: '#D4AF37' }}
          >
            EST. 2026
          </div>
          {/* Rotating ring decoration */}
          <div
            className="absolute inset-0 rounded-full border pointer-events-none"
            style={{
              borderColor: 'rgba(212,175,55,0.3)',
              borderStyle: 'dashed',
              animation: 'spin 12s linear infinite'
            }}
          />
        </div>

        {/* Prologue Text Block */}
        <div className="space-y-2">
          <p
            ref={runesRef}
            className="font-medieval text-sm sm:text-base tracking-wider uppercase font-bold"
            style={{ color: '#FFFFFF', opacity: 1 }}
          >
            Messrs. Moony, Wormtail, Padfoot, &amp; Prongs
          </p>

          <h1
            ref={titleRef}
            className="font-cinzel-dec font-black tracking-tight uppercase leading-tight"
            style={{
              fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
              color: '#FFFFFF',
              textShadow: '0 0 30px rgba(255,255,255,1), 0 0 60px rgba(255,255,255,0.6), 0 0 90px rgba(212,175,55,0.4)',
              opacity: 0
            }}
          >
            Atharva Bagwe
          </h1>

          <p
            ref={subtitleRef}
            className="font-fell italic text-xs sm:text-sm font-semibold max-w-md mx-auto"
            style={{ color: '#FFFFFF', opacity: 0 }}
          >
            Electronics &amp; Computer Science Engineering • Network 18 Analyst
          </p>
        </div>

        {/* Progress + Status */}
        <div ref={progressBarRef} className="w-full max-w-md space-y-3 pt-4" style={{ opacity: 0 }}>
          <div className="flex items-center justify-between font-mono-runes text-xs">
            <span className="flex items-center gap-1.5 font-cinzel font-bold" style={{ color: '#FDE047' }}>
              <Sparkles size={13} className="animate-pulse" style={{ color: '#FDE047' }} />
              <span style={{ color: '#FDE047' }}>
                {quoteStage === 0 && 'CASTING ALOHOMORA...'}
                {quoteStage === 1 && 'INK SPREADING ACROSS PARCHMENT...'}
                {quoteStage === 2 && 'REVEALING MINISTRY DOSSIERS...'}
                {quoteStage === 3 && 'MISCHIEF MANAGED.'}
              </span>
            </span>
            <span className="font-bold" style={{ color: '#FDE047' }}>{progress}%</span>
          </div>

          {/* Progress Bar */}
          <div
            className="relative h-2.5 w-full rounded-full overflow-hidden border"
            style={{ background: '#1A1822', borderColor: '#3E3428' }}
          >
            <div
              className="h-full rounded-full transition-all duration-150"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(to right, #8B0000, #D4AF37, #FDE047)',
                boxShadow: '0 0 15px rgba(212,175,55,0.8)'
              }}
            />
            {/* Shimmer sweep */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                animation: 'shimmer 2s linear infinite',
                backgroundSize: '200% 100%'
              }}
            />
          </div>

          {/* Incantation Quote */}
          <p className="font-fell italic text-sm font-bold min-h-[24px]" style={{ color: '#FDE047' }}>
            {progress < 100
              ? '"I solemnly swear that I am up to no good."'
              : '"Mischief Managed."'}
          </p>
        </div>

        {/* Enter Button */}
        <div className="pt-2">
          <button
            ref={btnRef}
            onClick={handleEnter}
            className="flex items-center gap-2 px-6 py-2.5 font-cinzel text-xs font-black uppercase rounded border cursor-pointer transition-all hover:scale-105 active:scale-95"
            style={{
              background: '#8B0000',
              color: '#FDE047',
              borderColor: '#D4AF37',
              boxShadow: '0 0 25px rgba(212,175,55,0.5)',
              opacity: 0
            }}
            onMouseEnter={(e) => {
              animate(e.currentTarget, { scale: 1.08, duration: 200, ease: 'outBack' });
            }}
            onMouseLeave={(e) => {
              animate(e.currentTarget, { scale: 1, duration: 200, ease: 'outBack' });
            }}
          >
            <span>ENTER GRIMOIRE</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Bottom Footer ── */}
      <div
        className="relative z-10 w-full max-w-4xl flex items-center justify-between border-t pt-4 font-medieval text-xs"
        style={{ borderColor: '#3E3428' }}
      >
        <span className="font-bold" style={{ color: '#FFFFFF', textShadow: '0 0 8px rgba(255,255,255,0.4)' }}>
          HOGWARTS SCHOOL OF WITCHCRAFT &amp; WIZARDRY
        </span>
        <button
          onClick={handleEnter}
          className="font-cinzel text-xs font-bold hover:underline cursor-pointer"
          style={{ color: '#FDE047' }}
        >
          SKIP PROLOGUE ↗
        </button>
      </div>
    </div>
  );
};
