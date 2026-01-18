import React from 'react';
import { Header } from '@/components/homepage/Header';
import { Hero } from '@/components/homepage/Hero';
import { About } from '@/components/homepage/About';
import { Notifications } from '@/components/homepage/Notifications';
import { Events } from '@/components/homepage/Events';
import { Facilities } from '@/components/homepage/Facilities';
import { Partners } from '@/components/homepage/Partners';
import { Footer } from '@/components/homepage/Footer';
import { CampusGallery } from '@/components/homepage/CampusGallery';
import Chatbot from '@/components/Chatbot';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CampusGallery />
        <About />
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
