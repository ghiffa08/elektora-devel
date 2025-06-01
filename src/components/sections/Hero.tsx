"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { BannerSkeleton } from '@/components/ui/Skeleton';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const particleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple particle animation effect
    const createParticles = () => {
      const particleContainer = particleRef.current;
      if (!particleContainer) return;
      
      particleContainer.innerHTML = '';
        const particleCount = 50;
      const colors = ['#3B82F6', '#06B6D4', '#8B5CF6', '#ffffff'];
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        const size = Math.random() * 6 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 4 + 3;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = Math.random() * 0.6 + 0.2;
        
        particle.style.cssText = `
          position: absolute;
          top: ${posY}%;
          left: ${posX}%;
          width: ${size}px;
          height: ${size}px;
          background-color: ${color};
          border-radius: 50%;
          opacity: ${opacity};
          animation: float ${duration}s ease-in-out infinite;
          animation-delay: ${delay}s;
          pointer-events: none;
        `;
        
        particleContainer.appendChild(particle);
      }
    };
      createParticles();
    
    window.addEventListener('resize', createParticles);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => {
      window.removeEventListener('resize', createParticles);
      clearTimeout(timer);
    };
  }, []);  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Particle background */}
      <div ref={particleRef} className="absolute inset-0 z-0"></div>
      
      {/* Glass overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10"></div>
      
      <div className="container-section relative z-20">
        {isLoading ? (
          <BannerSkeleton />
        ) : (
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <div className="flex-1 glass-card p-8 md:p-12">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-elektora-cyan to-elektora-blue bg-clip-text text-transparent leading-tight"
              >
                {t('welcomeTitle')}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 text-white/90 max-w-xl leading-relaxed"
              >
                {t('welcomeSubtitle')}
              </motion.p>
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap gap-6"
              >
                <Link href="#join">
                  <span className="btn-primary inline-block cursor-pointer">{t('joinCommunity')}</span>
                </Link>
                <Link href="#about">
                  <span className="btn-secondary inline-block cursor-pointer">{t('learnMore')}</span>
                </Link>
              </motion.div>
            </div>            <div className="flex-1 relative flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0, 0.71, 0.2, 1.01]
                }}
                className="relative"
              >
                {/* 3D Microcontroller */}
                <div className="relative perspective-1000">
                  <motion.div
                    animate={{ 
                      rotateX: [0, 10, 0], 
                      rotateY: [0, 15, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className="transform-3d"
                  >                    {/* Main PCB Board with enhanced shadows */}
                    <div className="w-64 h-40 md:w-80 md:h-52 lg:w-96 lg:h-60 bg-gradient-to-br from-green-600 to-green-800 rounded-lg relative border-2 border-green-500/50 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_40px_80px_rgba(34,197,94,0.2),0_60px_120px_rgba(34,197,94,0.1)]">
                      {/* Circuit traces */}
                      <div className="absolute inset-3">
                        <div className="w-full h-0.5 bg-copper-gradient rounded-full mb-3 shadow-sm"></div>
                        <div className="w-3/4 h-0.5 bg-copper-gradient rounded-full mb-3 shadow-sm"></div>
                        <div className="w-full h-0.5 bg-copper-gradient rounded-full mb-6 shadow-sm"></div>
                        <div className="w-2/3 h-0.5 bg-copper-gradient rounded-full shadow-sm"></div>
                      </div>
                        {/* Microcontroller chip */}
                      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-16 h-12 md:w-20 md:h-16 lg:w-24 lg:h-20 bg-gradient-to-br from-gray-800 to-black rounded border border-gray-600 shadow-[0_8px_16px_rgba(0,0,0,0.6),0_4px_8px_rgba(0,0,0,0.4)]"><div className="absolute inset-1 border border-gray-500 rounded">
                          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center">
                            <span className="text-xs md:text-sm lg:text-base text-white font-mono">ARM</span>
                          </div>
                        </div>
                          {/* Chip pins */}
                        <div className="absolute -left-1 top-1.5 flex flex-col space-y-0.5">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-1.5 h-0.5 bg-silver rounded-sm shadow-sm"></div>
                          ))}
                        </div>
                        <div className="absolute -right-1 top-1.5 flex flex-col space-y-0.5">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-1.5 h-0.5 bg-silver rounded-sm shadow-sm"></div>
                          ))}
                        </div>
                      </div>
                        {/* Components */}
                      <div className="absolute bottom-4 left-4 w-6 h-4 md:w-8 md:h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded border border-blue-300 shadow-[0_4px_8px_rgba(59,130,246,0.4)]"></div>
                      <div className="absolute bottom-4 right-4 w-4 h-6 md:w-6 md:h-8 bg-gradient-to-r from-red-400 to-red-600 rounded border border-red-300 shadow-[0_4px_8px_rgba(239,68,68,0.4)]"></div>
                      <div className="absolute top-4 left-4 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full border border-yellow-300 shadow-[0_4px_8px_rgba(234,179,8,0.4)]"></div>
                        {/* LED indicators */}
                      <div className="absolute top-4 right-4 flex space-x-1.5">
                        <motion.div 
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8),0_0_16px_rgba(34,197,94,0.4)]"
                        ></motion.div>
                        <motion.div 
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2.5 h-2.5 md:w-3 md:h-3 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8),0_0_16px_rgba(59,130,246,0.4)]"
                        ></motion.div>
                      </div>
                        {/* USB connector */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-8 h-3 md:w-10 md:h-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-sm border border-gray-400 shadow-[0_4px_8px_rgba(0,0,0,0.3)]"></div>
                    </div>
                      {/* 3D depth effect with enhanced shadow */}
                    <div className="absolute top-1 left-1 w-64 h-40 md:w-80 md:h-52 lg:w-96 lg:h-60 bg-gradient-to-br from-green-700 to-green-900 rounded-lg -z-10 opacity-40 blur-sm"></div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
