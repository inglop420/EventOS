'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import { SocialProofSection } from '@/components/SocialProof';
import { ServicesSection } from '@/components/ServicesSection';
import { Footer } from '@/components/Footer';
import { UrgencyBanner } from '@/components/UrgencyBanner';
import { StickyCTA } from '@/components/StickyCTA';
import { Navbar } from '@/components/Navbar';
import BookingWizard from '@/components/BookingWizard';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  const openWizard = () => setIsWizardOpen(true);
  const closeWizard = () => setIsWizardOpen(false);

  return (
    <main>
      <Navbar onOpenWizard={openWizard} />
      <HeroSection onOpenWizard={openWizard} />
      <ServicesSection />
      <SocialProofSection />
      <Footer onOpenWizard={openWizard} />

      {/* Overlays */}
      <BookingWizard isOpen={isWizardOpen} onClose={closeWizard} />
      <ChatWidget />
      <UrgencyBanner />
      <StickyCTA onOpenWizard={openWizard} />
    </main>
  );
}
