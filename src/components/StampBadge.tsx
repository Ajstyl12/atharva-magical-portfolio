import React from 'react';
import { soundFx } from '../utils/audioEffects';
import { useWizardTheme } from '../context/ThemeContext';

interface CircularStampProps {
  text?: string;
  subText?: string;
  size?: number;
  onClick?: () => void;
}

export const CircularStampBadge: React.FC<CircularStampProps> = ({
  text = "• MINISTRY OF MAGIC • ATHARVA BAGWE • HOGWARTS ENGINEERING •",
  subText = "EST. 2026",
  size = 145,
  onClick
}) => {
  const { themeMode } = useWizardTheme();
  const isLumos = themeMode === 'lumos';

  return (
    <div
      onClick={() => {
        soundFx.playStamp();
        if (onClick) onClick();
      }}
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`group relative rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-105 select-none ${
        isLumos
          ? 'text-[#8B0000] border-[#8B0000] hover:border-[#700000] bg-[#8B0000]/10 font-black shadow-sm'
          : 'text-[#D4AF37] border-[#D4AF37]/50 hover:border-[#D4AF37] bg-[#D4AF37]/5'
      }`}
    >
      {/* SVG Rotating Curved Text */}
      <svg
        className="absolute inset-0 w-full h-full animate-spin-slow group-hover:[animation-play-state:paused]"
        viewBox="0 0 160 160"
      >
        <path
          id="wizardCirclePath"
          d="M 80, 80 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
          fill="transparent"
        />
        <text className="font-cinzel text-[9.5px] uppercase tracking-[0.22em] fill-current font-black">
          <textPath xlinkHref="#wizardCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Ministry of Magic Emblem */}
      <div className="flex flex-col items-center justify-center text-center p-2 z-10">
        <span className="font-cinzel-dec font-black text-sm tracking-wider">
          M·O·M
        </span>
        <span className="font-medieval text-[10px] opacity-85 mt-0.5">
          {subText}
        </span>
        <div className="w-5 h-0.5 bg-current mt-1 opacity-60"></div>
      </div>
    </div>
  );
};

interface RubberStampProps {
  label: string;
  subLabel?: string;
  variant?: 'wax-crimson' | 'wax-gold' | 'emerald' | 'amber' | 'parchment';
  angle?: number;
}

export const RubberStamp: React.FC<RubberStampProps> = ({
  label,
  subLabel,
  variant = 'wax-crimson',
  angle = -4
}) => {
  const styles = {
    'wax-crimson': 'wax-seal text-white font-cinzel font-bold shadow-[0_4px_15px_rgba(136,19,55,0.5)]',
    'wax-gold': 'wax-seal-gold text-[#3E2723] font-cinzel font-black shadow-[0_4px_15px_rgba(212,175,55,0.5)]',
    'emerald': 'bg-[#1A472A] border-2 border-dashed border-[#2D6A4F] text-[#D8F3DC] font-cinzel shadow-[0_0_15px_rgba(26,71,42,0.3)]',
    'amber': 'bg-[#D48B28]/20 border-2 border-dashed border-[#D4AF37] text-[#D4AF37] font-cinzel',
    'parchment': 'bg-[#EADFC7] border-2 border-dashed border-[#8B0000] text-[#8B0000] font-medieval'
  };

  return (
    <div
      style={{ transform: `rotate(${angle}deg)` }}
      className={`inline-block px-3.5 py-1.5 rounded-sm select-none transition-transform hover:scale-105 duration-200 uppercase tracking-widest text-xs ${styles[variant]}`}
    >
      <div className="flex flex-col items-center leading-none">
        <span className="font-bold">{label}</span>
        {subLabel && (
          <span className="text-[8.5px] font-normal tracking-normal mt-0.5 opacity-90 font-medieval">
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
};
