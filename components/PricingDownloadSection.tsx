'use client';

import React from 'react';
import {
  Download,
  Laptop,
  Check,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  Lock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PricingDownloadSectionProps {
  onOpenDownloadModal: (tier?: string) => void;
}

export function PricingDownloadSection({ onOpenDownloadModal }: PricingDownloadSectionProps) {
  const handleDownloadClick = (tierName: string) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#7C3AED', '#D946EF', '#C9A96E'],
    });
    onOpenDownloadModal(tierName);
  };

  return (
    <section id="pricing" className="py-24 bg-[#0D0B12] relative border-t border-[#C4B5FD]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181326] border border-[#7C3AED]/30 text-xs font-syne-mono text-[#D946EF] uppercase tracking-wider mb-3">
            <Laptop className="w-3.5 h-3.5" /> Exclusively on the Microsoft Store
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl md:text-5xl text-[#F0ECF8]">
            Simple, Honest Pricing.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#8B7FA8]">
            Start typing with a 1-day full access free trial on the Microsoft Store. Unlock unlimited procedural mechanical keyboard synthesis for just $3.99/year.
          </p>
        </div>

        {/* Pricing & Download Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* 1-Day Full Access Free Trial Card */}
          <div className="gradient-border-card p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-syne-mono px-3 py-1 rounded-full bg-[#1F1932] text-[#C4B5FD] border border-[#C4B5FD]/20">
                  FREE TRIAL
                </span>
                <span className="text-xs font-mono-code text-[#34D399] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 24-Hour Full Access
                </span>
              </div>

              <h3 className="font-syne font-bold text-2xl text-[#F0ECF8] mb-1">
                1-Day Free Trial
              </h3>
              <p className="text-xs text-[#8B7FA8] mb-6">
                Experience all 6 acoustic profiles, DSP synthesis sliders, and zero-latency audio on Windows with no upfront payment.
              </p>

              <div className="text-3xl font-syne font-extrabold text-[#F0ECF8] mb-6">
                $0 <span className="text-xs font-normal text-[#8B7FA8]">/ 24 hours full evaluation</span>
              </div>

              <ul className="space-y-3.5 text-xs font-mono-code text-[#8B7FA8] mb-8">
                <li className="flex items-start gap-2.5 text-[#F0ECF8]">
                  <Check className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#F0ECF8]">All 6 Switch Profiles & DSP Controls Unlocked</strong> — Complete access to Creamy Linear, Marbly Poppy, Deep Thock, Buckling Spring, and all acoustic tuning sliders.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-[#F0ECF8]">
                  <Check className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#F0ECF8]">Zero-Commitment Instant Test</strong> — Experience instant real-time keyboard synthesis across your daily apps with no credit card required upfront.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-[#F0ECF8]">
                  <Check className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#F0ECF8]">100% Private & Local Execution</strong> — Runs entirely on your machine with zero keystroke logging, cloud telemetry, or data collection.
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleDownloadClick('1-Day Free Trial')}
              className="w-full py-3.5 rounded-xl bg-[#181326] border border-[#C4B5FD]/20 text-[#F0ECF8] font-syne font-bold text-xs uppercase tracking-wider hover:bg-[#201833] hover:border-[#7C3AED] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#C4B5FD]" /> Start 1-Day Free Trial on MS Store
            </button>
          </div>

          {/* Annual Full Subscription (Featured) */}
          <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#1E1433] to-[#120E1E] border-2 border-[#D946EF] shadow-[0_0_50px_rgba(217,70,239,0.25)] flex flex-col justify-between">
            {/* Featured top badge */}
            <div className="absolute -top-3.5 right-6 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#D946EF] to-[#C9A96E] text-white text-[10px] font-syne font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> OFFICIAL FULL LICENSE
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-syne-mono px-3 py-1 rounded-full bg-[#35194D] text-[#D946EF] border border-[#D946EF]/40 font-bold">
                  THOCKY ANNUAL PASS
                </span>
                <span className="text-xs font-mono-code text-[#C9A96E]">Microsoft Store Verified</span>
              </div>

              <h3 className="font-syne font-bold text-2xl text-[#F0ECF8] mb-1">
                Full Annual Access
              </h3>
              <p className="text-xs text-[#C4B5FD]/80 mb-6">
                Unlimited continuous access to all acoustic synthesis updates, new profile releases, and priority Windows Store updates.
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-syne font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F0ECF8] via-[#D946EF] to-[#C9A96E]">
                  $3.99
                </span>
                <span className="text-xs font-mono-code text-[#8B7FA8]">/ year (only ~$0.33 / month)</span>
              </div>

              <ul className="space-y-3.5 text-xs font-mono-code text-[#F0ECF8] mb-8">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D946EF] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Uninterrupted 365-Day Access</strong> — Permanent, continuous background typing acoustics across Word, VS Code, Discord, Slack, and games.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D946EF] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">All 6 Master Acoustic Engines</strong> — Creamy Linear, Marbly Poppy, Crisp Clack, Deep Thock, Buckling Spring, and Glass Ceramic.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D946EF] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Full Acoustic Customizer Suite</strong> — Fine-tune lube dampening, spacebar stabilizer boost, stereo panning, pitch multiplier, and room reverb.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D946EF] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Independent Dual-Phase Physics</strong> — Realistic keydown bottom-out impact combined with snappy key-release top-out return clacks.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D946EF] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Ultra-Lightweight & Anti-Cheat Safe</strong> — Minimal resource footprint (&lt; 1% CPU) running non-invasively in the Windows system tray.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#D946EF] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Microsoft Store Verified Licensing</strong> — Seamless automatic updates, secure billing, and 1-click license restore across all your Windows PCs.
                  </span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleDownloadClick('Annual Pass $3.99/yr')}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#D946EF] to-[#C9A96E] text-white font-syne font-extrabold text-xs uppercase tracking-wider shadow-[0_0_30px_rgba(217,70,239,0.5)] hover:shadow-[0_0_45px_rgba(217,70,239,0.8)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Laptop className="w-4 h-4" /> Get on Microsoft Store — $3.99 / Year
            </button>
          </div>
        </div>

        {/* Windows Store Exclusivity Guarantee Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-[#13101C] border border-[#C4B5FD]/10 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-[#8B7FA8]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-[#F0ECF8] font-bold">100% Verified Microsoft Store Distribution</div>
              <div>Digitally signed by Maximus Labs, sandboxed for safety, with automatic silent background updates.</div>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181326] text-[#C4B5FD] border border-[#C4B5FD]/15">
              <Laptop className="w-3.5 h-3.5 text-[#D946EF]" /> Windows 10 / 11 64-bit
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

