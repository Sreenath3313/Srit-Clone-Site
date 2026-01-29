import React, { useState } from 'react';
import { Header } from '@/components/homepage/Header';
import { Footer } from '@/components/homepage/Footer';
import { OrangeBorder } from '@/components/common/OrangeBorder';
import { motion } from 'framer-motion';
import { MapPin, Video } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'Main Academic Block',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80',
    description: 'Modern classrooms with smart boards and AC facilities',
    virtualTour: '#',
    altText: 'Modern academic building with smart classrooms and advanced teaching facilities',
  },
  {
    id: 2,
    name: 'Central Library',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80',
    description: '50,000+ books, digital library, and reading zones',
    virtualTour: '#',
    altText: 'Spacious library interior with reading areas and thousands of books',
  },
  {
    id: 3,
    name: 'Research Labs',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80',
    description: 'State-of-the-art laboratories with latest equipment',
    virtualTour: '#',
    altText: 'Modern research laboratory with advanced scientific equipment',
  },
  {
    id: 4,
    name: 'Sports Complex',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80',
    description: 'Cricket, football, basketball, and indoor games',
    virtualTour: '#',
    altText: 'Sports facilities including outdoor fields and indoor courts',
  },
  {
    id: 5,
    name: 'Student Hostels',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    description: 'Comfortable accommodation with modern amenities',
    virtualTour: '#',
    altText: 'Comfortable student hostel room with modern furnishings',
  },
  {
    id: 6,
    name: 'Cafeteria',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80',
    description: 'Hygienic food court with multiple cuisine options',
    virtualTour: '#',
    altText: 'Clean and modern campus cafeteria with dining areas',
  },
];

const ExploreCampus: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <OrangeBorder />
      <Header />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Explore Our Campus
            </h1>
            <p className="text-xl text-gray-600">
              Take a virtual tour of our world-class facilities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <motion.div
                key={selectedLocation.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img 
                  src={selectedLocation.image} 
                  alt={selectedLocation.altText}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedLocation.name}
                  </h2>
                  <p className="text-white/90 mb-4">
                    {selectedLocation.description}
                  </p>
                  <button 
                    className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition flex items-center gap-2"
                    onClick={() => alert('360° Virtual Tour coming soon! Stay tuned for immersive campus experience.')}
                  >
                    <Video size={20} />
                    Start 360° Tour
                  </button>
                </div>
              </motion.div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4">Select Location</h3>
              {locations.map((location) => (
                <motion.button
                  key={location.id}
                  onClick={() => setSelectedLocation(location)}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className={`w-full text-left p-4 rounded-2xl transition ${
                    selectedLocation.id === location.id
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'bg-white hover:bg-orange-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin size={20} />
                    <span className="font-semibold">{location.name}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Campus Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏢', label: 'Academic Blocks', value: '12' },
              { icon: '🔬', label: 'Research Labs', value: '45' },
              { icon: '📚', label: 'Library Books', value: '50K+' },
              { icon: '🏋️', label: 'Sports Facilities', value: '15' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-3xl font-bold text-orange-600 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExploreCampus;
