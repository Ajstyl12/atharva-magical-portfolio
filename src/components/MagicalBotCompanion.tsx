import React, { useState, useEffect, useRef } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { Sparkles, X, Send, User, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

const CUTE_PROMPTS = [
  { id: 'projects', icon: '🚀', label: 'Top AI Projects', query: "Tell me about Atharva's top AI & software projects." },
  { id: 'experience', icon: '💼', label: 'Career History', query: "What is Atharva's work experience and engineering background?" },
  { id: 'contact', icon: '✉️', label: 'Contact Atharva', query: "How can I contact Atharva or reach out to him?" },
  { id: 'skills', icon: '📜', label: 'Skills & Certs', query: "What technical skills and certifications does Atharva hold?" },
  { id: 'house', icon: '🦁', label: 'House & Bio', query: "Which Hogwarts house does Atharva belong to and what is his bio?" },
];

/**
 * CutePygmyPuffAvatar
 * Custom animated SVG Pygmy Puff creature avatar with fluffy ears,
 * big shiny eyes, blush cheeks, and a tiny golden wizard hat!
 */
const CutePygmyPuffAvatar: React.FC<{ size?: number; isTyping?: boolean }> = ({ size = 32, isTyping = false }) => {
  return (
    <div
      className="relative flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 select-none"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`drop-shadow-md ${isTyping ? 'animate-bounce' : ''}`}
      >
        <defs>
          <radialGradient id="puffBody" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#FF85B8" />
            <stop offset="60%" stopColor="#FF4B72" />
            <stop offset="100%" stopColor="#801C38" />
          </radialGradient>
          <linearGradient id="hatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Fluffy Puff Tufts / Outer Ears */}
        <circle cx="16" cy="18" r="7" fill="#FF85B8" />
        <circle cx="48" cy="18" r="7" fill="#FF85B8" />
        <circle cx="12" cy="36" r="6" fill="#FF4B72" />
        <circle cx="52" cy="36" r="6" fill="#FF4B72" />

        {/* Main Fluffy Round Body */}
        <circle cx="32" cy="34" r="23" fill="url(#puffBody)" />

        {/* Rosy Pink Blush Cheeks */}
        <circle cx="20" cy="38" r="4.5" fill="#FF1E56" opacity="0.45" />
        <circle cx="44" cy="38" r="4.5" fill="#FF1E56" opacity="0.45" />

        {/* Big Cute Shiny Anime Eyes */}
        {/* Left Eye */}
        <circle cx="23" cy="32" r="5" fill="#181825" />
        <circle cx="21.5" cy="30" r="2.2" fill="#FFFFFF" />
        <circle cx="24.5" cy="33.5" r="1" fill="#FFFFFF" />

        {/* Right Eye */}
        <circle cx="41" cy="32" r="5" fill="#181825" />
        <circle cx="39.5" cy="30" r="2.2" fill="#FFFFFF" />
        <circle cx="42.5" cy="33.5" r="1" fill="#FFFFFF" />

        {/* Cute Beak / Happy Mouth */}
        <path d="M 30 36 Q 32 39 34 36" stroke="#181825" strokeWidth="1.8" strokeLinecap="round" fill="none" />

        {/* Tiny Wizard Hat */}
        <path d="M 22 18 L 32 3 L 42 18 Z" fill="url(#hatGrad)" />
        <ellipse cx="32" cy="18" rx="12" ry="3" fill="#D97706" />
        {/* Star on Hat */}
        <path d="M 32 7 L 33 10 L 36 10 L 33.5 12 L 34.5 15 L 32 13 L 29.5 15 L 30.5 12 L 28 10 L 31 10 Z" fill="#FFFFFF" />

        {/* Magic Sparkles around head */}
        <path d="M 8 12 L 9.5 16 L 14 17.5 L 9.5 19 L 8 23.5 L 6.5 19 L 2 17.5 L 6.5 16 Z" fill="#FFD700" opacity="0.8" />
        <path d="M 54 10 L 55 13 L 58 14 L 55 15 L 54 18 L 53 15 L 50 14 L 53 13 Z" fill="#FFFFFF" opacity="0.9" />
      </svg>
    </div>
  );
};

