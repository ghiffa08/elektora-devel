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
      const componentCount = 35;
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
    
    window.addEventListener('resize', createElectronicComponents);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => {
      window.removeEventListener('resize', createElectronicComponents);
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
                 {/* 3D Microcontroller Container */}
        <div className="relative" style={{ perspective: '1200px' }}>
          <motion.div
            animate={{ 
              rotateX: [0, 8, -8, 0], 
              rotateY: [0, 12, -12, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Main PCB Board */}
            <div className="w-80 h-56 lg:w-96 lg:h-64 bg-gradient-to-br from-emerald-600 via-green-600 to-green-800 rounded-xl relative border border-green-400/30 shadow-[0_25px_50px_rgba(0,0,0,0.5),0_50px_100px_rgba(34,197,94,0.15),0_75px_150px_rgba(34,197,94,0.1)] overflow-hidden">
              
              {/* PCB texture overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-30"></div>
              
              {/* Enhanced circuit traces with copper gradient */}
              <div className="absolute inset-4">
                {/* Horizontal traces */}
                <div className="w-full h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full mb-4 shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-90"></div>
                <div className="w-4/5 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full mb-4 shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-80"></div>
                <div className="w-full h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full mb-8 shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-90"></div>
                <div className="w-3/5 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-70"></div>
                
                {/* Vertical traces */}
                <div className="absolute left-8 top-0 w-0.5 h-2/3 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-300 rounded-full shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-80"></div>
                <div className="absolute right-12 top-0 w-0.5 h-3/4 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-300 rounded-full shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-75"></div>
              </div>
              
              {/* Main Microcontroller Chip */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-24 h-20 lg:w-28 lg:h-24 bg-gradient-to-br from-slate-700 via-slate-800 to-black rounded-md border border-slate-500/50 shadow-[0_12px_24px_rgba(0,0,0,0.7),0_6px_12px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)]">
                
                {/* Chip surface detail */}
                <div className="absolute inset-1 border border-slate-400/30 rounded-sm bg-gradient-to-br from-slate-600 to-slate-900">
                  <div className="w-full h-full bg-gradient-to-br from-slate-700/50 to-transparent rounded-sm flex items-center justify-center relative overflow-hidden">
                    
                    {/* Chip label */}
                    <span className="text-sm lg:text-base text-slate-200 font-mono font-bold tracking-wider relative z-10">ELEKTORA</span>
                    
                    {/* Subtle circuit pattern on chip */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-2 left-2 w-4 h-0.5 bg-slate-300 rounded"></div>
                      <div className="absolute top-4 left-2 w-6 h-0.5 bg-slate-300 rounded"></div>
                      <div className="absolute bottom-2 right-2 w-4 h-0.5 bg-slate-300 rounded"></div>
                      <div className="absolute bottom-4 right-2 w-6 h-0.5 bg-slate-300 rounded"></div>
                    </div>
                  </div>
                </div>
                
                {/* Chip pins - Left side */}
                <div className="absolute -left-1.5 top-2 flex flex-col space-y-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-0.5 bg-gradient-to-r from-slate-300 to-slate-400 rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.5)]"></div>
                  ))}
                </div>
                
                {/* Chip pins - Right side */}
                <div className="absolute -right-1.5 top-2 flex flex-col space-y-1">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="w-2 h-0.5 bg-gradient-to-r from-slate-400 to-slate-300 rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.5)]"></div>
                  ))}
                </div>
              </div>
              
              {/* Electronic Components */}
              {/* Capacitor */}
              <div className="absolute bottom-6 left-6 w-8 h-6 lg:w-10 lg:h-8 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 rounded-sm border border-blue-300/50 shadow-[0_6px_12px_rgba(59,130,246,0.4),0_3px_6px_rgba(59,130,246,0.2)]">
                <div className="absolute inset-0.5 bg-gradient-to-b from-blue-300/30 to-transparent rounded-sm"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-slate-300 rounded-t"></div>
              </div>
              
              {/* Resistor */}
              <div className="absolute bottom-6 right-6 w-6 h-8 lg:w-8 lg:h-10 bg-gradient-to-b from-red-400 via-red-500 to-red-700 rounded-sm border border-red-300/50 shadow-[0_6px_12px_rgba(239,68,68,0.4),0_3px_6px_rgba(239,68,68,0.2)]">
                <div className="absolute inset-0.5 bg-gradient-to-b from-red-300/30 to-transparent rounded-sm"></div>
                {/* Resistor color bands */}
                <div className="absolute top-1 left-0 right-0 h-0.5 bg-white/80"></div>
                <div className="absolute top-2 left-0 right-0 h-0.5 bg-yellow-400"></div>
                <div className="absolute top-3 left-0 right-0 h-0.5 bg-black/80"></div>
              </div>
              
              {/* Crystal Oscillator */}
              <div className="absolute top-6 left-6 w-5 h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 rounded border border-amber-200/50 shadow-[0_6px_12px_rgba(234,179,8,0.4),0_3px_6px_rgba(234,179,8,0.2)]">
                <div className="absolute inset-0.5 bg-gradient-to-br from-amber-200/40 to-transparent rounded"></div>
              </div>
              
              {/* LED Indicators with enhanced glow */}
              <div className="absolute top-6 right-6 flex space-x-2">
                <motion.div 
                  animate={{ 
                    opacity: [0.4, 1, 0.4],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-3 h-3 lg:w-4 lg:h-4 bg-gradient-radial from-green-300 to-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.9),0_0_24px_rgba(34,197,94,0.5),0_0_36px_rgba(34,197,94,0.2)] border border-green-200/30"
                >
                  <div className="absolute inset-0.5 bg-gradient-radial from-green-200/60 to-transparent rounded-full"></div>
                </motion.div>
                
                <motion.div 
                  animate={{ 
                    opacity: [1, 0.4, 1],
                    scale: [1.1, 1, 1.1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-3 h-3 lg:w-4 lg:h-4 bg-gradient-radial from-blue-300 to-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9),0_0_24px_rgba(59,130,246,0.5),0_0_36px_rgba(59,130,246,0.2)] border border-blue-200/30"
                >
                  <div className="absolute inset-0.5 bg-gradient-radial from-blue-200/60 to-transparent rounded-full"></div>
                </motion.div>
                
                <motion.div 
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-3 h-3 lg:w-4 lg:h-4 bg-gradient-radial from-orange-300 to-orange-500 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.8),0_0_24px_rgba(249,115,22,0.4)] border border-orange-200/30"
                >
                  <div className="absolute inset-0.5 bg-gradient-radial from-orange-200/60 to-transparent rounded-full"></div>
                </motion.div>
              </div>
              
              {/* USB Connector */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-12 h-4 lg:w-14 lg:h-5 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 rounded-sm border border-slate-300/50 shadow-[0_6px_12px_rgba(0,0,0,0.4),0_3px_6px_rgba(0,0,0,0.2)]">
                <div className="absolute inset-0.5 bg-gradient-to-b from-slate-200/40 to-transparent rounded-sm"></div>
                {/* USB connector pins */}
                <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 flex space-x-0.5">
                  <div className="w-0.5 h-1 bg-yellow-400 rounded-t"></div>
                  <div className="w-0.5 h-1 bg-slate-700 rounded-t"></div>
                  <div className="w-0.5 h-1 bg-red-400 rounded-t"></div>
                  <div className="w-0.5 h-1 bg-slate-700 rounded-t"></div>
                </div>
              </div>
              
              {/* Additional small components */}
              <div className="absolute top-1/2 left-8 w-2 h-3 bg-gradient-to-b from-slate-400 to-slate-600 rounded-sm shadow-sm"></div>
              <div className="absolute top-1/2 right-8 w-3 h-2 bg-gradient-to-r from-slate-400 to-slate-600 rounded-sm shadow-sm"></div>
              <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-sm"></div>
            </div>
            
            {/* Enhanced 3D depth layers */}
            <div className="absolute top-1 left-1 w-80 h-56 lg:w-96 lg:h-64 bg-gradient-to-br from-green-700/60 via-green-800/60 to-green-900/60 rounded-xl -z-10 blur-sm"></div>
            <div className="absolute top-2 left-2 w-80 h-56 lg:w-96 lg:h-64 bg-gradient-to-br from-green-800/40 via-green-900/40 to-black/40 rounded-xl -z-20 blur-md"></div>
            <div className="absolute top-3 left-3 w-80 h-56 lg:w-96 lg:h-64 bg-gradient-to-br from-green-900/20 to-black/20 rounded-xl -z-30 blur-lg"></div>
          </motion.div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-400/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + i * 8}%`
              }}
            />
          ))}
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
