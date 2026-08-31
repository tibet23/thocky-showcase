'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MarqueeStrip } from '@/components/MarqueeStrip';
import { SwitchMatrixSection } from '@/components/SwitchMatrixSection';
import { ArchitectureSection } from '@/components/ArchitectureSection';
import { PricingDownloadSection } from '@/components/PricingDownloadSection';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';
import { DownloadModal } from '@/components/DownloadModal';

export default function HomePage() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [selectedDownloadTier, setSelectedDownloadTier] = useState('Studio Pro');

  const handleOpenDownload = (tier: string = 'Studio Pro') => {
    setSelectedDownloadTier(tier);
    setDownloadModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#0D0B12] text-[#F0ECF8] relative overflow-hidden">
      {/* Navigation */}
      <Navbar onOpenDownloadModal={() => handleOpenDownload('Studio Pro')} />

      {/* Hero Section with 6 curated acoustic profile overview */}
      <Hero onOpenDownloadModal={() => handleOpenDownload('Studio Pro')} />

      {/* Infinite Marquee Ticker */}
      <MarqueeStrip />

      {/* Detailed 6 Acoustic Profiles & Specs Matrix */}
      <SwitchMatrixSection onOpenDownloadModal={() => handleOpenDownload('Studio Pro')} />

      {/* Windows Engine Architecture & Merged Enthusiast Features */}
      <ArchitectureSection />

      {/* Microsoft Store Download & Pricing ($3.99/year with 1-Day Trial) */}
      <PricingDownloadSection onOpenDownloadModal={handleOpenDownload} />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Footer */}
      <Footer onOpenDownloadModal={() => handleOpenDownload('Studio Pro')} />

      {/* Microsoft Store Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        selectedTier={selectedDownloadTier}
      />
    </main>
  );
}

