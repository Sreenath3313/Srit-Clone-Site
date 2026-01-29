import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import { Linkedin, Briefcase, MapPin } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

interface Alumni {
  name: string;
  position: string;
  company: string;
  location: string;
  batch: string;
  linkedin: string;
  photo: string;
  achievement: string;
}

const alumniData: Alumni[] = [
  {
    name: 'Rajesh Kumar',
    position: 'Senior Software Engineer',
    company: 'Google',
    location: 'Bangalore',
    batch: '2019',
    linkedin: '#',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    achievement: 'Led development of Google Maps features'
  },
  {
    name: 'Priya Sharma',
    position: 'Product Manager',
    company: 'Microsoft',
    location: 'Hyderabad',
    batch: '2018',
    linkedin: '#',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    achievement: 'Launched Azure AI Services'
  },
  {
    name: 'Amit Patel',
    position: 'Full Stack Developer',
    company: 'Amazon',
    location: 'Seattle, USA',
    batch: '2020',
    linkedin: '#',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    achievement: 'Built AWS Lambda optimization tools'
  },
  {
    name: 'Sneha Reddy',
    position: 'Data Scientist',
    company: 'TCS',
    location: 'Mumbai',
    batch: '2017',
    linkedin: '#',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    achievement: 'Developed ML models for healthcare'
  },
  {
    name: 'Karthik Iyer',
    position: 'DevOps Engineer',
    company: 'Infosys',
    location: 'Pune',
    batch: '2019',
    linkedin: '#',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karthik',
    achievement: 'Automated CI/CD pipelines'
  },
  {
    name: 'Divya Menon',
    position: 'UX Designer',
    company: 'Adobe',
    location: 'Bangalore',
    batch: '2021',
    linkedin: '#',
    photo: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya',
    achievement: 'Redesigned Creative Cloud interface'
  }
];

export const AlumniCarousel: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px),
                           repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 107, 53, 0.3) 2px, rgba(255, 107, 53, 0.3) 3px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg"
          >
            <Briefcase className="w-5 h-5" />
            <span className="font-semibold">Success Stories</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">Alumni</span> Stars
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Celebrating the achievements of our graduates making waves across the globe
          </p>
        </motion.div>

        {/* Alumni Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[EffectCoverflow, Autoplay, Pagination]}
            className="alumni-swiper pb-12"
            style={{ overflow: 'visible' }}
          >
            {alumniData.map((alumni, index) => (
              <SwiperSlide key={index} style={{ width: '350px', height: 'auto' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-orange-500/20 h-full"
                >
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm" />
                  
                  {/* Content */}
                  <div className="relative p-6 flex flex-col items-center text-center">
                    {/* Photo with orange border */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full blur-lg opacity-50" />
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-orange-500 shadow-xl">
                        <img 
                          src={alumni.photo} 
                          alt={alumni.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Batch Badge */}
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Batch {alumni.batch}
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {alumni.name}
                    </h3>

                    {/* Position & Company */}
                    <div className="flex items-center gap-2 text-orange-400 mb-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-semibold">{alumni.position}</span>
                    </div>
                    <p className="text-gray-300 font-medium mb-3">{alumni.company}</p>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{alumni.location}</span>
                    </div>

                    {/* Achievement */}
                    <p className="text-gray-400 text-sm italic mb-6">
                      "{alumni.achievement}"
                    </p>

                    {/* LinkedIn Link */}
                    <motion.a
                      href={alumni.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                      Connect on LinkedIn
                    </motion.a>
                  </div>

                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-orange-500/30" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-orange-500/30" />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Custom Swiper Pagination Styling */}
      <style>{`
        .alumni-swiper .swiper-pagination-bullet {
          background: rgba(255, 107, 53, 0.5);
          width: 12px;
          height: 12px;
          opacity: 1;
        }
        .alumni-swiper .swiper-pagination-bullet-active {
          background: linear-gradient(135deg, #FF6B35, #9333EA);
          width: 32px;
          border-radius: 6px;
        }
      `}</style>
    </section>
  );
};
