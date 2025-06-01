"use client";

import { motion } from 'framer-motion';
import { FaDiscord, FaUserPlus, FaGithub } from 'react-icons/fa';

const JoinCommunity = () => {
  return (
    <section id="join" className="py-20 relative overflow-hidden">
      <div className="container-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-title bg-gradient-to-r from-elektora-purple via-elektora-pink to-elektora-cyan bg-clip-text text-transparent"
        >
          Join Our Community
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="section-subtitle text-white/90"
        >
          Be part of a growing network of tech enthusiasts and innovators
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h3 className="text-2xl font-bold mb-6">Why Join Elektora Team?</h3>
              <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-elektora-cyan/30 to-elektora-blue/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-elektora-cyan/20">
                  <span className="text-elektora-cyan font-bold text-xl">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Learn from Peers</h4>
                  <p className="text-white/80">
                    Connect with experienced developers and hardware engineers who share their knowledge.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-elektora-purple/30 to-elektora-cyan/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-elektora-purple/20">
                  <span className="text-elektora-purple font-bold text-xl">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Build Real Projects</h4>
                  <p className="text-white/80">
                    Work on collaborative projects that solve real-world problems and enhance your portfolio.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-elektora-pink/30 to-elektora-purple/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-elektora-pink/20">
                  <span className="text-elektora-pink font-bold text-xl">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Network & Grow</h4>
                  <p className="text-white/80">
                    Connect with like-minded individuals and expand your professional network in the tech industry.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-elektora-blue/30 to-elektora-pink/30 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-elektora-blue/20">
                  <span className="text-elektora-blue font-bold text-xl">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1 text-white">Access Resources</h4>
                  <p className="text-white/80">
                    Get exclusive access to tutorials, workshops, mentoring sessions, and community resources.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}            className="flex-1 glass-card p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-elektora-cyan to-elektora-purple bg-clip-text text-transparent">Join Today</h3>
              <div className="space-y-6">
              <div className="flex flex-col space-y-3">
                <label htmlFor="name" className="text-sm font-medium text-white/90">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="px-4 py-3 glass-card border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-elektora-cyan text-white placeholder-white/60"
                />
              </div>
              
              <div className="flex flex-col space-y-3">
                <label htmlFor="email" className="text-sm font-medium text-white/90">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className="px-4 py-3 glass-card border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-elektora-cyan text-white placeholder-white/60"
                />
              </div>
              
              <div className="flex flex-col space-y-3">
                <label htmlFor="interests" className="text-sm font-medium text-white/90">
                  Area of Interest
                </label>
                <select
                  id="interests"
                  className="px-4 py-3 glass-card border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-elektora-cyan text-white"
                >
                  <option value="" className="bg-gray-800">Select your main interest</option>
                  <option value="software" className="bg-gray-800">Software Development</option>
                  <option value="hardware" className="bg-gray-800">Hardware Engineering</option>
                  <option value="cloud" className="bg-gray-800">Cloud Infrastructure</option>
                  <option value="data" className="bg-gray-800">Data Science</option>
                  <option value="other" className="bg-gray-800">Other</option>
                </select>
              </div>
              
              <button className="w-full btn-primary flex items-center justify-center gap-2">
                <FaUserPlus />
                Register Now
              </button>
              
              <div className="text-center text-sm text-white/60">
                Or join through our community platforms
              </div>
              
              <div className="flex justify-center space-x-4">
                <motion.a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="glass-button flex items-center justify-center gap-2 bg-[#5865F2]/20 backdrop-blur-sm border border-[#5865F2]/30 text-white py-3 px-6 rounded-md font-medium hover:bg-[#5865F2]/30 transition-all duration-300"
                >
                  <FaDiscord size={20} />
                  Discord
                </motion.a>
                
                <motion.a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="glass-button flex items-center justify-center gap-2 bg-gray-800/20 backdrop-blur-sm border border-gray-600/30 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800/30 transition-all duration-300"
                >
                  <FaGithub size={20} />
                  GitHub
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinCommunity;
