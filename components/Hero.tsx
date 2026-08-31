'use client';

import React, { useState } from 'react';
import { Download, Sparkles, ShieldCheck, Zap, Laptop, ArrowRight, CheckCircle2, Cpu, Lock, Layers } from 'lucide-react';
import { getSoundEngine, SWITCH_PROFILES, SwitchId } from '@/lib/sound-engine';

interface HeroProps {
  onOpenDownloadModal: () => void;
}

export function Hero({ onOpenDownloadModal }: HeroProps) {
  const [activeQuickSwitch, setActiveQuickSwitch] = useState<SwitchId>('creamy-linear');

  const testSwitches: SwitchId[] = [
    'creamy-linear',
    'marbly-poppy',
    'crisp-clack',
    'deep-thock',
    'buckling-spring',
    'glass-ceramic',
  ];

  const wordmarkLetters = [
    { char: 'T', gradient: 'from-[#7C3AED] to-[#9333EA]' },
    { char: 'H', gradient: 'from-[#9333EA] to-[#C026D3]' },
    { char: 'O', gradient: 'from-[#C026D3] to-[#D946EF]' },
    { char: 'C', gradient: 'from-[#D946EF] to-[#E879F9]' },
    { char: 'K', gradient: 'from-[#E879F9] to-[#EAB308]' },
    { char: 'Y', gradient: 'from-[#EAB308] to-[#C9A96E]' },
  ];

  const handleLetterHover = (char: string) => {
    const engine = getSoundEngine();
    engine.playKey(char, false, false);
  };

  const selectedSwitchData = SWITCH_PROFILES[activeQuickSwitch];

  return (
    <section className="relative min-h-[85vh] pt-32 pb-16 flex flex-col justify-center overflow-hidden bg-mesh-pattern">
      {/* Background Animated Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#7C3AED]/20 via-[#D946EF]/15 to-[#C9A96E]/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D946EF]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Eyebrow badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1A1429]/90 border border-[#C4B5FD]/20 shadow-[0_0_25px_rgba(124,58,237,0.25)] backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D946EF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D946EF]"></span>
            </span>
            <span className="font-syne-mono text-xs text-[#C4B5FD] tracking-wider uppercase font-semibold">
              Maximus Labs • Exclusively on Microsoft Store
            </span>
          </div>
        </div>

        {/* Signature Interactive Wordmark */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center justify-center gap-1 sm:gap-2 select-none group cursor-pointer">
            {wordmarkLetters.map((item, idx) => (
              <span
                key={idx}
                onMouseEnter={() => handleLetterHover(item.char)}
                onClick={() => handleLetterHover(item.char)}
                className={`font-syne font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 inline-block text-transparent bg-clip-text bg-gradient-to-br ${item.gradient} drop-shadow-[0_10px_20px_rgba(124,58,237,0.3)] hover:drop-shadow-[0_15px_30px_rgba(217,70,239,0.8)] cursor-pointer`}
              >
                {item.char}
              </span>
            ))}
          </div>
        </div>

        {/* Main Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mt-2 mb-6">
          <h1 className="font-syne font-bold text-3xl sm:text-5xl md:text-6xl text-[#F0ECF8] tracking-tight leading-[1.15]">
            Turn Any Keyboard Into a <br className="hidden sm:block" />
            <span className="gradient-text-hero">High-End Custom Mechanical Keyboard.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#8B7FA8] max-w-3xl mx-auto font-normal leading-relaxed">
            Zero latency. Zero samples. Pure procedural Web Audio DSP synthesis that brings the creamy, thocky, and clacky acoustics of $399+ custom boards directly to your Windows PC.
          </p>
        </div>

        {/* 6 Acoustic Profiles Preview Bar */}
        <div className="max-w-5xl mx-auto my-8 p-5 sm:p-6 rounded-2xl bg-[#13101C]/90 border border-[#C4B5FD]/15 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b border-[#C4B5FD]/10 gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D946EF]" />
              <span className="text-xs font-syne font-bold uppercase tracking-wider text-[#C4B5FD]">
                6 Acoustic Profiles Included
              </span>
            </div>
            <span className="text-[11px] font-mono-code text-[#8B7FA8]">
              Select a profile below to view acoustic specifications
            </span>
          </div>

          {/* 6 Switch Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {testSwitches.map((id) => {
              const sw = SWITCH_PROFILES[id];
              const isSelected = activeQuickSwitch === id;

              return (
                <button
                  key={id}
                  onClick={() => setActiveQuickSwitch(id)}
                  className={`p-3 rounded-xl text-left transition-all duration-200 relative overflow-hidden border cursor-pointer ${
                    isSelected
                      ? 'bg-[#221838]'
                      : 'bg-[#181326] border-[#C4B5FD]/10 hover:border-[#7C3AED]/40 hover:bg-[#1E1730]'
                  }`}
                  style={
                    isSelected
                      ? {
                          borderColor: sw.color,
                          boxShadow: `0 0 20px ${sw.color}35`,
                        }
                      : undefined
                  }
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: sw.color }}
                    ></span>
                    <span className="text-[9px] font-mono-code px-1.5 py-0.5 rounded bg-black/40 text-[#C4B5FD]">
                      {sw.category}
                    </span>
                  </div>
                  <div className="font-syne font-bold text-xs text-[#F0ECF8] truncate">
                    {sw.name}
                  </div>
                  <div className="text-[10px] text-[#8B7FA8] flex items-center justify-between mt-2 pt-1.5 border-t border-[#C4B5FD]/10">
                    <span>{sw.baseFreq}Hz</span>
                    <span style={{ color: sw.color }} className="font-semibold">{sw.thockScore}% Thock</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Profile Info Banner */}
          {selectedSwitchData && (
            <div className="mt-4 p-3.5 rounded-xl bg-[#0D0B12] border border-[#C4B5FD]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-syne font-bold text-[#F0ECF8]">
                  {selectedSwitchData.name}
                </div>
                <div className="text-[11px] text-[#8B7FA8] font-mono-code">
                  {selectedSwitchData.description}
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={onOpenDownloadModal}
                  className="px-3.5 py-1.5 rounded-lg bg-[#1F1932] hover:bg-[#7C3AED] text-[#C4B5FD] hover:text-white border border-[#C4B5FD]/20 text-[11px] font-syne font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3 h-3" />
                  <span>Try in Windows App</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Primary Call to Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={onOpenDownloadModal}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#D946EF] to-[#C9A96E] text-white font-syne font-bold text-sm tracking-wider uppercase shadow-[0_0_35px_rgba(217,70,239,0.4)] hover:shadow-[0_0_50px_rgba(217,70,239,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Laptop className="w-5 h-5 text-white" />
            <div className="text-left">
              <div className="text-[10px] font-mono-code uppercase opacity-80 leading-none">1-Day Free Trial on</div>
              <div className="text-sm font-syne font-extrabold leading-tight">Microsoft Store</div>
            </div>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {/* Value Proposition Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-[#C4B5FD]/10 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div className="space-y-1">
            <div className="font-syne font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#C4B5FD] to-[#D946EF]">
              0.0 ms
            </div>
            <div className="text-xs font-mono-code text-[#8B7FA8] flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 text-[#C9A96E]" /> Procedural DSP Audio
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-syne font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#D946EF] to-[#C9A96E]">
              &lt; 1% CPU
            </div>
            <div className="text-xs font-mono-code text-[#8B7FA8] flex items-center justify-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-[#7C3AED]" /> Ultra-Low Footprint
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-syne font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#C9A96E] to-[#F0ECF8]">
              100% Private
            </div>
            <div className="text-xs font-mono-code text-[#8B7FA8] flex items-center justify-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> Zero Keystroke Logs
            </div>
          </div>

          <div className="space-y-1">
            <div className="font-syne font-extrabold text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#C4B5FD] to-white">
              $3.99 / yr
            </div>
            <div className="text-xs font-mono-code text-[#8B7FA8] flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#D946EF]" /> ~$0.33 / month
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

