"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
        return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);const navLinks = [
    { name: 'home', href: '#hero' },
    { name: 'about', href: '#about' },
    { name: 'divisions', href: '#divisions' },
    { name: 'software', href: '#software' },
    { name: 'hardware', href: '#hardware' },
    { name: 'activities', href: '#activities' },
    { name: 'projects', href: '#projects' },
  ];
  
  // Use useEffect to ensure hydration happens properly
  useEffect(() => {
    // This empty effect will force the component to re-render on the client side
    // which helps to avoid hydration mismatches
  }, []);  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'nav-glass shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container-section flex justify-between items-center">
        <Link href="/">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-bold text-2xl bg-gradient-to-r from-elektora-blue via-elektora-cyan to-elektora-purple bg-clip-text text-transparent"
            >
              ELEKTORA<span className="bg-gradient-to-r from-elektora-cyan to-elektora-pink bg-clip-text text-transparent">TEAM</span>
            </motion.div>
          </div>
        </Link>        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-white/90 hover:text-elektora-cyan transition-all duration-300 relative group"
            >
              {t(link.name)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-elektora-cyan to-elektora-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitch />
          <Link href="#join">
            <span className="btn-primary inline-block cursor-pointer">{t('join')}</span>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="container-section py-4 flex flex-col space-y-4">            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium hover:text-elektora-blue transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(link.name)}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 py-2">
              <ThemeToggle />
              <LanguageSwitch />
            </div>
            
            <Link href="#join" onClick={() => setMobileMenuOpen(false)}>
              <span className="btn-primary w-full inline-block cursor-pointer text-center">{t('join')}</span>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
