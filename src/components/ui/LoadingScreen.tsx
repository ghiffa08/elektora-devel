"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  children: React.ReactNode;
}

export default function LoadingScreen({ children }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="mb-4 flex items-center">
            <motion.span
              className="text-4xl font-bold text-elektora-blue"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ELEKTORA
            </motion.span>
            <motion.span
              className="text-4xl font-bold text-elektora-cyan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              TEAM
            </motion.span>
          </div>
          
          <motion.div 
            className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: "12rem" }}
            transition={{ duration: 0.7 }}
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-elektora-blue to-elektora-cyan"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
