"use client";

import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaMobile, FaPython, FaDatabase } from 'react-icons/fa';
import { SiTensorflow, SiTypescript } from 'react-icons/si';

const SoftwareZone = () => {
  const technologies = [
    { icon: <FaReact />, name: 'React' },
    { icon: <FaNodeJs />, name: 'Node.js' },
    { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <FaMobile />, name: 'Mobile Dev' },
    { icon: <FaPython />, name: 'Python' },
    { icon: <FaDatabase />, name: 'Databases' },
    { icon: <SiTensorflow />, name: 'ML/AI' },
  ];

  const softwareTopics = [
    {
      title: 'Web Development',
      description: 'Modern frameworks and libraries like React, Vue, Angular, and backend technologies.',
      tags: ['Frontend', 'Backend', 'Full-stack']
    },
    {
      title: 'Mobile Applications',
      description: 'Cross-platform and native app development using React Native, Flutter, and Swift.',
      tags: ['iOS', 'Android', 'Cross-platform']
    },
    {
      title: 'Machine Learning',
      description: 'AI model development, data processing, and applications of machine learning.',
      tags: ['AI', 'Neural Networks', 'Data Science']
    },
    {
      title: 'Cloud Solutions',
      description: 'Deployment, containerization, and cloud-native application development.',
      tags: ['AWS', 'Azure', 'GCP', 'Docker']
    }
  ];
  return (
    <section id="software" className="py-20 relative overflow-hidden">
      <div className="container-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title bg-gradient-to-r from-elektora-blue via-elektora-cyan to-elektora-purple bg-clip-text text-transparent"
        >
          Software Zone
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-subtitle text-white/90"
        >
          Explore the world of software development with our community resources and projects
        </motion.div>
          {/* Technology Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className="flex flex-col items-center group"
            >
              <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center shadow-lg text-elektora-blue text-2xl group-hover:bg-gradient-to-br group-hover:from-elektora-blue/20 group-hover:to-elektora-cyan/20 transition-all duration-300">
                {tech.icon}
              </div>
              <span className="mt-2 text-sm font-medium text-white/90">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
          {/* Software Topics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {softwareTopics.map((topic, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
              className="glass-card p-6 hover:scale-105 transition-transform duration-300 group"
            >
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-elektora-cyan to-elektora-blue bg-clip-text text-transparent">{topic.title}</h3>
              <p className="text-white/80 mb-4">{topic.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {topic.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="bg-elektora-blue/20 backdrop-blur-sm text-elektora-cyan px-3 py-1 rounded-full text-sm border border-elektora-blue/30 hover:bg-elektora-blue/30 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
          {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 glass-card p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-elektora-blue/20 via-elektora-cyan/20 to-elektora-purple/20 animate-gradient bg-[length:400%_400%]"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-elektora-cyan to-elektora-purple bg-clip-text text-transparent">Start Your Coding Journey Today</h3>
            <p className="mb-6 text-white/90">
              Join coding workshops, contribute to open-source projects, and collaborate with fellow developers
            </p>
            <button className="btn-primary">
              Explore Projects
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SoftwareZone;
