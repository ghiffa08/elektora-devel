'use client';

import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Divisions from '@/components/sections/Divisions';
import SoftwareZone from '@/components/sections/SoftwareZone';
import HardwareZone from '@/components/sections/HardwareZone';
import Activities from '@/components/sections/Activities';
import JoinCommunity from '@/components/sections/JoinCommunity';
import Footer from '@/components/layout/Footer';

export default function Home() {
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
        <JoinCommunity />
      </main>

      <Footer />
    </>
  );
}
