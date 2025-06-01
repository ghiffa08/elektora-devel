"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

const ProjectsGallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'software', label: 'Software' },
    { id: 'hardware', label: 'Hardware' },
    { id: 'fullstack', label: 'Full-stack' },
    { id: 'mobile', label: 'Mobile Apps' },
  ];

  const projects = [
    {
      title: 'Smart Home Hub',
      category: 'hardware',
      tags: ['IoT', 'Raspberry Pi', 'React'],
      image: 'bg-gradient-to-br from-blue-400 to-elektora-cyan',
    },
    {
      title: 'E-Learning Platform',
      category: 'fullstack',
      tags: ['Next.js', 'MongoDB', 'AWS'],
      image: 'bg-gradient-to-br from-purple-400 to-elektora-blue',
    },
    {
      title: 'Fitness Tracking App',
      category: 'mobile',
      tags: ['React Native', 'Firebase', 'Health API'],
      image: 'bg-gradient-to-br from-green-400 to-cyan-500',
    },
    {
      title: 'Code Reviewer AI',
      category: 'software',
      tags: ['Python', 'Machine Learning', 'DevOps'],
      image: 'bg-gradient-to-br from-red-400 to-yellow-400',
    },
    {
      title: 'Data Visualization Dashboard',
      category: 'fullstack',
      tags: ['D3.js', 'Express', 'PostgreSQL'],
      image: 'bg-gradient-to-br from-indigo-400 to-purple-500',
    },
    {
      title: 'Autonomous Drone',
      category: 'hardware',
      tags: ['Computer Vision', 'Arduino', 'C++'],
      image: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    },
    {
      title: 'Crypto Trading Bot',
      category: 'software',
      tags: ['Node.js', 'APIs', 'Algorithms'],
      image: 'bg-gradient-to-br from-teal-400 to-blue-500',
    },
    {
      title: 'Augmented Reality App',
      category: 'mobile',
      tags: ['Unity', 'ARKit', 'Swift'],
      image: 'bg-gradient-to-br from-pink-400 to-red-500',
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="py-20">
      <div className="container-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title"
        >
          Our <span className="text-elektora-blue">Projects</span> Gallery
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-subtitle"
        >
          Discover the innovative projects created by our community members
        </motion.div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map(filter => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-medium ${
                activeFilter === filter.id
                  ? 'bg-elektora-blue text-white'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </motion.button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800"
            >
              <div 
                className={`h-48 ${project.image} flex items-center justify-center`}
              >
                <h3 className="text-white text-xl font-bold text-center px-4">{project.title}</h3>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <button className="text-elektora-blue hover:text-elektora-cyan transition-colors text-sm font-medium">
                    View Details
                  </button>
                  
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-elektora-blue transition-colors"
                    aria-label="View on GitHub"
                  >
                    <FaGithub size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a 
            href="https://github.com/elektora-team" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            <FaGithub size={20} />
            Visit Our GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsGallery;
