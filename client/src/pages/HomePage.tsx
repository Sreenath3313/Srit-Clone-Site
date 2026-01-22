import React, { useEffect } from 'react';
import { Header } from '@/components/homepage/Header';
import { Hero } from '@/components/homepage/Hero';
import { Statistics } from '@/components/homepage/Statistics';
import { About } from '@/components/homepage/About';
import { DepartmentShowcase } from '@/components/homepage/DepartmentShowcase';
import { Notifications } from '@/components/homepage/Notifications';
import { EventCalendar } from '@/components/homepage/EventCalendar';
import { Events } from '@/components/homepage/Events';
import { VirtualTour } from '@/components/homepage/VirtualTour';
import { Testimonials } from '@/components/homepage/Testimonials';
import { QuickLinks } from '@/components/homepage/QuickLinks';
import { Facilities } from '@/components/homepage/Facilities';
import { Partners } from '@/components/homepage/Partners';
import { Footer } from '@/components/homepage/Footer';
import { CampusGallery } from '@/components/homepage/CampusGallery';
import Chatbot from '@/components/Chatbot';
import { OrangeBorder } from '@/components/common/OrangeBorder';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      <main className="flex-grow">
        <Hero />
        <Statistics />
        <About />
        <DepartmentShowcase />
        <QuickLinks />
        <EventCalendar />
        <VirtualTour />
        <CampusGallery />
        <Testimonials />
        <Notifications />
        <Events />
        <Facilities />
        <Partners />
      </main>
      <Footer />
      
      {/* Chatbot Widget */}
      <Chatbot />
    </div>
  );
};

export default HomePage;
