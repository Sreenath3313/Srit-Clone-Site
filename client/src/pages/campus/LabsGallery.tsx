import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { OrangeBorder } from '@/components/common/OrangeBorder';

const labImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80', title: 'Computer Lab' },
  { id: 2, url: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=800&q=80', title: 'Electronics Lab' },
  { id: 3, url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', title: 'Physics Lab' },
  { id: 4, url: 'https://images.unsplash.com/photo-1583912267550-d974d7c0cdde?w=800&q=80', title: 'Chemistry Lab' },
  { id: 5, url: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80', title: 'Mechanical Workshop' },
  { id: 6, url: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&q=80', title: 'Research Lab' },
  { id: 7, url: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?w=800&q=80', title: 'CAD Lab' },
  { id: 8, url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80', title: 'Innovation Lab' },
];

const LabsGallery: React.FC = () => {
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
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
                <FlaskConical className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Laboratory <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Facilities</span>
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Advanced research and practical learning facilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {labImages.map((image, index) => (
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

export default LabsGallery;
