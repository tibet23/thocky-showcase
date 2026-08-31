'use client';

import React from 'react';
import Image from 'next/image';
import { Laptop, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenDownloadModal?: () => void;
}

export function Footer({ onOpenDownloadModal }: FooterProps) {
  return (
    <footer className="bg-[#08060D] border-t border-[#C4B5FD]/10 py-16 text-xs text-[#8B7FA8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#C4B5FD]/10">
          {/* Col 1 & 2: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#D946EF] to-[#C9A96E] p-[1px] overflow-hidden">
                <div className="w-full h-full bg-[#0D0B12] rounded-[11px] flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="/logo.png"
                    alt="Thocky Logo"
                    width={30}
                    height={30}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                </div>
              </div>
              <span className="font-syne font-extrabold text-xl tracking-tight text-[#F0ECF8]">
                THOCKY
              </span>
              <span className="text-[10px] font-syne-mono px-2 py-0.5 rounded-full bg-[#181326] text-[#C4B5FD] border border-[#7C3AED]/30">
                MAXIMUS LABS
              </span>
            </div>
            <p className="text-xs text-[#8B7FA8] leading-relaxed max-w-sm">
             
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#C4B5FD]">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#13101C] border border-[#C4B5FD]/10 font-mono-code text-[10px]">
                <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse"></span>
                Exclusively on Microsoft Store
              </span>
            </div>
          </div>

          {/* Col 3: Sound Profiles */}
          <div className="space-y-3">
            <div className="font-syne font-bold text-xs uppercase tracking-wider text-[#F0ECF8]">
              Acoustic Profiles
            </div>
            <ul className="space-y-2 font-mono-code text-xs">
              <li>
                <a href="#switches" className="hover:text-[#F0ECF8] transition-colors">
                  Creamy Linear
                </a>
              </li>
              <li>
                <a href="#switches" className="hover:text-[#F0ECF8] transition-colors">
                  Marbly Poppy
                </a>
              </li>
              <li>
                <a href="#switches" className="hover:text-[#F0ECF8] transition-colors">
                  Crisp Clack
                </a>
              </li>
              <li>
                <a href="#switches" className="hover:text-[#F0ECF8] transition-colors">
                  Deep Thock
                </a>
              </li>
              <li>
                <a href="#switches" className="hover:text-[#F0ECF8] transition-colors">
                  Buckling Spring
                </a>
              </li>
              <li>
                <a href="#switches" className="hover:text-[#F0ECF8] transition-colors">
                  Glass & Ceramic Pop
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Technology & Architecture */}
          <div className="space-y-3">
            <div className="font-syne font-bold text-xs uppercase tracking-wider text-[#F0ECF8]">
              Technology & Architecture
            </div>
            <ul className="space-y-2 font-mono-code text-xs">
              <li>
                <a href="#engine" className="hover:text-[#F0ECF8] transition-colors">
                  Real-Time Web Audio DSP
                </a>
              </li>
              <li>
                <a href="#engine" className="hover:text-[#F0ECF8] transition-colors">
                  Windows Global Keyboard Hooks
                </a>
              </li>
              <li>
                <a href="#engine" className="hover:text-[#F0ECF8] transition-colors">
                  Dual-Phase Keyup / Keydown Physics
                </a>
              </li>
              <li>
                <a href="#engine" className="hover:text-[#F0ECF8] transition-colors">
                  100% Offline & Privacy-First
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#F0ECF8] transition-colors">
                  Microsoft Store MSIX Package
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Licensing & Security */}
          <div className="space-y-3">
            <div className="font-syne font-bold text-xs uppercase tracking-wider text-[#F0ECF8]">
              Licensing & Security
            </div>
            <ul className="space-y-2 font-mono-code text-xs">
              <li>
                <a href="#pricing" className="hover:text-[#F0ECF8] transition-colors">
                  1-Day Full Access Trial ($0)
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#F0ECF8] transition-colors">
                  Annual Pass ($3.99 / year)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F0ECF8] transition-colors">
                  Zero Keylogger Architecture
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#F0ECF8] transition-colors">
                  Game & Anti-Cheat Safe (Read-Only)
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#F0ECF8] transition-colors">
                  Instant Microsoft License Restore
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-code text-[11px]">
          <div className="flex items-center gap-2 text-[#8B7FA8]">
            <span>© {new Date().getFullYear()} Maximus Labs. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[#8B7FA8]">
            <span>Exclusively available on Microsoft Store for Windows 10 & 11.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

