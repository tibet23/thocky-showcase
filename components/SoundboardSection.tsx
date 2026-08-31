'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Volume2,
  Sliders,
  Sparkles,
  Layers,
  Activity,
  RotateCcw,
  Zap,
  CheckCircle,
  Trophy,
  Gauge,
  Music,
  Waves,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  getSoundEngine,
  SWITCH_PROFILES,
  SwitchId,
  PlateType,
} from '@/lib/sound-engine';

interface KeyDef {
  id: string;
  label: string;
  subLabel?: string;
  width?: string;
  isSpace?: boolean;
  isEnter?: boolean;
  code: string;
}

const KEYBOARD_ROWS: KeyDef[][] = [
  // Row 1: Numbers
  [
    { id: 'Backquote', label: '~', subLabel: '`', code: 'Backquote' },
    { id: 'Digit1', label: '!', subLabel: '1', code: 'Digit1' },
    { id: 'Digit2', label: '@', subLabel: '2', code: 'Digit2' },
    { id: 'Digit3', label: '#', subLabel: '3', code: 'Digit3' },
    { id: 'Digit4', label: '$', subLabel: '4', code: 'Digit4' },
    { id: 'Digit5', label: '%', subLabel: '5', code: 'Digit5' },
    { id: 'Digit6', label: '^', subLabel: '6', code: 'Digit6' },
    { id: 'Digit7', label: '&', subLabel: '7', code: 'Digit7' },
    { id: 'Digit8', label: '*', subLabel: '8', code: 'Digit8' },
    { id: 'Digit9', label: '(', subLabel: '9', code: 'Digit9' },
    { id: 'Digit0', label: ')', subLabel: '0', code: 'Digit0' },
    { id: 'Minus', label: '_', subLabel: '-', code: 'Minus' },
    { id: 'Equal', label: '+', subLabel: '=', code: 'Equal' },
    { id: 'Backspace', label: 'BACKSPACE', width: 'w-16 sm:w-20', code: 'Backspace' },
    { id: 'Delete', label: 'DEL', code: 'Delete' },
  ],
  // Row 2: QWERTY
  [
    { id: 'Tab', label: 'TAB', width: 'w-14 sm:w-16', code: 'Tab' },
    { id: 'KeyQ', label: 'Q', code: 'KeyQ' },
    { id: 'KeyW', label: 'W', code: 'KeyW' },
    { id: 'KeyE', label: 'E', code: 'KeyE' },
    { id: 'KeyR', label: 'R', code: 'KeyR' },
    { id: 'KeyT', label: 'T', code: 'KeyT' },
    { id: 'KeyY', label: 'Y', code: 'KeyY' },
    { id: 'KeyU', label: 'U', code: 'KeyU' },
    { id: 'KeyI', label: 'I', code: 'KeyI' },
    { id: 'KeyO', label: 'O', code: 'KeyO' },
    { id: 'KeyP', label: 'P', code: 'KeyP' },
    { id: 'BracketLeft', label: '{', subLabel: '[', code: 'BracketLeft' },
    { id: 'BracketRight', label: '}', subLabel: ']', code: 'BracketRight' },
    { id: 'Backslash', label: '|', subLabel: '\\', width: 'w-12 sm:w-14', code: 'Backslash' },
    { id: 'PageUp', label: 'PGUP', code: 'PageUp' },
  ],
  // Row 3: ASDF
  [
    { id: 'CapsLock', label: 'CAPS', width: 'w-16 sm:w-20', code: 'CapsLock' },
    { id: 'KeyA', label: 'A', code: 'KeyA' },
    { id: 'KeyS', label: 'S', code: 'KeyS' },
    { id: 'KeyD', label: 'D', code: 'KeyD' },
    { id: 'KeyF', label: 'F', code: 'KeyF' },
    { id: 'KeyG', label: 'G', code: 'KeyG' },
    { id: 'KeyH', label: 'H', code: 'KeyH' },
    { id: 'KeyJ', label: 'J', code: 'KeyJ' },
    { id: 'KeyK', label: 'K', code: 'KeyK' },
    { id: 'KeyL', label: 'L', code: 'KeyL' },
    { id: 'Semicolon', label: ':', subLabel: ';', code: 'Semicolon' },
    { id: 'Quote', label: '"', subLabel: "'", code: 'Quote' },
    { id: 'Enter', label: 'ENTER', width: 'w-16 sm:w-22', isEnter: true, code: 'Enter' },
    { id: 'PageDown', label: 'PGDN', code: 'PageDown' },
  ],
  // Row 4: ZXCV
  [
    { id: 'ShiftLeft', label: 'SHIFT', width: 'w-20 sm:w-24', code: 'ShiftLeft' },
    { id: 'KeyZ', label: 'Z', code: 'KeyZ' },
    { id: 'KeyX', label: 'X', code: 'KeyX' },
    { id: 'KeyC', label: 'C', code: 'KeyC' },
    { id: 'KeyV', label: 'V', code: 'KeyV' },
    { id: 'KeyB', label: 'B', code: 'KeyB' },
    { id: 'KeyN', label: 'N', code: 'KeyN' },
    { id: 'KeyM', label: 'M', code: 'KeyM' },
    { id: 'Comma', label: '<', subLabel: ',', code: 'Comma' },
    { id: 'Period', label: '>', subLabel: '.', code: 'Period' },
    { id: 'Slash', label: '?', subLabel: '/', code: 'Slash' },
    { id: 'ShiftRight', label: 'SHIFT', width: 'w-16 sm:w-20', code: 'ShiftRight' },
    { id: 'ArrowUp', label: '▲', code: 'ArrowUp' },
    { id: 'End', label: 'END', code: 'End' },
  ],
  // Row 5: Spacebar & Modifiers
  [
    { id: 'ControlLeft', label: 'CTRL', width: 'w-12 sm:w-14', code: 'ControlLeft' },
    { id: 'MetaLeft', label: 'WIN', width: 'w-10 sm:w-12', code: 'MetaLeft' },
    { id: 'AltLeft', label: 'ALT', width: 'w-10 sm:w-12', code: 'AltLeft' },
    { id: 'Space', label: '— THOCKY ACOUSTIC DSP SYNTHESIS —', width: 'grow min-w-[140px] sm:min-w-[260px]', isSpace: true, code: 'Space' },
    { id: 'AltRight', label: 'ALT', width: 'w-10 sm:w-12', code: 'AltRight' },
    { id: 'Fn', label: 'FN', width: 'w-10 sm:w-12', code: 'Fn' },
    { id: 'ControlRight', label: 'CTRL', width: 'w-10 sm:w-12', code: 'ControlRight' },
    { id: 'ArrowLeft', label: '◀', code: 'ArrowLeft' },
    { id: 'ArrowDown', label: '▼', code: 'ArrowDown' },
    { id: 'ArrowRight', label: '▶', code: 'ArrowRight' },
  ],
];

