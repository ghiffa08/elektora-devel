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
    // Electronic components background animation
    const createElectronicComponents = () => {
      const particleContainer = particleRef.current;
      if (!particleContainer) return;
      
      particleContainer.innerHTML = '';
      const componentCount = 35;
      
      // Component types with their styles
      const components = [
        // LEDs
        {
          type: 'led',
          shape: 'rounded-full',
          colors: ['#22c55e', '#3b82f6', '#ef4444', '#f59e0b', '#8b5cf6'],
          size: { min: 4, max: 8 },
          glow: true
        },
        // Resistors
        {
          type: 'resistor',
          shape: 'rounded-sm',
          colors: ['#92400e', '#dc2626', '#059669', '#7c3aed'],
          size: { min: 8, max: 16 },
          bands: true
        },
        // Transistors
        {
          type: 'transistor',
          shape: 'rounded-sm',
          colors: ['#374151', '#1f2937', '#111827'],
          size: { min: 6, max: 12 },
          legs: true
        },
        // Capacitors
        {
          type: 'capacitor',
          shape: 'rounded-sm',
          colors: ['#1d4ed8', '#2563eb', '#3b82f6'],
          size: { min: 10, max: 14 },
          cylindrical: true
        },
        // Small ICs
        {
          type: 'ic',
          shape: 'rounded-sm',
          colors: ['#111827', '#1f2937', '#374151'],
          size: { min: 12, max: 20 },
          pins: true
        }
      ];
      
      for (let i = 0; i < componentCount; i++) {
        const componentType = components[Math.floor(Math.random() * components.length)];
        const component = document.createElement('div');
        
        const size = Math.random() * (componentType.size.max - componentType.size.min) + componentType.size.min;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 3;
        const duration = Math.random() * 6 + 4;
        const color = componentType.colors[Math.floor(Math.random() * componentType.colors.length)];
        const opacity = Math.random() * 0.4 + 0.2;
        const rotation = Math.random() * 360;
        
        let baseStyle = `
          position: absolute;
          top: ${posY}%;
          left: ${posX}%;
          width: ${size}px;
          height: ${componentType.type === 'resistor' ? size * 0.6 : size}px;
          background-color: ${color};
          opacity: ${opacity};
          transform: rotate(${rotation}deg);
          animation: electronicsFloat ${duration}s ease-in-out infinite;
          animation-delay: ${delay}s;
          pointer-events: none;
          z-index: 1;
        `;
        
        // Add component-specific styling
        if (componentType.glow) {
          baseStyle += `box-shadow: 0 0 ${size/2}px ${color}40, 0 0 ${size}px ${color}20;`;
        }
        
        if (componentType.shape === 'rounded-full') {
          baseStyle += 'border-radius: 50%;';
        } else if (componentType.shape === 'rounded-sm') {
          baseStyle += 'border-radius: 2px;';
        }
        
        component.style.cssText = baseStyle;
        
        // Add component details
        if (componentType.bands && componentType.type === 'resistor') {
          // Add resistor color bands
          const band1 = document.createElement('div');
          const band2 = document.createElement('div');
          const band3 = document.createElement('div');
          
          band1.style.cssText = `position: absolute; top: 20%; left: 0; right: 0; height: 15%; background: #ffffff; opacity: 0.8;`;
          band2.style.cssText = `position: absolute; top: 40%; left: 0; right: 0; height: 15%; background: #fbbf24; opacity: 0.8;`;
          band3.style.cssText = `position: absolute; top: 60%; left: 0; right: 0; height: 15%; background: #000000; opacity: 0.8;`;
          
          component.appendChild(band1);
          component.appendChild(band2);
          component.appendChild(band3);
        }
        
        if (componentType.legs && componentType.type === 'transistor') {
          // Add transistor legs
          for (let j = 0; j < 3; j++) {
            const leg = document.createElement('div');
            leg.style.cssText = `
              position: absolute;
              bottom: -2px;
              left: ${20 + j * 30}%;
              width: 1px;
              height: 4px;
              background: #9ca3af;
            `;
            component.appendChild(leg);
          }
        }
        
        if (componentType.pins && componentType.type === 'ic') {
          // Add IC pins
          for (let j = 0; j < 4; j++) {
            const pin = document.createElement('div');
            pin.style.cssText = `
              position: absolute;
              top: ${20 + j * 20}%;
              left: -1px;
              width: 2px;
              height: 2px;
              background: #d1d5db;
            `;
            component.appendChild(pin);
          }
          for (let j = 0; j < 4; j++) {
            const pin = document.createElement('div');
            pin.style.cssText = `
              position: absolute;
              top: ${20 + j * 20}%;
              right: -1px;
              width: 2px;
              height: 2px;
              background: #d1d5db;
            `;
            component.appendChild(pin);
          }
        }
        
        particleContainer.appendChild(component);
      }
    };

    createElectronicComponents();
    
    window.addEventListener('resize', createElectronicComponents);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => {
      window.removeEventListener('resize', createElectronicComponents);
      clearTimeout(timer);
    };
  }, []);

  return (    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Electronic components background */}
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
            </div>
            
            <div className="flex-1 relative flex items-center justify-center">
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
                {/* 3D Microcontroller Container - Adjusted size */}
                <div className="relative" style={{ perspective: '1000px' }}>
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
                    }}                    className="transform-gpu"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Main PCB Board - Increased size for better balance */}
                    <div className="w-80 h-56 md:w-96 md:h-64 lg:w-112 lg:h-72 bg-gradient-to-br from-emerald-600 via-green-600 to-green-800 rounded-xl relative border border-green-400/30 shadow-[0_25px_50px_rgba(0,0,0,0.5),0_50px_100px_rgba(34,197,94,0.15),0_75px_150px_rgba(34,197,94,0.1)] overflow-hidden">
                      
                      {/* PCB texture overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] opacity-30"></div>
                      
                      {/* Enhanced circuit traces with copper gradient - Scaled for larger board */}
                      <div className="absolute inset-4 md:inset-5 lg:inset-6">
                        {/* Horizontal traces */}
                        <div className="w-full h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full mb-4 shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-90"></div>
                        <div className="w-4/5 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full mb-4 shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-80"></div>
                        <div className="w-full h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full mb-8 shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-90"></div>
                        <div className="w-3/5 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 rounded-full shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-70"></div>
                        
                        {/* Vertical traces */}
                        <div className="absolute left-8 top-0 w-0.5 h-2/3 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-300 rounded-full shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-80"></div>                        <div className="absolute right-10 top-0 w-0.5 h-3/4 bg-gradient-to-b from-amber-300 via-yellow-400 to-amber-300 rounded-full shadow-[0_0_4px_rgba(251,191,36,0.8)] opacity-75"></div>
                      </div>
                      
                      {/* Main Microcontroller Chip - Proportionally increased */}
                      <div className="absolute top-5 md:top-6 lg:top-8 left-1/2 transform -translate-x-1/2 w-24 h-20 md:w-32 md:h-24 lg:w-36 lg:h-28 bg-gradient-to-br from-slate-700 via-slate-800 to-black rounded-md border border-slate-500/50 shadow-[0_12px_24px_rgba(0,0,0,0.7),0_6px_12px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1)]">
                        
                        {/* Chip surface detail */}
                        <div className="absolute inset-1 border border-slate-400/30 rounded-sm bg-gradient-to-br from-slate-600 to-slate-900">
                          <div className="w-full h-full bg-gradient-to-br from-slate-700/50 to-transparent rounded-sm flex items-center justify-center relative overflow-hidden">
                            
                            {/* Chip label - Increased size */}
                            <span className="text-sm md:text-base lg:text-lg text-slate-200 font-mono font-bold tracking-wider relative z-10">ELEKTORA</span>
                            
                            {/* Subtle circuit pattern on chip */}
                            <div className="absolute inset-0 opacity-20">
                              <div className="absolute top-1 md:top-2 left-1 md:left-2 w-3 md:w-4 h-0.5 bg-slate-300 rounded"></div>
                              <div className="absolute top-2 md:top-4 left-1 md:left-2 w-4 md:w-6 h-0.5 bg-slate-300 rounded"></div>
                              <div className="absolute bottom-1 md:bottom-2 right-1 md:right-2 w-3 md:w-4 h-0.5 bg-slate-300 rounded"></div>
                              <div className="absolute bottom-2 md:bottom-4 right-1 md:right-2 w-4 md:w-6 h-0.5 bg-slate-300 rounded"></div>
                            </div>
                          </div>
                        </div>
                          {/* Chip pins - Left side - Scaled for larger chip */}
                        <div className="absolute -left-2 top-2 md:top-3 lg:top-4 flex flex-col space-y-1 md:space-y-1.5">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-2 md:w-3 lg:w-4 h-1 bg-gradient-to-r from-slate-300 to-slate-400 rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.5)]"></div>
                          ))}
                        </div>
                        
                        {/* Chip pins - Right side - Scaled for larger chip */}
                        <div className="absolute -right-2 top-2 md:top-3 lg:top-4 flex flex-col space-y-1 md:space-y-1.5">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="w-2 md:w-3 lg:w-4 h-1 bg-gradient-to-r from-slate-400 to-slate-300 rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.5)]"></div>
                          ))}
                        </div>
                      </div>
                        {/* Electronic Components - Scaled for larger board */}
                      {/* Capacitor */}
                      <div className="absolute bottom-5 md:bottom-6 lg:bottom-8 left-5 md:left-6 lg:left-8 w-8 h-6 md:w-10 md:h-8 lg:w-12 lg:h-10 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 rounded-sm border border-blue-300/50 shadow-[0_6px_12px_rgba(59,130,246,0.4),0_3px_6px_rgba(59,130,246,0.2)]">
                        <div className="absolute inset-0.5 bg-gradient-to-b from-blue-300/30 to-transparent rounded-sm"></div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 md:w-1.5 h-2 md:h-3 bg-slate-300 rounded-t"></div>
                      </div>
                      
                      {/* Resistor */}
                      <div className="absolute bottom-5 md:bottom-6 lg:bottom-8 right-5 md:right-6 lg:right-8 w-6 h-8 md:w-8 md:h-10 lg:w-10 lg:h-12 bg-gradient-to-b from-red-400 via-red-500 to-red-700 rounded-sm border border-red-300/50 shadow-[0_6px_12px_rgba(239,68,68,0.4),0_3px_6px_rgba(239,68,68,0.2)]">
                        <div className="absolute inset-0.5 bg-gradient-to-b from-red-300/30 to-transparent rounded-sm"></div>
                        {/* Resistor color bands */}
                        <div className="absolute top-1.5 left-0 right-0 h-0.5 bg-white/80"></div>
                        <div className="absolute top-2.5 md:top-3 left-0 right-0 h-0.5 bg-yellow-400"></div>
                        <div className="absolute top-3.5 md:top-4 left-0 right-0 h-0.5 bg-black/80"></div>
                      </div>
                      
                      {/* Crystal Oscillator */}
                      <div className="absolute top-5 md:top-6 lg:top-8 left-5 md:left-6 lg:left-8 w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 rounded border border-amber-200/50 shadow-[0_6px_12px_rgba(234,179,8,0.4),0_3px_6px_rgba(234,179,8,0.2)]">
                        <div className="absolute inset-0.5 bg-gradient-to-br from-amber-200/40 to-transparent rounded"></div>
                      </div>
                      
                      {/* LED Indicators with enhanced glow */}
                      <div className="absolute top-5 md:top-6 lg:top-8 right-5 md:right-6 lg:right-8 flex space-x-2 md:space-x-3">
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
                          className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-gradient-radial from-green-300 to-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.9),0_0_24px_rgba(34,197,94,0.5),0_0_36px_rgba(34,197,94,0.2)] border border-green-200/30"
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
                          className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-gradient-radial from-blue-300 to-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9),0_0_24px_rgba(59,130,246,0.5),0_0_36px_rgba(59,130,246,0.2)] border border-blue-200/30"
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
                          className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 bg-gradient-radial from-orange-300 to-orange-500 rounded-full shadow-[0_0_12px_rgba(249,115,22,0.8),0_0_24px_rgba(249,115,22,0.4)] border border-orange-200/30"
                        >
                          <div className="absolute inset-0.5 bg-gradient-radial from-orange-200/60 to-transparent rounded-full"></div>
                        </motion.div>
                      </div>
                        {/* USB Connector - Scaled up */}
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-12 h-4 md:w-16 md:h-5 lg:w-20 lg:h-6 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-600 rounded-sm border border-slate-300/50 shadow-[0_6px_12px_rgba(0,0,0,0.4),0_3px_6px_rgba(0,0,0,0.2)]">
                        <div className="absolute inset-0.5 bg-gradient-to-b from-slate-200/40 to-transparent rounded-sm"></div>
                        {/* USB connector pins */}
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          <div className="w-1 h-1 md:h-1.5 bg-yellow-400 rounded-t"></div>
                          <div className="w-1 h-1 md:h-1.5 bg-slate-700 rounded-t"></div>
                          <div className="w-1 h-1 md:h-1.5 bg-red-400 rounded-t"></div>
                          <div className="w-1 h-1 md:h-1.5 bg-slate-700 rounded-t"></div>
                        </div>
                      </div>
                      
                      {/* Additional small components - Scaled up */}
                      <div className="absolute top-1/2 left-8 w-2 h-3 md:w-3 md:h-4 lg:w-4 lg:h-5 bg-gradient-to-b from-slate-400 to-slate-600 rounded-sm shadow-sm"></div>
                      <div className="absolute top-1/2 right-8 w-3 h-2 md:w-4 md:h-3 lg:w-5 lg:h-4 bg-gradient-to-r from-slate-400 to-slate-600 rounded-sm shadow-sm"></div>
                      <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 md:w-2 md:h-2 lg:w-2.5 lg:h-2.5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-sm"></div>
                    </div>
                      {/* Enhanced 3D depth layers - Scaled to match larger PCB */}
                    <div className="absolute top-1 left-1 w-80 h-56 md:w-96 md:h-64 lg:w-112 lg:h-72 bg-gradient-to-br from-green-700/60 via-green-800/60 to-green-900/60 rounded-xl -z-10 blur-sm"></div>
                    <div className="absolute top-2 left-2 w-80 h-56 md:w-96 md:h-64 lg:w-112 lg:h-72 bg-gradient-to-br from-green-800/40 via-green-900/40 to-black/40 rounded-xl -z-20 blur-md"></div>
                    <div className="absolute top-3 left-3 w-80 h-56 md:w-96 md:h-64 lg:w-112 lg:h-72 bg-gradient-to-br from-green-900/20 to-black/20 rounded-xl -z-30 blur-lg"></div>
                  </motion.div>
                </div>
                
                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-green-400/30 rounded-full"
                      animate={{
                        x: [0, 80, 0],
                        y: [0, -40, 0],
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
