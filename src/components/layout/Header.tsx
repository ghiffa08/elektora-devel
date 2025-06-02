"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitch from '@/components/ui/LanguageSwitch';
import ProfileDropdown from '@/components/ui/ProfileDropdown';
import AuthButton from '@/components/auth/AuthButton';
import { useLanguage } from '@/context/LanguageContext';
import { useSession } from 'next-auth/react';

interface UserWithRole {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);  const { t } = useLanguage();
  const { data: session } = useSession();

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
  }, []);

  // Core navigation links (always visible)
  const coreNavLinks = [
    { name: 'home', href: '#hero' },
    { name: 'about', href: '#about' },
    { name: 'divisions', href: '#divisions' },
    { name: 'articles', href: '/articles' },
  ];

  // Additional links for authenticated users
  const authNavLinks = [
    { name: 'projects', href: '#projects' },
    { name: 'profile', href: '/profile' },
  ];

  // Admin-specific links
  const adminNavLinks = [
    { name: 'admin', href: '/admin' },
  ];

  // Combine navigation based on auth status
  const getNavigationLinks = () => {
    let links = [...coreNavLinks];
      if (session) {
      const user = session.user as UserWithRole;
      links = [...links, ...authNavLinks];
      
      if (user?.role === 'ADMIN') {
        links = [...links, ...adminNavLinks];
      }
    }
    
    return links;
  };

  const navLinks = getNavigationLinks();
  
  // Use useEffect to ensure hydration happens properly
  useEffect(() => {
    // This empty effect will force the component to re-render on the client side
    // which helps to avoid hydration mismatches
  }, []);return (
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
        <nav className="hidden lg:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-white/90 hover:text-elektora-cyan transition-all duration-300 relative group text-sm"
            >
              {t(link.name)}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-elektora-cyan to-elektora-blue transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-3">
          <ThemeToggle />
          <LanguageSwitch />
          {session ? (
            <ProfileDropdown />
          ) : (
            <>
              <AuthButton />
              <Link href="#join">
                <span className="btn-primary inline-block cursor-pointer text-sm px-4 py-2">{t('join')}</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile/Tablet Navigation Toggle */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden text-2xl text-white/90 hover:text-elektora-cyan transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-xl border-t border-white/20"
        >
          <div className="container-section py-6">
            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium hover:text-elektora-blue transition-colors py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(link.name)}
                </Link>
              ))}
            </div>

            {/* User Section */}
            {session ? (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-elektora-blue rounded-full flex items-center justify-center">
                      <FaUser className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {session.user?.name}
                      </p>                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {(session.user as UserWithRole)?.role || 'USER'}
                      </p>
                    </div>
                  </div>
                  <AuthButton />
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
                <AuthButton />
              </div>
            )}

            {/* Settings and Actions */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <LanguageSwitch />
              </div>
              
              {!session && (
                <Link href="#join" onClick={() => setMobileMenuOpen(false)}>
                  <span className="btn-primary inline-block cursor-pointer text-sm px-4 py-2">
                    {t('join')}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
