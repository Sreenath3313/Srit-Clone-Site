import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { OrangeBorder } from '@/components/common/OrangeBorder';

const campusImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', title: 'Main Building' },
  { id: 2, url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', title: 'Administrative Block' },
  { id: 3, url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80', title: 'Academic Halls' },
  { id: 4, url: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80', title: 'Campus Grounds' },
  { id: 5, url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80', title: 'Entrance Gate' },
  { id: 6, url: 'https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800&q=80', title: 'Green Spaces' },
  { id: 7, url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80', title: 'Walkways' },
  { id: 8, url: 'https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800&q=80', title: 'Campus View' },
];

const MainCampusGallery: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8 font-semibold">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white">
                <MapPin className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Main <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Campus</span>
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our state-of-the-art academic buildings and beautiful campus grounds
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {campusImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-square overflow-hidden bg-gray-200">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainCampusGallery;
