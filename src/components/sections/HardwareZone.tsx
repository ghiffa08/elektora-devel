"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaMicrochip, FaRobot, FaPrint, FaSatellite } from 'react-icons/fa';
import { SiArduino, SiRaspberrypi } from 'react-icons/si';
import { IoHardwareChip } from 'react-icons/io5';

const HardwareZone = () => {
  const platforms = [
    { icon: <SiArduino />, name: 'Arduino' },
    { icon: <SiRaspberrypi />, name: 'Raspberry Pi' },
    { icon: <IoHardwareChip />, name: 'ESP32' },
    { icon: <FaMicrochip />, name: 'FPGA' },
    { icon: <FaRobot />, name: 'Robotics' },
    { icon: <FaPrint />, name: '3D Printing' },
    { icon: <FaSatellite />, name: 'IoT' },
  ];

  const hardwareTopics = [
    {
      title: 'Embedded Systems',
      description: 'Designing and programming microcontroller-based systems for specific applications.',
      tags: ['Arduino', 'STM32', 'ESP32']
    },
    {
      title: 'IoT Development',
      description: 'Connected devices, sensors networks, and Internet of Things ecosystems.',
      tags: ['Sensors', 'Connectivity', 'Cloud Integration']
    },
    {
      title: 'PCB Design',
      description: 'Creating custom printed circuit boards from schematics to physical production.',
      tags: ['EDA Tools', 'Prototyping', 'Manufacturing']
    },
    {
      title: 'Robotics',
      description: 'Building autonomous and remote-controlled robotic systems and vehicles.',
      tags: ['Motion Control', 'Computer Vision', 'Mechanics']
    }
  ];

  return (
    <section id="hardware" className="py-20 relative overflow-hidden">
      <div className="container-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title bg-gradient-to-r from-elektora-cyan via-elektora-purple to-elektora-pink bg-clip-text text-transparent"
        >
          Hardware Zone
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-subtitle text-white/90"
        >
          Dive into hardware engineering with our hands-on workshops and collaborative projects
        </motion.div>

        {/* Hardware Platforms */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center shadow-lg text-elektora-cyan text-2xl group-hover:bg-gradient-to-br group-hover:from-elektora-cyan/20 group-hover:to-elektora-purple/20 transition-all duration-300">
                {platform.icon}
              </div>
              <span className="mt-2 text-sm font-medium text-white/90">{platform.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Hardware Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {hardwareTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300 group"
            >
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-elektora-cyan to-elektora-purple bg-clip-text text-transparent">{topic.title}</h3>
              <p className="text-white/80 mb-4">{topic.description}</p>
              <div className="flex flex-wrap gap-2">
                {topic.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="bg-elektora-cyan/20 backdrop-blur-sm text-elektora-cyan px-3 py-1 rounded-full text-sm border border-elektora-cyan/30 hover:bg-elektora-cyan/30 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hardware Projects Showcase */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-elektora-cyan to-elektora-purple bg-clip-text text-transparent">
            Featured Hardware Projects
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-elektora-blue/30 to-elektora-cyan/30 flex items-center justify-center text-white text-xl font-bold relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-elektora-blue/20 to-elektora-cyan/20 animate-gradient bg-[length:400%_400%]"></div>
                <span className="relative">Smart Home System</span>
              </div>
              <div className="p-6">
                <h4 className="font-bold mb-2 text-white">IoT-Based Home Automation</h4>
                <p className="text-white/70 text-sm">
                  A complete system for monitoring and controlling your home environment with smartphone integration.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-elektora-purple/30 to-elektora-blue/30 flex items-center justify-center text-white text-xl font-bold relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-elektora-purple/20 to-elektora-blue/20 animate-gradient bg-[length:400%_400%]"></div>
                <span className="relative">Autonomous Rover</span>
              </div>
              <div className="p-6">
                <h4 className="font-bold mb-2 text-white">Self-Navigating Robot</h4>
                <p className="text-white/70 text-sm">
                  An AI-powered rover that can map and navigate complex environments autonomously.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-card overflow-hidden group"
            >
              <div className="h-48 bg-gradient-to-br from-elektora-cyan/30 to-elektora-pink/30 flex items-center justify-center text-white text-xl font-bold relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-elektora-cyan/20 to-elektora-pink/20 animate-gradient bg-[length:400%_400%]"></div>
                <span className="relative">Environmental Monitor</span>
              </div>
              <div className="p-6">
                <h4 className="font-bold mb-2 text-white">Weather Station Network</h4>
                <p className="text-white/70 text-sm">
                  A distributed system of weather monitors that collects and analyzes environmental data.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HardwareZone;
