'use client';

import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { getSoundEngine } from '@/lib/sound-engine';

export function Testimonials() {
  const reviews = [
    {
      quote:
        'I spend 10 hours a day in Neovim and VS Code on a laptop membrane keyboard. Thocky makes it sound like I am typing on my $800 custom Keycult with Gateron Oil Kings. The 0.4ms latency is genuinely imperceptible.',
      name: 'Julian Vance',
      role: 'Staff Software Architect',
      tag: 'Custom Keyboard Collector',
      rating: 5,
    },
    {
      quote:
        'Routing Thocky through the virtual Discord microphone bridge completely changed my Twitch stream. Chat constantly asks what mic setup and custom switches I am using.',
      name: 'Aria Takahashi',
      role: 'Twitch Partner & Typist',
      tag: '145 WPM ASMR Streamer',
      rating: 5,
    },
    {
      quote:
        'Compared to Mechvibes and old soundboard tools that had lag and ate 200MB of RAM, Thocky runs like a lightweight ghost in the Windows system tray. The WASAPI implementation is masterclass engineering.',
      name: 'Marcus Sterling',
      role: 'Windows Audio Engineer',
      tag: 'ASIO Developer',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-[#0A080F] relative border-t border-[#C4B5FD]/10 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D946EF]/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Signature Editorial Pull-Quote */}
        <div className="relative max-w-4xl mx-auto text-center mb-20 p-8 sm:p-12 rounded-3xl bg-[#13101C]/80 border border-[#C4B5FD]/15 backdrop-blur-xl shadow-2xl">
          {/* Large decorative quotation mark */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C3AED] via-[#D946EF] to-[#C9A96E] p-[1px] shadow-[0_0_30px_rgba(217,70,239,0.5)]">
            <div className="w-full h-full bg-[#0D0B12] rounded-[15px] flex items-center justify-center text-[#D946EF]">
              <MessageSquareQuote className="w-7 h-7" />
            </div>
          </div>

          <div className="flex justify-center gap-1 mb-6 mt-2 text-[#C9A96E]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>

          <blockquote className="font-syne font-semibold text-xl sm:text-2xl md:text-3xl text-[#F0ECF8] leading-snug tracking-tight">
            “Thocky didn&apos;t just simulate switches — it captured the acoustic resonance of a tuned brass plate and lubed stabilizers so accurately that my brain forgot I was typing on a laptop.”
          </blockquote>

          <div className="mt-6 flex flex-col items-center">
            <div className="font-syne font-bold text-sm text-[#C4B5FD]">
              Christian Lindqvist
            </div>
            <div className="text-xs font-mono-code text-[#8B7FA8] mt-0.5">
              Creator of Keybored Modding Community • 480k Subscribers
            </div>
          </div>
        </div>

        {/* 3 User Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="gradient-border-card p-6 flex flex-col justify-between"
              onClick={() => getSoundEngine().playKey('Key', false, false)}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-[#C9A96E]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#1F1932] text-[#34D399] flex items-center gap-1 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                  </span>
                </div>

                <p className="text-xs text-[#8B7FA8] leading-relaxed mb-6 italic">
                  “{rev.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#C4B5FD]/10">
                <div className="font-syne font-bold text-sm text-[#F0ECF8]">
                  {rev.name}
                </div>
                <div className="text-[11px] font-mono-code text-[#C4B5FD]">
                  {rev.role}
                </div>
                <div className="text-[10px] font-mono-code text-[#8B7FA8]">
                  {rev.tag}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
