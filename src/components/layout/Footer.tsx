"use client";

import Link from 'next/link';
import { FaDiscord, FaTwitter, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
    return (
    <footer className="relative pt-16 pb-8">
      {/* Glass background overlay */}
      <div className="absolute inset-0 glass-card"></div>
      
      <div className="container-section relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-gradient-to-r from-elektora-blue to-elektora-cyan bg-clip-text text-transparent">ELEKTORA</span>
              <span className="bg-gradient-to-r from-elektora-cyan to-elektora-purple bg-clip-text text-transparent">TEAM</span>
            </h3>
            <p className="text-white/80 mb-4 leading-relaxed">
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-button p-3 text-white/80 hover:text-elektora-cyan transition-all duration-300"
              >
                <FaDiscord size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-button p-3 text-white/80 hover:text-elektora-cyan transition-all duration-300"
              >
                <FaTwitter size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-elektora-cyan transition-colors"
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ y: -3 }}
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-elektora-cyan transition-colors"
              >
                <FaLinkedin size={20} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Navigation</h4>            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#divisions" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  Divisions
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#join" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  Join
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Resources</h4>            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-elektora-cyan transition-colors">
                  Tutorials
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>            <div className="space-y-3">
              <a href="mailto:contact@elektora-team.com" className="text-white/70 hover:text-elektora-cyan transition-colors flex items-center gap-2">
                <FaEnvelope />
                <span>contact@elektora-team.com</span>
              </a>
              <p className="text-white/60">
                Join our Discord community for real-time support and discussions.
              </p>
              <Link href="#join">
                <span className="btn-accent mt-2 inline-block cursor-pointer">{t('join')}</span>
              </Link>
            </div>
          </div>
        </div>        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            {t('copyright')}
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-white/60 hover:text-elektora-cyan transition-colors">
              Terms
            </a>
            <a href="#" className="text-white/60 hover:text-elektora-cyan transition-colors">
              Privacy
            </a>
            <a href="#" className="text-white/60 hover:text-elektora-cyan transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