type KeycapTheme = 'midnight' | 'botanical' | 'cyberpunk' | 'retro-gold';

export function SoundboardSection() {
  const [activeSwitch, setActiveSwitch] = useState<SwitchId>('creamy-linear');
  const [activePlate, setActivePlate] = useState<PlateType>('fr4');
  const [lubeLevel, setLubeLevel] = useState(0.8);
  const [stabilizerBoost, setStabilizerBoost] = useState(1.4);
  const [roomReverb, setRoomReverb] = useState(0.25);
  const [volume, setVolume] = useState(0.85);
  const [pitch, setPitch] = useState(1.0);
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [keycapTheme, setKeycapTheme] = useState<KeycapTheme>('midnight');

  // Typing practice prompt state
  const testPhrase = 'the quick brown fox thocks with zero latency on windows';
  const [typedInput, setTypedInput] = useState('');
  const [typingStartTime, setTypingStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [testComplete, setTestComplete] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize engine settings
  useEffect(() => {
    const engine = getSoundEngine();
    engine.setSwitch(activeSwitch);
    engine.setPlate(activePlate);
    engine.setLubeLevel(lubeLevel);
    engine.setStabilizerBoost(stabilizerBoost);
    engine.setRoomReverb(roomReverb);
    engine.setVolume(volume);
    engine.setPitch(pitch);
  }, [activeSwitch, activePlate, lubeLevel, stabilizerBoost, roomReverb, volume, pitch]);

  // Handle global keyboard listeners for authentic typing anywhere
  const triggerKeyAction = useCallback((code: string, isDown: boolean) => {
    const engine = getSoundEngine();
    const isSpace = code === 'Space';
    const isEnter = code === 'Enter';

    if (isDown) {
      engine.playKey(code, isSpace, isEnter);
      setPressedKeys((prev) => new Set(prev).add(code));
      setTotalKeystrokes((prev) => prev + 1);
    } else {
      engine.playRelease(code);
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(code);
        return next;
      });
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack if user is typing in a form outside or alt-tabbing
      if (e.repeat) {
        triggerKeyAction(e.code, true);
        return;
      }
      triggerKeyAction(e.code, true);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      triggerKeyAction(e.code, false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerKeyAction]);

  // Live Canvas Audio Visualizer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;
      const engine = getSoundEngine();
      const analyser = engine.getAnalyser();

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (analyser) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        // Draw spectrum bars
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = (dataArray[i] / 255) * canvas.height * 0.85;

          const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
          gradient.addColorStop(0, '#7C3AED');
          gradient.addColorStop(0.5, '#D946EF');
          gradient.addColorStop(1, '#C9A96E');

          ctx.fillStyle = gradient;
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 1.5, barHeight);

          x += barWidth;
        }
      } else {
        // Idle ambient line
        ctx.strokeStyle = 'rgba(196, 181, 253, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle typing test input
  const handleTypingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypedInput(val);

    if (!typingStartTime && val.length > 0) {
      setTypingStartTime(Date.now());
    }

    if (typingStartTime && val.length > 0) {
      const elapsedMinutes = (Date.now() - typingStartTime) / 60000;
      const wordsTyped = val.length / 5;
      const currentWpm = Math.round(wordsTyped / Math.max(0.01, elapsedMinutes));
      setWpm(currentWpm);
    }

    if (val === testPhrase && !testComplete) {
      setTestComplete(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C3AED', '#D946EF', '#C9A96E', '#C4B5FD'],
      });
      getSoundEngine().playKey('Enter', false, true);
    }
  };

  const resetTypingTest = () => {
    setTypedInput('');
    setTypingStartTime(null);
    setWpm(0);
    setTestComplete(false);
  };

  // Keycap theme styles
  const getKeycapStyles = (code: string) => {
    const isPressed = pressedKeys.has(code);

    let baseBg = 'bg-[#181326] text-[#F0ECF8] border-[#C4B5FD]/15';
    let activeBg = 'bg-gradient-to-b from-[#7C3AED] to-[#D946EF] text-white border-[#D946EF]';

    if (keycapTheme === 'botanical') {
      baseBg = 'bg-[#13201C] text-[#E2F5EE] border-[#34D399]/20';
      activeBg = 'bg-gradient-to-b from-[#059669] to-[#10B981] text-white border-[#34D399]';
    } else if (keycapTheme === 'cyberpunk') {
      baseBg = 'bg-[#191024] text-[#FDF2F8] border-[#D946EF]/25';
      activeBg = 'bg-gradient-to-b from-[#D946EF] to-[#06B6D4] text-white border-[#F43F5E]';
    } else if (keycapTheme === 'retro-gold') {
      baseBg = 'bg-[#1E1A16] text-[#FDF8EE] border-[#C9A96E]/20';
      activeBg = 'bg-gradient-to-b from-[#C9A96E] to-[#B45309] text-white border-[#FBBF24]';
    }

    return isPressed ? `${activeBg} active-pressed shadow-[0_0_20px_rgba(217,70,239,0.7)]` : baseBg;
  };

  const selectedProfile = SWITCH_PROFILES[activeSwitch];

  return (
    <section id="soundboard" className="py-24 relative bg-[#0D0B12] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#7C3AED]/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181326] border border-[#7C3AED]/30 text-xs font-syne-mono text-[#D946EF] uppercase tracking-wider mb-4">
            <Activity className="w-3.5 h-3.5" /> Interactive Acoustic Lab
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-[#F0ECF8] tracking-tight">
            Live 65% Procedural Mechanical Soundboard
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8B7FA8]">
            Synthesized exclusively with the Web Audio API without pre-recorded MP3 lag. Test the 6 flagship acoustic profiles, adjust Krytox lube dampening, tune stabilizer resonance, and type in real time.
          </p>
        </div>

        {/* Studio Control Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Switch Selector Pills */}
          <div className="lg:col-span-7 p-5 rounded-2xl bg-[#13101C] border border-[#C4B5FD]/15 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#D946EF]" />
                <span className="text-xs font-syne font-bold uppercase tracking-wider text-[#F0ECF8]">
                  6 Flagship Acoustic Profiles
                </span>
              </div>
              <span className="text-xs font-mono-code text-[#C9A96E] bg-[#1F1932] px-2.5 py-0.5 rounded-full border border-[#C9A96E]/20">
                {selectedProfile.category} • {selectedProfile.baseFreq}Hz • {selectedProfile.thockScore}% Thock
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(SWITCH_PROFILES) as SwitchId[]).map((id) => {
                const sw = SWITCH_PROFILES[id];
                const isSelected = activeSwitch === id;

                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveSwitch(id);
                      getSoundEngine().setSwitch(id);
                      getSoundEngine().playKey('Space', true, false);
                    }}
                    className={`p-3 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#1E182E]'
                        : 'bg-[#181326] border-[#C4B5FD]/10 hover:border-[#7C3AED]/40 hover:bg-[#1E1730]'
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: sw.color,
                            boxShadow: `0 0 22px ${sw.color}35`,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-syne font-bold text-xs text-[#F0ECF8]">
                        {sw.name}
                      </span>
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: sw.color }}
                      />
                    </div>
                    <div className="text-[10px] text-[#C4B5FD] font-mono-code mb-1">{sw.realEquivalent}</div>
                    <div className="text-[10px] text-[#8B7FA8] line-clamp-2 leading-relaxed">{sw.description}</div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#C4B5FD]/10 text-[10px] font-mono-code">
                      <span style={{ color: sw.color }}>{sw.category}</span>
                      <span className="text-[#C9A96E] font-semibold">{sw.thockScore}% Thock Score</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DSP Acoustic Tuning Controls */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-[#13101C] border border-[#C4B5FD]/15 shadow-xl flex flex-col justify-between space-y-4">
            {/* Plate Material */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-[#C9A96E]" />
                  <span className="text-xs font-syne font-bold uppercase tracking-wider text-[#F0ECF8]">
                    Mounting Plate Acoustic
                  </span>
                </div>
                <span className="text-[10px] font-mono-code text-[#C4B5FD] uppercase">{activePlate}</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5 bg-[#181326] p-1.5 rounded-xl border border-[#C4B5FD]/10">
                {(['fr4', 'brass', 'aluminum', 'pom', 'polycarb'] as PlateType[]).map((plate) => (
                  <button
                    key={plate}
                    onClick={() => {
                      setActivePlate(plate);
                      getSoundEngine().playKey('Enter', false, true);
                    }}
                    className={`py-1.5 text-[10px] font-syne font-bold uppercase rounded-lg transition-all cursor-pointer ${
                      activePlate === plate
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white shadow-md'
                        : 'text-[#8B7FA8] hover:text-[#F0ECF8] hover:bg-[#221B35]'
                    }`}
                  >
                    {plate}
                  </button>
                ))}
              </div>
            </div>

            {/* DSP Sliders: Lube, Stabilizer, Reverb, Volume */}
            <div className="space-y-3 pt-2 border-t border-[#C4B5FD]/10">
              {/* Lube Level */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-[#8B7FA8] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#D946EF]" /> Krytox 205g0 Lube Smoothness
                  </span>
                  <span className="text-[#C4B5FD]">{Math.round(lubeLevel * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={lubeLevel}
                  onChange={(e) => setLubeLevel(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#181326] rounded-lg appearance-none cursor-pointer accent-[#D946EF]"
                />
              </div>

              {/* Stabilizer Boost */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-[#8B7FA8] flex items-center gap-1.5">
                    <Waves className="w-3.5 h-3.5 text-[#C9A96E]" /> Stabilizer Thock Booster
                  </span>
                  <span className="text-[#C4B5FD]">{stabilizerBoost.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="2.0"
                  step="0.1"
                  value={stabilizerBoost}
                  onChange={(e) => setStabilizerBoost(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#181326] rounded-lg appearance-none cursor-pointer accent-[#C9A96E]"
                />
              </div>

              {/* Room Reverb */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-[#8B7FA8] flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-[#7C3AED]" /> Case Acoustic Resonance
                  </span>
                  <span className="text-[#C4B5FD]">{Math.round(roomReverb * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="0.8"
                  step="0.05"
                  value={roomReverb}
                  onChange={(e) => setRoomReverb(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#181326] rounded-lg appearance-none cursor-pointer accent-[#7C3AED]"
                />
              </div>

              {/* Master Volume */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-[#8B7FA8] flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-[#D946EF]" /> Master Synthesizer Output
                  </span>
                  <span className="text-[#C4B5FD]">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-[#181326] rounded-lg appearance-none cursor-pointer accent-[#D946EF]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mechanical Keyboard Visualizer Stage */}
        <div className="p-4 sm:p-7 rounded-3xl bg-gradient-to-b from-[#181326] to-[#100C1B] border border-[#C4B5FD]/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative">
          {/* Top Bar inside Keyboard Case */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#C4B5FD]/10">
            {/* Realtime Spectrum Canvas */}
            <div className="flex items-center gap-3">
              <div className="w-36 sm:w-48 h-10 bg-[#0D0B12] rounded-xl border border-[#C4B5FD]/15 overflow-hidden flex items-center justify-center p-1 shadow-inner">
                <canvas ref={canvasRef} width={200} height={40} className="w-full h-full" />
              </div>
              <div className="text-[11px] font-mono-code text-[#8B7FA8]">
                <div className="text-[#F0ECF8] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-ping" />
                  Zero Sample Lag
                </div>
                <div>Procedural Web Audio DSP</div>
              </div>
            </div>

            {/* Keycap Color Theme Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-syne font-bold uppercase tracking-wider text-[#8B7FA8]">
                Keycaps:
              </span>
              <div className="flex items-center gap-1.5 bg-[#0D0B12] p-1 rounded-xl border border-[#C4B5FD]/10">
                <button
                  onClick={() => setKeycapTheme('midnight')}
                  className={`px-2.5 py-1 text-[10px] font-syne font-semibold rounded-lg cursor-pointer ${
                    keycapTheme === 'midnight'
                      ? 'bg-[#7C3AED] text-white shadow'
                      : 'text-[#8B7FA8] hover:text-[#F0ECF8]'
                  }`}
                >
                  Midnight
                </button>
                <button
                  onClick={() => setKeycapTheme('botanical')}
                  className={`px-2.5 py-1 text-[10px] font-syne font-semibold rounded-lg cursor-pointer ${
                    keycapTheme === 'botanical'
                      ? 'bg-[#059669] text-white shadow'
                      : 'text-[#8B7FA8] hover:text-[#F0ECF8]'
                  }`}
                >
                  Botanical
                </button>
                <button
                  onClick={() => setKeycapTheme('cyberpunk')}
                  className={`px-2.5 py-1 text-[10px] font-syne font-semibold rounded-lg cursor-pointer ${
                    keycapTheme === 'cyberpunk'
                      ? 'bg-[#D946EF] text-white shadow'
                      : 'text-[#8B7FA8] hover:text-[#F0ECF8]'
                  }`}
                >
                  Cyberpunk
                </button>
                <button
                  onClick={() => setKeycapTheme('retro-gold')}
                  className={`px-2.5 py-1 text-[10px] font-syne font-semibold rounded-lg cursor-pointer ${
                    keycapTheme === 'retro-gold'
                      ? 'bg-[#C9A96E] text-[#0D0B12] font-bold shadow'
                      : 'text-[#8B7FA8] hover:text-[#F0ECF8]'
                  }`}
                >
                  Retro Gold
                </button>
              </div>
            </div>

            {/* Keystroke counter badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0D0B12] border border-[#C4B5FD]/15 text-xs font-mono-code text-[#C4B5FD]">
              <Zap className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>{totalKeystrokes} Keystrokes Synthesized</span>
            </div>
          </div>

          {/* Interactive Keyboard Layout */}
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[700px] space-y-2 p-2 rounded-2xl bg-[#0E0B16] border border-[#C4B5FD]/10 shadow-inner">
              {KEYBOARD_ROWS.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-1.5 justify-between">
                  {row.map((key) => {
                    const customStyle = getKeycapStyles(key.code);
                    const widthClass = key.width || 'w-10 sm:w-12';

                    return (
                      <button
                        key={key.id}
                        onMouseDown={() => triggerKeyAction(key.code, true)}
                        onMouseUp={() => triggerKeyAction(key.code, false)}
                        onTouchStart={() => triggerKeyAction(key.code, true)}
                        onTouchEnd={() => triggerKeyAction(key.code, false)}
                        className={`keycap-3d h-11 sm:h-12 ${widthClass} rounded-lg border font-mono-code flex flex-col items-center justify-center p-1 cursor-pointer select-none text-[11px] font-bold transition-all ${customStyle}`}
                      >
                        {key.subLabel && (
                          <span className="text-[9px] opacity-60 leading-none">{key.label}</span>
                        )}
                        <span className="leading-tight">{key.subLabel || key.label}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Speed Typing Practice Bar */}
          <div className="mt-6 pt-5 border-t border-[#C4B5FD]/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#C9A96E]" />
                <span className="text-xs font-syne font-bold uppercase tracking-wider text-[#F0ECF8]">
                  Live Acoustic Speed & Cadence Test
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono-code">
                <span className="text-[#8B7FA8]">
                  Speed: <strong className="text-[#D946EF] font-bold text-sm">{wpm} WPM</strong>
                </span>
                <button
                  onClick={resetTypingTest}
                  className="flex items-center gap-1 text-[#C4B5FD] hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>

            {/* Target sentence display */}
            <div className="p-3.5 rounded-xl bg-[#0D0B12] border border-[#C4B5FD]/15 font-mono-code text-xs sm:text-sm tracking-wide mb-3 flex flex-wrap gap-1 items-center">
              {testPhrase.split('').map((char, index) => {
                let colorClass = 'text-[#8B7FA8]';
                if (index < typedInput.length) {
                  colorClass = typedInput[index] === char ? 'text-[#34D399] font-bold' : 'text-red-400 bg-red-950/40';
                }
                return (
                  <span key={index} className={colorClass}>
                    {char === ' ' ? '␣' : char}
                  </span>
                );
              })}
            </div>

            {/* Input field */}
            <div className="relative">
              <input
                type="text"
                value={typedInput}
                onChange={handleTypingInputChange}
                placeholder="Click here and type the sentence above to feel the acoustic cadence..."
                className="w-full px-4 py-3 rounded-xl bg-[#13101C] border border-[#C4B5FD]/20 text-[#F0ECF8] placeholder-[#8B7FA8]/60 font-mono-code text-xs sm:text-sm focus:outline-none focus:border-[#D946EF] focus:ring-1 focus:ring-[#D946EF] transition-all"
              />
              {testComplete && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-xs font-syne font-bold text-[#34D399] bg-[#0E281E] px-2.5 py-1 rounded-lg border border-[#34D399]/30">
                  <CheckCircle className="w-3.5 h-3.5" /> Mastered at {wpm} WPM!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

