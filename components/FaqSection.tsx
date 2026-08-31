'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does Thocky achieve true zero-latency audio synthesis on Windows?',
      answer:
        'Thocky by Maximus Labs uses real-time procedural Web Audio Digital Signal Processing (DSP). Rather than loading and playing back pre-recorded audio samples (which causes audio stutter and noticeable typing lag), Thocky computes acoustic waveforms dynamically with multi-stage filter resonance the instant a key is pressed.',
    },
    {
      question: 'Is Thocky safe? Does it record keystrokes or log passwords?',
      answer:
        'Thocky has a strict zero-telemetry, zero-keylogging architecture. It only intercepts read-only hardware event triggers locally in memory to fire acoustic oscillators and filters. No keycodes, text strings, or passwords are ever stored, written to disk, or sent over any network. It functions 100% offline.',
    },
    {
      question: 'What are the 6 acoustic profiles included in Thocky?',
      answer:
        'Thocky includes 6 meticulously synthesized acoustic profiles: 1) Creamy Linear, 2) Marbly Poppy, 3) Crisp Clack, 4) Deep Thock, 5) Buckling Spring, and 6) Glass & Ceramic Pop.',
    },
    {
      question: 'How does the 1-day free trial and Microsoft Store pricing work?',
      answer:
        'Thocky offers a 1-day full access free trial directly on the Microsoft Store with 100% feature availability — no upfront payment required. After the trial, you can continue using Thocky for just $3.99/year (less than $0.34/month), which includes continuous access to all acoustic profiles and procedural engine updates.',
    },
    {
      question: 'Does Thocky work on laptop keyboards, low-profile switches, and membrane boards?',
      answer:
        'Yes! That is Thocky’s core mission: giving any laptop keyboard or standard membrane office keyboard the rich, deeply satisfying acoustic presence of a $399+ custom gasket-mounted mechanical keyboard without buying new hardware.',
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#0A080F] relative border-t border-[#C4B5FD]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181326] border border-[#C4B5FD]/20 text-xs font-syne-mono text-[#C4B5FD] uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#D946EF]" /> Frequently Asked Questions
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl text-[#F0ECF8]">
            Got Questions? We&apos;ve Got Answers.
          </h2>
          <p className="mt-3 text-sm text-[#8B7FA8]">
            Everything you need to know about procedural DSP synthesis, the 1-day free trial, and zero-telemetry privacy.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="gradient-border-card overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-syne font-bold text-sm sm:text-base text-[#F0ECF8]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#D946EF] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm font-normal text-[#8B7FA8] leading-relaxed border-t border-[#C4B5FD]/10">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

