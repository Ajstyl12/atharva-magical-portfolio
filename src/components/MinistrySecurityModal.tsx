import React, { useState, useEffect } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { soundFx } from '../utils/audioEffects';
import { ShieldAlert, KeyRound, Eye, EyeOff, Lock, X, AlertTriangle, ShieldCheck } from 'lucide-react';

interface MinistrySecurityModalProps {
  isOpen: boolean;
  actionTitle: string;
  onClose: () => void;
  onSuccess: () => void;
}

// Master Passcode for Atharva's Portfolio
export const MASTER_PASSCODE = 'DEEPASHRI';

export const MinistrySecurityModal: React.FC<MinistrySecurityModalProps> = ({
  isOpen,
  actionTitle,
  onClose,
  onSuccess,
}) => {
  const { themeMode, getHouseColor } = useWizardTheme();
  const isLumos = themeMode === 'lumos';
  const houseStyles = getHouseColor();

  const [enteredPassword, setEnteredPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorWarning, setErrorWarning] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setEnteredPassword('');
      setShowPassword(false);
      setErrorWarning(null);
      setIsSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (enteredPassword === MASTER_PASSCODE) {
      soundFx.playWandCast();
      setIsSuccess(true);
      setErrorWarning(null);

      setTimeout(() => {
        onSuccess();
        onClose();
      }, 400);
    } else {
      soundFx.playPageTurn();
      setErrorWarning('⛔ ACCESS DENIED! Incorrect Master Passcode. Unauthorized edits or uploads are strictly prohibited under Ministry Edict 394.');
      setEnteredPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className={`relative w-full max-w-md rounded-2xl border shadow-2xl p-6 overflow-hidden transition-all duration-300 ${
          isLumos
            ? 'bg-[#FBF9F4] border-red-700 text-black shadow-red-900/20'
            : 'bg-[#0B0B10] border-red-600 text-white shadow-red-900/50'
        }`}
        style={{
          boxShadow: `0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px ${houseStyles.glow}`
        }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b mb-4" style={{ borderColor: houseStyles.border }}>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 animate-pulse">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h3 className="font-cinzel text-base font-black tracking-wide" style={{ color: isLumos ? '#000000' : '#FFFFFF' }}>
                MINISTRY SECURITY LOCK
              </h3>
              <p className={`text-[11px] font-fell italic ${isLumos ? 'text-black font-semibold' : 'text-slate-300'}`}>
                Privacy Protection Seal • Edict No. 394
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Cancel Action"
          >
            <X size={18} />
          </button>
        </div>

        {/* Requested Action Badge */}
        <div
          className="mb-4 p-3 rounded-xl border flex items-center gap-2.5 text-xs"
          style={{
            backgroundColor: isLumos ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.04)',
            borderColor: houseStyles.border
          }}
        >
          <Lock size={14} className="text-amber-500 shrink-0" />
          <div>
            <span className="font-mono-runes opacity-75 uppercase block text-[10px]">Protected Action:</span>
            <span className="font-cinzel font-black tracking-wide" style={{ color: isLumos ? '#000000' : '#FFFFFF' }}>
              {actionTitle}
            </span>
          </div>
        </div>

        {/* Warning Banner if incorrect passcode entered */}
        {errorWarning && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/50 text-red-400 text-xs flex items-start gap-2.5 animate-shake">
            <AlertTriangle size={16} className="shrink-0 text-red-500 mt-0.5" />
            <div className="font-sans-body leading-relaxed font-semibold">
              {errorWarning}
            </div>
          </div>
        )}

        {/* Success Banner */}
        {isSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/50 text-emerald-400 text-xs flex items-center gap-2.5">
            <ShieldCheck size={18} className="shrink-0 text-emerald-400" />
            <span className="font-cinzel font-bold">⚡ SPELL VERIFIED — ACCESS GRANTED!</span>
          </div>
        )}

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-cinzel font-bold mb-1.5" style={{ color: isLumos ? '#000000' : '#FFFFFF' }}>
              ENTER MASTER SPELL PASSCODE:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={enteredPassword}
                onChange={(e) => setEnteredPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                autoFocus
                className={`w-full px-4 py-2.5 pr-10 rounded-xl text-sm font-mono tracking-widest border transition-all focus:outline-none ${
                  isLumos
                    ? 'bg-white border-slate-400 text-black placeholder:text-slate-700 focus:border-red-600'
                    : 'bg-slate-900 border-white/20 text-white placeholder:text-slate-400 focus:border-red-500'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                title={showPassword ? 'Hide Passcode (* pattern)' : 'Show Passcode'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className={`text-[10px] mt-1.5 font-fell italic ${isLumos ? 'text-black font-semibold' : 'text-slate-400'}`}>
              🔒 Restricted Encrypted Access • Authorized Personnel Only
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold border transition-all cursor-pointer ${
                isLumos
                  ? 'border-slate-300 text-black hover:bg-slate-200'
                  : 'border-white/20 text-slate-300 hover:bg-white/10'
              }`}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-cinzel font-black tracking-wider bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <KeyRound size={14} />
              <span>VERIFY SPELL</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
