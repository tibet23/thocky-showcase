'use client';

import React from 'react';

export function MarqueeStrip() {
  const items = [
    'Procedural Web Audio DSP Engine',
    'Maximus Labs Certified',
    'Creamy Linear',
    'Marbly Poppy',
    'Crisp Clack',
    'Deep Thock',
    'Buckling Spring',
    'Glass & Ceramic Pop',
    'Zero Audio Samples (No Phasing Lag)',
    '1-Day Full Access Free Trial',
    '$3.99 / Year Microsoft Store Pass',
    '100% Privacy & Zero Keystroke Logging',
    'Stereo Spatial Keyboard Panning',
    'Spacebar Stabilizer Thock Booster',
    'Krytox 205g0 Lube Smoothness Tuning',
    'Universal Windows System Tray Daemon',
    'Ultra-Low < 1% CPU Footprint',
  ];

  return (
    <div className="w-full bg-[#13101C]/80 border-y border-[#C4B5FD]/10 py-3.5 overflow-hidden backdrop-blur-md relative z-20">
      <div className="animate-marquee flex items-center gap-8 text-xs font-mono-code uppercase tracking-wider text-[#C4B5FD]/80">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0 hover:text-white transition-colors cursor-default">
            <span>{item}</span>
            <span className="text-[#D946EF] text-sm">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
}

