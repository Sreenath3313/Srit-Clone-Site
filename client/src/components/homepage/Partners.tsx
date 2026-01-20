import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations';

export const Partners: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-12 bg-secondary text-white relative overflow-hidden">
        <ScrollReveal>
          <div className="container mx-auto px-4 text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-orange-500">Industry Partners For Placements</h2>
          </div>
        </ScrollReveal>
        
        {/* Enhanced Marquee Implementation */}
        <div className="relative w-full overflow-hidden">
             <motion.div 
               className="flex space-x-12 items-center"
               animate={!isPaused ? {
                 x: [0, -1600],
               } : {}}
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
                 {/* Duplicated list for seamless scrolling */}
                 {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex space-x-12 shrink-0">
                        <PartnerLogo name="Palo Alto" />
                        <PartnerLogo name="EC-Council" />
                        <PartnerLogo name="EPAM" />
                        <PartnerLogo name="EduSkills" />
                        <PartnerLogo name="Salesforce" />
                        <PartnerLogo name="Wipro" />
                        <PartnerLogo name="TCS" />
                        <PartnerLogo name="Infosys" />
                    </div>
                 ))}
             </motion.div>
        </div>
    </section>
  );
};

const PartnerLogo: React.FC<{ name: string }> = ({ name }) => (
    <motion.div 
      whileHover={{ 
        scale: 1.1,
        y: -5,
        boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-white text-secondary font-bold text-xl px-8 py-4 rounded shadow-lg min-w-[200px] text-center flex items-center justify-center h-20 cursor-pointer transition-shadow"
    >
        {name}
    </motion.div>
);
