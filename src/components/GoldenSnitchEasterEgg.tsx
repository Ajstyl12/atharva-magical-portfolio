import React, { useEffect, useRef, useState, useCallback } from 'react';
import { animate } from 'animejs';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, X, RotateCcw } from 'lucide-react';


export const GoldenSnitchEasterEgg: React.FC = () => {
  const { houseTheme, getHouseColor, themeMode } = useWizardTheme();
  const houseStyles = getHouseColor();
  const isLumos = themeMode === 'lumos';

  // Snitch State
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true); // hide/unhide toggle
  const [isCaught, setIsCaught] = useState<boolean>(false);
  const [catchCount, setCatchCount] = useState<number>(0);
  const [showBanner, setShowBanner] = useState<boolean>(false);

  // Position & animation refs
  const snitchRef = useRef<HTMLDivElement | null>(null);
  const leftWingRef = useRef<SVGSVGElement | null>(null);
  const rightWingRef = useRef<SVGSVGElement | null>(null);

  const shockwaveRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // Physics position
  const posRef = useRef({ x: 200, y: 180 });
  const isEvasiveRef = useRef(false);
  const flightAnimRef = useRef<any>(null);
  const wingAnimRef = useRef<any>(null);

  // Auto-launch once after 12s to surprise the user if they haven't summoned it yet
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for global custom event to summon snitch (e.g. from dock)
  useEffect(() => {
    const handleSummon = () => {
      soundFx.playWandCast();
      setIsCaught(false);
      setShowBanner(false);
      setIsActive(true);
      setIsVisible(true);
      posRef.current = {
        x: Math.max(100, Math.min(window.innerWidth - 100, Math.random() * window.innerWidth)),
        y: Math.max(100, Math.min(window.innerHeight - 150, Math.random() * window.innerHeight * 0.7))
      };
    };
    window.addEventListener('summon-golden-snitch', handleSummon);
    return () => window.removeEventListener('summon-golden-snitch', handleSummon);
  }, []);

  // Listen for toggle-golden-snitch event (hide/unhide from dock)
  useEffect(() => {
    const handleToggle = () => {
      setIsVisible(prev => {
        const next = !prev;
        soundFx.playWandCast();
        // If showing again and not yet active, activate it
        if (next && !isActive) {
          setIsActive(true);
          posRef.current = {
            x: Math.max(120, Math.min(window.innerWidth - 120, Math.random() * window.innerWidth)),
            y: Math.max(120, Math.min(window.innerHeight * 0.7, 180 + Math.random() * 200))
          };
        }
        // Broadcast the new state so dock button can update its label
        window.dispatchEvent(new CustomEvent('snitch-visibility-change', { detail: { visible: next } }));
        return next;
      });
    };
    window.addEventListener('toggle-golden-snitch', handleToggle);
    return () => window.removeEventListener('toggle-golden-snitch', handleToggle);
  }, [isActive]);

  // Wing flapping animation with Anime.js
  useEffect(() => {
    if (!isActive || isCaught) return;

    if (leftWingRef.current && rightWingRef.current) {
      wingAnimRef.current = animate([leftWingRef.current, rightWingRef.current], {
        rotateZ: (_el: any, i: number, _l: number) => (i === 0 ? [-35, 45] : [35, -45]),
        scaleY: [0.65, 1.25],
        scaleX: [0.85, 1.15],
        duration: 90,
        loop: true,
        alternate: true,
        ease: 'inOutSine'
      } as any);
    }

    return () => {
      if (wingAnimRef.current && typeof wingAnimRef.current.pause === 'function') {
        wingAnimRef.current.pause();
      }
    };
  }, [isActive, isCaught]);

  // Organic Bezier wandering flight physics powered by Anime.js
  const startWanderingFlight = useCallback(() => {
    if (!snitchRef.current || isCaught) return;

    const currentX = posRef.current.x;
    const currentY = posRef.current.y;

    // Pick a smooth next flight coordinate inside viewport padding
    const padding = 120;
    const targetX = padding + Math.random() * (window.innerWidth - padding * 2);
    const targetY = padding + Math.random() * (window.innerHeight - padding * 2);

    const distance = Math.hypot(targetX - currentX, targetY - currentY);
    const duration = Math.max(1400, Math.min(3200, distance * 3.5));

    flightAnimRef.current = animate(posRef.current, {
      x: targetX,
      y: targetY,
      duration,
      ease: 'inOutQuad',
      onUpdate: () => {
        if (snitchRef.current) {
          snitchRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
        }
      },
      onComplete: () => {
        if (!isCaught && isActive) {
          startWanderingFlight();
        }
      }
    });
  }, [isCaught, isActive]);

  useEffect(() => {
    if (isActive && !isCaught) {
      startWanderingFlight();
    }
    return () => {
      if (flightAnimRef.current && typeof flightAnimRef.current.pause === 'function') {
        flightAnimRef.current.pause();
      }
    };
  }, [isActive, isCaught, startWanderingFlight]);

  // Evasive Quidditch reaction when cursor approaches
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isActive || isCaught || isEvasiveRef.current || !snitchRef.current) return;

    const dx = posRef.current.x - e.clientX;
    const dy = posRef.current.y - e.clientY;
    const dist = Math.hypot(dx, dy);

    // If wand/cursor gets too close (within 110px), trigger rapid evasive spring dart
    if (dist < 110) {
      isEvasiveRef.current = true;
      if (flightAnimRef.current && typeof flightAnimRef.current.pause === 'function') {
        flightAnimRef.current.pause();
      }

      // Calculate evade direction away from cursor
      const angle = Math.atan2(dy, dx) + (Math.random() * 0.6 - 0.3);
      const escapeDist = 180 + Math.random() * 120;
      let escapeX = posRef.current.x + Math.cos(angle) * escapeDist;
      let escapeY = posRef.current.y + Math.sin(angle) * escapeDist;

      // Keep within screen bounds
      escapeX = Math.max(80, Math.min(window.innerWidth - 80, escapeX));
      escapeY = Math.max(80, Math.min(window.innerHeight - 100, escapeY));

      soundFx.playWandCast();

      flightAnimRef.current = animate(posRef.current, {
        x: escapeX,
        y: escapeY,
        duration: 480,
        ease: 'outExpo',
        onUpdate: () => {
          if (snitchRef.current) {
            snitchRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
          }
        },
        onComplete: () => {
          isEvasiveRef.current = false;
          if (!isCaught) {
            startWanderingFlight();
          }
        }
      });
    }
  }, [isActive, isCaught, startWanderingFlight]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // CATCH THE SNITCH (Click handler)
  const handleCatchSnitch = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCaught) return;

    setIsCaught(true);
    setCatchCount(prev => prev + 1);

    // Stop flight
    if (flightAnimRef.current && typeof flightAnimRef.current.pause === 'function') {
      flightAnimRef.current.pause();
    }
    if (wingAnimRef.current && typeof wingAnimRef.current.pause === 'function') {
      wingAnimRef.current.pause();
    }

    soundFx.playExpectoPatronum();

    // 1. Anime.js Supernova Runic Shockwave Burst
    if (shockwaveRef.current) {
      animate(shockwaveRef.current, {
        scale: [0.2, 4.5],
        opacity: [1, 0],
        rotate: [0, 180],
        duration: 1100,
        ease: 'outExpo'
      });
    }

    // 2. Animate snitch golden hover vibration & ascend
    if (snitchRef.current) {
      animate(snitchRef.current, {
        scale: [1, 1.6, 1.2],
        rotate: [0, 360],
        duration: 800,
        ease: 'outElastic'
      });
    }

    // 3. Gold Confetti Shower
    try {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: {
          x: posRef.current.x / window.innerWidth,
          y: posRef.current.y / window.innerHeight
        },
        colors: ['#FFD700', '#FDE047', '#F59E0B', '#FFFFFF', houseStyles.primary]
      });
    } catch {
      // safe fallback
    }

    // 4. Reveal Proclamation Banner with Anime.js spring
    setShowBanner(true);
    setTimeout(() => {
      if (bannerRef.current) {
        animate(bannerRef.current, {
          translateY: [-60, 0],
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 700,
          ease: 'outBack'
        });
      }
    }, 100);
  };

  const handleRelaunch = () => {
    soundFx.playWandCast();
    setIsCaught(false);
    setShowBanner(false);
    posRef.current = {
      x: Math.max(120, Math.min(window.innerWidth - 120, Math.random() * window.innerWidth)),
      y: Math.max(120, Math.min(window.innerHeight - 150, Math.random() * window.innerHeight * 0.7))
    };
    startWanderingFlight();
  };

  const houseName = houseTheme.charAt(0).toUpperCase() + houseTheme.slice(1);

  if (!isActive || !isVisible) return null;

  return (
    <>
      {/* Golden Snitch Flier Container */}
      <div
        ref={snitchRef}
        onClick={handleCatchSnitch}
        className="fixed top-0 left-0 z-50 cursor-pointer select-none"
        style={{
          transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`,
          willChange: 'transform'
        }}
        title="⚡ Catch the Golden Snitch!"
        aria-label="Golden Snitch"
      >
        <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 p-4 group">
          {/* Pulsing Aura */}
          <div className="absolute inset-0 rounded-full bg-yellow-400/25 blur-md animate-pulse pointer-events-none" />

          {/* Shockwave element for Anime.js burst */}
          <div
            ref={shockwaveRef}
            className="absolute w-24 h-24 rounded-full border-2 border-[#FFD700] pointer-events-none opacity-0"
            style={{ boxShadow: '0 0 30px #FFD700' }}
          />

          {/* Left Wing (Feathered SVG) */}
          <svg
            ref={leftWingRef}
            className="w-10 h-7 origin-right -mr-1 filter drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] pointer-events-none"
            viewBox="0 0 60 40"
            fill="none"
          >
            <path
              d="M 58,20 C 40,5 20,0 2,8 C 15,14 30,18 45,22 C 30,24 12,28 6,34 C 22,33 40,28 58,20 Z"
              fill="url(#wingGradientLeft)"
              stroke="#FFF"
              strokeWidth="0.8"
              opacity="0.85"
            />
            <defs>
              <linearGradient id="wingGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#FDE047" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Golden Core Sphere */}
          <div className="relative w-7 h-7 rounded-full shadow-[0_0_20px_rgba(255,215,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(180,83,9,0.9)] bg-gradient-to-tr from-[#B45309] via-[#FBBF24] to-[#FFFBEB] flex items-center justify-center border border-yellow-200">
            {/* Runes Engraving Ring */}
            <div className="w-5 h-5 rounded-full border border-yellow-100/60 flex items-center justify-center">
              <span className="text-[7px] text-amber-950 font-black tracking-tighter select-none font-mono">
                ⚡
              </span>
            </div>
          </div>

          {/* Right Wing (Feathered SVG) */}
          <svg
            ref={rightWingRef}
            className="w-10 h-7 origin-left -ml-1 filter drop-shadow-[0_0_8px_rgba(255,215,0,0.8)] pointer-events-none"
            viewBox="0 0 60 40"
            fill="none"
          >
            <path
              d="M 2,20 C 20,5 40,0 58,8 C 45,14 30,18 15,22 C 30,24 48,28 54,34 C 38,33 20,28 2,20 Z"
              fill="url(#wingGradientRight)"
              stroke="#FFF"
              strokeWidth="0.8"
              opacity="0.85"
            />
            <defs>
              <linearGradient id="wingGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                <stop offset="60%" stopColor="#FDE047" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Mini Catch Tooltip when hovering */}
          {!isCaught && (
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-yellow-300 border border-yellow-500/60 rounded px-1.5 py-0.5 text-[8px] font-cinzel font-bold whitespace-nowrap shadow-lg">
              CLICK TO CATCH!
            </div>
          )}
        </div>
      </div>

      {/* ================= ROYAL HOGWARTS CATCH PROCLAMATION BANNER ================= */}
      {showBanner && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-xl pointer-events-auto">
          <div
            ref={bannerRef}
            className={`relative rounded-lg p-5 border-2 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col sm:flex-row items-center gap-4 transition-all duration-300 ${
              isLumos
                ? 'bg-gradient-to-r from-[#FFFBEB] via-[#FEF3C7] to-[#FFFBEB] border-[#D97706] text-[#78350F]'
                : 'bg-gradient-to-r from-[#18140C] via-[#2D200E] to-[#18140C] border-[#F59E0B] text-[#FEF08A]'
            }`}
          >
            {/* Golden Trophy Medallion */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D97706] via-[#FBBF24] to-[#FEF08A] p-0.5 shrink-0 shadow-lg flex items-center justify-center text-amber-950">
              <div className="w-full h-full rounded-full bg-[#1A1105] flex items-center justify-center text-yellow-400 border border-yellow-300/40">
                <Trophy size={24} className="animate-bounce" />
              </div>
            </div>

            {/* Victory Proclamation Text */}
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-[10px] font-cinzel font-black uppercase tracking-widest text-[#D97706]">
                <Sparkles size={12} />
                <span>OFFICIAL QUIDDITCH DISPATCH • CATCH #{catchCount}</span>
              </div>
              <h3 className="font-cinzel-dec text-base sm:text-lg font-black tracking-wide text-[#F59E0B]">
                THE GOLDEN SNITCH HAS BEEN CAUGHT!
              </h3>
              <p className={`font-fell italic text-xs font-semibold ${isLumos ? 'text-[#451A03]' : 'text-[#FDE68A]'}`}>
                +150 Points awarded to <span className="font-bold underline uppercase">{houseName}</span>! Atharva Bagwe proclaims you an official Hogwarts Seeker!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleRelaunch}
                className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-cinzel font-bold bg-[#F59E0B] hover:bg-[#D97706] text-amber-950 shadow-md cursor-pointer transition-transform hover:scale-105"
                title="Release the Snitch back into flight"
              >
                <RotateCcw size={12} />
                <span>RELEASE</span>
              </button>
              <button
                onClick={() => {
                  setShowBanner(false);
                  setIsActive(false);
                }}
                className="p-1 rounded-full text-yellow-500/70 hover:text-yellow-500 hover:bg-yellow-500/10 transition-colors cursor-pointer"
                title="Dismiss Banner"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
