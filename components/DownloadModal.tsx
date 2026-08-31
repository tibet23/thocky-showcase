'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Laptop,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { MICROSOFT_STORE_CONFIG } from '@/lib/storeConfig';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: string;
}

export function DownloadModal({ isOpen, onClose, selectedTier = 'Studio Pro' }: DownloadModalProps) {
  const [openingStore, setOpeningStore] = useState(false);
  const [storeOpened, setStoreOpened] = useState(false);

  if (!isOpen) return null;

  const handleOpenStore = () => {
    setOpeningStore(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7C3AED', '#D946EF', '#C9A96E', '#34D399'],
    });

    setTimeout(() => {
      setOpeningStore(false);
      setStoreOpened(true);
      window.open(MICROSOFT_STORE_CONFIG.webUrl, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#13101C] border border-[#C4B5FD]/20 shadow-[0_25px_70px_rgba(0,0,0,0.9)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#181326] border border-[#C4B5FD]/15 text-[#8B7FA8] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#D946EF] to-[#C9A96E] p-[1.5px] mx-auto mb-3 shadow-[0_0_25px_rgba(217,70,239,0.4)] overflow-hidden">
            <div className="w-full h-full bg-[#0D0B12] rounded-[14px] flex items-center justify-center overflow-hidden relative">
              <Image
                src="/logo.png"
                alt="Thocky Logo"
                width={52}
                height={52}
                className="w-full h-full object-cover rounded-[13px]"
              />
            </div>
          </div>
          <h3 className="font-syne font-bold text-2xl text-[#F0ECF8]">
            Get Thocky on Microsoft Store
          </h3>
          <p className="text-xs text-[#8B7FA8] mt-1">
            Windows 11 / 10 64-bit • Zero-Sample Procedural DSP Audio Engine
          </p>
        </div>

        {/* Package Options */}
        {!storeOpened ? (
          <div className="space-y-4">
            {/* Free Trial Banner */}
            <div className="p-3.5 rounded-2xl bg-[#1A1429] border border-[#D946EF]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#D946EF]" />
                <div>
                  <div className="font-syne font-bold text-xs text-[#F0ECF8]">
                    1-Day Full Access Free Trial
                  </div>
                  <div className="text-[11px] text-[#8B7FA8]">
                    Try all 6 profiles with zero upfront charge
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#D946EF]/20 text-[#D946EF] font-bold">
                FREE TRIAL
              </span>
            </div>

            {/* Microsoft Store Action Card */}
            <button
              onClick={handleOpenStore}
              disabled={openingStore}
              className="w-full p-5 rounded-2xl bg-gradient-to-r from-[#201438] to-[#171028] border-2 border-[#D946EF] flex items-center justify-between group hover:shadow-[0_0_35px_rgba(217,70,239,0.4)] transition-all cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#2A1747] flex items-center justify-center text-[#D946EF]">
                  <Laptop className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-syne font-bold text-base text-[#F0ECF8] flex items-center gap-2">
                    <span>Install via Microsoft Store</span>
                  </div>
                  <div className="text-xs text-[#C4B5FD]/80 mt-0.5">
                    {openingStore ? 'Opening Microsoft Store...' : 'One-click install with automatic silent updates'}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#C9A96E] group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            {/* Pricing & Subscription Summary */}
            <div className="p-3.5 rounded-xl bg-[#0D0B12] border border-[#C4B5FD]/10 space-y-1.5 text-[11px] font-mono-code text-[#8B7FA8]">
              <div className="flex justify-between text-[#F0ECF8]">
                <span>Annual Pass:</span>
                <span className="text-[#C9A96E] font-bold">$3.99 / year (~$0.33/mo)</span>
              </div>
              <div className="flex justify-between">
                <span>Distribution:</span>
                <span>Microsoft Store Exclusive</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Anti-Cheat Safe
                </span>
                <span>Riot Vanguard / VAC Compliant</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#10281E] border border-[#34D399]/40 text-[#34D399] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-syne font-bold text-lg text-[#F0ECF8]">
                Microsoft Store Opened!
              </h4>
              <p className="text-xs text-[#8B7FA8] mt-1.5 max-w-sm mx-auto">
                Click &quot;Install&quot; or &quot;Free Trial&quot; in the Microsoft Store window. Once installed, press <kbd className="px-1.5 py-0.5 rounded bg-black text-[10px] text-[#C4B5FD]">Ctrl+Shift+T</kbd> to cycle profiles anytime.
              </p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#D946EF] text-white font-syne font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
