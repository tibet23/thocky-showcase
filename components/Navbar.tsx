'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Download, Laptop, Menu, X } from 'lucide-react';

import newLogo from '@/assets/thocy-app-logo.png';

interface NavbarProps {
  onOpenDownloadModal: () => void;
}

export function Navbar({ onOpenDownloadModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '6 Acoustic Profiles', href: '#switches' },
    { name: 'Engine & Features', href: '#engine' },
    { name: 'Pricing ($3.99/yr)', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0B12]/90 backdrop-blur-xl border-b border-[#C4B5FD]/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand & Publisher */}
        <a
          href="#"
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] via-[#D946EF] to-[#C9A96E] p-[1.5px] shadow-[0_0_20px_rgba(124,58,237,0.35)] group-hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] transition-all duration-300 overflow-hidden">
            <div className="w-full h-full bg-[#0D0B12] rounded-[10px] flex items-center justify-center overflow-hidden relative">
              <Image
                src="/thocky-app-logo.png"
                alt="Thocky Logo"
                width={38}
                height={38}
                className="w-full h-full object-cover rounded-[9px]"
                priority
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-syne font-extrabold text-2xl tracking-tight text-[#F0ECF8]">
                THOCKY
              </span>
              <span className="w-2 h-2 rounded-full bg-[#D946EF] shadow-[0_0_8px_#D946EF] animate-pulse"></span>
            </div>
            <span className="text-[10px] font-mono-code text-[#8B7FA8] -mt-1">
              by Maximus Labs
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-syne font-semibold tracking-wider text-[#8B7FA8] uppercase">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#F0ECF8] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#7C3AED] after:to-[#D946EF] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Microsoft Store CTA Button */}
          <button
            onClick={onOpenDownloadModal}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-syne font-bold tracking-wide uppercase overflow-hidden transition-all duration-300 cursor-pointer"
          >
            {/* Gradient border wrapper */}
            <span className="absolute inset-0 rounded-xl p-[1px] bg-gradient-to-r from-[#7C3AED] via-[#D946EF] to-[#C9A96E]">
              <span className="block w-full h-full bg-[#13101C] rounded-[11px] group-hover:bg-transparent transition-all duration-300"></span>
            </span>
            <span className="relative z-10 flex items-center gap-2 text-[#F0ECF8] group-hover:text-white">
              <Laptop className="w-4 h-4 text-[#C4B5FD] group-hover:text-white transition-colors" />
              <span>Microsoft Store</span>
              <Download className="w-3.5 h-3.5 text-[#C9A96E] group-hover:translate-y-0.5 transition-transform" />
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#181326] border border-[#C4B5FD]/20 text-[#F0ECF8]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D0B12]/95 backdrop-blur-2xl border-b border-[#C4B5FD]/15 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 font-syne font-semibold text-sm uppercase tracking-wider text-[#8B7FA8]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-2 hover:text-[#F0ECF8] transition-colors border-b border-[#1F1932]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownloadModal();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#D946EF] to-[#C9A96E] text-white font-syne font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Get on Microsoft Store
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
