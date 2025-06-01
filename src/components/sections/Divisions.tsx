"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaMicrochip, FaServer, FaDatabase } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';
import { DivisionsSkeleton } from '@/components/ui/Skeleton';

const Divisions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
    useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
    const divisions = [
    {
      titleKey: 'softwareTitle',
      descriptionKey: 'softwareDesc',
      icon: <FaCode className="text-4xl text-elektora-blue" />,
      gradient: 'from-elektora-blue/20 to-elektora-cyan/20',
      iconGradient: 'from-elektora-blue to-elektora-cyan'
    },
    {
      titleKey: 'hardwareTitle',
      descriptionKey: 'hardwareDesc',
      icon: <FaMicrochip className="text-4xl text-elektora-cyan" />,
      gradient: 'from-elektora-cyan/20 to-elektora-purple/20',
      iconGradient: 'from-elektora-cyan to-elektora-purple'
    },
    {
      titleKey: 'cloudTitle',
      descriptionKey: 'cloudDesc',
      icon: <FaServer className="text-4xl text-elektora-purple" />,
      gradient: 'from-elektora-purple/20 to-elektora-pink/20',
      iconGradient: 'from-elektora-purple to-elektora-pink'
    },
    {
      titleKey: 'dataTitle',
      descriptionKey: 'dataDesc',
      icon: <FaDatabase className="text-4xl text-elektora-pink" />,
      gradient: 'from-elektora-pink/20 to-elektora-blue/20',
      iconGradient: 'from-elektora-pink to-elektora-blue'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };  return (
    <section id="divisions" className="py-20 relative">
      <div className="container-section">
        {isLoading ? (
          <DivisionsSkeleton />
        ) : (
          <>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-title"
            >
              {t('divisionsTitle')}
            </motion.h2>
              <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-subtitle"
            >
              {t('divisionsSubtitle')}
            </motion.div>
                  <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {divisions.map((division, index) => (
            <motion.div
              key={index}
              variants={item}
              className={`glass-card bg-gradient-to-br ${division.gradient} p-6 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group`}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${division.iconGradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {division.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{t(division.titleKey)}</h3>
              <p className="text-white/80 leading-relaxed">{t(division.descriptionKey)}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-sm bg-gradient-to-r from-elektora-cyan to-elektora-blue bg-clip-text text-transparent font-medium hover:from-elektora-blue hover:to-elektora-purple transition-all duration-300 cursor-pointer">
                  {t('learnMoreLink')}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/80 max-w-3xl mx-auto leading-relaxed">
            {t('divisionsFooter')}
          </p>
        </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Divisions;
