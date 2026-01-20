import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { campusImages, type CampusImage } from '@/data/campusImages';
import { StaggerContainer, StaggerItem } from '@/components/animations';

export const CampusGallery: React.FC = () => {
  const images = useMemo(() => campusImages, []);
  const [active, setActive] = useState<CampusImage | null>(null);

  return (
    <section className="py-16 bg-white" aria-label="Campus gallery" role="region">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">Campus Gallery</h2>
          <p className="mt-3 text-gray-600">
            A quick look at highlights from SRIT.
          </p>
        </motion.div>

        <StaggerContainer 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          staggerDelay={0.1}
        >
          {images.map((img) => (
            <StaggerItem key={img.id}>
              <motion.button
                type="button"
                onClick={() => setActive(img)}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative rounded-xl overflow-hidden shadow-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                aria-label={`Open ${img.alt}`}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Enhanced lightbox with animations */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                type="button"
                onClick={() => setActive(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-12 right-0 text-white/90 hover:text-white text-sm bg-orange-500/80 px-4 py-2 rounded-lg backdrop-blur-sm"
              >
                Close
              </motion.button>
              <motion.img
                src={active.src}
                alt={active.alt}
                layoutId={`image-${active.id}`}
                className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl bg-black"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