export const MagicalBotCompanion: React.FC = () => {
  const { themeMode, getHouseColor, personalInfo, careerRoles, projects, certificates, houseTheme } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputQuery, setInputQuery] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [botMood, setBotMood] = useState<string>('Feeling Magical 💖');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hoo-hoo! Hi there! 💖\n\nI'm **Phineas**, Atharva's cute Pygmy Puff companion! I continuously watch over his portfolio & archives.\n\nAsk me anything about Atharva's projects, experience, skills, or contact info! ✨`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const toggleChat = () => {
    if (!isOpen) {
      soundFx.playWandCast();
      setBotMood('Happy to Help! 🌟');
    } else {
      soundFx.playPageTurn();
    }
    setIsOpen(!isOpen);
  };

  // Real-Time Intelligent Portfolio Observer Engine
  const generateBotAnswer = (userText: string): string => {
    const raw = userText.trim();
    const q = raw.toLowerCase();

    // 1. Phineas Persona & Bot Self Awareness
    if (
      q.includes('phineas') ||
      q.includes('who are you') ||
      q.includes('what are you') ||
      q.includes('your name') ||
      q.includes('what do you do') ||
      q.includes('tell me about yourself')
    ) {
      return `Hoo-hoo! ✨ I'm **Phineas**, Atharva Bagwe's magical Pygmy Puff companion & AI Portfolio Observer! 💖\n\nI continuously monitor Atharva's live archives, technical projects, career roles, certifications, and skills in real-time.\n\nAsk me anything about Atharva's work, tech stack, experience, contact details, or Hogwarts house! 🌟`;
    }

    // 2. Greetings & Casual Chitchat
    if (q === 'hi' || q === 'hello' || q === 'hey' || q.startsWith('hi ') || q.startsWith('hello ')) {
      return `Hoo-hoo! Hello there! 💖 How can I help you explore Atharva's portfolio today? ✨ You can ask me about his AI projects, career at Network 18, skills, or contact info!`;
    }

    if (q.includes('how are you') || q.includes('how r u')) {
      return `I'm feeling extra magical and happy to assist! 🌟 All archives are up to date! What would you like to know about Atharva?`;
    }

    if (q.includes('thank') || q.includes('thx') || q.includes('awesome') || q.includes('great')) {
      return `You're so very welcome! 💖 Let me know if you need anything else from Atharva's grimoire! ✨`;
    }

    // 3. Projects & Work Showcase
    if (
      q.includes('project') ||
      q.includes('built') ||
      q.includes('application') ||
      q.includes('app') ||
      q.includes('software') ||
      q.includes('code') ||
      q.includes('artifact')
    ) {
      if (projects.length === 0) {
        return `🚀 **Atharva's Projects:**\n\nAtharva is actively building cutting-edge AI architectures, IoT edge systems, and high-performance web applications!`;
      }
      const topProjects = projects.slice(0, 4);
      const list = topProjects.map(p => `• **${p.title}** (${p.domain})\n  *${p.overview}*\n  🏷️ *Tech: ${p.tags.join(', ')}*`).join('\n\n');
      return `🔮 **Atharva's Live Projects (${projects.length} Total):**\n\n${list}\n\n✨ Check out Section 04 (*ARTIFACTS & WORKS*) to view live interactive demos!`;
    }

    // 4. Career History & Work Experience
    if (
      q.includes('experience') ||
      q.includes('career') ||
      q.includes('job') ||
      q.includes('role') ||
      q.includes('work') ||
      q.includes('company') ||
      q.includes('network 18') ||
      q.includes('network18') ||
      q.includes('mcr') ||
      q.includes('analyst')
    ) {
      if (careerRoles.length === 0) {
        return `📜 **Career History:**\n\nAtharva serves as an MCR Analyst & Apprentice at Network 18, managing live broadcast streams and AI workflows.`;
      }
      const rolesList = careerRoles.map(r => `• **${r.role}** @ *${r.organization}* (${r.period})\n  📍 *${r.location}* | Badge: \`${r.statusBadge}\`\n  ${r.description[0] ? `*${r.description[0]}*` : ''}`).join('\n\n');
      return `💼 **Atharva's Career Chronicles:**\n\n${rolesList}\n\n🏆 Atharva brings hands-on experience in MCR broadcast engineering, AI pipelines, and cloud systems!`;
    }

    // 5. Contact Info & Social Links
    if (
      q.includes('contact') ||
      q.includes('email') ||
      q.includes('reach') ||
      q.includes('hire') ||
      q.includes('github') ||
      q.includes('linkedin') ||
      q.includes('phone') ||
      q.includes('location') ||
      q.includes('where')
    ) {
      return `✉️ **Contact & Social Dossier:**\n\n• **Email**: [${personalInfo.email}](mailto:${personalInfo.email})\n• **GitHub**: [github.com/atharvabagwe30](https://github.com/atharvabagwe30)\n• **LinkedIn**: [linkedin.com/in/atharva-bagwe](https://linkedin.com/in/atharva-bagwe)\n• **Location**: ${personalInfo.location}\n• **Ministry ID**: #${personalInfo.ministryId}\n\nFeel free to send Atharva an owl post or email anytime! 🌟`;
    }

    // 6. Education, College & GPA
    if (
      q.includes('education') ||
      q.includes('degree') ||
      q.includes('college') ||
      q.includes('university') ||
      q.includes('gpa') ||
      q.includes('study') ||
      q.includes('academic') ||
      q.includes('engineering')
    ) {
      const edu = personalInfo.educationSummary;
      return `🎓 **Atharva's Academic Record:**\n\n• **Degree**: ${edu.degree}\n• **Institution**: ${edu.college}\n• **GPA / Score**: **${edu.gpa}** (${edu.period})\n• **Prior Foundation**: ${edu.prior.map(p => `${p.qualification} @ ${p.institution}`).join(', ')}\n\nSpecialized in Electronics & Computer Science Engineering with a focus on AI architectures and embedded systems!`;
    }

    // 7. Skills & Certifications
    if (
      q.includes('skill') ||
      q.includes('cert') ||
      q.includes('tech stack') ||
      q.includes('stack') ||
      q.includes('python') ||
      q.includes('react') ||
      q.includes('ai')
    ) {
      const certList = certificates.slice(0, 3).map(c => `• **${c.title}** — *${c.issuer}* (${c.date})`).join('\n');
      return `📜 **Skills & Accredited Dossiers:**\n\n**Core Technical Stack:** Python, TypeScript, React, Next.js, Node.js, PyTorch, C/C++, IoT Edge, SQL & Supabase.\n\n**Verified Certifications:**\n${certList || '• AWS & AI Systems Accreditations'}\n\nExplore Section 09 (*SCROLLS*) to verify certificates!`;
    }

    // 8. Hogwarts House & Bio
    if (
      q.includes('who is atharva') ||
      q.includes('about atharva') ||
      q.includes('house') ||
      q.includes('hogwarts') ||
      q.includes('gryffindor') ||
      q.includes('slytherin') ||
      q.includes('ravenclaw') ||
      q.includes('hufflepuff') ||
      q.includes('bio')
    ) {
      return `🦁 **About Atharva Bagwe:**\n\n${personalInfo.tagline}\n\n• **Hogwarts House**: **${houseTheme.toUpperCase()}**!\n• **Status**: ${personalInfo.status}\n• **Location**: ${personalInfo.location}\n• **Manifesto**: "${personalInfo.editorNote[0] || 'Turning code into magical real-time realities.'}"`;
    }

    // 9. Resume / Dossier Download
    if (q.includes('resume') || q.includes('cv') || q.includes('download') || q.includes('pdf') || q.includes('dossier')) {
      return `📄 **Download Atharva's Official Resume:**\n\nClick the **"PRINT DOSSIER"** button in the header bar or hero section to download his official PDF resume!`;
    }

    // 10. Dynamic Real-Time Keyword Matching Fallback
    const matchingProj = projects.find(p => p.title.toLowerCase().includes(q) || p.overview.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
    if (matchingProj) {
      return `🔮 **Matching Project Found!**\n\n• **${matchingProj.title}**: ${matchingProj.overview}\n*Domain: ${matchingProj.domain} | Tech: ${matchingProj.tags.join(', ')}*`;
    }

    const matchingRole = careerRoles.find(r => r.organization.toLowerCase().includes(q) || r.role.toLowerCase().includes(q));
    if (matchingRole) {
      return `💼 **Matching Role Found!**\n\n• **${matchingRole.role}** @ *${matchingRole.organization}* (${matchingRole.period})\n*${matchingRole.description[0] || ''}*`;
    }

    return `💖 **Phineas Live Archive Observer:**\n\nI searched Atharva's live portfolio for "${userText}". Here is a quick summary:\n\n• **Name**: ${personalInfo.name}\n• **Status**: ${personalInfo.status}\n• **House**: ${houseTheme.toUpperCase()}\n• **Email**: ${personalInfo.email}\n\nWould you like me to tell you about:\n1. 🚀 **His top AI & web projects**\n2. 💼 **Work experience at Network 18**\n3. ✉️ **Contact details & socials**\n4. 📜 **Skills & certifications**?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    soundFx.playWandCast();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);
    setBotMood('Consulting Archives... 📜');

    setTimeout(() => {
      soundFx.playPageTurn();
      const botResponseText = generateBotAnswer(query);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      setBotMood('Feeling Magical 💖');
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    soundFx.playWandCast();
    setMessages([
      {
        id: `welcome-reset-${Date.now()}`,
        sender: 'bot',
        text: `Archives refreshed! 🔮 Ready for your questions about Atharva! ✨`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* Super Cute Floating Bot Trigger Pill */}
      <div className="fixed bottom-20 sm:bottom-24 right-4 z-40 flex flex-col items-end gap-1.5 pointer-events-auto">
        {!isOpen && (
          <button
            onClick={toggleChat}
            className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full shadow-xl transition-all duration-300 cursor-pointer border hover:scale-105 active:scale-95 ${
              isLumos
                ? 'bg-white/95 border-amber-400/80 text-black shadow-amber-500/20'
                : 'bg-[#0E0E14]/95 border-amber-400/50 text-white shadow-amber-500/30'
            }`}
            style={{ borderColor: houseStyles.border }}
            title="Ask Phineas — Portfolio Observer AI"
          >
            {/* Cute Speech Bubble Tag */}
            <div className="absolute -top-7 right-0 bg-amber-500 text-black font-cinzel text-[10px] font-black px-2 py-0.5 rounded-full shadow-md animate-bounce whitespace-nowrap">
              Ask Phineas! 💬
            </div>

            {/* Glowing Custom Pygmy Puff Avatar */}
            <CutePygmyPuffAvatar size={28} />

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="font-cinzel text-[11px] font-black tracking-wide" style={{ color: isLumos ? '#000000' : '#FFFFFF' }}>
                  PHINEAS AI
                </span>
                <Sparkles size={10} className="text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Sleek, Compact & Cute Context Window Drawer */}
      {isOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[92vw] sm:w-[360px] h-[460px] sm:h-[490px] rounded-3xl shadow-2xl border flex flex-col overflow-hidden transition-all duration-300 animate-fade-in backdrop-blur-2xl"
          style={{
            backgroundColor: isLumos ? 'rgba(253, 251, 247, 0.98)' : 'rgba(12, 12, 18, 0.96)',
            borderColor: houseStyles.border,
            boxShadow: `0 16px 45px rgba(0, 0, 0, 0.45), 0 0 25px ${houseStyles.glow}`
          }}
        >
          {/* Header Bar */}
          <div className="p-3 border-b flex items-center justify-between gap-2"
            style={{ backgroundColor: isLumos ? `${houseStyles.primary}15` : 'rgba(255, 255, 255, 0.04)', borderColor: houseStyles.border }}
          >
            <div className="flex items-center gap-2.5">
              {/* Cute Custom Pygmy Puff Avatar */}
              <CutePygmyPuffAvatar size={34} isTyping={isTyping} />

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-cinzel text-xs sm:text-sm font-black tracking-wide" style={{ color: isLumos ? '#000000' : '#FFFFFF' }}>
                    Phineas
                  </h3>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono-runes font-bold uppercase"
                    style={{ backgroundColor: `${houseStyles.primary}35`, color: isLumos ? houseStyles.primary : houseStyles.secondary }}
                  >
                    AI OBSERVER
                  </span>
                </div>
                <p className={`text-[10px] font-fell italic ${isLumos ? 'text-black' : 'text-slate-300'}`}>
                  {botMood}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Refresh Chat"
              >
                <RefreshCw size={13} />
              </button>
              <button
                onClick={toggleChat}
                className="p-1 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title="Close Window"
              >
                <X size={15} />
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips (Compact Scrollable) */}
          <div className="px-2.5 py-1.5 border-b overflow-x-auto flex items-center gap-1.5 no-scrollbar"
            style={{ backgroundColor: isLumos ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)', borderColor: isLumos ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)' }}
          >
            {CUTE_PROMPTS.map((qp) => (
              <button
                key={qp.id}
                onClick={() => handleSendMessage(qp.query)}
                className={`text-[10px] font-cinzel font-bold px-2 py-0.5 rounded-full border whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  isLumos
                    ? 'bg-white border-slate-300 text-black hover:bg-amber-100 hover:border-amber-400'
                    : 'bg-white/5 border-white/15 text-white hover:bg-white/15 hover:border-amber-400'
                }`}
              >
                <span>{qp.icon}</span>
                <span>{qp.label}</span>
              </button>
            ))}
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5 no-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <CutePygmyPuffAvatar size={24} />
                )}

                <div className={`max-w-[86%] rounded-2xl p-2.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? isLumos
                      ? 'bg-[#8B0000] text-white rounded-br-none shadow-sm'
                      : 'bg-[#DC2626] text-white rounded-br-none shadow-sm'
                    : isLumos
                      ? 'bg-white border border-slate-200 text-black rounded-bl-none shadow-sm font-sans-body'
                      : 'bg-white/10 border border-white/15 text-slate-100 rounded-bl-none shadow-sm font-sans-body'
                }`}
                style={{
                  backgroundColor: msg.sender === 'user' ? houseStyles.primary : undefined,
                  color: msg.sender === 'user' ? '#FFFFFF' : (isLumos ? '#000000' : '#FFFFFF')
                }}
                >
                  <div className="whitespace-pre-line">
                    {msg.text.split('\n').map((line, idx) => {
                      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      return (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: formatted }} className="mb-0.5 last:mb-0" />
                      );
                    })}
                  </div>

                  <span className={`text-[8px] mt-1 block text-right font-mono-runes opacity-70 ${
                    msg.sender === 'user' ? 'text-white/80' : isLumos ? 'text-black' : 'text-slate-300'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-500 flex items-center justify-center shrink-0 mt-0.5 text-[11px] text-white">
                    <User size={11} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 items-center">
                <CutePygmyPuffAvatar size={24} isTyping={true} />
                <div className={`px-3 py-2 rounded-2xl text-[11px] flex items-center gap-1.5 ${
                  isLumos ? 'bg-white border border-slate-200 text-black' : 'bg-white/10 border border-white/15 text-slate-200'
                }`}>
                  <Sparkles size={11} className="animate-spin text-amber-400" />
                  <span className="font-fell italic">Phineas is consulting archives...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Compact Input Form */}
          <div className="p-2.5 border-t flex items-center gap-1.5"
            style={{ backgroundColor: isLumos ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)', borderColor: houseStyles.border }}
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Phineas anything about Atharva..."
              className={`flex-1 px-3 py-2 rounded-full text-xs border transition-all focus:outline-none ${
                isLumos
                  ? 'bg-white border-slate-300 text-black placeholder:text-slate-600 focus:border-amber-500'
                  : 'bg-slate-900/90 border-white/20 text-white placeholder:text-slate-400 focus:border-amber-400'
              }`}
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim()}
              className={`p-2 rounded-full font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                inputQuery.trim() ? 'scale-105 shadow-md' : ''
              }`}
              style={{
                backgroundColor: houseStyles.primary,
                color: '#FFFFFF'
              }}
              title="Send to Phineas"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
