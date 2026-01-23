import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations';

export const Partners: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-12 bg-secondary text-white relative overflow-hidden">
      <ScrollReveal>
        <div className="container mx-auto px-4 text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500">
            Industry Partners For Placements
          </h2>
        </div>
      </ScrollReveal>
      
      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        <motion.div 
          className="flex space-x-12 items-center"
          animate={!isPaused ? { x: [0, -1600] } : {}}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Duplicate for seamless scroll */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex space-x-12 shrink-0">
              <PartnerLogo img="/Palo-Alto-Logo.jpg" alt="Palo Alto" />
<PartnerLogo img="/Infosys.jpg" alt="Infosys" />
<PartnerLogo img="/Salesforce.jpg" alt="Salesforce" />
<PartnerLogo img="/Wipro_Logo.jpg" alt="Wipro" />
<PartnerLogo img="/Tcs.jpg" alt="TCS" />

            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const PartnerLogo: React.FC<{ img: string; alt: string }> = ({ img, alt }) => (
  <motion.div 
    whileHover={{ 
      scale: 1.1,
      y: -5,
      boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)'
    }}
    whileTap={{ scale: 0.95 }}
    className="bg-white px-8 py-4 rounded shadow-lg min-w-[220px] h-24 flex items-center justify-center cursor-pointer transition-shadow"
  >
    <img
      src={img}
      alt={alt}
      className="max-h-16 max-w-[160px] object-contain"
    />
  </motion.div>
);
