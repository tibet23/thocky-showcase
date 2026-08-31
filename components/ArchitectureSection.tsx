'use client';

import React from 'react';
import {
  Zap,
  Shield,
  Terminal,
  SlidersHorizontal,
  Keyboard,
  Layers2,
  Sparkles,
} from 'lucide-react';

export function ArchitectureSection() {
  const engineFeatures = [
    {
      icon: <Terminal className="w-6 h-6 text-[#D946EF]" />,
      title: 'Input Capture',
      description:
        'Ultra-fast low-level Windows keyboard hook for instant global keystroke detection across all apps.',
      tag: 'Global Keystroke Detection',
      tagColor: 'text-[#C9A96E]',
    },
    {
      icon: <Zap className="w-6 h-6 text-[#7C3AED]" />,
      title: 'Procedural DSP Synthesis',
      description:
        'Zero-sample procedural DSP audio synthesis for instant, click-to-sound tactile feedback.',
      tag: 'Zero-Sample Synthesis',
      tagColor: 'text-[#D946EF]',
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: 'Anti-Cheat Safe',
      description:
        'Non-invasive, read-only event listener with zero game memory modification or DLL injection.',
      tag: 'Zero DLL Injection',
      tagColor: 'text-emerald-400',
    },
  ];

  const enthusiastFeatures = [
    {
      icon: <SlidersHorizontal className="w-6 h-6 text-[#C9A96E]" />,
      title: 'Stabilizer & Lube Modding',
      description:
        'Software-level stabilizer tuning and acoustic dampening modding to eliminate rattle and deliver deep, dense acoustic thuds.',
      tag: 'DSP Modding Engine',
      tagColor: 'text-[#C9A96E]',
    },
    {
      icon: <Keyboard className="w-6 h-6 text-[#38BDF8]" />,
      title: 'Dual-Phase Up/Downstroke',
      description:
        'Physical dual-phase synthesis computes independent mechanical sound vectors for the downstroke bottom-out and rapid spring upstroke return.',
      tag: 'Dual-Phase Physics',
      tagColor: 'text-[#38BDF8]',
    },
    {
      icon: <Layers2 className="w-6 h-6 text-rose-400" />,
      title: 'System Tray Background Run',
      description:
        'Runs silently and unobtrusively in your Windows system tray at near-zero CPU overhead while you type, code, or game.',
      tag: 'Background Daemon',
      tagColor: 'text-rose-400',
    },
  ];

  return (
    <section id="engine" className="py-24 bg-[#0A080F] relative border-t border-[#C4B5FD]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header 1: Sub-Millisecond Acoustic Engine */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181326] border border-[#7C3AED]/30 text-xs font-syne-mono text-[#D946EF] uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" /> High-Performance Windows Engine
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-[#F0ECF8]">
            Sub-Millisecond Acoustic Engine
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8B7FA8]">
            Combining low-level Windows keyboard detection with real-time procedural DSP synthesis and physical switch acoustics.
          </p>
        </div>

        {/* 3 Engine Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {engineFeatures.map((item, idx) => (
            <div key={idx} className="gradient-border-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1A1429] border border-[#7C3AED]/30 flex items-center justify-center mb-4 group-hover:border-[#D946EF]/50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-syne font-bold text-base text-[#F0ECF8] mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8B7FA8] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t border-[#C4B5FD]/10 text-[11px] font-mono-code ${item.tagColor}`}>
                ⚡ {item.tag}
              </div>
            </div>
          ))}
        </div>

        {/* Header 2: Crafted for Keyboard Enthusiasts */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181326] border border-[#7C3AED]/30 text-xs font-syne-mono text-[#D946EF] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Enthusiast Features
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-[#F0ECF8]">
            Crafted for Keyboard Enthusiasts
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8B7FA8]">
            Built with physical switch dynamics, acoustic stabilizer modding, and background convenience in mind.
          </p>
        </div>

        {/* 3 Enthusiast Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {enthusiastFeatures.map((item, idx) => (
            <div key={idx} className="gradient-border-card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1A1429] border border-[#7C3AED]/30 flex items-center justify-center mb-4 group-hover:border-[#D946EF]/50 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-syne font-bold text-base text-[#F0ECF8] mb-2 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#8B7FA8] leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className={`mt-4 pt-3 border-t border-[#C4B5FD]/10 text-[11px] font-mono-code ${item.tagColor}`}>
                ⚡ {item.tag}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

