import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    batch: '2020-24, CSE',
    company: 'TCS',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
    text: 'SRIT provided me with exceptional learning opportunities and industry exposure. The faculty guidance and placement support helped me secure my dream job at TCS.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    batch: '2019-23, ECE',
    company: 'Infosys',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    text: 'The technical skills and practical knowledge I gained at SRIT were instrumental in my career. The college has excellent infrastructure and supportive faculty.',
    rating: 5,
  },
  {
    name: 'Anil Reddy',
    batch: '2018-22, Mechanical',
    company: 'Ashok Leyland',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anil',
    text: 'SRIT shaped my engineering career with hands-on projects and industry collaborations. The placement cell worked tirelessly to ensure every student got opportunities.',
    rating: 5,
  },
  {
    name: 'Sneha Patel',
    batch: '2021-25, CSE',
    company: 'Wipro',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    text: 'The coding culture and competitive programming environment at SRIT helped me excel. I am grateful for the mentorship and technical training provided.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    batch: '2017-21, Civil',
    company: 'L&T',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
    text: 'SRIT offers a perfect blend of academics and extracurricular activities. The campus life and learning experience prepared me for the professional world.',
    rating: 5,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Student <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hear from our alumni who are making a difference in the industry
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation
            loop
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                >
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 h-full flex flex-col hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 group">
                    {/* Quote icon */}
                    <div className="mb-4">
                      <Quote className="w-10 h-10 text-orange-500 opacity-50" />
                    </div>

                    {/* Testimonial text */}
                    <p className="text-gray-200 leading-relaxed mb-6 flex-grow italic">
                      "{testimonial.text}"
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Author info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-orange-500 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.batch}</p>
                        <p className="text-orange-400 text-sm font-semibold">{testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #FF6B35;
          opacity: 1;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(255, 107, 53, 0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 107, 53, 0.6);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px;
        }
      `}</style>
    </section>
  );
};
