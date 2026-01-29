import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { OrangeBorder } from '@/components/common/OrangeBorder';

const hostelImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80', title: 'Hostel Building' },
  { id: 2, url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', title: 'Student Room' },
  { id: 3, url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', title: 'Common Room' },
  { id: 4, url: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80', title: 'Dining Hall' },
  { id: 5, url: 'https://images.unsplash.com/photo-1588854337221-4cf9fa96185e?w=800&q=80', title: 'Recreation Area' },
  { id: 6, url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', title: 'Study Room' },
  { id: 7, url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', title: 'Hostel Courtyard' },
  { id: 8, url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80', title: 'Sports Facilities' },
];

const HostelGallery: React.FC = () => {
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
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl text-white">
                <Home className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Hostel <span className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">Facilities</span>
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comfortable residential facilities with modern amenities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hostelImages.map((image, index) => (
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

export default HostelGallery;
