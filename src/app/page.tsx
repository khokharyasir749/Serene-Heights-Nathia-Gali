'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HeroAscent } from '@/components/HeroAscent';
import { ManifestoSection } from '@/components/ManifestoSection';
import { ExplorerSection } from '@/components/ExplorerSection';
import { ExplorerModal } from '@/components/ExplorerModal';
import { MeasureSection } from '@/components/MeasureSection';
import { LocationMapSection } from '@/components/LocationMapSection';
import { OneDaySection } from '@/components/OneDaySection';
import { ResidencesShowcaseSection } from '@/components/ResidencesShowcaseSection';
import { EstateAmenities } from '@/components/EstateAmenities';
import { GalleryShowcase } from '@/components/GalleryShowcase';
import { FourSeasonsSnow } from '@/components/FourSeasonsSnow';
import { CommercialOwnership } from '@/components/CommercialOwnership';
import { ReturnsCalculator } from '@/components/ReturnsCalculator';
import { ElevateDeveloper } from '@/components/ElevateDeveloper';
import { RegisterFounders } from '@/components/RegisterFounders';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [activeChapterId, setActiveChapterId] = useState('ascent');
  const [isExplorerOpen, setIsExplorerOpen] = useState(false);
  const [isAscentRevealed, setIsAscentRevealed] = useState(true);
  const [headerTheme, setHeaderTheme] = useState<'dark' | 'light'>('dark');
  const [isManifestoInView, setIsManifestoInView] = useState(false);
  const [isMeasureInView, setIsMeasureInView] = useState(false);
  const [isLocationInView, setIsLocationInView] = useState(false);
  const [isDayInView, setIsDayInView] = useState(false);
  const [isResidencesInView, setIsResidencesInView] = useState(false);

  const isResidencesActive = activeChapterId === 'residences' || isResidencesInView;

  const isLightChapter =
    activeChapterId === 'manifesto' ||
    activeChapterId === 'explorer' ||
    activeChapterId === 'residences' ||
    (activeChapterId === 'ascent' && headerTheme === 'light');
  const isHeaderVisible =
    !isManifestoInView && !isMeasureInView && !isLocationInView && !isResidencesActive;

  // Smooth scroll to register section
  const handleRegisterClick = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Smooth scroll to chapter
  const handleSelectChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Active chapter observer
  useEffect(() => {
    const chapterIds = [
      'ascent',
      'manifesto',
      'explorer',
      'numbers',
      'location-map',
      'address',
      'day',
      'residences',
      'estate',
      'gallery',
      'snow',
      'ownership',
      'returns',
      'elevate',
      'register',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapterId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0.1,
      }
    );

    chapterIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Dedicated observer: Strictly hide the fixed Header when inside Manifesto, Measure, Location Map, or Residences sections
  useEffect(() => {
    const manifestoEl = document.getElementById('manifesto');
    const measureEl = document.getElementById('numbers');
    const locationEl = document.getElementById('location-map');
    const residencesEl = document.getElementById('residences');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'manifesto') {
            setIsManifestoInView(entry.isIntersecting);
          } else if (entry.target.id === 'numbers') {
            setIsMeasureInView(entry.isIntersecting);
          } else if (entry.target.id === 'location-map') {
            setIsLocationInView(entry.isIntersecting);
          } else if (entry.target.id === 'residences') {
            setIsResidencesInView(entry.isIntersecting);
          }
        });
      },
      {
        rootMargin: '-40px 0px -40px 0px',
        threshold: 0.05,
      }
    );

    if (manifestoEl) observer.observe(manifestoEl);
    if (measureEl) observer.observe(measureEl);
    if (locationEl) observer.observe(locationEl);
    if (residencesEl) observer.observe(residencesEl);

    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0c0f0d] text-[#efe9df]">
      {/* Fixed Luxury Header */}
      <Header
        onRegisterClick={handleRegisterClick}
        onSelectChapter={handleSelectChapter}
        isVisible={isHeaderVisible}
        hidden={isResidencesActive}
        theme={isLightChapter ? 'light' : 'dark'}
      />

      {/* Chapter 01: The Ascent & Chapter 02: The Reserve (Seamless Pinned Scrollytelling) */}
      <HeroAscent
        onRegisterClick={handleRegisterClick}
        onAscentRevealChange={setIsAscentRevealed}
        onThemeChange={setHeaderTheme}
      />

      {/* Manifesto Statement: Scroll-driven expanding image & staggered typography reveal */}
      <ManifestoSection />

      {/* 3D 360° Explorer Trigger Banner */}
      <ExplorerSection onOpenExplorer={() => setIsExplorerOpen(true)} />

      {/* Chapter 03: The Measure (Scale, Altitude & Metrics Pinned Scrollytelling) */}
      <MeasureSection onOpenExplorer={() => setIsExplorerOpen(true)} />

      {/* Chapter 04: Interactive 3D Route Map & Elevation Scrollytelling */}
      <LocationMapSection onOpenExplorer={() => setIsExplorerOpen(true)} />

      {/* Chapter 05: One Day at the Reserve (Day-to-Night Pinned Scrollytelling) */}
      <OneDaySection />

      {/* Chapter 06: The Residences (Horizontal Pinned Scroll Showcase) */}
      <ResidencesShowcaseSection onOpenExplorer={() => setIsExplorerOpen(true)} />

      {/* Chapter 07: The Estate (Amenities across four dedicated levels) */}
      <EstateAmenities />

      {/* Chapter 08: First Look (Inside the Reserve Gallery & Lightbox) */}
      <GalleryShowcase />

      {/* Chapter 09: Four Seasons High (Winter operation & snow hold) */}
      <FourSeasonsSnow />

      {/* Chapter 10: A Commercial Asset (Ownership structure & approvals) */}
      <CommercialOwnership />

      {/* Chapter 11: What It Earns (Real-Time Financial & Yield Calculator) */}
      <ReturnsCalculator onRegisterClick={handleRegisterClick} />

      {/* Chapter 12: Elevate Holdings (Founder Ahmed Khilji & Partners) */}
      <ElevateDeveloper />

      {/* Chapter 14: Public Release (Multi-Step Founders' List Intake) */}
      <RegisterFounders />

      {/* Footer */}
      <Footer />

      {/* 360° Interactive Explorer Modal */}
      <ExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
      />
    </main>
  );
}
