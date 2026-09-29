import React, { useState } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import { Mail, CheckCircle2, FileText, Phone, MapPin, Sparkles, Send, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { RubberStamp } from './StampBadge';
import { submitOwlPost } from '../lib/analytics';

// Web3Forms access key — set this in your .env file as VITE_WEB3FORMS_KEY
// Get your free key at https://web3forms.com (links to your email)
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';

interface ColophonContactProps {
  onOpenResumeModal: () => void;
}

export const ColophonContact: React.FC<ColophonContactProps> = ({ onOpenResumeModal }) => {
  const { themeMode, houseTheme, getHouseColor, personalInfo } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [formState, setFormState] = useState({
    senderName: '',
    senderEmail: '',
    subject: 'FULL-TIME SOFTWARE / AI ENGINEERING ROLE',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSent, setIsSent] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.senderName || !formState.senderEmail || !formState.message) {
      alert('Please fill out the parchment letter completely before applying the wax seal.');
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      alert('Owl Post is not configured yet. The site owner needs to add their Web3Forms access key. See .env.example for instructions.');
      return;
    }

    soundFx.playStamp();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // ── 1. Save to Supabase (always, regardless of Web3Forms) ────────
      submitOwlPost({
        senderName: formState.senderName,
        senderEmail: formState.senderEmail,
        subject: formState.subject,
        message: formState.message,
        houseTheme: houseTheme,
      });

      // ── 2. Forward email via Web3Forms if key is set ──────────────
      if (WEB3FORMS_ACCESS_KEY) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name: formState.senderName,
            email: formState.senderEmail,
            subject: `[Owl Post Portfolio] ${formState.subject} from ${formState.senderName}`,
            message: formState.message,
            from_name: 'Atharva Bagwe Grimoire Portfolio',
          })
        });
        const result = await response.json();
        if (!result.success) {
          console.warn('[Owl Post] Web3Forms error:', result.message);
        }
      }

      // Always mark as sent (Supabase is the source of truth)
      setIsSent(true);
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: [houseStyles.primary, houseStyles.secondary, '#D4AF37', '#10B981']
        });
      } catch {
        // safe fallback
      }
    } catch {
      setSubmitError('Network error while sending Owl Post. Please check your connection or contact directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    soundFx.playWandCast();
    setIsSent(false);
    setFormState({
      senderName: '',
      senderEmail: '',
      subject: 'FULL-TIME SOFTWARE / AI ENGINEERING ROLE',
      message: ''
    });
    setSubmitError(null);
  };

  return (
    <section id="colophon" className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b transition-colors duration-500 ${
      isLumos ? 'border-[#CBD5E1] bg-[#FFFFFF]' : 'border-[#1E1E24] bg-[#000000]'
    }`}>
      {/* Chapter Editorial Header */}
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b ${
        isLumos ? 'border-[#8B0000]' : 'border-[#1E1E24]'
      }`}
      style={{ borderColor: houseStyles.border }}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-cinzel font-bold tracking-widest uppercase mb-1" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
            <Mail size={14} />
            <span>CHAPTER 06 // OFFICIAL OWL POST DISPATCH & INQUIRY LETTER</span>
          </div>
          <h2 className={`font-cinzel-dec text-3xl sm:text-5xl font-black uppercase ${
            isLumos ? 'text-[#0F172A]' : 'text-[#F8FAFC]'
          }`}>
            OWL POST & COLOPHON
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <RubberStamp label="OWL POST EXPRESS" subLabel="HOGWARTS POST" variant="wax-crimson" angle={-2} />
        </div>
      </div>

      {/* Main Grid: Left Print Letter Template Form (7 cols), Right Recruiter Dossier & Meta (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Formal Print Letter Dispatch Form (7 cols) */}
        <div className={`lg:col-span-7 p-7 sm:p-8 rounded-sm relative transition-all duration-300 ${
          isLumos
            ? 'glass-card-lumos'
            : 'glass-card-nox'
        }`}
        style={{ borderColor: isLumos ? undefined : `${houseStyles.border}50` }}
        >
          <div className={`flex items-center justify-between pb-4 border-b ${
            isLumos ? 'border-slate-200/80' : 'border-white/10'
          }`}>
            <span className="font-cinzel text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
              <Sparkles size={13} /> OFFICIAL OWL POST LETTER // EDITION 394
            </span>
            <span className={`font-mono-runes text-[10px] font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
              HOGWARTS / MUMBAI
            </span>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5 font-sans-body">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sender Name */}
                <div className="space-y-1.5">
                  <label className="font-cinzel text-[11px] font-black uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                    FROM: (YOUR NAME / GUILD / ORG) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Albus Dumbledore / Recruiter"
                    value={formState.senderName}
                    onChange={(e) => setFormState({ ...formState, senderName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded text-sm font-fell outline-none transition-all ${
                      isLumos
                        ? 'glass-sub-lumos text-[#090D16] placeholder-[#64748B] focus:border-[#8B0000]'
                        : 'glass-sub-nox text-[#F8FAFC] placeholder-[#888] focus:border-[#D4AF37]'
                    }`}
                  />
                </div>

                {/* Sender Email */}
                <div className="space-y-1.5">
                  <label className="font-cinzel text-[11px] font-black uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                    RETURN OWL POST / EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. headmaster@hogwarts.edu"
                    value={formState.senderEmail}
                    onChange={(e) => setFormState({ ...formState, senderEmail: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded text-sm font-fell outline-none transition-all ${
                      isLumos
                        ? 'glass-sub-lumos text-[#090D16] placeholder-[#64748B] focus:border-[#8B0000]'
                        : 'glass-sub-nox text-[#F8FAFC] placeholder-[#888] focus:border-[#D4AF37]'
                    }`}
                  />
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="space-y-1.5">
                <label className="font-cinzel text-[11px] font-black uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  SELECT NATURE OF INQUIRY
                </label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded text-sm font-cinzel font-bold outline-none transition-all cursor-pointer ${
                    isLumos
                      ? 'glass-sub-lumos text-[#090D16] focus:border-[#8B0000]'
                      : 'glass-sub-nox text-[#F8FAFC] focus:border-[#D4AF37]'
                  }`}
                >
                  <option value="FULL-TIME SOFTWARE / AI ENGINEERING ROLE">FULL-TIME SOFTWARE / AI ENGINEERING APPOINTMENT</option>
                  <option value="INTERNSHIP / APPRENTICE INQUIRY">INTERNSHIP / APPRENTICESHIP OPPORTUNITY</option>
                  <option value="AI & DATA PROJECT COLLABORATION">AI & DATA PROJECT COLLABORATION</option>
                  <option value="RESEARCH CITATION INQUIRY">RESEARCH PUBLICATION & CITATION QUERY</option>
                  <option value="GENERAL OWL DISPATCH">GENERAL PARCHMENT DISPATCH</option>
                </select>
              </div>

              {/* Letter Message Body */}
              <div className="space-y-1.5">
                <label className="font-cinzel text-[11px] font-black uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  PARCHMENT BODY / INQUIRY MESSAGE *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Dear Atharva, we inspected your Edition 394 grimoire and would like to invite you to discuss..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded text-sm font-fell outline-none transition-all resize-none leading-relaxed italic ${
                    isLumos
                      ? 'glass-sub-lumos text-[#090D16] placeholder-[#64748B] focus:border-[#8B0000]'
                      : 'glass-sub-nox text-[#F8FAFC] placeholder-[#888] focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              {/* Submit / Stamp Action */}
              <div className={`pt-3 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
                isLumos ? 'border-slate-200/80' : 'border-white/10'
              }`}>
                <span className={`font-mono-runes text-[10px] font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                  OWL TRANSMISSION ENCRYPTED // WEB3FORMS
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-cinzel text-xs font-black uppercase rounded border shadow-lg transition-all cursor-pointer disabled:opacity-50 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: houseStyles.primary,
                    color: '#FFFFFF',
                    borderColor: houseStyles.border
                  }}
                >
                  <Send size={15} />
                  <span>{isSubmitting ? 'APPLYING WAX SEAL...' : 'SEAL & DISPATCH VIA OWL POST'}</span>
                </button>
              </div>

              {/* Error Message Display */}
              {submitError && (
                <div className={`mt-3 p-3 rounded border flex items-start gap-2 text-xs font-sans-body font-semibold ${
                  isLumos
                    ? 'bg-[#FEF2F2] border-[#FECACA] text-[#8B0000]'
                    : 'bg-[#1C0A0A] border-[#7F1D1D] text-[#FCA5A5]'
                }`}>
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}
            </form>
          ) : (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div
                className="w-16 h-16 rounded-full border-2 flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: `${houseStyles.primary}20`,
                  borderColor: houseStyles.border,
                  color: isLumos ? houseStyles.primary : houseStyles.secondary
                }}
              >
                <CheckCircle2 size={32} />
              </div>
              <h3 className={`font-cinzel-dec text-2xl font-black ${
                isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'
              }`}>
                Parchment Letter Officially Sealed & Dispatched
              </h3>
              <p className={`font-fell italic text-sm max-w-md font-semibold ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
                Hedwig has taken flight with your dispatch for <span className="font-bold text-[#090D16]">{formState.senderName}</span> regarding "{formState.subject}". You will receive a prompt owl response!
              </p>
              <button
                onClick={handleReset}
                className={`mt-4 px-4 py-2 rounded font-cinzel text-xs font-black transition-all cursor-pointer ${
                  isLumos
                    ? 'glass-sub-lumos hover:bg-white text-[#090D16]'
                    : 'glass-sub-nox hover:bg-white/20 text-white'
                }`}
              >
                DISPATCH ANOTHER PARCHMENT ↺
              </button>
            </div>
          )}
        </div>

        {/* Right: Recruiter Dossier, Direct Channels & Metadata (5 cols) */}
        <div className={`lg:col-span-5 p-7 sm:p-8 rounded-sm flex flex-col justify-between space-y-6 transition-all duration-300 ${
          isLumos
            ? 'glass-card-lumos'
            : 'glass-card-nox'
        }`}>
          <div className="space-y-4">
            <div className={`pb-3 border-b flex items-center justify-between ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <span className="font-cinzel text-xs font-black uppercase tracking-wider" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                MINISTRY CHANNELS & PROFILES
              </span>
              <span className={`font-mono-runes text-[10px] font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>DIRECT TELEMETRY</span>
            </div>

            {/* Direct Contact Ledger */}
            <div className="space-y-3 font-mono-runes text-xs font-semibold">
              <div className={`p-3 rounded flex items-center justify-between transition-all ${
                isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
              }`}>
                <span className={`flex items-center gap-2 font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                  <Mail size={13} style={{ color: houseStyles.primary }} /> OWL POST:
                </span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-black hover:underline"
                  style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}
                >
                  {personalInfo.email}
                </a>
              </div>

              <div className={`p-3 rounded flex items-center justify-between transition-all ${
                isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
              }`}>
                <span className={`flex items-center gap-2 font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                  <Phone size={13} style={{ color: houseStyles.primary }} /> TELEMETRY:
                </span>
                <span className={`font-black ${isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'}`}>
                  {personalInfo.phone}
                </span>
              </div>

              <div className={`p-3 rounded flex items-center justify-between transition-all ${
                isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
              }`}>
                <span className={`flex items-center gap-2 font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                  <MapPin size={13} className="text-[#059669]" /> SANCTUM:
                </span>
                <span className={`font-black ${isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'}`}>
                  {personalInfo.location}
                </span>
              </div>
            </div>

            {/* Circular Dimensional Portals Strip */}
            <div className="pt-3">
              <div className="flex items-center justify-between mb-3">
                <span className="font-cinzel text-[11px] uppercase tracking-wider font-black flex items-center gap-1.5" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  <Sparkles size={12} className="text-[#D4AF37]" />
                  <span>CIRCULAR FLOO NETWORK PORTALS</span>
                </span>
                <a
                  href="#portals"
                  className="font-mono-runes text-[10px] font-bold hover:underline flex items-center gap-0.5"
                  style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}
                >
                  <span>FULL VORTEX GRID</span>
                  <ArrowUpRight size={11} />
                </a>
              </div>

              {/* 6 Circular Flame Portal Orbs */}
              <div className="grid grid-cols-3 gap-3 font-cinzel text-[11px] font-black">
                {/* 1. GitHub Portal */}
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playWandCast()}
                  className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border-2 cursor-pointer overflow-hidden ${
                    isLumos
                      ? 'glass-sub-lumos hover:border-[#10B981]'
                      : 'glass-sub-nox hover:border-[#10B981]'
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 22px rgba(16, 185, 129, 0.7), inset 0 0 12px rgba(16, 185, 129, 0.3)';
                    e.currentTarget.style.borderColor = '#10B981';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#10B981] group-hover:scale-110 group-hover:text-white transition-all shadow-md" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', border: '1.5px solid #10B981' }}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <span className={`text-[11px] font-black group-hover:text-[#10B981] transition-colors ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                    GITHUB
                  </span>
                </a>

                {/* 2. LinkedIn Portal */}
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playWandCast()}
                  className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border-2 cursor-pointer overflow-hidden ${
                    isLumos
                      ? 'glass-sub-lumos hover:border-[#0284C7]'
                      : 'glass-sub-nox hover:border-[#0284C7]'
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 22px rgba(2, 132, 199, 0.7), inset 0 0 12px rgba(2, 132, 199, 0.3)';
                    e.currentTarget.style.borderColor = '#0284C7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#0284C7] group-hover:scale-110 group-hover:text-white transition-all shadow-md" style={{ backgroundColor: 'rgba(2, 132, 199, 0.2)', border: '1.5px solid #0284C7' }}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z" />
                    </svg>
                  </div>
                  <span className={`text-[11px] font-black group-hover:text-[#0284C7] transition-colors ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                    LINKEDIN
                  </span>
                </a>

                {/* 3. Twitter Portal */}
                <a
                  href={personalInfo.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playWandCast()}
                  className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border-2 cursor-pointer overflow-hidden ${
                    isLumos
                      ? 'glass-sub-lumos hover:border-[#0EA5E9]'
                      : 'glass-sub-nox hover:border-[#0EA5E9]'
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 22px rgba(14, 165, 233, 0.7), inset 0 0 12px rgba(14, 165, 233, 0.3)';
                    e.currentTarget.style.borderColor = '#0EA5E9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#0EA5E9] group-hover:scale-110 group-hover:text-white transition-all shadow-md" style={{ backgroundColor: 'rgba(14, 165, 233, 0.2)', border: '1.5px solid #0EA5E9' }}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className={`text-[11px] font-black group-hover:text-[#0EA5E9] transition-colors ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                    TWITTER
                  </span>
                </a>

                {/* 4. Instagram Portal */}
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playWandCast()}
                  className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border-2 cursor-pointer overflow-hidden ${
                    isLumos
                      ? 'glass-sub-lumos hover:border-[#E1306C]'
                      : 'glass-sub-nox hover:border-[#E1306C]'
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 22px rgba(225, 48, 108, 0.7), inset 0 0 12px rgba(225, 48, 108, 0.3)';
                    e.currentTarget.style.borderColor = '#E1306C';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#E1306C] group-hover:scale-110 group-hover:text-white transition-all shadow-md" style={{ backgroundColor: 'rgba(225, 48, 108, 0.2)', border: '1.5px solid #E1306C' }}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                  <span className={`text-[11px] font-black group-hover:text-[#E1306C] transition-colors ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                    INSTAGRAM
                  </span>
                </a>

                {/* 5. Discord Portal */}
                <a
                  href={personalInfo.socials.discord || "https://discord.com"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playWandCast()}
                  className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border-2 cursor-pointer overflow-hidden ${
                    isLumos
                      ? 'glass-sub-lumos hover:border-[#5865F2]'
                      : 'glass-sub-nox hover:border-[#5865F2]'
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 22px rgba(88, 101, 242, 0.7), inset 0 0 12px rgba(88, 101, 242, 0.3)';
                    e.currentTarget.style.borderColor = '#5865F2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#5865F2] group-hover:scale-110 group-hover:text-white transition-all shadow-md" style={{ backgroundColor: 'rgba(88, 101, 242, 0.2)', border: '1.5px solid #5865F2' }}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </div>
                  <span className={`text-[11px] font-black group-hover:text-[#5865F2] transition-colors ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                    DISCORD
                  </span>
                </a>

                {/* 6. AI Nexus Portal */}
                <a
                  href={personalInfo.socials.huggingface || "https://huggingface.co"}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => soundFx.playWandCast()}
                  className={`group relative p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 border-2 cursor-pointer overflow-hidden ${
                    isLumos
                      ? 'glass-sub-lumos hover:border-[#F59E0B]'
                      : 'glass-sub-nox hover:border-[#F59E0B]'
                  }`}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 22px rgba(245, 158, 11, 0.7), inset 0 0 12px rgba(245, 158, 11, 0.3)';
                    e.currentTarget.style.borderColor = '#F59E0B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                    e.currentTarget.style.borderColor = '';
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#F59E0B] group-hover:scale-110 group-hover:text-white transition-all shadow-md" style={{ backgroundColor: 'rgba(245, 158, 11, 0.2)', border: '1.5px solid #F59E0B' }}>
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 5.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5S9 9.83 9 9s.67-1.5 1.5-1.5zm6 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zm-4.5 9.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
                    </svg>
                  </div>
                  <span className={`text-[11px] font-black group-hover:text-[#F59E0B] transition-colors ${isLumos ? 'text-[#000000]' : 'text-[#FFFFFF]'}`}>
                    AI NEXUS
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Download Official Dossier Action */}
          <div className={`p-5 rounded space-y-3 transition-all ${
            isLumos
              ? 'glass-sub-lumos'
              : 'glass-sub-nox'
          }`}
          style={{ borderColor: isLumos ? undefined : houseStyles.border }}
          >
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-xs font-black flex items-center gap-1.5" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                <FileText size={14} style={{ color: houseStyles.primary }} /> MINISTRY RECRUITER SCROLL
              </span>
              <span className="font-mono-runes text-[9px] text-white px-2 py-0.5 rounded font-black" style={{ backgroundColor: houseStyles.primary }}>
                2026.01
              </span>
            </div>
            <p className={`text-[11px] font-fell italic font-semibold ${
              isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'
            }`}>
              Includes complete academic transcript, engineering project architectures, and certified credentials.
            </p>
            <button
              onClick={() => {
                soundFx.playWandCast();
                onOpenResumeModal();
              }}
              className="w-full py-2.5 font-cinzel text-xs font-black rounded border transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
              style={{
                backgroundColor: houseStyles.primary,
                color: '#FFFFFF',
                borderColor: houseStyles.border
              }}
            >
              <span>PREVIEW & DOWNLOAD SCROLL</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
