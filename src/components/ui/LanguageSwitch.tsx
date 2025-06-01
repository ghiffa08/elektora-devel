"use client";

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';

const LanguageSwitch = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none text-sm font-medium"
      aria-label={language === 'en' ? "Switch to Indonesian" : "Switch to English"}
    >
      {language === 'en' ? 'ID' : 'EN'}
    </motion.button>
  );
};

export default LanguageSwitch;
