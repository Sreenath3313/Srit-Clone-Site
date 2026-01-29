import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { OrangeBorder } from '@/components/common/OrangeBorder';

const libraryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80', title: 'Reading Hall' },
  { id: 2, url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80', title: 'Book Shelves' },
  { id: 3, url: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80', title: 'Study Area' },
  { id: 4, url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80', title: 'Digital Library' },
  { id: 5, url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80', title: 'Reference Section' },
  { id: 6, url: 'https://images.unsplash.com/photo-1495741545814-2d7f4d75ea09?w=800&q=80', title: 'Group Study Room' },
  { id: 7, url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&q=80', title: 'Periodical Section' },
  { id: 8, url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80', title: 'Silent Zone' },
];

const LibraryGallery: React.FC = () => {
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
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
                <Book className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Central <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Library</span>
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              World-class learning resources and modern study facilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {libraryImages.map((image, index) => (
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

export default LibraryGallery;
