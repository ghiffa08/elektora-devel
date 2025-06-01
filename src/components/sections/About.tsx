"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { TextSkeleton } from '@/components/ui/Skeleton';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
    return (
    <section id="about" className="py-20 relative">
      <div className="container-section">
        {isLoading ? (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <TextSkeleton />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="glass-card p-8">
                <TextSkeleton />
              </div>
              <div className="glass-card p-8">
                <TextSkeleton />
              </div>
            </div>
          </div>
        ) : (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-title"
            >
              {t('aboutTitle')}
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-subtitle"
            >
              {t('aboutDescription')}
            </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-elektora-blue to-elektora-cyan bg-clip-text text-transparent">Our Mission</h3>
                <p className="text-white/90 leading-relaxed">
                  Our mission is to create a dynamic and inclusive community that brings together tech enthusiasts 
                  from diverse backgrounds. We foster knowledge sharing, collaboration, and innovative project 
                  development to empower individuals to reach their full potential in the tech industry.
                </p>
                <p className="mt-4 text-white/80 leading-relaxed">
                  We believe in the power of community-driven learning and the impact of collaborative projects 
                  on developing real-world skills and expanding career opportunities.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card p-8 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-elektora-cyan to-elektora-purple bg-clip-text text-transparent">Our Vision</h3>
                <p className="text-white/90 leading-relaxed">
                  We envision a world where access to tech education and community support enables anyone to 
                  pursue their passion for technology. Our community aspires to be a globally recognized platform 
                  that consistently produces impactful projects and nurtures the next generation of tech innovators.
                </p>
                <p className="mt-4 text-white/80 leading-relaxed">
                  By bridging the gap between software and hardware knowledge, we aim to create a holistic 
                  learning experience that prepares our members for the rapidly evolving technology landscape.
                </p>
              </motion.div>
            </div>
              <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="py-3 px-6 glass-card bg-gradient-to-r from-elektora-blue/20 to-elektora-cyan/20 text-white rounded-full font-medium shadow-lg">
                  1000+ Community Members
                </div>
                <div className="py-3 px-6 glass-card bg-gradient-to-r from-elektora-cyan/20 to-elektora-purple/20 text-white rounded-full font-medium shadow-lg">
                  50+ Active Projects
                </div>
                <div className="py-3 px-6 glass-card bg-gradient-to-r from-elektora-purple/20 to-elektora-pink/20 text-white rounded-full font-medium shadow-lg">
                  Weekly Events & Workshops
                </div>
                <div className="py-3 px-6 glass-card bg-gradient-to-r from-elektora-pink/20 to-elektora-blue/20 text-white rounded-full font-medium shadow-lg">
                  24/7 Community Support
                </div>
              </div>
                <p className="max-w-3xl mx-auto text-white/80 leading-relaxed">
                Join a thriving community of like-minded individuals who are passionate about technology and 
                eager to collaborate on projects that make a difference. Whether you&apos;re a beginner or an expert, 
                Elektora Team provides the perfect environment to grow and excel.
              </p>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default About;
