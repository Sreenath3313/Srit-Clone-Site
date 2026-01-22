import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar as CalendarIcon } from 'lucide-react';

const events = [
  {
    title: 'Tech Fest 2025',
    start: '2025-02-15',
    end: '2025-02-17',
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  {
    title: 'Industry Visit - TCS',
    start: '2025-02-20',
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  {
    title: 'Cultural Night',
    start: '2025-02-25',
    backgroundColor: '#EC4899',
    borderColor: '#EC4899',
  },
  {
    title: 'Semester Exams Begin',
    start: '2025-03-01',
    end: '2025-03-15',
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  {
    title: 'Guest Lecture - AI/ML',
    start: '2025-03-10',
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  {
    title: 'Sports Day',
    start: '2025-03-22',
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  {
    title: 'Career Fair 2025',
    start: '2025-03-28',
    end: '2025-03-29',
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
];

export const EventCalendar: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #FF6B35 1px, transparent 1px), linear-gradient(to bottom, #FF6B35 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-purple-500 rounded-xl text-white">
              <CalendarIcon className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Upcoming <span className="gradient-text">Events</span>
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with our academic and cultural calendar
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 hover:shadow-3xl transition-shadow duration-500">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={events}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek'
              }}
              height="auto"
              eventDisplay="block"
              displayEventTime={false}
              eventClassNames="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        </motion.div>

        {/* Upcoming events list */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div 
                  className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center"
                  style={{ backgroundColor: event.backgroundColor }}
                >
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {event.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {new Date(event.start).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  {event.end && ` - ${new Date(event.end).toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric'
                  })}`}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
