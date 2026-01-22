import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { campusImages, type CampusImage } from '@/data/campusImages';
import { StaggerContainer, StaggerItem, TiltCard, ScrollReveal } from '@/components/animations';
import { ZoomIn } from 'lucide-react';

export const CampusGallery: React.FC = () => {
  const images = useMemo(() => campusImages, []);
  const [active, setActive] = useState<CampusImage | null>(null);

  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-50/30 via-white to-orange-50/20 overflow-hidden" aria-label="Campus gallery" role="region">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <ScrollReveal>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-sm font-semibold text-primary uppercase tracking-wider px-4 py-2 bg-orange-100 rounded-full">
                Visual Tour
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-orange-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Campus Gallery
            </h2>
            <p className="mt-3 text-gray-600 text-lg">
              A quick look at highlights from SRIT - Experience the beauty of our campus
            </p>
          </motion.div>
        </ScrollReveal>

        <StaggerContainer 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.1}
        >
          {images.map((img) => (
            <StaggerItem key={img.id}>
              <TiltCard intensity={6}>
                <motion.button
                  type="button"
                  onClick={() => setActive(img)}
                  whileHover={{ y: -12 }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white focus:outline-none focus:ring-2 focus:ring-primary w-full"
                  aria-label={`Open ${img.alt}`}
                >
                  <div className="relative overflow-hidden h-64">
                    <motion.img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      whileHover={{ scale: 1.15, rotate: 2 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    {/* Gradient overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                        <span className="text-white font-semibold text-sm">{img.alt}</span>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="bg-orange-500 p-2 rounded-full"
                        >
                          <ZoomIn className="w-4 h-4 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Border animation */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ boxShadow: '0 0 0 0 rgba(255, 107, 53, 0)' }}
                    whileHover={{ boxShadow: '0 0 0 3px rgba(255, 107, 53, 0.5)' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Enhanced lightbox with advanced animations */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                type="button"
                onClick={() => setActive(null)}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 107, 53, 1)' }}
                whileTap={{ scale: 0.95 }}
                className="absolute -top-14 right-0 text-white text-sm bg-orange-500/90 px-6 py-3 rounded-xl backdrop-blur-sm font-semibold shadow-lg hover:shadow-orange-500/50 transition-all"
              >
                ✕ Close
              </motion.button>
              <motion.div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  src={active.src}
                  alt={active.alt}
                  layoutId={`image-${active.id}`}
                  className="w-full max-h-[80vh] object-contain bg-black"
                />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-white text-lg font-semibold">{active.alt}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
