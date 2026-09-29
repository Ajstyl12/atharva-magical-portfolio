import React, { useState } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import {
  ArrowUpRight,
  Copy,
  Check,
  Radio,
  ExternalLink,
  Flame
} from 'lucide-react';
import { RubberStamp } from './StampBadge';

export interface PortalGatewayItem {
  id: string;
  name: string;
  codename: string;
  dimensionTitle: string;
  url: string;
  handle: string;
  primaryColor: string;
  glowColor: string;
  accentColor: string;
  description: string;
  runicSymbol: string;
  frequency: string;
  svgIcon: React.ReactNode;
}

export const DimensionalPortals: React.FC = () => {
  const { themeMode, getHouseColor, personalInfo } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [activeWarpId, setActiveWarpId] = useState<string | null>(null);

  const copyHandle = (id: string, text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    soundFx.playStamp();
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePortalJump = (portal: PortalGatewayItem, e: React.MouseEvent) => {
    e.preventDefault();
    soundFx.playWandCast();
    setActiveWarpId(portal.id);

    setTimeout(() => {
      window.open(portal.url, '_blank', 'noopener,noreferrer');
      setActiveWarpId(null);
    }, 450);
  };

  const portalGateways: PortalGatewayItem[] = [
    {
      id: 'github',
      name: 'GITHUB',
      codename: 'PORTAL // 01 • SPELL FOUNDRY',
      dimensionTitle: 'Arcane Code Repository & Open-Source Artifacts',
      url: personalInfo.socials.github || 'https://github.com/atharvabagwe30',
      handle: '@atharvabagwe30',
      primaryColor: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.85)',
      accentColor: '#34D399',
      description: 'Step directly into open-source repositories, full-stack AI agent architectures, and autonomous distributed systems.',
      runicSymbol: 'ᚷᛁᛏ',
      frequency: 'FREQ: 432.08 MHz',
      svgIcon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    },
    {
      id: 'linkedin',
      name: 'LINKEDIN',
      codename: 'PORTAL // 02 • MINISTRY GUILD',
      dimensionTitle: 'Professional Dossier & Ministry Guild Network',
      url: personalInfo.socials.linkedin || 'https://linkedin.com/in/atharva-bagwe',
      handle: 'in/atharva-bagwe',
      primaryColor: '#0284C7',
      glowColor: 'rgba(2, 132, 199, 0.85)',
      accentColor: '#38BDF8',
      description: 'Direct portal into engineering leadership appointments, technical collaborations, and industry endorsements.',
      runicSymbol: 'ᛚᛁᚾ',
      frequency: 'FREQ: 884.12 MHz',
      svgIcon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
        </svg>
      )
    },
    {
      id: 'twitter',
      name: 'TWITTER / X',
      codename: 'PORTAL // 03 • HERMES DISPATCH',
      dimensionTitle: 'Real-Time Telemetry & Tech Thought Transmissions',
      url: personalInfo.socials.twitter || 'https://twitter.com/atharvabagwe',
      handle: '@atharvabagwe',
      primaryColor: '#0EA5E9',
      glowColor: 'rgba(14, 165, 233, 0.85)',
      accentColor: '#7DD3FC',
      description: 'Stream of real-time engineering commentary, AI model breakthroughs, prompt evaluations, and live project updates.',
      runicSymbol: 'ᚹᛁᛉ',
      frequency: 'FREQ: 108.90 MHz',
      svgIcon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      id: 'instagram',
      name: 'INSTAGRAM',
      codename: 'PORTAL // 04 • MOVING MEMORIES',
      dimensionTitle: 'Enchanted Visual Chronicles & Creative Journey',
      url: personalInfo.socials.instagram || 'https://instagram.com/atharvabagwe',
      handle: '@atharvabagwe',
      primaryColor: '#E1306C',
      glowColor: 'rgba(225, 48, 108, 0.85)',
      accentColor: '#F43F5E',
      description: 'Visual chronicles of hackathon nights, campus tech demonstrations, photography, and everyday moving portraits.',
      runicSymbol: 'ᛋᛏᚨ',
      frequency: 'FREQ: 520.44 MHz',
      svgIcon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      id: 'discord',
      name: 'DISCORD',
      codename: 'PORTAL // 05 • COVEN CHAMBER',
      dimensionTitle: 'Real-Time Voice & Developer Magic Community',
      url: personalInfo.socials.discord || 'https://discord.com/users/atharvabagwe',
      handle: 'atharvabagwe#0',
      primaryColor: '#5865F2',
      glowColor: 'rgba(88, 101, 242, 0.85)',
      accentColor: '#818CF8',
      description: 'Enter the voice and text enclave for interactive pair coding, hackathon strategy, and developer magic.',
      runicSymbol: 'ᚦᛁᛋ',
      frequency: 'FREQ: 771.60 MHz',
      svgIcon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      )
    },
    {
      id: 'huggingface',
      name: 'AI NEXUS',
      codename: 'PORTAL // 06 • ALCHEMY VAULT',
      dimensionTitle: 'Open Neural Weights, AI Spaces & Models',
      url: personalInfo.socials.huggingface || 'https://huggingface.co/atharvabagwe30',
      handle: 'hf.co/atharvabagwe30',
      primaryColor: '#F59E0B',
      glowColor: 'rgba(245, 158, 11, 0.85)',
      accentColor: '#FBBF24',
      description: 'Explore generative model experiments, neural embeddings, transformer checkpoints, and alchemical AI interfaces.',
      runicSymbol: 'ᚺᚢᚷ',
      frequency: 'FREQ: 999.00 MHz',
      svgIcon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 5.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S9 9.83 9 9s.67-1.5 1.5-1.5zm6 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-4.5 9.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
        </svg>
      )
    }
  ];

  return (
    <section id="portals" className="mt-16 mb-8 space-y-8">
      {/* Chapter Editorial Header */}
      <div
        className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b-2 transition-colors ${
          isLumos ? 'border-[#000000]/20' : 'border-white/20'
        }`}
        style={{ borderColor: houseStyles.border }}
      >
        <div>
          <div
            className="flex items-center gap-2 text-xs font-cinzel font-black tracking-widest uppercase mb-1.5"
            style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}
          >
            <Flame size={15} className="animate-pulse" />
            <span>FLOO NETWORK TELEMETRY // DIMENSIONAL FLAME VORTEX</span>
          </div>
          <h2
            className={`font-cinzel-dec text-3xl sm:text-4xl font-black uppercase tracking-tight ${
              isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'
            }`}
          >
            DIMENSIONAL PORTALS
          </h2>
          <p
            className={`font-fell italic text-sm sm:text-base mt-1.5 max-w-2xl font-bold ${
              isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
            }`}
          >
            Touch any dimensional vortex portal below. Each circular gateway radiates living elemental flame waves and transports your consciousness to external repositories and verified guild networks.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-mono-runes font-black border shadow-lg ${
              isLumos ? 'glass-sub-lumos text-[#000000]' : 'glass-sub-nox text-[#FFFFFF]'
            }`}
          >
            <Radio size={13} className="text-[#059669] animate-ping" />
            <span>6/6 PORTAL VORTEXES ACTIVE</span>
          </div>
          <RubberStamp label="DIMENSIONAL VORTEX" subLabel="MINISTRY VERIFIED" variant="wax-gold" angle={-3} />
        </div>
      </div>

      {/* 6 Circular Dimensional Flame Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portalGateways.map((portal) => {
          const isHovered = activeHoverId === portal.id;
          const isWarping = activeWarpId === portal.id;
          const isCopied = copiedId === portal.id;

          return (
            <div
              key={portal.id}
              onClick={(e) => handlePortalJump(portal, e)}
              onMouseEnter={() => {
                setActiveHoverId(portal.id);
                soundFx.playWandCast();
              }}
              onMouseLeave={() => setActiveHoverId(null)}
              className={`circular-portal-container group relative p-6 sm:p-7 rounded-2xl overflow-hidden flex flex-col items-center justify-between text-center cursor-pointer border-2 transition-all duration-500 ${
                isLumos
                  ? 'glass-card-lumos'
                  : 'glass-card-nox'
              } ${isWarping ? 'portal-teleport-active' : ''}`}
              style={{
                borderColor: isHovered || isWarping ? portal.primaryColor : isLumos ? 'rgba(0, 0, 0, 0.18)' : 'rgba(255, 255, 255, 0.18)',
                boxShadow: isHovered || isWarping
                  ? `0 0 50px ${portal.glowColor}, 0 25px 50px -10px ${portal.glowColor}, inset 0 0 35px ${portal.primaryColor}25`
                  : undefined,
                color: portal.primaryColor
              }}
            >
              {/* Top Status Header */}
              <div className="w-full flex items-center justify-between z-10 pb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-ping shrink-0"
                    style={{ backgroundColor: portal.primaryColor }}
                  />
                  <span
                    className="font-mono-runes text-[11px] font-black uppercase tracking-wider"
                    style={{ color: portal.primaryColor }}
                  >
                    {portal.codename}
                  </span>
                </div>

                <span
                  className={`font-mono-runes text-[10px] px-2.5 py-0.5 rounded-full font-black border ${
                    isLumos
                      ? 'bg-slate-200 text-[#000000] border-slate-400'
                      : 'bg-white/15 text-[#FFFFFF] border-white/20'
                  }`}
                >
                  {portal.frequency}
                </span>
              </div>

              {/* 🌟 CIRCULAR DIMENSIONAL PORTAL ORB WITH FLAME WAVES 🌟 */}
              <div className="relative my-5 w-44 h-44 flex items-center justify-center">
                {/* 1. Outer Flame Waves & Corona (Living magical fire) */}
                <div
                  className="absolute inset-0 rounded-full portal-flame-corona pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, transparent 40%, ${portal.primaryColor}55 70%, ${portal.accentColor}90 100%)`,
                    filter: `blur(12px) drop-shadow(0 0 20px ${portal.glowColor})`,
                    opacity: isHovered ? 1 : 0.65
                  }}
                />

                {/* 2. Concentric Expanding Flame Shockwaves */}
                <div
                  className="absolute inset-0 rounded-full border-2 portal-wave-ring-1 pointer-events-none"
                  style={{
                    borderColor: portal.primaryColor,
                    boxShadow: `0 0 25px ${portal.glowColor}`
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full border-2 portal-wave-ring-2 pointer-events-none"
                  style={{
                    borderColor: portal.accentColor,
                    boxShadow: `0 0 35px ${portal.glowColor}`
                  }}
                />

                {/* 3. Celestial Astrolabe Ring with Rotating Runes */}
                <div
                  className="absolute -inset-2 rounded-full border-2 border-dashed portal-vortex-slow pointer-events-none"
                  style={{
                    borderColor: `${portal.primaryColor}80`
                  }}
                />

                {/* 4. Counter-Rotating Inner Sacred Geometry Ring */}
                <div
                  className="absolute inset-2 rounded-full border portal-vortex-reverse pointer-events-none"
                  style={{
                    borderColor: `${portal.accentColor}90`
                  }}
                />

                {/* 5. Center Dimensional Aperture / Logo Sphere */}
                <div
                  className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-2xl border-2 transition-transform duration-500 group-hover:scale-110 z-10 overflow-hidden"
                  style={{
                    backgroundColor: isLumos ? '#FFFFFF' : '#050508',
                    borderColor: portal.primaryColor,
                    color: portal.primaryColor,
                    boxShadow: `0 0 35px ${portal.glowColor}, inset 0 0 20px ${portal.primaryColor}40`
                  }}
                >
                  {/* Swirling energy core inside orb */}
                  <div
                    className="absolute inset-0 portal-swirl-active opacity-40 pointer-events-none"
                    style={{
                      background: `conic-gradient(from 0deg, transparent 0%, ${portal.primaryColor} 50%, transparent 100%)`
                    }}
                  />

                  {/* Platform Brand Icon */}
                  <div className="relative z-10 transition-transform group-hover:scale-115">
                    {portal.svgIcon}
                  </div>

                  {/* Mystic Rune Label below Icon */}
                  <span
                    className="relative z-10 font-mono-runes text-[9px] font-black tracking-widest mt-1"
                    style={{ color: portal.primaryColor }}
                  >
                    {portal.runicSymbol}
                  </span>
                </div>
              </div>

              {/* Pedestal Details: Name, Title & Description (100% Crisp High-Contrast) */}
              <div className="w-full space-y-2 z-10">
                <div className="flex items-center justify-center gap-2">
                  <h3
                    className={`font-cinzel-dec text-2xl font-black uppercase tracking-wide group-hover:underline transition-colors ${
                      isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'
                    }`}
                  >
                    {portal.name}
                  </h3>
                  <ExternalLink size={15} className="opacity-80 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <p
                  className="font-fell italic text-xs font-bold"
                  style={{ color: portal.primaryColor }}
                >
                  {portal.dimensionTitle}
                </p>

                <p
                  className={`font-sans-body text-xs font-bold leading-relaxed px-1 ${
                    isLumos ? 'text-[#090D16]' : 'text-[#FFFFFF]'
                  }`}
                >
                  {portal.description}
                </p>
              </div>

              {/* Bottom Action Threshold: Copy Coordinates + Enter Portal Button */}
              <div
                className={`w-full relative z-10 mt-5 pt-4 border-t-2 flex items-center justify-between gap-2 ${
                  isLumos ? 'border-slate-300' : 'border-white/20'
                }`}
              >
                {/* Copyable Coordinates */}
                <button
                  type="button"
                  onClick={(e) => copyHandle(portal.id, portal.handle, e)}
                  title="Copy dimensional coordinates"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono-runes text-xs font-black transition-all cursor-pointer border shadow-sm ${
                    isLumos
                      ? 'bg-slate-100 text-[#000000] border-slate-300 hover:bg-white'
                      : 'bg-white/15 text-[#FFFFFF] border-white/25 hover:bg-white/25'
                  }`}
                >
                  {isCopied ? (
                    <>
                      <Check size={13} className="text-[#059669]" />
                      <span className="text-[#059669]">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} className="opacity-80" />
                      <span>{portal.handle}</span>
                    </>
                  )}
                </button>

                {/* Enter Portal Action */}
                <div
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full font-cinzel text-xs font-black uppercase text-white shadow-xl transition-all group-hover:scale-105"
                  style={{
                    backgroundColor: portal.primaryColor,
                    boxShadow: isHovered ? `0 0 25px ${portal.primaryColor}` : undefined
                  }}
                >
                  <span>{isWarping ? 'WARPING...' : 'ENTER PORTAL'}</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
