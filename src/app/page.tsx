'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Divisions from '@/components/sections/Divisions';
import SoftwareZone from '@/components/sections/SoftwareZone';
import HardwareZone from '@/components/sections/HardwareZone';
import Activities from '@/components/sections/Activities';
import RecentArticles from '@/components/sections/RecentArticles';
import JoinCommunity from '@/components/sections/JoinCommunity';
import Footer from '@/components/layout/Footer';
import { useDatabaseInit } from '@/hooks/useDatabaseInit';

export default function Home() {
  const { error } = useDatabaseInit();

  useEffect(() => {
    if (error) {
      console.error('Database initialization error:', error);
    }
  }, [error]);

  return (
    <>
      <Header />

      <main>
        <Hero />
        <About />
        <Divisions />
        <SoftwareZone />
        <HardwareZone />
        <Activities />
        <RecentArticles />
        <JoinCommunity />
      </main>

      <Footer />
    </>
  );
}
