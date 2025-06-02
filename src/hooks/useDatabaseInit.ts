"use client";

import { useState, useEffect } from 'react';

interface DatabaseStatus {
  initialized: boolean;
  loading: boolean;
  error: string | null;
}

export const useDatabaseInit = () => {
  const [status, setStatus] = useState<DatabaseStatus>({
    initialized: false,
    loading: true,
    error: null,
  });

  const checkDatabase = async () => {
    try {
      const response = await fetch('/api/init-db');
      const data = await response.json();
      
      if (data.success) {
        setStatus({
          initialized: data.initialized,
          loading: false,
          error: null,
        });
        
        // If not initialized, initialize it
        if (!data.initialized) {
          await initializeDatabase();
        }
      } else {
        setStatus({
          initialized: false,
          loading: false,
          error: data.error || 'Failed to check database status',
        });
      }
    } catch (error) {
      setStatus({
        initialized: false,
        loading: false,
        error: 'Network error while checking database',
      });
    }
  };

  const initializeDatabase = async () => {
    setStatus(prev => ({ ...prev, loading: true }));
    
    try {
      const response = await fetch('/api/init-db', {
        method: 'POST',
      });
      const data = await response.json();
      
      if (data.success) {
        setStatus({
          initialized: true,
          loading: false,
          error: null,
        });
      } else {
        setStatus({
          initialized: false,
          loading: false,
          error: data.error || 'Failed to initialize database',
        });
      }
    } catch (error) {
      setStatus({
        initialized: false,
        loading: false,
        error: 'Network error while initializing database',
      });
    }
  };

  useEffect(() => {
    checkDatabase();
  }, []);

  return {
    ...status,
    initializeDatabase,
    checkDatabase,
  };
};
