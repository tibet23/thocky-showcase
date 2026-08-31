'use client';

import React, { useState } from 'react';
import { Sliders, Download } from 'lucide-react';
import { SwitchId } from '@/lib/sound-engine';

interface DetailedSwitch {
  id: SwitchId;
  name: string;
  category: 'Linear' | 'Tactile' | 'Clicky' | 'Artisan Pop';
  thockScore: number;
  clackScore: number;
  soundDescription: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
}

const SWITCH_DETAILS: DetailedSwitch[] = [
  {
    id: 'creamy-linear',
    name: 'Creamy Linear',
    category: 'Linear',
    thockScore: 96,
    clackScore: 22,
    soundDescription: 'Ultra-buttery, deep, and quiet acoustic profile. Muffled low-frequency sound signature with smooth velvety feel.',
    accentColor: '#F59E0B',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeBorder: 'rgba(245, 158, 11, 0.30)',
  },
  {
    id: 'marbly-poppy',
    name: 'Marbly Poppy',
    category: 'Linear',
    thockScore: 84,
    clackScore: 68,
    soundDescription: 'Bright, bouncy, marble-on-glass cadence with energetic resonant pop on every keystroke.',
    accentColor: '#F43F5E',
    badgeBg: 'rgba(244, 63, 94, 0.15)',
    badgeBorder: 'rgba(244, 63, 94, 0.30)',
  },
  {
    id: 'crisp-clack',
    name: 'Crisp Clack',
    category: 'Tactile',
    thockScore: 65,
    clackScore: 92,
    soundDescription: 'Authoritative, sharp high-mid acoustic crack with instant tactile feedback. Ideal for fast touch typists.',
    accentColor: '#64748B',
    badgeBg: 'rgba(100, 116, 139, 0.15)',
    badgeBorder: 'rgba(100, 116, 139, 0.30)',
  },
  {
    id: 'deep-thock',
    name: 'Deep Thock',
    category: 'Tactile',
    thockScore: 99,
    clackScore: 15,
    soundDescription: 'The definitive mechanical keyboard sound. Hollow, reverberant, low-frequency bottom-out thump with a subdued upstroke.',
    accentColor: '#8B5CF6',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    badgeBorder: 'rgba(139, 92, 246, 0.30)',
  },
  {
    id: 'buckling-spring',
    name: 'Buckling Spring',
    category: 'Clicky',
    thockScore: 52,
    clackScore: 98,
    soundDescription: 'Iconic mechanical click and spring resonance of legendary classic keyboards with distinct double-ping snap.',
    accentColor: '#10B981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: 'rgba(16, 185, 129, 0.30)',
  },
  {
    id: 'glass-ceramic',
    name: 'Glass & Ceramic Pop',
    category: 'Artisan Pop',
    thockScore: 78,
    clackScore: 88,
    soundDescription: 'Distinct crystalline ping and solid porcelain weight on every bottom-out. Crisp, refined, and entirely unique.',
    accentColor: '#06B6D4',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    badgeBorder: 'rgba(6, 182, 212, 0.30)',
  },
];

interface SwitchMatrixSectionProps {
  onOpenDownloadModal: () => void;
}

export function SwitchMatrixSection({ onOpenDownloadModal }: SwitchMatrixSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Linear', 'Tactile', 'Clicky', 'Artisan Pop'];

  const filteredSwitches =
    selectedCategory === 'All'
      ? SWITCH_DETAILS
      : SWITCH_DETAILS.filter((s) => s.category === selectedCategory);

  return (
    <section id="switches" className="py-24 bg-[#0D0B12] relative border-t border-[#C4B5FD]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181326] border border-[#C4B5FD]/20 text-xs font-syne-mono text-[#C4B5FD] uppercase tracking-wider mb-3">
              <Sliders className="w-3.5 h-3.5 text-[#D946EF]" /> Acoustic Matrix
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-[#F0ECF8]">
              6 Acoustic Profiles
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8B7FA8] max-w-2xl">
              Compare frequency resonance, bottom-out response, and acoustic character across Thocky&apos;s 6 curated switch profiles. Download the Windows app to experience them live.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-[#13101C] p-1.5 rounded-2xl border border-[#C4B5FD]/15">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-syne font-bold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white shadow-lg'
                    : 'text-[#8B7FA8] hover:text-[#F0ECF8] hover:bg-[#1E1730]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Switch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSwitches.map((item) => (
            <div
              key={item.id}
              className="gradient-border-card gradient-border-glow p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-mono-code px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5"
                    style={{
                      backgroundColor: item.badgeBg,
                      borderColor: item.badgeBorder,
                      borderWidth: '1px',
                      color: item.accentColor,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: item.accentColor }}
                    />
                    {item.category}
                  </span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.accentColor }}
                  />
                </div>

                {/* Switch Name */}
                <h3 className="font-syne font-bold text-xl text-[#F0ECF8] mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-[#8B7FA8] leading-relaxed mb-5">
                  {item.soundDescription}
                </p>

                {/* Visual Thock vs Clack Radar Bar */}
                <div className="space-y-3 p-3.5 rounded-xl bg-[#0D0B12] border border-[#C4B5FD]/10">
                  <div>
                    <div className="flex justify-between text-[11px] font-mono-code mb-1">
                      <span className="text-[#C4B5FD]">Thock Depth Rating</span>
                      <span className="text-[#D946EF] font-bold">{item.thockScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#181326] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#7C3AED] to-[#D946EF] rounded-full transition-all duration-500"
                        style={{ width: `${item.thockScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] font-mono-code mb-1">
                      <span className="text-[#C9A96E]">Clack Crispness</span>
                      <span className="text-[#C9A96E] font-bold">{item.clackScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#181326] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#C9A96E] to-[#F59E0B] rounded-full transition-all duration-500"
                        style={{ width: `${item.clackScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Single Large CTA Button at the bottom */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenDownloadModal}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#D946EF] to-[#C9A96E] text-white font-syne font-bold text-sm sm:text-base uppercase tracking-wider shadow-[0_0_40px_rgba(217,70,239,0.35)] hover:shadow-[0_0_60px_rgba(217,70,239,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>Try in Windows App</span>
          </button>
        </div>
      </div>
    </section>
  );
}

