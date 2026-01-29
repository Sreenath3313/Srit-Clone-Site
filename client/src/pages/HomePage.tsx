import React, { useEffect, lazy, Suspense } from 'react';
import { Header } from '@/components/homepage/Header';
import { HeroCyber } from '@/components/homepage/HeroCyber';
import { Statistics } from '@/components/homepage/Statistics';
import { PlacementDashboard } from '@/components/homepage/PlacementDashboard';
import { AlumniCarousel } from '@/components/homepage/AlumniCarousel';
import { AchievementWall } from '@/components/homepage/AchievementWall';
import { AdmissionTracker } from '@/components/homepage/AdmissionTracker';
import { DepartmentComparison } from '@/components/homepage/DepartmentComparison';
import { CampusMap } from '@/components/homepage/CampusMap';
import { VirtualCounselor } from '@/components/homepage/VirtualCounselor';
import { AccessibilityToolbar } from '@/components/common/AccessibilityToolbar';
import { OrangeBorder } from '@/components/common/OrangeBorder';
import { MouseFollowEffect } from '@/components/animations';
import { useIsMobile } from '@/hooks/useIsMobile';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Lazy load heavy components
const About = lazy(() => import('@/components/homepage/About').then(m => ({ default: m.About })));
const DepartmentShowcase = lazy(() => import('@/components/homepage/DepartmentShowcase').then(m => ({ default: m.DepartmentShowcase })));
const Notifications = lazy(() => import('@/components/homepage/Notifications').then(m => ({ default: m.Notifications })));
const EventSlider = lazy(() => import('@/components/homepage/EventSlider').then(m => ({ default: m.EventSlider })));

const Testimonials = lazy(() => import('@/components/homepage/Testimonials').then(m => ({ default: m.Testimonials })));
const QuickLinks = lazy(() => import('@/components/homepage/QuickLinks').then(m => ({ default: m.QuickLinks })));
const Facilities = lazy(() => import('@/components/homepage/Facilities').then(m => ({ default: m.Facilities })));
const Partners = lazy(() => import('@/components/homepage/Partners').then(m => ({ default: m.Partners })));
const Footer = lazy(() => import('@/components/homepage/Footer').then(m => ({ default: m.Footer })));
const Chatbot = lazy(() => import('@/components/Chatbot'));

// Simple loading fallback
const SectionLoader = () => (
  <div className="w-full py-20 flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const HomePage: React.FC = () => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: 'ease-out-cubic',
      disable: 'mobile',
      offset: 50,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      {!isMobile && <MouseFollowEffect />}
      <Header />
      <main className="flex-grow">
        <HeroCyber />
        <Statistics />
        <PlacementDashboard />
        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>
        <DepartmentComparison />
        <Suspense fallback={<SectionLoader />}>
          <DepartmentShowcase />
        </Suspense>
        <AlumniCarousel />
        <Suspense fallback={<SectionLoader />}>
          <QuickLinks />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <EventSlider />
        </Suspense>
        <CampusMap />
        <AchievementWall />
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        <AdmissionTracker />
        <VirtualCounselor />
        <Suspense fallback={<SectionLoader />}>
          <Notifications />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Facilities />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Partners />
        </Suspense>
      </main>
      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>
      
      {/* Chatbot Widget */}
      <Suspense fallback={<div />}>
        <Chatbot />
      </Suspense>

      {/* Accessibility Toolbar */}
      <AccessibilityToolbar />
    </div>
  );
};

export default HomePage;
