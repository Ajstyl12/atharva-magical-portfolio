import React, { useState, useRef } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import confetti from 'canvas-confetti';
import { X, Upload, Plus, Award, CheckCircle2, Sparkles, ShieldCheck, Trash2, RotateCcw } from 'lucide-react';
import { RubberStamp } from './StampBadge';

import { MinistrySecurityModal } from './MinistrySecurityModal';

interface CertificateUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_CERTIFICATES = [
  {
    title: "Google Cloud Certified: Cloud Digital Leader",
    issuer: "Google Cloud",
    date: "Sep 2025",
    tag: "CLOUD & DEVOPS"
  },
  {
    title: "Harvard CS50: Computer Science & Architecture",
    issuer: "Harvard University / edX",
    date: "Jul 2025",
    tag: "COMPUTER SCIENCE"
  },
  {
    title: "Meta Professional Front-End Engineer Specialization",
    issuer: "Meta / Coursera",
    date: "May 2025",
    tag: "SOFTWARE CRAFT"
  },
  {
    title: "Stanford Online: Machine Learning & Deep Networks",
    issuer: "Stanford Online / DeepLearning.AI",
    date: "Mar 2025",
    tag: "AI & DEEP LEARNING"
  }
];

export const CertificateUploaderModal: React.FC<CertificateUploaderModalProps> = ({ isOpen, onClose }) => {
  const { themeMode, getHouseColor, certificates, addCertificate, removeCertificate, resetCertificates } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [date, setDate] = useState('');
  const [tag, setTag] = useState('CLOUD & GEN-AI');
  const [fileName, setFileName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security Lock State
  const [secModal, setSecModal] = useState<{ isOpen: boolean; actionTitle: string; action: () => void }>({
    isOpen: false,
    actionTitle: '',
    action: () => {}
  });

  const requestPasscode = (actionTitle: string, action: () => void) => {
    setSecModal({ isOpen: true, actionTitle, action });
  };

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFx.playWandCast();
      setFileName(file.name);
      if (!title) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const handleAddPreset = (preset: typeof PRESET_CERTIFICATES[0]) => {
    requestPasscode(`Add Certificate Preset: ${preset.title}`, () => {
      addCertificate(preset);
      soundFx.playStamp();
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: [houseStyles.primary, houseStyles.secondary, '#D4AF37']
        });
      } catch {
        // safe fallback
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !issuer || !date) {
      alert('Please fill out the Certificate Title, Issuing Guild, and Issue Date.');
      return;
    }

    requestPasscode(`Upload Certificate Scroll: ${title}`, () => {
      addCertificate({
        title,
        issuer,
        date,
        tag: tag.toUpperCase()
      });

      setIsSuccess(true);
      soundFx.playStamp();

      try {
        confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#D4AF37', '#8B0000', '#10B981', '#FDE047']
        });
      } catch {
        // safe fallback
      }

      setTimeout(() => {
        setIsSuccess(false);
        setTitle('');
        setIssuer('');
        setDate('');
        setFileName('');
      }, 1500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-3 sm:p-6 overflow-y-auto">
      <div
        className={`relative w-full max-w-4xl rounded-sm shadow-2xl border-2 overflow-hidden my-auto flex flex-col transition-all duration-300 ${
          isLumos
            ? 'glass-card-lumos border-[#8B0000] text-[#090D16]'
            : 'glass-card-nox border-[#D4AF37] text-[#F8FAFC]'
        }`}
        style={{ borderColor: houseStyles.border }}
      >
        {/* Top Modal Bar */}
        <div
          className={`flex items-center justify-between px-6 py-3.5 border-b ${
            isLumos ? 'glass-sub-lumos border-slate-200/80' : 'glass-sub-nox border-white/10'
          }`}
        >
          <div className="flex items-center gap-2">
            <Award size={18} style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }} />
            <span className={`font-cinzel-dec font-black text-sm ${isLumos ? 'text-[#090D16]' : 'text-[#FDE047]'}`}>
              MINISTRY ACCREDITATION VAULT & CERTIFICATE UPLOADER
            </span>
            <span className={`hidden sm:inline font-mono-runes text-[10px] px-2 py-0.5 rounded font-black ${
              isLumos ? 'bg-slate-200 text-[#090D16]' : 'bg-white/10 text-[#CBD5E1]'
            }`}>
              {certificates.length} VERIFIED ACCREDITATIONS
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playWandCast();
              onClose();
            }}
            className={`p-1.5 rounded transition-all cursor-pointer ${
              isLumos ? 'text-[#090D16] hover:bg-slate-200/60' : 'text-[#CBD5E1] hover:text-white hover:bg-white/10'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: 2-Column Split */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-h-[80vh] overflow-y-auto">
          {/* Left Column: Upload New Certificate Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="font-cinzel text-xs font-black uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                // SUBMIT CREDENTIAL TO MINISTRY ARCHIVES
              </span>
              <h3 className={`font-cinzel-dec text-2xl font-black ${isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'}`}>
                Upload Certificate & Accreditations
              </h3>
              <p className={`font-fell italic text-xs sm:text-sm font-semibold ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
                Upload official credentials, transcripts, or badges. They will be immediately stamped, verified, and displayed across your public portfolio.
              </p>
            </div>

            {/* Drag & Drop File Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`p-5 rounded border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isLumos
                  ? 'glass-sub-lumos border-slate-300 hover:border-[#8B0000]'
                  : 'glass-sub-nox border-white/20 hover:border-[#D4AF37]'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".pdf,.png,.jpg,.jpeg,.webp"
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mb-2 text-[#D4AF37]">
                <Upload size={20} />
              </div>
              <span className={`font-cinzel text-xs font-black block ${isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'}`}>
                {fileName ? `Selected: ${fileName}` : 'Click to Upload Certificate File (PDF / Image)'}
              </span>
              <span className={`font-mono-runes text-[10px] font-bold mt-1 ${isLumos ? 'text-[#334155]' : 'text-[#94A3B8]'}`}>
                Supports PDF, PNG, JPG up to 10MB • Auto-stamped by Ministry
              </span>
            </div>

            {/* Upload Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-sans-body">
              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-black uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  CERTIFICATE TITLE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Certified Solutions Architect"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded text-xs font-fell outline-none transition-all ${
                    isLumos
                      ? 'glass-sub-lumos text-[#090D16] placeholder-[#64748B] focus:border-[#8B0000]'
                      : 'glass-sub-nox text-[#F8FAFC] placeholder-[#888] focus:border-[#D4AF37]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-cinzel text-[11px] font-black uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                    ISSUING GUILD / ACADEMY *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. AWS Academy / Stanford Online"
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded text-xs font-fell outline-none transition-all ${
                      isLumos
                        ? 'glass-sub-lumos text-[#090D16] placeholder-[#64748B] focus:border-[#8B0000]'
                        : 'glass-sub-nox text-[#F8FAFC] placeholder-[#888] focus:border-[#D4AF37]'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-cinzel text-[11px] font-black uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                    ISSUE DATE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aug 2025"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`w-full px-3.5 py-2 rounded text-xs font-fell outline-none transition-all ${
                      isLumos
                        ? 'glass-sub-lumos text-[#090D16] placeholder-[#64748B] focus:border-[#8B0000]'
                        : 'glass-sub-nox text-[#F8FAFC] placeholder-[#888] focus:border-[#D4AF37]'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-cinzel text-[11px] font-black uppercase tracking-wider block" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                  SPECIALIZATION CATEGORY TAG
                </label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className={`w-full px-3.5 py-2 rounded text-xs font-cinzel font-bold outline-none transition-all cursor-pointer ${
                    isLumos
                      ? 'glass-sub-lumos text-[#090D16] focus:border-[#8B0000]'
                      : 'glass-sub-nox text-[#F8FAFC] focus:border-[#D4AF37]'
                  }`}
                >
                  <option value="CLOUD & GEN-AI">CLOUD & GEN-AI</option>
                  <option value="DATA ANALYTICS">DATA ANALYTICS</option>
                  <option value="IOT & EMBEDDED">IOT & EMBEDDED</option>
                  <option value="DATA SCIENCE">DATA SCIENCE</option>
                  <option value="SOFTWARE CRAFT">SOFTWARE CRAFT</option>
                  <option value="AI & DEEP LEARNING">AI & DEEP LEARNING</option>
                  <option value="CYBER SECURITY">CYBER SECURITY</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <button
                  type="submit"
                  className="w-full py-3 font-cinzel text-xs font-black uppercase rounded border shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                  style={{
                    backgroundColor: houseStyles.primary,
                    color: '#FFFFFF',
                    borderColor: houseStyles.border
                  }}
                >
                  <Plus size={15} />
                  <span>{isSuccess ? 'CREDENTIAL OFFICIALLY STAMPED & SAVED!' : 'STAMP & ADD TO MINISTRY LEDGER'}</span>
                </button>
              </div>
            </form>

            {/* Quick 1-Click Verification Presets */}
            <div className="pt-2">
              <span className={`font-cinzel text-[10px] uppercase tracking-wider block mb-2 font-black flex items-center gap-1 ${
                isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'
              }`}>
                <Sparkles size={11} className="text-[#D4AF37]" /> QUICK 1-CLICK SAMPLE PRESETS (TRY CLICKING ONE):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_CERTIFICATES.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAddPreset(p)}
                    className={`p-2.5 rounded text-left transition-all cursor-pointer group ${
                      isLumos
                        ? 'glass-sub-lumos hover:bg-white text-[#090D16]'
                        : 'glass-sub-nox hover:bg-white/20 text-[#F8FAFC]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-[11px] font-black truncate max-w-[200px]">{p.title}</span>
                      <Plus size={12} className="text-[#D4AF37] group-hover:scale-125 transition-transform" />
                    </div>
                    <span className={`font-fell italic text-[10px] font-semibold block ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>{p.issuer} • {p.date}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Live List of Verified Certificates (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className={`flex items-center justify-between pb-2 border-b ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}>
              <span className="font-cinzel text-xs font-black uppercase tracking-wider flex items-center gap-1.5" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                <ShieldCheck size={14} /> ACTIVE ACCREDITATIONS LEDGER
              </span>
              <button
                onClick={() => requestPasscode('Reset Certificates Vault to Defaults', () => resetCertificates())}
                title="Reset to default certificates"
                className={`flex items-center gap-1 font-mono-runes text-[10px] font-black cursor-pointer ${
                  isLumos ? 'text-[#334155] hover:text-[#090D16]' : 'text-[#CBD5E1] hover:text-white'
                }`}
              >
                <RotateCcw size={10} /> Reset
              </button>
            </div>

            {/* Scrollable list of active certificates */}
            <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
              {certificates.map((c) => (
                <div
                  key={c.id}
                  className={`p-3.5 rounded transition-all relative group ${
                    isLumos
                      ? 'glass-sub-lumos hover:border-[#8B0000]'
                      : 'glass-sub-nox hover:border-[#D4AF37]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono-runes pb-1">
                    <span className="font-black text-[10px]" style={{ color: houseStyles.primary }}>[{c.tag}]</span>
                    <span className={`text-[10px] font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>{c.date}</span>
                  </div>

                  <h4 className={`font-cinzel text-xs font-black mt-1 ${isLumos ? 'text-[#090D16]' : 'text-[#F8FAFC]'}`}>
                    {c.title}
                  </h4>

                  <div className="flex items-center justify-between font-fell italic text-xs mt-1.5 font-bold" style={{ color: isLumos ? houseStyles.secondary : '#D4AF37' }}>
                    <span>{c.issuer}</span>
                    <span className="font-cinzel font-black text-[#059669] text-[10px] not-italic flex items-center gap-1">
                      <CheckCircle2 size={11} /> VERIFIED
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => requestPasscode(`Delete Certificate: ${c.title}`, () => removeCertificate(c.id))}
                    title="Remove from public registry"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-[#DC2626] hover:text-[#B91C1C] transition-all cursor-pointer"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            {/* Ministry Wax Seal Badge Preview */}
            <div className="pt-2 flex justify-center">
              <RubberStamp label="MINISTRY VERIFIED" subLabel="ROYAL ACCREDITATION" variant="wax-crimson" angle={-1} />
            </div>
          </div>
        </div>
      </div>

      {/* Universal Ministry Security Passcode Lock Modal */}
      <MinistrySecurityModal
        isOpen={secModal.isOpen}
        actionTitle={secModal.actionTitle}
        onClose={() => setSecModal({ ...secModal, isOpen: false })}
        onSuccess={secModal.action}
      />
    </div>
  );
};
