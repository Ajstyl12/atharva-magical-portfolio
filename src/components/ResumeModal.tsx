import React from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { X, Download, Printer, Mail, Phone, MapPin } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { themeMode, getHouseColor, certificates, personalInfo, careerRoles, publication } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playStamp();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-2 sm:p-4 overflow-y-auto">
      <div
        className={`relative w-full max-w-4xl rounded-md shadow-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto border-2 ${
          isLumos
            ? 'glass-card-lumos border-[#8B0000] text-[#090D16]'
            : 'glass-card-nox border-[#D4AF37] text-[#F8FAFC]'
        }`}
        style={{ borderColor: houseStyles.border }}
      >
        {/* Top Modal Controls Header */}
        <div className={`flex items-center justify-between px-6 py-3.5 border-b ${
          isLumos ? 'glass-sub-lumos border-slate-200/80' : 'glass-sub-nox border-white/10'
        }`}>
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
              MINISTRY OF MAGIC RECRUITER SCROLL
            </span>
            <span className={`font-mono-runes text-[10px] font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
              ATHARVA_BAGWE_HOGWARTS_DOSSIER.PDF
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`flex items-center gap-1 px-3 py-1 font-cinzel text-xs font-black rounded transition-all cursor-pointer ${
                isLumos
                  ? 'glass-sub-lumos hover:bg-white text-[#090D16]'
                  : 'glass-sub-nox hover:bg-white/20 text-white'
              }`}
            >
              <Printer size={13} />
              <span>PRINT</span>
            </button>

            <a
              href={`mailto:${personalInfo.email}?subject=Ministry%20Recruiter%20Request%3A%20Atharva%20Bagwe%20Resume`}
              onClick={() => soundFx.playWandCast()}
              className="flex items-center gap-1 px-3.5 py-1 font-cinzel text-xs font-black uppercase rounded transition-all shadow-sm hover:scale-105"
              style={{
                backgroundColor: houseStyles.primary,
                color: '#FFFFFF',
                borderColor: houseStyles.border
              }}
            >
              <Download size={13} />
              <span>DOWNLOAD PDF</span>
            </a>

            <button
              onClick={() => {
                soundFx.playWandCast();
                onClose();
              }}
              className={`p-1.5 transition-colors cursor-pointer rounded ${isLumos ? 'text-[#090D16] hover:bg-slate-200/60' : 'text-[#CBD5E1] hover:text-white hover:bg-white/10'}`}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Formatted Printable Resume Paper View */}
        <div className={`p-6 sm:p-10 overflow-y-auto space-y-6 font-sans-body ${
          isLumos ? 'bg-[#FFFFFF]/90 text-[#090D16]' : 'bg-[#050508]/90 text-[#F8FAFC]'
        }`}>
          {/* Header */}
          <div className={`text-center space-y-2 pb-4 border-b-2 ${
            isLumos ? 'border-[#8B0000]' : 'border-[#D4AF37]'
          }`}
          style={{ borderColor: houseStyles.border }}
          >
            <h2 className={`font-cinzel-dec text-3xl sm:text-4xl font-black tracking-tight uppercase ${
              isLumos ? 'text-[#090D16]' : 'text-white'
            }`}>
              {personalInfo.name}
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-fell italic text-sm font-bold" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
              <span className={`flex items-center gap-1 not-italic font-mono-runes text-xs font-black ${isLumos ? 'text-[#090D16]' : 'text-white'}`}>
                <Phone size={12} className="text-[#D97706]" /> {personalInfo.phone}
              </span>
              <span>◇</span>
              <span className={`flex items-center gap-1 not-italic font-mono-runes text-xs font-black ${isLumos ? 'text-[#090D16]' : 'text-white'}`}>
                <Mail size={12} className="text-[#DC2626]" /> {personalInfo.email}
              </span>
              <span>◇</span>
              <span className={`flex items-center gap-1 not-italic font-mono-runes text-xs font-black ${isLumos ? 'text-[#090D16]' : 'text-white'}`}>
                <MapPin size={12} className="text-[#059669]" /> {personalInfo.location}
              </span>
              <span>◇</span>
              <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="hover:underline font-cinzel not-italic text-xs font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                LinkedIn
              </a>
              <span>◇</span>
              <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="hover:underline font-cinzel not-italic text-xs font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                GitHub
              </a>
              <span>◇</span>
              <a href={personalInfo.socials.instagram} target="_blank" rel="noreferrer" className="hover:underline font-cinzel not-italic text-xs font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>
                Instagram
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h3 className={`font-cinzel font-black text-sm uppercase tracking-wider border-b pb-1 ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}
            style={{ color: houseStyles.primary }}
            >
              Summary & Engineering Ethos
            </h3>
            <p className={`text-xs leading-relaxed font-sans-body font-semibold ${
              isLumos ? 'text-[#1E293B]' : 'text-[#E2E8F0]'
            }`}>
              {personalInfo.editorNote.join(' ')}
            </p>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h3 className={`font-cinzel font-black text-sm uppercase tracking-wider border-b pb-1 ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}
            style={{ color: houseStyles.primary }}
            >
              Experience
            </h3>
            {careerRoles.map((role) => (
              <div key={role.id} className="space-y-1">
                <div className="flex justify-between items-baseline text-xs">
                  <span className={`font-black font-cinzel text-sm ${isLumos ? 'text-[#090D16]' : 'text-white'}`}>
                    {role.role}
                  </span>
                  <span className="font-mono-runes text-[11px] font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>{role.period}</span>
                </div>
                <div className={`flex justify-between text-xs font-fell italic font-bold ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
                  <span>{role.organization}</span>
                  <span>{role.location}</span>
                </div>
                <ul className={`list-disc list-inside space-y-0.5 text-xs pt-1 font-semibold ${
                  isLumos ? 'text-[#1E293B]' : 'text-[#E2E8F0]'
                }`}>
                  {role.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className={`font-cinzel font-black text-sm uppercase tracking-wider border-b pb-1 ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}
            style={{ color: houseStyles.primary }}
            >
              Education
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-baseline text-xs">
                <div>
                  <span className={`font-black font-cinzel ${isLumos ? 'text-[#090D16]' : 'text-white'}`}>
                    {personalInfo.educationSummary.degree}
                  </span>
                  <span className={`block text-[11px] font-fell italic font-bold ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
                    {personalInfo.educationSummary.college} (GPA: {personalInfo.educationSummary.gpa})
                  </span>
                </div>
                <span className={`font-mono-runes text-[11px] font-black ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>
                  {personalInfo.educationSummary.period}
                </span>
              </div>

              {personalInfo.educationSummary.prior.map((item, i) => (
                <div key={i} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-black">{item.qualification}</span>
                    <span className={`block text-[11px] font-fell italic font-semibold ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>{item.institution} (GPA: {item.gpa})</span>
                  </div>
                  <span className={`font-mono-runes text-[11px] font-bold ${isLumos ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>{item.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-1.5">
            <h3 className={`font-cinzel font-black text-sm uppercase tracking-wider border-b pb-1 ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}
            style={{ color: houseStyles.primary }}
            >
              Certifications & Ministry Accreditations ({certificates.length} Verified)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {certificates.map((c) => (
                <div key={c.id} className={`flex justify-between items-center p-2.5 rounded transition-all ${
                  isLumos ? 'glass-sub-lumos' : 'glass-sub-nox'
                }`}>
                  <div>
                    <span className={`font-black block font-cinzel ${isLumos ? 'text-[#090D16]' : 'text-white'}`}>
                      {c.title}
                    </span>
                    <span className={`text-[10px] font-fell italic font-bold ${isLumos ? 'text-[#334155]' : 'text-[#CBD5E1]'}`}>{c.issuer}</span>
                  </div>
                  <span className="font-mono-runes text-[10px] font-black" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>{c.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div className="space-y-1">
            <h3 className={`font-cinzel font-black text-sm uppercase tracking-wider border-b pb-1 ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}
            style={{ color: houseStyles.primary }}
            >
              Publications & Research
            </h3>
            <div className="text-xs space-y-1">
              <span className={`font-black block font-cinzel ${isLumos ? 'text-[#090D16]' : 'text-white'}`}>
                "{publication.title}"
              </span>
              <span className={`font-fell italic block text-[11px] font-bold ${isLumos ? 'text-[#1E293B]' : 'text-[#CBD5E1]'}`}>
                {publication.journal} • {publication.date}
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <h3 className={`font-cinzel font-black text-sm uppercase tracking-wider border-b pb-1 ${
              isLumos ? 'border-slate-200/80' : 'border-white/10'
            }`}
            style={{ color: houseStyles.primary }}
            >
              Technical & Soft Skills
            </h3>
            <div className="text-xs space-y-1 font-mono-runes">
              <div>
                <span className="font-black font-cinzel" style={{ color: houseStyles.primary }}>Technical Skills: </span>
                <span className={`font-semibold ${isLumos ? 'text-[#1E293B]' : 'text-[#E2E8F0]'}`}>
                  Artificial Intelligence, AI Agent Architectures, AWS Cloud, CSS3, Chatbot Systems, DBMS, Figma, Firebase Studio, Generative AI, HTML5, JavaScript, MS Office, MySQL, PDLC, Python, Power BI, Vibe Coding
                </span>
              </div>
              <div>
                <span className="font-black font-cinzel" style={{ color: isLumos ? houseStyles.primary : houseStyles.secondary }}>Soft Skills: </span>
                <span className={`font-semibold ${isLumos ? 'text-[#1E293B]' : 'text-[#E2E8F0]'}`}>
                  Communication Skills, Creative Writing, Group Discussion, Negotiation, Presentation, Story Writing, Teamwork
                </span>
              </div>
              <div>
                <span className="text-[#059669] font-black font-cinzel">Languages: </span>
                <span className={`font-bold ${isLumos ? 'text-[#1E293B]' : 'text-[#E2E8F0]'}`}>English, Hindi, Marathi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
