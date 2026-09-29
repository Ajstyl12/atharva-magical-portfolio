import React, { useEffect, useRef, useState } from 'react';
import { useWizardTheme } from '../context/ThemeContext';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface NoteEvent {
  pitch: number; // Hz
  duration: number; // seconds
  gap: number; // seconds to next note
}

export const HogwartsAmbientMusic: React.FC = () => {
  const { bgMusicEnabled, toggleBgMusic, getHouseColor, themeMode } = useWizardTheme();
  const houseStyles = getHouseColor();
  const isLumos = themeMode === 'lumos';

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const loopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlayingVisual, setIsPlayingVisual] = useState<boolean>(false);

  // Iconic Hedwig's Theme Melody sequence (Celesta notes in Hz)
  const hedwigsMelody: NoteEvent[] = [
    // Phrase 1
    { pitch: 493.88, duration: 0.7, gap: 0.75 },  // B4
    { pitch: 659.25, duration: 1.05, gap: 1.1 },  // E5
    { pitch: 783.99, duration: 0.45, gap: 0.5 },  // G5
    { pitch: 739.99, duration: 0.65, gap: 0.7 },  // F#5
    { pitch: 659.25, duration: 1.3, gap: 1.4 },   // E5
    { pitch: 987.77, duration: 0.7, gap: 0.75 },  // B5
    { pitch: 880.00, duration: 1.9, gap: 2.0 },   // A5
    { pitch: 739.99, duration: 1.9, gap: 2.0 },   // F#5

    // Phrase 2
    { pitch: 659.25, duration: 1.05, gap: 1.1 },  // E5
    { pitch: 783.99, duration: 0.45, gap: 0.5 },  // G5
    { pitch: 739.99, duration: 0.65, gap: 0.7 },  // F#5
    { pitch: 622.25, duration: 1.3, gap: 1.4 },   // D#5
    { pitch: 698.46, duration: 0.7, gap: 0.75 },  // F5
    { pitch: 493.88, duration: 2.2, gap: 2.4 },   // B4

    // Phrase 3
    { pitch: 493.88, duration: 0.7, gap: 0.75 },  // B4
    { pitch: 659.25, duration: 1.05, gap: 1.1 },  // E5
    { pitch: 783.99, duration: 0.45, gap: 0.5 },  // G5
    { pitch: 739.99, duration: 0.65, gap: 0.7 },  // F#5
    { pitch: 659.25, duration: 1.3, gap: 1.4 },   // E5
    { pitch: 987.77, duration: 0.7, gap: 0.75 },  // B5
    { pitch: 1174.66, duration: 1.2, gap: 1.25 }, // D6
    { pitch: 1108.73, duration: 0.6, gap: 0.65 }, // C#6
    { pitch: 1046.50, duration: 1.8, gap: 1.9 },  // C6

    // Phrase 4
    { pitch: 830.61, duration: 0.9, gap: 0.95 },  // G#5
    { pitch: 1046.50, duration: 0.85, gap: 0.9 }, // C6
    { pitch: 987.77, duration: 0.5, gap: 0.55 },  // B5
    { pitch: 932.33, duration: 0.8, gap: 0.85 },  // Bb5
    { pitch: 466.16, duration: 0.9, gap: 0.95 },  // Bb4
    { pitch: 783.99, duration: 0.9, gap: 0.95 },  // G5
    { pitch: 659.25, duration: 2.5, gap: 3.0 }    // E5
  ];

  // Play a single crystalline Celesta bell chime note
  const playCelestaBell = (ctx: AudioContext, dest: AudioNode, freq: number, duration: number) => {
    const now = ctx.currentTime;

    // Primary bell tone (Sine)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic bell chime overtone (Triangle + octave/fifth)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.002, now); // slight detune for crystalline shimmer

    // High celestial sparkle overtone
    const osc3 = ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3.01, now);

    // Note amplitude envelope
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.18, now + 0.015); // sharp bell strike
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.8); // bell ring decay

    // High overtone gain
    const sparkleGain = ctx.createGain();
    sparkleGain.gain.setValueAtTime(0.04, now);
    sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    osc3.connect(sparkleGain);
    sparkleGain.connect(noteGain);
    noteGain.connect(dest);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    osc1.stop(now + duration + 1.0);
    osc2.stop(now + duration + 1.0);
    osc3.stop(now + duration + 0.5);
  };

  const startMusicLoop = () => {
    if (isPlayingRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master output gain
      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 1.5);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // Reverb / Echo delay line for Great Hall acoustics
      const delay = ctx.createDelay();
      delay.delayTime.setValueAtTime(0.38, ctx.currentTime);
      const delayFeedback = ctx.createGain();
      delayFeedback.gain.setValueAtTime(0.35, ctx.currentTime);
      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(1400, ctx.currentTime);

      delay.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(delay);
      delayFeedback.connect(master);

      // Low mystical string pad for atmospheric foundation (Em chord)
      const padOsc1 = ctx.createOscillator();
      padOsc1.type = 'sine';
      padOsc1.frequency.setValueAtTime(82.41, ctx.currentTime); // E2
      const padOsc2 = ctx.createOscillator();
      padOsc2.type = 'sine';
      padOsc2.frequency.setValueAtTime(123.47, ctx.currentTime); // B2
      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.03, ctx.currentTime);

      padOsc1.connect(padGain);
      padOsc2.connect(padGain);
      padGain.connect(master);
      padOsc1.start();
      padOsc2.start();

      // Sequencer runner
      let currentNoteIdx = 0;

      const scheduleNextNote = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;

        const note = hedwigsMelody[currentNoteIdx];
        playCelestaBell(audioCtxRef.current, master, note.pitch, note.duration);
        playCelestaBell(audioCtxRef.current, delay, note.pitch, note.duration * 0.7);

        currentNoteIdx = (currentNoteIdx + 1) % hedwigsMelody.length;

        // Gap before next note
        loopTimerRef.current = setTimeout(scheduleNextNote, note.gap * 1000);
      };

      isPlayingRef.current = true;
      setIsPlayingVisual(true);
      scheduleNextNote();

    } catch (err) {
      console.warn('AudioContext autoplay policy:', err);
    }
  };

  const stopMusicLoop = () => {
    isPlayingRef.current = false;
    setIsPlayingVisual(false);

    if (loopTimerRef.current) {
      clearTimeout(loopTimerRef.current);
      loopTimerRef.current = null;
    }

    if (masterGainRef.current && audioCtxRef.current) {
      const now = audioCtxRef.current.currentTime;
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, now + 0.8);
      setTimeout(() => {
        try {
          audioCtxRef.current?.close();
        } catch {
          // ignore
        }
        audioCtxRef.current = null;
        masterGainRef.current = null;
      }, 900);
    }
  };

  useEffect(() => {
    if (bgMusicEnabled) {
      startMusicLoop();
    } else {
      stopMusicLoop();
    }

    return () => {
      stopMusicLoop();
    };
  }, [bgMusicEnabled]);

  // First user interaction gesture listener to automatically unlock Web Audio API if user enabled music
  useEffect(() => {
    const handleFirstTouch = () => {
      if (bgMusicEnabled && audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };
    window.addEventListener('click', handleFirstTouch, { once: true });
    window.addEventListener('keydown', handleFirstTouch, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('keydown', handleFirstTouch);
    };
  }, [bgMusicEnabled]);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={toggleBgMusic}
        title={bgMusicEnabled ? "Mute Hedwig's Theme BGM" : "Play Harry Potter Hedwig's Theme BGM"}
        className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border shadow-2xl transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 ${
          isLumos
            ? 'glass-card-lumos text-[#090D16] border-slate-300'
            : 'glass-card-nox text-white border-white/20'
        }`}
        style={{
          borderColor: isPlayingVisual ? houseStyles.primary : undefined,
          boxShadow: isPlayingVisual ? `0 0 20px ${houseStyles.glow}` : undefined
        }}
      >
        <div className="flex items-center gap-1.5">
          {isPlayingVisual ? (
            <Volume2 size={15} style={{ color: houseStyles.primary }} className="animate-pulse" />
          ) : (
            <VolumeX size={15} className="opacity-60" />
          )}

          <div className="flex flex-col text-left">
            <span className="font-cinzel text-[10px] font-black tracking-wider flex items-center gap-1">
              <span>HEDWIG'S THEME</span>
              {isPlayingVisual && <Sparkles size={10} className="text-[#F59E0B] animate-spin-slow" />}
            </span>
            <span className="font-mono-runes text-[8px] font-semibold opacity-70">
              {isPlayingVisual ? 'HOGWARTS CELESTA' : 'TAP TO PLAY BGM'}
            </span>
          </div>
        </div>

        {/* Live Audio Waveform Bars when playing */}
        {isPlayingVisual && (
          <div className="flex items-end gap-0.5 h-3 ml-1">
            <span className="w-0.5 bg-[#D4AF37] rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 bg-[#D4AF37] rounded-full animate-bounce h-3" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 bg-[#D4AF37] rounded-full animate-bounce h-1.5" style={{ animationDelay: '300ms' }} />
            <span className="w-0.5 bg-[#D4AF37] rounded-full animate-bounce h-2.5" style={{ animationDelay: '450ms' }} />
          </div>
        )}
      </button>
    </div>
  );
};
