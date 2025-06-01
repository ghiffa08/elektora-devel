"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaChalkboardTeacher, FaLaptopCode, FaUsers } from 'react-icons/fa';

const Activities = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const { current } = sliderRef;
      const scrollAmount = direction === 'left' 
        ? -current.offsetWidth * 0.6 
        : current.offsetWidth * 0.6;
      
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  const activities = [
    {
      title: 'Weekly Workshops',
      date: 'Every Tuesday, 7PM EST',
      description: 'Hands-on technical workshops focusing on trending technologies and frameworks.',
      icon: <FaChalkboardTeacher className="text-elektora-blue text-3xl" />,
      gradient: 'from-elektora-blue/30 to-elektora-cyan/30'
    },
    {
      title: 'Hackathon 2025',
      date: 'July 15-17, 2025',
      description: '48-hour coding marathon to solve real-world challenges with creative solutions.',
      icon: <FaLaptopCode className="text-elektora-cyan text-3xl" />,
      gradient: 'from-elektora-cyan/30 to-elektora-purple/30'
    },
    {
      title: 'Tech Conference',
      date: 'August 5-7, 2025',
      description: 'Annual tech conference featuring industry leaders and cutting-edge demonstrations.',
      icon: <FaUsers className="text-elektora-purple text-3xl" />,
      gradient: 'from-elektora-purple/30 to-elektora-pink/30'
    },
    {
      title: 'Code Review Sessions',
      date: 'Every Thursday, 6PM EST',
      description: 'Collaborative code reviews to share knowledge and improve coding practices.',
      icon: <FaCalendarAlt className="text-elektora-pink text-3xl" />,
      gradient: 'from-elektora-pink/30 to-elektora-blue/30'
    },
    {
      title: 'Project Showcase',
      date: 'Last Friday of every month',
      description: 'Demo day for members to present their projects and receive feedback.',
      icon: <FaUsers className="text-elektora-blue text-3xl" />,
      gradient: 'from-elektora-blue/30 to-elektora-cyan/30'
    },
    {
      title: 'Hardware Lab',
      date: 'Weekends, 10AM-4PM EST',
      description: 'Open lab sessions for working on hardware projects with community equipment.',
      icon: <FaLaptopCode className="text-elektora-cyan text-3xl" />,
      gradient: 'from-elektora-cyan/30 to-elektora-purple/30'
    }
  ];
  return (
    <section id="activities" className="py-20 relative overflow-hidden">
      <div className="container-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title bg-gradient-to-r from-elektora-blue via-elektora-purple to-elektora-pink bg-clip-text text-transparent"
        >
          Our Activities
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-subtitle text-white/90"
        >
          Engage with our community through various events and collaborative activities
        </motion.div>
        
        <div className="relative mt-12">          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass-card shadow-md rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-elektora-blue/20 transition-colors duration-300"
            onClick={() => scroll('left')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
            <motion.button
            whileHover={{ scale: 1.05 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass-card shadow-md rounded-full w-10 h-10 flex items-center justify-center text-white hover:bg-elektora-blue/20 transition-colors duration-300"
            onClick={() => scroll('right')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          
          {/* Horizontal Scroll Container */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="overflow-x-auto hide-scrollbar -mx-4 px-4 py-2"
            ref={sliderRef}
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex space-x-6" style={{ width: 'fit-content' }}>
              {activities.map((activity, index) => (                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass-card rounded-lg shadow-md overflow-hidden min-w-[300px] max-w-[300px] flex flex-col group"
                >
                  <div className={`h-32 flex items-center justify-center text-white p-6 bg-gradient-to-br ${activity.gradient} relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${activity.gradient} animate-gradient bg-[length:400%_400%]`}></div>
                    <div className="relative">{activity.icon}</div>
                  </div>
                  <div className="p-6 flex-1">
                    <h3 className="font-bold text-xl mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-elektora-cyan group-hover:to-elektora-blue group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{activity.title}</h3>
                    <div className="text-sm text-elektora-cyan mb-4 flex items-center">
                      <FaCalendarAlt className="mr-2" />
                      {activity.date}
                    </div>
                    <p className="text-white/80">
                      {activity.description}
                    </p>
                  </div>
                  <div className="p-6 pt-0">
                    <button className="text-sm text-elektora-cyan font-medium hover:text-elektora-blue transition-colors">
                      Learn more →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a href="#" className="btn-primary">
            View All Events
          </a>
        </motion.div>
      </div>
      
      {/* CSS for hiding scrollbar in horizontal slider */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Activities;
